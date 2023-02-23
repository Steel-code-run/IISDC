import * as path from "path";
import {IUser} from "@iisdc/types";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
import {
    createTableIfNotExist,
    universalAddPost,
    universalCreateTable,
    universalDropTable,
    universalGetPosts,
    universalIsTableExist
} from "../helpers/tableManipulations";
const db = require('better-sqlite3')(path.join(__projectPath, '../../','sqlite','db','users.db'));

export const tableName = "usersData";
export const protectedFromDrop = true
export const createTable = ()=>{
    try {
        return universalCreateTable(db,tableName,{
            "id" : "INTEGER PRIMARY KEY AUTOINCREMENT",
            "name": "STRING UNIQUE",
            "password": "STRING",
            "role": "INTEGER"
        })
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}

export const isTableExist = ()=>{
    try {
        return universalIsTableExist(db,tableName)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}

export const dropTable = ()=>{
    try {
        return universalDropTable(db,tableName)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}


export const getUsers = (user:Partial<IUser>,
                         from:number = 0,
                         limit?:number,
                         orderBy:string = "DESC") => {
    try {
        createTableIfNotExist(isTableExist,createTable)
        return universalGetPosts(db,tableName,user,from,limit,orderBy)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}


export const add = (user:IUser) => {
    try {
        createTableIfNotExist(isTableExist,createTable)
        return universalAddPost(db,tableName,user)
    }
    catch (e){
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }

}
