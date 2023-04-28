import TelegramBot from "node-telegram-bot-api";

const authBtn = {
    text:"Авторизироваться",
    callback_data: "/auth"
} as  TelegramBot.InlineKeyboardButton

export default authBtn