export function consoleLog(message: string) {
    const time = new Date().toLocaleString("ru-RU")

    console.log(`${time}\n` + message)
}