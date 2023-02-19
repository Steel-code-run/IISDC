import {describe,test, expect,beforeAll,beforeEach} from '@jest/globals';


import * as sqliteGrants from "../../src/API/sqlite/parser/grants"
import path from "path";
import {__projectPath} from "../../src/utils/projectPath";
import {grantFixture} from "../fixtures/grantFixture";
import {TGrant} from "@iisdc/types";

let dbPath = path.join(__projectPath, '../','sqlite','db','testing__parser.db');



describe("sqliteGrants", () =>{
    let grant: TGrant
    let expectedGrant: TGrant

    beforeAll(()=>{
        sqliteGrants.setDb(dbPath)
    })
    beforeEach(()=>{
        grant = grantFixture()
        sqliteGrants.dropTable()
        expectedGrant = Object.assign(grant)
        expectedGrant.id = 1
    })

    test("isTableExist: false", ()=>{
        expect(sqliteGrants.isTableExist()).toBe(false)
    })
    test("createTable: создание таблицы", ()=>{
        sqliteGrants.createTable()
        expect(sqliteGrants.isTableExist()).toBe(true)
    })

    test("getGrants: cоздание таблицы при вызове, если её нет",()=>{
        sqliteGrants.getGrants()
        expect(sqliteGrants.isTableExist()).toBe(true)
    })

    test("get: получение лимитного числа грантов", ()=>{
        sqliteGrants.add(grantFixture())
        sqliteGrants.add(grantFixture())
        sqliteGrants.add(grantFixture())
        sqliteGrants.add(grantFixture())
        sqliteGrants.add(grantFixture())
        sqliteGrants.add(grantFixture())
        expect(sqliteGrants.getGrants({},3)).toHaveLength(3)
    })

    test("add: Добавление гранта",()=>{
        sqliteGrants.add(grant)
        expect(sqliteGrants.getGrants(grant)).toMatchObject([expectedGrant])
    })

    test("add: Добавление существующего гранта",()=>{
        sqliteGrants.add(grant)
        expect(()=>sqliteGrants.add(grant)).toThrowError()
    })

    test("count: Подсчёт грантов_1",()=>{
        expect(sqliteGrants.count()).toMatchObject([{"COUNT(*)":0}])
    })

    test("count: Подсчёт грантов_2",()=>{
        sqliteGrants.add(grant)
        sqliteGrants.add(grantFixture())
        expect(sqliteGrants.count()).toMatchObject([{"COUNT(*)":2}])
    })

})