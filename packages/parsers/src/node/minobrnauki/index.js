import {exceptionWords} from "../../utils/wordsForParsers.js";
import {getHTML} from '../../utils/getHTML.js';
import {definePostDescription, defineTypePost, getDataBySelector, getLinksPosts} from '../../utils/methodsParser.js';

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
        const {title} = querySelectors;

        const namePost = getDataBySelector(jsdom, title);
        return definePostDescription(defineTypePost(namePost), jsdom, querySelectors, link, baseUrl);


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
