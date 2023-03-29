const {getHTML} = require('../../utils/getHTML.js');
const {getDataBySelector, getLinksPDF} = require("../../utils/methodsParser");
const {DirectionType} = require("@iisdc/types");


const url = 'https://smallhomeland.ru';

const querySelectors = {
    title: 'div.ul-slider-item-text h5',
    text: '',
    deadline: 'div.c-steps__elem-col__text.js-editable.normal.g-color-text-1',
    summary: '',
    linkPDF: 'a.ul-w-button1.middle'

};

const getTitleBySelector = (jsdom, querySelector) => {
    const arr_tags = Array.from(jsdom.window.document.querySelectorAll(querySelector))
    return arr_tags[0]?.textContent
}

(async function main() {
    const jsdom = await getHTML(url);

    const title = getTitleBySelector(jsdom, querySelectors.title);
    const deadline = getDataBySelector(jsdom, querySelectors.deadline);
    const linkPDF = getLinksPDF(jsdom, querySelectors.linkPDF, url)

    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: title,
            dateCreationPost: '',
            deadline: deadline,
            direction: [''],
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
