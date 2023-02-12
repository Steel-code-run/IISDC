import {readFileSync,appendFileSync, statSync, writeFileSync} from "fs";
import {__projectPath} from "./projectPath";
import path from "path";

let lastTrackedTime = 0;
// 1 min
const trackBetween = 1000 * 60;
// 1 mb
const maxLogFileSizeInByte = 1024 * 1024
const logFilePath = path.join(__projectPath, '../', "logs.txt",)
export function consoleLog(message: string) {
    const timeMS = new Date().getTime()
    const timeHuman = new Date().toLocaleString("ru-RU")
    let str = ''
    if (timeMS - lastTrackedTime > trackBetween) {
        str += `\n`
        str += `${timeHuman} \n`
        lastTrackedTime = timeMS
    }
    str += `${message}`
    console.log(str)
    addLogToFile(str)
}

function addLogToFile(message:string){
    while (statSync(logFilePath).size > maxLogFileSizeInByte){
        let content = readFileSync(logFilePath).toString().split("\n")
        content = content.slice(10,content.length)
        console.log(content.length)
        writeFileSync(logFilePath,content.join("\n"))
    }
    appendFileSync(logFilePath, message + "\n", {flag:'a'})
}

