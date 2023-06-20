export type Grant = {
    id?: number;
    namePost: string;
    dateCreationPost?: string;
    summary?: string;
    fullText?: string;
    deadline?: string;
    organization?: string;
    directions?: string;
    directionForSpent?: string;
    link?: string;
    linkPDF?: string;
    parser_id?: number;
    sourceLink?: string;
}

export type Competition = {
    id?: number;
    namePost: string;
    dateCreationPost?: string;
    directions?: string;
    organization?: string;
    deadline?: string;
    summary?: string;
    directionForSpent?: string;
    fullText?: string;
    link?: string;
    linkPDF?: string;
    sourceLink?: string;
    timeOfParse?: string;
    blackListed?: boolean;
    editActions?: any[];
    competitions_directionId?: number;
    parser?: any;
    parser_id?: number;
}

export type Vacancy = {
    id?: number;
    namePost: string;
    dateCreationPost?: string;
    directions?: string;
    organization?: string;
    summary?: string;
    fullText?: string;
    link?: string;
    linkPDF?: string;
    sourceLink?: string;
    timeOfParse?: string;
    blackListed?: boolean;
    parser_id?: number;
}

export type Internship = {
    id?: number;
    namePost: string;
    dateCreationPost?: string;
    directions?: string;
    organization?: string;
    fullText?: string;
    link?: string;
    linkPDF?: string;
    sourceLink?: string;
    timeOfParse?: string;
    blackListed?: boolean;
    parser_id?: number;
}