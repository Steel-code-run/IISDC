import * as path from "path";
import {IUser, IUserWithPassword} from "@iisdc/types";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
import createWhereQuery from "../../../helpers/createWhereQuery";
import {shieldIt} from "@iisdc/utils";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','users.db'));


export const createTable = ()=>{
    try {
        db.prepare('CREATE TABLE usersData(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name STRING UNIQUE,' +
            'password STRING,' +
            'role INTEGER' +
            ');').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
    return true
}

export const isTableExist = ()=>{
    try {
        return db.prepare('SELECT name FROM sqlite_master WHERE type=\'table\' ' +
            'AND name=\'usersData\';').all().length > 0
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}

export const dropTable = ()=>{
    if (!isTableExist())
        return true

    try {
        return db.prepare('DROP TABLE usersData;').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}


export const getUserByNameAndPassword = ({name,password}:IUserWithPassword):IUserWithPassword => {
    try {
        return db.prepare('SELECT * FROM usersData WHERE ' +
            'name = ? ' +
            'AND password = ?' +
            ';').all(name,password)[0]
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
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
        consoleLog("from "+__filename +"\n" +e.message)
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
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}

export const getUsers = ({name,id,password}:Partial<IUserWithPassword> = {},limit?:number, orderBy:string = "DESC") => {
    if (limit === undefined)
        limit = 10

    let query = 'SELECT * FROM usersData '
    query+= createWhereQuery({name,id,password},["name"])
    query+= ` ORDER BY id ${orderBy} LIMIT ? ;`
    console.log(query);
    try {
        return db.prepare(query).all(limit)

    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}


export const insertUser = (user:IUserWithPassword) => {

    let values = [user.name,user.password,user.role].map((value)=>shieldIt(value))

    try {
        return db.prepare(`INSERT INTO usersData (name, password, role ) VALUES (?,?,?);`).run(values)
    }
    catch (e){
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }

}
