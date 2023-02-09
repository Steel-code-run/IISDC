import * as path from "path";
import {TParser} from "@iisdc/types";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','parser.db'));

export const createTable = ()=>{
    try {
        db.prepare('CREATE TABLE parsers(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name STRING UNIQUE,' +
            'parserType STRING,' +
            'url STRING,' +
            'fileUrl STRING,' +
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
        return db.prepare('SELECT name FROM sqlite_master WHERE type=\'table\' ' +
            'AND name=\'parsers\';').all().length > 0
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "isParsersTableExist error")
    }
}

export const addParser = (parser: TParser)=>{
    try {
        return db.prepare('INSERT INTO parsers (name, parserType, url, fileUrl, enabled) VALUES (?, ?, ?, ?, ?);')
            .run(parser.name, parser.parserType, parser.url, parser.fileUrl, parser.enabled)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "addParser error")
    }
}

export const getParsers = (limit?:number, orderBy:string="DESC")=>{

    if (limit === undefined)
        limit = 1000
    let query = `SELECT * FROM parsers ORDER BY id ${orderBy} LIMIT ? ;`
    try {
        return db.prepare(query).all(limit)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + e.message)
        throw new Error(e)
    }
}

export const getParser = (id: number)=>{
    try {
        return db.prepare('SELECT * FROM parsers WHERE id = ?;').get(id) as TParser
    }   catch (e) {
        consoleLog("from "+__filename +"\n" + e.message)
    }
}