"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callParser = void 0;
const types_1 = require("@iisdc/types");
const child_process_1 = require("child_process");
const types_2 = require("@iisdc/types");
const path_1 = __importDefault(require("path"));
const callNodeTsParser = (params) => {
    // console.log(process.env.NODE_ENV)
    let execString;
    try {
        if (process.env.NODE_ENV === 'development')
            execString = `ts-node  ${path_1.default.join(__dirname, "src", "node", params.parser.fileUrl)}`;
        else
            execString = `node  ${path_1.default.join(__dirname, "src", "node", params.parser.fileUrl)}`;
    }
    catch (e) {
        throw new Error('Errors with parser file path');
    }
    if (!params.page)
        params.page = 1;
    execString += ` ${params.page}`;
    const result = JSON.parse((0, child_process_1.execSync)(execString).toString());
    const type = result.type;
    if (!(0, types_2.isParserResultType)(type))
        throw new Error('Unknown parser result type');
    return {
        type: type,
        posts: result.posts,
    };
};
// const callPythonParser: TCallParser = (params):TParserResult => {
//
//
// }
const callParser = (params) => {
    switch (params.parser.parserType) {
        case types_1.TParserTypes['ts-node']:
            return callNodeTsParser(params);
        // case TParserTypes.python:
        //     return callPythonParser(params);
        default:
            throw new Error('Unknown parser type');
    }
};
exports.callParser = callParser;
