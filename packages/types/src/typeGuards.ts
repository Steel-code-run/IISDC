import {TParserResult, TPost, TPostType} from './serial/parser';

export const isTPost = (post: any): post is TPost<any> =>
	isTPostType(post.postType) && typeof post.postDescription === 'object';

export const isTPostType = (postType: any): postType is TPostType =>
	Object.values(TPostType).includes(postType as TPostType);

export const isTParserResult = (parserResult: any): parserResult is TParserResult =>{
	return isTPost(parserResult[0]);
}