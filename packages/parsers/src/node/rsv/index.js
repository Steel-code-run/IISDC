const {getHTML} = require('../../utils/getHTML.js');
const {
    getLinksPosts
} = require('../../utils/methodsParser.js');
const {getInfoPosts} = require("../../utils/methodsParser");

const page = process.argv[2] || 1;


const baseUrl = 'https://rsv.ru';
const url = 'https://rsv.ru/competitions/'

const querySelectors = {
    title: 'h3.project_detail-title',
    link: 'a.project_list-items-item.project_list-items-item-registration_open',
    text: 'div.content p',
};


const filterPosts = (posts) => {
    return posts
        .filter((post) => post.postType !== 'other')
};

(async function main() {
    const jsdom = await getHTML(url)
    const links = getLinksPosts(jsdom, querySelectors.link, baseUrl);

    const receivedPosts = await getInfoPosts(querySelectors, links)

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
