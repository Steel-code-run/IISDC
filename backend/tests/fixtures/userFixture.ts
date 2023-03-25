import {IUser, UserRole} from "@iisdc/types";
import {sampleRange} from "../../src/utils/samleRange";

export function userFixture():IUser{
    return {
        password: Math.random() + 'a',
        name: Math.random()+'a',
        role: sampleRange(UserRole.quest,UserRole.admin),
        id: sampleRange(0,1000)
    }
}