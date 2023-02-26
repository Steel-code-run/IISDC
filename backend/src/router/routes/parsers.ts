import {ICustomRequest} from "../../types/request";
import {generateAnswer} from "../../utils/generateServerAnswer";
import * as sqliteParser from "../../API/sqlite/parser/parser";
import * as parserQueue from "../../model/parserQueue";
import {Router} from "express";
import {isUserCanEnter} from "../../auth/isUserCanEnter";
import {answerMessage} from "@iisdc/types";

let router = Router();
router.post("/parsers/addParserToQueue",(req:ICustomRequest,res) => {
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

router.post("/parsers/getParsers",(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    const limit = req.body.limit ?? 1000;
    res.json(generateAnswer({message:answerMessage.success,data: sqliteParser.getParsers({},0,limit)}))
})
router.post("/parsers/getParsersQueue",(req:ICustomRequest,res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }

    res.json(generateAnswer({message:answerMessage.success,data: parserQueue.showParsersCallQueue()}));
})

export default router