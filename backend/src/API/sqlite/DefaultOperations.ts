import {usersDb, usersTableName} from "./config";
import {consoleLog} from "../../utils/consoleLog";

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
    protected db;
    protected readonly tableName;
    constructor(db:any,tableName:string) {
        this.db = db
        this.tableName = tableName
    };

    // isTableCreated(){
    //     const query = `
    //                 SELECT name FROM sqlite_master
    //                 WHERE type=\'table\'
    //                 AND name=\'${this.tableName}\';
    //                 `
    //     try {
    //         return this.db.prepare(query).all().
    //     } catch (e) {
    //         consoleLog(`
    //         Ошибка в UsersOperations, isTableCreated \n
    //         query ->\n
    //         ${query}\n
    //         ${e}
    //         `);
    //         throw new Error(e);
    //     }
    // };

    // createTable(){
    //     const query = `
    //         CREATE TABLE if EXISTS ${this.tableName}
    //     `
    //         try {
    //             this.db.prepare(query).run()
    //         } catch (e) {
    //             consoleLog(`
    //             Ошибка в UsersOperations, createTable \n
    //             query ->\n
    //             ${query}\n
    //             ${e}
    //             `);
    //             throw new Error(e);
    //         }
    // }
}