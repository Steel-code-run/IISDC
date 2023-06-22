const {DirectionType} = require("../../types");;


const url = 'http://www.digitalwind.ru/';

const querySelectors = {
    title: '',
    text: '',
    deadline: '',
    summary: '',
    linkPDF: 'http://www.digitalwind.ru/'

};


(async function main() {

    const parsedContent = {
        postType: 'competition',
        postDescription: {
            namePost: 'Открыт прием работ на Международный конкурс компьютерных работ "Цифровой ветер - 2023"',
            dateCreationPost: '',
            deadline: '',
            direction: [DirectionType.IT],
            fullText: '',
            linkPDF: querySelectors.linkPDF,
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
