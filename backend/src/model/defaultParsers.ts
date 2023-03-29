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
        url:"https://rb.ru",
        fileUrl: "rb.ru",
        parserType: TParserType.nodejs
    },
    {
        name: "rcfoundation",
        url: 'https://rcfoundation.ru',
        fileUrl: "rcfoundation",
        parserType: TParserType.nodejs
    },
    {
        name: "sowa-ru",
        url: "https://sowa-ru.com/",
        fileUrl: "sowa-ru",
        parserType: TParserType["nodejs"]
    },
    {
        name: "tvoyhod",
        url: "https://tvoyhod.online/",
        fileUrl: "tvoyhod",
        parserType: TParserType.nodejs
    },
    // {
    //     name: "cptgrantov",
    //     url: "https://t.me/cptcptgrantov",
    //     fileUrl: "cptgrantov",
    //     parserType: TParserType.nodejs
    // },
    {
        name: "fadm.gov",
        url: "https://fadm.gov.ru/",
        fileUrl: "fadm.gov",
        parserType: TParserType.nodejs
    },
    {
        name: "oreluniver",
        url: "https://oreluniver.ru",
        fileUrl: "oreluniver",
        parserType: TParserType.nodejs
    },
    {
        name: "rsv",
        url: "https://rsv.ru/",
        fileUrl: "rsv",
        parserType: TParserType.nodejs
    },
    {
        name: "vsekonkursy",
        url: "https://vsekonkursy.ru/",
        fileUrl: "vsekonkursy",
        parserType: TParserType.nodejs
    },
    {
        name: "eee-science",
        url: "https://eee-science.ru",
        fileUrl: "eee-science",
        parserType: TParserType.nodejs
    },
    {
        name: 'фонд_культ._иниц',
        url: "https://фондкультурныхинициатив.рф/",
        fileUrl: "фонд_культ._иниц",
        parserType: TParserType.nodejs
    },
    {
        name: 'президентские_гранты',
        url: "https://президентскиегранты.рф/",
        fileUrl: "президентские_гранты",
        parserType: TParserType.nodejs
    },
    {
        name: 'docs.edu.gov',
        url: "https://docs.edu.gov.ru/",
        fileUrl: "docs.edu.gov",
        parserType: TParserType.nodejs
    },
    {
        name: 'skyconf',
        url: "https://sfy-conf.ru",
        fileUrl: "skyconf",
        parserType: TParserType.nodejs
    },
    {
        name: 'sdtech',
        url: "https://sdtech.sk.ru",
        fileUrl: "sdtech",
        parserType: TParserType.nodejs
    },
    {
        name: 'itonecup',
        url: "https://itonecup.sk.ru",
        fileUrl: "itonecup",
        parserType: TParserType.nodejs
    },
    {
        name: 'konkurs.rcfoundation',
        url: "https://konkurs.rcfoundation.ru",
        fileUrl: "konkurs.rcfoundation",
        parserType: TParserType.nodejs
    },
    {
        name: 'премия.мывместе',
        url: "https://премия.мывместе.рф/",
        fileUrl: "премия.мывместе",
        parserType: TParserType.nodejs
    },
    {
        name: 'moyastrana',
        url: "https://www.moyastrana.ru/",
        fileUrl: "moyastrana",
        parserType: TParserType.nodejs
    },
    {
        name: 'world-it-planet',
        url: "https://world-it-planet.org/",
        fileUrl: "world-it-planet",
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