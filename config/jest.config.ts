import { Config } from '@jest/types';

// eslint-disable-next-line no-undef
export default async (): Promise<Config.InitialOptions> => ({
  rootDir: '../',
  preset: 'ts-jest/presets/js-with-ts-esm',
  roots: ['<rootDir>/src', '<rootDir>/tests',],
  coveragePathIgnorePatterns: ['.spec.util.ts',],
  coverageDirectory: '<rootDir>/coverage',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/config/tsconfig.spec.json',
      useESM: true,
      extensionsToTreatAsESM: ['.js', '.ts', '.tsx', '.jsx',],
    },
  },
  setupFilesAfterEnv: [ '<rootDir>/config/jest.setup.ts', ],
  modulePathIgnorePatterns: [ '/node_modules/', ],
});
