import {TParser, TParserType} from "@iisdc/types";

const parsersParams = [
    {
        name:"fasie",
        url:"https://fasie.ru/",
        fileUrl:"fasie",
        parserType: TParserType["nodejs"]
    },
    {
        name: "guap.ru",
        url: "https://guap.ru/m/science/grants",
        fileUrl: "guap",
        parserType: TParserType.nodejs
    },
    {
        name:"integraciya",
        url:"https://integraciya.ru/",
        fileUrl:"integraciya",
        parserType: TParserType["nodejs"]
    },
    {
        name:"RSCI",
        url:"https://RSCI.ru/",
        fileUrl:"RSCI",
        parserType: TParserType["nodejs"]
    },
    {
        name:"minobrnauki",
        url:"https://minobrnauki.ru/",
        fileUrl:"minobrnauki",
        parserType: TParserType["nodejs"]
    },
    {
        name: "rb.ru",
        url:"...",
        fileUrl: "rb.ru",
        parserType: TParserType.nodejs
    },
    {
        name: "rcfoundation",
        url: '.',
        fileUrl: "rcfoundation",
        parserType: TParserType.nodejs
    },
    {
        name: "sowa-ru",
        url: ".",
        fileUrl: "sowa-ru",
        parserType: TParserType["nodejs"]
    },
    {
        name: "tvoyhod",
        url: ".",
        fileUrl: "tvoyhod",
        parserType: TParserType.nodejs
    },
    // {
    //     name: "cptgrantov",
    //     url: ".",
    //     fileUrl: "cptgrantov",
    //     parserType: TParserType.nodejs
    // },
    {
        name: "fadm.gov",
        url: ".",
        fileUrl: "fadm.gov",
        parserType: TParserType.nodejs
    },
    {
        name: "oreluniver",
        url: ".",
        fileUrl: "oreluniver",
        parserType: TParserType.nodejs
    },
    {
        name: "rsv",
        url: ".",
        fileUrl: "rsv",
        parserType: TParserType.nodejs
    },
    {
        name: "vsekonkursy",
        url: ".",
        fileUrl: "vsekonkursy",
        parserType: TParserType.nodejs
    },
    {
        name: "eee-science",
        url: ".",
        fileUrl: "eee-science",
        parserType: TParserType.nodejs
    },
    {
        name: 'фонд_культ._иниц',
        url: ".",
        fileUrl: "фонд_культ._иниц",
        parserType: TParserType.nodejs
    },
    {
        name: 'президентские_гранты',
        url: ".",
        fileUrl: "президентские_гранты",
        parserType: TParserType.nodejs
    },
    {
        name: 'docs.edu.gov',
        url: ".",
        fileUrl: "docs.edu.gov",
        parserType: TParserType.nodejs
    },
    {
        name: 'skyconf',
        url: ".",
        fileUrl: "skyconf",
        parserType: TParserType.nodejs
    },
    {
        name: 'sdtech',
        url: ".",
        fileUrl: "sdtech",
        parserType: TParserType.nodejs
    },
    {
        name: 'itonecup',
        url: ".",
        fileUrl: "itonecup",
        parserType: TParserType.nodejs
    },
    {
        name: 'konkurs.rcfoundation',
        url: ".",
        fileUrl: "konkurs.rcfoundation",
        parserType: TParserType.nodejs
    },
    {
        name: 'премия.мывместе',
        url: ".",
        fileUrl: "премия.мывместе",
        parserType: TParserType.nodejs
    },
    {
        name: 'moyastrana',
        url: ".",
        fileUrl: "moyastrana",
        parserType: TParserType.nodejs
    },
    {
        name: 'world-it-planet',
        url: ".",
        fileUrl: "world-it-planet",
        parserType: TParserType.nodejs
    },
    {
        name: 'tyvigre',
        url: ".",
        fileUrl: "tyvigre",
        parserType: TParserType.nodejs
    },
    {
        name: 'start.kontur',
        url: ".",
        fileUrl: "start.kontur",
        parserType: TParserType.nodejs
    },
    {
        name: 'smallhomeland',
        url: ".",
        fileUrl: "smallhomeland",
        parserType: TParserType.nodejs
    },
    {
        name: 'sberstudent',
        url: ".",
        fileUrl: "sberstudent",
        parserType: TParserType.nodejs
    },
    {
        name: 'ruseasons',
        url: ".",
        fileUrl: "ruseasons",
        parserType: TParserType.nodejs
    },
    {
        name: 'rscf',
        url: ".",
        fileUrl: "rscf",
        parserType: TParserType.nodejs
    },
    {
        name: 'project.lanbook',
        url: ".",
        fileUrl: "project.lanbook",
        parserType: TParserType.nodejs
    },

]
export const generateDefaultParsers = ():TParser[] => {
    const defaultParsers: TParser[] = [];
    parsersParams.forEach(parser => {
        defaultParsers.push({
            parserType: parser.parserType,
            name: parser.name,
            url: parser.url,
            fileUrl: parser.fileUrl,
            enabled: "true",
        })

    })
    return defaultParsers;
}