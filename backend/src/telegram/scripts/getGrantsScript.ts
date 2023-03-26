import {answers} from "../answers";
import defaultKeyboards from "../defaultKeyboards";
import TelegramBot from "node-telegram-bot-api";
import * as sqliteGrants from "../../API/sqlite/parser/grants"
import * as sqliteTelegramUsers from "../../API/sqlite/users/telegramUsers"
import {telegramUser} from "../../types/serializables";
import {grantsOperations} from "../../API/sqlite/OperationInstances";
export const getGrantsScript = (user:telegramUser,from:number=0,limit:number=5) => {

    // проверяем авторизован ли он
    if (!user) {
        return;
    }



    let grants = grantsOperations.getGrants({
        directions: user.settings.grantsSettings?.direction as string[] || [] as string[],
        limit:limit,
        from:from
    })

    let str = '';

    grants.forEach((grant,index)=>{
        str+=`№ ${index+1}\n`
        str+=`${grant.namePost}\n\n${grant.organization}\n\n${grant.direction}\n\n${grant.link}\n\n`;
    })


    if (str.length < 1) {
        str+= "Не найдено ни одного поста"
    }

    return str
}