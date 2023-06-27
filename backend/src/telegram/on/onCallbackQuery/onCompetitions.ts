import {OnSomethingProps} from "../types";
import {createButton} from "../../functions/Button";
import {param} from "express-validator";
import {competitions_keyboard, grants_keyboard} from "../../keyboards";

export const onCompetitions = async (props:OnSomethingProps) => {
    const {bot, chatId} = props
    bot.sendMessage(chatId, 'Конкурсы',{
        reply_markup: {
            inline_keyboard: await competitions_keyboard()
        }
    })
}