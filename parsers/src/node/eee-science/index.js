const {exceptionWords} =  require("../../utils/wordsForParsers.js");
const {getHTML} = require ('../../utils/getHTML.js');
const {getLinksPosts} =require('../../utils/methodsParser.js');
const {getInfoPosts} = require("../../utils/methodsParser");


const url = 'https://eee-science.ru/announcements-events/competitions-aspirant/';

const querySelectors = {
    title: 'h1.tb-heading.has-text-color',
    link: 'div.col-sm-12 > h2 > a',
    date: 'div.tb-fields-and-text p',
    text: 'div.tb-field',
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
    const links = getLinksPosts(jsdom, querySelectors.link);

    const receivedPosts = await getInfoPosts(querySelectors, links);

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
