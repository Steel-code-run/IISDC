import TelegramBot from "node-telegram-bot-api";

const getGrantsBtn1 = {
    text:"c 1 по 10",
    callback_data: "/getGrants1"
} as  TelegramBot.InlineKeyboardButton

export default getGrantsBtn1