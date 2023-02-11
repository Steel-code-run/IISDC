import {TParser, TParserType} from "@iisdc/types";

const parsersParams = [
    {
        name:"cptgrantov",
        url:"https://cptgrantov.ru/",
        fileUrl:"cptgrantov",
        parserType: TParserType["nodejs"]
    },
    {
        name:"fadm.gov",
        url:"https://fadm.gov/",
        fileUrl:"fadm.gov",
        parserType: TParserType["nodejs"]
    },
    {
        name:"fasie",
        url:"https://fasie.ru/",
        fileUrl:"fasie",
        parserType: TParserType["nodejs"]
    },
    {
        name:"integraciya",
        url:"https://integraciya.ru/",
        fileUrl:"integraciya",
        parserType: TParserType["nodejs"]
    },
    {
        name:"minobrnauki",
        url:"https://minobrnauki.ru/",
        fileUrl:"minobrnauki",
        parserType: TParserType["nodejs"]
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