const {getHTML} = require("../../utils/getHTML");

const page = process.argv[2] || 1;

const url = 'https://rscf.ru/contests';
const baseUrl = 'https://rscf.ru';
const querySelectors = {
    title: 'div.classification-parent-row.contest-table-row div.contest-name',
    date: 'div.contest-date span.contest-success',
    status: 'div.contest-status ul.contest-list li span.contest-danger',
    linkPDF: 'div.contest-docs ul.contest-list li:nth-of-type(2) a.contest-link',
    post: 'div.classification-table-row'
};

const getInfoPosts = async (posts, link) => {
    const postsInfo = [];
    for(let i = 0; i < posts.length; i++) {
        const status = posts[i].querySelector(querySelectors.status);
        if(status) postsInfo.push('Завершен')
        else postsInfo.push({
            postType: 'competition',
            postDescription: {
                namePost: posts[i].querySelector(querySelectors?.title)?.textContent,
                dateCreationPost: '',
                deadline: posts[i].querySelector(querySelectors?.date)?.textContent,
                direction: [],
                fullText: '',
                linkPDF: baseUrl + posts[i].querySelector(querySelectors?.linkPDF)?.href,
                link: link,
            }
        })
    }
    postsInfo.shift();
    return postsInfo

}
const getPosts = (jsdom, querySelector) => {
    return Array.from(jsdom.window.document.querySelectorAll(querySelector))
}


const getPostLazyLoading = async (pages, url, querySelectors) => {
    const result = []
    for (let index = pages; index <= pages; index++) {
        const link = `${url}/?PAGEN_2=${index}&bxajaxid=12df1c361989eba1a2fed00c82d76c04`
        const jsdom = await getHTML(link);
        const posts = getPosts(jsdom, querySelectors.post);
        result.push(...(await getInfoPosts(posts, url)));
    }

    return result
};

const filterPosts = (posts) => posts.filter(post => post !== 'Завершен');


(async function main() {
    const receivedPosts = await getPostLazyLoading(page, url, querySelectors);

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()



