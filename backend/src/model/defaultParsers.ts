import {TParser, TParserType} from "@iisdc/types";

const parsersParams = [
    // {
    //     name:"cptgrantov",
    //     url:"https://cptgrantov.ru/",
    //     fileUrl:"cptgrantov",
    //     parserType: TParserTypes["ts-node"]
    // },
    // {
    //     name:"fadm.gov",
    //     url:"https://fadm.gov/",
    //     fileUrl:"fadm.gov",
    //     parserType: TParserTypes["ts-node"]
    // },
    // {
    //     name:"fasie",
    //     url:"https://fasie.ru/",
    //     fileUrl:"fasie",
    //     parserType: TParserTypes["ts-node"]
    // },
    {
        name:"RSCI",
        url:"https://RSCI.ru/",
        fileUrl:"RSCI",
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