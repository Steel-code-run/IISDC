import {
	TCallParser,
	TParserResult,
	TParserTypes,
} from '~/src/types/serializables/parser';
import { execSync } from 'child_process';
import { isParserResultType } from '~/src/types/typeGuards';

const callNodeTsParser: TCallParser = (params): TParserResult => {
	let execString = `ts-node ${params.parser.fileUrl}`;

	if (!params.page) params.page = 1;

	execString += ` ${params.page}`;

	const result = JSON.parse(execSync(execString).toString());

	const type = result.type;
	if (!isParserResultType(type))
		throw new Error('Unknown parser result type');
	return {
		type: type,
		posts: result.posts,
		parseErrors: result.parseErrors,
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
