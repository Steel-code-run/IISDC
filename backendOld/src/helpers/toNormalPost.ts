import {TCompetition, TGrant, TInternship, TVacancy} from "@iisdc/types";

const normalCompetition:TCompetition = {
    namePost: "",
    dateCreationPost: "",
    deadline: "",
    direction: "",
    fullText: "",
    linkPDF: "",
    link: "",
    organization: "",
    timeOfParse: 0,
    sourceLink: ""
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
    timeOfParse: 0,
    sourceLink: ""
}

const normalVacancy:TVacancy = {
    namePost: "",
    dateCreationPost: "",
    fullText: "",
    link: "",
    timeOfParse: 0,
    direction: "",
    organization: "",
    salary: "",
    requirements: "",
    responsibilities: "",
    conditions: "",
    sourceLink: ""
}

const normalInternship:TInternship = {
    namePost: "",
    dateCreationPost: "",
    fullText: "",
    link: "",
    timeOfParse: 0,
    direction: "",
    organization: "",
    salary: "",
    requirements: "",
    responsibilities: "",
    conditions: "",
    sourceLink: "",
}

export const toNormalGrant = (obj:any) => {
    return toNormalPost(obj,normalGrant)
}

export const toNormalCompetition = (obj:any) => {
    return toNormalPost(obj,normalCompetition)
}

export const toNormalVacancy = (obj: any) => {
    return toNormalPost(obj, normalVacancy)
}

export const toNormalInternship = (obj:any) =>{
    return toNormalPost(obj, normalInternship)
}

const toNormalPost = <T extends TGrant|TCompetition|TVacancy|TInternship>(obj:any,normalObject:T) => {
    let newObject: any = {}
    for (let key in normalObject) {
        if ((obj[key] === null) || (obj[key] === undefined)) newObject[key] = ""
        else newObject[key] = obj[key]
    }
    if (Array.isArray(obj.linkPDF))
        newObject.linkPDF = JSON.stringify(obj.linkPDF)

    let date = new Date(newObject.dateCreationPost).toLocaleDateString('ru')

    if (date !== 'Invalid Date') {
        newObject.dateCreationPost = date
    }
    return newObject as T;
}