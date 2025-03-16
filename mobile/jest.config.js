module.exports = {
    preset: 'jest-expo',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|@react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?|react-navigation|@react-navigation|@react-native-picker)/.*"
    ],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1'
    }
  };