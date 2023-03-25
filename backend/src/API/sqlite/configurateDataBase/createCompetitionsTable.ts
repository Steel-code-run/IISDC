import {competitionsTableName} from "../config";

export const createCompetitionsTable = `
CREATE TABLE IF NOT EXISTS ${competitionsTableName} (
    id               INTEGER  PRIMARY KEY AUTOINCREMENT,
    namePost         STRING,
    dateCreationPost STRING,
    direction        STRING,
    fullText         STRING,
    link             STRING,
    linkPDF          STRING,
    organization     STRING,
    timeOfParse      DATETIME,
    deadline         STRING
);

`