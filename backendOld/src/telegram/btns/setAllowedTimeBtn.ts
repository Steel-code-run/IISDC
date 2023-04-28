import TelegramBot from "node-telegram-bot-api";

const setAllowedTimeBtn = {
    text:"Задать рабочее время",
    callback_data: "/setAllowedTime"
} as  TelegramBot.InlineKeyboardButton

export default setAllowedTimeBtn