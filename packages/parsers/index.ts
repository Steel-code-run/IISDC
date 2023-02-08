import {
	TCallParser,
	TParserResult,
	TParserTypes,
} from '@iisdc/types';
import { execSync } from 'child_process';
import { isParserResultType } from  "@iisdc/types"
import path from 'path';

const callNodeTsParser: TCallParser = (params): TParserResult => {
	// console.log(process.env.NODE_ENV)

	let execString;
	try {
		if (process.env.NODE_ENV === 'development')
			execString = `ts-node  ${path.join(__dirname,"src","node",params.parser.fileUrl)}`
		else
			execString = `node  ${path.join(__dirname,"src","node",params.parser.fileUrl)}`
	} catch (e) {
		throw new Error('Errors with parser file path');
	}


	if (!params.page) params.page = 1;

	execString += ` ${params.page}`;

	const result = JSON.parse(execSync(execString).toString());

	const type = result.type;
	if (!isParserResultType(type))
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

export const callParser: TCallParser = (params): TParserResult => {
	switch (params.parser.parserType) {
		case TParserTypes['ts-node']:
			return callNodeTsParser(params);
		// case TParserTypes.python:
		//     return callPythonParser(params);
		default:
			throw new Error('Unknown parser type');
	}
};
