const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {getHTML} = require('../../utils/getHTML.js');
const {
    getLinksPosts
} = require('../../utils/methodsParser.js');
const {getInfoPosts} = require("../../utils/methodsParser");

const page = process.argv[2] || 1;


const baseUrl = 'https://rsv.ru/competitions/';
const url = baseUrl

const querySelectors = {
    title: 'h1.title.entry-title',
    link: 'div.article-content-col a[class]',
    date: 'time.entry-date published',
    text: 'div.nv-content-wrap.entry-content p',
    deadline: 'div.elementor-text-editor.elementor-clearfix p',
};


const getPostLazyLoading = async (page, url, querySelectors) => {
    const jsdom = await getHTML(url + `page/${page}`);
    const links = getLinksPosts(jsdom, querySelectors.link, '');

    return getInfoPosts(querySelectors, links)

};

const filterPosts = (posts) => {
    return posts
        .filter((post) => post !== undefined) // фильтрация конкурсов, которые уже закончены
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
    const receivedPosts = await getPostLazyLoading(page, url, querySelectors);

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
