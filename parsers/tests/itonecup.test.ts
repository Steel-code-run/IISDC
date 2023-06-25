import {callParser} from "../src";
import {parserCallParamsFixture} from "./fixtures/parserCallParams";
import {describe, expect, test} from '@jest/globals';
import {isCompetitionPost, isGrantPost, TParserResult, TPostType} from "../src/types";

const parserFileUrl = "itonecup"

let parserCallParams = parserCallParamsFixture(parserFileUrl)
let data:  TParserResult;

describe(parserFileUrl,()=>{

    test(":: have connection with parser", ()=>{
        async function getPosts(){
            data = await callParser(parserCallParams)
            return true
        }

        return getPosts().then((r)=>{
            expect(r).toBe(true)
        })
    }, 100000)

    test(":: have some posts",()=>{
        expect(data.length).toBeGreaterThan(0)
    })
    test(":: posts contains deadline", ()=>{
        let hasDeadline = data.some((el)=>{
            if(isGrantPost(el) || isCompetitionPost(el) ){

                return el?.postDescription?.deadline
            }
        })
        expect(true).toBe(hasDeadline)
    })

    test(":: all posts contains postType", ()=>{
        let res = true;
        data.forEach((el)=>{
            if (el.postType.length < 1)
                res = false
        })
        expect(res).toBe(true)
    })

    test(":: all posts contains namePost", ()=>{
        let res = true;
        data.forEach((el)=>{
            if (el.postDescription.namePost.length < 1)
                res = false
        })
        expect(res).toBe(true)
    })

    test(":: all posts contains link", ()=>{
        let res = true;

        data.forEach((el)=>{
            if((el.postType === TPostType.grant || el.postType === TPostType.competition) && el.postDescription.link.length < 1)
                res = false
        })
        expect(res).toBe(true)
    })

})