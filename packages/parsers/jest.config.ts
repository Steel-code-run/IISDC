import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';


const config: Config = {
    verbose: true,
    testEnvironment: 'node',
    preset: 'ts-jest',
};
export default config;