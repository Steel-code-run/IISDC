import prisma from "../../prisma/connect";
import {directions} from "../../directions";

export const getUserTelegramSettingsOrCreate = async (user:NonNullable<Awaited<ReturnType<typeof prisma.users.findFirst>>>) =>{
    if (!user.user_telegram_settingsId){
        let workTimeStart = new Date()
        workTimeStart.setHours(10)
        workTimeStart.setMinutes(0)
        workTimeStart.setSeconds(0)
        let workTimeEnd = new Date()
        workTimeEnd.setHours(18)
        workTimeEnd.setMinutes(0)
        workTimeEnd.setSeconds(0)
        let settings = await prisma.users_telegram_settings.create({
            data:{
                workTimeStart,
                workTimeEnd,
                directions: JSON.stringify(directions),
            }
        })
        return settings
    } else
        return prisma.users_telegram_settings.findFirst({
            where: {
                id: user.user_telegram_settingsId
            }
        })

}