import * as path from "path";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
import {
    universalAddPost, universalCount,
    universalDeletePost,
    universalDropTable, universalGetPosts,
    universalIsPostExist,
    universalIsTableExist
} from "./tableManipulations";
import {TGrant} from "@iisdc/types";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','parser.db'));

const tableName = "grants"
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
    }
}

export const isTableExist = ()=>{
    try {
        return universalIsTableExist(db, tableName)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isTableExist")
    }
}

export const isGrantExist = (post:TGrant)=>{
    try {
        return universalIsPostExist(db, tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isVacancyExist")
    }
}

export const add = (post: TGrant)=>{
    try {
        return universalAddPost(db,tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in add")
    }
}

export const deleteGrant = (id:number)=>{
    try {
        universalDeletePost(db,tableName,id)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in deleteVacancy")
    }
}

export const count = (post:Partial<TGrant> = {},
                      limit?:number,
                      orderBy:string = "DESC",
                      timeOfParseSince?:number|string,
                      timeOfParseTo?:number|string)=> {
    try {
        return universalCount(
            db,
            tableName,
            post,
            limit,
            orderBy,
            timeOfParseSince,
            timeOfParseTo
        )
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in count")
    }

}

export const getGrants = (post:Partial<TGrant> = {},
                             limit?:number,
                             orderBy:string = "DESC",
                             timeOfParseSince?:number|string,
                             timeOfParseTo?:number|string)=> {
    try {
        return universalGetPosts(
            db,
            tableName,
            post,
            limit,
            orderBy,
            timeOfParseSince,
            timeOfParseTo
        )
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in getVacancies")
    }

}