const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {getHTML} = require('../../utils/getHTML.js');
const {getLinksPosts} = require('../../utils/methodsParser.js');
const {getInfoPosts} = require("../../utils/methodsParser");


const page = process.argv[2] || 5;


const url = 'https://fasie.ru/press/';
const baseUrl = 'https://fasie.ru';

const querySelectors = {
    title: 'h1[itemprop="name"]',
    link: 'ul.tile_blocks a',
    date: 'span.ico_clock b',
    text: 'div[itemprop="text"]',
};


const getPostLazyLoading = async (page, url, querySelectors) => {
    const jsdom = await getHTML(`${url}?ajax=Y&ajax=Y&PAGEN_1=${page}`);
    const links = getLinksPosts(jsdom, querySelectors.link, baseUrl);

    return getInfoPosts(querySelectors, links);
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
