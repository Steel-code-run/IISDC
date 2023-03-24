import {TGrant} from "@iisdc/types";
import {DefaultOperation, IDefaultOperations} from "../DefaultOperations";
import {consoleLog} from "../../../utils/consoleLog";
import {getMetaphone} from "../helpers/getMetaphone";
import {createTableGrantsQuery} from "../configurateDataBase/grantTable";
import {IDirectionsOperations} from "../DirectionsOperations";
import {directionsConstTableName, directionsTableName, parserDb} from "../config";
import {Database} from "better-sqlite3";
import {shieldIt} from "@iisdc/utils";

export interface IGrantsOperations extends IDefaultOperations{
    insertGrant(grant:TGrant): number
    getGrant(id: number): TGrant | undefined
    getGrants(props:{
        namePost: string,
        directions?: string[],
        blackListed?: number
    }):TGrant[]
    setGrantToBlackList(id:number):void;
    removeFromBlackList(id:number):void;
    deleteGrant(id:number):void;
    updateGrant(grant:TGrant):void
}

export class GrantOperations extends DefaultOperation implements IGrantsOperations{
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
        metaphone
        )
        VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?);
        `

        try {

            let grantId = Number(this.db.prepare(query).run(
                grant.namePost,
                grant.dateCreationPost,
                grant.organization,
                grant.deadline,
                grant.summary,
                grant.directionForSpent,
                grant.fullText,
                grant.link,
                grant.linkPDF,
                grant.timeOfParse,
                grant.sourceLink,
                getMetaphone(grant.namePost)
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
        namePost = ?,
        dateCreationPost = ?,
        organization = ?,
        deadline = ?,
        summary = ?,
        directionForSpent = ?,
        fullText = ?,
        link = ?,
        linkPDF = ?,
        timeOfParse = ?,
        sourceLink = ?,
        metaphone = ?
        WHERE id = ${grant.id}
        `

        try {

            let grantId = Number(this.db.prepare(query).run(
                grant.namePost,
                grant.dateCreationPost,
                grant.organization,
                grant.deadline,
                grant.summary,
                grant.directionForSpent,
                grant.fullText,
                grant.link,
                grant.linkPDF,
                grant.timeOfParse,
                grant.sourceLink,
                getMetaphone(grant.namePost)
            ).lastInsertRowid)

            this.directionsOperations.deleteDirections(grantId, this.tableName)

            if (Array.isArray(grant.direction)){
                grant.direction.forEach(direction=>{
                    this.directionsOperations.insertDirection({
                        direction: direction,
                        parentID: grantId,
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
        sourceLink
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
        namePost: string,
        directions?: string[],
        blackListed?: number
    }):TGrant[]{
        if (props.blackListed === undefined)
            props.blackListed = 0

        if (props.directions === undefined)
            props.directions = []

        let whereInQuery = true
        let query = `
        SELECT 
        ${this.tableName}.id,
        directions_const.directionName
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

            let strDirections = props.directions.map(el=> `'${shieldIt(el)}'`).join(', ')
            query+=`
            (${directionsConstTableName}.directionName IN (${strDirections})) AND
            (${directionsTableName}.grants_id = ${this.tableName}.id) AND
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
            (${this.tableName}.namePost like '%${shieldIt(props.namePost)}%')
            `
        }
        query+= ` GROUP BY ${this.tableName}.id `

        try {
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