import * as path from "path";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
import {TGrant } from "@iisdc/types";
import createWhereQuery from "../../../helpers/createWhereQuery";
import createInsertQuery from "../../../helpers/createInsertQuery";
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
        if (grant.namePost === undefined || grant.dateCreationPost === undefined)
            throw new Error("namePost or dateCreationPost is undefined")

        let query = "INSERT INTO grants " + createInsertQuery(grant);

        db.prepare(query).run()

    } catch (e) {
        consoleLog("from "+__filename +"\n" + e.message)
        throw new Error(e)
    }
}

export const getGrants = (grant:Partial<TGrant> = {},limit?:number, orderBy:string = "DESC")=>{
    let query = 'SELECT * FROM grants ';
    query += createWhereQuery(grant,{namePost:grant.namePost});
    query += ` ORDER BY id ${orderBy} LIMIT ? ;`
    if (limit === undefined)
        limit = 10
    try {
        return db.prepare(query).all(limit)
    }
    catch (e) {
        consoleLog("from "+__filename +" getGrants\n" + e.message)
        throw new Error(e)
    }
}

export const deleteGrant = (id:number)=>{
    try {
        db.prepare('DELETE FROM grants WHERE id=?;').run(id)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + e.message)
        throw new Error(e)
    }
}