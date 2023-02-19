const {exceptionWords, keyWords} = require("../../utils/wordsForParsers.js");
const {getInfoPosts} = require("../../utils/methodsParser");

const baseUrl = 'https://news.tvoyhod.online/';
const url = baseUrl

const querySelectors = {
    title: 'h1.js-feed-post-title',
    link: 'div.js-feed-post.t-feed__post a.js-feed-post-link',
    text: 'div[id="feed-text"]',
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
    const dataApi = (await fetch("https://feeds.tildacdn.com/api/getfeed/?feeduid=265132358761&recid=345765238&c=1676818763756&size=&slice=1&sort%5Bdate%5D=desc&filters%5Bdate%5D=&getparts=true", {
        "headers": {
            "accept": "*/*",
            "accept-language": "ru,en;q=0.9",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Yandex\";v=\"23\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
        "referrer": "https://news.tvoyhod.online/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    }).then( (data) => data.json()));
    const links = JSON.parse(JSON.stringify(dataApi)).posts.map(post => post.url)

    const receivedPosts = await getInfoPosts(querySelectors, baseUrl, links);

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
