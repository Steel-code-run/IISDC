const {getHTML} = require('../../utils/getHTML.js');
const {getDataBySelector, getLinksPDF} = require("../../utils/methodsParser");


const url = 'http://inno-media.festivalnauki.ru/';

const querySelectors = {
    title: 'div.t338__title.t-title.t-title_xxs',
    text: 'div.t195__text.t-text.t-text_md',
    deadline: 'div:nth-of-type(1).t563__col.t-col.t-col_3 div.t563__text.t-text.t-text_xs',
    summary: '',
    linkPDF: 'a.t338__btn.t-btn.t-btn_md'

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
