import jestConfig from './jest.config'

export default {
  ...jestConfig,
  testMatch: ['<rootDir>/src/**/*.spec.ts']
}
