import {Router} from "express";
import {ICustomRequest} from "../../types/request";
import {isUserCanEnter} from "../../auth/isUserCanEnter";
import {answerMessage, IUser} from "@iisdc/types";
import * as sqliteUsers from "../../API/sqlite/users/users"
import {generateAnswer} from "../../utils/generateServerAnswer";

const router =  Router()

router.post("/users/getUsers",(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    const userSearch:IUser = {
        id: req.body.id,
        name: req.body.name,
        role: req.body.role
    }
    const limit = req.body.limit
    const from = req.body.from

    try {
        let users = sqliteUsers.getUsers(userSearch,from,limit,"DESC")
        users.forEach(user=>{
            delete user.password
        })
        res.json(generateAnswer({message:answerMessage.success,data:users}))

    } catch (e){
        res.json(generateAnswer({message:answerMessage.success,data:e.message}))
    }
})

router.post("/users/getMe",(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    if (req.user?.name === "BYPASS") {
        res.json(generateAnswer({message:answerMessage.success,data:req.user}))
        return
    }
    // typeGuard
    if (!req.user) {
        res.json(generateAnswer({message:answerMessage.unauthorized}))
        return
    }

    try {
        let users = sqliteUsers.getUsers(req.user,0,1,"DESC")
        users.forEach(user=>{
            delete user.password
        })
        res.json(generateAnswer({message:answerMessage.success,data:users[0]}))

    } catch (e){
        res.json(generateAnswer({message:answerMessage.success,data:e.message}))
    }
})
export default router