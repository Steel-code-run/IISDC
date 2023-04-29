import {query, Router} from "express";
import {routes} from "../../routes";
import {ICustomRequest} from "../../../types/request";
import {isUserCanEnter} from "../../../auth/isUserCanEnter";
import {answerMessage, TCompetition, TGrant, TInternship, TVacancy} from "@iisdc/types";
import {generateAnswer} from "../../../utils/generateServerAnswer";
import {vacanciesOperations} from "../../../API/sqlite/OperationInstances";

const router = Router();

const getVacancy = (obj:any) => {
    let grant:TVacancy = {
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
        id: obj.id,

    }
    return grant
}

router.post(routes.v2.vacancies.get,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    let competition = getVacancy(req.body)


    try {
        let postForReturn;
        if (competition.id)
            postForReturn = vacanciesOperations.get(competition.id)
        else
        postForReturn = vacanciesOperations.getPosts({
            namePost: competition.namePost,
            blackListed: competition.blackListed || 0,
            from:req.body.from as number | undefined,
            limit: req.body.limit as number | undefined,
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

router.get(routes.v2.vacancies.count,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    let competition = getVacancy(req.query)


    try {
        let postsForReturn;
            postsForReturn = vacanciesOperations.getPosts({
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
router.delete(routes.v2.vacancies.delete,(req:ICustomRequest,res)=>{
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
        vacanciesOperations.deletePost(Number(req.query.id))
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})

router.patch(routes.v2.vacancies.update,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    let newInternship: TInternship
    let reqCompetition = getVacancy(req.body)


    if (!reqCompetition.id) {
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.requiredParams, data: "post.id - integer, required"}))
        return
    }

    try {
        let oldPost = vacanciesOperations.get(reqCompetition.id)

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
        vacanciesOperations.update(newInternship)
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }

})

router.patch(routes.v2.vacancies.addToBlackList, (req:ICustomRequest,res)=>{
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
        vacanciesOperations.setPostToBlackList(id)
        res.statusCode = 200;
        res.json(generateAnswer({message: answerMessage.success}))
        return;
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})

router.patch(routes.v2.vacancies.removeFromBlackList, (req:ICustomRequest,res)=>{
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
        vacanciesOperations.removeFromBlackList(id)
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