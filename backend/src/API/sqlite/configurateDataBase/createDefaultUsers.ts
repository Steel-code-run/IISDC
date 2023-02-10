import {IUserWithPassword, UserRole} from "@iisdc/types";
import * as sqliteUsers from "../users/users";
const users:IUserWithPassword[] = [
    {
        id: -1,
        name: "admin",
        role: UserRole.admin,
        password: "admin",
    },
    {
        id: -1,
        name: "user",
        role: UserRole.user,
        password: "user",
    },
    {
        id: -1,
        name: "quest",
        role: UserRole.quest,
        password: "quest",
    }
]
export const createDefaultUsers = () => {
    for (const user of users) {
        if (!sqliteUsers.getUserByName(user)) {
            sqliteUsers.insertUser(user);
        }
    }
}