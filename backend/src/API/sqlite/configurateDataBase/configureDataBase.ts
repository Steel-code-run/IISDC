import * as sqliteUsers from "../users/users";
import {createDefaultUsers} from "./createDefaultUsers";
import {consoleLog} from "../../../utils/consoleLog";
import {generateDefaultParsers} from "../../../model/defaultParsers";
import * as sqliteParser from "../parser/parser";
import {directionsConstOperations} from "../OperationInstances";
import {DirectionType} from "@iisdc/types";

export const configureAll = () => {
    configureDefaultUsers()
    configureDefaultParsers()
    configureDirectionsConstTable()
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

export const configureDirectionsConstTable = ()=>{
    if (directionsConstOperations.getAll().length < 1) {
        directionsConstOperations.insertConst(DirectionType.Unknown)
        directionsConstOperations.insertConst(DirectionType.drones)
        directionsConstOperations.insertConst(DirectionType.Biotech)
        directionsConstOperations.insertConst(DirectionType.IT)
        directionsConstOperations.insertConst(DirectionType.Pedagogy)
        directionsConstOperations.insertConst(DirectionType.Philology)
        directionsConstOperations.insertConst(DirectionType.Journalism)
        directionsConstOperations.insertConst(DirectionType.Design)
        directionsConstOperations.insertConst(DirectionType.Chemistry)
        directionsConstOperations.insertConst(DirectionType.Economy)
        directionsConstOperations.insertConst(DirectionType.Geography)
        directionsConstOperations.insertConst(DirectionType.libraryScience)
        directionsConstOperations.insertConst(DirectionType.Medicine)
        directionsConstOperations.insertConst(DirectionType.Physiology)
        directionsConstOperations.insertConst(DirectionType.SocialWork)
        directionsConstOperations.insertConst(DirectionType.Tourism)
    }
}



