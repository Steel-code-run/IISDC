import {getPostsChannel} from "~/src/parsers/nodejs/cptgrantov/getPostsChannel";

const options = {
    nameUrl: 'https://t.me/cptgrantov',
    limit: 10,
    offset: 0,
}

getPostsChannel(options).then((data) => {
    const posts = data.messages;
    console.log(JSON.stringify(posts));
}).catch(() => {
});