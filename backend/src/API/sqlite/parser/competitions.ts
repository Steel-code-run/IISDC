import * as path from "path";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
import {TCompetition} from "@iisdc/types";
import {
    universalAddPost, universalCount,
    universalDeletePost,
    universalDropTable, universalGetPosts,
    universalIsPostExist,
    universalIsTableExist
} from "./tableManipulations";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','parser.db'));

const tableName = "competitions"
export const createTable = ()=>{
    try {
        db.prepare('CREATE TABLE competitions(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'namePost STRING,' +
            'dateCreationPost STRING,' +
            'direction STRING,' +
            'fullText STRING,' +
            'link STRING,' +
            'organization STRING,' +
            'timeOfParse DATETIME,' +
            'deadline STRING' +
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

export const isCompetitionExist = (post:TCompetition)=>{
    try {
        return universalIsPostExist(db, tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isVacancyExist")
    }
}

export const add = (post: TCompetition)=>{
    try {
        return universalAddPost(db,tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in add")
    }
}

export const deleteCompetition = (id:number)=>{
    try {
        universalDeletePost(db,tableName,id)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in deleteVacancy")
    }
}

export const count = (post:Partial<TCompetition> = {},
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

export const getCompetitions = (post:Partial<TCompetition> = {},
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