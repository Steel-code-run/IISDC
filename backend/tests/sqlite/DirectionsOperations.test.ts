import {describe,test, expect,beforeAll,beforeEach} from '@jest/globals';
import {DirectionsConstOperations, IDirectionsConstOperations} from "../../src/API/sqlite/DirectionsConstOperations";
import {parserDb} from "./config";
import {sampleRange} from "../../src/utils/samleRange";
import {DirectionsOperations, IDirectionsOperations} from "../../src/API/sqlite/DirectionsOperations";
import {GrantOperations, IGrantsOperations} from "../../src/API/sqlite/parser/GrantsOperations";
import {grantFixture} from "../fixtures/grantFixture";
import {directionsConstTableName, directionsTableName, grantsTableName} from "../../src/API/sqlite/config";

let directionsConstOperations: IDirectionsConstOperations
let directionsOperations: IDirectionsOperations
let grantsOperations: IGrantsOperations
let id;
let testDirectionName = sampleRange(0,100000)+' - test'
describe("DirectionsOperations",()=>{

    test("Init object",()=>{
        directionsConstOperations = new DirectionsConstOperations(parserDb,directionsConstTableName)
        directionsOperations = new DirectionsOperations(parserDb,directionsTableName, directionsConstOperations)
        grantsOperations = new GrantOperations(parserDb,grantsTableName, directionsOperations)
    })

    describe("Testing const", ()=>{
        test("create direction",()=>{
            id = directionsConstOperations.insertConst(testDirectionName)
        })

        test("get created direction", ()=>{
            expect(directionsConstOperations.getAll().includes(testDirectionName)).toBeTruthy()
        })

        test("get id direction",()=>{
            expect(directionsConstOperations.getIdByName(testDirectionName)).toBeGreaterThan(0)
        })

        test("remove direction", ()=>{
            directionsConstOperations.removeConst(testDirectionName)
        })

        test("get deleted direction", ()=>{
            expect(directionsConstOperations.getAll().includes(testDirectionName)).toBeFalsy()
        })
    })

    describe("Testing work",()=>{
        test("Попытка добавить без константы в бд",()=>{
            let grant = grantFixture();
            grant.direction = []
            let grantId = grantsOperations.insertGrant(grant)
            expect(()=>directionsOperations.insertDirection({
                direction:Math.random() + "s",
                parentID:grantId,
                tableNamePost: grantsTableName
            })).toThrow()
        })
        test("Попытка добавить c константой в бд",()=>{
            let grant = grantFixture();
            grant.direction = []
            let grantId = grantsOperations.insertGrant(grant)
            testDirectionName = Math.random()+"s"
            directionsConstOperations.insertConst(testDirectionName)
            console.log(directionsConstOperations.getIdByName(testDirectionName));

            expect(directionsOperations.insertDirection({
                direction: testDirectionName,
                parentID:grantId,
                tableNamePost: grantsTableName
            })).toBeGreaterThan(0)

            directionsConstOperations.removeConst(testDirectionName)
        })

        test("После удаления не должно остаться константы, а также direction",()=>{
            expect(directionsConstOperations.getIdByName(testDirectionName)).toBeUndefined()
        })
    })



})