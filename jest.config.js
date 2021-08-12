module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.ts'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}
