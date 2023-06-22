const {getHTML} = require('../../utils/getHTML.js');
const {getDataBySelector, getLinksPDF} = require("../../utils/methodsParser");
const {DirectionType} = require("../../types");;


const url = 'https://start.kontur.ru/';

const querySelectors = {
    title: 'div.section-block__content h1.t-preset-72.m-t-0.m-b-3',
    text: 'div.section-block__content p.t-large.m-b-5',
    deadline: 'div.section-block__content p.h4.m-b-3',
    linkPDF: 'div.section-block__footer a.button'

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
            direction: [DirectionType.Economy],
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
