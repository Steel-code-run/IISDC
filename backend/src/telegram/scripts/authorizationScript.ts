import {answers} from "../answers";
import defaultKeyboards from "../defaultKeyboards";
import * as sqliteTelegramUsers from "../../API/sqlite/users/telegramUsers";
import TelegramBot from "node-telegram-bot-api";
import {telegramUser} from "../../types/serializables";
const authKey = "testingKey"

export const authorizationScript = (bot:TelegramBot,msg:TelegramBot.Message) =>{
    const chatId = msg.chat.id
    const telegramId = msg.from?.id
    const key = msg.text?.split(' ')[1]
    const user = sqliteTelegramUsers.getUsers({telegramId:msg.from?.id})[0]



    // Если уже авторизован
    if (user){
        bot.sendMessage(chatId,answers.auth.already, {
            reply_markup:{
                keyboard: defaultKeyboards.home
            }
        })
        return
    }
    // Если ключ не правильный
    if (key !== authKey) {
        bot.sendMessage(chatId, answers.auth.badKey)
        return
    }

    // Добавляем в бд
    try {
        sqliteTelegramUsers.add({telegramId})
    } catch (e) {
        bot.sendMessage(chatId,"Произошла ошибка при сохранении ваших данных", {
            reply_markup:{
                keyboard: defaultKeyboards.home
            }
        })
        return
    }

    bot.sendMessage(msg.chat.id, answers.auth.successful,{
        reply_markup: {
            keyboard: defaultKeyboards.home
        }
    })
}