module.exports = {
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
