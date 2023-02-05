import * as path from "path";
import {IUser, IUserWithPassword} from "@iisdc/types";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','users.db'));


export const createUsersDataTable = ()=>{
    try {
        db.prepare('CREATE TABLE usersData(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name STRING UNIQUE,' +
            'password STRING' +
            ');').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }
    return true
}

export const isUsersDataTableExist = ()=>{
    try {
        return db.prepare('SELECT name FROM sqlite_master WHERE type=\'table\' ' +
            'AND name=\'usersData\';').all().length > 0
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }
}

export const deleteUsersDataTable = ()=>{
    try {
        return db.prepare('DROP TABLE usersData;').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }
}


export const getUserByNameAndPassword = ({name,password}:IUserWithPassword):IUserWithPassword => {
    try {
        const stmt = db.prepare('SELECT * FROM usersData WHERE ' +
            'name = ? AND ' +
            'password = ?' +
            ';')
        return stmt.all(name,password)[0]
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }
}
export const getUserByName = ({name}:IUserWithPassword|IUser):IUserWithPassword => {
    try {
        const stmt = db.prepare('SELECT * FROM usersData WHERE ' +
            'name = ?' +
            ';')
        return stmt.all(name)[0]
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }
}

export const getUserByID = ({id}:IUserWithPassword| IUser):IUserWithPassword => {
    try {
        const stmt = db.prepare('SELECT * FROM usersData WHERE ' +
            'id = ? ' +
            ';')
        return stmt.all(id)[0]
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }
}

export const getUsers = ({name,id,password}:Partial<IUserWithPassword> = {},limit?:number) => {
    if (limit === undefined)
        limit = 10

    if (limit <= 0)
        throw new Error("limit must be greater than 0")

    try {
        let query = ""
        if (name !== undefined)
            query += `name = ${name} AND`
        if (id !== undefined)
            query += ` id = ${id} AND`
        if (password !== undefined)
            query += ` password = ${password}`

        if (query.length > 0)
            return  db.prepare(`SELECT * FROM usersData WHERE ${query} LIMIT ${limit};`).all()
        else
            return  db.prepare(`SELECT * FROM usersData LIMIT ${limit};`).all()

    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }
}

export const insertUser = ({name,password}:IUserWithPassword) => {

    try {
        return db.prepare(`INSERT INTO usersData (name,password) VALUES ('${name}','${password}');`).run()
    }
    catch (e){
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }

}
