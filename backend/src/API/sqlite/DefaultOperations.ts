import {usersDb, usersTableName} from "./config";
import {consoleLog} from "../../utils/consoleLog";
import {Database} from "better-sqlite3";

/**
 * Стандартные операции с таблицами
 */
export interface IDefaultOperations {
    // dropTable():void;
}

/**
 * Стандартные операции с таблицами
 */
export class DefaultOperation implements IDefaultOperations{
    protected db:Database;
    readonly tableName;
    constructor(db:Database,tableName:string) {
        this.db = db
        this.tableName = tableName
    };
 }