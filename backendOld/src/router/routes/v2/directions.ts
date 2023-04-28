import {Router} from "express";
import {routes} from "../../routes";
import {ICustomRequest} from "../../../types/request";
import {isUserCanEnter} from "../../../auth/isUserCanEnter";
import {directionsConstOperations} from "../../../API/sqlite/OperationInstances";
import {generateAnswer} from "../../../utils/generateServerAnswer";
import {answerMessage} from "@iisdc/types";

const router = Router();

router.get(routes.v2.directions.get,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    try {
        let directions = directionsConstOperations.getAll()
        res.statusCode = 200
        res.json(generateAnswer({message: answerMessage.success, data: directions}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})

router.post(routes.v2.directions.add,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    let directionName = req.body.directionName

    if (!directionName) {
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.requiredParams, data: "directionName - integer, required"}))
        return
    }

    try {
        directionsConstOperations.insertConst(directionName)
        res.statusCode = 200
        res.json(generateAnswer({message: answerMessage.success}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})

router.delete(routes.v2.directions.remove,(req:ICustomRequest,res)=>{
    if (!isUserCanEnter(req,res)){
        return;
    }

    let directionName = req.query.directionName

    if (typeof directionName !== "string") {
        res.statusCode = 400
        res.json(generateAnswer({message: answerMessage.requiredParams, data: "directionName - string, required"}))
        return
    }

    try {
        directionsConstOperations.removeConst(directionName)
        res.statusCode = 200
        res.json(generateAnswer({message: answerMessage.success}))
        return
    } catch (e) {
        res.statusCode = 500
        res.json(generateAnswer({message: answerMessage.unknownError, data: e.message}))
        return
    }
})


export default router