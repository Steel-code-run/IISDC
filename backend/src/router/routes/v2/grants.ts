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
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
    }
})
router.delete(routes.v2.grants.deleteGrant,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    let id = Number(req.query.id)
    if ((!id) || (Number.isNaN(id)) || (id < 0)){
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.requiredParams, data: "id - integer, required"}))
        return
    }


    try {
        grantsOperations.deleteGrant(Number(req.query.id))
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})

router.patch(routes.v2.grants.updateGrant,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    let newGrant: TGrant
    let reqGrant = getGrant(req.body)


    if (!reqGrant.id) {
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.requiredParams, data: "grant.id - integer, required"}))
        return
    }

    try {
        let oldGrant = grantsOperations.getGrant(reqGrant.id)

        if (oldGrant === undefined) {
            res.statusCode = 400
            res.json(generateAnswer({message: answerMessage.postNotFound}))
            return
        }


        newGrant = {
            namePost: oldGrant.namePost,
            blackListed: oldGrant.blackListed,
            id: oldGrant.id,
            timeOfParse: oldGrant.timeOfParse,
            sourceLink: oldGrant.sourceLink,

            direction: reqGrant.direction || oldGrant.direction,
            linkPDF: reqGrant.linkPDF || oldGrant.linkPDF,
            link: reqGrant.link || oldGrant.link,
            fullText: reqGrant.fullText || oldGrant.fullText,
            summary: reqGrant.summary || oldGrant.summary,
            directionForSpent: reqGrant.directionForSpent || oldGrant.directionForSpent,
            organization: reqGrant.organization || oldGrant.organization,
            deadline: reqGrant.deadline || oldGrant.deadline,
            dateCreationPost: reqGrant.dateCreationPost || oldGrant.dateCreationPost,
        }

    } catch (e) {
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }

    try {
        grantsOperations.updateGrant(newGrant)
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})

export default router