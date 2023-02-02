"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("ts-jest");
const { compilerOptions } = require('./tsconfig.json');
module.exports = {
    verbose: true,
    testEnvironment: 'node',
    preset: 'ts-jest',
    moduleNameMapper: (0, ts_jest_1.pathsToModuleNameMapper)(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
};
//# sourceMappingURL=jest.config.js.map