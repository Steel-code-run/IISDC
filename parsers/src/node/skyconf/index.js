const {getHTML} = require('../../utils/getHTML.js');
const {getDataBySelector, getLinksPDF} = require("../../utils/methodsParser");
const {DirectionType} = require("../../types");;


const url = 'https://sfy-conf.ru/about';
const url2 = 'https://sfy-conf.ru/contest'

const querySelectors = {
    title: 'div[field="title"].t017__title.t-title.t-title_xxs',
    text: 'div[field="text"].t740__text.t-text.t-text_md',
    deadline: 'div[field="li_descr__1647584363853"].t550__descr.t-text.t-text_xs',
    linkPDF: 'div.t-card__title.t-heading.t-heading_md a.t-card__link'

};


(async function main() {
    let jsdom = await getHTML(url);

    const fullText = getDataBySelector(jsdom, querySelectors.text);
    const title = getDataBySelector(jsdom, querySelectors.title);
    const deadline = getDataBySelector(jsdom, querySelectors.deadline);

    jsdom = await getHTML(url2);
    const linkPDF = getLinksPDF(jsdom, querySelectors.linkPDF, url2)


    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: title,
            dateCreationPost: '',
            deadline: deadline,
            direction: [DirectionType.IT,
                DirectionType.Medicine,
                DirectionType.SocialWork,
                DirectionType.Chemistry
            ],
            fullText: fullText,
            linkPDF: linkPDF.slice(0, 3),
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
