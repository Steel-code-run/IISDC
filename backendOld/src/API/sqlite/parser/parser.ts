//@ts-ignore
import * as path from "path";
import {TParser} from "@iisdc/types";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
import {
    createTableIfNotExist,
    universalAddPost,
    universalGetPosts,
    universalIsTableExist
} from "../helpers/tableManipulations";
const db = require('better-sqlite3')(path.join(__projectPath, '../../','sqlite','db','parser.db'));


export const tableName = "parsers"
export const protectedFromDrop = false

export const createTable = ()=>{
    try {
        db.prepare('CREATE TABLE parsers(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name STRING UNIQUE,' +
            'parserType STRING,' +
            'url STRING,' +
            'fileUrl STRING UNIQUE,' +
            'enabled STRING' +
            ');').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +"createParsersTable error")
    }
    return true
}

export const dropTable = ()=>{

    try {
        if (isTableExist())
        db.prepare('DROP TABLE parsers;').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +"dropParsersTable error")
    }
    return true
}

export const isTableExist = ()=>{
    try {
        return universalIsTableExist(db, tableName)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "isParsersTableExist error")
        throw new Error(e)

    }
}

export const addParser = (parser: TParser)=>{
    try {
        createTableIfNotExist(isTableExist,createTable)
        return universalAddPost(db,tableName,parser)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "addParser error")
        throw new Error(e)
    }
}

export const getParsers = (parser:Partial<TParser>,from:number = 0,limit?:number, orderBy:string="DESC")=>{
    try {
        createTableIfNotExist(isTableExist,createTable)
        return universalGetPosts(db,tableName,parser,from,limit,orderBy)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + e.message)
        throw new Error(e)
    }
}

/*
 * Рудимент, не использовать.
 */
export const getParser = (id: number)=>{
    try {
        createTableIfNotExist(isTableExist,createTable)
        return db.prepare('SELECT * FROM parsers WHERE id = ?;').get(id) as TParser
    }   catch (e) {
        consoleLog("from "+__filename +"\n" + e.message)
    }
}
