const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const { defineTypePost} = require("../../utils/methodsParser");
const {getHtmlContent} = require("../../utils/puppeteerGetHtmlContent");
const cheerio = require('cheerio')


const page = process.argv[2] || 1;


const url = 'https://docs.edu.gov.ru';
const baseUrl = url


const querySelectors = {
    title: 'a',
    post: 'div.section.page-main__searchresult-item',
    date: 'div.date.page-main__searchresult-item-meta-date',
    link: 'a'
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

    const html = await getHtmlContent(url);
    const $ = cheerio.load(html);
    const posts = []
    $(querySelectors.post).each((i, post) => {
        posts.push( {
            title: $(post).find(querySelectors.title)?.text(),
            date: $(post).find(querySelectors.date)?.text(),
            link: $(post).find(querySelectors.link)?.attr('href'),
        })

    })


    const receivedPosts = posts.map(post => {
        const namePost = post.title;
        switch (defineTypePost(namePost)) {
            case 'grant':
                return {
                    postType: 'grant',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: post.date,
                        directionForSpent: "",
                        summary: '',
                        fullText: '',
                        deadline: '',
                        linkPDF: '',
                        link: post.link,
                    },

                };
            case 'competition':
                return {
                    postType: 'competition',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: post.date,
                        deadline: '',
                        direction: '',
                        fullText:  '',
                        linkPDF: '',
                        link: post.link,
                    },
                };
            case 'vacancy':
                return {
                    postType: 'vacancy',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: post.date,
                        direction: '',
                        fullText: '',
                        organization: "",
                        conditions: "",
                        requirements: "",
                        responsibilities: "",
                        salary: "",
                        link: post.link,
                    },
                };
            case 'internship':
                return {
                    postType: 'internship',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: post.date,
                        direction: '',
                        fullText: '',
                        organization: "",
                        conditions: "",
                        requirements: "",
                        responsibilities: "",
                        salary: "",
                        link: post.link,
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
