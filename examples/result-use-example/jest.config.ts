import { Config } from 'jest';

const config: Config = {
  verbose: false,
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/*.test.ts'],
  collectCoverage: false,
  passWithNoTests: true,
};

export default config;
