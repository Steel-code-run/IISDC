import TelegramBot from "node-telegram-bot-api";

const showMeBtn = {
    text:"Покажи меня",
    callback_data:"/showMe"
} as  TelegramBot.InlineKeyboardButton

export default showMeBtn