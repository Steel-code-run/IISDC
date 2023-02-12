import * as sqliteParser from "../API/sqlite/parser/parser";
import {parserCallQueuePush, parserCallQueuePushMany, parserCallQueueShift} from "./parserQueue";
import {generateDefaultParsers} from "./defaultParsers";
import {
    isCompetitionPost, isGrantPost,
    isInternshipPost, isVacancyPost,
    TCompetition, TGrant,
    TInternship,
    TParserCallParams, TPost,
    TVacancy
} from "@iisdc/types";
import {consoleLog} from "../utils/consoleLog";
import {callParser} from "@iisdc/parser";
import {competitionsManage, grantsManage, internshipsManage, vacanciesManage} from "./parsingManage";
import {activateAutomateAddingParsers} from "./automateAddingParsers";

const parserOptions = {
    isParsingNow: false,
    isFirstBoot: true,
}

export const enableParserScheduler = () => {
    if (parserOptions.isFirstBoot) {
        parserOptions.isFirstBoot = false;
        const parsers = generateDefaultParsers();
        parsers.forEach(parser => sqliteParser.addParser(parser));
        activateAutomateAddingParsers();
        parserScheduler().then();
    }
    return
}

const parserScheduler = async () => {
    if (parserOptions.isParsingNow) return;
    parserOptions.isParsingNow = true;
    const parsersCallParams = parserCallQueueShift();
    if (parsersCallParams) {
        if (parsersCallParams.parser.enabled !== "false"){
            await parse(parsersCallParams);
            parserOptions.isParsingNow = false;
        }
    }

    setTimeout(parserScheduler, 1000 )

}
const parse = async(parsersCallParams:TParserCallParams)=>{
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
        consoleLog("Error in parsing: " + parsersCallParams.parser.name + ", page: " + parsersCallParams.page);
        consoleLog(e);
    }
    return

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