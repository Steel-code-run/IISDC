import {TGrant} from "@iisdc/types";

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
}

export const toNormalGrant = (obj:any) => {
    let normalObject: any = {}
    for (let key in normalGrant) {
        if ((obj[key] === null) || (obj[key] === undefined)) normalObject[key] = ""
        else normalObject[key] = obj[key]
    }
    normalObject.timeOfParse = new Date().getTime()
    return normalObject as TGrant;
}

