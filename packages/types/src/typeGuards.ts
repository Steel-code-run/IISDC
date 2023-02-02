import { TParserResultType } from './serial/parser';

export const isParserResultType = (type: any): type is TParserResultType =>
	Object.keys(TParserResultType).includes(type);
