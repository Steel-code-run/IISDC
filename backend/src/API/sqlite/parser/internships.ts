import {
    universalAddPost, universalCount,
    universalCreateTable, universalDeletePost,
    universalDropTable, universalGetPosts,
    universalIsPostExist,
    universalIsTableExist
} from "../helpers/tableManipulations";
import path from "path";
import {__projectPath} from "../../../utils/projectPath";
import {TInternship} from "@iisdc/types";
import {consoleLog} from "../../../utils/consoleLog";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','parser.db'));


const tableName = "internships"
export const createTable = ()=>{
    return universalCreateTable(db,tableName, {
        "id" : "INTEGER PRIMARY KEY AUTOINCREMENT",
        "requirements": "STRING",
        "responsibilities": "STRING",
        'conditions': 'STRING' ,
        'salary': 'STRING' ,
        'direction': 'STRING' ,
        'fullText': 'STRING' ,
        'namePost': 'STRING' ,
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

export const isInternshipExist = (post:TInternship)=>{
    try {
        return universalIsPostExist(db, tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isVacancyExist")
        throw new Error(e)
    }
}

export const add = (post: TInternship)=>{
    try {
        return universalAddPost(db,tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in add")
        throw new Error(e)
    }
}

export const deleteInternship = (id:number)=>{
    try {
        universalDeletePost(db,tableName,id)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in deleteVacancy")
        throw new Error(e)
    }
}

export const count = (post:Partial<TInternship> = {},
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

export const getInternships = (post:Partial<TInternship> = {},
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
        consoleLog("from " + __filename + "\n" + "Error in getVacancies")
        throw new Error(e)
    }
}
