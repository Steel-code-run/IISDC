import {CustomRequest} from "../types/Express";
import express from "express";
import prisma from "../prisma/connect";

export default async function(req: CustomRequest, res: express.Response, next: express.NextFunction) {
    let resourceAccess = await prisma.resources_access.findMany({
        where: {
            path: req.path,
            method: {
                in: [req.method, '*']
            },
        }
    })

    // если ресурс не описан - пропускаем
    if (resourceAccess.length < 1){
        next()
        return
    }

    if (resourceAccess.length > 0) {
        for (let i = 0; i < resourceAccess.length; i++) {
            const access = resourceAccess[i];
            if (access.roleId === null) {
                next();
                return
            }
            if (req.user?.roleId === access.roleId) {
                next();
                return
            }
        }
        return res.status(403).json({errors: [{
            msg: 'У вас нет доступа к этому ресурсу'
            }]});
    }

}