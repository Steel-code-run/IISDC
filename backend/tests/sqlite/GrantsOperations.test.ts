import {describe,test, expect,beforeAll,beforeEach} from '@jest/globals';
import {TGrant} from "@iisdc/types";
import {directionsTableName, grantsTableName, usersTableName} from "../../src/API/sqlite/config";
import {GrantOperations, IGrantsOperations} from "../../src/API/sqlite/parser/GrantsOperations";
import {grantFixture} from "../fixtures/grantFixture";
import {directionsConstTableName, parserDb} from "./config";
import {DirectionsOperations} from "../../src/API/sqlite/DirectionsOperations";
import {DirectionsConstOperations} from "../../src/API/sqlite/DirectionsConstOperations";


let grantsOperations: IGrantsOperations
let randomGrant:TGrant

describe("GrantsOperations",()=>{
    beforeEach(()=>{
        randomGrant = grantFixture()
    })

    test("Init object",()=>{
        // На всякий случай запустим обьекты чтобы они создали зависимые таблицы
        let directionsConstOperations = new DirectionsConstOperations(parserDb,directionsConstTableName)
        let directionsOperations = new DirectionsOperations(parserDb, directionsTableName, directionsConstOperations)

        grantsOperations = new GrantOperations(
            parserDb,
            grantsTableName,
            directionsOperations
        )
    })

    describe("Create and get grant", ()=>{
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