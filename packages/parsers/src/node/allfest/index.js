const {getHTML} = require("../../utils/getHTML");
const {definePost, clearString, getDataBySelector, getLink, getPostType, fullTextRegExp} = require("../../utils/normalParsingHelper");
const page = process.argv[2] || 1;
const url = "https://allfest.ru/news";
const baseUrl = "https://allfest.ru";

const querySelectors = {
    posts: ".views-row",
    title: ".views-field-title",
    link: "a",
    fullText:".region",
}

async function getPosts(page)  {
    const posts = [];
    const jsdom = await getHTML(url);
    const postsOnPage = jsdom.window.document.querySelectorAll(querySelectors.posts);

    for (let i = 0; i < postsOnPage.length; i++) {
        const namePost = getDataBySelector(postsOnPage[i], querySelectors.title);
        let dateCreationPost = getDataBySelector(postsOnPage[i], querySelectors.dateCreationPost)
        const link = baseUrl + getLink(postsOnPage[i], querySelectors.link);

        if (i>50) {
            break;
        }
        const postType = getPostType(namePost);

        if (postType === 'grant') {
            const additionalPage = await getHTML(encodeURI(link));
            const fullText = getDataBySelector(additionalPage.window.document, querySelectors.fullText);



            const deadline = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.deadline);
            const directionForSpent = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.directionForSpent);
            const summary = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.summary);
            // пдф почти всегда отсутствует, поэтому нету смысла её обрабатывать
            // const linkPDF = ''



            const post = definePost({
                namePost,
                dateCreationPost,
                fullText,
                link,
                deadline,
                directionForSpent,
                summary
            });
            posts.push(post)
        }

        if (postType === 'competition') {

            const additionalPage = await getHTML(encodeURI(link));
            const fullText = getDataBySelector(additionalPage.window.document, querySelectors.fullText);


            const deadline = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.deadline);
            const post = definePost({
                namePost,
                dateCreationPost,
                link,
                fullText,
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
        // if (postType === "internship"){
        // 	const requirements = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.requirements);
        // 	const responsibilities = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.responsibilities);
        // 	const conditions = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.conditions);
        // 	const salary = getDataBySelector(additionalPage.window.document, querySelectors.fullText, fullTextRegExp.salary);
        // 	const post = definePost({
        // 		requirements,
        // 		responsibilities,
        // 		conditions,
        // 		salary,
        // 		direction,
        // 		fullText,
        // 		namePost,
        // 		dateCreationPost,
        // 		organization,
        // 		link,
        // 	});
        // 	posts.push(post)
        // }

    }
    return posts;
}
getPosts(Number(page)).then((posts) => {
    console.log(JSON.stringify(posts.reverse()));
});
