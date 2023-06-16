import TelegramBot from "node-telegram-bot-api";
import {OnSomethingProps} from "../types";
import {createButton} from "../../functions/Button";
import {main_keyboard} from "../../keyboards";



export const onDefault = async (props:OnSomethingProps) => {
    const {bot, chatId} = props

    bot.sendMessage(
        chatId,
        'Основная клавиатура',
        {
            reply_markup: {
                inline_keyboard: await main_keyboard()
            }
        }
    );
};