type TParserParams = {
    // какую страницу парсить
    page: number;
    excludeWordsInTitle: string[];
}

type TParser = {
    parserType: TParserTypes;
    name: string;
    url: string;
    fileUrl: string;
}

export enum TParserTypes {
    "ts-node"= "ts-node",
    "python" = "python"
}

type TCallParserParams = {
    // информация о парсере
    parser: TParser;
} & Partial<TParserParams>;


export enum TParserResultType {
    "grant" = "grant", // грант
    "vacancy" = "vacancy", // вакансия
    "internship" = "internship", // стажировка
    "competition" = "competition", // школьная олимпиада
}

type TGenericParserResult<T extends TParserResultType> = {
    type: T,
    posts:TParserResultDescription<T>[];
    parseErrors: string[];
}


type TGrant<T extends TParserResultType = TParserResultType> = T extends  TParserResultType.grant ? {
    direction: string; // Направление гранта
    organization: string; // организация-грантодатель
    timeOfStart: string; // время начала подачи заявки
    summary: string; // сумма гранта
    timeOfEnd: string; // время окончания подачи заявки
    description: string; // заметки к гранту
    fullText: string; // полное описание
    link: string; // ссылка на грант
} : never;

type TVacancy<T extends TParserResultType = TParserResultType>  = T extends  TParserResultType.vacancy ?{

} : never;

type TInternship<T extends TParserResultType = TParserResultType>  = T extends  TParserResultType.internship ?{

} : never;

type TCompetition<T extends TParserResultType = TParserResultType>  = T extends  TParserResultType.competition ?{

} : never;

type TParserResultDescription<T extends TParserResultType> =
    T extends TParserResultType.grant ? TGrant :
    T extends TParserResultType.vacancy ? TVacancy :
    T extends TParserResultType.internship ? TInternship :
    T extends TParserResultType.competition ? TCompetition :
    never;

type TParserResultGrant = TGenericParserResult<TParserResultType.grant>
type TParserResultTVacancy = TGenericParserResult<TParserResultType.vacancy>
type TParserResultTInternship = TGenericParserResult<TParserResultType.internship>
type TParserResultTCompetition = TGenericParserResult<TParserResultType.competition>

export type TParserResult = TParserResultGrant | TParserResultTVacancy | TParserResultTInternship | TParserResultTCompetition;

export type TCallParser = (params: TCallParserParams) => TParserResult;

