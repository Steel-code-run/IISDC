import {consoleLog} from "../../../utils/consoleLog";
import createInsertQuery from "../helpers/createInsertQuery";
import createWhereTimeQuery from "../helpers/createWhereTimeQuery";
import createWhereQuery from "../helpers/createWhereQuery";

type TCreationObjectTable = {
    // key, options
    [key: string]: string
}

export const createTableIfNotExist = (isTableExist:()=>boolean, createTable:()=>any) =>{
    try {
        if (!isTableExist()) {
            createTable()
        }
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in createTableIfNotExist")
        throw new Error(e)
    }
}

export const universalCreateTable = (db:any, tableName:string, creationObjectTable:TCreationObjectTable) => {
    let str = `CREATE TABLE ${tableName}(`

    for (let key in creationObjectTable) {
        str+= ` ${key} ${creationObjectTable[key]}, `
    }
    str=str.slice(0,str.length-2)+");"
    try {
        db.prepare(str).run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in universalCreateTable")
        throw new Error(e)
    }
}

export const universalIsTableExist = (db:any,tableName:string)=>{
    try {
        return db.prepare('SELECT name FROM sqlite_master WHERE type=\'table\' ' +
            `AND name=\'${tableName}\';`).all().length > 0
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in universalIsTableExist")
        throw new Error(e)
    }
}

export const universalDropTable = (db:any, tableName:string)=>{
    try {
        if (universalIsTableExist(db,tableName))
            db.prepare(`DROP TABLE ${tableName};`).run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +"universalDropTable error")
        throw new Error(e)
    }
    return true
}

export const universalIsPostExist = (db:any,tableName:string,post:any)=>{
    let query = `SELECT * FROM ${tableName} `
    query+=createWhereQuery(post,[],["timeOfParse"])
    try {
        return db.prepare(query).all().length>0 ;
    } catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in universalIsPostExist")
        throw new Error(e)
    }
}

export const universalAddPost = (db:any,tableName:string,post:any) => {
    try {
        let query = `INSERT INTO ${tableName} `  + createInsertQuery(post);
        db.prepare(query).run()

    } catch (e) {
        consoleLog("from "+__filename +"\n" + e.message)
        throw new Error(e)
    }
}

export const universalDeletePost = (db:any,tableName:string,id:number) => {
    try {
        db.prepare(`DELETE FROM ${tableName} WHERE id=?;`).run(id)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + e.message)
        throw new Error(e)
    }
}

export const universalCount = (db:any,
                               tableName: string,
                               post:Partial<any> = {},
                               from:number = 0,
                               limit?:number,
                               orderBy:string = "DESC",
                               timeOfParseSince?:number|string,
                               timeOfParseTo?:number|string) =>
_universalGetPosts(
    db,
    tableName,
    post,
    from,
    limit,
    orderBy,
    timeOfParseSince,
    timeOfParseTo,
    `SELECT COUNT(*) FROM ${tableName} `
    )

const _universalGetPosts = <T>(
    db:any,
    tableName:string,
    post:Partial<T> = {},
    from:number = 0,
    limit:number = 10,
    orderBy:string = "DESC",
    timeOfParseSince?:number|string,
    timeOfParseTo?:number|string,
    query:string|undefined = undefined
) =>{
    if (!query)
        query = `SELECT * FROM ${tableName} `

    query += createWhereQuery(post,["namePost", "fullText"]);
    let timeQuery = createWhereTimeQuery("timeOfParse", timeOfParseSince, timeOfParseTo);
    if (timeQuery.length > 0){
        if (query !== query) {
            query += " AND " + timeQuery;
        }
        query += " WHERE "+ timeQuery;

    }

    query += ` ORDER BY id ${orderBy} LIMIT ?, ? ;`
    try {
        return db.prepare(query).all(from, limit) as T[]
    }
    catch (e) {
        consoleLog("from "+__filename +" getGrants\n" + e.message)
        throw new Error(e)
    }
}

export const universalGetPosts = <T>(
    db:any,
    tableName:string,
    post:Partial<T> = {},
    from:number = 0,
    limit?:number,
    orderBy:string = "DESC",
    timeOfParseSince?:number|string,
    timeOfParseTo?:number|string) =>
    _universalGetPosts(db,tableName,post,from,limit,orderBy,timeOfParseSince,timeOfParseTo) as T[]