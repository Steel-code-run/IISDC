import TelegramBot from "node-telegram-bot-api";
import {OnSomethingProps} from "../types";
import {createButton} from "../../functions/Button";
import {settings_keyboard} from "../../keyboards";

export const onSettings = async (props:OnSomethingProps) => {
    const {bot, chatId} = props
    bot.sendMessage(chatId, 'Настройки',{
        reply_markup: {
            inline_keyboard: await settings_keyboard()
        }
    })
}