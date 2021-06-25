module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/server/',
    '/common/',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
    },
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ['./jest/jest.setup.ts'],
  setupFiles: ['./jest/global.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/config/', '/build/'],
  verbose: true,
};
