import {describe,test, expect,beforeAll,beforeEach} from '@jest/globals';
import {IUsersOperations, UsersOperations} from "../../src/API/sqlite/users/UsersOperations";
import path from "path";
import {__projectPath} from "../../src/utils/projectPath";
import {IUser} from "@iisdc/types";
import {userFixture} from "../fixtures/userFixture";


let usersOperations: IUsersOperations

const testingSqliteDb = require('better-sqlite3')(path.join(__projectPath, '../../','sqlite','db','users.db'));

let randomUser:IUser
describe("UsersOperations",()=>{
    beforeEach(()=>{
        randomUser = userFixture()
    })

    test("Init object",()=>{
        usersOperations = new UsersOperations()
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

    })




})