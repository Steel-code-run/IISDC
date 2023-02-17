import * as sqliteParser from "../parser/parser";
import * as sqliteGrant from "../parser/grants";
import * as sqliteUsers from "../users/users";
import * as sqliteCompetitions from "../parser/competitions";
import {createDefaultUsers} from "./createDefaultUsers";

// Это в продакшен не пускать)
export const configureAll = () => {
    configureParserTable();
    configureGrantsTable();
    configureUsersTable();
    createDefaultUsers();
    configureCompetitionsTable();
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

export const configureCompetitionsTable = () => {
    sqliteCompetitions.dropTable();
    sqliteCompetitions.createTable();

    sqliteCompetitions.add({
        namePost: "Конкурс на лучшую статью",
        dateCreationPost: "2020-01-01",
        link: "https://www.google.com",
        organization: "ООО Рога и копыта",
        deadline: "2020-01-01",
        fullText: "Конкурс на лучшую статью",
        direction: "Конкурс на лучшую статью",
        timeOfParse: new Date().getTime()
    })
}