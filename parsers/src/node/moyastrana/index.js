const {getHTML} = require('../../utils/getHTML.js');
const {getDataBySelector, getLinksPDF} = require("../../utils/methodsParser");


const url = 'https://www.moyastrana.ru';

const querySelectors = {
    title: 'h1.intro__title',
    text: 'div.info__left p',
    deadline: 'div.tab-item.tab-item--1 div.tab-item__date',
    linkPDF: 'div.tab-item.tab-item--1 div:nth-of-type(4) a.tab-item__link'

};


(async function main() {
    const jsdom = await getHTML(url);

    const fullText = getDataBySelector(jsdom, querySelectors.text);
    const title = getDataBySelector(jsdom, querySelectors.title);
    const deadline = getDataBySelector(jsdom, querySelectors.deadline);
    const linkPDF = getLinksPDF(jsdom, querySelectors.linkPDF, url)


    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: title,
            dateCreationPost: '',
            deadline: deadline,
            direction: [''],
            fullText: fullText,
            linkPDF: linkPDF,
            summary: '',
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
