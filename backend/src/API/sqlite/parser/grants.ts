import * as path from "path";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
import {TGrant } from "@iisdc/types";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','parser.db'));

export const createTable = ()=>{
    try {
        db.prepare('CREATE TABLE grants(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'namePost STRING UNIQUE,' +
            'dateCreationPost STRING,' +
            'direction STRING,' +
            'organization STRING,' +
            'deadline STRING,' +
            'summary STRING,' +
            'directionForSpent STRING,' +
            'fullText STRING,' +
            'link STRING' +
            ');').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in createGrantsTable")
        throw new Error(e)
    }
    return true
}

export const dropTable = ()=>{

    try {
        if (isTableExist())
            db.prepare('DROP TABLE grants;').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +"dropParsersTable error")
        throw new Error(e)
    }
    return true
}

export const isTableExist = ()=>{
    try {
        return db.prepare('SELECT name FROM sqlite_master WHERE type=\'table\' ' +
            'AND name=\'grants\';').all().length > 0
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isGrantsTableExist")
        throw new Error(e)
    }
}

export const isGrantExist = (namePost: string, dateCreationPost:string)=>{
    try {
        return db.prepare('SELECT * FROM grants WHERE namePost=?' +
            ' AND dateCreationPost=?;').all(namePost,dateCreationPost).length > 0
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isGrantExist")
        throw new Error(e)
    }
}
export const addGrant = (grant: TGrant)=>{
    try {
        db.prepare('INSERT INTO grants(' +
            'namePost,' +
            'dateCreationPost,' +
            'direction,' +
            'organization,' +
            'deadline,' +
            'summary,' +
            'directionForSpent,' +
            'fullText,' +
            'link' +
            ') VALUES (?,?,?,?,?,?,?,?,?);').run(
                grant.namePost,
                grant.dateCreationPost,
                grant.direction,
                grant.organization,
                grant.deadline,
                grant.summary,
                grant.directionForSpent,
                grant.fullText,
                grant.link)

    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in addGrant")
        throw new Error(e)
    }
}