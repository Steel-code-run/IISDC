import {afterAll, beforeEach, describe, expect, test} from '@jest/globals';
import {TGrant} from "@iisdc/types";
import {directionsConstTableName, directionsTableName, grantsTableName} from "../../src/API/sqlite/config";
import {GrantOperations, IGrantsOperations} from "../../src/API/sqlite/parser/GrantsOperations";
import {grantFixture} from "../fixtures/grantFixture";
import {parserDb} from "./config";
import {DirectionsOperations} from "../../src/API/sqlite/DirectionsOperations";
import {DirectionsConstOperations} from "../../src/API/sqlite/DirectionsConstOperations";


let grantsOperations: IGrantsOperations
let directionsConstOperations: DirectionsConstOperations
let randomGrant:TGrant


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

        grantsOperations = new GrantOperations(
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

        test("Delete grant",()=>{
            if (!grant.id)
                throw new Error("grant.id not defined")

            grantsOperations.deleteGrant(grant.id)
            expect(grantsOperations.getGrant(grant.id)).toBeUndefined()

        })

    })




})