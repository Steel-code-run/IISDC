import {answers} from "../answers";
import defaultKeyboards from "../defaultKeyboards";
import TelegramBot from "node-telegram-bot-api";
import * as sqliteGrants from "../../API/sqlite/parser/grants"
import * as sqliteTelegramUsers from "../../API/sqlite/users/telegramUsers"
export const getGrantsScript = (bot:TelegramBot,msg:TelegramBot.Message) => {
    const user = sqliteTelegramUsers.getUsers({telegramId:msg.from?.id})[0]
    const chatId = msg.chat.id
    const telegramId = msg.from?.id

    // проверяем авторизован ли он
    if (!user) {
        bot.sendMessage(chatId,answers.unauthorized["1"],{
            reply_markup:{
                keyboard: defaultKeyboards.home
            }
        })
        return;
    }

    let grants = sqliteGrants.getGrants(user.settings.grantsSettings,0,5)


    bot.sendMessage(chatId,'Последние посты полученные сервером' , {
        reply_markup:{
            keyboard: defaultKeyboards.home
        }
    })

    grants.forEach(grant =>{
        bot.sendMessage(chatId,
            `${grant.namePost}\n\n${grant.organization}\n\n${grant.direction}\n\n${grant.link}`)
    })

    return
}