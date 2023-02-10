const page = process.argv[2] || 1;

const {getHTML} = require('../../utils/getHTML.js');
const {keyWords, exceptionWords} = require('../../utils/wordsForParsers');
const {
    getSummaryGrant,
    getLinksPosts, getDataBySelector
} = require("../../utils/methodsParser");

console.log(keyWords);

const url = 'https://fasie.ru/press/';
const baseUrl = 'https://fasie.ru';

const querySelectors = {
    title: 'h1[itemprop="name"]',
    link: 'ul.tile_blocks a',
    date: 'span.ico_clock b',
    text: 'div[itemprop="text"]',
};

const getInfoPosts = (links) => {
    return links.map(async (link) => {
        const jsdom = await getHTML(link);
        const {title, date, text} = querySelectors;

        return {
            namePost: getDataBySelector(jsdom, title),
            dateCreationPost: getDataBySelector(jsdom, date),
            summary: getSummaryGrant(jsdom, text),
            fullText: getDataBySelector(jsdom, text).replaceAll('\n', ''),
            link,
        };
    });
};

const getPostLazyLoading = async (totalPage, url, querySelectors) => {
    const posts = [];

    for (let i = 0; i < totalPage; i++) {
        const jsdom = await getHTML(`${url}?ajax=Y&PAGEN_1=${i}`);
        const links = getLinksPosts(jsdom, querySelectors.link, baseUrl);
        posts.push(...(await Promise.all(getInfoPosts(links))).slice(0, -1));
    }
    return posts;
};

const filterPosts = (posts) => {
    return posts
        .filter((post) => {
            const {namePost} = post;

            return keyWords.some(
                (word) => namePost.toLowerCase().includes(word)
                // text.toLowerCase().includes(word)
            );
        })
        .filter((post) => {
            const {namePost} = post;

            return exceptionWords.every((word) => {
                return !namePost.toLowerCase().includes(word);
            });
        });
};

(async function main() {
    const gottenPosts = await getPostLazyLoading(page, url, querySelectors);

    try {
        console.log(
            JSON.stringify({
                type: 'grant',
                parseErrors: ['Ошибка 20000000000000'],
                posts: filterPosts(gottenPosts),
            })
        );
    } catch (error) {
        console.log(error);
    }
})()
