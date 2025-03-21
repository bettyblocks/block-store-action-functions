import eslint from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  {
    ignores: [
      '.tmp/',
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
        ...globals.node,
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
        $app: 'readonly',
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
    files: ['__tests__/**/*.test.js', 'isolate-tests/'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/no-identical-title': ['error'],
    },
  },
  prettierConfig,
];
