import {competitionsTableName} from "../config";

export const createCompetitionsTable = `
CREATE TABLE IF NOT EXISTS ${competitionsTableName} (
    id               INTEGER  PRIMARY KEY AUTOINCREMENT,
    namePost         STRING,
    dateCreationPost STRING,
    fullText         STRING,
    link             STRING,
    linkPDF          STRING,
    organization     STRING,
    timeOfParse      DATETIME,
    deadline         STRING,
    blackListed      INTEGER(1) DEFAULT (0),
    sourceLink       STRING,
    namePost_lowerCase         STRING
);
`