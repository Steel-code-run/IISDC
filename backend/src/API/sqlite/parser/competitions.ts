import * as path from "path";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
import {shieldIt} from "@iisdc/utils";
import createInsertQuery from "../../../helpers/createInsertQuery";
import {TCompetition} from "@iisdc/types";
import createWhereQuery from "../../../helpers/createWhereQuery";
import createWhereTimeQuery from "../../../helpers/createWhereTimeQuery";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','parser.db'));

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
            'timeOfParse STRING,' +
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
        if (isTableExist())
            db.prepare('DROP TABLE competitions;').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +"dropParsersTable error")
        throw new Error(e)
    }
    return true
}

export const isTableExist = ()=>{
    try {
        return db.prepare('SELECT name FROM sqlite_master WHERE type=\'table\' ' +
            'AND name=\'competitions\';').all().length > 0
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isTableExist")
        throw new Error(e)
    }
}

export const isCompetitionsExist = (namePost: string, dateCreationPost:string)=>{
    try {
        return db.prepare('SELECT * FROM competitions WHERE namePost=?' +
            ' AND dateCreationPost=?;').all(shieldIt(namePost),shieldIt(dateCreationPost)).length > 0
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" + "Error in isGrantExist")
        throw new Error(e)
    }
}

export const add = (competition: TCompetition)=>{
    try {
        if (competition.namePost === undefined || competition.dateCreationPost === undefined)
            throw new Error("namePost or dateCreationPost is undefined")

        let query = "INSERT INTO competitions " + createInsertQuery(competition);

        db.prepare(query).run()

    } catch (e) {
        consoleLog("from "+__filename +"\n" + e.message)
        throw new Error(e)
    }
}

export const deleteCompetition = (id:number)=>{
    try {
        db.prepare('DELETE FROM competitions WHERE id=?;').run(id)
    } catch (e) {
        consoleLog("from "+__filename +"\n" + e.message)
        throw new Error(e)
    }
}

export const count = (competition:Partial<TCompetition> = {},
                      limit?:number,
                      orderBy:string = "DESC",
                      timeOfParseSince?:number|string,
                      timeOfParseTo?:number|string)=>
    _getCompetitions(competition,limit,orderBy,timeOfParseSince,timeOfParseTo,"SELECT COUNT(*) FROM competitions ")

const _getCompetitions = (competition:Partial<TCompetition> = {},
                    limit?:number,
                    orderBy:string = "DESC",
                    timeOfParseSince?:number|string,
                    timeOfParseTo?:number|string,
                    startQueury:string = 'SELECT * FROM competitions'
)=>{
    let query = startQueury;
    query += createWhereQuery(competition,{namePost:competition.namePost});
    let timeQuery = createWhereTimeQuery("timeOfParse", timeOfParseSince, timeOfParseTo);
    if (timeQuery.length > 0){
        if (query !== startQueury) {
            query += " AND " + timeQuery;
        }
        query += " WHERE "+ timeQuery;

    }

    query += ` ORDER BY id ${orderBy} LIMIT ? ;`
    if (limit === undefined)
        limit = 10
    try {
        return db.prepare(query).all(limit)
    }
    catch (e) {
        consoleLog("from "+__filename +" getGrants\n" + e.message)
        throw new Error(e)
    }
}

export const getCompetitions = (competition:Partial<TCompetition> = {},
                          limit?:number,
                          orderBy:string = "DESC",
                          timeOfParseSince?:number|string,
                          timeOfParseTo?:number|string)=>
    _getCompetitions(competition,limit,orderBy,timeOfParseSince,timeOfParseTo)