import TelegramBot from "node-telegram-bot-api";

const homeBtn = {
    text:"на главную",
    callback_data:"/home"
} as  TelegramBot.InlineKeyboardButton

export default homeBtn