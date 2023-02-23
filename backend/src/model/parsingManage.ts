import {consoleLog} from "../utils/consoleLog";
import * as sqliteGrants from "../API/sqlite/parser/grants";
import * as sqliteCompetitions from "../API/sqlite/parser/competitions";
import * as sqliteVacancies from "../API/sqlite/parser/vacancies"
import * as sqliteInternships from "../API/sqlite/parser/internships"
import {
    TCompetition,
    TGrant, TInternship, TParserCallParams,
    TVacancy
} from "@iisdc/types";
import {isGrantExist} from "../API/sqlite/parser/grants";
import {toNormalCompetition, toNormalGrant, toNormalInternship, toNormalVacancy} from "../helpers/toNormalPost";


export const grantsManage = (grants: TGrant[], parsersCallParams:TParserCallParams) => {
    let parseNextPage = false;
    let newGrants = 0;
    for (let i = 0; i < grants.length; i++) {
        const grant = grants[i];
        if (!isGrantExist(grant)) {
            // добавляем в бд
            grant.timeOfParse = new Date().getTime()
            sqliteGrants.add(toNormalGrant(grant));
            if (newGrants === 0) parseNextPage = true;
            newGrants++;
        } else {
            // Если нашли совпадение в бд, то больше не парсим
            parseNextPage = false;
            break;
        }
    }
    consoleLog(parsersCallParams.parser.name + " new grants added in DB: " + newGrants);
    return parseNextPage;
}

export const vacanciesManage = (vacancies: TVacancy[], parsersCallParams:TParserCallParams) => {
    let parseNextPage = false;
    let newVacancies = 0;
    for (let i = 0; i < vacancies.length; i++) {
        const vacancy = vacancies[i];
        if (!sqliteVacancies.isVacancyExist(vacancy)) {
            // добавляем в бд
            vacancy.timeOfParse = new Date().getTime()
            sqliteVacancies.add(toNormalVacancy(vacancy));
            if (newVacancies === 0) parseNextPage = true;
            newVacancies++;
        } else {
            // Если нашли совпадение в бд, то больше не парсим
            parseNextPage = false;
            break;
        }
    }
    consoleLog(parsersCallParams.parser.name + " new vacancies added in DB: " + newVacancies)
    return false
}

export const internshipsManage = (internships: TInternship[], parsersCallParams:TParserCallParams) => {
    let parseNextPage = false;
    let newInternships = 0;
    for (let i = 0; i < internships.length; i++) {
        const internship = internships[i];
        if (!sqliteInternships.isInternshipExist(internship)) {
            // добавляем в бд
            internship.timeOfParse = new Date().getTime()
            sqliteInternships.add(toNormalInternship(internship));
            if (newInternships === 0) parseNextPage = true;
            newInternships++;
        } else {
            // Если нашли совпадение в бд, то больше не парсим
            parseNextPage = false;
            break;
        }
    }
    consoleLog(parsersCallParams.parser.name + " new internships added in DB: " + newInternships);
    return false
}

export const competitionsManage = (competitions: TCompetition[], parsersCallParams:TParserCallParams) => {
    let parseNextPage = false;
    let newCompetitions = 0;
    for (let i = 0; i < competitions.length; i++) {
        const competition = competitions[i];
        if (!sqliteCompetitions.isCompetitionExist(competition)) {
            // добавляем в бд
            competition.timeOfParse = new Date().getTime()
            sqliteCompetitions.add(toNormalCompetition(competition));
            if (newCompetitions === 0) parseNextPage = true;
            newCompetitions++;
        } else {
            // Если нашли совпадение в бд, то больше не парсим
            parseNextPage = false;
            break;
        }
    }
    consoleLog(parsersCallParams.parser.name + " new competitions added in DB: " + newCompetitions);
    return false
}