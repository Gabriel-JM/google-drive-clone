import 'tsconfig-paths/register'

export default {
  rootDir: '../',
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/*.(spec|test).ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)': ['<rootDir>/src/$1']
  }
}