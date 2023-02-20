const {exceptionWords} =  require("../../utils/wordsForParsers.js");
const {getHTML} = require ('../../utils/getHTML.js');
const {getLinksPosts} =require('../../utils/methodsParser.js');
const {getInfoPosts} = require("../../utils/methodsParser");


const url = 'https://minobrnauki.gov.ru/grants/grants/';
const baseUrl = 'https://minobrnauki.gov.ru';

const querySelectors = {
    title: 'article.post h1',
    link: 'a.grants-card',
    date: 'span.post-date-day',
    text: 'div.post-body div b',
    linkPDF: 'div.post-body a:not([href="/grants/grants/"])',
};


const filterPosts = (posts) => {
    return posts
        .filter((post) => post.postType !== 'other')
        .filter((post) => {
            const {namePost} = post.postDescription;

            return exceptionWords.every((word) => {
                if(namePost.toLowerCase().includes(word)) {
                    console.log(namePost, 'contains', word);
                }
                return !namePost.toLowerCase().includes(word);
            });
        })
};

(async function main() {
    const jsdom = await getHTML(url);
    const links = getLinksPosts(jsdom, querySelectors.link, baseUrl);

    const receivedPosts = await getInfoPosts(querySelectors, links);

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
