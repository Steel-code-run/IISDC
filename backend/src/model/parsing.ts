import {consoleLog} from "../utils/consoleLog";
import {callParser} from "@iisdc/parser";
import * as sqliteParser from "../API/sqlite/parser/parser";
import * as sqliteGrants from "../API/sqlite/parser/grants";
import {generateDefaultParsers} from "./defaultParsers";
import {
    isCompetitionPost,
    isGrantPost,
    isInternshipPost,
    isVacancyPost, TCompetition,
    TGrant, TInternship, TParserCallParams, TParserResult,
    TPost,
    TVacancy
} from "@iisdc/types";
import {
    parserCallQueueIsEmpty,
    parserCallQueuePush,
    parserCallQueuePushMany,
    parserCallQueueShift
}  from "./parserQueue";
import {isGrantExist} from "../API/sqlite/parser/grants";
import {isTimeToAddParsersToQueue} from "./isTimeToAddParsersToQueue";
import {toNormalGrant} from "../helpers/toNormalGrant";

let isParsingEnabled = false;

/*
    * Добавляем в таблицу парсеры по умолчанию
    * Отключаем повторный запуск этой функции
    * Запускаем службу парсинга
*/
export const enableParsing = () => {
    frequentlyParse();
    if (isParsingEnabled) return;

    const parsers = generateDefaultParsers();
    parsers.forEach(parser => sqliteParser.addParser(parser));

    isParsingEnabled = true;
    frequentlyAddAllParsersInQueue();

};

const frequentlyParse = () => {
    // пока очередь не пуста
    if (!parserCallQueueIsEmpty()){
        // Выделяем 1 настройки запуска парсера из очереди
        const parsersCallParams = parserCallQueueShift();
        if (parsersCallParams) {
            if (parsersCallParams.parser.enabled !== "false"){
                parse(parsersCallParams);
            }
        }
        setTimeout(frequentlyParse, 1000)
    }

    // через 10 сек вызвать парсинг снова
    setTimeout(frequentlyParse, 1000 * 10)
}

const parse = (parsersCallParams:TParserCallParams)=>{
    // Парсим 1 страницу сайтов
    consoleLog("currentParsing: " + parsersCallParams.parser.name + ", page: " + parsersCallParams.page);

    try {
        const posts = callParser(parsersCallParams);
        // Получаем всё отдельно
        const grants = getGrantsFromPosts(posts);
        const vacancies = getVacanciesFromPosts(posts);
        const internships = getInternshipsFromPosts(posts);
        const competitions = getCompetitionsFromPosts(posts);

        // Спрашиваем нужно ли парсить следующие страницы
        // А так же добавляем в бд полученные гранты, проводим дальнейшие действия
        let needToParseNextPage = grantsManage(grants)
        needToParseNextPage = vacanciesManage(vacancies) || needToParseNextPage
        needToParseNextPage = internshipsManage(internships) || needToParseNextPage
        needToParseNextPage = competitionsManage(competitions) || needToParseNextPage

        // Если нужно, то добавляем в очередь парсеры для следующей страницы
        if (needToParseNextPage) {
            if (parsersCallParams.page < 5) {
                parserCallQueuePush(parsersCallParams.parser, parsersCallParams.page + 1)
            }
        }
    } catch (e) {
        consoleLog("Error in parse: " + parsersCallParams.parser.name + " " + e.message)
    }


}


// бесконечный цикл проверяет а нужно ли сейчас добавлять в очередь парсеры
const frequentlyAddAllParsersInQueue = () => {
    if (isTimeToAddParsersToQueue()){
        // получаем все парсеры с бд
        const parsers = sqliteParser.getParsers()
        // добавляем в очередь парсеры
        parserCallQueuePushMany(parsers);
    } else {
        // через 5 минут попробовать снова
        setTimeout(frequentlyAddAllParsersInQueue, 1000 * 60 * 5)
    }
}
const getGrantsFromPosts = (posts: TPost<any>[]): TGrant[] => {
    const grants: TGrant[] = [];
    posts.forEach(post => {
        if (isGrantPost(post)) grants.push(post.postDescription);
    })
    return grants;
}

const getVacanciesFromPosts = (posts: TPost<any>[]): TVacancy[] => {
    const vacancies: TVacancy[] = [];
    posts.forEach(post => {
        if (isVacancyPost(post)) vacancies.push(post.postDescription);
    })
    return vacancies;
}

const getInternshipsFromPosts = (posts: TPost<any>[]): TInternship[] => {
    const internships: TInternship[] = [];
    posts.forEach(post => {
        if (isInternshipPost(post)) internships.push(post.postDescription);
    })
    return internships;
}

const getCompetitionsFromPosts = (posts: TPost<any>[]): TCompetition[] => {
    const competitions: TCompetition[] = [];
    posts.forEach(post => {
        if (isCompetitionPost(post)) competitions.push(post.postDescription);
    })
    return competitions;
}


/*
    * Управление добавлением в бд
    * Если нашли совпадение в бд, то больше не парсим
    * Если не нашли совпадения, то добавляем в бд
    * Возвращаем true, если нужно парсить следующую страницу
 */
const grantsManage = (grants: TGrant[]) => {
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
    consoleLog("new grants added in DB: " + newGrants);
    return parseNextPage;
}

const vacanciesManage = (vacancies: TVacancy[]) => {
    consoleLog("vacancies got: " + vacancies.length)
    return false
}

const internshipsManage = (internships: TInternship[]) => {
    consoleLog("internships got: " + internships.length)
    return false
}

const competitionsManage = (competitions: TCompetition[]) => {
    consoleLog("competitions got: " + competitions.length)
    return false
}