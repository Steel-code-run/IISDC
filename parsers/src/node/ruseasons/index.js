const {getHTML} = require('../../utils/getHTML.js');
const {getDataBySelector} = require("../../utils/methodsParser");
const {DirectionType} = require("@iisdc/types");


const url = 'https://ruseasons.com/accelerator';

const querySelectors = {
    title: 'div[field="tn_text_1599171990782"].tn-atom',
    text: 'div[field="tn_text_1600787226623"].tn-atom',
    deadline: 'div[field="li_time__1477061802947"].t513__time div',
};


(async function main() {
    const jsdom = await getHTML(url);

    const fullText = getDataBySelector(jsdom, querySelectors.text);
    const title = getDataBySelector(jsdom, querySelectors.title);
    const deadline = getDataBySelector(jsdom, querySelectors.deadline);


    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: title,
            dateCreationPost: '',
            deadline: deadline,
            direction: [DirectionType.IT],
            fullText: fullText,
            linkPDF: '',
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
