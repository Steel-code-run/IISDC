import {TGrant} from "@iisdc/types";
import {DefaultOperation} from "../DefaultOperations";
import {consoleLog} from "../../../utils/consoleLog";

export interface IGrantsOperations {
    insertGrant(grant:TGrant):number;
    getGrant(id:number):TGrant;
    // getGrantsByLevensteinDirInName(name:string):TGrant[];
}

export class GrantOperations extends DefaultOperation implements IGrantsOperations{
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
        sourceLink
        )
        VALUES
        (
        '${grant.namePost}',
        '${grant.dateCreationPost}',
        '${grant.direction}',
        '${grant.organization}',
        '${grant.deadline}',
        '${grant.summary}',
        '${grant.directionForSpent}',
        '${grant.fullText}',
        '${grant.link}',
        '${grant.linkPDF}',
        '${grant.timeOfParse}',
        '${grant.sourceLink}'
        );
        `

        try {
            return this.db.prepare(query).run().lastInsertRowid
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
            return this.db.prepare(query).get()
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
}