const {getHTML} = require('../../utils/getHTML.js');
const {
    definePostDescription,
    getLinksPosts
} = require('../../utils/methodsParser.js');

const page = process.argv[2] || 1;

const baseUrl = 'https://konkurs.rcfoundation.ru';
const url = 'https://konkurs.rcfoundation.ru/pages/fund-culture/contest-nko2023'

const querySelectors = {
    title: 'div.container > h1',
    link: 'li.buttons-list__item a.buttons-list__link',
    deadline: 'div.container h1:nth-of-type(2)',
};


const getInfoPosts = async (querySelectors, links) => {

    const result = []

    for (let index in links) {
        const jsdom = await getHTML(links[index])

        result.push(definePostDescription('competition', jsdom, querySelectors, links[index], baseUrl));

    }

    return result
}

const getPostLazyLoading = async (page, url, querySelectors) => {
    const jsdom = await getHTML(url);
    const links = getLinksPosts(jsdom, querySelectors.link, baseUrl);
    links.splice(0, links.length-1)

    return await getInfoPosts(querySelectors, links)

};

(async function main() {
    const receivedPosts = await getPostLazyLoading(page, url, querySelectors);
    receivedPosts.map(post => post.postDescription.direction = ['Библиотековедение'])

    try {
        console.log(
            JSON.stringify(receivedPosts, null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
