import * as sqliteParser from "../parser/parser";
import * as sqliteGrant from "../parser/grants";
import * as sqliteUsers from "../users/users";
import * as sqliteCompetitions from "../parser/competitions";
import * as sqliteVacancies from "../parser/vacancies"
import {createDefaultUsers} from "./createDefaultUsers";

// Это в продакшен не пускать)
export const configureAll = () => {
    configureParserTable();
    configureGrantsTable();
    configureUsersTable();
    createDefaultUsers();
    configureCompetitionsTable();
    configureVacanciesTable()
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
}

export const configureVacanciesTable = () =>{
    sqliteVacancies.dropTable();
    sqliteVacancies.createTable();
}