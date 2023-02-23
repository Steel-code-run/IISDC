const {exceptionWords} = require("../../utils/wordsForParsers.js");
const {getHTML} = require('../../utils/getHTML.js');
const {
    getLinksPosts
} = require('../../utils/methodsParser.js');
const {getInfoPosts, defineTypePost} = require("../../utils/methodsParser");


const url = 'https://oreluniver.ru/international/connections/grants';
const baseUrl = 'https://oreluniver.ru';

const querySelectors = {
    title: 'a',
    link: 'a',
    deadline: 'a strong',
    post: 'div.page-content > ul li'
};

const getPosts = (jsdom, selector) => {
    return jsdom.window.document.querySelectorAll(selector)
}

const getInfoPost = (post, selectors) => {
    return {
        title: post.querySelector(selectors.title),
        deadline: post.querySelector(selectors.deadline),
        link: baseUrl + post.querySelector(selectors.link).getAttribute('href')
    }
}


const filterPosts = (posts) => {
    return posts
        .filter((post) => post.postType !== 'other')
        .filter((post) => {
            const {namePost} = post.postDescription;

            return exceptionWords.every((word) => {
                if (namePost.toLowerCase().includes(word)) {
                }
                return !namePost.toLowerCase().includes(word);
            });
        })
};

(async function main() {
    const jsdom = await getHTML(url);
    const posts = getPosts(jsdom, querySelectors);
    



    const receivedPosts = posts.map(post => {
        const namePost = post.title;
        switch (defineTypePost(namePost)) {
            case 'grant':
                return {
                    postType: 'grant',
                    postDescription: {
                        namePost: getDataBySelector(jsdom, querySelectors?.title),
                        dateCreationPost: getDataBySelector(jsdom, querySelectors?.date),
                        directionForSpent: "",
                        summary: getSummaryGrant(jsdom, querySelectors?.text),
                        fullText: getDataBySelector(jsdom, querySelectors?.text).replaceAll('\n', ''),
                        deadline: getDataBySelector(jsdom, querySelectors?.deadline),
                        linkPDF: getLinksPDF(jsdom, querySelectors?.linkPDF, url),
                        link,
                    },

                };
            case 'competition':
                return {
                    postType: 'competition',
                    postDescription: {
                        namePost: getDataBySelector(jsdom, querySelectors?.title),
                        dateCreationPost: getDataBySelector(jsdom, querySelectors?.date),
                        deadline: getDataBySelector(jsdom, querySelectors?.deadline),
                        direction: 'направление',
                        fullText: getDataBySelector(jsdom, querySelectors?.text).replaceAll('\n', ''),
                        link,
                    },
                };
            case 'vacancy':
                return {
                    postType: 'vacancy',
                    postDescription: {
                        namePost: getDataBySelector(jsdom, querySelectors?.title),
                        dateCreationPost: getDataBySelector(jsdom, querySelectors?.date),
                        direction: getDataBySelector(jsdom, querySelectors?.text),
                        fullText: getDataBySelector(jsdom, querySelectors?.text).replaceAll('\n', ''),
                        organization: "Организация",
                        conditions: "Условия",
                        requirements: "Требования",
                        responsibilities: "Обязанности",
                        salary: "Зарплата",
                        link,
                    },
                };
            case 'internship':
                return {
                    postType: 'internship',
                    postDescription: {
                        namePost: getDataBySelector(jsdom, querySelectors?.title),
                        dateCreationPost: getDataBySelector(jsdom, querySelectors?.date),
                        direction: getDataBySelector(jsdom, querySelectors?.text),
                        fullText: getDataBySelector(jsdom, querySelectors?.text).replaceAll('\n', ''),
                        organization: "Организация",
                        conditions: "Условия",
                        requirements: "Требования",
                        responsibilities: "Обязанности",
                        salary: "Зарплата",
                        link,
                    },
                };
            case 'other':
                return {
                    postType: 'other',
                }
        }
    });

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
