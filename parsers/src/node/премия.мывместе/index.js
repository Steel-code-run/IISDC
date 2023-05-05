const {getHTML} = require('../../utils/getHTML.js');
const {getDataBySelector, getLinksPDF} = require("../../utils/methodsParser");


const url = 'https://премия.мывместе.рф/';

const querySelectors = {
    title: 'div[field="tn_text_1676534521714"].tn-atom span',
    deadline: 'div[data-elem-id="1676542437299"].t396__elem.tn-elem.tn-elem__5516388321676542437299 div[field="tn_text_1676542437299"].tn-atom',
    linkPDF: 'div[data-elem-id="1677684163709"].t396__elem.tn-elem a.tn-atom',
    text: 'div[field="tn_text_1676534521737"]'

};


(async function main() {
    const jsdom = await getHTML(url);

    const title = getDataBySelector(jsdom, querySelectors.title);
    const deadline = getDataBySelector(jsdom, querySelectors.deadline);
    const linkPDF = getLinksPDF(jsdom, querySelectors.linkPDF)
    const fullText = getDataBySelector(jsdom, querySelectors.text)


    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: title,
            dateCreationPost: '',
            deadline: deadline,
            direction: '',
            fullText:fullText,
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
