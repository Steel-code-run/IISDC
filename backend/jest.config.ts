import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

module.exports = {
	verbose: true,
	testEnvironment: 'node',
	preset: 'ts-jest',
	moduleNameMapper: pathsToModuleNameMapper({}, {
		prefix: '<rootDir>/',
	}),
} as Config;
