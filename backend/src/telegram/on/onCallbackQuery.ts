import TelegramBot from "node-telegram-bot-api";
import {onSettings} from "./onCallbackQuery/onSettings";
import process from "process";
import {getUser} from "../functions/checkUser";
import {onLogout} from "./onCallbackQuery/onLogout";
import {onSettings_directions} from "./onCallbackQuery/onSettings_directions";
import {onSettings_directions_$direction} from "./onCallbackQuery/onSettings_directions_$direction";

export const onCallbackQuery = (bot: TelegramBot) => {
    bot.on('callback_query', async (query) => {
        const query_data = query.data;
        const chatId = query.message?.chat.id;
        const last_message_id = query.message?.message_id;

        // если нет сообщения, то выходим
        if (!query_data) {
            return
        }

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
            await bot.sendMessage(chatId, text,{
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            })
            return
        }

        if (query_data === 'settings') {
            onSettings({bot, chatId, user})
            return
        }
        if (query_data === 'logout') {
            await onLogout({bot, chatId, user})
            return
        }
        if (query_data === 'settings_directions') {
            await onSettings_directions({bot, chatId, user})
            return
        }
        if (query_data.includes('settings_directions_')) {
            await onSettings_directions_$direction({bot, chatId, user, query: query_data})
            await onSettings_directions({bot, chatId, user})
            return
        }

        await bot.sendMessage(chatId, "Я не знаю такой команды")

    });
}