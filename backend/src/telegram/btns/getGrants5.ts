import TelegramBot from "node-telegram-bot-api";

const getGrantsBtn5 = {
    text:"Получить последние 5",
    callback_data: "/getGrants5"
} as  TelegramBot.InlineKeyboardButton

export default getGrantsBtn5