import {TCompetition, TGrant, TInternship, TPostType} from "@iisdc/types";
import {TTypesOfPosts} from "./types";

export const isPropsGrant = (typePost: TPostType, typeProps: TTypesOfPosts): typeProps is TGrant =>
    typePost === TPostType.grant
export const isPropsCompetition = (typePost: TPostType, typeProps: TTypesOfPosts): typeProps is TCompetition =>
    typePost === TPostType.competition
export const isPropsInternship = (typePost: TPostType, typeProps: TTypesOfPosts): typeProps is TInternship =>
    typePost === TPostType.internship