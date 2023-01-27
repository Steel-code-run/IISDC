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
    "ts-node",
    "python",
}

type TCallParserParams = {
    // информация о парсере
    parser: TParser;
} & Partial<TParserParams>;

export enum TParserResultTypes {
    "grant", // грант
    "vacancy", // вакансия
    "internship" // стажировка
}

type TGenericParserResult<T extends TParserResultTypes> = {
    type: T,
    posts:TParserResultDescription<T>[];
}


type TGrant<T extends TParserResultTypes = TParserResultTypes> = T extends  TParserResultTypes.grant ? {
    direction: string; // Направление гранта
    organization: string; // организация-грантодатель
    timeOfStart: string; // время начала подачи заявки
    summary: string; // сумма гранта
    timeOfEnd: string; // время окончания подачи заявки
    description: string; // заметки к гранту
    fullText: string; // полное описание
    link: string; // ссылка на грант
} : never;

type TVacancy<T extends TParserResultTypes = TParserResultTypes>  = T extends  TParserResultTypes.vacancy ?{

} : never;

type TInternship<T extends TParserResultTypes = TParserResultTypes>  = T extends  TParserResultTypes.internship ?{

} : never;

type TParserResultDescription<T extends TParserResultTypes> =
    T extends TParserResultTypes.grant ? TGrant :
    T extends TParserResultTypes.vacancy ? TVacancy :
    T extends TParserResultTypes.internship ? TInternship :
    never;

type TParserResultGrant = TGenericParserResult<TParserResultTypes.grant>
type TParserResultTVacancy = TGenericParserResult<TParserResultTypes.vacancy>
type TParserResultTInternship = TGenericParserResult<TParserResultTypes.internship>

export type TCallParser = (params: TCallParserParams) => TParserResultGrant | TParserResultTVacancy | TParserResultTInternship;

export type TParserResult = TParserResultGrant | TParserResultTVacancy | TParserResultTInternship;
