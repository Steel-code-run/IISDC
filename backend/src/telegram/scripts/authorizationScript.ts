import {answers} from "../answers";
import defaultKeyboards from "../defaultKeyboards";
import * as sqliteTelegramUsers from "../../API/sqlite/users/telegramUsers";
import TelegramBot from "node-telegram-bot-api";
import {telegramUser} from "../../types/serializables";
const authKey = "testingKey"

export const authorizationScript = (userId:number, key:string) =>{
    const user = sqliteTelegramUsers.getUsers({telegramId:userId})[0]



    // Если уже авторизован
    if (user){
        return
    }
    // Если ключ не правильный
    if (key !== authKey) {
        throw new Error("Wrong key");
    }
    let userToDB:Partial<telegramUser> = {};

    userToDB.telegramId = userId;
    userToDB.settings = {}
    userToDB.settings.intervalSettings = {
        end: "24:00:00",
        start:"00:00:00",
    }
    // Добавляем в бд
    try {
        sqliteTelegramUsers.add(userToDB)
    } catch (e) {
        throw new Error("Error in sqlite");
    }

    return true
}