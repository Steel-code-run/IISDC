import {exceptionWords} from "../../utils/wordsForParsers.js";
import {getHTML} from '../../utils/getHTML.js';
import {
    defineTypePost,
    getDataBySelector,
    getLinksPDF,
    getLinksPosts,
    getSummaryGrant
} from '../../utils/methodsParser.js';

const page = process.argv[2] || 1;

const url = 'https://minobrnauki.gov.ru/grants/grants/';
const baseUrl = 'https://minobrnauki.gov.ru';

const querySelectors = {
    title: 'article.post h1',
    link: 'a.grants-card',
    date: 'span.post-date-day',
    text: 'div.post-body div b',
    linkPDF: 'div.post-body a:not([href="/grants/grants/"])',
};


const getInfoPosts = (links) => {
    return links.map(async (link) => {
        const jsdom = await getHTML(link);
        const {title, date, text, linkPDF} = querySelectors;

        switch(defineTypePost(getDataBySelector(jsdom, title))) {
            case 'grant':
                return {
                    postType: 'grant',
                    postDescription: {
                        namePost: getDataBySelector(jsdom, title),
                        dateCreationPost: getDataBySelector(jsdom, date),
                        summary: getSummaryGrant(jsdom, text),
                        fullText: getDataBySelector(jsdom, text).replaceAll('\n', ''),
                        linkPDF: getLinksPDF(jsdom, linkPDF, baseUrl),
                        link,
                    },

                };
            case 'competition':
                return {
                    postType: 'competition',
                    postDescription: {
                        namePost: getDataBySelector(jsdom, title),
                        dateCreationPost: getDataBySelector(jsdom, date),
                        deadline: getDataBySelector(jsdom, text),
                        direction: getDataBySelector(jsdom, text),
                        fullText: getDataBySelector(jsdom, text).replaceAll('\n', ''),
                        link,
                    },
                };
            case 'vacancy':
                return {
                    postType: 'vacancy',
                    postDescription: {
                        namePost: getDataBySelector(jsdom, title),
                        dateCreationPost: getDataBySelector(jsdom, date),
                        direction: getDataBySelector(jsdom, text),
                        fullText: getDataBySelector(jsdom, text).replaceAll('\n', ''),
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
                        namePost: getDataBySelector(jsdom, title),
                        dateCreationPost: getDataBySelector(jsdom, date),
                        direction: getDataBySelector(jsdom, text),
                        fullText: getDataBySelector(jsdom, text).replaceAll('\n', ''),
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

    const receivedPosts = await Promise.all(getInfoPosts(links));

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
