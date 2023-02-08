import * as sqliteParser from "../API/sqlite/parser/parser";
import * as sqliteGrant from "../API/sqlite/parser/grants";

export const configureAll = () => {
    // Это в продакшен не пускать)
    configureParserTable();
    configureGrantsTable();
}

export const configureParserTable = () => {
    sqliteParser.dropTable();
    sqliteParser.createTable();
}

export const configureGrantsTable = () => {
    sqliteGrant.dropTable();
    sqliteGrant.createTable();
}