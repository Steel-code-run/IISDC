import {exceptionWords, keyWords} from "../../utils/wordsForParsers.js";
import {getHTML} from '../../utils/getHTML.js';
import {defineTypePost, getDataBySelector, getLinksPosts, getSummaryGrant} from '../../utils/methodsParser.js';


const page = process.argv[2] || 1;


const url = 'https://integraciya.org/konkursy/';
const baseUrl = 'https://integraciya.org';

const querySelectors = {
    title: 'strong.name',
    link: 'a.contest_a',
    // date: 'span.ico_clock b',
    text: 'table.contest_more_cont tbody tr td ~ td',
    deadline: 'div.date2'
};


const getInfoPosts = (links) => {
    return links.map(async (link) => {
        const jsdom = await getHTML(link);
        const {title, date, text, deadline} = querySelectors;

        switch(defineTypePost(getDataBySelector(jsdom, title))) {
            case 'grant':
                return {
                    postType: 'grant',
                    postDescription: {
                        namePost: getDataBySelector(jsdom, title),
                        dateCreationPost: getDataBySelector(jsdom, date),
                        summary: getSummaryGrant(jsdom, text),
                        fullText: getDataBySelector(jsdom, text).replaceAll('\n', ''),
                        deadline: getDataBySelector(jsdom, deadline),
                        link,
                    },

                };
            case 'competition':
                return {
                    postType: 'competition',
                    postDescription: {
                        namePost: getDataBySelector(jsdom, title),
                        dateCreationPost: getDataBySelector(jsdom, date),
                        deadline: getDataBySelector(jsdom, deadline),
                        direction: 'направление',
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

    const receivedPosts = await Promise.all(getInfoPosts(links));

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
