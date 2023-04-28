import * as sqliteCompetitions from "../../API/sqlite/parser/competitions"
import {telegramUser} from "../../types/serializables";
import {competitionsOperations} from "../../API/sqlite/OperationInstances";
export const getCompetitionsScript = (user:telegramUser,from:number=0,limit:number=5) => {

    // проверяем авторизован ли он
    if (!user) {
        return;
    }

    let grants = competitionsOperations.getPosts({
        directions: user.settings.competitionsSettings?.direction as string[] || [] as string[],
        limit,
        from
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