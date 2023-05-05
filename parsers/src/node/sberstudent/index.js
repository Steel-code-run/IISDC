const {DirectionType} = require("@iisdc/types");
const {getHtmlContent} = require("../../utils/puppeteerGetHtmlContent");
const cheerio = require("cheerio");


const url = 'https://sberstudent.sberclass.ru/';

const querySelectors = {
    title: 'h1.sc-AxhCb.jWoFgG.styles__StyledTitle-kimGnF.febnR',
    text: 'h3.sc-AxgMl.iodocF.styles__StyledSubTitle-dMcTkp.btpnlS',
    deadline: 'h3.sc-AxgMl.iodocF styles__PromoDetailsTitleStyled-lgjINc.pKOjK',
};


(async function main() {
    const html = await getHtmlContent(url);
    const $ = cheerio.load(html);


    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: $('body').find(querySelectors.title)?.text(),
            dateCreationPost: '',
            deadline: $('body').find(querySelectors.date)?.text(),
            direction: [DirectionType.IT],
            fullText: $('body').find(querySelectors.text)?.text(),
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
