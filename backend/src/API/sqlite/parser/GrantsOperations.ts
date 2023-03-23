import {TGrant} from "@iisdc/types";
import {DefaultOperation} from "../DefaultOperations";
import {consoleLog} from "../../../utils/consoleLog";
import path from "path";
import {__projectPath} from "../../../utils/projectPath";
import {getMetaphone} from "../helpers/getMetaphone";
import {createTableGrantsQuery} from "../configurateDataBase/grantTable";

export interface IGrantsOperations {
    insertGrant(grant:TGrant):number;
    getGrant(id:number):TGrant;
    // getGrantsByLevensteinDirInName(name:string):TGrant[];
}

export class GrantOperations extends DefaultOperation implements IGrantsOperations{

    constructor(db:any,tableName:string) {
        super(db,tableName);
        this.createTable();
    }
    insertGrant(grant:TGrant): number {
        const query = `
        INSERT INTO ${this.tableName}
        (
        namePost,
        dateCreationPost,
        direction,
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
        (?,?,?,?,?,?,?,?,?,?,?,?,?);
        `

        try {
            return this.db.prepare(query).run(
                grant.namePost,
                grant.dateCreationPost,
                JSON.stringify(grant.direction),
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
            ).lastInsertRowid
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
        direction,
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
        id = ${id};
        `
        try {
            let grant = this.db.prepare(query).get();
            grant.direction = JSON.parse(grant.direction)
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

    setGrantToBlackList(id:number){
    }

    createTable(){
        let query = createTableGrantsQuery;
        try {
            return this.db.prepare(query).run()
        } catch (e) {
            consoleLog(`
            Ошибка в createTable\n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }


}