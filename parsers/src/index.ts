import {TParserCallParams, TParserResult, TParserType,} from './types/src/serial/parser';

import path from 'path';
import util from 'node:util';
import {exec} from 'child_process';
import {isTParserResult} from "./types/src/typeGuards";

const execPromise = util.promisify(exec);
const callNodeTsParser = (params:TParserCallParams): Promise<TParserResult> => {
	// console.log(process.env.NODE_ENV)

	let execString;
	try {
		execString = `node  ${path.join(__dirname,"node",params.parser.fileUrl)}`
	} catch (e) {
		throw new Error('Errors with parser file path');
	}

	execString += ` ${params.page}`;

	return execPromise(execString).then(({stdout}) => {
		stdout = JSON.parse(stdout);
		if (!isTParserResult(stdout))
			throw new Error('Parser result is not valid');
		return stdout;
	})
};

// const callPythonParser: TCallParser = (params):TParserResult => {
//
//
// }

export const callParser = async (params:TParserCallParams): Promise<TParserResult> => {
	switch (params.parser.parserType) {
		case TParserType.nodejs:
			return callNodeTsParser(params);
		// case TParserTypes.python:
		//     return callPythonParser(params);
		default:
			throw new Error('Unknown parser type');
	}
};
