import {CronJob, CronTime} from "cron";
import prisma from "../prisma/connect";
import axios from "axios";
import {Competition, Grant, Internship, Vacancy} from "../types/Posts";
import {get3DirectionsByText} from "../helpers/getDirectionByText/getDirectionByText";
import {sendPostByType} from "../telegram/functions/sendPostByType";

type JobData = {
    parserId: number;
    // Выполняется ли скрипт
    isRunning: boolean;
    Job: CronJob;
}

export const jobsList:JobData[] = [];

export async function addJob(parserId: number) {

    // Если парсер уже запущен, то не запускать его
    const isRunning = jobsList.find(job => job.parserId === parserId)?.isRunning;
    if (isRunning){
        return
    }

    // Если парсер не найден, то не запускать его
    const parser = await prisma.parsers.findFirst({
        where:{
            id:parserId
        }
    })
    if (!parser){
        return
    }

    if (!parser.isEnabled){
        return
    }

    if (!parser.cronTime){
        return
    }

    const job = new CronJob(parser.cronTime, () => {
        console.log("Отработка cron"+ new Date())
        parse(parserId);
    });

    jobsList.push({
        parserId,
        Job: job,
        isRunning: false
    })

    // Ставим в бд, что парсер активен
    await prisma.parsers.update({
        where:{
            id:parserId
        },
        data:{
            isEnabled:true
        }
    })

    job.start();
}

export async function updateJob(parserId: number) {
    const job = jobsList.find(job => job.parserId === parserId);

    const parser = await prisma.parsers.findFirst({
        where:{
            id:parserId
        }
    })

    if (!parser){
        return
    }

    if (!parser.isEnabled){
        return
    }

    if (!parser.cronTime){
        return
    }

    if (job) {
        job.Job.setTime(new CronTime(parser.cronTime));
    }
    else {
        await addJob(parserId);
    }
}

export function deleteJob(parserId: number) {
    const index = jobsList.findIndex(job => job.parserId === parserId);
    if (index !== -1) {
        jobsList[index].Job.stop();
        jobsList.splice(index, 1);
    }
}

export function stopAllJobs() {
    jobsList.forEach(job => {
        job.Job.stop();
    })
    // Отключаем все парсеры
    prisma.parsers.updateMany({
        data:{
            isEnabled:false
        }
    }).then()
}

export function startAllJobs() {
    jobsList.forEach(job => {
        job.Job.start();
        // Включаем все парсер
        prisma.parsers.update({
            where:{
                id:job.parserId
            },
            data:{
                isEnabled:true
            }
        }).then()
    })
}

export function stopJob(parserId: number) {
    const job = jobsList.find(job => job.parserId === parserId);
    if (job) {
        job.Job.stop();
    }
}

export function startJob(parserId: number) {
    const job = jobsList.find(job => job.parserId === parserId);
    if (job) {
        job.Job.start();
    }
}

// Логика парсинга

const parse = async (parserId:number) => {

    // if job is running, then return
    const job = jobsList.find(job => job.parserId === parserId);
    if (!job){
        return
    }
    if (job && job.isRunning) {
        return
    }

    // Сверяем рабочее ли время
    const appSettings = await prisma.appSettings.findFirst()
    if (!appSettings){
        return
    }

    const now = new Date()

    let start = new Date(appSettings.parsersWorkTimeStart)
    let end = new Date(appSettings.parsersWorkTimeEnd)
    // use only hours and minutes
    start.setFullYear(now.getFullYear(), now.getMonth(), now.getDate())
    end.setFullYear(now.getFullYear(), now.getMonth(), now.getDate())
    if (now < start || now > end){
        return
    }


    // 1. Получить данные из БД
    const parser_data = await prisma.parsers.findFirst({
        where:{
            id:parserId
        }
    })

    // Если парсера нет в БД, то остановить парсинг, отключить крону
    if (!parser_data){
        console.log("Parser not found")
        return
    }
    console.log("Start parsing" + parser_data.name)
    // 2. Парсить и добавлять в БД
    for (let page = 1; page <= parser_data.pagesToParse; page++) {
        try {
            await parsePage(parser_data, page)
        } catch (e) {
            console.log(e)
            // останавливаем парсинг и job
            stopJob(parserId)
            page=parser_data.pagesToParse+1;
            break;
        }
        job.isRunning = false;
    }

    console.log(parser_data)
}

/**
 * Парсинг конкретной страницы
 * И добавление в БД
 * @param parser
 * @param page
 */
