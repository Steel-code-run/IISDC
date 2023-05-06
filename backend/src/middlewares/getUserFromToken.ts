import prisma from "../prisma/connect";
import {verify} from "jsonwebtoken"
import {CustomRequest} from "../types/Express";
import express from "express";

export default async function (req: CustomRequest, res: express.Response, next: express.NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token){
        next();
        return
    }

    let decodedToken: any;
    try {
        decodedToken = verify(token, process.env.JWT_SECRET!);
    } catch (e) {
        next();
        return
    }

    if (typeof decodedToken.id !== 'number'){
        next();
        return
    }

    if (typeof decodedToken.name !== 'string'){
        next();
        return
    }

    try {
        req.user = await prisma.users.findFirst({
            where: {
                id: decodedToken.id,
                name: decodedToken.name
            }
        })
    } catch (e) {
        console.log(e);
        next();
        return
    }
    next();
}