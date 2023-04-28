import {vacanciesTableName} from "../config";

export const createVacanciesTable = `
CREATE TABLE IF NOT EXISTS ${vacanciesTableName} (
    id               INTEGER  PRIMARY KEY AUTOINCREMENT,
    namePost         STRING,
    requirements     STRING DEFAULT (''),
    responsibilities STRING DEFAULT (''),
    conditions       STRING DEFAULT (''), 
    salary           STRING DEFAULT (''),
    fullText         STRING DEFAULT (''),
    dateCreationPost STRING DEFAULT (''),
    organization     STRING DEFAULT (''),
    link             STRING DEFAULT (''),
    timeOfParse      DATETIME,
    sourceLink       STRING DEFAULT (''),
    blackListed      INTEGER(1) DEFAULT (0),
    namePost_lowerCase STRING
);
`