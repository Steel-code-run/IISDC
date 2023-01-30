import {describe,test, expect,beforeAll} from '@jest/globals';
import {
    createUsersDataTable,
    deleteUsersDataTable,
    getUsers,
    isUsersDataTableExist
} from "~/src/API/sqlite/users/users";
import * as process from "process";



if (process.env.BYPASS_TESTS === "true") {
    describe('sqlite: usersData', () => {

        beforeAll(()=>{
            if (isUsersDataTableExist())
                deleteUsersDataTable()

        })

        test("table is not exist", () => {
            expect(isUsersDataTableExist()).toBe(false)
        })

        test("table is exist", () => {
            createUsersDataTable()
            expect(isUsersDataTableExist()).toBe(true)
        })

        test("table must be empty", () => {
            expect(getUsers()).toEqual([])
        })
    });
} else{
    describe("sqlite: usersData",()=>{
        test("it test can be dangerous", () => {
        })
        test("run it with next command if you want",()=>{
        })
        test("cmd: cross-env BYPASS_TESTS=true npm run test:sqlite",()=>{
        })
    })
}
