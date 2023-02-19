const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {getHTML} = require('../../utils/getHTML.js');
const {getLinksPosts} = require('../../utils/methodsParser.js');
const {getInfoPosts} = require("../../utils/methodsParser");


const url = 'https://integraciya.org/konkursy/';
const baseUrl = 'https://integraciya.org';

const querySelectors = {
    title: 'strong.name',
    link: 'a.contest_a',
    // date: 'span.ico_clock b',
    text: 'table.contest_more_cont tbody tr td ~ td',
    deadline: 'div.date2'
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
    const jsdom = await getHTML(url);
    const links = getLinksPosts(jsdom, querySelectors.link, baseUrl);

    const receivedPosts = await getInfoPosts(querySelectors, baseUrl, links);

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
