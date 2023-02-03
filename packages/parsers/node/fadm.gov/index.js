const {getHTML} = require('../utils/getHTML');

const url = 'https://fadm.gov.ru/news/';
const baseUrl = 'https://fadm.gov.ru';

const querySelectors = {
    title: 'h2.news__title',
    link: 'a.news-mini.news-catalog__mini',
    date: 'span.date',
    text: 'div.news__wrap',
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
        const { title, date, text } = querySelectors;

        return {
            namePost: getNamePosts(jsdom, title),
            dateCreationPost: getDatesPosts(jsdom, date),
            summary: getSummaryGrant(jsdom, text),
            fullText: getTextPosts(jsdom, text).replaceAll('\n', ''),
            link,
        };
    });
};

const getPostLazyLoading = async (totalPage, url, querySelectors) => {
    const posts = [];

    for (let i = 0; i < totalPage; i++) {
        const jsdom = await getHTML(`${url}?PAGEN_1=${i}`);

        const links = getLinksPosts(jsdom, querySelectors.link);
        try {
           getInfoPosts(links).forEach((post) => {
               console.log(post)
               post.then((data) => {
                     posts.push(data);
               });
           })
        }
        catch (e) {
            console.log('error', e);
        }
    }
    return posts;
};

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

getPostLazyLoading(1, url, querySelectors).then((posts) => {
    console.log(
        JSON.stringify({
            type: 'grant',
            parseErrors: ['Ошибка 20000000000000'],
            posts: filterPosts(posts),
        })
    );
}).catch((error) => {
    console.log(error);
})
