const {getHTML} = require('../../utils/getHTML.js');
const {getLinksPosts} = require('../../utils/methodsParser.js');
const {getInfoPosts, getDataBySelector} = require("../../utils/methodsParser");
const {DirectionType, TPostType} = require("@iisdc/types");


const url = '';

const querySelectors = {
    title: 'div[data-elem-id="1470209944682"] div.tn-atom',
    text: 'div[data-elem-id="1470209944682"] div.tn-atom',
    deadline: 'div[data-elem-id="1677193455925"] div.tn-atom',
    summary: 'div[data-elem-id="1677279410569"] div.tn-atom'

};


(async function main() {
    const jsdom = await getHTML(url);

    const fullText = getDataBySelector(jsdom, querySelectors.text);
    const title = getDataBySelector(jsdom, querySelectors.title);
    const deadline = getDataBySelector(jsdom, querySelectors.deadline);
    const summary = getDataBySelector(jsdom, querySelectors.summary);


    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: title,
            dateCreationPost: '',
            deadline: deadline,
            direction: [DirectionType.IT],
            fullText: fullText,
            linkPDF: '',
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
