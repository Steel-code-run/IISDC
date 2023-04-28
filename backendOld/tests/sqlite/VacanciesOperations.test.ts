import {afterAll, beforeEach, describe, expect, test} from '@jest/globals';
import {TCompetition, TVacancy} from "@iisdc/types";
import {
    competitionsTableName,
    directionsConstTableName,
    directionsTableName,
    internshipsTableName, vacanciesTableName
} from "../../src/API/sqlite/config";
import path from "path";
import {__projectPath} from "../../src/utils/projectPath";
import {IVacanciesOperations, VacanciesOperations} from "../../src/API/sqlite/parser/VacanciesOperations";
import {vacancyFixture} from "../fixtures/VacanciesFixture";


let vacanciesOperations: IVacanciesOperations
let randomPost:TVacancy
let parserDb = require('better-sqlite3')(path.join(__projectPath, '../','tests','testingSqlite','IVacanciesOperations-parser.db'));

describe("IVacanciesOperations",()=>{
    beforeEach(()=>{
        randomPost = vacancyFixture()
    })

    test("Init object and delete all",()=>{

        vacanciesOperations = new VacanciesOperations(
            parserDb,
            vacanciesTableName,
        )
        vacanciesOperations.deleteAll()
    })

    describe("Create and get post", ()=>{
        let post:TVacancy;


        test("Create post", ()=>{

            let newPostId = vacanciesOperations.insert(randomPost)
            post = randomPost
            post.id = newPostId

            expect(typeof newPostId).toMatch('number')
        })

        test("Get post",()=>{
            if (!post.id)
                throw new Error("post.id not defined")

            expect(vacanciesOperations.get(post.id)).toMatchObject(post)
        })

        test("add post",()=>{
            let newPostId = vacanciesOperations.insert(randomPost)
            post = randomPost
            post.id = newPostId

            expect(typeof newPostId).toMatch('number')
        })

        test("add post",()=>{
            let newPostId = vacanciesOperations.insert(randomPost)
            post = randomPost
            post.id = newPostId

            expect(typeof newPostId).toMatch('number')
        })



        test("get post",()=>{
            let post = vacancyFixture()
            post.namePost = "aaaaaaaaaaaaaaaaaaaaaaaaa"
            post.id = vacanciesOperations.insert(post)
            let expectedPost = vacanciesOperations.getPosts({
                namePost:"aaaaaaaaaaaaaaaaaaaaaaaaa"
            })[0]
            expect(expectedPost).toMatchObject(post)

        })

        test("get no post",()=>{

            expect(vacanciesOperations.getPosts({
                namePost:"3asfasfas"
            }).length).toBe(0)
        })

        test("BlackList test 1",()=>{
            post = vacancyFixture()
            post.namePost +=" testing BlackList"
            post.id = vacanciesOperations.insert(post)

            vacanciesOperations.setPostToBlackList(post.id)

            expect(vacanciesOperations.getPosts({
                namePost: post.namePost,
                blackListed: 0,
            }).length).toBe(0)
        })

        test("BlackList test 1",()=>{

            if (!post.id)
                throw new Error("post id undefined")

            vacanciesOperations.removeFromBlackList(post.id)

            expect(vacanciesOperations.getPosts({
                namePost: post.namePost,
                blackListed: 0,
            }).length).toBe(1)
        })

        test("Update post",()=>{
            if (!post.id)
                throw new Error("post id undefined")

            let newPost = vacancyFixture()
            newPost.id = post.id
            vacanciesOperations.update(newPost)

            let updatedPost = vacanciesOperations.get(post.id)

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
                throw new Error("post.id not defined")

            vacanciesOperations.deletePost(post.id)
            expect(vacanciesOperations.get(post.id)).toBeUndefined()

        })

        let post1 = vacancyFixture()
        let post2 = vacancyFixture()
        let post3 = vacancyFixture()
        let post4 = vacancyFixture()
        let post5 = vacancyFixture()

        test("add 5 post",()=>{
            post1.id = vacanciesOperations.insert(post1)
            post2.id = vacanciesOperations.insert(post2)
            post3.id = vacanciesOperations.insert(post3)
            post4.id = vacanciesOperations.insert(post4)
            post5.id = vacanciesOperations.insert(post5)
        })

        test("get limited last 2 post",()=>{
            expect(vacanciesOperations.getPosts({
                limit:2,
            })).toMatchObject([post5, post4])
        })

        test("get limited last 2 from 2 post",()=>{
            expect(vacanciesOperations.getPosts({
                from: 2,
                limit:2,
            })).toMatchObject([post3, post2])
        })

        test("COUNT", ()=>{

            expect(vacanciesOperations.getPosts({
                justCountIt: true
            })).toBe(9)

            vacanciesOperations.deleteAll()

            expect(vacanciesOperations.getPosts({
                justCountIt: true
            })).toBe(0)
        })
    })
})