const {exceptionWords} =  require("../../utils/wordsForParsers.js");
const {getHTML} = require ('../../utils/getHTML.js');
const {definePostDescription, defineTypePost, getDataBySelector, getLinksPosts} =require('../../utils/methodsParser.js');

const url = 'https://rcfoundation.ru/grant.html';
const baseUrl = 'https://rcfoundation.ru/';

const querySelectors = {
    title: 'h1.mt-0.mb-2',
    link: 'div.item-heading a',
    // date: 'span.post-date-day',
    text: 'div.row.mt-4',
};


const getInfoPosts = (links) => {
    return links.map(async (link) => {
        const jsdom = await getHTML(link);
        const {title} = querySelectors;

        const namePost = getDataBySelector(jsdom, title);
        return definePostDescription(defineTypePost(namePost), jsdom, querySelectors, link, baseUrl);


    });
};

const filterPosts = (posts) => {
    return posts
        .filter((post) => post.postType !== 'other')
        .filter((post) => {
            const {namePost} = post.postDescription;

            return exceptionWords.every((word) => {
                if(namePost.toLowerCase().includes(word)) {
                }
                return !namePost.toLowerCase().includes(word);
            });
        })
};

(async function main() {
    const jsdom = await getHTML(url);
    const links = getLinksPosts(jsdom, querySelectors.link, baseUrl);
    console.log(links)

    const receivedPosts = await Promise.all(getInfoPosts(links));

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
