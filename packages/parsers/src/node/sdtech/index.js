const {getHTML} = require('../../utils/getHTML.js');
const {getLinksPosts} = require('../../utils/methodsParser.js');
const {getInfoPosts, getDataBySelector, getLinksPDF} = require("../../utils/methodsParser");
const {DirectionType, TPostType} = require("@iisdc/types");


const url = 'https://sdtech.sk.ru/';

const querySelectors = {
    title: 'div.main-banner__title',
    text: 'div.who-search__inner',
    deadline: 'div.time-element__date',
    summary: 'div.why-participate__item.light ul li strong',
    linkPDF: 'a.docs__link'

};


(async function main() {
    const jsdom = await getHTML(url);

    const fullText = getDataBySelector(jsdom, querySelectors.text);
    const title = getDataBySelector(jsdom, querySelectors.title);
    const deadline = getDataBySelector(jsdom, querySelectors.deadline);
    const summary = getDataBySelector(jsdom, querySelectors.summary);
    const linkPDF = getLinksPDF(jsdom, querySelectors.linkPDF, url)


    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: title,
            dateCreationPost: '',
            deadline: deadline,
            direction: [DirectionType.IT],
            fullText: fullText,
            linkPDF: linkPDF,
            summary: summary,
            link: url,
        },
    };


    try {
        console.log(
            JSON.stringify([parsedContent], null, 2)
        );
    } catch (error) {
        console.log(error);
    }
})()
