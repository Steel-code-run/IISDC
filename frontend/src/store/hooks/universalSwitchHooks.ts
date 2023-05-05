import {TPostType} from "../../types/serial/parser";
import {isPropsCompetition, isPropsGrant} from "../../types/typeGuards";
import {TTypesOfPosts} from "../../types/types";
import {useDeletePostGrantMutation, useUpdatePostGrantMutation} from "../../api/grants.api";
import {useDeletePostCompetitionMutation, useUpdateCompetitionsMutation} from "../../api/competitions.api";
import {useDeletePostInternshipMutation, useUpdatePostInternshipMutation} from "../../api/internships.api";

export const useUniversalUpdateSwitchHook = (typePost: TPostType, propsPost: TTypesOfPosts) => {
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

export const useUniversalDeleteSwitchHook = (typePost: TPostType, propsPost: TTypesOfPosts) => {
    if(isPropsGrant(typePost, propsPost)) {
        return useDeletePostGrantMutation
    }
    else if(isPropsCompetition(typePost, propsPost)) {
        return useDeletePostCompetitionMutation
    }
    else {
        return useDeletePostInternshipMutation
    }
}
