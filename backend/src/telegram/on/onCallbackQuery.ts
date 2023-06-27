import TelegramBot from "node-telegram-bot-api";
import {onSettings} from "./onCallbackQuery/onSettings/onSettings";
import process from "process";
import {getUser} from "../functions/checkUser";
import {onLogout} from "./onCallbackQuery/onLogout";
import {onDirections} from "./onCallbackQuery/onSettings/onDirections";
import {CallbackQueryManager} from "../CallbackQueryManager";
import {onDirections_toggle} from "./onCallbackQuery/onSettings/onDirections_toggle";
import {onGrants} from "./onCallbackQuery/onGrants";
import {onDefault} from "./onMessage/onDefault";
import {onGrants_get} from "./onCallbackQuery/onGrants_get";
import {onWork_time} from "./onCallbackQuery/onSettings/onWork_time";
import {onWork_time_end_add_hour} from "./onCallbackQuery/onSettings/onWork_time_end_add_hour";
import {onWork_time_start_add_hour} from "./onCallbackQuery/onSettings/onWork_time_start_add_hour";
import {onCompetitions} from "./onCallbackQuery/onCompetitions";
import {onCompetitions_get} from "./onCallbackQuery/onCompetitions_get";

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

        const callbackQuery = new CallbackQueryManager()
        await callbackQuery.getQueryFromDb(query_data)
        await callbackQuery.deleteQueryInDb()
        await callbackQuery.deleteExpiredQueries()

        switch (callbackQuery.path) {
            case 'settings':
                await onSettings({bot, chatId, user})
                return
            case 'logout':
                await onLogout({bot, chatId, user})
                return
            case 'settings_directions':
                await onDirections({bot, chatId, user})
                return
            case 'settings_directions_toggle':
                await onDirections_toggle({bot, chatId, user, callbackQuery: callbackQuery})
                await onDirections({bot, chatId, user})
                return
            case 'grants':
                await onGrants({bot, chatId, user})
                return
            case 'grants_get':
                await onGrants_get({bot, chatId, user, callbackQuery})
                await onGrants({bot, chatId, user})
                return
            case 'competitions':
                await onCompetitions({bot, chatId, user})
                return
            case 'competitions_get':
                await onCompetitions_get({bot, chatId, user, callbackQuery})
                await onCompetitions({bot, chatId, user})
                return
            case 'settings_work_time':
                await onWork_time({bot, chatId, user})
                return
            case "settings_work_time_end_add_hour":
                await onWork_time_end_add_hour({bot, chatId, user, callbackQuery})
                await onWork_time({bot, chatId, user})
                return
            case "settings_work_time_start_add_hour":
                await onWork_time_start_add_hour({bot, chatId, user, callbackQuery})
                await onWork_time({bot, chatId, user})
                return
            case "main":
                await onDefault({bot, chatId, user})
                return

        }

        await bot.sendMessage(chatId, "Скорее всего время жизни кнопки истекло")
        await onDefault({bot, chatId, user})

    });
}