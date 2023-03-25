import {directionsConstTableName, directionsTableName, grantsTableName} from "../config";

//    competitions_id сменить потом имя
export const createDirectionsTable = `
CREATE TABLE IF NOT EXISTS ${directionsTableName} (
    id                      INTEGER PRIMARY KEY AUTOINCREMENT,
    ${directionsConstTableName}_id    INTEGER REFERENCES ${directionsConstTableName} (id) ON DELETE CASCADE,
    competitions_id         REFERENCES competitions (id) ON DELETE CASCADE,
    ${grantsTableName}_id       INTEGER REFERENCES ${grantsTableName} (id) ON DELETE CASCADE
);
`

export const createDirectionsConstTable = `
CREATE TABLE IF NOT EXISTS  ${directionsConstTableName} (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    directionName TEXT    UNIQUE
);
`

