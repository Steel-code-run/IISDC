import {OnSomethingProps} from "../types";
import {createButton} from "../../functions/Button";
import {param} from "express-validator";
import {competitions_keyboard} from "../../keyboards";
import prisma from "../../../prisma/connect";
import {getUserTelegramSettingsOrCreate} from "../../functions/getUserTelegramSettingsOrCreate";

export const onCompetitions_get = async (props:OnSomethingProps) => {
    const {bot, chatId, callbackQuery, user} = props

    const  {from, to} = callbackQuery?.params || {}
    if (!from || !to) {
        return bot.sendMessage(chatId, 'Неверные параметры', {})
    }

    let directions;
    if (!user){
        return
    }
    if (user?.user_telegram_settingsId) {
        const user_telegram_settings = await prisma.users_telegram_settings.findFirst({
            where: {
                id: user.user_telegram_settingsId
            }
        })
        if (user_telegram_settings?.directions) {
            directions = JSON.parse(user_telegram_settings.directions)
        }
    } else {
        const user_telegram_settings = await getUserTelegramSettingsOrCreate(user)
    }

    let where:any = {
        OR: []
    }

    if (!directions?.length)
        directions = []

    for (let i = 0; i < directions.length; i++) {
        where.OR.push({
            directions: {
                contains: directions[i]
            }
        })
    }

    const competitions = await prisma.competitions.findMany({
        take: Number(to) - Number(from) + 1,
        skip: Number(from) - 1,
        where: where
    })

    const competition_text = competitions.map((competition, index) => {
        return `${Number(from) + index}. ${competition.directions} ${competition.namePost} ${competition.link}`
    })

    bot.sendMessage(chatId, "Найденные конкурсы:\n"+competition_text.join('\n\n'), {})
}