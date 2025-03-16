/*
** EPITECH PROJECT, 2024
** web
** File description:
** jest.config
*/

import type { Config } from 'jest'
import nextJest from 'next/jest.js'
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json'

const createJestConfig = nextJest({
  dir: './',
})
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  // collectCoverageFrom: [
  //   "app/api/**/route.ts",
  // ],
  coverageReporters: ["json", "lcov", "text", "clover"],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
export default createJestConfig(config)
