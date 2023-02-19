import {Router} from "express";
import {ICustomRequest} from "../../types/request";
import {isUserCanEnter} from "../../auth/isUserCanEnter";
import {answerMessage, UserRole} from "@iisdc/types";
import * as sqliteParser from "../../API/sqlite/parser/parser";
import * as sqliteGrant from "../../API/sqlite/parser/grants";
import * as sqliteUsers from "../../API/sqlite/users/users";
import * as sqliteCompetitions from "../../API/sqlite/parser/competitions";
import * as sqliteVacancies from "../../API/sqlite/parser/vacancies"
import * as sqliteInternships from "../../API/sqlite/parser/internships"
import {generateAnswer} from "../../utils/generateServerAnswer";
import {configureDefaultParsers} from "../../API/sqlite/configurateDataBase/configureDataBase";
import {protectedFromDrop} from "../../API/sqlite/parser/parser";

const router = Router()

const mainUrl = "/database/"

const allDB = [sqliteVacancies, sqliteParser, sqliteUsers, sqliteInternships, sqliteCompetitions, sqliteGrant]

router.post(mainUrl + "recreateAllTables", (req:ICustomRequest, res)=>{
    if (!isUserCanEnter(req,res,UserRole.admin))
        return

    allDB.forEach(db=>{
    db.dropTable();
    db.createTable();
    })
    res.json(generateAnswer({message: answerMessage.success}))
})

router.post(mainUrl + "recreateTable", (req:ICustomRequest, res)=>{
    if (!isUserCanEnter(req,res,UserRole.admin))
        return
    const tableName = req.body.tableName

    const origTableNames = allDB.map(el=>el.tableName)
    const tableNameIndex = origTableNames.indexOf(tableName)

    if (tableNameIndex < 0) {
        res.json(generateAnswer({message: answerMessage.unknownError, data:`table with tableName '${tableName}' is not found`}))
        return
    }

    if (allDB[tableNameIndex].protectedFromDrop) {
        res.json(generateAnswer({message: answerMessage.unknownError, data:"table is drop protected"}))
        return
    }

    allDB[tableNameIndex].dropTable()
    allDB[tableNameIndex].createTable()

    if (allDB[tableNameIndex].tableName === "parsers") {
        configureDefaultParsers()
    }
    res.json(generateAnswer({message: answerMessage.success}))
})

export default router