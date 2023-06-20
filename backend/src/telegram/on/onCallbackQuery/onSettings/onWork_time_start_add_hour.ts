import {OnSomethingProps} from "../../types";
import prisma from "../../../../prisma/connect";
import {getUserTelegramSettingsOrCreate} from "../../../functions/getUserTelegramSettingsOrCreate";

export const onWork_time_start_add_hour = async (props:OnSomethingProps) => {
    const {bot, chatId, user, callbackQuery} = props

    if (!user)
        throw new Error('User or settings not found')

    if (!callbackQuery)
        throw new Error('CallbackQuery not found')

    if (!callbackQuery.params.hour)
        throw new Error('CallbackQuery.params.hour not found')

    if (isNaN(Number(callbackQuery.params.hour)))
        throw new Error('CallbackQuery.params.hour is not a number')

    let telegram_settings = await getUserTelegramSettingsOrCreate(user)

    if (!telegram_settings)
        throw new Error('Telegram settings not found')

    await prisma.users_telegram_settings.update({
        where:{
            id: telegram_settings.id
        },
        data:{
            workTimeStart: new Date(telegram_settings.workTimeStart.getTime() + (60*60*1000* Number(callbackQuery.params.hour)))
        }
    })

    return bot.sendMessage(chatId, `Время начала рабочего дня установлено на ${telegram_settings.workTimeStart.getHours()}:${telegram_settings.workTimeStart.getMinutes()}`)
}