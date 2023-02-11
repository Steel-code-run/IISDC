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
}

export const toNormalGrant = (obj:any) => {
    for (let key in normalGrant) {
        if ((obj[key] === null) || (obj[key] === undefined)) obj[key] = ""
    }
    return obj;
}

