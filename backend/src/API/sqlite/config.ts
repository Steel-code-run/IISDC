import path from "path";
import {__projectPath} from "../../utils/projectPath";

export const usersTableName = "usersData"
export const usersDb = require('better-sqlite3')(path.join(__projectPath, '../../','sqlite','db','users.db'));

export const parserDb = require('better-sqlite3')(path.join(__projectPath, '../../','sqlite','db','parser.db'));

export const grantsTableName = "grants"
