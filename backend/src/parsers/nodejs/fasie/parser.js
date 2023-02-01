import { getHTML } from '../utils/getHTML.js';

const url = 'https://fasie.ru/press/';
const baseUrl = 'https://fasie.ru';

const querySelectors = {
	title: 'h1[itemprop="name"]',
	link: 'ul.tile_blocks a',
	date: 'span.ico_clock b',
	text: 'div[itemprop="text"]',
};

const exceptionWords = [
	'результаты',
	'результат',
	'результатам',
	'результату',
	'результатов',
	'итоги',
	'подведены итоги',
	'итог',
	'вебинар',
	'вебинары',
	'победитель',
	'победители',
	'победителя',
	'победителей',
	'победителю',
	'победителям',
	'победителем',
	'победителе',
	'победителями',
	'победителях',
	'посетил ',
	'посетила ',
	'посетили ',
	'посетит ',
	'встреча ',
];

const keyWords = [
	'гранты',
	'грант ',
	'гранту',
	'грантам',
	'грантом',
	'гранте',
	'приём заявок',
	'прием заявок',
	'запуск конкурса',
	'конкурс ',
	'конкурсы ',
	'конкурса',
	'конкурсу',
	'конкурсом',
	'конкурсе',
	'конкурсам',
	'конкурсами',
	'конкурсах',
	'конкурсов',
	'на реализацию',
];

const getNamePosts = (jsdom, querySelector) => {
	return (
		jsdom.window.document.querySelector(querySelector)?.textContent ?? ''
	);
};

const getLinksPosts = (jsdom, querySelector) => {
	return Array.from(
		jsdom.window.document.querySelectorAll(querySelector)
	).map((link) => baseUrl + link.getAttribute('href'));
};

const getDatesPosts = (jsdom, querySelector) => {
	return (
		jsdom.window.document.querySelector(querySelector)?.textContent ?? ''
	);
};

const getTextPosts = (jsdom, querySelector) => {
	return (
		jsdom.window.document.querySelector(querySelector)?.textContent ?? ''
	);
};

const getInfoPosts = (links) => {
	return links.map(async (link) => {
		const jsdom = await getHTML(link);
		const { title, date, text } = querySelectors;

		return {
			title: getNamePosts(jsdom, title),
			date: getDatesPosts(jsdom, date),
			text: getTextPosts(jsdom, text).replaceAll('\n', ''),
			link,
		};
	});
};

const getPostLazyLoading = async (totalPosts, url, querySelectors) => {
	const posts = [];

	for (let i = 0; i < totalPosts; i++) {
		const jsdom = await getHTML(`${url}?ajax=Y&PAGEN_1=${i}`);
		const links = getLinksPosts(jsdom, querySelectors.link);
		posts.push(...(await Promise.all(getInfoPosts(links))).slice(0, -1));
	}
	return posts;
};

const filterPosts = (posts) => {
	return posts
		.filter((post) => {
			const { title } = post;

			return keyWords.some(
				(word) => title.toLowerCase().includes(word)
				// text.toLowerCase().includes(word)
			);
		})
		.filter((post) => {
			const { title } = post;

			return exceptionWords.every((word) => {
				return !title.toLowerCase().includes(word);
			});
		});
};

const gottenPosts = await getPostLazyLoading(10, url, querySelectors);

console.log(filterPosts(gottenPosts), filterPosts(gottenPosts).length);
