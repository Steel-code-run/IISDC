import {afterAll, beforeEach, describe, expect, test} from '@jest/globals';
import {TGrant} from "@iisdc/types";
import {
    competitionsTableName,
    directionsConstTableName,
    directionsTableName,
    grantsTableName
} from "../../src/API/sqlite/config";
import {GrantsOperations, IGrantsOperations} from "../../src/API/sqlite/parser/GrantsOperations";
import {grantFixture} from "../fixtures/grantFixture";

import {DirectionsOperations} from "../../src/API/sqlite/DirectionsOperations";
import {DirectionsConstOperations} from "../../src/API/sqlite/DirectionsConstOperations";
import path from "path";
import {__projectPath} from "../../src/utils/projectPath";
import {CompetitionOperations} from "../../src/API/sqlite/parser/CompetitionsOperation";


let grantsOperations: IGrantsOperations
let directionsConstOperations: DirectionsConstOperations
let randomGrant:TGrant
let parserDb = require('better-sqlite3')(path.join(__projectPath, '../','tests','testingSqlite','GrantsOperations-parser.db'));

describe("GrantsOperations",()=>{
    beforeEach(()=>{
        randomGrant = grantFixture()
    })
    afterAll(()=>{
        directionsConstOperations.removeConst("direction1")
        directionsConstOperations.removeConst("direction2")
        directionsConstOperations.removeConst("direction3")
        directionsConstOperations.removeConst("direction4")
        directionsConstOperations.removeConst("direction5")
    })

    test("Init object",()=>{
        directionsConstOperations = new DirectionsConstOperations(parserDb,directionsConstTableName)
        let directionsOperations = new DirectionsOperations(parserDb, directionsTableName, directionsConstOperations)
        new CompetitionOperations(parserDb, competitionsTableName,directionsOperations)

        grantsOperations = new GrantsOperations(
            parserDb,
            grantsTableName,
            directionsOperations
        )
        grantsOperations.deleteAll()
    })

    describe("Create and get grant", ()=>{
        let grant:TGrant;

        test("Create directionsConst",()=>{
            directionsConstOperations.insertConst("direction1")
            directionsConstOperations.insertConst("direction2")
            directionsConstOperations.insertConst("direction3")
            directionsConstOperations.insertConst("direction4")
            directionsConstOperations.insertConst("direction5")
        })
        test("Create grant", ()=>{
            randomGrant.direction = ["direction1","direction2"]
            randomGrant.namePost="d12"
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

        test("add grant2",()=>{
            randomGrant.direction = ["direction2"]
            randomGrant.namePost="d2"
            let newGrantId = grantsOperations.insertGrant(randomGrant)
            grant = randomGrant
            grant.id = newGrantId

            expect(typeof newGrantId).toMatch('number')
        })

        test("add grant3",()=>{
            randomGrant.direction = ["direction2", "direction3"]
            randomGrant.namePost="d23"
            let newGrantId = grantsOperations.insertGrant(randomGrant)
            grant = randomGrant
            grant.id = newGrantId

            expect(typeof newGrantId).toMatch('number')
        })

        test("get grants without directions",()=>{

            expect(grantsOperations.getGrants({
                namePost:""
            }).length).toBe(3)
        })

        test("get grants without directions",()=>{

            expect(grantsOperations.getGrants({
                namePost:"3"
            }).length).toBe(1)
        })

        test("get grants with directions 1 ",()=>{

            expect(grantsOperations.getGrants({
                directions:["direction3"],
                namePost:""
            }).length).toBe(1)
        })

        test("get grants with directions 2",()=>{

            expect(grantsOperations.getGrants({
                directions:["direction2"],
                namePost:""
            }).length).toBe(3)
        })

        test("get grants with directions 3",()=>{

            expect(grantsOperations.getGrants({
                directions:["direction2"],
                namePost:""
            }).length).toBe(3)
        })

        test("get grants",()=>{
            let grant = grantFixture()
            grant.namePost = "aaaaaaaaaaaaaaaaaaaaaaaaa"
            grant.id = grantsOperations.insertGrant(grant)
            let expectedGrant = grantsOperations.getGrants({
                namePost:"aaaaaaaaaaaaaaaaaaaaaaaaa"
            })[0]
            expect(expectedGrant).toMatchObject(grant)

        })

        test("get no grants",()=>{

            expect(grantsOperations.getGrants({
                directions:["direction2as"],
                namePost:"3asfasfas"
            }).length).toBe(0)
        })

        test("BlackList test 1",()=>{
            grant = grantFixture()
            grant.namePost +=" testing BlackList"
            grant.id = grantsOperations.insertGrant(grant)

            grantsOperations.setGrantToBlackList(grant.id)

            expect(grantsOperations.getGrants({
                namePost: grant.namePost,
            }).length).toBe(0)
        })

        test("BlackList test 1",()=>{

            if (!grant.id)
                throw new Error("grant id undefined")

            grantsOperations.removeFromBlackList(grant.id)

            expect(grantsOperations.getGrants({
                namePost: grant.namePost,
            }).length).toBe(1)
        })

        test("Update grant",()=>{
            if (!grant.id)
                throw new Error("grant id undefined")

            let newGrant = grantFixture()
            newGrant.id = grant.id
            grantsOperations.updateGrant(newGrant)

            let updatedGrant = grantsOperations.getGrant(grant.id)

            if (!updatedGrant)
                throw new Error("не был получен грант")

            updatedGrant.id = newGrant.id
            updatedGrant.namePost = newGrant.namePost
            updatedGrant.sourceLink = newGrant.sourceLink
            updatedGrant.timeOfParse = newGrant.timeOfParse
            expect(updatedGrant).toMatchObject(newGrant)
        })

        test("Delete grant",()=>{
            if (!grant.id)
                throw new Error("grant.id not defined")

            grantsOperations.deleteGrant(grant.id)
            expect(grantsOperations.getGrant(grant.id)).toBeUndefined()

        })

        let grant1 = grantFixture()
        let grant2 = grantFixture()
        let grant3 = grantFixture()
        let grant4 = grantFixture()
        let grant5 = grantFixture()

        test("add 5 grants",()=>{
            grant1.id = grantsOperations.insertGrant(grant1)
            grant2.id = grantsOperations.insertGrant(grant2)
            grant3.id = grantsOperations.insertGrant(grant3)
            grant4.id = grantsOperations.insertGrant(grant4)
            grant5.id = grantsOperations.insertGrant(grant5)
        })

        test("get limited last 2 grants",()=>{
            expect(grantsOperations.getGrants({
                limit:2,
            })).toMatchObject([grant5, grant4])
        })

        test("get limited last 2 from 2 grants",()=>{
            expect(grantsOperations.getGrants({
                from: 2,
                limit:2,
            })).toMatchObject([grant3, grant2])
        })

        test("COUNT", ()=>{

            expect(grantsOperations.getGrants({
                justCountIt: true
            })).toBe(9)

            grantsOperations.deleteAll()

            expect(grantsOperations.getGrants({
                justCountIt: true
            })).toBe(0)
        })
    })
})