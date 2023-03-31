import {TTypesUpdateData} from "../types/types";
import {TPostType} from "@iisdc/types";
import {isUpdateDataCompetition, isUpdateDataGrant, isUpdateDataInternship} from "../types/typeGuards";

export const initialValuesUpdateData = (postType: TPostType, data: TTypesUpdateData) => {
    if (isUpdateDataGrant(postType, data)) {
        return {
            id: data.id,
            organization: data.organization,
            direction: data.direction,
            directionForSpent: data.directionForSpent,
            dateCreationPost: data.dateCreationPost,
            deadline: data.deadline,
            summary: data.summary,
            fullText: data.fullText,
        }
    } else if (isUpdateDataCompetition(postType, data)) {
        return {
            id: data.id,
            organization: data.organization,
            direction: data.direction,
            dateCreationPost: data.dateCreationPost,
            deadline: data.deadline,
            fullText: data.fullText,
        }
    }
    else if(isUpdateDataInternship(postType, data)) {
        return {
            id: data.id,
            requirements: data.requirements,
            responsibilities: data.responsibilities,
            conditions: data.conditions,
            salary: data.salary,
            fullText: data.fullText,
            dateCreationPost: data.dateCreationPost,
            organization: data.organization
        }
    }
}