import {OnSomethingProps} from "../types";
import prisma from "../../../prisma/connect";
import {directions} from "../../../directions";
import {createButton} from "../../functions/Button";

export const onSettings_directions = async (props:OnSomethingProps) => {
    const {bot, chatId, user} = props


    if (typeof user?.id !== 'number') {
        bot.sendMessage(chatId, 'Вы не авторизованы')
        return
    }

    // Если настроек нет, то создаем

    if (user.user_telegram_settingsId === null) {
        let workTimeStart = new Date().setHours(10,0,0,0)
        let workTimeEnd = new Date().setHours(24,0,0,0)


        // to DateTime
        let workTimeStartDate = new Date(workTimeStart)
        let workTimeEndDate = new Date(workTimeEnd)
        let settings = await prisma.users_telegram_settings.create({
            data:{
                workTimeStart: workTimeStartDate,
                workTimeEnd: workTimeEndDate,
                directions: JSON.stringify(directions),
            }
        })

        await prisma.users.update({
            where:{
                id: user.id
            },
            data:{
                User_telegram_settings:{
                    connect:{
                        id: settings.id
                    }
                }
            }
        })
    }

    if (user.user_telegram_settingsId === null) {
        bot.sendMessage(chatId, 'Произошла ошибка')
        return
    }

    const settings = await prisma.users_telegram_settings.findFirst({
        where:{
            id: user.user_telegram_settingsId
        }
    })

    if (!settings) {
        bot.sendMessage(chatId, 'Произошла ошибка')
        return
    }

    if (settings.directions === null) {
        bot.sendMessage(chatId, 'Произошла ошибка')
        return
    }

    const settingsDirections = JSON.parse(settings.directions)

    const keyboard_promises = directions.map(async (direction: string) => {
        // if direction in settingsDirections
        if (settingsDirections.includes(direction)) {
            return [

                await createButton(`${direction} ✅`, `settings_directions_toggle?direction=${direction}`)
            ]
        } else {
            return [
                await createButton(`${direction} ❌`, `settings_directions_toggle?direction=${direction}`)
            ]
        }
    })

    const keyboard = await Promise.all(keyboard_promises)

    bot.sendMessage(chatId, 'Настройки направлений',{
        reply_markup: {
            inline_keyboard: [
                [
                    await createButton('Назад в настройки', 'settings')
                ],
                ...keyboard,
            ]
        }
    })
}