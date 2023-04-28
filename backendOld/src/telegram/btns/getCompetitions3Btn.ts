import TelegramBot from "node-telegram-bot-api";

const getCompetitions3Btn = {
    text:"c 21 по 30",
    callback_data: "/getCompetitions3"
} as  TelegramBot.InlineKeyboardButton

export default getCompetitions3Btn