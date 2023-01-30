import {getPostsChannel, TPostsChannel} from "./getPostsChannel";

const options = {
    nameUrl: 'https://t.me/cptgrantov',
    limit: 7,
    offset: 0,
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
    const regExp = /(в области|по направлению|по следующим направлениям) .*?(?=\d|\.)/gim;
    const result = post.text.match(regExp);
    return result ? result[0] : '';

}

const getOrganization = (post: TPostsChannel) => {
    const regExp = /(?<=Организатор: ).*?(?=$)/gim;
    const result = post.text.match(regExp);
    return result ? result[0] : '';
}

const getDeadline = (post: TPostsChannel) => {
    const regExp = /(?<=Дедлайн: ).*?(?=$)/gim;
    const result = post.text.match(regExp);
    return result ? result[0] : '';
}

const getSummary = (post: TPostsChannel) => {
    const regExp = /(?:\d{1,6} ){1,4}(рублей|руб\.*|миллионов|млн\.*) *(рублей|руб\.*)* *(ежегодно|ежемесячно|в год| раз в месяц| раз в год)*/gmi;
    const result = post.text.match(regExp);
    return result ? result[0] : '';
}

getPostsChannel(options)
    .then((data) => {
        // console.log(JSON.stringify(data))

        const filterPosts = isFilterPosts(data);
        console.log(
            JSON.stringify({
                type: 'grant',
                parseErrors: ['Ошибка 20000000000000'],
                posts: filterPosts.map((post: TPostsChannel) => {
                    return {
                        direction: getDirection(post),
                        organization: getOrganization(post),
                        summary: getSummary(post),
                        deadline: getDeadline(post),
                        fullText: post.html,
                        link: options.nameUrl + '/' + post.id
                    }
                }),
            })
        );

    })
    .catch((err) => {
        console.log(err)
    });



