import {DirectionsConstOperations} from "./DirectionsConstOperations";
import {directionsConstTableName, directionsTableName, grantsTableName, parserDb} from "./config";
import {DirectionsOperations} from "./DirectionsOperations";
import {GrantsOperations} from "./parser/GrantsOperations";
import {CompetitionOperations} from "./parser/CompetitionsOperation";

export const directionsConstOperations = new DirectionsConstOperations(parserDb, directionsConstTableName)
export const directionsOperations = new DirectionsOperations(parserDb, directionsTableName, directionsConstOperations)
export const grantsOperations = new GrantsOperations(parserDb,grantsTableName, directionsOperations)
export const competitionsOperations = new CompetitionOperations(parserDb,grantsTableName)
