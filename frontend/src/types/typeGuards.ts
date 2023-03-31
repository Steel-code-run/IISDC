import {TCompetition, TGrant, TInternship, TPostType, TVacancy} from "@iisdc/types";
import {
    IUpdateDataCompetition,
    IUpdateDataGrant,
    IUpdateDataInternship,
    IUpdateDataVacancy,
    TTypesOfPosts,
    TTypesUpdateData
} from "./types";

export const isPropsGrant = (typePost: TPostType, typeProps: TTypesOfPosts): typeProps is TGrant =>
    typePost === TPostType.grant
export const isUpdateDataGrant = (typePost: TPostType, typeProps: TTypesUpdateData): typeProps is IUpdateDataGrant =>
    typePost === TPostType.grant

export const isPropsCompetition = (typePost: TPostType, typeProps: TTypesOfPosts): typeProps is TCompetition =>
    typePost === TPostType.competition
export const isUpdateDataCompetition = (typePost: TPostType, typeProps: TTypesUpdateData): typeProps is IUpdateDataCompetition=>
    typePost === TPostType.competition

export const isPropsInternship = (typePost: TPostType, typeProps: TTypesOfPosts): typeProps is TInternship =>
    typePost === TPostType.internship
export const isUpdateDataInternship = (typePost: TPostType, typeProps: TTypesUpdateData): typeProps is IUpdateDataInternship =>
    typePost === TPostType.internship

export const isPropsVacancy = (typePost: TPostType, typeProps: TTypesOfPosts): typeProps is TVacancy =>
    typePost === TPostType.vacancy
export const isUpdateDataVacancy = (typePost: TPostType, typeProps: TTypesUpdateData): typeProps is IUpdateDataVacancy =>
    typePost === TPostType.vacancy