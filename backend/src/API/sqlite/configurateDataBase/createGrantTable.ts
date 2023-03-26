import {grantsTableName} from "../config";

export const createTableGrantsQuery =`
CREATE TABLE IF NOT EXISTS ${grantsTableName} (
    id                INTEGER     PRIMARY KEY AUTOINCREMENT,
    namePost          STRING      COLLATE NOCASE,
    dateCreationPost  STRING DEFAULT (''),
    organization      STRING DEFAULT (''),
    deadline          STRING DEFAULT (''),
    summary           STRING DEFAULT (''),
    directionForSpent STRING DEFAULT (''),
    fullText          STRING DEFAULT (''),
    link              STRING DEFAULT (''),
    linkPDF           STRING DEFAULT (''),
    timeOfParse       DATETIME,
    sourceLink        TEXT DEFAULT (''),
    blackListed       INTEGER (1) DEFAULT (0),
    namePost_lowerCase         STRING
);
`