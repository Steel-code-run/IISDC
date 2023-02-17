const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {getHTMLByFadmGov} = require('../../utils/getHTML.js');
const {
    definePostDescription,
    defineTypePost,
    getDataBySelector,
    getLinksPosts
} = require('../../utils/methodsParser.js');


const page = process.argv[2] || 1;

const url = 'https://fadm.gov.ru/news/';
const baseUrl = 'https://fadm.gov.ru';

const querySelectors = {
    title: 'h2.news__title',
    link: 'a.news-mini.news-catalog__mini',
    date: 'span.date',
    text: 'div.news__wrap',
};


const getInfoPosts = (links) => {
    return links.map(async (link) => {
        const jsdom = await getHTMLByFadmGov(link);
        const {title} = querySelectors;

        const namePost = getDataBySelector(jsdom, title);
        return definePostDescription(defineTypePost(namePost), jsdom, querySelectors, link);
    });
};

const getPostLazyLoading = async (page, url, querySelectors) => {
    const jsdom = await getHTMLByFadmGov(`${url}?PAGEN_1=${page}`);
    const links = getLinksPosts(jsdom, querySelectors.link, baseUrl);

    return [...(await Promise.all(getInfoPosts(links)))];
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
    const receivedPosts = await getPostLazyLoading(page, url, querySelectors);

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()



