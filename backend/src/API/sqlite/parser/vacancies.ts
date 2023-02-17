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
    return universalDropTable(db,tableName)
}

export const isTableExist = ()=>{
    return universalIsTableExist(db, tableName)
}

export const isVacancyExist = (post:TVacancy)=>{
    return universalIsPostExist(db, tableName,post)
}

export const add = (post: TVacancy)=>{
    return universalAddPost(db,tableName,post)
}

export const deleteVacancy = (id:number)=>{
    universalDeletePost(db,tableName,id)
}

export const count = (post:Partial<TVacancy> = {},
                      limit?:number,
                      orderBy:string = "DESC",
                      timeOfParseSince?:number|string,
                      timeOfParseTo?:number|string)=> {
    return universalCount(
        db,
        tableName,
        post,
        limit,
        orderBy,
        timeOfParseSince,
        timeOfParseTo
    )
}

export const getVacancies = (post:Partial<TVacancy> = {},
                                limit?:number,
                                orderBy:string = "DESC",
                                timeOfParseSince?:number|string,
                                timeOfParseTo?:number|string)=> {
    return universalGetPosts(
        db,
        tableName,
        post,
        limit,
        orderBy,
        timeOfParseSince,
        timeOfParseTo
    )
}