module.exports = {
    coverageDirectory: 'coverage',
    collectCoverage: true,
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageProvider: 'v8',
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
