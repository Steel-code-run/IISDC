import {TCallParser, TParserResult, TParserResultTypes, TParserTypes} from "~/src/types/serializables/parser";
import {execSync} from "child_process";


const callNodeTsParser: TCallParser = (params):TParserResult => {
    let execString = `ts-node ${params.parser.fileUrl}`;

    if (!params.page) params.page = 1

    execString += ` ${params.page}`

    const result = JSON.parse(execSync(execString).toString());

    const type = result.type as TParserResultTypes;

    if (!(type in TParserResultTypes))
        throw new Error('Unknown parser result type')

    return {
        type: type,
        posts: result.posts
    }
}


// const callPythonParser: TCallParser = (params):TParserResult => {
//
//
// }

export const callParser:TCallParser = (params):TParserResult => {
    switch (params.parser.parserType) {
        case TParserTypes["ts-node"]:
            return callNodeTsParser(params);
        // case TParserTypes.python:
        //     return callPythonParser(params);
        default:
            throw new Error("Unknown parser type");
    }
}


