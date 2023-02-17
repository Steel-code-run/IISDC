import {ICustomRequest} from "../../types/request";
import {TBeautifulStats} from "@iisdc/types/src/serial/beautifulStats";
import * as sqliteCompetitions from "../../API/sqlite/parser/competitions";
import * as sqliteGrants from "../../API/sqlite/parser/grants";
import * as sqliteVacancies from "../../API/sqlite/parser/vacancies";
import {generateAnswer} from "../../utils/generateServerAnswer";
import {Router} from "express";
import {isUserCanEnter} from "../auth";
import {answerMessage} from "@iisdc/types";

const router = Router();
router.post("/getBeautifulStats", (req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    const yesterday = new Date().getTime() - 86400000;
    const beautifulStats:TBeautifulStats = {
        competitions: sqliteCompetitions.count({},10,"DESC",yesterday,undefined)[0]["COUNT(*)"],
        grants: sqliteGrants.count({},10,"DESC",yesterday,undefined)[0]["COUNT(*)"],
        vacancies: sqliteVacancies.count({},10,"DESC", yesterday, undefined)[0]["COUNT(*)"],
        internships: 0,
    }
    res.json(generateAnswer({message:answerMessage.success,data:beautifulStats}))
})

export default router