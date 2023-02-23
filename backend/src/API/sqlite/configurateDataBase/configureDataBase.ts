import * as sqliteUsers from "../users/users";
import {createDefaultUsers} from "./createDefaultUsers";
import {consoleLog} from "../../../utils/consoleLog";
import {generateDefaultParsers} from "../../../model/defaultParsers";
import * as sqliteParser from "../parser/parser";

export const configureAll = () => {
    configureDefaultUsers()
    configureDefaultParsers()
}

export const configureDefaultUsers = () => {
    if (sqliteUsers.getUsers({}).length < 1) {
        consoleLog("started configure default users")
        sqliteUsers.dropTable()
        sqliteUsers.createTable()
        createDefaultUsers();
    }
}

export const configureDefaultParsers = () =>{
    const parsers = generateDefaultParsers();
    consoleLog("started configure default parsers")
    parsers.forEach(parser => {
        if (sqliteParser.getParsers(parser).length < 1)
            sqliteParser.addParser(parser)
    });
}




