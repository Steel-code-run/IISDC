export type Grant = {
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