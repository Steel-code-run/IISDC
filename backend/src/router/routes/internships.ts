import {Router} from "express";
import {ICustomRequest} from "../../types/request";
import {isUserCanEnter} from "../../auth/isUserCanEnter";
import {generateAnswer} from "../../utils/generateServerAnswer";
import * as sqliteInternship from "../../API/sqlite/parser/internships";
import {toNormalInternship} from "../../helpers/toNormalPost";
import {answerMessage, TInternship} from "@iisdc/types";


const router = Router()

const getInternship = (req:ICustomRequest) =>{
    const internship:TInternship = {
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
        responsibilities: req.body.responsibilities,
    }

    return internship
}
router.post("/internships/get",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const internship = getInternship(req)
    const timeOfParseSince = req.body.timeOfParseSince;
    const timeOfParseTo = req.body.timeOfParseTo;
    const limit = req.body.limit;
    const from = req.body.from

    res.json(generateAnswer({message:answerMessage.success,data: sqliteInternship.getInternships(internship,from,limit,"DESC",timeOfParseSince,timeOfParseTo)}))
})

router.post("/internships/add",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const internship = toNormalInternship(getInternship(req))
    try {
        sqliteInternship.add(internship)
        res.json(generateAnswer({message:answerMessage.success,data:sqliteInternship.getInternships(internship)}))
    }
    catch (e) {
        res.json(generateAnswer({message:answerMessage.unknownError,data:{messageToHuman:e.message}}))
    }
})
router.post("/internships/count", (req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    const internship = getInternship(req)

    res.json(generateAnswer({
        message:answerMessage.success,
        data: sqliteInternship.count(internship)?.[0]?.["COUNT(*)"] ?? 0
    }))
})
router.post("/internships/update", (req:ICustomRequest, res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }

    const internship = getInternship(req)

    try {
        sqliteInternship.update(internship)
    } catch (e) {
        res.json(generateAnswer({
            message:answerMessage.unknownError,
            data: e.message
        }))
        return
    }

    res.json(generateAnswer({
        message:answerMessage.unknownError,
        data: sqliteInternship.getInternships(internship)
    }))
})

router.post("/internships/delete",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }

    const id = req.body.id;

    if (id === undefined) {
        res.json(generateAnswer({message:answerMessage.unknownError,data:"id is undefined"}))
        return;
    }
    const internship = sqliteInternship.getInternships({id})
    sqliteInternship.deleteInternship(id)

    res.json(generateAnswer({message:answerMessage.success, data:internship}))
})
export default router