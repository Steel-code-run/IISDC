import TelegramBot from "node-telegram-bot-api";

const setDirectionsBtn = {
    text:"Выбрать получаемые направления",
    callback_data: "/chooseDirections"
} as  TelegramBot.InlineKeyboardButton

export default setDirectionsBtn