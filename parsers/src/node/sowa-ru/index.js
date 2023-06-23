const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {getHTML} = require('../../utils/getHTML.js');
const {
    getLinksPosts
} = require('../../utils/methodsParser.js');
const {getInfoPosts} = require("../../utils/methodsParser");


const page = process.argv[2] || 1;


const url = 'https://sowa-ru.com/event/';



const querySelectors = {
    title: 'h1.page-header-title',
    link: 'a.kt-blocks-info-box-link-wrap',
    // date: 'span.ico_clock b',
    // text: 'div[itemprop="text"]',
    deadline: 'div.elementor-text-editor.elementor-clearfix p',
};


const getPostLazyLoading = async (page, url, querySelectors) => {
    if(page > 1) url += `page/${page}/`
    const jsdom = await getHTML(url);
    const links = getLinksPosts(jsdom, querySelectors.link, '');

    return getInfoPosts(querySelectors, links, url)

};

const filterPosts = (posts) => {
    return posts
        .filter((post) => post.postType !== 'other')
        .filter((post) => {
            const {namePost} = post.postDescription;

            return keyWords.some(
                (word) => namePost.toLowerCase().includes(word)
            );
        })
        .filter((post) => {
            const {namePost} = post.postDescription;

            return exceptionWords.every((word) => {
                return !namePost.toLowerCase().includes(word);
            });
        });
};

(async function main() {
    const receivedPosts =  await getPostLazyLoading(page, url, querySelectors);

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
