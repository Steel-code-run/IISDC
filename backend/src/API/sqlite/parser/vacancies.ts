import * as path from "path";
import {__projectPath} from "../../../utils/projectPath";
import {TVacancy} from "@iisdc/types";
import {consoleLog} from "../../../utils/consoleLog";
import {
    universalAddPost,
    universalCount,
    universalCreateTable, universalDeletePost, universalDropTable, universalGetPosts,
    universalIsPostExist,
    universalIsTableExist
} from "../helpers/tableManipulations";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','parser.db'));

const tableName = "vacancies"
export const createTable = ()=>{
    return universalCreateTable(db,tableName, {
        "id" : "INTEGER PRIMARY KEY AUTOINCREMENT",
        "namePost": "STRING",
        "direction": "STRING",
        'requirements': 'STRING' ,
        'responsibilities': 'STRING' ,
        'conditions': 'STRING' ,
        'salary': 'STRING' ,
        'fullText': 'STRING' ,
        'dateCreationPost': 'STRING' ,
        'organization': 'STRING' ,
        'link': 'STRING' ,
        'timeOfParse': 'DATETIME'
    })
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

export const isVacancyExist = (post:TVacancy)=>{
    try {
        return universalIsPostExist(db, tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isVacancyExist")
        throw new Error(e)
    }
}

export const add = (post: TVacancy)=>{
    try {
        return universalAddPost(db,tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in add")
        throw new Error(e)
    }
}

export const deleteVacancy = (id:number)=>{
    try {
        universalDeletePost(db,tableName,id)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in deleteVacancy")
        throw new Error(e)
    }
}

export const count = (post:Partial<TVacancy> = {},
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
        throw new Error(e)
    }

}

export const getVacancies = (post:Partial<TVacancy> = {},
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
        throw new Error(e)
    }

}