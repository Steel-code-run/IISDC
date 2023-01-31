import {getHTML} from "../utils/getHTML.js";

const url = 'https://fasie.ru/press/'
const baseUrl = 'https://fasie.ru';

const querySelectors = {
    title: 'li.tile_block_x1 h5',
    link: 'ul.tile_blocks a',
    date: 'li.tile_block_x1 p span.ico_clock b',
}

const getNamePosts = (jsdom, querySelector) => {
    return Array.from(jsdom.window.document.querySelectorAll(querySelector)).map((title) => title.textContent);
}

const getLinksPosts = (jsdom, querySelector) => {
    return Array.from(jsdom.window.document.querySelectorAll(querySelector)).map((link) => baseUrl + link.getAttribute('href'));
}

const getDatesPosts = (jsdom, querySelector) => {
    return Array.from(jsdom.window.document.querySelectorAll(querySelector)).map((date) => date.textContent);
}

const getTextPosts = (links) => {
    return links.map(async (link) => {
        const jsdom = await getHTML(link);
        const querySelector = 'div[itemprop="text"]';
        return Array.from(jsdom.window.document.querySelectorAll(querySelector)).map((text) => text.textContent);
    })

}

const getPostLazyLoading = async (totalPosts, url, querySelector) => {
    for(let i = 0; i < totalPosts; i++) {
        const jsdom = await getHTML(`${url}?ajax=Y&ajax=Y&PAGEN_1=${i}`);
        const title = getNamePosts(jsdom, querySelector.title);
        const date = getDatesPosts(jsdom, querySelector.date);
        const links = getLinksPosts(jsdom, querySelector.link);
        const text = await Promise.all(getTextPosts(links));
        console.log(title, date, links, text);
    }
}

getPostLazyLoading(2, url, querySelectors);

//
// console.log(getNamePosts(jsdom, querySelectors.title));
// console.log(getLinksPosts(jsdom, querySelectors.title));
// console.log(getDatesPosts(jsdom, querySelectors.date));
// console.logwait Promise.all(getTextPosts(getLinksPosts(jsdom, querySelectors.title)))(a);
