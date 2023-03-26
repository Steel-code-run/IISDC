import {describe,test, expect,beforeAll,beforeEach} from '@jest/globals';
import {IUsersOperations, UsersOperations} from "../../src/API/sqlite/users/UsersOperations";
import path from "path";
import {__projectPath} from "../../src/utils/projectPath";
import {IUser} from "@iisdc/types";
import {userFixture} from "../fixtures/userFixture";
import {usersTableName} from "../../src/API/sqlite/config";


let usersOperations: IUsersOperations

const testingSqliteDb = require('better-sqlite3')(path.join(__projectPath,'../','tests','testingSqlite','UsersOperations-parser.db'));

let randomUser:IUser
describe("UsersOperations",()=>{
    beforeEach(()=>{
        randomUser = userFixture()
    })

    test("Init object",()=>{
        usersOperations = new UsersOperations(
            testingSqliteDb,
            usersTableName
        )
    })

    describe("Create and get user", ()=>{
        let user:IUser;

        test("Create user", ()=>{
            let newUserId = usersOperations.insertUser(randomUser)
            user = randomUser
            user.id = newUserId

            expect(typeof newUserId).toMatch('number')
        })

        test("Get user",()=>{
            if (!user.id)
                throw new Error("user.id not defined")

            expect(usersOperations.getUser(user.id)).toMatchObject(user)
            expect(usersOperations.getUserByName(user.name)).toMatchObject(user)
        })

        test("Update user",()=>{
            if (!user.id)
                throw new Error("user.id not defined")

            let updateUser = userFixture()
            updateUser.id = user.id
            usersOperations.update(updateUser)

            expect(usersOperations.getUser(updateUser.id)).toMatchObject(updateUser)
        })

        test("delete user",()=>{
            if (!user.id)
                throw new Error("user.id not defined")

            usersOperations.delete(user.id)

            expect(usersOperations.getUser(user.id)).toBeUndefined()
        })
    })
})