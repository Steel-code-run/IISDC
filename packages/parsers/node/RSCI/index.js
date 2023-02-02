"use strict";
const page = process.argv[2];
console.log(JSON.stringify({
    type: 'grant',
    parseErrors: ['Ошибка 20000000000000'],
    posts: [
        {
            direction: 'direction',
            organization: 'organization',
            summary: 'summary',
            deadline: 'timeOfEnd',
            directionForSpent: 'directionForSpent',
            fullText: 'fullText',
            link: 'link',
        },
        {
            direction: 'direction',
            organization: 'organization',
            summary: 'summary',
            deadline: 'timeOfEnd',
            directionForSpent: 'directionForSpent',
            fullText: 'fullText',
            link: 'link',
        },
    ],
}));
//# sourceMappingURL=index.js.map