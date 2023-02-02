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
const globals_1 = require("@jest/globals");
const users_1 = require("~/src/API/sqlite/users/users");
const process = __importStar(require("process"));
if (process.env.BYPASS_TESTS === "true") {
    (0, globals_1.describe)('sqlite: usersData', () => {
        (0, globals_1.beforeAll)(() => {
            if ((0, users_1.isUsersDataTableExist)())
                (0, users_1.deleteUsersDataTable)();
        });
        (0, globals_1.test)("table is not exist", () => {
            (0, globals_1.expect)((0, users_1.isUsersDataTableExist)()).toBe(false);
        });
        (0, globals_1.test)("table is exist", () => {
            (0, users_1.createUsersDataTable)();
            (0, globals_1.expect)((0, users_1.isUsersDataTableExist)()).toBe(true);
        });
        (0, globals_1.test)("table must be empty", () => {
            (0, globals_1.expect)((0, users_1.getUsers)()).toEqual([]);
        });
    });
}
else {
    (0, globals_1.describe)("sqlite: usersData", () => {
        (0, globals_1.test)("it test can be dangerous", () => {
        });
        (0, globals_1.test)("run it with next command if you want", () => {
        });
        (0, globals_1.test)("cmd: cross-env BYPASS_TESTS=true npm run test:sqlite", () => {
        });
    });
}
//# sourceMappingURL=usersData.test.js.map