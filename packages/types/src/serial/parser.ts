

export type TParser = {
	parserType: TParserType;
	name: string;
	url: string;
	fileUrl: string;
	enabled: string;
};

export enum TParserType {
	'nodejs' = 'nodejs',
	'python' = 'python',
}

export type TParserCallParams = {
	// парсер
	parser: TParser;
	// какую страницу парсить
	page: number;
};

export enum TPostType {
	// грант
	'grant' = 'grant',
	// вакансия
	'vacancy' = 'vacancy',
	// стажировка
	'internship' = 'internship',
	// школьная олимпиада
	'competition' = 'competition',
}

export type TGrant = {
	// название гранта
	namePost: string;
	// дата создания гранта
	dateCreationPost: string;
	// Направление гранта
	direction: string;
	// организация-грантодатель
	organization: string;
	// дедлайн
	deadline: string;
	// сумма гранта
	summary: string;
	// направления расходов
	directionForSpent: string;
	// полный текст
	fullText: string;
	// ссылка на грант
	link: string;
	// ссылка на PDF
	linkPDF: string;
	// время парсинга
	timeOfParse?: number;
}

export type TVacancy = {
	// Направление
	direction: string;
	//требования
	requirements: string;
	// обязанности
	responsibilities: string;
	// условия
	conditions: string;
	// Зарплата
	salary: string;
	// полный текст
	fullText: string;
	// название поста
	namePost:string;
	// дата создания гранта
	dateCreationPost: string;
	// организация
	organization: string;
	// ссылка
	link: string;
	// время парсинга
	timeOfParse?: number;
}

export type TInternship = {
	//требования
	requirements: string;
	// обязанности
	responsibilities: string;
	// условия
	conditions: string;
	// Зарплата
	salary: string;
	// Направление
	direction: string;
	// полный текст
	fullText: string;
	// название поста
	namePost:string;
	// дата создания гранта
	dateCreationPost: string;
	// организация
	organization: string;
	// ссылка
	link: string;
	// время парсинга
	timeOfParse?: number;
}

export type TCompetition = {
	// дедлайн
	deadline: string;
	// Направление
	direction: string;
	// полный текст
	fullText: string;
	// название поста
	namePost:string;
	// дата создания гранта
	dateCreationPost: string;
	// организация
	organization: string;
	// ссылка
	link: string;
	// время парсинга
	timeOfParse?: number;
}

export type TPost<T extends  TPostType> = {
	postType : T;
	postDescription:
		T extends TPostType.grant ? TGrant :
		T extends TPostType.vacancy ? TVacancy :
		T extends TPostType.internship ? TInternship :
		T extends TPostType.competition ? TCompetition :
			never;
}

export type TParserResult = (TPost<TPostType.grant> |
	TPost<TPostType.internship> |
	TPost<TPostType.competition> |
	TPost<TPostType.vacancy>)[];

