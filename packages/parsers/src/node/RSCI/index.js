const {getHTML} = require("../../utils/getHTML");
const {definePost, clearString, getDataBySelector, getLink, getPostType, fullTextRegExp} = require("../../utils/normalParsingHelper");
const page = process.argv[2] || 1;
const url = "http://www.rsci.ru/grants";
const baseUrl = "http://www.rsci.ru";

const querySelectors = {
	posts: ".info-card",
	title: "h4",
	direction: "div.info-card-img > div > div > a",
	dateCreationPost: "div > time",
	organization: ".info-title",
	link: "div.info-card-deskription > a",
	fullText:"#grant-news-contayner > div > div.article.card-item.z-depth-1 > div > div.card-item-text",
}

async function getPosts(page)  {
	const posts = [];
	const jsdom = await getHTML(url + "/?PAGEN_1=" + page);
	const postsOnPage = jsdom.window.document.querySelectorAll(querySelectors.posts);

	for (let i = 0; i < postsOnPage.length; i++) {
		const namePost = getDataBySelector(postsOnPage[i], querySelectors.title);
		let dateCreationPost = getDataBySelector(postsOnPage[i], querySelectors.dateCreationPost)
			.split(/[\n.]/g)
			.map((item) => clearString(item))
			.filter((item) => item !== "")
		dateCreationPost = new Date(dateCreationPost[2], dateCreationPost[1]-1, dateCreationPost[0]).getTime();

		const organization = clearString(getDataBySelector(postsOnPage[i], querySelectors.organization));
		const link = baseUrl + getLink(postsOnPage[i], querySelectors.link);
		const direction = clearString(getDataBySelector(postsOnPage[i], querySelectors.direction));

		const additionalPage = await getHTML(link);
		const fullText = getDataBySelector(additionalPage.window.document, querySelectors.fullText);


		const postType = getPostType(namePost);

		if (postType === 'grant') {
			const deadline = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.deadline);
			const directionForSpent = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.directionForSpent);
			const summary = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.summary);
			// пдф почти всегда отсутствует, поэтому нету смысла её обрабатывать
			// const linkPDF = ''
			const post = definePost({
				namePost,
				dateCreationPost,
				organization,
				fullText,
				link,
				direction,
				deadline,
				directionForSpent,
				summary
			});
			posts.push(post)
		}

		if (postType === 'competition') {
			const deadline = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.deadline);
			const post = definePost({
				namePost,
				dateCreationPost,
				organization,
				link,
				fullText,
				direction,
				deadline
			});
			posts.push(post)
		}
		// Вакансий нету на сайте
		// if (type === "vacancy") {
		// 	const requirements = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.requirements);
		// 	const responsibilities = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.responsibilities);
		// 	const conditions = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.conditions);
		// 	const salary = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.salary);
		//
		// 	const post = definePost({
		// 		requirements,
		// 		responsibilities,
		// 		conditions,
		// 		salary,
		// 		namePost,
		// 		dateCreationPost,
		// 		organization,
		// 		link,
		// 		direction,
		// 	});
		// 	posts.push(post)
		// }
		if (postType === "internship"){
			const requirements = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.requirements);
			const responsibilities = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.responsibilities);
			const conditions = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.conditions);
			const salary = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.salary);
			const post = definePost({
				requirements,
				responsibilities,
				conditions,
				salary,
				direction,
				fullText,
				namePost,
				dateCreationPost,
				organization,
				link,
			});
			posts.push(post)
		}

	}
	return posts;
}
getPosts(Number(page)).then((posts) => {
	console.log(JSON.stringify(posts.reverse()));
});
