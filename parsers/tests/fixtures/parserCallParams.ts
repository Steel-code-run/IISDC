import {TParserCallParams, TParserType} from "@iisdc/types";

export function parserCallParamsFixture(fileUrl = ""):TParserCallParams {
    let def: TParserCallParams = {
        parser: {
            name: "",
            parserType: TParserType.nodejs,
            url: "",
            fileUrl: fileUrl,
            enabled: "true",
        },
        page: 1,
    }

    return def
}