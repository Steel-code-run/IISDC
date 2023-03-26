import {sampleRange} from "../../src/utils/samleRange";
import {TCompetition} from "@iisdc/types";
import sampleArray from "../../src/utils/sampleArray";

export function competitionFixture():TCompetition{
    return {
        organization: sampleRange(0,100).toString()+"a",
        direction: [],
        link: sampleRange(0,100).toString() +"a",
        fullText: sampleRange(0,100).toString()+"a",
        id: sampleRange(0,100),
        timeOfParse: new Date().getTime(),
        dateCreationPost: sampleRange(0,100).toString()+"a",
        namePost: sampleRange(0,100).toString()+"a",
        linkPDF: sampleRange(0,100).toString()+"a",
        deadline: sampleRange(0,100).toString()+"a",
        sourceLink: sampleRange(0,100).toString()+"a",
    }
}