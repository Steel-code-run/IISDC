import {consoleLog} from "../utils/consoleLog";
import * as sqliteGrants from "../API/sqlite/parser/grants";
import {
     TCompetition,
    TGrant, TInternship,
    TVacancy
} from "@iisdc/types";
import {isGrantExist} from "../API/sqlite/parser/grants";
import {toNormalGrant} from "../helpers/toNormalGrant";

/*
    * Управление добавлением в бд
    * Если нашли совпадение в бд, то больше не парсим
    * Если не нашли совпадения, то добавляем в бд
    * Возвращаем true, если нужно парсить следующую страницу
 */
export const grantsManage = (grants: TGrant[]) => {
    let parseNextPage = false;
    let newGrants = 0;
    for (let i = 0; i < grants.length; i++) {
        const grant = grants[i];
        if (!isGrantExist(grant.namePost, grant.dateCreationPost)) {
            // добавляем в бд
            sqliteGrants.addGrant(toNormalGrant(grant));
            if (newGrants === 0) parseNextPage = true;
            newGrants++;
        } else {
            // Если нашли совпадение в бд, то больше не парсим
            parseNextPage = false;
            break;
        }
    }
    consoleLog("\tnew grants added in DB: " + newGrants);
    return parseNextPage;
}

export const vacanciesManage = (vacancies: TVacancy[]) => {
    consoleLog("\tvacancies got: " + vacancies.length)
    return false
}

export const internshipsManage = (internships: TInternship[]) => {
    consoleLog("\tinternships got: " + internships.length)
    return false
}

export const competitionsManage = (competitions: TCompetition[]) => {
    consoleLog("\tcompetitions got: " + competitions.length)
    return false
}