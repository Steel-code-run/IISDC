const page = process.argv[2] || 1;

const {getHTML} = require('../../utils/getHTML');

const url = 'https://minobrnauki.gov.ru/grants/grants/';
const baseUrl = 'https://minobrnauki.gov.ru';

const querySelectors = {
    title: 'article.post h1',
    link: 'a.grants-card',
    date: 'span.post-date-day',
    text: 'div.post-body div b',
    linkPDF: 'div.post-body a:not([href="/grants/grants/"])',
};

const exceptionWords = [
    'результаты',
    'результат',
    'результатам',
    'результату',
    'результатов',
    'итоги',
    'подведены итоги',
    'итог',
    'вебинар',
    'вебинары',
    'победитель',
    'победители',
    'победителя',
    'победителей',
    'победителю',
    'победителям',
    'победителем',
    'победителе',
    'победителями',
    'победителях',
    'посетил ',
    'посетила ',
    'посетили ',
    'посетит ',
    'встреча ',
    'финал',
];

const keyWords = [
    'гранты',
    'грант ',
    'гранту',
    'грантам',
    'грантом',
    'гранте',
    'приём заявок',
    'прием заявок',
    'запуск конкурса',
    'конкурс ',
    'конкурсы ',
    'конкурса',
    'конкурсу',
    'конкурсом',
    'конкурсе',
    'конкурсам',
    'конкурсами',
    'конкурсах',
    'конкурсов',
    'на реализацию',
];

const getNamePosts = (jsdom, querySelector) => {
    return (
        jsdom.window.document.querySelector(querySelector)?.textContent ?? ''
    );
};

const getLinksPosts = (jsdom, querySelector) => {
    return Array.from(
        jsdom.window.document.querySelectorAll(querySelector)
    ).map((link) => baseUrl + link.getAttribute('href'));
};

const getLinksPDF = (jsdom, querySelector) => {
    return Array.from(
        jsdom.window.document.querySelectorAll(querySelector)
    ).map((link) => {
        if(link.getAttribute('href').includes('http')) return link.getAttribute('href');
        return baseUrl + link.getAttribute('href');
    });
};

const getDatesPosts = (jsdom, querySelector) => {
    return (
        jsdom.window.document.querySelector(querySelector)?.textContent ?? ''
    );
};

const getTextPosts = (jsdom, querySelector) => {
    return (
        jsdom.window.document.querySelector(querySelector)?.textContent ?? ''
    );
};

const getSummaryGrant = (jsdom, querySelector) => {
    const fullText = getTextPosts(jsdom, querySelector);
    const regex =
        /(?<=Максимальный размер гранта | Сумма гранта | грант до | грант в ).*/gi;
    const result = fullText.match(regex);

    return result ? result[0].replaceAll(/^- |^– /g, '') : '';
};

const getInfoPosts = (links) => {
    return links.map(async (link) => {
        const jsdom = await getHTML(link);
        const { title, date, text, linkPDF } = querySelectors;

        return {
            namePost: getNamePosts(jsdom, title),
            dateCreationPost: getDatesPosts(jsdom, date),
            summary: getSummaryGrant(jsdom, text),
            fullText: getTextPosts(jsdom, text).replaceAll('\n', ''),
            linkPDF: getLinksPDF(jsdom, linkPDF),
            link,
        };
    });
};

// const getPostLazyLoading = async (totalPage, url, querySelectors) => {
//     const posts = [];
//
//     for (let i = 0; i < totalPage; i++) {
//         const jsdom = await getHTML(`${url}?ajax=Y&PAGEN_1=${i}`);
//         const links = getLinksPosts(jsdom, querySelectors.link);
//         posts.push(...(await Promise.all(getInfoPosts(links))).slice(0, -1));
//     }
//     return posts;
// };

const filterPosts = (posts) => {
    return posts
        .filter((post) => {
            const { namePost } = post;

            return keyWords.some(
                (word) => namePost.toLowerCase().includes(word)
                // text.toLowerCase().includes(word)
            );
        })
        .filter((post) => {
            const { namePost } = post;

            return exceptionWords.every((word) => {
                return !namePost.toLowerCase().includes(word);
            });
        });
};

(async function main(){
    const jsdom = await getHTML(url);
    const links = getLinksPosts(jsdom, querySelectors.link);

    const gottenPosts = await Promise.all(getInfoPosts(links));

    try {
        console.log(
            JSON.stringify({
                type: 'grant',
                parseErrors: ['Ошибка 20000000000000'],
                posts: gottenPosts,
            })
        );
    } catch(error) {
        console.log(error);
    }
})()
