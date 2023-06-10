import TelegramBot from "node-telegram-bot-api";
import {onSettings} from "./onCallbackQuery/onSettings";

export const onCallbackQuery = (bot: TelegramBot) => {
    bot.on('callback_query', (query) => {
        const query_data = query.data;
        const chatId = query.message?.chat.id;
        const last_message_id = query.message?.message_id;
        // если не настройки, то выходим
        if (query_data !== 'settings') {
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

        //on settings
        if (query_data === 'settings')
            onSettings({bot, chatId})
        else
            bot.sendMessage(chatId, "Я не знаю такой команды")
    });
}