const grantRegExp = /((грант)|(субсид)|(преми)|(проект)|(стартап)|(startup))/igm
const competitionRegExp = /(конкурс)|(олимп)|(хакат)/gim;
const vacancyRegExp = /(ваканс)/igm
const internshipRegExp = /(стажировк)/igm

const fullTextRegExp = {
    deadline :/(до|по) .*(\d{1,2}) ((янв|фев|мар|апр|май|июн|июл|авг|сент|окт|нояб|дек|)[а-яa-zA-ZА-Я]*)/gmi,
    directionForSpent : /(в области|по направлению|по следующим направлениям) .*?(?=\d|\.)/gim,
    summary : /(?:\d{1,6} ){1,4}(т\.*|тыс\.*|тысяч|рублей|руб\.*|миллионов|млн\.*) *(рублей|руб\.*)* *(ежегодно|ежемесячно|в год| раз в месяц| раз в год)*/gim,

    // Всё что нижу нужно доработать в процессе)
    requirements: /(требования)([\n:]*.{1,30}[\n\t]*){1,5}/gmi,
    responsibilities: /(обязанности)([\n:]*.{1,30}[\n\t]*){1,5}/gmi,
    conditions: /(условия)([\n:]*.{1,30}[\n\t]*){1,5}/gmi,
    salary: /(?:\d{1,6} ){1,4}(т\.*|тыс\.*|тысяч|рублей|руб\.*|миллионов|млн\.*) *(рублей|руб\.*)* *(ежегодно|ежемесячно|в год| раз в месяц| раз в год)*/gim,

}

const getDataBySelector = (dom, selector, regExp= undefined, regExpFlags = 'gmi') => {
    const data = dom.querySelector(selector)?.textContent;
    if (!data)
        return ''
    if (regExp) {
        const result = data.match(regExp, regExpFlags);
        return result ? result[0] : "";
    }
    return data
}

const getLinkPDF = (dom, selector) => {
    return dom.querySelector(selector)?.href;
}

const getLink = (dom, selector) => {
    return dom.querySelector(selector)?.href;
}

const isGrant = (namePost) => {
    if (!namePost)
        return false
    return namePost.toLowerCase().search(grantRegExp) !== -1;
}

const isCompetition = (namePost) => {
    if (!namePost)
        return false
    return namePost.toLowerCase().search(competitionRegExp) !== -1;
}

const isVacancy = (namePost) => {
    if (!namePost)
        return false
    return namePost.toLowerCase().search(vacancyRegExp) !== -1;
}

const isInternship = (namePost) => {
    if (!namePost)
        return false
    return namePost.toLowerCase().search(internshipRegExp) !== -1;
}

const getPostType = (namePost) => {
    if (isGrant(namePost)) {
        return 'grant';
    }
    if (isCompetition(namePost)) {
        return 'competition';
    }
    if (isVacancy(namePost)) {
        return 'vacancy';
    }
    if (isInternship(namePost)) {
        return 'internship';
    }
    return 'other';
}
const clearString = (string) => {
    return string?.replaceAll(/[\n\r\t]/g, '') ?? ''
}
const definePost = (description = {}) => {
    if (!description.postType) {
        description.postType = getPostType(description?.namePost);
    }
    switch (description.postType) {
        case 'grant':
            return {
                postType: 'grant',
                postDescription: {
                    namePost: description?.namePost,
                    dateCreationPost: description?.dateCreationPost,
                    summary: description?.summary,
                    fullText: description?.fullText,
                    deadline: description?.deadline,
                    organization: description?.organization,
                    direction: description?.direction,
                    directionForSpent: description?.directionForSpent,
                    link: description?.link,
                    linkPDF: description?.linkPDF,
                },
            };
        case 'competition':
            return {
                postType: 'competition',
                postDescription: {
                    deadline: description?.deadline,
                    direction: description?.direction,
                    fullText: description?.fullText,
                    namePost: description?.namePost,
                    dateCreationPost: description?.dateCreationPost,
                    organization: description?.organization,
                    link: description?.link,
                }
            };
        case 'vacancy':
            return {
                postType: 'vacancy',
                postDescription: {
                    direction: description?.direction,
                    requirements: description?.requirements,
                    responsibilities: description?.responsibilities,
                    conditions: description?.conditions,
                    salary: description?.salary,
                    fullText: description?.fullText,
                    namePost: description?.namePost,
                    dateCreationPost: description?.dateCreationPost,
                    organization: description?.organization,
                    link: description?.link,
                }
            }
        case 'internship':
            return {
                postType: 'internship',
                postDescription: {
                    requirements: description?.requirements,
                    responsibilities: description?.responsibilities,
                    conditions: description?.conditions,
                    salary: description?.salary,
                    direction: description?.direction,
                    fullText: description?.fullText,
                    namePost:description?.namePost,
                    dateCreationPost: description?.dateCreationPost,
                    organization: description?.organization,
                    link: description?.link,
                }
            }
        case 'other':
            return {
                postType: 'other',
            }
    }
}

module.exports = {
    definePost,
    getDataBySelector,
    getLinkPDF,
    getLink,
    clearString,
    getPostType,
    fullTextRegExp,
}