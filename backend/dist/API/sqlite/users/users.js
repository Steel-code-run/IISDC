"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.getUsers = exports.getUser = exports.deleteUsersDataTable = exports.isUsersDataTableExist = exports.createUsersDataTable = void 0;
const path = __importStar(require("path"));
const consoleLog_1 = require("../../../utils/consoleLog");
const projectPath_1 = require("../../../utils/projectPath");
const db = require('better-sqlite3')(path.join(projectPath_1.__projectPath, '../', 'sqlite', 'db', 'users.db'));
const createUsersDataTable = () => {
    try {
        db.prepare('CREATE TABLE usersData(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name STRING UNIQUE,' +
            'password STRING' +
            ');').run();
    }
    catch (e) {
        (0, consoleLog_1.consoleLog)("from " + __filename + "\n" + e);
        throw new Error(e);
    }
    return true;
};
exports.createUsersDataTable = createUsersDataTable;
const isUsersDataTableExist = () => {
    try {
        return db.prepare('SELECT name FROM sqlite_master WHERE type=\'table\' ' +
            'AND name=\'usersData\';').all().length > 0;
    }
    catch (e) {
        (0, consoleLog_1.consoleLog)("from " + __filename + "\n" + e);
        throw new Error(e);
    }
};
exports.isUsersDataTableExist = isUsersDataTableExist;
const deleteUsersDataTable = () => {
    try {
        return db.prepare('DROP TABLE usersData;').run();
    }
    catch (e) {
        (0, consoleLog_1.consoleLog)("from " + __filename + "\n" + e);
        throw new Error(e);
    }
};
exports.deleteUsersDataTable = deleteUsersDataTable;
const getUser = ({ name, id, password }) => {
    if ((name === undefined) && (password === undefined) && (id === undefined))
        throw new Error("name and password and id are undefined");
    if (name !== undefined)
        if (name.length < 1)
            throw new Error("name is empty");
    if (password !== undefined)
        if (password.length < 1)
            throw new Error("password is empty");
    try {
        const stmt = db.prepare('SELECT * FROM usersData WHERE ' +
            'name = ? AND ' +
            'id = ? AND ' +
            'password = ?' +
            ';');
        return stmt.all(name, id, password);
    }
    catch (e) {
        (0, consoleLog_1.consoleLog)("from " + __filename + "\n" + e);
        throw new Error(e);
    }
};
exports.getUser = getUser;
const getUsers = ({ name, id, password } = {}, limit) => {
    if (limit === undefined)
        limit = 10;
    if (limit <= 0)
        throw new Error("limit must be greater than 0");
    try {
        let query = "";
        if (name !== undefined)
            query += `name = ${name} AND`;
        if (id !== undefined)
            query += ` id = ${id} AND`;
        if (password !== undefined)
            query += ` password = ${password}`;
        if (query.length > 0)
            return db.prepare(`SELECT * FROM usersData WHERE ${query} LIMIT ${limit};`).all();
        else
            return db.prepare(`SELECT * FROM usersData LIMIT ${limit};`).all();
    }
    catch (e) {
        (0, consoleLog_1.consoleLog)("from " + __filename + "\n" + e);
        throw new Error(e);
    }
};
exports.getUsers = getUsers;
const insertUser = ({ name, password }) => {
    if (name.length < 3)
        throw new Error("name must be at least 3 characters long");
    if (password.length < 6)
        throw new Error("password must be at least 6 characters long");
    try {
        return db.prepare(`INSERT INTO usersData (name,password) VALUES ('${name}','${password}');`).run();
    }
    catch (e) {
        (0, consoleLog_1.consoleLog)("from " + __filename + "\n" + e);
        throw new Error(e);
    }
};
exports.insertUser = insertUser;
//# sourceMappingURL=users.js.map