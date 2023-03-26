import {internshipsTableName} from "../config";

export const createInternshipsTable = `
CREATE TABLE IF NOT EXISTS ${internshipsTableName} (
    id               INTEGER  PRIMARY KEY AUTOINCREMENT,
    requirements     STRING,
    responsibilities STRING,
    conditions       STRING,
    salary           STRING,
    fullText         STRING,
    namePost         STRING,
    dateCreationPost STRING,
    organization     STRING,
    link             STRING,
    timeOfParse      DATETIME,
    sourceLink       STRING,
    blackListed      INTEGER(1) DEFAULT (0),
    namePost_lowerCase STRING
);
`