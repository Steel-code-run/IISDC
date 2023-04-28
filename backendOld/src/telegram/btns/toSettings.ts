import TelegramBot from "node-telegram-bot-api";

const toSettings = {
    text:"К настройкам",
    callback_data:"/settings"
} as  TelegramBot.InlineKeyboardButton

export default toSettings