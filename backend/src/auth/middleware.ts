import {NextFunction, Response} from "express";
import {IUser, UserRole} from "@iisdc/types";
import {ICustomRequest} from "../types/request";
import {verifyToken} from "./jwt";



export function setUser(req:ICustomRequest, res:Response, next:NextFunction) {

    const questUser:IUser = {
        id: -1,
        name: "quest",
        role: UserRole.quest,
    }
    const token = req.headers["authorization"]?.split(" ")[1];
    if (token === undefined) {
        req.user = questUser;
        next();
        return
    }

    const decodedToken = verifyToken(token);

    if (decodedToken === undefined) {
        req.user = questUser;
        next();
        return
    }

    req.user = {
        id: decodedToken.id,
        name: decodedToken.name,
        role: decodedToken.role,
    };
    next();
    return

}