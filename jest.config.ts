import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  coverageProvider: 'v8',
  // testEnvironment: 'jsdom',
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    './**/*.{js,jsx,ts,tsx}',
    '**/*.{js,jsx,ts,tsx}',          // Include all JS/TS files
    '!**/node_modules/**',           // Exclude node_modules
    '!**/vendor/**',                 // Exclude vendor folders
    '!**/.next/**',                  // Exclude Next.js build folder
    '!**/coverage/**',               // Exclude the coverage report itself
    '!jest.config.{ts,js}',               // Exclude config files
    '!**/*.d.ts',
    '!next.config.ts',
    '!prisma.config.ts'
  ],

  moduleNameMapper: {
    '^@neondatabase/auth(.*)$': '<rootDir>/__mocks__/neonAuthMock.tsx',
    '^better-auth(.*)$': '<rootDir>/__mocks__/neonAuthMock.ts',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)