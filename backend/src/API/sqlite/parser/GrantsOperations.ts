import {TGrant} from "@iisdc/types";
import {DefaultOperation, IDefaultOperations} from "../DefaultOperations";
import {consoleLog} from "../../../utils/consoleLog";
import {createTableGrantsQuery} from "../configurateDataBase/grantTable";
import {IDirectionsOperations} from "../DirectionsOperations";
import {directionsConstTableName, directionsTableName, parserDb} from "../config";
import {Database} from "better-sqlite3";
import {shieldIt} from "@iisdc/utils";

export interface IGrantsOperations extends IDefaultOperations{
    insertGrant(grant:TGrant): number
    getGrant(id: number): TGrant | undefined
    getGrants(props?:{
        namePost?: string,
        directions?: string[],
        blackListed?: number,
        limit?:number,
        from?:number,
        justCountIt?:boolean
    }):TGrant[]
    setGrantToBlackList(id:number):void;
    removeFromBlackList(id:number):void;
    deleteGrant(id:number):void;
    updateGrant(grant:TGrant):void
}

export class GrantsOperations extends DefaultOperation implements IGrantsOperations{
    private directionsOperations: IDirectionsOperations

    constructor(db:Database,tableName:string,directionsOperations: IDirectionsOperations) {
        super(db,tableName);
        this.createTable();
        this.directionsOperations = directionsOperations
    }
    insertGrant(grant:TGrant): number {
        const query = `
        INSERT INTO ${this.tableName}
        (
        namePost,
        dateCreationPost,
        organization,
        deadline,
        summary,
        directionForSpent,
        fullText,
        link,
        linkPDF,
        timeOfParse,
        sourceLink,
        namePost_lowerCase
        )
        VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?);
        `

        try {

            let grantId = Number(this.db.prepare(query).run(
                grant.namePost,
                grant.dateCreationPost || '',
                grant.organization || '',
                grant.deadline || '',
                grant.summary || '',
                grant.directionForSpent || '',
                grant.fullText || '',
                grant.link || '',
                grant.linkPDF || '',
                grant.timeOfParse || '',
                grant.sourceLink || '',
                grant.namePost.toLowerCase()
            ).lastInsertRowid)


            if (Array.isArray(grant.direction)){
                grant.direction.forEach(direction=>{
                    this.directionsOperations.insertDirection({
                        direction: direction,
                        parentID: grantId,
                        tableNamePost: this.tableName
                    })
                })
            }

            return grantId
        } catch (e) {
            consoleLog(`
            Ошибка в GrantOperations, insertGrant ${JSON.stringify(grant,null,2)} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }

    updateGrant(grant:TGrant):void{
        const query = `
        UPDATE ${this.tableName} SET
        dateCreationPost = ?,
        organization = ?,
        deadline = ?,
        summary = ?,
        directionForSpent = ?,
        fullText = ?,
        link = ?,
        linkPDF = ?
        WHERE id = ${grant.id}
        `

        try {

            this.db.prepare(query).run(
                grant.dateCreationPost,
                grant.organization,
                grant.deadline,
                grant.summary,
                grant.directionForSpent,
                grant.fullText,
                grant.link,
                grant.linkPDF,
            )

            if (grant.id === undefined)
                throw new Error("grant.id undefined")
            this.directionsOperations.deleteDirections(grant.id, this.tableName)

            if (Array.isArray(grant.direction)){
                grant.direction.forEach(direction=>{
                    this.directionsOperations.insertDirection({
                        direction: direction,
                        parentID: grant.id!,
                        tableNamePost: this.tableName
                    })
                })
            }

        } catch (e) {
            consoleLog(`
            Ошибка в GrantOperations, insertGrant ${JSON.stringify(grant,null,2)} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }

    getGrant(id: number): TGrant | undefined{
        const query = `
        SELECT 
        id,
        namePost,
        dateCreationPost,
        organization,
        deadline,
        summary,
        directionForSpent,
        fullText,
        link,
        linkPDF,
        timeOfParse,
        blackListed,
        sourceLink,
        namePost_lowerCase
        FROM ${this.tableName}
        WHERE
        id = ?;
        `
        try {
            let grant = this.db.prepare(query).get(id);
            if (!grant)
                return undefined
            grant.direction = this.getGrantDirectionsByGrantId(grant.id)
            return grant
        } catch (e) {
            consoleLog(`
            Ошибка в GrantOperations, getGrant id = ${id} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }

    getGrantDirectionsByGrantId(id:number):string[]{
        let query = `
            SELECT 
            ${directionsConstTableName}.directionName,
            ${this.tableName}.id
            FROM ${directionsConstTableName}, ${directionsTableName}, ${this.tableName}
            WHERE 
            (${directionsTableName}.${this.tableName}_id = ${this.tableName}.id) AND
            (${directionsConstTableName}.id = ${directionsTableName}.${directionsConstTableName}_id) AND
            (${this.tableName}.id = ${id})
        `
        try {
            return this.db.prepare(query).all().map(el=>el.directionName)
        } catch (e) {
            consoleLog(`
            Ошибка в GrantOperations, getGrantDirectionsByGrantId id = ${id} \n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }

    }

    setGrantToBlackList(id:number){
        const query  = `
        UPDATE ${this.tableName}
        SET blackListed = 1
        WHERE id = ${id}
        `
        try {
            this.db.prepare(query).run();
        } catch (e) {
            consoleLog(`
            Ошибка в GrantOperations, setGrantToBlackList id = ${id} \n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

    removeFromBlackList(id:number){
        const query  = `
        UPDATE ${this.tableName}
        SET blackListed = 0
        WHERE id = ${id}
        `
        try {
            this.db.prepare(query).run();
        } catch (e) {
            consoleLog(`
            Ошибка в GrantOperations, setGrantToBlackList id = ${id} \n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }


    createTable(){
        let query = createTableGrantsQuery;
        try {
            return this.db.prepare(query).run()
        } catch (e) {
            consoleLog(`
            Ошибка в GrantOperations, createTable\n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

    getGrants(props:{
        namePost?: string,
        directions?: string[],
        blackListed?: number,
        limit?:number,
        from?:number,
        justCountIt?:boolean
    }={}):TGrant[]{
        if (props.namePost === undefined)
            props.namePost = ''

        if (props.blackListed === undefined)
            props.blackListed = 0

        if (props.directions === undefined)
            props.directions = []

        if (props.limit === undefined)
            props.limit = 10

        if (props.from === undefined)
            props.from = 0

        let whereInQuery = true
        let query = "";

        if (props.justCountIt)
            query +=`
            SELECT 
            COUNT (*)
            FROM
            (
            `

        if (props.directions.length > 0)
            query+= `
            SELECT
            *
            FROM (
            `

        query += `
        SELECT 
        ${this.tableName}.id,
        directions_const.directionName,
        count(*) as count
        FROM ${this.tableName}, ${directionsTableName}, ${directionsConstTableName}
        WHERE
        (${this.tableName}.blackListed = ${props.blackListed})
        `
        if (props.directions.length > 0){
            if (!whereInQuery){
                whereInQuery = true
                query+=" WHERE "
            }
            else
                query+= " AND "


            // query+=`
            // (${directionsConstTableName}.directionName = '') AND
            // (${directionsTableName}.${this.tableName}_id = ${this.tableName}.id) AND
            // (${directionsTableName}.${directionsConstTableName}_id = ${directionsConstTableName}.id)
            // `

            query+="("
            props.directions.forEach(el=>{
                query+= ` (${directionsConstTableName}.directionName = '${el}') OR `
            })
            query=query.slice(0,-3)
            query+=" ) AND"

            query+=`
            (${directionsTableName}.${this.tableName}_id = ${this.tableName}.id) AND
            (${directionsTableName}.${directionsConstTableName}_id = ${directionsConstTableName}.id)
            `
        }


        if (props.namePost.length>0) {
            if (!whereInQuery){
                whereInQuery = true
                query+=" WHERE "
            }
            else
                query+= " AND "
            query+=`
            (${this.tableName}.namePost_lowerCase like '%${shieldIt(props.namePost.toLowerCase())}%')
            `
        }
        query+= ` GROUP BY ${this.tableName}.id `

        query+= ` ORDER BY ${this.tableName}.id DESC `

        if (props.directions.length > 0)
            query+= ` ) 
            WHERE "count" = ${props.directions.length}
            `


        if (props.justCountIt)
            query+=" ) "

        query+= ` LIMIT ${props.from}, ${props.limit} `

        try {
            if (props.justCountIt)
                return this.db.prepare(query).all()[0]["COUNT (*)"]

            let grants = this.db.prepare(query).all()
            grants = grants.map((grant)=>{
                return this.getGrant(grant.id)
            })
            return grants
        } catch (e) {
            consoleLog(`
            Ошибка в GrantOperations, getGrants ${JSON.stringify(props)}, ${query}\n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }
    deleteGrant(id:number){
        const query = `
            DELETE FROM ${this.tableName} 
            WHERE 
            (id = ${id})
        `
        try {
            this.db.prepare(query).run()
        } catch (e) {
            consoleLog(`
            Ошибка в GrantOperations, getGrants ${id}, ${query}\n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

}