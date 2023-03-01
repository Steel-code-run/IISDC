const {getHTML} = require("./getHTML");
const getLinksPosts = (jsdom, querySelector, url = '') => {
    return Array.from(jsdom.window.document.querySelectorAll(querySelector))
        .filter(link => link.hasAttribute('href'))
        .map((link) => url + link.getAttribute('href'))
};
const getLinksPDF = (jsdom, querySelector, url) => {
    return Array.from(
        jsdom.window.document.querySelectorAll(querySelector)
    ).map((link) => {
        if(link.getAttribute('href').includes('http')) return link.getAttribute('href');
        return url + link.getAttribute('href');
    });
};
const getDataBySelector = (jsdom, querySelector) => {
    const arr_tags = Array.from(jsdom.window.document.querySelectorAll(querySelector))
    return arr_tags.map(data => data?.textContent).join('')
}

const getSummaryGrant = (jsdom, querySelector) => {
    const fullText = getDataBySelector(jsdom, querySelector);
    const regex =
        /(?<=Максимальный размер гранта | Сумма гранта | грант до | грант в ).*/gi;
    const result = fullText.match(regex);

    return result ? result[0].replaceAll(/^- |^– /g, '') : '';
};

const defineTypePost = (namePost) => {
    const keyWords = {
        grant: ['грант', 'гранты', 'гранта', 'грантом', 'гранту', 'субсидия', 'субсидии', 'субсидию', 'субсидией', 'субсидию'],
        competition: ['конкурс', 'конкурсы', 'конкурса', 'конкурсом', 'конкурсу', 'чемпионат'],
        vacancy: ['вакансия', 'вакансии', 'вакансию', 'вакансией', 'вакансию'],
        internship: ['стажировка', 'стажировки', 'стажировку', 'стажировкой', 'стажировке'],
    }

    for (const [key, value] of Object.entries(keyWords)) {
        if (value?.some((word) => namePost?.toLowerCase()?.includes(word))) {
            return key;
        }
    }
    return 'other';
}

const definePostDescription = (postType, jsdom, querySelectors, link, url) => {
    switch (postType) {
        case 'grant':
            return {
                postType: 'grant',
                postDescription: {
                    namePost: getDataBySelector(jsdom, querySelectors?.title),
                    dateCreationPost: getDataBySelector(jsdom, querySelectors?.date),
                    directionForSpent: "",
                    summary: getSummaryGrant(jsdom, querySelectors?.text),
                    fullText: getDataBySelector(jsdom, querySelectors?.text).replaceAll('\n', ''),
                    deadline: getDataBySelector(jsdom, querySelectors?.deadline),
                    linkPDF: getLinksPDF(jsdom, querySelectors?.linkPDF, url),
                    link,
                },

            };
        case 'competition':
            return {
                postType: 'competition',
                postDescription: {
                    namePost: getDataBySelector(jsdom, querySelectors?.title),
                    dateCreationPost: getDataBySelector(jsdom, querySelectors?.date),
                    deadline: getDataBySelector(jsdom, querySelectors?.deadline),
                    direction: 'направление',
                    fullText: getDataBySelector(jsdom, querySelectors?.text).replaceAll('\n', ''),
                    linkPDF: getLinksPDF(jsdom, querySelectors?.linkPDF, url),
                    link,
                },
            };
        case 'vacancy':
            return {
                postType: 'vacancy',
                postDescription: {
                    namePost: getDataBySelector(jsdom, querySelectors?.title),
                    dateCreationPost: getDataBySelector(jsdom, querySelectors?.date),
                    direction: getDataBySelector(jsdom, querySelectors?.text),
                    fullText: getDataBySelector(jsdom, querySelectors?.text).replaceAll('\n', ''),
                    organization: "Организация",
                    conditions: "Условия",
                    requirements: "Требования",
                    responsibilities: "Обязанности",
                    salary: "Зарплата",
                    link,
                },
            };
        case 'internship':
            return {
                postType: 'internship',
                postDescription: {
                    namePost: getDataBySelector(jsdom, querySelectors?.title),
                    dateCreationPost: getDataBySelector(jsdom, querySelectors?.date),
                    direction: getDataBySelector(jsdom, querySelectors?.text),
                    fullText: getDataBySelector(jsdom, querySelectors?.text).replaceAll('\n', ''),
                    organization: "Организация",
                    conditions: "Условия",
                    requirements: "Требования",
                    responsibilities: "Обязанности",
                    salary: "Зарплата",
                    link,
                },
            };
        case 'other':
            return {
                postType: 'other',
            }
    }
}


