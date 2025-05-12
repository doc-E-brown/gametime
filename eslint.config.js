import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  js.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,

  eslintConfigPrettier,
  eslintPluginPrettierRecommended,

  {
    ignores: [
      '**/.react-router/**/*',
      '**/eslint.config.js',
      '**/build/**',
      '**/dist/**',
      '**/coverage/**/*',
      'postcss.config.js',
    ],
  },

  {
    plugins: {
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      'react-refresh/only-export-components': 'off',
      'prettier/prettier': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx}', 'test-utils/**/*'],
    rules: {
      'global-require': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/require-await': 'off',
      'max-classes-per-file': 'off',
    },
  },
]
