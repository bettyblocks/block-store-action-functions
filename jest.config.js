module.exports = {
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'functions/**/*.js',
    '!functions/utils/**/liquid.min.js',
    '!functions/expression/**/templayed.js',
    '!functions/utils/**/jsonpath.min.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  setupFiles: ['./__tests__/support/setup/index.js'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
