import TelegramBot from "node-telegram-bot-api";
import {onDefault} from "./on/onDefault";
import {onCallbackQuery} from "./on/onCallbackQuery";

export const telegramBotInit = () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token){
        console.log("Токен телеграма не найден в .env");
        return
    }
    try {
        const bot = new TelegramBot(token, { polling: true });
        console.log("Телеграм бот инициализирован");
        onDefault(bot)
        onCallbackQuery(bot)
    } catch (e) {
        console.log("Ошибка при инициализации телеграм бота", e);
    }
};