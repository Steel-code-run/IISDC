import {CronJob, CronTime} from "cron";
import prisma from "../prisma/connect";
import axios from "axios";
import {Competition, Grant} from "../types/Posts";

type JobData = {
    parserId: number;
    // Выполняется ли скрипт
    isRunning: boolean;
    Job: CronJob;
}

const jobsList:JobData[] = [];

export async function addJob(parserId: number, cronTime: string = '* */5 * * *') {

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

    const job = new CronJob(cronTime, () => {
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

export function updateJob(parserId: number, cronTime: string = '* */5 * * *') {
    const job = jobsList.find(job => job.parserId === parserId);
    if (job) {
        job.Job.setTime(new CronTime(cronTime));
    }
    else {
        addJob(parserId, cronTime);
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

    // 1. Получить данные из БД
    // 2. Парсить и добавлять в БД

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
            for (const post of response.data) {
            const postType = post.postType

            if (postType === 'grant') {
                let grant:Grant = post.postDescription

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

                // попытка перевести дату в формат даты

                // Если гранта нет в базе, то добавляем его

                const data:any = {
                    namePost: grant.namePost,
                    timeOfParse: new Date(),
                }

                if (grant.dateCreationPost)
                    data.dateCreationPost = grant.dateCreationPost
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
                    data.linkPDF = grant.linkPDF
                if (grant.sourceLink)
                    data.sourceLink = grant.sourceLink
                if (grant.directionForSpent)
                    data.directionForSpent = grant.directionForSpent

                data.parser_id = parser.id

                await prisma.grants.create({
                    data
                })
            }

            if (postType === 'competition') {
                let competition:Competition = post.postDescription

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

                if (competition.dateCreationPost)
                    data.dateCreationPost = competition.dateCreationPost
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
                    data.linkPDF = competition.linkPDF
                if (competition.sourceLink)
                    data.sourceLink = competition.sourceLink
                if (competition.directionForSpent)
                    data.directionForSpent = competition.directionForSpent
                if (competition.organization)
                    data.organization = competition.organization

                data.parser_id = parser.id

                await prisma.competitions.create({data})
            }
          }
        }).catch(e => {
        console.log(e)
    })
}

