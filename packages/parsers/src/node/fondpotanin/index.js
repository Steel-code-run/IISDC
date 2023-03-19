const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {getHTML} = require('../../utils/getHTML.js');
const {getLinksPosts} = require('../../utils/methodsParser.js');
const { definePostDescription} = require("../../utils/methodsParser");


const url = 'https://fondpotanin.ru/competitions/';
const baseUrl = 'https://fondpotanin.ru';

const querySelectors = {
    title: 'h1.section-caption',
    link: 'a.contests-banners__banner',
    text: 'span.contests-banners__text-wrap',
    date: 'div.aside__period'
};

const getFullTextPosts = (querySelector, jsdom) => {
    return Array.from(jsdom.window.document.querySelectorAll(querySelector)).map(el => el?.textContent)
}


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
const getInfoPostsPotanin = async (querySelectors, links, baseUrl = '' ) => {
    const result = []

    for (let index in links) {
        const jsdom = await getHTML(links[index])

        result.push(definePostDescription('competition', jsdom, querySelectors, links[index], baseUrl));
    }


    return result
}

(async function main() {
    const jsdom = await getHTML(url + '?SHOWALL_1=1');
    const links = getLinksPosts(jsdom, querySelectors.link, baseUrl);
    const fullTexts = getFullTextPosts(querySelectors.text, jsdom);


    const receivedPosts = await getInfoPostsPotanin(querySelectors, links);
    receivedPosts.map((post, index) => post.postDescription.fullText = fullTexts[index])


    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
