import {parsersQueueIsEmpty, parsersQueuePushMany, parsersQueueShift} from "./parserQueue";
import {consoleLog} from "../utils/consoleLog";
import {callParser} from "@iisdc/parser";
import * as sqliteParser from "../API/sqlite/parser/parser";
import {generateDefaultParsers} from "./defaultParsers";

let isParsingEnabled = false;
export const enableParsing = () => {
    sqliteParser.dropParsersTable();
    sqliteParser.createParsersTable();
    if (isParsingEnabled) return;

    const parsers = generateDefaultParsers();

    parsers.forEach(parser => sqliteParser.addParser(parser));
    isParsingEnabled = true;
    parse();
};

const parse = () => {
    parsersQueuePushMany(sqliteParser.getParsers());
    while (!parsersQueueIsEmpty()) {
        const currentParser = parsersQueueShift();
        if (!currentParser) continue;

        consoleLog("currentParser: " + currentParser.name);
        const posts = callParser({parser: currentParser});
        console.log(posts)
    }
    if (parsersQueueIsEmpty()){
        consoleLog("parsersQueueIsEmpty");
        // ms * sec * min
        setTimeout(parse, 1000 * 10)
    }
}

