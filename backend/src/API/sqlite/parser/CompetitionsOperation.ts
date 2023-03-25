import {DefaultOperation, IDefaultOperations} from "../DefaultOperations";
import {Database} from "better-sqlite3";
import {createTableGrantsQuery} from "../configurateDataBase/grantTable";
import {consoleLog} from "../../../utils/consoleLog";
import {createCompetitionsTable} from "../configurateDataBase/createCompetitionsTable";

export interface ICompetitionOperations extends IDefaultOperations{

}

export class CompetitionOperations extends DefaultOperation implements ICompetitionOperations {
    constructor(db:Database,tableName:string) {
        super(db,tableName);
        this.createTable()
    }

    createTable(){
        let query = createCompetitionsTable;
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
}