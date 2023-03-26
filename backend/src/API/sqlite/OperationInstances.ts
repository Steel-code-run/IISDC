import {DirectionsConstOperations} from "./DirectionsConstOperations";
import {directionsConstTableName, directionsTableName, grantsTableName, internshipsTableName, parserDb} from "./config";
import {DirectionsOperations} from "./DirectionsOperations";
import {GrantsOperations} from "./parser/GrantsOperations";
import {CompetitionOperations} from "./parser/CompetitionsOperation";
import {InternshipOperations} from "./parser/InternshipsOperations";

export const directionsConstOperations = new DirectionsConstOperations(parserDb, directionsConstTableName)
export const directionsOperations = new DirectionsOperations(parserDb, directionsTableName, directionsConstOperations)
export const grantsOperations = new GrantsOperations(parserDb,grantsTableName, directionsOperations)
export const competitionsOperations = new CompetitionOperations(parserDb,grantsTableName, directionsOperations)
export const internshipOperations = new InternshipOperations(parserDb,internshipsTableName)