//Telegram

const getDateCreationPost = (post) => {
    const time = new Date(post.date * 1000).getTime();
    return new Date(time).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
};

const getDirection = (post) => {
    const regExp =
        /(в области|по направлению|по следующим направлениям) .*?(?=\d|\.)/gim;
    const result = post.text.match(regExp);
    return result ? result[0] : '';
};

const getNamePost = (post) => {
    const regExp = /^.*/gi;
    const result = post.text.match(regExp);
    return result ? result[0] : '';
};

const getOrganization = (post) => {
    const regExp = /(?<=Организатор: ).*?(?=$)/gim;
    const result = post.text.match(regExp);
    return result ? result[0] : '';
};

const getDeadline = (post) => {
    const regExp = /(?<=Дедлайн: ).*?(?=$)/gim;
    const result = post.text.match(regExp);
    return result ? result[0] : '';
};

const getSummary = (post) => {
    const regExp =
        /(?:\d{1,6} ){1,4}(рублей|руб\.*|миллионов|млн\.*) *(рублей|руб\.*)* *(ежегодно|ежемесячно|в год| раз в месяц| раз в год)*/gim;
    const result = post.text.match(regExp);
    return result ? result[0] : '';
};

const defineTypeDescriptionTelegram = (postType, post, link) => {
    switch(postType) {
        case 'grant':
            return {
                postType: 'grant',
                postDescription: {
                    namePost: getNamePost(post),
                    dateCreationPost: getDateCreationPost(post),
                    summary: getSummary(post),
                    fullText: post.text,
                    deadline: getDeadline(post),
                    organization: getOrganization(post),
                    direction: getDirection(post),
                    directionForSpent: "",
                    link,
                },
            };
        case 'competition':
            return {
                postType: 'competition',
                postDescription: {
                    namePost: getNamePost(post),
                    dateCreationPost: getDateCreationPost(post),
                    deadline: getDeadline(post),
                    direction: getDirection(post),
                    fullText: post.text,
                    link,
                    organization: getOrganization(post),

                },
            };
        case 'vacancy':
            return {
                postType: 'vacancy',
                postDescription: {
                    namePost: getNamePost(post),
                    dateCreationPost: getDateCreationPost(post),
                    direction: getDirection(post),
                    fullText: post.text,
                    organization: getOrganization(post),
                    conditions: "",
                    requirements: "",
                    responsibilities: "",
                    salary: "",
                    link,
                }
            };
        case 'internship':
            return {
                postType: 'internship',
                postDescription: {
                    direction: getDirection(post),
                    requirements: "",
                    responsibilities: "",
                    conditions: "",
                    salary: "",
                    fullText: post.text,
                    namePost: getNamePost(post),
                    dateCreationPost: getDateCreationPost(post),
                    organization: getOrganization(post),
                    link,
                }
            };
        case 'other':
            return {
                postType: 'other',
            }

    }
}

const getInfoPosts = async (querySelectors, links, baseUrl = '' ) => {
    const result = []

    for (let index in links) {
        const jsdom = await getHTML(links[index])
        const {title} = querySelectors;

        const namePost = getDataBySelector(jsdom, title);
        result.push(definePostDescription(defineTypePost(namePost), jsdom, querySelectors, links[index], baseUrl));
    }

    return result
}
const convertJson = (json) => {
    return JSON.parse(JSON.stringify(json))
}

const clearString = (string) => {
    return string.replaceAll(/[\n\r\t]/g, '')
}
module.exports = {
    getDirection,
    defineTypePost,
    defineTypeDescriptionTelegram,
    getDataBySelector,
    getSummaryGrant,
    getSummary,
    getOrganization,
    getDeadline,
    getNamePost,
    getDateCreationPost,
    getLinksPosts,
    getLinksPDF,
    definePostDescription,
    clearString,
    getInfoPosts,
    convertJson
}