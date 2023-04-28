import TelegramBot from "node-telegram-bot-api";

const getGrantsBtn = {
    text:"Получить гранты",
    callback_data: "/getGrants"
} as  TelegramBot.InlineKeyboardButton

export default getGrantsBtn