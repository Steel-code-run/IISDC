import TelegramBot from "node-telegram-bot-api";

const getCompetitions1Btn = {
    text:"c 1 по 10",
    callback_data: "/getCompetitions1"
} as  TelegramBot.InlineKeyboardButton

export default getCompetitions1Btn