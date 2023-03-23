import TelegramBot from "node-telegram-bot-api";

const getGrantsBtn10 = {
    text:"Получить последние 10",
    callback_data: "/getGrants10"
} as  TelegramBot.InlineKeyboardButton

export default getGrantsBtn10