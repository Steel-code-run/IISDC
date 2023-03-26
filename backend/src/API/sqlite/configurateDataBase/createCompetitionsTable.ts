import {competitionsTableName} from "../config";

export const createCompetitionsTable = `
CREATE TABLE IF NOT EXISTS ${competitionsTableName} (
    id               INTEGER  PRIMARY KEY AUTOINCREMENT,
    namePost         STRING DEFAULT (''),
    dateCreationPost STRING DEFAULT (''),
    fullText         STRING DEFAULT (''),
    link             STRING DEFAULT (''),
    linkPDF          STRING DEFAULT (''),
    organization     STRING DEFAULT (''),
    timeOfParse      DATETIME,
    deadline         STRING DEFAULT (''),
    blackListed      INTEGER(1) DEFAULT (0),
    sourceLink       STRING DEFAULT (''),
    namePost_lowerCase         STRING
);
`