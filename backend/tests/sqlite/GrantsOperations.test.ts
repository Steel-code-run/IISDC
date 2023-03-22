import {describe,test, expect,beforeAll,beforeEach} from '@jest/globals';
import {IUsersOperations, UsersOperations} from "../../src/API/sqlite/users/UsersOperations";
import path from "path";
import {__projectPath} from "../../src/utils/projectPath";
import {IUser, TGrant} from "@iisdc/types";
import {userFixture} from "../fixtures/userFixture";
import {grantsTableName, usersTableName} from "../../src/API/sqlite/config";
import {GrantOperations, IGrantsOperations} from "../../src/API/sqlite/parser/GrantsOperations";
import {grantFixture} from "../fixtures/grantFixture";


let grantsOperations: IGrantsOperations

const testingSqliteDb = require('better-sqlite3')(path.join(__projectPath,'../','tests','testingSqlite','parser.db'));

let randomGrant:TGrant
describe("GrantsOperations",()=>{
    beforeEach(()=>{
        randomGrant = grantFixture()
    })

    test("Init object",()=>{
        grantsOperations = new GrantOperations(
            testingSqliteDb,
            grantsTableName
        )
    })

    describe("Create and get user", ()=>{
        let grant:TGrant;

        test("Create grant", ()=>{
            let newGrantId = grantsOperations.insertGrant(randomGrant)
            grant = randomGrant
            grant.id = newGrantId

            expect(typeof newGrantId).toMatch('number')
        })

        test("Get grant",()=>{
            if (!grant.id)
                throw new Error("grant.id not defined")

            expect(grantsOperations.getGrant(grant.id)).toMatchObject(grant)
        })

    })




})