import {TParser, TParserCallParams} from "@iisdc/types";

const parsersCallQueue: TParserCallParams[] = [];


// парсеры в очереди не будут повторяться
export const parserCallQueuePush = (parser: TParser, page:number = 1) => {
    if (parsersCallQueue.find(p => p.parser.name === parser.name)) return;
    parsersCallQueue.push({parser, page});
}

export const parserCallQueueShift = ():TParserCallParams|undefined => {
    return parsersCallQueue.shift()
}

export const parserCallQueueIsEmpty = () => {
    return parsersCallQueue.length === 0;
}
/*
    * Добавляет в очередь парсеры, которые еще не были добавлены
    * @param parsers - массив парсеров
    * @param page - страница, которую нужно парсить
 */
export const parserCallQueuePushMany = (parsers: TParser[], page:number = 1) => {
    parsers.forEach(parser => parserCallQueuePush(parser, page));
}

export const showParsersCallQueue = () => {
    return parsersCallQueue.slice()
}