import TelegramBot from "node-telegram-bot-api";
import {onCallbackQuery} from "./on/onCallbackQuery";
import {onMessage} from "./on/onMessage";

export let bot:null|TelegramBot = null

export const telegramBotInit = () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token){
        console.log("Токен телеграма не найден в .env");
        return
    }
    try {
        bot = new TelegramBot(token, { polling: true });
        console.log("Телеграм бот инициализирован");
        onMessage(bot)
        onCallbackQuery(bot)
    } catch (e) {
        console.log("Ошибка при инициализации телеграм бота", e);
    }
};