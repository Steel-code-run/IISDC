import {__projectPath} from "~/src/utils/projectPath";
import * as path from "path";
import {consoleLog} from "~/src/utils/consoleLog";
const db = require('better-sqlite3')(path.join(__projectPath, '../','sqlite','db','users.db'));


export const createUsersDataTable = ()=>{
    try {
        db.prepare('CREATE TABLE usersData(' +
            'id INTEGER AUTOINCREMENT,' +
            'name STRING,' +
            'password STRING,' +
            'PRIMARY KEY (id)' +
            ');').run()
    }
    catch (e) {
        consoleLog("from "+__filename +"\n" +e)
        throw new Error(e)
    }
    return true
}
export const getUsers = () => {

}