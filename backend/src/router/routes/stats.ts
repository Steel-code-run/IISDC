import {ICustomRequest} from "../../types/request";
import {TBeautifulStats} from "@iisdc/types/src/serial/beautifulStats";
import * as sqliteCompetitions from "../../API/sqlite/parser/competitions";
import * as sqliteGrants from "../../API/sqlite/parser/grants";
import * as sqliteVacancies from "../../API/sqlite/parser/vacancies";
import {generateAnswer} from "../../utils/generateServerAnswer";
import {Router} from "express";
import {answerMessage} from "@iisdc/types";
import {isUserCanEnter} from "../../auth/isUserCanEnter";

const router = Router();
router.post("/stats/getBeautifulStats", (req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    const yesterday = new Date().getTime() - 86400000;
    const beautifulStats:TBeautifulStats = {
        competitions: sqliteCompetitions.count({},0,10,"DESC",yesterday,undefined)[0]["COUNT(*)"],
        grants: sqliteGrants.count({},0,10,"DESC",yesterday,undefined)[0]["COUNT(*)"],
        vacancies: sqliteVacancies.count({},0,10,"DESC", yesterday, undefined)[0]["COUNT(*)"],
        internships: 0,
    }
    res.json(generateAnswer({message:answerMessage.success,data:beautifulStats}))
})

export default router