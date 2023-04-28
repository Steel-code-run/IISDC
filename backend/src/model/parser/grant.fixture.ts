import {Grant} from "../../types/Grant";

export default function():Grant{
    return {
        namePost: 'namePost',
        dateCreationPost: 'dateCreationPost',
        direction: 'direction',
        organization: 'organization',
        deadline: 'deadline',
        summary: 'summary',
        directionForSpent: 'directionForSpent',
        fullText: 'fullText',
        link: 'link',
        linkPDF: 'linkPDF',
        sourceLink: 'sourceLink',
        timeOfParse: 0,
        blackListed: 0
    }
}