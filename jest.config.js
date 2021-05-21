'use strict';
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: '.coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '*.spec.ts'
  ],
  coverageProvider: 'v8',
  coverageReporters: [
    'lcov'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/*.spec.ts',
  ],
  testTimeout: 60000,
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-results',
      outputName: 'jest-junit.xml',
    }]
  ]
};
