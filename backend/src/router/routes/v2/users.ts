import {query, Router} from "express";
import {routes} from "../../routes";
import {ICustomRequest} from "../../../types/request";
import {isUserCanEnter} from "../../../auth/isUserCanEnter";
import {answerMessage, IUser, TCompetition, TGrant, TInternship, TVacancy} from "@iisdc/types";
import {generateAnswer} from "../../../utils/generateServerAnswer";
import {usersOperations, vacanciesOperations} from "../../../API/sqlite/OperationInstances";

const router = Router();

const getUser = (obj:any) => {
    let grant:IUser = {
        id: obj.id,
        name: obj.name,
        role: obj.role,
        password: obj.password
    }
    return grant
}

router.get(routes.v2.users.getAll,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    try {
        let users = usersOperations.getAllUsers()
        res.json(generateAnswer({message:answerMessage.success, data:users}))
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message:answerMessage.success, data:e}))
    }
})

router.get(routes.v2.users.get,(req:ICustomRequest,res)=>{
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
        let user = usersOperations.getUser(id)
        res.json(generateAnswer({message:answerMessage.success, data:user}))
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message:answerMessage.success, data:e}))
    }
})

router.patch(routes.v2.users.update,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    let user = getUser(req.body)
    let id = user.id

    if ((!id) || (Number.isNaN(id)) || (id < 0)){
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.requiredParams, data: "id - integer, required"}))
        return
    }

    try {
        usersOperations.update(user)
        res.json(generateAnswer({message:answerMessage.success}))
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message:answerMessage.success, data:e}))
    }
})

router.delete(routes.v2.users.delete,(req:ICustomRequest,res)=>{
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
        usersOperations.delete(id)
        res.json(generateAnswer({message:answerMessage.success}))
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message:answerMessage.success, data:e}))
    }
})

export default router