const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {getHTML} = require('../../utils/getHTML.js');
const {
    definePostDescription,
    defineTypePost,
    getDataBySelector,
    getLinksPosts
} = require('../../utils/methodsParser.js');


const page = process.argv[2] || 1;


const baseUrl = '';
const url = baseUrl



const querySelectors = {
    title: 'h1.title.entry-title',
    link: 'div.article-content-col a[class]',
    date: 'time.entry-date published',
    text: 'div.nv-content-wrap.entry-content p',
    deadline: 'div.elementor-text-editor.elementor-clearfix p',
};

const getFilterPost = (jsdom, selector) => {
    console.log(jsdom.window.document.querySelector(selector)?.textContent)
    return (jsdom.window.document.querySelector(selector)?.textContent === 'Конкурс завершен')
}

const getInfoPosts = (links) => {
    return links.map(async (link) => {
        const jsdom = await getHTML(link);
        const {title} = querySelectors;

        const namePost = getDataBySelector(jsdom, title);

        console.log(namePost)
        // если в посте нет тега с тексто "Конкурс завершен" - отправляем пост дальше
        if(!getFilterPost(jsdom, 'p[style="font-style: italic;"]')){
            return definePostDescription(defineTypePost(namePost), jsdom, querySelectors, link);
        }

    });
};

const getPostLazyLoading = async (page, url, querySelectors) => {
    const jsdom = await getHTML(url + `page/${page}`);
    const links = getLinksPosts(jsdom, querySelectors.link, '');

    return getInfoPosts(links).map(promise => promise?.then(res => res))

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
    const receivedPosts = await Promise.all( await getPostLazyLoading(page, url, querySelectors));

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
