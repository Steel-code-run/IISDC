import * as sqliteParser from "../parser/parser";
import * as sqliteGrant from "../parser/grants";
import * as sqliteUsers from "../users/users";
import {createDefaultUsers} from "./createDefaultUsers";

// Это в продакшен не пускать)
export const configureAll = () => {
    configureParserTable();
    configureGrantsTable();
    configureUsersTable();
    createDefaultUsers();
}

export const configureParserTable = () => {
    sqliteParser.dropTable();
    sqliteParser.createTable();
}

export const configureGrantsTable = () => {
    sqliteGrant.dropTable();
    sqliteGrant.createTable();
}

export const configureUsersTable = () => {
    sqliteUsers.dropTable();
    sqliteUsers.createTable();
}