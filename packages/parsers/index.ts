import {
	isTParserResult,
	TParserCallParams,
	TParserResult,
	TParserType,
} from '@iisdc/types';
import { execSync } from 'child_process';
import path from 'path';

const callNodeTsParser = (params:TParserCallParams): TParserResult => {
	// console.log(process.env.NODE_ENV)

	let execString;
	try {
		execString = `node  ${path.join(__dirname,"src","node",params.parser.fileUrl)}`
	} catch (e) {
		throw new Error('Errors with parser file path');
	}


	if (!params.page) params.page = 1;

	execString += ` ${params.page}`;

	const result = JSON.parse(execSync(execString).toString());

	if (!isTParserResult(result))
		throw new Error('Parser result is not valid');

	return result;
};

// const callPythonParser: TCallParser = (params):TParserResult => {
//
//
// }

export const callParser = (params:TParserCallParams): TParserResult => {
	switch (params.parser.parserType) {
		case TParserType.nodejs:
			return callNodeTsParser(params);
		// case TParserTypes.python:
		//     return callPythonParser(params);
		default:
			throw new Error('Unknown parser type');
	}
};
