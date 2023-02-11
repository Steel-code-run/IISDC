import {TParserResult, TPostType} from "@iisdc/types";

const page = process.argv[2];

const result:TParserResult = [
	{
		postType: TPostType.grant,
		postDescription: {
			namePost: "Названи'е поста",
			dateCreationPost: "Дата создания поста",
			deadline: "Дедлайн",
			direction: "Направление",
			fullText: "Полный текст",
			link: "Ссылка",
			organization: "Организация",
			summary: "Краткое описание",
			directionForSpent: "Направление для расходования",
			linkPDF: "Ссылка на PDF",
		},
	},
	{
		postType: TPostType.vacancy,
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
		postType: TPostType.internship,
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
		postType: TPostType.competition,
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
]

console.log(
	JSON.stringify(result)
);
