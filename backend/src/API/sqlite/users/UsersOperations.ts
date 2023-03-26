import path from "path";
import {__projectPath} from "../../../utils/projectPath";
import {consoleLog} from "../../../utils/consoleLog";
import {usersDb, usersTableName} from "../config";
import {IUser} from "@iisdc/types";
import {query} from "express";
import {DefaultOperation, IDefaultOperations} from "../DefaultOperations";
import {Database} from "better-sqlite3";
import {createTableGrantsQuery} from "../configurateDataBase/createGrantTable";
import {createUsersTable} from "../configurateDataBase/createUsersTable";

/**
 * класс для операции с пользователями из БД
 */
export interface IUsersOperations extends UsersOperations{
}


/**
 * класс для операции с пользователями из БД
 */
export class UsersOperations extends DefaultOperation{


    constructor(db:Database,tableName:string) {
        super(db,tableName);
        this.createTable()
    }

    getUser(id:number): IUser | undefined{

        const  query = `SELECT id,name,password,role FROM ${this.tableName} WHERE id = '${id}'`


        try {
            return this.db.prepare(query).get()
        } catch (e) {
            consoleLog(`
            Ошибка в UsersOperations, getUser id = ${id} \n
            query ->\n
            ${JSON.stringify(query)}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }

    createTable(){
        let query = createUsersTable;
        try {
            return this.db.prepare(query).run()
        } catch (e) {
            consoleLog(`
            Ошибка в UsersOperations, createTable\n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

    getAllUsers(){
        try {
            return this.db.prepare(`SELECT * FROM ${this.tableName}`).all()
        } catch (e) {
            consoleLog(`
            Ошибка в UsersOperations, createTable\n
            query ->\n
            ${query}\n
            ${e}
            `);
            throw new Error(e);
        }
    }

    getUserByName(name:string){

        const  query = `SELECT id,name,password,role FROM ${this.tableName} WHERE name = '${name}'`

        try {
            return this.db.prepare(query).get()
        } catch (e) {
            consoleLog(`
            Ошибка в UsersOperations, getUserByName name = ${name} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }


    insertUser(user:IUser) {
        const query =  `
                INSERT INTO ${this.tableName}
                (name,password,role)
                VALUES 
                ('${user.name}','${user.password}','${user.role}')
                `
        try {
            return Number(this.db.prepare(query).run().lastInsertRowid)
        } catch (e) {
            consoleLog(`
            Ошибка в UsersOperations, insertUser ${JSON.stringify(user,null,2)} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }
    update(post:IUser):void{
        const query = `
        UPDATE ${this.tableName} SET
        name = ?,
        password = ?,
        role = ?
        WHERE id = ${post.id}
        `
        try {

            this.db.prepare(query).run(
                post.name,
                post.password,
                post.role
            )


        } catch (e) {
            consoleLog(`
            Ошибка в UsersOperations, insertGrant ${JSON.stringify(post,null,2)} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }

    delete(id:number){
        try {

            this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id)


        } catch (e) {
            consoleLog(`
            Ошибка в UsersOperations, delete ${id} \n
            query ->\n
            ${query}\n
            ${e}            
            `);
            throw new Error(e);
        }
    }

}