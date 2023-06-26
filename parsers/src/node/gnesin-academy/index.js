const {getHTML} = require("../../utils/getHTML");
const axios = require('axios');
const {definePost, clearString, getDataBySelector, getLink, getPostType, fullTextRegExp} = require("../../utils/normalParsingHelper");
const https = require("https");
const page = process.argv[2] || 1;
const url = "https://gnesin-academy.ru/wp-json/wp/v2/posts?categories[]=101&categories[]=137&categories[]=161&categories[]=177";
// const baseUrl = "https://gnesin-academy.ru/category/";

// const querySelectors = {
//     posts: ".post-inner",
//     title: ".post-inner .post-title",
//     dateCreationPost: ".post-date",
//     link: ".post-inner .post-title a",
//     fullText:"article div.entry-inner",
// }

async function getPosts(page)  {
    const posts = [];

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // (NOTE: this will disable client verification)
        passphrase: "YYY"
    })
    const postsOnPage = await axios.get(url +"&offset=" + (page-1)*10,{
        httpsAgent
    })
    .then((res)=>{
        try {
            return JSON.parse(res.data.slice(res.data.lastIndexOf('\t')));
        } catch (e) {
            try {
                return JSON.parse(res.data);
            } catch (e) {
                return res.data
            }
        }
    })
    //console.log(postsOnPage)


    for (let i = 0; i < postsOnPage.length; i++) {
        const namePost = postsOnPage[i].title.rendered;
        let dateCreationPost = new Date(postsOnPage[i].date)
        const link = postsOnPage[i].link;
        const fullText = postsOnPage[i].content.rendered;
        const postType = getPostType(namePost);
        const deadline = postsOnPage[i].content.rendered.match(fullTextRegExp.deadline,'gmi')

        if (postType === 'grant') {
            const post = definePost({
                namePost,
                dateCreationPost,
                fullText,
                link,
                deadline
            });
            posts.push(post)
        }

        if (postType === 'competition') {
            const post = definePost({
                namePost,
                dateCreationPost,
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
