import TelegramBot from "node-telegram-bot-api";
import {OnSomethingProps} from "../types";
import prisma from "../../../prisma/connect";

export const onLogout = async (props:OnSomethingProps) => {
    const {bot, chatId, user} = props

    if (typeof user?.id !== 'number') {
        bot.sendMessage(chatId, 'Вы не авторизованы')
        return
    }

    await prisma.users.update({
        where:{
            id: user.id
        },
        data:{
            users_telegramsId: null
        }
    })

    bot.sendMessage(chatId, 'Выполненен выход из акканта')
}