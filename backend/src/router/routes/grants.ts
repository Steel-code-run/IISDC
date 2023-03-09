import {ICustomRequest} from "../../types/request";
import {generateAnswer} from "../../utils/generateServerAnswer";
import * as sqliteGrants from "../../API/sqlite/parser/grants";
import {toNormalGrant} from "../../helpers/toNormalPost";
import {Router} from "express";
import {answerMessage, DirectionType, TGrant} from "@iisdc/types";
import {isUserCanEnter} from "../../auth/isUserCanEnter";


const router = Router()
const getGrant = (req:ICustomRequest) => {
    let grant:TGrant = {
        namePost: req.body.namePost,
        dateCreationPost: req.body.dateCreationPost,
        direction: req.body.direction,
        organization: req.body.organization,
        deadline: req.body.deadline,
        summary: req.body.summary,
        directionForSpent: req.body.directionForSpent,
        fullText: req.body.fullText,
        link: req.body.link,
        linkPDF: req.body.linkPDF,
        timeOfParse: req.body.timeOfParse,
        id: req.body.id
    }
    return grant
}
router.post("/grants/get",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const grant = getGrant(req)
    const timeOfParseSince = req.body.timeOfParseSince;
    const timeOfParseTo = req.body.timeOfParseTo;
    const from = req.body.from
    const limit = req.body.limit;
    res.json(generateAnswer({message:answerMessage.success,data: sqliteGrants.getGrants(grant,from,limit,"DESC",timeOfParseSince,timeOfParseTo)}))
})

router.post("/grants/add",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const grant = toNormalGrant(getGrant(req))
    try {
        sqliteGrants.add(grant)
        res.json(generateAnswer({message:answerMessage.success,data:sqliteGrants.getGrants(grant)}))
    }
    catch (e) {
        res.json(generateAnswer({message:answerMessage.unknownError,data:{messageToHuman:e.message}}))
    }
})

router.post("/grants/delete",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }

    const id = req.body.id;

    if (id === undefined) {
        res.json(generateAnswer({message:answerMessage.unknownError,data:"id is undefined"}))
        return;
    }
    const grant = sqliteGrants.getGrants({id})
    sqliteGrants.deleteGrant(id)

    res.json(generateAnswer({message:answerMessage.success, data:grant}))

})

router.post("/grants/count", (req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    const grant = getGrant(req)
    res.json(generateAnswer({
        message:answerMessage.success,
        data: sqliteGrants.count(grant)?.[0]?.["COUNT(*)"] ?? 0
    }))
})

router.post("/grants/update", (req:ICustomRequest, res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }

    const grant = getGrant(req)

    grant.direction = JSON.stringify(grant.direction);

    try {
        sqliteGrants.updateGrant(grant)
    } catch (e) {
        res.json(generateAnswer({
            message:answerMessage.unknownError,
            data: e.message
        }))
    }

    res.json(generateAnswer({
        message:answerMessage.success,
        data: sqliteGrants.getGrants(grant)
    }))
})

router.post("/grants/getDirections", (req:ICustomRequest, res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    let directions:any[] = [];

    for (let directionTypeKey in DirectionType) {
        directions.push(DirectionType[directionTypeKey as keyof typeof DirectionType])
    }


    res.json(generateAnswer({
        message: answerMessage.success,
        data: directions
    }))
})
export default router