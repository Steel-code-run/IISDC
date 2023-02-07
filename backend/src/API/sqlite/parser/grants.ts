import * as path from "path";
import {consoleLog} from "../../../utils/consoleLog";
import {__projectPath} from "../../../utils/projectPath";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','parser.db'));

export const createGrantsTable = ()=>{
    try {
        db.prepare('CREATE TABLE grants(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'namePost STRING UNIQUE,' +
            'dateCreationPost STRING,' +
            'direction STRING,' +
            'organization STRING,' +
            'deadline STRING,' +
            'summary STRING,' +
            'directionForSpent STRING,' +
            'fullText STRING,' +
            'link STRING,' +
            ');').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }
    return true
}

export const isGrantsTableExist = ()=>{
    try {
        return db.prepare('SELECT name FROM sqlite_master WHERE type=\'table\' ' +
            'AND name=\'grants\';').all().length > 0
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }
}