import {sampleRange} from "../../src/utils/samleRange";
import {TInternship, TVacancy} from "@iisdc/types";

export function vacancyFixture():TVacancy{
    return {
        organization: sampleRange(0,100).toString()+"a",
        salary: sampleRange(0,100).toString()+"a",
        conditions: sampleRange(0,100).toString()+"a",
        responsibilities: sampleRange(0,100).toString()+"a",
        requirements: sampleRange(0,100).toString()+"a",
        link: sampleRange(0,100).toString() +"a",
        fullText: sampleRange(0,100).toString()+"a",
        id: sampleRange(0,100),
        timeOfParse: new Date().getTime(),
        dateCreationPost: sampleRange(0,100).toString()+"a",
        namePost: sampleRange(0,100).toString()+"a",
        sourceLink: sampleRange(0,100).toString()+"a",
    }
}