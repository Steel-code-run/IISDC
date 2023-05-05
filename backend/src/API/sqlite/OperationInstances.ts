import {DirectionsConstOperations} from "./DirectionsConstOperations";
import {
    competitionsTableName,
    directionsConstTableName,
    directionsTableName,
    grantsTableName,
    internshipsTableName,
    parserDb, usersTableName,
    vacanciesTableName
} from "./config";
import {DirectionsOperations} from "./DirectionsOperations";
import {GrantsOperations} from "./parser/GrantsOperations";
import {CompetitionOperations} from "./parser/CompetitionsOperation";
import {InternshipOperations} from "./parser/InternshipsOperations";
import {VacanciesOperations} from "./parser/VacanciesOperations";
import {UsersOperations} from "./users/UsersOperations";

export const directionsConstOperations = new DirectionsConstOperations(parserDb, directionsConstTableName)
export const directionsOperations = new DirectionsOperations(parserDb, directionsTableName, directionsConstOperations)
export const grantsOperations = new GrantsOperations(parserDb,grantsTableName, directionsOperations)
export const competitionsOperations = new CompetitionOperations(parserDb,competitionsTableName, directionsOperations)
export const internshipOperations = new InternshipOperations(parserDb,internshipsTableName)
export const vacanciesOperations = new VacanciesOperations(parserDb,vacanciesTableName)
export const usersOperations = new UsersOperations(parserDb,usersTableName)