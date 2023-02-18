import {ICustomRequest} from "../types/request";
import {Response} from "express";
import {generateAnswer} from "../utils/generateServerAnswer";
import {answerMessage, UserRole} from "@iisdc/types";

export function isUserCanEnter(req:ICustomRequest,res:Response,minRole:UserRole = UserRole.user){
    const user = req.user;
    if (user === undefined) {
        res.json(generateAnswer({message: answerMessage.unauthorized}));
        return false;
    }
    if (user.role === undefined) {
        res.json(generateAnswer({message: answerMessage.unauthorized}));
        return false;
    }
    if (user.role < minRole) {
        res.json(generateAnswer({message: answerMessage.insufficientRole}));
        return false;
    }
    return true;
}