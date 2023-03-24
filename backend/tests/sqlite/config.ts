import path from "path";
import {__projectPath} from "../../src/utils/projectPath";

export const usersDb = require('better-sqlite3')(path.join(__projectPath, '../','tests','testingSqlite','users.db'));

export const parserDb = require('better-sqlite3')(path.join(__projectPath, '../','tests','testingSqlite','parser.db'));

