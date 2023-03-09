import TelegramBot from "node-telegram-bot-api";

const getCompetitions5Btn = {
    text:"Получить последние 5",
    callback_data:"/getCompetitions5"
} as  TelegramBot.InlineKeyboardButton

export default getCompetitions5Btn