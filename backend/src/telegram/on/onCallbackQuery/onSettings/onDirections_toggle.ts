import {OnSomethingProps} from "../../types";
import prisma from "../../../../prisma/connect";
import {onDirections} from "./onDirections";

export const onDirections_toggle = async (props:OnSomethingProps) => {
    const {bot, chatId, user, callbackQuery} = props


    if (!callbackQuery) throw new Error("No query")

    const direction = callbackQuery.params['direction']

    if (!direction) throw new Error("No direction")

    if (!user) throw new Error("No user")

    if (!user.user_telegram_settingsId) throw new Error("No user_telegram_settingsId")


    const settings_raw = await prisma.users_telegram_settings.findFirst({
        where: {
            id: user.user_telegram_settingsId
        }
    })

    if (!settings_raw) throw new Error("No settings")

    if (!settings_raw.directions) throw new Error("No directions")

    const settings = JSON.parse(settings_raw.directions)

    // toggle direction in settings

    if (settings.includes(direction)) {
        settings.splice(settings.indexOf(direction), 1)
    }
    else {
        settings.push(direction)
    }

    await prisma.users_telegram_settings.update({
        where: {
            id: user.user_telegram_settingsId
        },
        data: {
            directions: JSON.stringify(settings)
        }
    })

    await bot.sendMessage(chatId, `Направление ${direction} ${settings.includes(direction) ? "включено" : "выключено"}`)

}
