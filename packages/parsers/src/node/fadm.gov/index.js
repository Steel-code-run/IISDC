const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {
    definePostDescription,
    defineTypePost,
    getDataBySelector,
    getLinksPosts
} = require('../../utils/methodsParser.js');
const {getHTML} = require("../../utils/getHTML");


const page = process.argv[2] || 1;

const url = 'https://fadm.gov.ru/news/';
const baseUrl = 'https://fadm.gov.ru';

const querySelectors = {
    title: 'h2.news__title',
    link: 'a.news-mini.news-catalog__mini',
    date: 'span.date',
    text: 'div.news__wrap',
};

const getInfoPosts = async (querySelectors, baseUrl, links) => {
    const result = []


    for (let index in links) {
        const jsdom = await getHTML(links[index], {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36'
        });
        const {title} = querySelectors;

        const namePost = getDataBySelector(jsdom, title);
        result.push(definePostDescription(defineTypePost(namePost), jsdom, querySelectors, links[index], baseUrl));
    }

    return result
}


const getPostLazyLoading = async (page, url, querySelectors) => {
    const jsdom = await getHTML(`${url}?PAGEN_1=${page}`);
    const links = getLinksPosts(jsdom, querySelectors.link, baseUrl);

    return await getInfoPosts(querySelectors, baseUrl, links);
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



