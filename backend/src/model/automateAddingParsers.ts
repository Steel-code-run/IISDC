import {parserCallQueuePushMany, showParsersCallQueue} from "./parserQueue";
import * as sqliteParser from "../API/sqlite/parser/parser";
const allowTimeStart = "0:00:00"
const allowTimeEnd = "24:00:00"
let isAutomateAddingParsersActivate = false
export const isTimeToAddParsersToQueue = ():boolean => {
    const curTime = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()

    return (diffDate(allowTimeStart, curTime) > 0) &&
        diffDate(curTime, allowTimeEnd) > 0;
}

function diffDate(date1:string,date2:string):number{
    const date1Arr = date1.split(":")
    const date2Arr = date2.split(":")
    const date1Sec = parseInt(date1Arr[0])*3600 + parseInt(date1Arr[1])*60 + parseInt(date1Arr[2])
    const date2Sec = parseInt(date2Arr[0])*3600 + parseInt(date2Arr[1])*60 + parseInt(date2Arr[2])
    return date2Sec - date1Sec
}

const automateAddingParsers = async () => {
    if (isTimeToAddParsersToQueue()) {
        parserCallQueuePushMany(sqliteParser.getParsers(1000));
    }
    // Проверяем каждую минуту
    setTimeout(automateAddingParsers, 1000 * 60)
}

export const activateAutomateAddingParsers = () => {
    if (isAutomateAddingParsersActivate)
        return
    isAutomateAddingParsersActivate = true
    automateAddingParsers().then()
}