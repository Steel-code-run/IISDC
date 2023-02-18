import {NextFunction, Response} from "express";
import {ICustomRequest} from "../types/request";
import {verifyToken} from "./jwt";
import {JwtPayload} from "jsonwebtoken";


export function setUser(req:ICustomRequest, res:Response, next:NextFunction) {


    const token = req.headers["authorization"]?.split(" ")[1];
    if (token === undefined) {
        next();
        return
    }

    const decodedToken = verifyToken(token) as JwtPayload;
    if (decodedToken === undefined) {
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