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
    for (let key in normalGrant) {
        if ((obj[key] === null) || (obj[key] === undefined)) obj[key] = ""
    }
    obj.timeOfParse = new Date().getTime()
    return obj;
}

