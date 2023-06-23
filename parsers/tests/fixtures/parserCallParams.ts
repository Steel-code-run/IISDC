import {TParserCallParams, TParserType} from "../../src/types";

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