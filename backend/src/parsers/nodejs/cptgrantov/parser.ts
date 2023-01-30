import {getPostsChannel, TPostsChannel} from "./getPostsChannel";

const options = {
    nameUrl: 'https://t.me/cptgrantov',
    limit: 7,
    offset: 0,
}

const querySelectors = {
    direction: "",
    organization: "",
    timeOfStart: "",
    summary: "",
    timeOfEnd: "",
    description: "",
    fullText: "",
    link: ""
}
const keyWords = ['гранты', 'грант', 'гранту', 'грантам', 'грантом', 'гранте']
const exceptionWords = ['вебинар', 'вебинара', 'вебинару', 'вебинар', 'вебинаром',
    'вебинаре', 'вебинары', 'вебинаров', 'вебинарам', 'вебинары', 'вебинарами', 'вебинарах',
    'Традиционная образовательная подборка: ']

const isFilterPosts = (posts: TPostsChannel[]) => {
    return posts.filter((post: TPostsChannel) => {
        return keyWords.some((keyWord: string) => {
            return post.text.toLowerCase().includes(keyWord.toLowerCase())
        })
    })
        .filter((post: TPostsChannel) => {
            return exceptionWords.every((exceptionWord: string) => {
                return !post.text.toLowerCase().includes(exceptionWord.toLowerCase())
            })
        })
}

const getDirection = (post: TPostsChannel) => {
    const regExp = /(в области | по направлению | )/gi;
    const result = post.text.match(regExp);
    return result ? result[0] : '';

}

getPostsChannel(options)
    .then((data) => {
        console.log(JSON.stringify(data))

        const filterPosts = isFilterPosts(data);
        console.log(filterPosts, filterPosts.length)

    })
    .catch((err) => {
        console.log(err)
    });



