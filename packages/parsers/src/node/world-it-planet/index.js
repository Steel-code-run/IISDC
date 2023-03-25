const {getHTML} = require('../../utils/getHTML.js');
const {getDataBySelector, getLinksPDF} = require("../../utils/methodsParser");
const {DirectionType} = require("@iisdc/types");


const url = 'https://world-it-planet.org/';

const querySelectors = {
    title: 'h1.registration-panel-title',
    text: 'div.goal-panel-text div.desc p',
    deadline: 'div:nth-of-type(1).steps--single div.head div.date',
    linkPDF: 'div.footer--press-col.footer--col div:nth-of-type(2) a'

};


(async function main() {
    const jsdom = await getHTML(url);

    const fullText = getDataBySelector(jsdom, querySelectors.text);
    const title = getDataBySelector(jsdom, querySelectors.title);
    const deadline = getDataBySelector(jsdom, querySelectors.deadline);
    const linkPDF = getLinksPDF(jsdom, querySelectors.linkPDF)

    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: title,
            dateCreationPost: '',
            deadline: deadline,
            direction: [DirectionType.IT],
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
