const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {getHTML} = require('../../utils/getHTML.js');
const {
    definePostDescription,
    defineTypePost,
    getDataBySelector,
    getLinksPosts
} = require('../../utils/methodsParser.js');

const page = process.argv[2] || 1;

const baseUrl = 'https://vsekonkursy.ru/';
const url = baseUrl

const querySelectors = {
    title: 'h1.title.entry-title',
    link: 'div.article-content-col a[class]',
    date: 'time.entry-date published',
    text: 'div.nv-content-wrap.entry-content p',
    deadline: 'div.elementor-text-editor.elementor-clearfix p',
};

const getFilterPost = (jsdom, selector) => {
    return (jsdom.window.document.querySelector(selector)?.textContent === 'Конкурс завершен')
}

const getInfoPosts = async (links) => {

    const result = []

    for (let index in links) {
        const jsdom = await getHTML(links[index])
        const {title} = querySelectors;

        const namePost = getDataBySelector(jsdom, title);
        if(!getFilterPost(jsdom, 'p[style="font-style: italic;"]')){
            result.push(definePostDescription(defineTypePost(namePost), jsdom, querySelectors, links[index], baseUrl));
        }
    }

    return result
}

const getPostLazyLoading = async (page, url, querySelectors) => {
    const jsdom = await getHTML(url + `page/${page}`);
    const links = getLinksPosts(jsdom, querySelectors.link, '');

    return getInfoPosts(querySelectors, links)

};

const filterPosts = (posts) => {
    return posts
        .filter((post) => post !== undefined) // фильтрация конкурсов, которые уже закончены
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
    const receivedPosts = await getPostLazyLoading(page, url, querySelectors);

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
