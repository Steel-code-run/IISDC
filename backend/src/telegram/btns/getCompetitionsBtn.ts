import TelegramBot from "node-telegram-bot-api";

const getCompetitionsBtn = {
    text:"Получить конкурсы",
    callback_data:"/getCompetitions"
} as  TelegramBot.InlineKeyboardButton

export default getCompetitionsBtn