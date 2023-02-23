import {Router} from "express";
import {isUserCanEnter} from "../../auth/isUserCanEnter";
import {answerMessage, TCompetition} from "@iisdc/types";
import {ICustomRequest} from "../../types/request";
import {toNormalCompetition} from "../../helpers/toNormalPost";
import {generateAnswer} from "../../utils/generateServerAnswer";
import * as sqliteCompetitions from "../../API/sqlite/parser/competitions"

const router = Router()

const getCompetitions = (req:ICustomRequest) =>{
    const competition:TCompetition = {
        namePost: req.body.namePost,
        dateCreationPost: req.body.dateCreationPost,
        direction: req.body.direction,
        organization: req.body.organization,
        deadline: req.body.deadline,
        fullText: req.body.fullText,
        link: req.body.link,
        timeOfParse: req.body.timeOfParse,
        id:req.body.id,
    }

    return competition
}
router.post("/competitions/get",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const competition = getCompetitions(req)
    const timeOfParseSince = req.body.timeOfParseSince;
    const timeOfParseTo = req.body.timeOfParseTo;
    const from = req.body.from
    const limit = req.body.limit;
    res.json(generateAnswer({message:answerMessage.success,data: sqliteCompetitions.getCompetitions(competition,from,limit,"DESC",timeOfParseSince,timeOfParseTo)}))
})

router.post("/competitions/add",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const competition = toNormalCompetition(getCompetitions(req))
    try {
        sqliteCompetitions.add(competition)
        res.json(generateAnswer({message:answerMessage.success,data:sqliteCompetitions.getCompetitions(competition)}))
    }
    catch (e) {
        res.json(generateAnswer({message:answerMessage.unknownError,data:{messageToHuman:e.message}}))
    }
})
router.post("/competitions/count", (req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    const competition = getCompetitions(req)

    res.json(generateAnswer({
        message:answerMessage.success,
        data: sqliteCompetitions.count(competition)?.[0]?.["COUNT(*)"] ?? 0
    }))
})
export default router