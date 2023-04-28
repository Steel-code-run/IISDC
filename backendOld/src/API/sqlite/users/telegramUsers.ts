import * as path from "path";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
import {
    createTableIfNotExist,
    universalAddPost,
    universalCreateTable,
    universalDropTable,
    universalGetPosts,
    universalIsTableExist, universalUpdatePost
} from "../helpers/tableManipulations";
import {telegramUser} from "../../../types/serializables";
import {decoderShieldIt} from "@iisdc/utils";
const db = require('better-sqlite3')(path.join(__projectPath, '../../','sqlite','db','telegramUsers.db'));

export const tableName = "telegramUsers";
export const protectedFromDrop = true

export const createTable = ()=>{
    try {
        return universalCreateTable(db,tableName,{
            "id" : "INTEGER PRIMARY KEY AUTOINCREMENT",
            "telegramId":"STRING",
            "settings" : "STRING",
        })
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}

export const isTableExist = ()=>{
    try {
        return universalIsTableExist(db,tableName)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}

export const dropTable = ()=>{
    try {
        return universalDropTable(db,tableName)
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}


export const getUsers = (user:Partial<telegramUser>,
                         from:number = 0,
                         limit?:number,
                         orderBy:string = "DESC") => {
    try {
        createTableIfNotExist(isTableExist,createTable)
        let posts = universalGetPosts(db,tableName,user,from,limit,orderBy)

        let newPosts:telegramUser[] = []
        for (let key in posts) {
            let newPost = posts[key]
            try {
                newPost.settings = JSON.parse(decoderShieldIt(String(posts[key].settings))!)
            } catch  {
                console.log("error in parse JSON in telegram getUsers ")
                newPost.settings = {}
            }
            newPosts.push(newPost)
        }
        return newPosts.reverse()

    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}


export const add = (user:Partial<telegramUser>) => {
    try {
        createTableIfNotExist(isTableExist,createTable)
        let k:any = user
        k.settings = JSON.stringify(user.settings)?.length > 4 ? JSON.stringify(user.settings) : ''
        return universalAddPost(db,tableName,k)
    }
    catch (e){
        consoleLog("from "+__filename +"\n" +e.message)
        throw new Error(e)
    }
}

export const update = (user:telegramUser)=>{
    if (user.id === undefined){
        throw new Error("Id - required")
    }

    try {
        let k:any = user
        k.settings = JSON.stringify(user.settings)?.length > 4 ? JSON.stringify(user.settings) : ''
        universalUpdatePost(k,k.id,db,tableName)

    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in updateGrant")
        throw new Error(e)
    }
}