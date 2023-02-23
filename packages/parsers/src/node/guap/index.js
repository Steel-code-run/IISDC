const {getHTML} = require("../../utils/getHTML");
const {definePost, clearString, getDataBySelector, getLink, getPostType, fullTextRegExp} = require("../../utils/normalParsingHelper");
const page = process.argv[2] || 1;
const url = "https://guap.ru/m/science/grants";
const baseUrl = "https://guap.ru/m/science/";

const querySelectors = {
    posts: ".wt-card-item",
    title: "a",
    organization: "p",
    deadline: "span",
    link: "a",
    fullText:"#page_body",
}

async function getPosts(page)  {
    const posts = [];
    if (page > 1)
        return posts

    const jsdom = await getHTML(url);
    const postsOnPage = jsdom.window.document.querySelectorAll(querySelectors.posts);

    for (let i = 0; i < postsOnPage.length; i++) {
        const namePost = getDataBySelector(postsOnPage[i], querySelectors.title);

        const organization = clearString(getDataBySelector(postsOnPage[i], querySelectors.organization));
        const link = baseUrl + getLink(postsOnPage[i], querySelectors.link);
        const direction = '' // Тут надо повозиться либо накатить ИСКУСТВЕННЫЙ ИНТЕЛЕКТУС
        const deadline = getDataBySelector(postsOnPage[i], querySelectors.deadline, fullTextRegExp.deadline);

        const additionalPage = await getHTML(link, {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 YaBrowser/23.1.2.931 Yowser/2.5 Safari/537.36"
        });
        const dateCreationPost = "Неизвестно";
        const fullText = getDataBySelector(additionalPage.window.document, querySelectors.fullText);

        const postType = getPostType(namePost);

        if (postType === 'grant') {
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

    }
    return posts;
}
getPosts(Number(page)).then((posts) => {
    console.log(JSON.stringify(posts.reverse()));
});
