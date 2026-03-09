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
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    './**/*.{js,jsx,ts,tsx}',
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.{ts,js}',
    '!**/*.d.ts',
    '!next.config.ts',
    '!prisma.config.ts'
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@neondatabase/auth(.*)$': '<rootDir>/__mocks__/neonAuthMock.tsx',
    '^better-auth(.*)$': '<rootDir>/__mocks__/neonAuthMock.ts',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
