const {getHTML} = require('../../utils/getHTML.js');
const {
    defineTypePost
} = require('../../utils/methodsParser.js');


const url = 'https://oreluniver.ru/international/connections/grants';
const baseUrl = 'https://oreluniver.ru';

const querySelectors = {
    title: 'a',
    link: 'a',
    deadline: 'a strong',
    post: 'div.page-content > ul li'
};

const getPosts = (jsdom, selector) => {
    return jsdom.window.document.querySelectorAll(selector)
}

const getInfoPost = (post, selectors) => {
    const newArr = Array.from(post).slice(0, 40)
    return newArr.map(post => {
        return {
            title: post.querySelector(selectors.title)?.textContent,
            deadline: post.querySelector(selectors.deadline)?.textContent,
            link: baseUrl + post?.querySelector(selectors.link)?.getAttribute('href')
        }
    })
}


const filterPosts = (posts) => {
    return posts.filter((post) => post.postType !== 'other')
};

(async function main() {
    const jsdom = await getHTML(url);
    const posts = getInfoPost(getPosts(jsdom, querySelectors.post), querySelectors);


    const receivedPosts = posts.map(post => {
        const namePost = post.title;
        switch (defineTypePost(namePost)) {
            case 'grant':
                return {
                    postType: 'grant',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: '',
                        directionForSpent: "",
                        summary: '',
                        fullText: '',
                        deadline: post.deadline,
                        linkPDF: post.link,
                        link: '',
                    },

                };
            case 'competition':
                return {
                    postType: 'competition',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: '',
                        deadline: post.deadline,
                        direction: 'направление',
                        fullText:  '',
                        link: post.link,
                    },
                };
            case 'vacancy':
                return {
                    postType: 'vacancy',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: '',
                        direction: '',
                        fullText: '',
                        organization: "Организация",
                        conditions: "Условия",
                        requirements: "Требования",
                        responsibilities: "Обязанности",
                        salary: "Зарплата",
                        link: post.link,
                    },
                };
            case 'internship':
                return {
                    postType: 'internship',
                    postDescription: {
                        namePost: post.title,
                        dateCreationPost: '',
                        direction: '',
                        fullText: '',
                        organization: "Организация",
                        conditions: "Условия",
                        requirements: "Требования",
                        responsibilities: "Обязанности",
                        salary: "Зарплата",
                        link: post.link,
                    },
                };
            case 'other':
                return {
                    postType: 'other',
                }
        }
    });

    try {
        console.log(
            JSON.stringify(filterPosts(receivedPosts), null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
