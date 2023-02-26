import * as path from "path";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
import {TCompetition} from "@iisdc/types";
import {
    createTableIfNotExist,
    universalAddPost,
    universalCount, universalDeletePost, universalDropTable,
    universalGetPosts,
    universalIsPostExist,
    universalIsTableExist, universalUpdatePost
} from "../helpers/tableManipulations";

const db = require('better-sqlite3')(path.join(__projectPath, '../../','sqlite','db','parser.db'));

export const tableName = "competitions"
export const protectedFromDrop = false



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

export const isCompetitionExist = (post:TCompetition)=>{
    try {
        createTableIfNotExist(isTableExist,createTable)
        return universalIsPostExist(db,
            tableName,
            {namePost:post.namePost,dateCreationPost:post.dateCreationPost},
            ["namePost"]
        )
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isVacancyExist")
        throw new Error(e)
    }
}

export const add = (post: TCompetition)=>{
    try {
        createTableIfNotExist(isTableExist,createTable)
        return universalAddPost(db,tableName,post)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in add")
        throw new Error(e)
    }
}

export const deleteCompetition = (id:number)=>{
    try {
        createTableIfNotExist(isTableExist,createTable)
        universalDeletePost(db,tableName,id)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in deleteVacancy")
        throw new Error(e)
    }
}

export const count = (post:Partial<TCompetition> = {},
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

export const getCompetitions = (post:Partial<TCompetition> = {},
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

export const update = (post:TCompetition)=>{
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