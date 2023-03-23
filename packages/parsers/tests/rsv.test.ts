import {callParser} from "../index";
import {TParserResult} from "@iisdc/types";
import {parserCallParamsFixture} from "./fixtures/parserCallParams";
import {describe, expect, test} from '@jest/globals';

const parserFileUrl = "rsv"

let parserCallParams = parserCallParamsFixture(parserFileUrl)
let data:  TParserResult;
let dataFromPage2:  TParserResult;

describe(parserFileUrl,()=>{

    test(":: have connection with parser", ()=>{
        async function getPosts(){
            data = await callParser(parserCallParams)
            return true
        }

        return getPosts().then((r)=>{
            expect(r).toBe(true)
        })
    }, 60000)

    test(":: have some posts",()=>{
        expect(data.length).toBeGreaterThan(0)
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
            if (el.postDescription.link.length < 1)
                res = false
        })
        expect(res).toBe(true)
    })

})