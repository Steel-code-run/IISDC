import {CustomRequest} from "../types/Express";
import express from "express";
import prisma from "../prisma/connect";

export default async function(req: CustomRequest, res: express.Response, next: express.NextFunction) {
    req.resourceAccess = await prisma.resources_access.findMany({
        where: {
            path: req.path,
        }
    })

    if (req.resourceAccess.length > 0){
        if (req.user){
            let access = false;
            for (let i = 0; i < req.resourceAccess.length; i++) {
                if (req.resourceAccess[i].roleId === req.user.roleId){
                    access = true;
                    break;
                }
            }
            if (!access){
                return res.status(403).json({errors: [{msg: 'Доступ запрещен'}]});
            }
        } else {
            return res.status(403).json({errors: [{msg: 'Доступ запрещен'}]});
        }
    } else {
        return res.status(404).json({errors: [{msg: 'Ресурс не найден'}]});
    }

    next();
}