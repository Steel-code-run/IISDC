import {query, Router} from "express";
import {routes} from "../../routes";
import {ICustomRequest} from "../../../types/request";
import {isUserCanEnter} from "../../../auth/isUserCanEnter";
import {answerMessage, TGrant} from "@iisdc/types";
import {grantsOperations} from "../../../API/sqlite/OperationInstances";
import {generateAnswer} from "../../../utils/generateServerAnswer";

const router = Router();

const getGrant = (obj:any) => {
    let grant:TGrant = {
        namePost: obj.namePost,
        dateCreationPost: obj.dateCreationPost,
        direction: obj.direction,
        organization: obj.organization,
        deadline: obj.deadline,
        summary: obj.summary,
        directionForSpent: obj.directionForSpent,
        fullText: obj.fullText,
        link: obj.link,
        linkPDF: obj.linkPDF,
        timeOfParse: obj.timeOfParse,
        blackListed: obj.blackListed,
        id: obj.id
    }
    return grant
}

router.get(routes.v2.grants.getGrants,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    let grant = getGrant(req.query)

    if (typeof grant.direction === "string")
        grant.direction = [grant.direction]

    try {
        let grantsForReturn = grantsOperations.getGrants({
            namePost: grant.namePost,
            blackListed: grant.blackListed,
            from:req.query.from as number | undefined,
            limit: req.query.limit as number | undefined,
            directions: grant.direction
        });
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success, data: grantsForReturn}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e}))
    }
})
router.delete(routes.v2.grants.deleteGrant,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    let id = Number(req.query.id)
    if ((!id) || (Number.isNaN(id)) || (id < 0)){
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.requiredParams, data: "id - integer,  is required"}))
        return
    }


    try {
        grantsOperations.deleteGrant(Number(req.query.id))
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e}))
        return
    }
})

export default router