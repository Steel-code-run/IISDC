import {TGrant} from "@iisdc/types";
import * as sqliteTelegramUsers from "../API/sqlite/users/telegramUsers"
import {bot} from "./telegram";
import * as sqliteGrants from "../API/sqlite/parser/grants"
import defaultKeyboards from "./defaultKeyboards";
import {grantToString} from "./helpers/grantToString";
import {diffDate} from "../helpers/diffDate";

export function sendNewGrantToTelegram(post:TGrant) {
    const telegramUsers = sqliteTelegramUsers.getUsers({},0,1000)
    const curTime = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()

    telegramUsers.forEach((user)=>{
        const allowedTimeStart = user.settings.intervalSettings?.start ?? '00:00:00'
        const allowedTimeEnd = user.settings.intervalSettings?.end ?? '00:00:00'

        if ((diffDate(allowedTimeStart,curTime)>0) && diffDate(curTime,allowedTimeEnd)>0)
        {
            bot?.sendMessage(user.telegramId, "Получен новый грант \n"+grantToString(post))
        }
    })
}