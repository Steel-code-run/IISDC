import {Competition, Grant, Internship, Vacancy} from "../../types/Posts";
import prisma from "../../prisma/connect";
import {bot} from "../init";
import {competitions, grants, vacancies} from "@prisma/client";


export const sendPostByType = async (post: grants | competitions) => {
    const users = await prisma.users.findMany({
        take:10000,
        where:{
            user_telegram_settingsId:{
                not:null
            }
        }
    })



    for (const user of users) {
        if (!user?.users_telegramsId){
            continue;
        }
        if (user.user_telegram_settingsId){
            const settings = await prisma.users_telegram_settings.findUnique({
                where:{
                    id:user.user_telegram_settingsId
                }
            })
            if (!settings?.directions){
                continue;
            }
            if (!settings?.workTimeStart || !settings?.workTimeEnd){
                continue;
            }

            const workTimeStart = new Date(settings.workTimeStart);
            const workTimeEnd = new Date(settings.workTimeEnd);
            const now = new Date();

            if (now.getHours() < workTimeStart.getHours() || now.getHours() >= workTimeEnd.getHours()){
                continue;
            }

            const directions = JSON.parse(settings.directions);

            if (post.directions){
                const postDirections = JSON.parse(post.directions);
                const isMatch = postDirections.some((postDirection: string) => {
                    return directions.some((direction: string) => {
                        return direction === postDirection;
                    })
                })
                if (!isMatch){
                    continue;
                }
                bot?.sendMessage(user.users_telegramsId, `Новая запись:\n${post.namePost}\n${post.link}`)
            }
        }
    }

}