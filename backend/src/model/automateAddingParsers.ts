import {parserCallQueuePushMany} from "./parserQueue";
import * as sqliteParser from "../API/sqlite/parser/parser";
import {diffDate} from "../helpers/diffDate";
const allowTimeStart = "10:00:00"
const allowTimeEnd = "18:00:00"
let isAutomateAddingParsersActivate = false
export const isTimeToAddParsersToQueue = ():boolean => {
    const curTime = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()

    return (diffDate(allowTimeStart, curTime) > 0) &&
        diffDate(curTime, allowTimeEnd) > 0;
}


const automateAddingParsers = async () => {
    if (isTimeToAddParsersToQueue()) {
        parserCallQueuePushMany(sqliteParser.getParsers({},0,1000));
    }
    // Проверяем каждый час
    setTimeout(automateAddingParsers, 1000 * 60 * 60)
}

export const activateAutomateAddingParsers = () => {
    if (isAutomateAddingParsersActivate)
        return
    isAutomateAddingParsersActivate = true
    automateAddingParsers().then()
}