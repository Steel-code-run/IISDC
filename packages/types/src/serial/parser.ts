

export type TParser = {
	parserType: TParserType;
	name: string;
	url: string;
	fileUrl: string;
	enabled: string;
	id?: number;
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
	id?:number,
	// название гранта
	namePost: string;
	// дата создания гранта
	dateCreationPost: string;
	// Направление гранта
	direction: string | string[];
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
	linkPDF: string | string[];
	sourceLink?:string;
	// время парсинга
	timeOfParse?: number;
	// В черном ли списке
	blackListed?:0|1;
}

export type TVacancy = {
	id?:number,
	// Направление
	direction?: string;
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
	sourceLink?:string;
	blackListed?:0|1;
}

export type TInternship = {
	id?:number,
	//требования
	requirements: string;
	// обязанности
	responsibilities: string;
	// условия
	conditions: string;
	// Зарплата
	salary: string;
	// Направление
	direction?: string;
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
	blackListed?:0|1;
	sourceLink?:string;
}

export type TCompetition = {
	id?:number,
	// дедлайн
	deadline: string;
	// Направление
	direction: string | string[];
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
	// ссылка на PDF
	linkPDF: string | string[];
	// время парсинга
	timeOfParse?: number;
	sourceLink?:string;
	blackListed?:0|1;
}

export type TPost<T extends TPostType> = {
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

