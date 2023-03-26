import {vacanciesTableName} from "../config";

export const createVacanciesTable = `
CREATE TABLE IF NOT EXISTS ${vacanciesTableName} (
    id               INTEGER  PRIMARY KEY AUTOINCREMENT,
    namePost         STRING,
    requirements     STRING,
    responsibilities STRING,
    conditions       STRING,
    salary           STRING,
    fullText         STRING,
    dateCreationPost STRING,
    organization     STRING,
    link             STRING,
    timeOfParse      DATETIME,
    sourceLink       STRING,
    blackListed      INTEGER(1) DEFAULT (0),
    namePost_lowerCase STRING
);
`