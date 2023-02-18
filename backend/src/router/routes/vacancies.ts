import {Router} from "express";
import {generateAnswer} from "../../utils/generateServerAnswer";
import {answerMessage, TVacancy} from "@iisdc/types";
import {ICustomRequest} from "../../types/request";
import * as sqliteVacancies from "../../API/sqlite/parser/vacancies";
import {toNormalVacancy} from "../../helpers/toNormalPost";
import {isUserCanEnter} from "../../auth/isUserCanEnter";

function getVacancy (req:ICustomRequest) {
    const vacancy:TVacancy = {
        id: req.body.id,
        namePost: req.body.namePost,
        dateCreationPost: req.body.dateCreationPost,
        direction: req.body.direction,
        organization: req.body.organization,
        link: req.body.link,
        timeOfParse:req.body.timeOfParse,
        fullText:req.body.fullText,
        conditions: req.body.conditions,
        salary: req.body.salary,
        requirements: req.body.requirements,
        responsibilities: req.body.responsibilities
    }
    return vacancy
}

const router = Router();

router.post('/vacancies/get',(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    const vacancy = getVacancy(req)

    const timeOfParseSince = req.body.timeOfParseSince;
    const timeOfParseTo = req.body.timeOfParseTo;
    const limit = req.body.limit;
    res.json(generateAnswer({
        message:answerMessage.success,
        data: sqliteVacancies.getVacancies(vacancy,limit,"DESC",timeOfParseSince,timeOfParseTo)
    }))
})

router.post("/vacancies/add", (req:ICustomRequest, res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    const vacancy = toNormalVacancy(getVacancy(req))

    try {
        if (sqliteVacancies.isVacancyExist(vacancy)) {
            res.json(generateAnswer({
                message: answerMessage.unknownError,
                data: ["This post already exist"]
            }))
            return;
        }
        vacancy.timeOfParse = new Date().getTime()
        sqliteVacancies.add(vacancy)
    }
    catch (e){
        res.json(generateAnswer({
            message: answerMessage.unknownError,
            data: e.message
        }))
        return;
    }
    res.json(generateAnswer({
        message:answerMessage.success,
        data: sqliteVacancies.getVacancies(vacancy)
    }))
})

router.post("/vacancies/delete", (req: ICustomRequest, res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    const id = req.body.id
    if (id === undefined) {
        res.json(generateAnswer({
            message: answerMessage.unknownError,
            data: "id must not be undefined"
        }))
        return
    }
    try {
        const post = sqliteVacancies.getVacancies({id})[0]
        sqliteVacancies.deleteVacancy(id)
        res.json(generateAnswer({
            message: answerMessage.success,
            data: post
        }))
    } catch (e) {
        res.json(generateAnswer({
            message: answerMessage.unknownError,
            data: e.message
        }))
        return;
    }
})

router.post("/vacancies/count", (req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    const vacancy = getVacancy(req)

    res.json(generateAnswer({
        message:answerMessage.success,
        data: sqliteVacancies.count(vacancy)
    }))
})

export default router