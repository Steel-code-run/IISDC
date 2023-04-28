import {usersTableName} from "../config";

export const createUsersTable = `
CREATE TABLE IF NOT EXISTS ${usersTableName} (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     STRING  UNIQUE,
    password STRING,
    role     INTEGER
);
`