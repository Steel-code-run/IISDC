const page = process.argv[2] || 1;

const {getHTML} = require('../../utils/getHTML');
const {keyWords, exceptionWords} = require('../../utils/wordsForParsers');

const url = 'https://integraciya.org/konkursy/';
const baseUrl = 'https://integraciya.org';

const querySelectors = {
    title: 'strong.name',
    link: 'a.contest_a',
    // date: 'span.ico_clock b',
    text: 'table.contest_more_cont tbody tr td ~ td',
    deadline: 'div.date2'
};


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

// const getDatesPosts = (jsdom, querySelector) => {
//     return (
//         jsdom.window.document.querySelector(querySelector)?.textContent ?? ''
//     );
// };

const getTextPosts = (jsdom, querySelector) => {
    return (
        jsdom.window.document.querySelector(querySelector)?.textContent ?? ''
    );
};

const getDeadlinePosts = (jsdom, querySelector) => {
    return (
        jsdom.window.document.querySelector(querySelector)?.textContent ?? ''
    );
}

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
        const { title, text, deadline } = querySelectors;

        return {
            namePost: getNamePosts(jsdom, title),
            // dateCreationPost: getDatesPosts(jsdom, date),
            summary: getSummaryGrant(jsdom, text),
            deadline: getDeadlinePosts(jsdom, deadline),
            fullText: getTextPosts(jsdom, text).replaceAll('\n', ''),
            link,
        };
    });
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

(async function main(){
    const jsdom = await getHTML(url);
    const links = getLinksPosts(jsdom, querySelectors.link);
    const gottenPosts = await Promise.all(getInfoPosts(links));

    try {
        console.log(
            JSON.stringify({
                type: 'grant',
                parseErrors: ['Ошибка 20000000000000'],
                posts: filterPosts(gottenPosts),
            })
        );
    } catch(error) {
        console.log(error);
    }
})()
