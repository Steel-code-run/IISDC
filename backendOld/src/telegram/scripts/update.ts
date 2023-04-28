import {telegramUser, telegramUserIntervalSettings} from "../../types/serializables";
import {grantsOperations} from "../../API/sqlite/OperationInstances";
import * as sqliteTelegramUsers from "../../API/sqlite/users/telegramUsers";

export const updateSqliteUser = (user:telegramUser) => {

    // проверяем авторизован ли он
    if (!user) {
        return;
    }


    sqliteTelegramUsers.update(user)
}