const parsePage = async (
    parser:NonNullable<Awaited<ReturnType<typeof prisma.parsers.findFirst>>>,
    page:number
) => {
    axios.get(process.env.PARSERS_URL! + "/parsers/"+parser.name+"/"+page)
        .then(async response => {
            // Если постов больше > 0, обновляем время последнего парсинга
            if (response.data.length > 0) {
                await prisma.parsers.update({
                    where:{
                        id:parser.id
                    },
                    data:{
                        lastSuccessParse: new Date()
                    }
                })
            }


            for (const post of response.data) {
                const postType = post.postType
                const postDescription = post.postDescription

                if (postType === 'grant') {
                    let grant:Grant = postDescription

                    // Если грант есть в базе, то не добавляем его и вызываем ошибку
                    const grant_in_db = await prisma.grants.findFirst({
                      where: {
                          namePost: grant.namePost,
                          organization: grant.organization
                      }
                    })

                    if (grant_in_db) {
                      console.log('grant already exist')
                      return new Error('grant already exist')
                    }


                    // Если гранта нет в базе, то добавляем его

                    const data:any = {
                        namePost: grant.namePost,
                        timeOfParse: new Date(),
                    }

                    if (grant.summary)
                        data.summary = grant.summary
                    if (grant.fullText)
                        data.fullText = grant.fullText
                    if (grant.deadline){
                        let deadline:Date|null = null
                        if (grant.deadline)
                            deadline = new Date(grant.deadline)
                            if (deadline === null)
                                return
                            // если дату не удалось перевести, то оставляем null
                            if (deadline.toString() === 'Invalid Date')
                                deadline = null


                        data.deadline = deadline
                    }
                    if (grant.organization)
                        data.organization = grant.organization
                    if (grant.link)
                        data.link = grant.link
                    if (grant.linkPDF)
                        data.linkPDF = JSON.stringify(grant.linkPDF)
                    if (grant.sourceLink)
                        data.sourceLink = grant.sourceLink
                    if (grant.directionForSpent)
                        data.directionForSpent = grant.directionForSpent

                    let directions:any = []
                    if (grant.fullText)
                        directions = get3DirectionsByText(grant.fullText)

                    if (directions)
                        data.directions = JSON.stringify(directions)

                    data.parser_id = parser.id

                    const post = await prisma.grants.create({
                        data
                    })

                    await sendPostByType(post)

                }

                if (postType === 'competition') {
                    let competition:Competition = postDescription

                    // Если конкурс есть в базе, то не добавляем его и вызываем ошибку
                    const competition_in_db = await prisma.competitions.findFirst({
                        where: {
                            namePost: competition.namePost,
                        }
                    })
                    if (competition_in_db) {
                        console.log('competition already exist')
                        return new Error('competition already exist')
                    }

                    // Если конкурса нет в базе, то добавляем его
                    const data:any = {
                        namePost: competition.namePost,
                        timeOfParse: new Date(),
                    }

                    if (competition.summary)
                        data.summary = competition.summary
                    if (competition.fullText)
                        data.fullText = competition.fullText
                    if (competition.deadline){
                        let deadline:Date|null = null
                        if (competition.deadline)
                            deadline = new Date(competition.deadline)
                        if (deadline === null)
                            return
                        // если дату не удалось перевести, то оставляем null
                        if (deadline.toString() === 'Invalid Date')
                            deadline = null
                    }
                    if (competition.link)
                        data.link = competition.link
                    if (competition.linkPDF)
                        data.linkPDF = JSON.stringify(competition.linkPDF)
                    if (competition.sourceLink)
                        data.sourceLink = competition.sourceLink
                    if (competition.directionForSpent)
                        data.directionForSpent = competition.directionForSpent
                    if (competition.organization)
                        data.organization = competition.organization

                    let directions;
                    if (competition.fullText)
                        directions = get3DirectionsByText(competition.fullText)

                    if (directions)
                        data.directions = JSON.stringify(directions)

                    data.parser_id = parser.id

                    let post = await prisma.competitions.create({data})

                    await sendPostByType(post)
                }

                if (postType === 'vacancy') {
                    let vacancy:Vacancy = postDescription

                    // Если вакансия есть в базе, то не добавляем ее и вызываем ошибку
                    const vacancy_in_db = await prisma.vacancies.findFirst({
                        where: {
                            namePost: vacancy.namePost,
                        }
                    })
                    if (vacancy_in_db) {
                        console.log('vacancy already exist')
                        return new Error('vacancy already exist')
                    }

                    // Если вакансии нет в базе, то добавляем ее
                    const data:any = {
                        namePost: vacancy.namePost,
                        timeOfParse: new Date(),
                    }

                    if (vacancy.summary)
                        data.summary = vacancy.summary
                    if (vacancy.fullText)
                        data.fullText = vacancy.fullText
                    if (vacancy.link)
                        data.link = vacancy.link
                    if (vacancy.linkPDF)
                        data.linkPDF = JSON.stringify(vacancy.linkPDF)
                    if (vacancy.sourceLink)
                        data.sourceLink = vacancy.sourceLink
                    if (vacancy.organization)
                        data.organization = vacancy.organization

                    let directions;
                    if (vacancy.fullText)
                        directions = get3DirectionsByText(vacancy.fullText)

                    if (directions)
                        data.directions = JSON.stringify(directions)

                    data.parser_id = parser.id

                    await prisma.vacancies.create({data})
                }

                if (postType === 'internship') {
                    let internship:Internship = postDescription

                    // Если стажировка есть в базе, то не добавляем ее и вызываем ошибку
                    const internship_in_db = await prisma.internships.findFirst({
                        where: {
                            namePost: internship.namePost,
                        }
                    })
                    if (internship_in_db) {
                        console.log('internship already exist')
                        return new Error('internship already exist')
                    }

                    // Если стажировки нет в базе, то добавляем ее
                    const data:any = {
                        namePost: internship.namePost,
                        timeOfParse: new Date(),
                    }

                    if (internship.fullText)
                        data.fullText = internship.fullText
                    if (internship.link)
                        data.link = internship.link
                    if (internship.linkPDF)
                        data.linkPDF = JSON.stringify(internship.linkPDF)
                    if (internship.sourceLink)
                        data.sourceLink = internship.sourceLink
                    if (internship.organization)
                        data.organization = internship.organization
                    if (internship.dateCreationPost)
                        data.dateCreationPost = internship.dateCreationPost

                }
          }
        }).catch(e => {
        console.log(e)
    })
}

