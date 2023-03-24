import {TGrant} from "@iisdc/types";
import {DefaultOperation} from "../DefaultOperations";
import {consoleLog} from "../../../utils/consoleLog";
import {getMetaphone} from "../helpers/getMetaphone";
import {createTableGrantsQuery} from "../configurateDataBase/grantTable";
import {IDirectionsOperations} from "../DirectionsOperations";
import {directionsConstTableName, directionsTableName, parserDb} from "../config";
import {Database} from "better-sqlite3";
import {shieldIt} from "@iisdc/utils";

export interface IGrantsOperations {
    insertGrant(grant:TGrant): number
    getGrant(id:number):TGrant;
}

export class GrantOperations extends DefaultOperation implements IGrantsOperations{
    private directionsOperations: IDirectionsOperations

    constructor(db:Database,tableName:string,directionsOperations: IDirectionsOperations) {
        super(db,tableName);
        this.createTable();
        this.directionsOperations =directionsOperations
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

    getGrant(id: number): TGrant {
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
            // consoleLog(`
            // Ошибка в GrantOperations, getGrantDirectionsByGrantId id = ${id} \n
            // query ->\n
            // ${query}\n
            // ${e}
            // `);
            throw new Error(e);
        }

    }

    setGrantToBlackList(id:number){
        const query  = `
        UPDATE ${this.tableName}
        SET blackList = 1
        WHERE id = ${id}
        `
        try {
            let grant = this.db.prepare(query).get();
        } catch (e) {
            // consoleLog(`
            // Ошибка в GrantOperations, setGrantToBlackList id = ${id} \n
            // query ->\n
            // ${query}\n
            // ${e}
            // `);
            throw new Error(e);
        }
    }

    removeFromBlackList(id:number){
        const query  = `
        UPDATE ${this.tableName}
        SET blackList = 0
        WHERE id = ${id}
        `
        try {
            let grant = this.db.prepare(query).get();
        } catch (e) {
            // consoleLog(`
            // Ошибка в GrantOperations, setGrantToBlackList id = ${id} \n
            // query ->\n
            // ${query}\n
            // ${e}
            // `);
            throw new Error(e);
        }
    }


    createTable(){
        let query = createTableGrantsQuery;
        try {
            return this.db.prepare(query).run()
        } catch (e) {
            // consoleLog(`
            // Ошибка в GrantOperations, createTable\n
            // query ->\n
            // ${query}\n
            // ${e}
            // `);
            throw new Error(e);
        }
    }

    getGrants(directions:string[] = [],namePost:string = ''){
        let whereInQuery = false
        let query = `
        SELECT 
        ${this.tableName}.id,
        directions_const.directionName
        FROM ${this.tableName}, ${directionsTableName}, ${directionsConstTableName}
        WHERE 

        (grants.namePost like "%а%")
        `
        if (directions.length > 0){
            if (whereInQuery)
                query+=" WHERE "
            else
                query+= " AND "

            let strDirections = directions.map(el=> `"${shieldIt(el)}"`).join(', ')
            query+=`
            (${directionsConstTableName}.directionName IN (${directions})) AND
            (${directionsTableName}.grants_id = ${this.tableName}.id) AND
            (${directionsTableName}.direction_id = ${directionsConstTableName}.id)
            `
        }
        if (namePost.length>0) {
            if (whereInQuery)
                query+=" WHERE "
            else
                query+= " AND "
            query+=`
            (${this.tableName}.namePost like "%${shieldIt(namePost)}%")
            `
        }
        query+= ` GROUP BY ${this.tableName}.id `

        try {
            let grants = this.db.prepare(query).all()
            grants.map((grant)=>{
                this.getGrant(grant.id)
            })
            return grants
        } catch (e) {
            // consoleLog(`
            // Ошибка в GrantOperations, getGrants ${directions}, ${namePost}, ${query}\n
            // query ->\n
            // ${query}\n
            // ${e}
            // `);
            throw new Error(e);
        }
    }

}