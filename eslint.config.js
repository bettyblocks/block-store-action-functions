import pluginJs from '@eslint/js';
import vitest from 'eslint-plugin-vitest';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const defaultFiles = {
  files: [
    "functions/",
    '__tests__/',
  ],
  ignores: [
    '**/node_modules/',
    'functions/utils/liquid.min.js',
    'functions/utils/templayed.js',
    'functions/utils/jsonpath.min.js',
  ],
}

export default [
  {
    ...defaultFiles,
    languageOptions: {
      globals: {
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
    plugins: {
      vitest,
    },
    rules: {
      ...pluginJs.configs.recommended,
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
    ...eslintPluginPrettierRecommended,
    ...defaultFiles,
  },
];
