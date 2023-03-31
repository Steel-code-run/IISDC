import {query, Router} from "express";
import {routes} from "../../routes";
import {ICustomRequest} from "../../../types/request";
import {isUserCanEnter} from "../../../auth/isUserCanEnter";
import {answerMessage, TCompetition, TGrant, TInternship} from "@iisdc/types";
import {competitionsOperations, internshipOperations} from "../../../API/sqlite/OperationInstances";
import {generateAnswer} from "../../../utils/generateServerAnswer";

const router = Router();

const getInternship = (obj:any) => {
    let grant:TInternship = {
        namePost: obj.namePost,
        dateCreationPost: obj.dateCreationPost,
        organization: obj.organization,
        requirements: obj.requirements,
        responsibilities: obj.responsibilities,
        conditions: obj.conditions,
        salary: obj.salary,
        sourceLink: obj.sourceLink,
        fullText: obj.fullText,
        link: obj.link,
        timeOfParse: obj.timeOfParse,
        blackListed: obj.blackListed,
        id: obj.id
    }
    return grant
}

router.post(routes.v2.internships.get,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    let competition = getInternship(req.body)


    try {
        let postForReturn;
        if (competition.id)
            postForReturn = internshipOperations.get(competition.id)
        else
        postForReturn = internshipOperations.getPosts({
            namePost: competition.namePost,
            blackListed: competition.blackListed || 0,
            from:req.body.from as number | undefined,
            limit: req.body.limit as number | undefined,
            justCountIt: !!req.body.justCountIt,
        });
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success, data: postForReturn}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
    }
})

router.post(routes.v2.internships.count,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    let competition = getInternship(req.body)


    try {
        let postsForReturn;
            postsForReturn = internshipOperations.getPosts({
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
router.delete(routes.v2.internships.delete,(req:ICustomRequest,res)=>{
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
        internshipOperations.deletePost(Number(req.query.id))
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})

router.patch(routes.v2.internships.update,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    let newInternship: TInternship
    let reqCompetition = getInternship(req.body)


    if (!reqCompetition.id) {
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.requiredParams, data: "grant.id - integer, required"}))
        return
    }

    try {
        let oldPost = internshipOperations.get(reqCompetition.id)

        if (oldPost === undefined) {
            res.statusCode = 400
            res.json(generateAnswer({message: answerMessage.postNotFound}))
            return
        }


        newInternship = {
            namePost: oldPost.namePost,
            blackListed: oldPost.blackListed,
            id: oldPost.id,
            timeOfParse: oldPost.timeOfParse,
            sourceLink: oldPost.sourceLink,

            link: reqCompetition.link || '',
            fullText: reqCompetition.fullText || '',
            organization: reqCompetition.organization || '',
            dateCreationPost: reqCompetition.dateCreationPost || '',
            salary: reqCompetition.salary || '',
            conditions : reqCompetition.conditions || '',
            responsibilities : reqCompetition.responsibilities || '',
            requirements : reqCompetition.requirements || '',
            direction : reqCompetition.direction || '',
        }

    } catch (e) {
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }

    try {
        internshipOperations.update(newInternship)
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }

})

router.patch(routes.v2.internships.addToBlackList, (req:ICustomRequest,res)=>{
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
        internshipOperations.setPostToBlackList(id)
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return;
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})

router.patch(routes.v2.internships.removeFromBlackList, (req:ICustomRequest,res)=>{
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
        internshipOperations.removeFromBlackList(id)
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