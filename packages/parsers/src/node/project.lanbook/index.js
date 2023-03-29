const {getHTML} = require('../../utils/getHTML.js');
const {getDataBySelector, getLinksPDF} = require("../../utils/methodsParser");
const {DirectionType} = require("@iisdc/types");


const url = 'https://project.lanbook.com';

const querySelectors = {
    title: 'div[data-elem-id="1666166616390"] div.tn-atom a',
    deadline: 'div[data-elem-id="1616060813497"].t396__elem.tn-elem.tn-elem__4188291491616060813497 div[field="tn_text_1616060813497"].tn-atom',
    linkPDF: 'div.t-col.t-col_8.t-prefix_2 div p a'

};


(async function main() {
    const jsdom = await getHTML(url);

    const title = getDataBySelector(jsdom, querySelectors.title);
    const deadline = getDataBySelector(jsdom, querySelectors.deadline);
    const linkPDF = getLinksPDF(jsdom, querySelectors.linkPDF, url)


    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: title,
            dateCreationPost: '',
            deadline: deadline,
            direction: [DirectionType.libraryScience],
            fullText: '',
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
