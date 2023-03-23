import {answers} from "../answers";
import defaultKeyboards from "../defaultKeyboards";
import TelegramBot from "node-telegram-bot-api";
import * as sqliteGrants from "../../API/sqlite/parser/grants"
import * as sqliteTelegramUsers from "../../API/sqlite/users/telegramUsers"
import {telegramUser} from "../../types/serializables";
export const getGrantsScript = (user:telegramUser,limit:number=5) => {

    // проверяем авторизован ли он
    if (!user) {
        return;
    }

    let grants = sqliteGrants.getGrants(user.settings.grantsSettings,0,limit)

    let str = '';

    grants.forEach((grant,index)=>{
        str+=`№ ${index+1}\n`
        str+=`${grant.namePost}\n\n${grant.organization}\n\n${grant.direction}\n\n${grant.link}\n\n`;
    })


    return str
}