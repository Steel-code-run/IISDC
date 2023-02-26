import TelegramBot from "node-telegram-bot-api";
import defaultKeyboards from "./defaultKeyboards";
import authBtn from "./btns/authBtn";
import {answers} from "./answers";
import getGrantsBtn from "./btns/getGrantsBtn";

import {getGrantsScript} from "./scripts/getGrantsScript";
import {authorizationScript} from "./scripts/authorizationScript";
import homeBtn from "./btns/homeBtn";
import * as sqliteTelegramUsers from "../API/sqlite/users/telegramUsers";
import setAllowedTimeBtn from "./btns/setAllowedTimeBtn";
import toSettings from "./btns/toSettings";


export const onMsgScenario = (bot:TelegramBot) =>{
    bot.onText(/.*/, (msg)=>{
        const user = sqliteTelegramUsers.getUsers({telegramId:msg.from?.id})[0]

        if (msg.text?.match(homeBtn.text)) {
            bot.sendMessage(msg.chat.id, "Высылаю основную клавиатуру",{
                reply_markup:{
                    keyboard: defaultKeyboards.home
                }
            })
            return
        }

        // настройки
        if (msg.text?.match(toSettings.text)) {
            bot.sendMessage(msg.chat.id, "Ты в меню настройки, меню обновлено", {
                reply_markup:{
                    keyboard: defaultKeyboards.settings
                }
            })
            return;
        }

        if (msg.text?.match(setAllowedTimeBtn.text)) {
            if (!user) {
                bot.sendMessage(msg.chat.id, answers.unauthorized["1"], {
                    reply_markup: {
                        keyboard: defaultKeyboards.home
                    }
                })
                return;
            }
            bot.sendMessage(msg.chat.id, answers.settings.setAllowedTime,{
                parse_mode:"Markdown",
                reply_markup:{
                    keyboard:defaultKeyboards.settings
                }
            })
            return;
        }

        if (msg.text?.match(/setAllowedTime \d\d:\d\d:\d\d \d\d:\d\d:\d\d/)) {
            if (!user) {
                bot.sendMessage(msg.chat.id, answers.unauthorized["1"], {
                    reply_markup: {
                        keyboard: defaultKeyboards.home
                    }
                })
                return;
            }
            user.settings.intervalSettings = {
                start: msg.text?.split(" ")[1],
                end: msg.text?.split(" ")[2],
            }
            sqliteTelegramUsers.update(user)
            let updatedUser = sqliteTelegramUsers.getUsers({id:user.id})[0]
            bot.sendMessage(msg.chat.id,"Разрешённое время отправки уведомлений изменено.\n" +
                `Теперь разрешено отправлять вам сообщения 
                с ${updatedUser.settings.intervalSettings?.start} 
                до ${updatedUser.settings.intervalSettings?.end}`)

            return;
        }


        // Режим авторизации
        if (msg.text?.match(authBtn.text)){
            bot.sendMessage(msg.chat.id, answers.auth["1"],{
                parse_mode:"Markdown"
            })
            return;
        }

        if (msg.text?.match(/\/key .*/)){
            authorizationScript(bot,msg)
            return;
        }

        // Получение грантов
        if (msg.text?.match(getGrantsBtn.text)){
            getGrantsScript(bot,msg)
            return
        }

        else {
            bot.sendMessage(msg.chat.id, "Не совсем понял тебя, держи новую клавиатуру",{
                reply_markup: {
                    keyboard: defaultKeyboards.home
                }
            })
        }
    })
}