import TelegramBot from "node-telegram-bot-api";

const getCompetitions10Btn = {
    text:"Получить последние 10",
    callback_data:"/getCompetitions10"
} as  TelegramBot.InlineKeyboardButton

export default getCompetitions10Btn