import {exceptionWords, keyWords} from "../../utils/wordsForParsers.js";
import {getHTML} from '../../utils/getHTML.js';
import {definePostDescription, defineTypePost, getDataBySelector, getLinksPosts} from '../../utils/methodsParser.js';


const page = process.argv[2] || 1;


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
        const {title} = querySelectors;

        const namePost = getDataBySelector(jsdom, title);
        return definePostDescription(defineTypePost(namePost), jsdom, querySelectors, link);
    });
};

const getPostLazyLoading = async (totalPage, url, querySelectors) => {
    const posts = [];

    for (let i = 0; i < totalPage; i++) {
        const jsdom = await getHTML(`${url}?ajax=Y&ajax=Y&PAGEN_1=${i}`);
        const links = getLinksPosts(jsdom, querySelectors.link, baseUrl);
        posts.push(...(await Promise.all(getInfoPosts(links))).slice(0, -1));
    }
    return posts;
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
