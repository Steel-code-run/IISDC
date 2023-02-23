import * as path from "path";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";

import {TGrant} from "@iisdc/types";
import {
    createTableIfNotExist,
    universalAddPost,
    universalCount, universalDeletePost, universalDropTable,
    universalGetPosts,
    universalIsPostExist,
    universalIsTableExist, universalUpdatePost
} from "../helpers/tableManipulations";
import * as fs from "fs";
let dbPath = path.join(__projectPath, '../../','sqlite','db','parser.db');
let db:any;
setDb(dbPath)


/**
 * Функция устанавливающая коннект к бд
 * @param newPath
 */
export function setDb(newPath:string){
    if (!fs.existsSync(newPath)){
        const dir = path.parse(newPath).dir
        try {
            fs.mkdirSync(dir);
        } catch {}
    }
    dbPath = newPath
    db = require('better-sqlite3')(dbPath)
}
export const tableName = "grants"
export const protectedFromDrop = false

export const createTable = ()=>{
    try {
        db.prepare('CREATE TABLE grants(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'namePost STRING,' +
            'dateCreationPost STRING,' +
            'direction STRING,' +
            'organization STRING,' +
            'deadline STRING,' +
            'summary STRING,' +
            'directionForSpent STRING,' +
            'fullText STRING,' +
            'link STRING,' +
            'linkPDF STRING,' +
            'timeOfParse DATETIME' +
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
        return universalDropTable(db,tableName)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in dropTable")
        throw new Error(e)
    }
}

export const isTableExist = ()=>{
    try {
        return universalIsTableExist(db, tableName)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isTableExist")
        throw new Error(e)
    }
}

export const isGrantExist = (post:TGrant)=>{
    try {
        createTableIfNotExist(isTableExist,createTable)

        return universalIsPostExist(db,
            tableName,
            {namePost:post.namePost,timeOfParse:post.timeOfParse},
            ["timeOfParse"]
        )
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isVacancyExist")
        throw new Error(e)
    }
}

export const add = (post: TGrant)=>{
    try {
        createTableIfNotExist(isTableExist,createTable)
        return universalAddPost(db,tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in add")
        throw new Error(e)
    }
}

export const deleteGrant = (id:number)=>{
    try {
        createTableIfNotExist(isTableExist,createTable)
        universalDeletePost(db,tableName,id)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in deleteVacancy")
        throw new Error(e)
    }
}

export const count = (post:Partial<TGrant> = {},
                      from:number = 0,
                      limit?:number,
                      orderBy:string = "DESC",
                      timeOfParseSince?:number|string,
                      timeOfParseTo?:number|string)=> {
    try {
        createTableIfNotExist(isTableExist,createTable)
        return universalCount(
            db,
            tableName,
            post,
            from,
            limit,
            orderBy,
            timeOfParseSince,
            timeOfParseTo
        )
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in count")
        throw new Error(e)
    }

}

export const getGrants = (post:Partial<TGrant> = {},
                             from:number = 0,
                             limit?:number,
                             orderBy:string = "DESC",
                             timeOfParseSince?:number|string,
                             timeOfParseTo?:number|string)=> {
    try {
        createTableIfNotExist(isTableExist,createTable)
        return universalGetPosts(
            db,
            tableName,
            post,
            from,
            limit,
            orderBy,
            timeOfParseSince,
            timeOfParseTo
        )
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in getVacancies")
        throw new Error(e)
    }

}

export const updateGrant = (post:TGrant)=>{
    if (post.id === undefined){
        throw new Error("Id - required")
    }

    try {
        universalUpdatePost(post,post.id,db,tableName)

    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in updateGrant")
        throw new Error(e)
    }
}