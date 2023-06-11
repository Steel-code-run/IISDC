import TelegramBot from "node-telegram-bot-api";
import {OnSomethingProps} from "../types";

export const onSettings = (props:OnSomethingProps) => {
    const {bot, chatId} = props
    bot.sendMessage(chatId, 'Настройки',{
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Выйти из аккаунта",
                        callback_data: "logout"
                    }
                ]
            ]
        }
    })
}