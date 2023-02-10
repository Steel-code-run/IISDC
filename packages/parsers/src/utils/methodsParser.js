export const getLinksPosts = (jsdom, querySelector, url) => {
    return Array.from(
        jsdom.window.document.querySelectorAll(querySelector)
    ).map((link) => url + link.getAttribute('href'));
};
export const getLinksPDF = (jsdom, querySelector, url) => {
    return Array.from(
        jsdom.window.document.querySelectorAll(querySelector)
    ).map((link) => {
        if(link.getAttribute('href').includes('http')) return link.getAttribute('href');
        return url + link.getAttribute('href');
    });
};
export const getDataBySelector = (jsdom, querySelector) => {
    return jsdom.window.document.querySelector(querySelector)?.textContent ?? '';
}

export const getSummaryGrant = (jsdom, querySelector) => {
    const fullText = getDataBySelector(jsdom, querySelector);
    const regex =
        /(?<=Максимальный размер гранта | Сумма гранта | грант до | грант в ).*/gi;
    const result = fullText.match(regex);

    return result ? result[0].replaceAll(/^- |^– /g, '') : '';
};

export const defineTypePost = (namePost) => {
    const keyWords = {
        grant: ['грант', 'гранты', 'гранта', 'грантом', 'гранту', 'субсидия', 'субсидии', 'субсидию', 'субсидией', 'субсидию'],
        competition: ['конкурс', 'конкурсы', 'конкурса', 'конкурсом', 'конкурсу'],
        vacancy: ['вакансия', 'вакансии', 'вакансию', 'вакансией', 'вакансию'],
        internship: ['стажировка', 'стажировки', 'стажировку', 'стажировкой', 'стажировке'],
    }

    for (const [key, value] of Object.entries(keyWords)) {
        if (value.some((word) => namePost.toLowerCase().includes(word))) {
            return key;
        }
    }
    return 'other';
}

export const definePostDescription = (postType, jsdom, querySelectors, link) => {
    switch (postType) {
        case 'grant':
            return {
                postType: 'grant',
                postDescription: {
                    namePost: getDataBySelector(jsdom, querySelectors.title),
                    dateCreationPost: getDataBySelector(jsdom, querySelectors.date),
                    summary: getSummaryGrant(jsdom, querySelectors.text),
                    fullText: getDataBySelector(jsdom, querySelectors.text).replaceAll('\n', ''),
                    deadline: getDataBySelector(jsdom, querySelectors.deadline),
                    link,
                },

            };
        case 'competition':
            return {
                postType: 'competition',
                postDescription: {
                    namePost: getDataBySelector(jsdom, querySelectors.title),
                    dateCreationPost: getDataBySelector(jsdom, querySelectors.date),
                    deadline: getDataBySelector(jsdom, querySelectors.deadline),
                    direction: 'направление',
                    fullText: getDataBySelector(jsdom, querySelectors.text).replaceAll('\n', ''),
                    link,
                },
            };
        case 'vacancy':
            return {
                postType: 'vacancy',
                postDescription: {
                    namePost: getDataBySelector(jsdom, querySelectors.title),
                    dateCreationPost: getDataBySelector(jsdom, querySelectors.date),
                    direction: getDataBySelector(jsdom, querySelectors.text),
                    fullText: getDataBySelector(jsdom, querySelectors.text).replaceAll('\n', ''),
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
                    namePost: getDataBySelector(jsdom, querySelectors.title),
                    dateCreationPost: getDataBySelector(jsdom, querySelectors.date),
                    direction: getDataBySelector(jsdom, querySelectors.text),
                    fullText: getDataBySelector(jsdom, querySelectors.text).replaceAll('\n', ''),
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
