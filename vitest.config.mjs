import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['**/__tests__/**/*.test.[jt]s?(x)'],
    setupFiles: ['./__tests__/support/setup/index.js'],
    coverage: {
      reportsDirectory: 'coverage',
      enabled: true,
      include: ['functions/**/*.js'],
      exclude: [
        'functions/utils/**/liquid.min.js',
        'functions/expression/**/templayed.js',
        'functions/utils/**/jsonpath.min.js',
      ],
      provider: 'v8',
      thresholds: {
        branches: 85,
        functions: 85,
        lines: 85,
        statements: 85,
      },
    },
  },
});
