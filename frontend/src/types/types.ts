import {TCompetition, TGrant, TInternship, TPostType, TVacancy} from "./serial/parser";

export type TComponentPage<T extends TPostType> = {
    postType: T;
    props: T extends TPostType.grant
        ? TGrant
        : T extends TPostType.vacancy
            ? TVacancy
            : T extends TPostType.internship
                ? TInternship
                : T extends TPostType.competition
                    ? TCompetition
                    : never
}

export type TTypesOfPosts = TGrant | TCompetition | TInternship | TVacancy;
// export type TTypesUpdateData = Partial<IUpdateDataGrant
//     | IUpdateDataCompetition | IUpdateDataInternship | IUpdateDataVacancy>;
export type TTypesUpdateData<T extends TPostType> = T extends TPostType.grant
    ? IUpdateDataGrant
    : T extends TPostType.competition
        ? IUpdateDataCompetition
        : T extends TPostType.internship
            ? IUpdateDataInternship
            : never

export interface IUpdateDataGrant {
    id: number | undefined,
    organization?: string | null,
    directions?: string | string[] | null,
    directionForSpent?: string | null,
    dateCreationPost: string | null,
    deadline: string | null,
    summary: string | null,
    fullText: string | null,
    link: string | null
    linkPDF: string | null
    blackListed?: true | false;
}

export interface IUpdateDataCompetition {
    id: number | undefined,
    organization: string | null,
    directions: string | string[] | null,
    dateCreationPost: string | null,
    deadline: string | null,
    fullText: string | null,
    link: string | null,
    linkPDF: string | null
    blackListed?: true | false;
}

export interface IUpdateDataInternship {
    id: number | undefined,
    requirements: string | null,
    responsibilities: string | null,
    conditions: string | null,
    salary: string | null,
    fullText: string | null,
    dateCreationPost: string | null,
    organization: string | null,
    link: string | null,
    blackListed?: true | false;
}

export interface IUpdateDataVacancy {
    id: number | undefined,
    direction?: string | string[] | null;
    requirements: string | null;
    responsibilities: string | null;
    conditions: string | null;
    salary: string | null;
    fullText: string | null;
    dateCreationPost: string | null;
    organization: string | null;
    blackListed?: true | false;
}


export type TDefineUpdateData<T extends TPostType> = T extends TPostType.grant
    ? IUpdateDataGrant : T extends TPostType.competition
        ? IUpdateDataCompetition : T extends TPostType.internship
            ? IUpdateDataInternship : T extends TPostType.vacancy
                ? IUpdateDataVacancy : never