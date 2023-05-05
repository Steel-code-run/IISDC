import {TCompetition, TGrant, TInternship, TParserResult, TPost, TPostType, TVacancy} from "./serial/parser";
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



export const isTPost = (post: any): post is TPost<any> =>
    isTPostType(post.postType) && typeof post.postDescription === 'object';
export const isTPostType = (postType: any): postType is TPostType =>
    Object.values(TPostType).includes(postType as TPostType);
export const isTParserResult = (parserResult: any): parserResult is TParserResult =>{
    if (parserResult.length === 0)
        return true
    return isTPost(parserResult[0]);
}
export const isGrantPost = (post: TPost<any>): post is TPost<TPostType.grant> =>
    post.postType === TPostType.grant;
export const isVacancyPost = (post: TPost<any>): post is TPost<TPostType.vacancy> =>
    post.postType === TPostType.vacancy;
export const isInternshipPost = (post: TPost<any>): post is TPost<TPostType.internship> =>
    post.postType === TPostType.internship;
export const isCompetitionPost = (post: TPost<any>): post is TPost<TPostType.competition> =>
    post.postType === TPostType.competition;
