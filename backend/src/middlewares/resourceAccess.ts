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
    } else {
        return res.status(403).json({errors: [{
            msg: 'Ресурс не описан в защитной системе, или у вас нет доступа к нему'
        }]});
    }

}