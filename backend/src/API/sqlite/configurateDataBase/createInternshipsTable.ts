import {internshipsTableName} from "../config";

export const createInternshipsTable = `
CREATE TABLE IF NOT EXISTS ${internshipsTableName} (
    id               INTEGER  PRIMARY KEY AUTOINCREMENT,
    requirements     STRING DEFAULT (''),
    responsibilities STRING DEFAULT (''),
    conditions       STRING DEFAULT (''),
    salary           STRING DEFAULT (''),
    fullText         STRING DEFAULT (''),
    namePost         STRING DEFAULT (''),
    dateCreationPost STRING DEFAULT (''),
    organization     STRING DEFAULT (''),
    link             STRING DEFAULT (''),
    timeOfParse      DATETIME,
    sourceLink       STRING DEFAULT (''),
    blackListed      INTEGER(1) DEFAULT (0),
    namePost_lowerCase STRING
);
`