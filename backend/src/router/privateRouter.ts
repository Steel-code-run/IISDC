import {ICustomRequest} from "../types/request";
import { generateAnswer } from "../utils/generateServerAnswer";
import {Router,Response} from "express";
import {answerMessage, IUserWithPassword, TGrant, UserRole} from "@iisdc/types";
import * as parserQueue from "../model/parserQueue";
import * as sqliteGrants from "../API/sqlite/parser/grants";
import * as sqliteUsers from "../API/sqlite/users/users";
const privateRouter = Router();
import * as sqliteParser from "../API/sqlite/parser/parser";
function isUserCanEnter(req:ICustomRequest,res:Response,minRole:UserRole = UserRole.user){
    const user = req.user;
    if (user === undefined) {
        res.json(generateAnswer({message: answerMessage.unauthorized}));
        return false;
    }
    if (user.id < 0) {
        res.json(generateAnswer({message: answerMessage.unauthorized}));
        return false;
    }
    if (user.role === undefined) {
        res.json(generateAnswer({message: answerMessage.insufficientRole}));
        return false;
    }
    if (user.role < minRole) {
        res.json(generateAnswer({message: answerMessage.insufficientRole}));
        return false;
    }
    return true;
}
privateRouter.post("/addParserToQueue",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const parserId = req.body.id;
    if (parserId === undefined) {
        res.json(generateAnswer({message: answerMessage.unknownError,data: {messageToHuman: "parserId is undefined"}}));
        return;
    }

    const parser = sqliteParser.getParser(parserId)
    if (parser === undefined) {
        res.json(generateAnswer({message: answerMessage.unknownError,data: {messageToHuman: "parser is undefined"}}));
        return;
    }
    parserQueue.parserCallQueuePush(parser)
    res.json(generateAnswer({message: answerMessage.success, data: parserQueue.showParsersCallQueue()}));
});

privateRouter.post("/getParsers",(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    res.json(generateAnswer({message:answerMessage.success,data: sqliteParser.getParsers()}))
})
privateRouter.post("/getParsersQueue",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }

    res.json(generateAnswer({message:answerMessage.success,data: parserQueue.showParsersCallQueue()}));
})

privateRouter.post("/getGrants",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const grant:TGrant = {
        namePost: req.body.namePost,
        dateCreationPost: req.body.dateCreationPost,
        direction: req.body.direction,
        organization: req.body.organization,
        deadline: req.body.deadline,
        summary: req.body.summary,
        directionForSpent: req.body.directionForSpent,
        fullText: req.body.fullText,
        link: req.body.link
    }
    const limit = req.body.limit;
    res.json(generateAnswer({message:answerMessage.success,data: sqliteGrants.getGrants(grant,limit)}))
})

privateRouter.post("/addGrant",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const grant:TGrant = {
        namePost: req.body.namePost,
        dateCreationPost: req.body.dateCreationPost,
        direction: req.body.direction,
        organization: req.body.organization,
        deadline: req.body.deadline,
        summary: req.body.summary,
        directionForSpent: req.body.directionForSpent,
        fullText: req.body.fullText,
        link: req.body.link
    }
    try {
        sqliteGrants.addGrant(grant)
        res.json(generateAnswer({message:answerMessage.success,data:sqliteGrants.getGrants(grant)}))
    }
    catch (e) {
        res.json(generateAnswer({message:answerMessage.unknownError,data:{messageToHuman:e.message}}))
    }
})

privateRouter.post("/deleteGrant",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }

    const id = req.body.id;

    if (id === undefined) {
        res.json(generateAnswer({message:answerMessage.unknownError,data:{messageToHuman:"id is undefined"}}))
        return;
    }

    sqliteGrants.deleteGrant(id)

    res.json(generateAnswer({message:answerMessage.success}))

})

privateRouter.post("/getUsers",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const user:IUserWithPassword = {
        name: req.body.name,
        role: req.body.role,
        id: req.body.id,
        password: req.body.password
    }

    res.json(generateAnswer({message:answerMessage.success,data:sqliteUsers.getUsers(user)}))
})
export default privateRouter
