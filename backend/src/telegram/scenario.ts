import TelegramBot from "node-telegram-bot-api";
import defaultKeyboards from "./defaultKeyboards";
import authBtn from "./btns/authBtn";
import {answers} from "./answers";
import getGrantsBtn from "./btns/getGrantsBtn";

import {getGrantsScript} from "./scripts/getGrantsScript";
import {authorizationScript} from "./scripts/authorizationScript";
import homeBtn from "./btns/homeBtn";


export const onMsgScenario = (bot:TelegramBot) =>{
    bot.onText(/.*/, (msg)=>{

        if (msg.text?.match(homeBtn.text)) {
            bot.sendMessage(msg.chat.id, "Высылаю основную клавиатуру",{
                reply_markup:{
                    keyboard: defaultKeyboards.home
                }
            })
            return
        }

        if (msg.text?.match(/Настройки/)) {
            bot.sendMessage(msg.chat.id, "Ты в меню настройки, меню обновлено", {
                reply_markup:{
                    keyboard: defaultKeyboards.settings
                }
            })
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
            console.log(msg);
        }
    })
}