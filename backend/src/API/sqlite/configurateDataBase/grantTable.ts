import {grantsTableName} from "../config";

export const createTableGrantsQuery =`
CREATE TABLE IF NOT EXISTS ${grantsTableName} (
    id                INTEGER     PRIMARY KEY AUTOINCREMENT,
    namePost          STRING      COLLATE NOCASE,
    dateCreationPost  STRING,
    organization      STRING,
    deadline          STRING,
    summary           STRING,
    directionForSpent STRING,
    fullText          STRING,
    link              STRING,
    linkPDF           STRING,
    timeOfParse       DATETIME,
    sourceLink        TEXT,
    blackListed       INTEGER (1) DEFAULT (0),
    namePost_lowerCase         STRING
);
`