import {query, Router} from "express";
import {routes} from "../../routes";
import {ICustomRequest} from "../../../types/request";
import {isUserCanEnter} from "../../../auth/isUserCanEnter";
import {answerMessage, TCompetition, TGrant} from "@iisdc/types";
import {competitionsOperations} from "../../../API/sqlite/OperationInstances";
import {generateAnswer} from "../../../utils/generateServerAnswer";

const router = Router();

const getCompetition = (obj:any) => {
    let grant:TCompetition = {
        namePost: obj.namePost,
        dateCreationPost: obj.dateCreationPost,
        direction: obj.direction,
        organization: obj.organization,
        deadline: obj.deadline,
        sourceLink: obj.sourceLink,
        fullText: obj.fullText,
        link: obj.link,
        linkPDF: obj.linkPDF,
        timeOfParse: obj.timeOfParse,
        blackListed: obj.blackListed,
        id: obj.id
    }
    return grant
}

router.get(routes.v2.competitions.get,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    let competition = getCompetition(req.query)

    if (typeof competition.direction === "string")
        competition.direction = [competition.direction]

    try {
        let postForReturn;
        if (competition.id)
            postForReturn = competitionsOperations.get(competition.id)
        else
        postForReturn = competitionsOperations.getPosts({
            namePost: competition.namePost,
            blackListed: competition.blackListed,
            from:req.query.from as number | undefined,
            limit: req.query.limit as number | undefined,
            directions: competition.direction,
            justCountIt: !!req.query.justCountIt,
        });
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success, data: postForReturn}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
    }
})

router.get(routes.v2.competitions.count,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    let competition = getCompetition(req.query)

    if (!Array.isArray(competition.direction))
        competition.direction = []

    try {
        let postsForReturn;
            postsForReturn = competitionsOperations.getPosts({
                directions: competition.direction,
                blackListed: competition.blackListed || 0,
                namePost: competition.namePost || '',
                from:0,
                limit: 1000000000,
                justCountIt: true,
            });
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success, data: postsForReturn}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
    }
})
router.delete(routes.v2.competitions.delete,(req:ICustomRequest,res)=>{
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
        competitionsOperations.deletePost(Number(req.query.id))
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})

router.patch(routes.v2.competitions.update,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    let newCompetition: TCompetition
    let reqCompetition = getCompetition(req.body)


    if (!reqCompetition.id) {
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.requiredParams, data: "grant.id - integer, required"}))
        return
    }

    try {
        let oldGrant = competitionsOperations.get(reqCompetition.id)

        if (oldGrant === undefined) {
            res.statusCode = 400
            res.json(generateAnswer({message: answerMessage.postNotFound}))
            return
        }


        newCompetition = {
            namePost: oldGrant.namePost,
            blackListed: oldGrant.blackListed,
            id: oldGrant.id,
            timeOfParse: oldGrant.timeOfParse,
            sourceLink: oldGrant.sourceLink,

            direction: reqCompetition.direction || oldGrant.direction,
            linkPDF: reqCompetition.linkPDF || oldGrant.linkPDF,
            link: reqCompetition.link || oldGrant.link,
            fullText: reqCompetition.fullText || oldGrant.fullText,
            organization: reqCompetition.organization || oldGrant.organization,
            deadline: reqCompetition.deadline || oldGrant.deadline,
            dateCreationPost: reqCompetition.dateCreationPost || oldGrant.dateCreationPost,
        }

    } catch (e) {
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }

    try {
        competitionsOperations.update(newCompetition)
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }

})

router.patch(routes.v2.competitions.addToBlackList, (req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    let id = req.body.id

    if ((!id) || (Number.isNaN(id)) || (id < 0)){
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.requiredParams, data: "id - integer, required"}))
        return
    }

    try {
        competitionsOperations.setPostToBlackList(id)
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return;
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})

router.patch(routes.v2.competitions.removeFromBlackList, (req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    let id = req.body.id

    if ((!id) || (Number.isNaN(id)) || (id < 0)){
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.requiredParams, data: "id - integer, required"}))
        return
    }

    try {
        competitionsOperations.removeFromBlackList(id)
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return;
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})

export default router