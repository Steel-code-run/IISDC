import * as path from "path";
import {TParser} from "@iisdc/types";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
import {universalAddPost, universalGetPosts, universalIsTableExist} from "../helpers/tableManipulations";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','parser.db'));


export const tableName = "parsers"
export const protectedFromDrop = true

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
    }
}

export const addParser = (parser: TParser)=>{
    try {
        return universalAddPost(db,tableName,parser)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "addParser error")
        console.log(e)
    }
}

export const getParsers = (parser:Partial<TParser>,limit?:number, orderBy:string="DESC")=>{
    try {
        return universalGetPosts(db,tableName,parser,limit,orderBy)
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
        return db.prepare('SELECT * FROM parsers WHERE id = ?;').get(id) as TParser
    }   catch (e) {
        consoleLog("from "+__filename +"\n" + e.message)
    }
}
