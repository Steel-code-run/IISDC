import {callParser} from "../index";
import {TParserCallParams, TParserResult} from "@iisdc/types";
import {parserCallParamsFixture} from "./fixtures/parserCallParams";
import { beforeEach, describe, expect, jest, test } from '@jest/globals';

const parserFileUrl = "RSCI"

let parserCallParams = parserCallParamsFixture(parserFileUrl)
let dataPromise:  Promise<TParserResult>;
let dataFromPage2Promise:  Promise<TParserResult>;

describe(parserFileUrl,()=>{
    beforeAll(()=>{
        dataPromise = callParser(parserCallParams)
        dataFromPage2Promise = callParser({...parserCallParams, page: 2})
    })

    test(":: have some posts",()=>{
        return dataPromise.then(data=>{
            expect(data.length).toBeGreaterThan(0)
        })
    })

    test(":: all posts contains postType", ()=>{
        return dataPromise.then(data=>{
            let res = true;
            data.forEach((el)=>{
                if (el.postType.length < 1)
                    res = false
            })
            expect(res).toBe(true)
        })
    })

    test(":: all posts contains namePost", ()=>{
        return dataPromise.then(data=>{
            let res = true;
            data.forEach((el)=>{
                if (el.postDescription.namePost.length < 1)
                    res = false
            })
            expect(res).toBe(true)
        })

    })

    test(":: all posts contains link", ()=>{
        return dataPromise.then(data=>{
            let res = true;
            data.forEach((el)=>{
                if (el.postDescription.link.length < 1)
                    res = false
            })
            expect(res).toBe(true)
        })
    })

    test(":: page 2 started with new posts", ()=>{
        return dataPromise.then(data=>{
            return dataFromPage2Promise.then(dataFromPage2=>{
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
    })

})