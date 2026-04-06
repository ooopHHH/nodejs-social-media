module.exports = {
    testEnvironment: 'node',
    testMatch: [
      '**/*.test.js',
    ],
    testPathIgnorePatterns: [
      '/node_modules',
    ],
    collectCoverage: true,
    coverageDirectory: 'coverage',
};  