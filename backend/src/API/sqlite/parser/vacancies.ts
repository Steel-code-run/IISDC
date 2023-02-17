import * as path from "path";
import {__projectPath} from "../../../utils/projectPath";
import {TVacancy} from "@iisdc/types";
import {
    universalAddPost, universalCount,
    universalCreateTable, universalDeletePost,
    universalDropTable, universalGetPosts,
    universalIsPostExist,
    universalIsTableExist
} from "./tableManipulations";
import {consoleLog} from "../../../utils/consoleLog";
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
    }
}

export const isTableExist = ()=>{
    try {
    return universalIsTableExist(db, tableName)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isTableExist")
    }
}

export const isVacancyExist = (post:TVacancy)=>{
    try {
        return universalIsPostExist(db, tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isVacancyExist")
    }
}

export const add = (post: TVacancy)=>{
    try {
        return universalAddPost(db,tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in add")
    }
}

export const deleteVacancy = (id:number)=>{
    try {
        universalDeletePost(db,tableName,id)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in deleteVacancy")
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
    }

}