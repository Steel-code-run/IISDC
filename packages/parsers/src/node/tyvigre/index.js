const {getHTML} = require('../../utils/getHTML.js');
const {getDataBySelector, getLinksPDF} = require("../../utils/methodsParser");

const url = 'https://tyvigre.ru/';

const querySelectors = {
    title: 'h1.contest__title',
    text: 'p.about__text-p',
    deadline: 'div.stages__row.row-begin div:nth-of-type(2).stages__item.stages__item-active div.stages__date',
    summary: 'div.prize-text',
    linkPDF: 'li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-360 a'
};

(async function main() {
    const jsdom = await getHTML(url);

    const fullText = getDataBySelector(jsdom, querySelectors.text);
    const title = getDataBySelector(jsdom, querySelectors.title);
    const deadline = getDataBySelector(jsdom, querySelectors.deadline);
    const summary = getDataBySelector(jsdom, querySelectors.summary);
    const linkPDF = getLinksPDF(jsdom, querySelectors.linkPDF, '')


    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: title,
            dateCreationPost: '',
            deadline: deadline,
            direction: [''],
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
