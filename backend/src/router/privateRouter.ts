import {ICustomRequest} from "../types/request";
import { generateAnswer } from "../utils/generateServerAnswer";
import {Router, Response, json} from "express";
import {answerMessage, IUserWithPassword, TCompetition, TGrant, UserRole} from "@iisdc/types";
import * as parserQueue from "../model/parserQueue";
import * as sqliteGrants from "../API/sqlite/parser/grants";
import * as sqliteCompetitions from "../API/sqlite/parser/competitions";
import * as sqliteUsers from "../API/sqlite/users/users";
const privateRouter = Router();
import * as sqliteParser from "../API/sqlite/parser/parser";
import {TBeautifulStats} from "@iisdc/types/src/serial/beautifulStats";
import {count} from "../API/sqlite/parser/grants";
import {toNormalCompetition, toNormalGrant} from "../helpers/toNormalPost";
function isUserCanEnter(req:ICustomRequest,res:Response,minRole:UserRole = UserRole.user){
    const user = req.user;
    if (user === undefined) {
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

    const limit = req.body.limit;
    res.json(generateAnswer({message:answerMessage.success,data: sqliteParser.getParsers(limit)}))
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
        link: req.body.link,
        linkPDF: req.body.linkPDF

    }
    const timeOfParseSince = req.body.timeOfParseSince;
    const timeOfParseTo = req.body.timeOfParseTo;
    const limit = req.body.limit;
    res.json(generateAnswer({message:answerMessage.success,data: sqliteGrants.getGrants(grant,limit,"DESC",timeOfParseSince,timeOfParseTo)}))
})

privateRouter.post("/addGrant",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const grant:TGrant = toNormalGrant({
        namePost: req.body.namePost,
        dateCreationPost: req.body.dateCreationPost,
        direction: req.body.direction,
        organization: req.body.organization,
        deadline: req.body.deadline,
        summary: req.body.summary,
        directionForSpent: req.body.directionForSpent,
        fullText: req.body.fullText,
        link: req.body.link,
        linkPDF: req.body.linkPDF
    })
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

    const limit = req.body.limit;

    res.json(generateAnswer({message:answerMessage.success,data:sqliteUsers.getUsers(user,limit)}))
})

privateRouter.post("/getBeautifulStats", (req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }
    const yesterday = new Date().getTime() - 86400000;
    const beautifulStats:TBeautifulStats = {
        competitions: sqliteCompetitions.count({},10,"DESC",yesterday,undefined)[0]["COUNT(*)"],
        grants: sqliteGrants.count({},10,"DESC",yesterday,undefined)[0]["COUNT(*)"],
        internships: 0,
        vacancies: 0,
    }
    res.json(generateAnswer({message:answerMessage.success,data:beautifulStats}))
})

privateRouter.post("/getCompetitions",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }
    const competition:TCompetition = {
        namePost: req.body.namePost,
        dateCreationPost: req.body.dateCreationPost,
        direction: req.body.direction,
        organization: req.body.organization,
        deadline: req.body.deadline,
        fullText: req.body.fullText,
        link: req.body.link,
    }
    const timeOfParseSince = req.body.timeOfParseSince;
    const timeOfParseTo = req.body.timeOfParseTo;
    const limit = req.body.limit;
    res.json(generateAnswer({message:answerMessage.success,data: sqliteCompetitions.getCompetitions(competition,limit,"DESC",timeOfParseSince,timeOfParseTo)}))
})

privateRouter.post("/addCompetition",(req:ICustomRequest,res) => {
  if (!isUserCanEnter(req,res)){
      return;
  }
    const competition:TCompetition = toNormalCompetition({
        namePost: req.body.namePost,
        dateCreationPost: req.body.dateCreationPost,
        direction: req.body.direction,
        organization: req.body.organization,
        deadline: req.body.deadline,
        fullText: req.body.fullText,
        link: req.body.link,
    })
    try {
        sqliteCompetitions.add(competition)
        res.json(generateAnswer({message:answerMessage.success,data:sqliteCompetitions.getCompetitions(competition)}))
    }
    catch (e) {
        res.json(generateAnswer({message:answerMessage.unknownError,data:{messageToHuman:e.message}}))
    }
})
export default privateRouter
