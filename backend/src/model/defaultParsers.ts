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
    }
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