import {afterAll, beforeEach, describe, expect, test} from '@jest/globals';
import {TCompetition} from "@iisdc/types";
import {
    competitionsTableName,
    directionsConstTableName,
    directionsTableName,
    grantsTableName
} from "../../src/API/sqlite/config";
import {GrantsOperations, IGrantsOperations} from "../../src/API/sqlite/parser/GrantsOperations";

import {DirectionsOperations, IDirectionsOperations} from "../../src/API/sqlite/DirectionsOperations";
import {DirectionsConstOperations} from "../../src/API/sqlite/DirectionsConstOperations";
import path from "path";
import {__projectPath} from "../../src/utils/projectPath";
import {CompetitionOperations, ICompetitionOperations} from "../../src/API/sqlite/parser/CompetitionsOperation";
import {competitionFixture} from "../fixtures/competitionFixture";


let competitionOperations: ICompetitionOperations
let directionsConstOperations: DirectionsConstOperations
let randomPost:TCompetition
let parserDb = require('better-sqlite3')(path.join(__projectPath, '../','tests','testingSqlite','CompetitionsOperations-parser.db'));

describe("CompetitionOperations",()=>{
    beforeEach(()=>{
        randomPost = competitionFixture()
    })
    afterAll(()=>{
        directionsConstOperations.removeConst("direction1")
        directionsConstOperations.removeConst("direction2")
        directionsConstOperations.removeConst("direction3")
        directionsConstOperations.removeConst("direction4")
        directionsConstOperations.removeConst("direction5")
    })

    test("Init object and delete all",()=>{
        directionsConstOperations = new DirectionsConstOperations(parserDb,directionsConstTableName)
        let directionsOperations = new DirectionsOperations(parserDb, directionsTableName, directionsConstOperations)
        new CompetitionOperations(parserDb, competitionsTableName,directionsOperations)
        new GrantsOperations(parserDb, grantsTableName,directionsOperations)

        competitionOperations = new CompetitionOperations(
            parserDb,
            competitionsTableName,
            directionsOperations
        )
        competitionOperations.deleteAll()
    })

    describe("Create and get post", ()=>{
        let post:TCompetition;

        test("Create directionsConst",()=>{
            directionsConstOperations.insertConst("direction1")
            directionsConstOperations.insertConst("direction2")
            directionsConstOperations.insertConst("direction3")
            directionsConstOperations.insertConst("direction4")
            directionsConstOperations.insertConst("direction5")
        })
        test("Create post", ()=>{
            randomPost.direction = ["direction1","direction2"]
            randomPost.namePost="d12"
            let newGrantId = competitionOperations.insert(randomPost)
            post = randomPost
            post.id = newGrantId

            expect(typeof newGrantId).toMatch('number')
        })

        test("Get post",()=>{
            if (!post.id)
                throw new Error("grant.id not defined")

            expect(competitionOperations.get(post.id)).toMatchObject(post)
        })

        test("add post",()=>{
            randomPost.direction = ["direction2"]
            randomPost.namePost="d2"
            let newGrantId = competitionOperations.insert(randomPost)
            post = randomPost
            post.id = newGrantId

            expect(typeof newGrantId).toMatch('number')
        })

        test("add post",()=>{
            randomPost.direction = ["direction2", "direction3"]
            randomPost.namePost="d23"
            let newGrantId = competitionOperations.insert(randomPost)
            post = randomPost
            post.id = newGrantId

            expect(typeof newGrantId).toMatch('number')
        })

        test("get post without directions",()=>{

            expect(competitionOperations.getPosts({
                namePost:""
            }).length).toBe(3)
        })

        test("get post without directions",()=>{

            expect(competitionOperations.getPosts({
                namePost:"3"
            }).length).toBe(1)
        })

        test("get post with directions 1 ",()=>{

            expect(competitionOperations.getPosts({
                directions:["direction3"],
                namePost:""
            }).length).toBe(1)
        })

        test("get post with directions 2",()=>{

            expect(competitionOperations.getPosts({
                directions:["direction2"],
                namePost:""
            }).length).toBe(3)
        })

        test("get post with directions 3",()=>{

            expect(competitionOperations.getPosts({
                directions:["direction2"],
                namePost:""
            }).length).toBe(3)
        })


        test("get post",()=>{
            let post = competitionFixture()
            post.namePost = "aaaaaaaaaaaaaaaaaaaaaaaaa"
            post.id = competitionOperations.insert(post)
            let expectedGrant = competitionOperations.getPosts({
                namePost:"aaaaaaaaaaaaaaaaaaaaaaaaa"
            })[0]
            expect(expectedGrant).toMatchObject(post)

        })

        test("get no post",()=>{

            expect(competitionOperations.getPosts({
                directions:["direction2as"],
                namePost:"3asfasfas"
            }).length).toBe(0)
        })

        test("BlackList test 1",()=>{
            post = competitionFixture()
            post.namePost +=" testing BlackList"
            post.id = competitionOperations.insert(post)

            competitionOperations.setPostToBlackList(post.id)

            expect(competitionOperations.getPosts({
                namePost: post.namePost,
                blackListed: 0,
            }).length).toBe(0)
        })

        test("BlackList test 1",()=>{

            if (!post.id)
                throw new Error("grant id undefined")

            competitionOperations.removeFromBlackList(post.id)

            expect(competitionOperations.getPosts({
                namePost: post.namePost,
                blackListed: 0,
            }).length).toBe(1)
        })

        test("Update post",()=>{
            if (!post.id)
                throw new Error("grant id undefined")

            let newPost = competitionFixture()
            newPost.id = post.id
            competitionOperations.update(newPost)

            let updatedPost = competitionOperations.get(post.id)

            if (!updatedPost)
                throw new Error("не был получен грант")

            updatedPost.id = newPost.id
            updatedPost.namePost = newPost.namePost
            updatedPost.sourceLink = newPost.sourceLink
            updatedPost.timeOfParse = newPost.timeOfParse
            expect(updatedPost).toMatchObject(newPost)
        })

        test("Delete post",()=>{
            if (!post.id)
                throw new Error("grant.id not defined")

            competitionOperations.deletePost(post.id)
            expect(competitionOperations.get(post.id)).toBeUndefined()

        })

        let post1 = competitionFixture()
        let post2 = competitionFixture()
        let post3 = competitionFixture()
        let post4 = competitionFixture()
        let post5 = competitionFixture()

        test("add 5 post",()=>{
            post1.id = competitionOperations.insert(post1)
            post2.id = competitionOperations.insert(post2)
            post3.id = competitionOperations.insert(post3)
            post4.id = competitionOperations.insert(post4)
            post5.id = competitionOperations.insert(post5)
        })

        test("get limited last 2 post",()=>{
            expect(competitionOperations.getPosts({
                limit:2,
            })).toMatchObject([post5, post4])
        })

        test("get limited last 2 from 2 post",()=>{
            expect(competitionOperations.getPosts({
                from: 2,
                limit:2,
            })).toMatchObject([post3, post2])
        })

        test("COUNT", ()=>{

            expect(competitionOperations.getPosts({
                justCountIt: true
            })).toBe(9)

            competitionOperations.deleteAll()

            expect(competitionOperations.getPosts({
                justCountIt: true
            })).toBe(0)
        })
    })
})