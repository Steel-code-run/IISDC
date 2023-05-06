import prisma from "../../prisma/connect";
import axios from "axios";
import * as process from "process";

class InfinityParsingLoop{
    infinityLoopCounterStarted = false
    infinityLoopTimeout:null|NodeJS.Timer = null

    getALoop = async () => {
        if (!this.infinityLoopCounterStarted){
            return
        }
        let settings = await prisma.appSettings.findFirst()
        if (settings?.parsingEnabled){
            if (settings?.parsingInterval){
                console.log(settings.parsingInterval.getTime());
                this.infinityLoopTimeout = setTimeout(this.getALoop, settings.parsingInterval.getTime())
                parsePages()
            }
        }
    }
    forceStart = () => {
        if (this.infinityLoopCounterStarted){
            return
        }
        this.infinityLoopCounterStarted = true
        this.getALoop()
    }

    forceStop = () => {
        this.infinityLoopCounterStarted = false
        if (this.infinityLoopTimeout){
            clearTimeout(this.infinityLoopTimeout)
        }
    }
}

export const infinityParsingLoop = new InfinityParsingLoop()

export const addParsersFromDBToQueue = async () => {
    const currentParsers = await prisma.parsing_queue.findMany({take: 400})
    const parsers = await prisma.parsers.findMany({take: 400})
    const currentParsersIds = currentParsers.map(parser => parser.parser_id)

    const newParsers = parsers.filter(parser => {
        return !currentParsersIds.includes(parser.id)
    })

    await prisma.parsing_queue.createMany({
        data: newParsers.map(parser => {
            return {
                parser_id: parser.id,
                page: 1
            }
        })
    })
}

const parsePages = () => {
    prisma.parsing_queue.findFirst({
        orderBy:{
            id: "asc"
        }
    }).then(item => {
        if (item){
            parsePage(item).then(() => {
                prisma.parsing_queue.delete({
                    where: {
                        id: item.id
                    }
                }).then(() => {

                    setTimeout(parsePages, 1000)
                })
            })
        }
    })

}


const parsePage = (queue_item:Awaited<ReturnType<typeof prisma.parsing_queue.findFirst>>) => {
    if (!queue_item){
        return Promise.resolve()
    }

    return prisma.parsers.findUnique({
        where:{
            id: queue_item.parser_id
        }
    }).then((parser) => {
        console.log(parser?.name)
        if (!parser){
            return Promise.resolve()
        }

        return axios.get(process.env.PARSERS_URL! + "/parsers/"+parser.name+"/"+queue_item.page).then( async response => {
            let added = false

            for (let item of response.data){
                if (item.postType === "grant") {
                    if (await grantAdd(item.postDescription, parser.id))
                        added = true
                }
            }
            if (added){
                if (parser.pagesToParse > queue_item.page + 1) {
                    await prisma.parsing_queue.create({
                        data: {
                            page: queue_item.page + 1,
                            parser_id: parser.id
                        }
                    })
                }
            }
        })
    })
}

// Добавление грантов в базу
const grantAdd = (item:any, parser_id:number) => {
    return prisma.grants.findFirst({
        where: {
            namePost: item.namePost
        },
        take: 400
    }).then(grant => {
        if (!grant){
            const data = {
                namePost: item.namePost,
                dateCreationPost: String(item.dateCreationPost),
                parser_id: parser_id,
                timeOfParse: new Date(),
            }


            return prisma.grants.create({
                data: data
            }).then(() => {
                return true
            })
        }
    })
}