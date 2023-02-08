let consoleLogString = '';
const timeout = 1000 * 2;
const maxTime = 1000 * 10;
let timeStart = 0;

let timer: NodeJS.Timeout|null = null

export function consoleLog(message: string) {

    consoleLogString += `${message}\n`;

    if (timeStart === 0)
        timeStart = Date.now();

    if (Date.now() - timeStart > maxTime){
        _consoleLog();
        if (timer !== null)
            clearTimeout(timer);
        timeStart = 0;
    } else {
        if (timer !== null)
            clearTimeout(timer);
        timer = setTimeout(_consoleLog, timeout);
    }
}

function _consoleLog(){
    const time = new Date(timeStart).toLocaleString("ru-RU")
    if (consoleLogString.length > 0)
    console.log(`\n${time}\n${consoleLogString}`);
    consoleLogString = '';
}