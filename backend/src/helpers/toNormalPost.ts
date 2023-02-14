import {TCompetition, TInternship, TVacancy} from "@iisdc/types";
import {TGrant} from "@iisdc/types";

const competition:TCompetition = {
    namePost: "",
    dateCreationPost: "",
    deadline: "",
    direction: "",
    fullText: "",
    link: "",
    organization: "",
    timeOfParse: 0
}

const normalGrant:TGrant = {
    namePost: "",
    linkPDF: "",
    dateCreationPost: "",
    deadline: "",
    direction: "",
    fullText: "",
    link: "",
    organization: "",
    summary: "",
    directionForSpent: "",
    timeOfParse: 0
}

export const toNormalGrant = (obj:any) => {
    return toNormalPost(obj,normalGrant)
}

export const toNormalCompetition = (obj:any) => {
    return toNormalPost(obj,competition)
}

const toNormalPost = <T extends TGrant|TCompetition|TVacancy|TInternship>(obj:any,normalObject:T) => {
    let newObject: any = {}
    for (let key in normalObject) {
        if ((obj[key] === null) || (obj[key] === undefined)) newObject[key] = ""
        else newObject[key] = obj[key]
    }
    newObject.timeOfParse = new Date().getTime()
    return newObject as T;
}