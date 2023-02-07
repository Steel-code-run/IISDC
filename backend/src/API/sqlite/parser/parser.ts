import * as path from "path";
import {IUser, IUserWithPassword, TParser} from "@iisdc/types";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','parser.db'));

export const createParsersTable = ()=>{
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
        throw new Error(e)
    }
    return true
}

export const dropParsersTable = ()=>{

    try {
        if (isParsersTableExist())
        db.prepare('DROP TABLE parsers;').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +"dropParsersTable error")
        throw new Error(e)
    }
    return true
}

export const isParsersTableExist = ()=>{
    try {
        return db.prepare('SELECT name FROM sqlite_master WHERE type=\'table\' ' +
            'AND name=\'parsers\';').all().length > 0
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "isParsersTableExist error")
        throw new Error(e)
    }
}

export const addParser = (parser: TParser)=>{
    try {
        return db.prepare('INSERT INTO parsers (name, parserType, url, fileUrl, enabled) VALUES (?, ?, ?, ?, ?);')
            .run(parser.name, parser.parserType, parser.url, parser.fileUrl, parser.enabled)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "addParser error")
        throw new Error(e)
    }
}

export const getParsers = ()=>{
    try {
        return db.prepare('SELECT * FROM parsers;').all()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }
}