import TelegramBot from "node-telegram-bot-api";
import {onSettings} from "./onCallbackQuery/onSettings";
import process from "process";
import {getUser} from "../functions/checkUser";
import {onLogout} from "./onCallbackQuery/onLogout";

export const onCallbackQuery = (bot: TelegramBot) => {
    bot.on('callback_query', async (query) => {
        const query_data = query.data;
        const chatId = query.message?.chat.id;
        const last_message_id = query.message?.message_id;
        // если нет чата, то выходим
        if (!chatId) {
            return
        }
        // если есть последнее сообщение, то удаляем его
        if (last_message_id) {
            bot.deleteMessage(chatId, last_message_id.toString()).catch()
        }

        // проверка авторизации
        const id = query.from.id
        const user = await getUser(id)
        if (!user){
            const link = `${process.env.SERVER_URL}/v1/telegram/login?telegram_id=${id}`
            const text = `
            Вы не авторизованы ссылка на авторизацию ниже\n
${link}
            `
            bot.sendMessage(chatId, text,{
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            })
            return
        }

        //on settings
        switch (query_data) {
            case 'settings':
                onSettings({bot, chatId, user})
                break;
            case 'logout':
                onLogout({bot, chatId, user})
                break;
            default:
                bot.sendMessage(chatId, "Я не знаю такой команды")
                break;
        }

    });
}