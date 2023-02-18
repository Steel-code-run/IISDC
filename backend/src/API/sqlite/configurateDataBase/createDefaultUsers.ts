import {IUser, UserRole} from "@iisdc/types";
import * as sqliteUsers from "../users/users";
const users:IUser[] = [
    {
        name: "admin",
        role: UserRole.admin,
        password: "admin",
    },
    {
        name: "user",
        role: UserRole.user,
        password: "user",
    },
    {
        name: "quest",
        role: UserRole.quest,
        password: "quest",
    }
]
export const createDefaultUsers = () => {
    for (const user of users) {
        sqliteUsers.add(user);
    }
}