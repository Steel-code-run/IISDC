import TelegramBot from "node-telegram-bot-api";
import {OnSomethingProps} from "../types";

const default_reply_markup = {
    inline_keyboard: [
        [
            {
                text: 'К настройкам',
                callback_data: 'settings'
            }
        ]
    ]
}

export const onDefault = (props:OnSomethingProps) => {
    const {bot, chatId} = props

    bot.sendMessage(
        chatId,
        'Привет, я немного тебя не понял, возьми новую клавиатуру',
        {
            reply_markup: default_reply_markup
        }
    );
};