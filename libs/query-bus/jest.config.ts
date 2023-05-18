import { Config } from 'jest';

const config: Config = {
  verbose: false,
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  passWithNoTests: true,
};

export default config;
