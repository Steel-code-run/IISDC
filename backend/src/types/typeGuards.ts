import { TParserResultType } from '~/src/types/serializables/parser';

export const isParserResultType = (type: any): type is TParserResultType =>
	Object.keys(TParserResultType).includes(type);
