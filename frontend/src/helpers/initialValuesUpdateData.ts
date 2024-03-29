import {TTypesUpdateData} from "../types/types";
import {TPostType} from "../types/serial/parser";
import {isUpdateDataCompetition, isUpdateDataGrant} from "../types/typeGuards";

export const initialValuesUpdateData = (postType: TPostType, data: TTypesUpdateData<TPostType>) => {
    if (isUpdateDataGrant(postType, data)) {
        return {
            id: data.id,
            organization: data.organization,
            directions: JSON.stringify(data.directions),
            directionForSpent: data.directionForSpent,
            dateCreationPost: data.dateCreationPost,
            deadline: data.deadline,
            summary: data.summary,
            fullText: data.fullText,
            link: data.link,
            linkPDF: data.linkPDF
        }
    } else if (isUpdateDataCompetition(postType, data)) {
        return {
            id: data.id,
            organization: data.organization,
            directions: JSON.stringify(data.directions),
            dateCreationPost: data.dateCreationPost,
            deadline: data.deadline,
            fullText: data.fullText,
            link: data.link,
            linkPDF: data.linkPDF
        }
    }
    else {
        return {
            id: data.id,
            requirements: data.requirements,
            responsibilities: data.responsibilities,
            conditions: data.conditions,
            salary: data.salary,
            fullText: data.fullText,
            dateCreationPost: data.dateCreationPost,
            organization: data.organization,
            link: data.link,
        }
    }

}