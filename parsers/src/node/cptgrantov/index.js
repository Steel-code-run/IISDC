const {getPostsChannel} =  require("./getPostsChannel.js");
const {defineTypeDescriptionTelegram, defineTypePost, getNamePost} = require('../../utils/methodsParser.js');

const options = {
	nameUrl: 'https://t.me/cptgrantov',
	limit: 40,
	offset: 0,
};

const keyWords = ['гранты', 'грант', 'гранту', 'грантам', 'грантом', 'гранте',
	'конкурс', 'конкурсе', 'конкурсам', 'конкурсу', 'конкурса', 'конкурсом', 'конкурсы', 'конкурсами',
	'хакатон', 'хакатону', 'хакатоном', 'хакатоне', 'хакатона', 'хакатоны', 'хакатонами'];
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
	'выступал',
	'выступала'
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
		console.log(JSON.stringify(filterPosts, null, 2));

	})
	.catch((err) => {
		console.log(err);
	});
