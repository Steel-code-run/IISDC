import {CustomRequest} from "../types/Express";
import express from "express";
import prisma from "../prisma/connect";

export default async function(req: CustomRequest, res: express.Response, next: express.NextFunction) {

    req.resourceAccess = await prisma.resources_access.findMany({
        where: {
            path: req.path,
        }
    })

    next();
}