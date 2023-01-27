import {TCallParser, TParserResult, TParserResultTypes, TParserTypes} from "~/src/types/serializables/parser";



const callNodeTsParser: TCallParser = (params):TParserResult => {

    let {parser
        ,parseTo = 20
        ,page = 1} = params;
    if (typeof parser.fileOrFunction != "function") {
        throw new Error("Parser is not a function");
    }

    return parser.fileOrFunction({parseTo, page});
}

const callPythonParser: TCallParser = (params):TParserResult => {

    if (typeof params.parser.fileOrFunction != "string") {
        throw new Error("Parser is not a string");
    }
    return {
        type: TParserResultTypes.vacancy,

    }
}

export const callParser:TCallParser = (params):TParserResult => {
    switch (params.parser.parserType) {
        case TParserTypes["ts-node"]:
            return callNodeTsParser(params);
        case TParserTypes.python:
            return callPythonParser(params);
        default:
            throw new Error("Unknown parser type");
    }
}


