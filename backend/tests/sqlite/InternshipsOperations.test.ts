import {afterAll, beforeEach, describe, expect, test} from '@jest/globals';
import {TCompetition, TInternship} from "@iisdc/types";
import {
    competitionsTableName,
    directionsConstTableName,
    directionsTableName,
    grantsTableName, internshipsTableName
} from "../../src/API/sqlite/config";
import {GrantsOperations, IGrantsOperations} from "../../src/API/sqlite/parser/GrantsOperations";

import {DirectionsOperations, IDirectionsOperations} from "../../src/API/sqlite/DirectionsOperations";
import {DirectionsConstOperations} from "../../src/API/sqlite/DirectionsConstOperations";
import path from "path";
import {__projectPath} from "../../src/utils/projectPath";
import {CompetitionOperations, ICompetitionOperations} from "../../src/API/sqlite/parser/CompetitionsOperation";
import {competitionFixture} from "../fixtures/competitionFixture";
import {IInternshipOperations, InternshipOperations} from "../../src/API/sqlite/parser/InternshipsOperations";
import {internshipFixture} from "../fixtures/internshipFixture";


let internshipsOperations: IInternshipOperations
let randomPost:TInternship
let parserDb = require('better-sqlite3')(path.join(__projectPath, '../','tests','testingSqlite','InternshipsOperations-parser.db'));

describe("CompetitionOperations",()=>{
    beforeEach(()=>{
        randomPost = internshipFixture()
    })

    test("Init object and delete all",()=>{

        internshipsOperations = new InternshipOperations(
            parserDb,
            internshipsTableName,
        )
        internshipsOperations.deleteAll()
    })

    describe("Create and get post", ()=>{
        let post:TInternship;


        test("Create post", ()=>{

            let newPostId = internshipsOperations.insert(randomPost)
            post = randomPost
            post.id = newPostId

            expect(typeof newPostId).toMatch('number')
        })

        test("Get post",()=>{
            if (!post.id)
                throw new Error("post.id not defined")

            expect(internshipsOperations.get(post.id)).toMatchObject(post)
        })

        test("add post",()=>{
            let newPostId = internshipsOperations.insert(randomPost)
            post = randomPost
            post.id = newPostId

            expect(typeof newPostId).toMatch('number')
        })

        test("add post",()=>{
            let newPostId = internshipsOperations.insert(randomPost)
            post = randomPost
            post.id = newPostId

            expect(typeof newPostId).toMatch('number')
        })



        test("get post",()=>{
            let post = internshipFixture()
            post.namePost = "aaaaaaaaaaaaaaaaaaaaaaaaa"
            post.id = internshipsOperations.insert(post)
            let expectedPost = internshipsOperations.getPosts({
                namePost:"aaaaaaaaaaaaaaaaaaaaaaaaa"
            })[0]
            expect(expectedPost).toMatchObject(post)

        })

        test("get no post",()=>{

            expect(internshipsOperations.getPosts({
                namePost:"3asfasfas"
            }).length).toBe(0)
        })

        test("BlackList test 1",()=>{
            post = internshipFixture()
            post.namePost +=" testing BlackList"
            post.id = internshipsOperations.insert(post)

            internshipsOperations.setPostToBlackList(post.id)

            expect(internshipsOperations.getPosts({
                namePost: post.namePost,
                blackListed: 0,
            }).length).toBe(0)
        })

        test("BlackList test 2",()=>{

            if (!post.id)
                throw new Error("grant id undefined")

            internshipsOperations.removeFromBlackList(post.id)

            expect(internshipsOperations.getPosts({
                namePost: post.namePost,
                blackListed: 0,
            }).length).toBe(1)
        })

        test("Update post",()=>{
            if (!post.id)
                throw new Error("grant id undefined")

            let newPost = internshipFixture()
            newPost.id = post.id
            internshipsOperations.update(newPost)

            let updatedPost = internshipsOperations.get(post.id)

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

            internshipsOperations.deletePost(post.id)
            expect(internshipsOperations.get(post.id)).toBeUndefined()

        })

        let post1 = internshipFixture()
        let post2 = internshipFixture()
        let post3 = internshipFixture()
        let post4 = internshipFixture()
        let post5 = internshipFixture()

        test("add 5 post",()=>{
            post1.id = internshipsOperations.insert(post1)
            post2.id = internshipsOperations.insert(post2)
            post3.id = internshipsOperations.insert(post3)
            post4.id = internshipsOperations.insert(post4)
            post5.id = internshipsOperations.insert(post5)
        })

        test("get limited last 2 post",()=>{
            expect(internshipsOperations.getPosts({
                limit:2,
            })).toMatchObject([post5, post4])
        })

        test("get limited last 2 from 2 post",()=>{
            expect(internshipsOperations.getPosts({
                from: 2,
                limit:2,
            })).toMatchObject([post3, post2])
        })

        test("COUNT", ()=>{

            expect(internshipsOperations.getPosts({
                justCountIt: true
            })).toBe(9)

            internshipsOperations.deleteAll()

            expect(internshipsOperations.getPosts({
                justCountIt: true
            })).toBe(0)
        })
    })
})