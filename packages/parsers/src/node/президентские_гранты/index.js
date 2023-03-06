const {exceptionWords} =  require("../../utils/wordsForParsers.js");
const {getHTML} = require ('../../utils/getHTML.js');
const {getLinksPosts} =require('../../utils/methodsParser.js');
const {getInfoPosts} = require("../../utils/methodsParser");


const baseUrl = 'https://президентскиегранты.рф';
const url = baseUrl;

const querySelectors = {
    title: 'h1.article__title',
    link: 'a.news-item',
    deadline: 'span.news-item__date',
    text: 'p.MsoNormal span',
};

const getDeadlines = (jsdom, querySelector) => {
    return Array.from(jsdom.window.document.querySelectorAll(querySelector)).map(date => date?.textContent)
}

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
    const deadlines = getDeadlines(jsdom, querySelectors.deadline)

    const receivedPosts = (await getInfoPosts(querySelectors, links, baseUrl)).map((post, index) => {
        return {
            ...post,
            postDescription: {
                ...post.postDescription,
                deadline: deadlines[index]
            }
        }
    })


    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
