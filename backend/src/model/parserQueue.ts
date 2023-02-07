import {TParser} from "@iisdc/types";

type parsersQueue = TParser[];

const queue: parsersQueue = [];

// парсеры в очереди не будут повторяться
export const parsersQueuePush = (parser: TParser) => {
    if (queue.find(p => p.name === parser.name)) return;
    queue.push(parser);
}
export const parsersQueueShift = ():TParser|undefined => {
    return queue.shift()
}

export const parsersQueueIsEmpty = () => {
    return queue.length === 0;
}

export const parsersQueuePushMany = (parsers: TParser[]) => {
    parsers.forEach(parser => parsersQueuePush(parser));
}