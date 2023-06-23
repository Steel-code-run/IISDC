import {callParser} from "../src";
import {TParserResult} from "../src/types";
import {parserCallParamsFixture} from "./fixtures/parserCallParams";
import {describe, expect, test} from '@jest/globals';

const parserFileUrl = "sowa-ru"

let parserCallParams = parserCallParamsFixture(parserFileUrl)
let data:  TParserResult;
let dataFromPage2:  TParserResult;

describe(parserFileUrl,()=>{

    test(":: have connection with parser", ()=>{
        async function getPosts(){
            data = await callParser(parserCallParams)
            dataFromPage2 = await callParser({...parserCallParams, page: 2})
            return true
        }

        return getPosts().then((r)=>{
            expect(r).toBe(true)
        })
    }, 100000)

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

    test(":: page 2 started with new posts", ()=>{
        let res = true;
        data.forEach((el,index)=>{
            if (!dataFromPage2[index])
                return

            if ((dataFromPage2[index].postDescription.namePost ===
                data[index].postDescription.namePost) && (dataFromPage2[index].postDescription.link ===
                data[index].postDescription.link))
                res = false
        })
        expect(res).toBe(true)
    })

})