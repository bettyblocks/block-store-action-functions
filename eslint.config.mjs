import eslint from '@eslint/js';
import vitest from 'eslint-plugin-vitest';
import prettierConfig from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: [
      'node_modules/',
      'coverage/',
      'functions/utils/liquid.min.js',
      'functions/utils/templayed.js',
      'functions/utils/jsonpath.min.js',
    ],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
        documentParser: 'readonly',
        fetch: 'readonly',
        generatePDF: 'readonly',
        generativeAI: 'readonly',
        gql: 'readonly',
        parseData: 'readonly',
        parseToGqlFragment: 'readonly',
        runAction: 'readonly',
        searchCollection: 'readonly',
        smtp: 'readonly',
        storeFile: 'readonly',
      },
    },
    rules: {
      'no-restricted-globals': 0,
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
    },
  },
  {
    files: ['__tests__/**/*.test.ts'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/no-identical-title': ['error'],
    },
  },
  prettierConfig,
];
