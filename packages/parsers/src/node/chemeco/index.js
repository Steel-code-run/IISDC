const {getHTML} = require("../../utils/getHTML");
const {definePost, clearString, getDataBySelector, getLink, getPostType, fullTextRegExp} = require("../../utils/normalParsingHelper");
const page = process.argv[2] || 1;
const url = "http://www.chemeco.ru/mendeleev/";
const baseUrl = "http://www.chemeco.ru/";

const querySelectors = {
    posts: ".nc_row",
    title: ".nc_row h3",
    link: ".nc_row h3 a",
    fullText:".nc_full_text",
}

async function getPosts(page)  {
    const posts = [];
    const jsdom = await getHTML(url + "?curPos=" + (page-1)*20);
    const postsOnPage = jsdom.window.document.querySelectorAll(querySelectors.posts);

    for (let i = 0; i < postsOnPage.length; i++) {
        const namePost = getDataBySelector(postsOnPage[i], querySelectors.title);
        // let dateCreationPost = getDataBySelector(postsOnPage[i], querySelectors.dateCreationPost)
        //     .split(/[\n.]/g)
        //     .map((item) => clearString(item))
        //     .filter((item) => item !== "")
        // dateCreationPost = new Date(dateCreationPost[2], dateCreationPost[1]-1, dateCreationPost[0]).getTime();
        // const organization = clearString(getDataBySelector(postsOnPage[i], querySelectors.organization));
        const link = baseUrl + getLink(postsOnPage[i], querySelectors.link);

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
                // dateCreationPost,
                // organization,
                fullText,
                link,
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
                // dateCreationPost,
                // organization,
                link,
                fullText,
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
