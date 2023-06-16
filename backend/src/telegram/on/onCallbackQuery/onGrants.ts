import {OnSomethingProps} from "../types";
import {createButton} from "../../functions/Button";
import {param} from "express-validator";
import {grants_keyboard} from "../../keyboards";

export const onGrants = async (props:OnSomethingProps) => {
    const {bot, chatId} = props
    bot.sendMessage(chatId, 'Гранты',{
        reply_markup: {
            inline_keyboard: await grants_keyboard()
        }
    })
}