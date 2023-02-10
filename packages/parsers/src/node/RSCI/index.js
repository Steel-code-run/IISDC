"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@iisdc/types");
const page = process.argv[2];
const result = [
    {
        postType: types_1.TPostType.grant,
        postDescription: {
            namePost: "Название поста",
            dateCreationPost: "Дата создания поста",
            deadline: "Дедлайн",
            direction: "Направление",
            fullText: "Полный текст",
            link: "Ссылка",
            organization: "Организация",
            summary: "Краткое описание",
            directionForSpent: "Направление для расходования"
        },
    },
    {
        postType: types_1.TPostType.vacancy,
        postDescription: {
            namePost: "Название поста",
            dateCreationPost: "Дата создания поста",
            direction: "Направление",
            fullText: "Полный текст",
            organization: "Организация",
            conditions: "Условия",
            requirements: "Требования",
            responsibilities: "Обязанности",
            salary: "Зарплата",
            link: "Ссылка",
        }
    },
    {
        postType: types_1.TPostType.internship,
        postDescription: {
            direction: "Направление",
            requirements: "Требования",
            responsibilities: "Обязанности",
            conditions: "Условия",
            salary: "Зарплата",
            fullText: "Полный текст",
            namePost: "Название поста",
            dateCreationPost: "Дата создания поста",
            organization: "Организация",
            link: "Ссылка",
        }
    },
    {
        postType: types_1.TPostType.competition,
        postDescription: {
            namePost: "Название поста",
            dateCreationPost: "Дата создания поста",
            deadline: "Дедлайн",
            direction: "Направление",
            fullText: "Полный текст",
            link: "Ссылка",
            organization: "Организация",
        }
    }
];
console.log(JSON.stringify(result));
//# sourceMappingURL=index.js.map