import {OnSomethingProps} from "../types";
import {createButton} from "../../functions/Button";
import {param} from "express-validator";
import {grants_keyboard} from "../../keyboards";
import prisma from "../../../prisma/connect";

export const onGrants_get = async (props:OnSomethingProps) => {
    const {bot, chatId, callbackQuery, user} = props

    const  {from, to} = callbackQuery?.params || {}
    if (!from || !to) {
        return bot.sendMessage(chatId, 'Неверные параметры', {})
    }

    let directions;
    if (user?.user_telegram_settingsId) {
        const user_telegram_settings = await prisma.users_telegram_settings.findFirst({
            where: {
                id: user.user_telegram_settingsId
            }
        })
        if (user_telegram_settings?.directions) {
            directions = JSON.parse(user_telegram_settings.directions)
        }
    }

    let where:any = {
        OR: []
    }

    for (let i = 0; i < directions.length; i++) {
        where.OR.push({
            directions: {
                contains: directions[i]
            }
        })
    }

    const grants = await prisma.grants.findMany({
        take: Number(to) - Number(from) + 1,
        skip: Number(from) - 1,
        where: where
    })

    const grant_text = grants.map((grant, index) => {
        return `${Number(from) + index}. ${grant.directions} ${grant.namePost} ${grant.link}`
    })

    bot.sendMessage(chatId, "Найденные гранты:\n"+grant_text.join('\n\n'), {})
}