import TelegramBot from "node-telegram-bot-api";
import {onDefault} from "./onMessage/onDefault";
import prisma from "../../prisma/connect";
import * as process from "process";
import {getUser} from "../functions/checkUser";





export const onMessage = (bot: TelegramBot) => {
    bot.on('message', async (msg) => {

        // проверка авторизации
        const id = msg.from?.id
        const user = await getUser(id)
        if (!user){
            const link = `${process.env.SERVER_URL}/v1/telegram/login?telegram_id=${msg.from?.id}`
            const text = `
            Вы не авторизованы ссылка на авторизацию ниже\n
${link}
            `
            bot.sendMessage(msg.chat.id, text,{
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            })
            return
        }

        onDefault({bot, chatId: msg.chat.id, user})
    });
};