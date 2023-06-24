import {CustomRequest} from "../types/Express";
import {NextFunction, Request} from "express";
import prisma from "../prisma/connect";
import {accessing_logs_warnings_types} from "../types/accessing_logs_warnings_types";

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

    // если пользователь заходил больше чем с 5 разных ip в течении 60 минут отправляем уведомление
    if (req.user){
        let logs = await prisma.acessing_logs.findMany({
            where:{
                User: {
                    id: req.user.id
                },
                date: {
                    gte: new Date(new Date().getTime() - 60 * 60 * 1000)
                }
            },
            take: 10000,
        })

        let ips = new Set();
        for (let i = 0; i < logs.length; i++) {
            const log = logs[i];
            ips.add(log.ip)
        }
        if (ips.size > 0){
            let description = `Пользователь ${req.user.name} зашел с ${ips.size} разных ip адресов`

            let type = accessing_logs_warnings_types.login_from_5_ip_addresses_in_60_minutes

            // если в течение последних 60 минут уже было зафиксировано такое же событие - не отправляем уведомление
            let lastLog = await prisma.accessing_logs_warnings.findFirst({
                where: {
                    user: {
                        id: req.user.id
                    },
                    type: type,
                    date: {
                        gte: new Date(new Date().getTime() - 60 * 60 * 1000)
                    }
                }
            })
            if (!lastLog){
                await prisma.accessing_logs_warnings.create({
                    data: {
                        description,
                        type:type,
                        user: {
                            connect: {
                                id: req.user.id
                            }
                        },
                        date: new Date()
                    }
                })
            }

        }
    }
    next();
}