import TelegramBot from "node-telegram-bot-api";

const getCompetitions5Btn = {
    text:"c 41 по 50",
    callback_data: "/getCompetitions5"
} as  TelegramBot.InlineKeyboardButton

export default getCompetitions5Btn