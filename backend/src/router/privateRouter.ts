import {ICustomRequest} from "../types/request";
import { generateAnswer } from "../utils/generateServerAnswer";
import {Router,Response} from "express";
import {answerMessage} from "@iisdc/types";
const privateRouter = Router();

function isUserCanEnter(req:ICustomRequest,res:Response){
    const user = req.user;
    if (user === undefined) {
        res.json(generateAnswer({message: answerMessage.unauthorized}));
        return false;
    }
    if (user.id < 0) {
        res.json(generateAnswer({message: answerMessage.unauthorized}));

        return false;
    }
    return true;
}
privateRouter.get('/', (req:ICustomRequest, res) => {
    if (!isUserCanEnter(req,res)){
        return;
    }


    res.json(generateAnswer({message: answerMessage.success}));


});

export default privateRouter
