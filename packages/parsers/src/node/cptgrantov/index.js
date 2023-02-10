import {getPostsChannel} from "./getPostsChannel.js";
import {defineTypeDescriptionTelegram, defineTypePost, getNamePost} from "../../utils/methodsParser.js";

const options = {
	nameUrl: 'https://t.me/cptgrantov',
	limit: 15,
	offset: 0,
};

const keyWords = ['гранты', 'грант', 'гранту', 'грантам', 'грантом', 'гранте'];
const exceptionWords = [
	'вебинар',
	'вебинара',
	'вебинару',
	'вебинар',
	'вебинаром',
	'вебинаре',
	'вебинары',
	'вебинаров',
	'вебинарам',
	'вебинары',
	'вебинарами',
	'вебинарах',
	'Традиционная образовательная подборка: ',
];

const isFilterPosts = (posts) => {
	return posts
		.filter((post) => post.postType !== 'other')
		.filter((post) => {
			return keyWords.some((keyWord) => {
				return post.postDescription.fullText.toLowerCase().includes(keyWord.toLowerCase());
			});
		})
		.filter((post) => {
			return exceptionWords.every((exceptionWord) => {
				return !post.postDescription.fullText
					.toLowerCase()
					.includes(exceptionWord.toLowerCase());
			});
		});
};


const getInfoPost = (data) => {
	return data.map((post) => {
		const typePost = defineTypePost(getNamePost(post));
		return defineTypeDescriptionTelegram(typePost, post, options.nameUrl + '/' + post.id);


	});
}

getPostsChannel(options)
	.then((data) => {
		const receivedPosts = getInfoPost(data);
		const filterPosts = isFilterPosts(receivedPosts);
		console.log(filterPosts);

	})
	.catch((err) => {
		console.log(err);
	});
