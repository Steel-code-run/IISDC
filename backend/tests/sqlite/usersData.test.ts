import {describe,test, expect,beforeAll} from '@jest/globals';

import * as process from "process";
import {
    createTable,
    deleteTable,
    getUsers,
    isTableExist
} from "../../src/API/sqlite/users/users";



if (process.env.BYPASS_TESTS === "true") {
    describe('sqlite: usersData', () => {

        beforeAll(()=>{
            if (isTableExist())
                deleteTable()

        })

        test("table is not exist", () => {
            expect(isTableExist()).toBe(false)
        })

        test("table is exist", () => {
            createTable()
            expect(isTableExist()).toBe(true)
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
