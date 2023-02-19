import {ICustomRequest} from "../../types/request";
import {generateAnswer} from "../../utils/generateServerAnswer";
import * as sqliteGrants from "../../API/sqlite/parser/grants";
import {toNormalGrant} from "../../helpers/toNormalPost";
import {Router} from "express";
import {answerMessage, TGrant} from "@iisdc/types";
import {isUserCanEnter} from "../../auth/isUserCanEnter";


const router = Router()
const getGrant = (req:ICustomRequest) => {
    const grant:TGrant = {
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
    const limit = req.body.limit;
    res.json(generateAnswer({message:answerMessage.success,data: sqliteGrants.getGrants(grant,limit,"DESC",timeOfParseSince,timeOfParseTo)}))
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
        res.json(generateAnswer({message:answerMessage.unknownError,data:{messageToHuman:"id is undefined"}}))
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
        data: sqliteGrants.count(grant)
    }))
})


export default router