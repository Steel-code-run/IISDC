import {CustomRequest} from "../types/Express";
import {NextFunction, Request} from "express";
import prisma from "../prisma/connect";

export default async function accessingLog(req:CustomRequest, res:Request, next:NextFunction) {

    const data = {} as any
    data['ip'] = req.ip;
    data['method'] = req.method;
    data['date'] = new Date();
    data['path'] = req.path;


    if (req.user){
        data['User'] = {
            connect: {
                id: req.user.id
            }
        }
    }
    try {
        await prisma.acessing_logs.create({
            data
        })
    } catch (e) {
        console.log(e);
    }
    console.log(req.user?.name, req.ip, req.method, req.url);
    next();
}