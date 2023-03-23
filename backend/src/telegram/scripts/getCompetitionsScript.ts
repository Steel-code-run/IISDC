import * as sqliteCompetitions from "../../API/sqlite/parser/competitions"
import {telegramUser} from "../../types/serializables";
export const getCompetitionsScript = (user:telegramUser,limit:number=5) => {

    // проверяем авторизован ли он
    if (!user) {
        return;
    }

    let grants = sqliteCompetitions.getCompetitions(user.settings.competitionsSettings,0,limit)

    let str = '';

    grants.forEach((grant,index)=>{
        str+=`№ ${index+1}\n`
        str+=`${grant.namePost}\n\n${grant.organization}\n\n${grant.direction}\n\n${grant.link}\n\n`;
    })


    return str
}