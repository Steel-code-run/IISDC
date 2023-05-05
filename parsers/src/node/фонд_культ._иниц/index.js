const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {getHTML} = require('../../utils/getHTML.js');
const { defineTypePost} = require("../../utils/methodsParser");


const page = process.argv[2] || 1;


const url = 'https://фондкультурныхинициатив.рф/public/home/documents?tagId=207';
const baseUrl = 'https://фондкультурныхинициатив.рф'

const getPosts = (jsdom, selector) => {
    return jsdom.window.document.querySelectorAll(selector)
}

const getInfoPost = (post, selectors) => {
    const newArr = Array.from(post).slice(0, 40)
    return newArr.map(post => {
        return {
            title: post.querySelector(selectors.title)?.textContent,
            linkPDF: baseUrl + post?.querySelector(selectors.linkPDF)?.getAttribute('href'),
            fullText: post.querySelector(selectors.fullText)?.textContent
        }
    })
}

const querySelectors = {
    title: 'div.table__dl-file.table__dl-file.table__dl-file--pdf span',
    linkPDF: 'div.table__dl-btn.table__dl-btn--pdf a',
    fullText: 'div.table__cell.table__cell--txt.js-docs-txt-clone-from span',
    post: 'div.table__row'
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
    const posts = getInfoPost(getPosts(jsdom, querySelectors.post), querySelectors);

    const receivedPosts = posts.map(post => {
        const namePost = post.title;
        switch (defineTypePost(namePost)) {
            case 'grant':
                return {
                    postType: 'grant',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: '',
                        directionForSpent: "",
                        summary: '',
                        fullText: post.fullText,
                        deadline: '',
                        linkPDF: post.linkPDF,
                        link: '',
                    },

                };
            case 'competition':
                return {
                    postType: 'competition',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: '',
                        deadline: '',
                        direction: '',
                        fullText:  post.fullText,
                        linkPDF: post.linkPDF,
                        link: '',
                    },
                };
            case 'vacancy':
                return {
                    postType: 'vacancy',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: '',
                        direction: '',
                        fullText: post.fullText,
                        organization: "",
                        conditions: "",
                        requirements: "",
                        responsibilities: "",
                        salary: "",
                        link: '',
                    },
                };
            case 'internship':
                return {
                    postType: 'internship',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: '',
                        direction: '',
                        fullText: post.fullText,
                        organization: "",
                        conditions: "",
                        requirements: "",
                        responsibilities: "",
                        salary: "",
                        link: '',
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
