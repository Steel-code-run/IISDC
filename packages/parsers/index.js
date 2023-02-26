"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callParser = void 0;
const types_1 = require("@iisdc/types");
const path_1 = __importDefault(require("path"));
const node_util_1 = __importDefault(require("node:util"));
const child_process_1 = require("child_process");
const execPromise = node_util_1.default.promisify(child_process_1.exec);
const callNodeTsParser = (params) => {
    // console.log(process.env.NODE_ENV)
    let execString;
    try {
        execString = `node  ${path_1.default.join(__dirname, "src", "node", params.parser.fileUrl)}`;
    }
    catch (e) {
        throw new Error('Errors with parser file path');
    }
    execString += ` ${params.page}`;
    return execPromise(execString).then(({ stdout }) => {
        stdout = JSON.parse(stdout);
        if (!(0, types_1.isTParserResult)(stdout))
            throw new Error('Parser result is not valid');
        return stdout;
    });
};
// const callPythonParser: TCallParser = (params):TParserResult => {
//
//
// }
const callParser = async (params) => {
    switch (params.parser.parserType) {
        case types_1.TParserType.nodejs:
            return callNodeTsParser(params);
        // case TParserTypes.python:
        //     return callPythonParser(params);
        default:
            throw new Error('Unknown parser type');
    }
};
exports.callParser = callParser;
//# sourceMappingURL=index.js.map