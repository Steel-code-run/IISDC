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
import {consoleLog} from "../utils/consoleLog";
import keyboards from "./defaultKeyboards";
import getGrantsBtn5 from "./btns/getGrants5";
import getGrantsBtn10 from "./btns/getGrants10";
import showMeBtn from "./btns/showMeBtn";
import {getCompetitionsScript} from "./scripts/getCompetitionsScript";
import getCompetitions10Btn from "./btns/getCompetitions10Btn";
import getCompetitions5Btn from "./btns/getCompetitions5Btn";
import getCompetitionsBtn from "./btns/getCompetitionsBtn";


export const onMsgScenario = (bot:TelegramBot) =>{


    bot.on('callback_query',function (msg){
        let chatId = msg.message?.chat.id
        let msgId = msg.message?.message_id

        if (chatId === undefined) {
            consoleLog("Ошибка chatId undefined" + msg)
            return
        }
        if (msgId === undefined) {
            consoleLog("Ошибка msgId undefined" + msg)
            return
        }
        bot.deleteMessage(chatId,String(msgId))

        msg.data
        const user = sqliteTelegramUsers.getUsers({telegramId:msg.from?.id})[0]


        switch (msg.data) {
            case authBtn.callback_data:
                bot.sendMessage(chatId, answers.auth.howToAuth,{
                    parse_mode: "Markdown",
                    reply_markup:{
                        remove_keyboard: true,
                    }
                })
                break
            case getGrantsBtn.callback_data:
                if (!user) {
                    bot.sendMessage(chatId, "Вам необходимо сначала авторизоваться",{
                        parse_mode: "Markdown",
                        reply_markup:{
                            remove_keyboard: true,
                            inline_keyboard: keyboards.home
                        }
                    })
                    break;
                }
                bot.sendMessage(chatId, "Получить гранты",{
                    parse_mode: "Markdown",
                    reply_markup:{
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getGrants
                    }
                })
                break
            case getGrantsBtn5.callback_data:

                if (!user) {
                    bot.sendMessage(chatId, "Вам необходимо сначала авторизоваться",{
                        parse_mode: "Markdown",
                        reply_markup:{
                            remove_keyboard: true,
                            inline_keyboard: keyboards.home
                        }
                    })
                    break;
                }
                let grants5 = getGrantsScript(user,5);
                if (grants5 === undefined){
                    bot.sendMessage(chatId, "Сожалею,гранты не доступны",{
                        reply_markup:{
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }
                bot.sendMessage(chatId, grants5,{
                    reply_markup:{
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getGrants
                    }
                })
                break
            case getGrantsBtn10.callback_data:
                if (!user) {
                    bot.sendMessage(chatId, "Вам необходимо сначала авторизоваться",{
                        parse_mode: "Markdown",
                        reply_markup:{
                            remove_keyboard: true,
                            inline_keyboard: keyboards.home
                        }
                    })
                    break;
                }
                let grants10 = getGrantsScript(user,10);
                if (grants10 === undefined){
                    bot.sendMessage(chatId, "Сожалею,гранты не доступны",{
                        reply_markup:{
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }

                bot.sendMessage(chatId, grants10,{
                    reply_markup:{
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getGrants
                    }
                })
                break
            case getCompetitionsBtn.callback_data:
                if (!user) {
                    bot.sendMessage(chatId, "Вам необходимо сначала авторизоваться",{
                        parse_mode: "Markdown",
                        reply_markup:{
                            remove_keyboard: true,
                            inline_keyboard: keyboards.home
                        }
                    })
                    break;
                }
                bot.sendMessage(chatId, "Получить Конкурсы",{
                    parse_mode: "Markdown",
                    reply_markup:{
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getCompetitions
                    }
                })
                break
            case getCompetitions5Btn.callback_data: {
                if (!user) {
                    bot.sendMessage(chatId, "Вам необходимо сначала авторизоваться", {
                        parse_mode: "Markdown",
                        reply_markup: {
                            remove_keyboard: true,
                            inline_keyboard: keyboards.home
                        }
                    })
                    break;
                }
                let competitions = getCompetitionsScript(user, 5);
                if (competitions === undefined) {
                    bot.sendMessage(chatId, "Сожалею, конкурсы не доступны", {
                        reply_markup: {
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }

                bot.sendMessage(chatId, competitions, {
                    reply_markup: {
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getGrants
                    }
                })
            }
                break
            case getCompetitions10Btn.callback_data: {
                if (!user) {
                    bot.sendMessage(chatId, "Вам необходимо сначала авторизоваться", {
                        parse_mode: "Markdown",
                        reply_markup: {
                            remove_keyboard: true,
                            inline_keyboard: keyboards.home
                        }
                    })
                    break;
                }
                let competitions = getCompetitionsScript(user, 10);
                if (competitions === undefined) {
                    bot.sendMessage(chatId, "Сожалею, конкурсы не доступны", {
                        reply_markup: {
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }

                bot.sendMessage(chatId, competitions, {
                    reply_markup: {
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getGrants
                    }
                })
            }
                break
            case homeBtn.callback_data:
                bot.sendMessage(chatId, "Главная страница",{
                    reply_markup:{
                        remove_keyboard: true,
                        inline_keyboard: keyboards.home
                    }
                })
                break
            case toSettings.callback_data:
                bot.sendMessage(chatId, "Что настроим?",{
                    reply_markup:{
                        remove_keyboard: true,
                        inline_keyboard: keyboards.settings
                    }
                })
                break
            case setAllowedTimeBtn.callback_data:
                bot.sendMessage(chatId, answers.settings.setAllowedTime,{
                    parse_mode:"Markdown",
                    reply_markup:{
                        remove_keyboard: true,
                        inline_keyboard: keyboards.settings
                    }
                })
                break
            case showMeBtn.callback_data:
                let str = "А вот и ты\n```JSON\n"
                str+= JSON.stringify(user)
                str+='```'
                bot.sendMessage(chatId, str,{
                    parse_mode:"Markdown",
                    reply_markup:{
                        remove_keyboard: true,
                        inline_keyboard: keyboards.settings
                    }
                })
                break
            default:
                bot.sendMessage(chatId, "Не понял тебя",{
                    reply_markup: {
                        inline_keyboard:keyboards.home,
                        remove_keyboard: true
                    }
                })
        }

        return
    })

    bot.onText(/.*/, (msg)=>{
        const userId = msg.from?.id;
        const key = msg.text?.split(' ')[1]
        const user = sqliteTelegramUsers.getUsers({telegramId:msg.from?.id})[0]

        if (msg.text?.match(/setAllowedTime \d\d:\d\d:\d\d \d\d:\d\d:\d\d/)){
            if (!user) {
                bot.sendMessage(msg.chat.id, answers.unauthorized["1"],{
                    reply_markup: {
                        inline_keyboard:keyboards.home,
                        remove_keyboard: true
                    }
                })
                return;
            }
            const [_,timeStart,timeEnd] = msg.text.split(' ')

            let userUpdated = user
            userUpdated.settings.intervalSettings = {
                end: timeEnd,
                start:timeStart,
            }
            try {
                sqliteTelegramUsers.update(userUpdated)
                bot.sendMessage(msg.chat.id, "Время успешно изменено",{
                    reply_markup: {
                        inline_keyboard:keyboards.home,
                        remove_keyboard: true
                    }
                })
            } catch (e) {
                bot.sendMessage(msg.chat.id, answers.error.sqlite,{
                    reply_markup: {
                        inline_keyboard:keyboards.home,
                        remove_keyboard: true
                    }
                })
                return;
            }
            return;
        }

        if (msg.text?.search(/\/auth .*/) === 0){

            if (!userId) {
                return
            }

            if (!key) {
                bot.sendMessage(msg.chat.id, "Ошибка в команде",{
                    reply_markup: {
                        inline_keyboard:keyboards.home,
                        remove_keyboard: true
                    }
                })
                return;
            }
            try {
                authorizationScript(userId,key)
            } catch (e) {
                if (e.message === "Wrong key") {
                    bot.sendMessage(msg.chat.id, "Неправильный ключ",{
                        reply_markup: {
                            inline_keyboard:keyboards.home,
                            remove_keyboard: true
                        }
                    })
                    return
                }
                else if (e.message === "Error in sqlite") {
                    bot.sendMessage(msg.chat.id, "Ошибка в работе с БД",{
                        reply_markup: {
                            inline_keyboard:keyboards.home,
                            remove_keyboard: true
                        }
                    })
                    return
                } else {
                    consoleLog(e.message)
                }
            }
            bot.sendMessage(msg.chat.id, "Теперь ты авторизован.",{
                reply_markup: {
                    inline_keyboard:keyboards.home,
                    remove_keyboard: true
                }
            })
            return
        }

        bot.sendMessage(msg.chat.id, "Я тебя не понял возьми новую клавиатуру",{
            reply_markup: {
                inline_keyboard:keyboards.home,
                remove_keyboard: true
            }
        })
        return
    })
}