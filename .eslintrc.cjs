/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: true,
  },

  plugins: ['@typescript-eslint', 'import', 'tailwindcss'],

  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@next/next/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended',
  ],

  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },

    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },

    tailwindcss: {
      callees: ['cn'],
      config: './tailwind.config.ts',
    },

    next: {
      rootDir: ['./src'],
    },
  },

  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          'React.StatelessComponent': 'https://github.com/facebook/create-react-app/pull/8177',
          'React.FunctionalComponent': 'https://github.com/facebook/create-react-app/pull/8177',
          'React.FC': 'https://github.com/facebook/create-react-app/pull/8177',
          FC: 'https://github.com/facebook/create-react-app/pull/8177',
        },
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        // https://github.com/orgs/react-hook-form/discussions/8622#discussioncomment-4060570
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',

    'tailwindcss/no-custom-classname': 'off',

    'import/no-default-export': 'error',
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown', 'object', 'type'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
        ],
      },
    ],
  },

  overrides: [
    {
      files: ['**/components/ui/*.tsx'],
      rules: {
        'react/prop-types': [2, { ignore: ['className', 'sideOffset', 'checked'] }],
        'react-refresh/only-export-components': 'off',
      },
    },
    {
      files: ['**/*.tsx'],
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 'off',
      },
    },
    {
      files: ['src/app/**/*.{ts,tsx}', 'tailwind.config.ts', 'next.config.js'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
}

module.exports = config
