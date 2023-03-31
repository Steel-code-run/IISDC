import {TPostType} from "@iisdc/types";
import {isPropsCompetition, isPropsGrant, isUpdateDataCompetition, isUpdateDataGrant} from "../../types/typeGuards";
import {TTypesOfPosts, TTypesUpdateData} from "../../types/types";
import {useUpdatePostGrantMutation} from "../../api/grants.api";
import {useUpdateCompetitionsMutation} from "../../api/competitions.api";
import {useState} from "react";
import {useUpdatePostInternshipMutation} from "../../api/internships.api";

export const useUniversalUpdateHook = (typePost: TPostType, propsPost: TTypesOfPosts) => {
    if(isPropsGrant(typePost, propsPost)) {
        return useUpdatePostGrantMutation
    }
    else if(isPropsCompetition(typePost, propsPost)) {
        return useUpdateCompetitionsMutation
    }
    else {
        return useUpdatePostInternshipMutation
    }
}

export const useUpdateData = (typePost: TPostType, data: TTypesUpdateData) => {
    if(isUpdateDataGrant(typePost, data)) {
        return useState<TTypesUpdateData>
    }
    else if(isUpdateDataCompetition(typePost, data)) {
        return useState<TTypesUpdateData>
    }
    else {
        return useState<TTypesUpdateData>
    }
}