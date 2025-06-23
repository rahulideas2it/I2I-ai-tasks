module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    '*.js',
    '!node_modules/**'
  ],
  coverageReporters: ['text', 'lcov', 'html']
};