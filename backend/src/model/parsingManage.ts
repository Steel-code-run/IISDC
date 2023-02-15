import {consoleLog} from "../utils/consoleLog";
import * as sqliteGrants from "../API/sqlite/parser/grants";
import {
    TCompetition,
    TGrant, TInternship, TParserCallParams,
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
export const grantsManage = (grants: TGrant[], parsersCallParams:TParserCallParams) => {
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
    consoleLog(parsersCallParams.parser.name + "new grants added in DB: " + newGrants);
    return parseNextPage;
}

export const vacanciesManage = (vacancies: TVacancy[], parsersCallParams:TParserCallParams) => {
    consoleLog(parsersCallParams.parser.name + "vacancies got: " + vacancies.length)
    return false
}

export const internshipsManage = (internships: TInternship[], parsersCallParams:TParserCallParams) => {
    consoleLog(parsersCallParams.parser.name + "internships got: " + internships.length)
    return false
}

export const competitionsManage = (competitions: TCompetition[], parsersCallParams:TParserCallParams) => {
    consoleLog(parsersCallParams.parser.name + "competitions got: " + competitions.length)
    return false
}