import path from "path";
import {__projectPath} from "../../../utils/projectPath";
import {consoleLog} from "../../../utils/consoleLog";
import {usersDb, usersTableName} from "../config";
import {IUser} from "@iisdc/types";
import {query} from "express";
import {DefaultOperation, IDefaultOperations} from "../DefaultOperations";

/**
 * класс для операции с пользователями из БД
 */
export interface IUsersOperations extends IDefaultOperations{
    /**
     * Получаем пользователя из бд по id
     * @param id
     */
    getUser(id:number): IUser;

    /**
     * Вставляет в таблицу пользователя
     * @param user
     */
    insertUser(user:IUser): number;

    /**
     * Получаем пользователя из бд по имени
     * @param name
     */
    getUserByName(name:string):IUser;
}


/**
 * класс для операции с пользователями из БД
 */
export class UsersOperations extends DefaultOperation implements IUsersOperations{


    getUser(id:number){

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
            return this.db.prepare(query).run().lastInsertRowid
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

}