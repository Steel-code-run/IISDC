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
import showMeBtn from "./btns/showMeBtn";
import {getCompetitionsScript} from "./scripts/getCompetitionsScript";
import getGrantsBtn1 from "./btns/getGrants1";
import getGrantsBtn2 from "./btns/getGrants2";
import getGrantsBtn3 from "./btns/getGrants3";
import getGrantsBtn4 from "./btns/getGrants4";
import getGrantsBtn5 from "./btns/getGrants5";
import setDirectionsBtn from "./btns/setDirectionsBtn";
import {updateSqliteUser} from "./scripts/update";
import {getDirections} from "../API/sqlite/parser/grants";
import getCompetitions1Btn from "./btns/getCompetitions1Btn";
import getCompetitions2Btn from "./btns/getCompetitions2Btn";
import getCompetitions3Btn from "./btns/getCompetitions3Btn";
import getCompetitions4Btn from "./btns/getCompetitions4Btn";
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

            case getCompetitionsBtn.callback_data: {
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
                bot.sendMessage(chatId, "Получить конкурсы", {
                    parse_mode: "Markdown",
                    reply_markup: {
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getCompetitions
                    }
                })
            }
                break
            case getGrantsBtn1.callback_data:

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
                let grants5 = getGrantsScript(user,0,10);
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
            case getGrantsBtn2.callback_data:
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
                let grants10 = getGrantsScript(user,10,10);
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
            case getGrantsBtn3.callback_data:
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
                let grants3 = getGrantsScript(user,20,10);
                if (grants3 === undefined){
                    bot.sendMessage(chatId, "Сожалею,гранты не доступны",{
                        reply_markup:{
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }

                bot.sendMessage(chatId, grants3,{
                    reply_markup:{
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getGrants
                    }
                })
                break

            case getGrantsBtn4.callback_data:
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
                let grants4 = getGrantsScript(user,30,10);
                if (grants4 === undefined){
                    bot.sendMessage(chatId, "Сожалею,гранты не доступны",{
                        reply_markup:{
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }

                bot.sendMessage(chatId, grants4,{
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
                let grants50 = getGrantsScript(user,40,10);
                if (grants50 === undefined){
                    bot.sendMessage(chatId, "Сожалею,гранты не доступны",{
                        reply_markup:{
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }

                bot.sendMessage(chatId, grants50,{
                    reply_markup:{
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getGrants
                    }
                })
                break

            case getCompetitions1Btn.callback_data: {
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
                let posts = getCompetitionsScript(user, 0, 10);
                if (posts === undefined) {
                    bot.sendMessage(chatId, "Сожалею,посты не доступны", {
                        reply_markup: {
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }

                bot.sendMessage(chatId, posts, {
                    reply_markup: {
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getGrants
                    }
                })
            }
                break

            case getCompetitions2Btn.callback_data: {
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
                let posts = getCompetitionsScript(user, 10, 10);
                if (posts === undefined) {
                    bot.sendMessage(chatId, "Сожалею,посты не доступны", {
                        reply_markup: {
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }

                bot.sendMessage(chatId, posts, {
                    reply_markup: {
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getGrants
                    }
                })
            }
                break

            case getCompetitions3Btn.callback_data: {
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
                let posts = getCompetitionsScript(user, 20, 10);
                if (posts === undefined) {
                    bot.sendMessage(chatId, "Сожалею,посты не доступны", {
                        reply_markup: {
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }

                bot.sendMessage(chatId, posts, {
                    reply_markup: {
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getGrants
                    }
                })
            }
                break

            case getCompetitions4Btn.callback_data: {
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
                let posts = getCompetitionsScript(user, 40, 10);
                if (posts === undefined) {
                    bot.sendMessage(chatId, "Сожалею,посты не доступны", {
                        reply_markup: {
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }

                bot.sendMessage(chatId, posts, {
                    reply_markup: {
                        remove_keyboard: true,
                        inline_keyboard: keyboards.getGrants
                    }
                })
            }
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
                let posts = getCompetitionsScript(user, 40, 10);
                if (posts === undefined) {
                    bot.sendMessage(chatId, "Сожалею, посты не доступны", {
                        reply_markup: {
                            remove_keyboard: true,
                            inline_keyboard: keyboards.getGrants
                        }
                    })
                    break;
                }

                bot.sendMessage(chatId, posts, {
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

            case setDirectionsBtn.callback_data:
            {
                bot.sendMessage(chatId, answers.settings.setDirections,{
                    parse_mode: "Markdown",
                    reply_markup:{
                        remove_keyboard: true,
                        inline_keyboard: keyboards.settings
                    }
                })
            }
                break;


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

        if (msg.text?.match(/setDirections/)){
            let msg2 = msg.text.split(' ')
            msg2 = msg2.slice(1)
            let directions = msg2.join('').split(',')

            if (msg2.length < 1) {
                directions = []
            }


            if (!user.settings.grantsSettings)
                user.settings.grantsSettings = {}
            user.settings.grantsSettings.direction = directions

            if (!user.settings.competitionsSettings)
                user.settings.competitionsSettings = {}
            user.settings.competitionsSettings.direction = directions

            try {
                updateSqliteUser(user)
            } catch (e) {
                bot.sendMessage(msg.chat.id, "произошла ошибка " + e.message,{
                    reply_markup: {
                        inline_keyboard:keyboards.home,
                        remove_keyboard: true
                    }
                })
                return;
            }

            bot.sendMessage(msg.chat.id, "направления обновлены",{
                reply_markup: {
                    inline_keyboard:keyboards.home,
                    remove_keyboard: true
                }
            })

            return;
        }

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