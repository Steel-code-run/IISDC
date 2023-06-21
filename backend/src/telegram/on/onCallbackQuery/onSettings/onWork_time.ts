import {OnSomethingProps} from "../../types";
import {grants_keyboard, settings_work_time_keyboard} from "../../../keyboards";
import prisma from "../../../../prisma/connect";
import {getUserTelegramSettingsOrCreate} from "../../../functions/getUserTelegramSettingsOrCreate";

export const onWork_time = async (props:OnSomethingProps) => {
    const {bot, chatId, user} = props

    if (!user)
        throw new Error('User or settings not found')

    let telegram_settings = await getUserTelegramSettingsOrCreate(user)

    if (!telegram_settings)
        throw new Error('Telegram settings not found')

    return bot.sendMessage(chatId, `Настройка время работы, время устанавливается по гринвичу`,{
        reply_markup: {
            inline_keyboard: await settings_work_time_keyboard(`c ${telegram_settings.workTimeStart.getHours()}:00:00`,`до ${telegram_settings.workTimeEnd.getHours()}:00:00`)
        }
    })
}