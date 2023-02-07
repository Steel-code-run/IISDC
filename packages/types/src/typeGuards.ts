import {TParserResult, TPost, TPostType} from './serial/parser';

export const isTPost = (post: any): post is TPost<any> =>
	isTPostType(post.postType) && typeof post.postDescription === 'object';
export const isTPostType = (postType: any): postType is TPostType =>
	Object.values(TPostType).includes(postType as TPostType);
export const isTParserResult = (parserResult: any): parserResult is TParserResult =>{
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
