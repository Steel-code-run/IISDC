const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {getHTML} = require('../../utils/getHTML.js');
const {
    definePostDescription,
    defineTypePost,
    getDataBySelector,
    getLinksPosts
} = require('../../utils/methodsParser.js');


const page = process.argv[2] || 1;


const url = 'https://sowa-ru.com/event/';



const querySelectors = {
    title: 'h1.page-header-title',
    link: 'a.kt-blocks-info-box-link-wrap',
    // date: 'span.ico_clock b',
    // text: 'div[itemprop="text"]',
    deadline: 'div.elementor-text-editor.elementor-clearfix p',
};

const getInfoPosts = (links) => {
    return links.map(async (link) => {
        const jsdom = await getHTML(link);
        const {title} = querySelectors;

        const namePost = getDataBySelector(jsdom, title);
        return definePostDescription(defineTypePost(namePost), jsdom, querySelectors, link);
    });
};

const getPostLazyLoading = async (page, url, querySelectors) => {
    const jsdom = await getHTML(url);
    const links = getLinksPosts(jsdom, querySelectors.link, '');

    return getInfoPosts(links).map(promise => promise.then(res => res))

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
    const receivedPosts = await Promise.all( await getPostLazyLoading(page, url, querySelectors));

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
