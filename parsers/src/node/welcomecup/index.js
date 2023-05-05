const {getHTML} = require('../../utils/getHTML.js');
const {getLinksPosts} = require('../../utils/methodsParser.js');
const {getInfoPosts, getDataBySelector, getLinksPDF} = require("../../utils/methodsParser");
const {DirectionType, TPostType} = require("@iisdc/types");


const url = 'https://welcomecup.rsv.ru/managers';

const querySelectors = {
    title: 'div[data-elem-id="1645517610108"].t396__elem.tn-elem.tn-elem__4189978421645517610108 h3',
    deadline: 'div[data-elem-id="1645526655676"].t396__elem.tn-elem.tn-elem__4231849151645526655676 div.tn-atom',
    summary: 'div[data-elem-id="1646052860710"].t396__elem.tn-elem.tn-elem__4190107151646052860710 div.tn-atom',

};


(async function main() {
    const jsdom = await getHTML(url);

    const title = getDataBySelector(jsdom, querySelectors.title);
    const deadline = getDataBySelector(jsdom, querySelectors.deadline);
    const summary = getDataBySelector(jsdom, querySelectors.summary);


    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: title,
            dateCreationPost: '',
            deadline: deadline,
            direction: [DirectionType.Tourism],
            fullText: '',
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
