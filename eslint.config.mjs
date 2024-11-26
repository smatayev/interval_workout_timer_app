import reactPlugin from 'eslint-plugin-react';
import babelParser from '@babel/eslint-parser';

export default [
  {
    files: ['**/*.js', '**/*.jsx', '!build/**'], // Lint JavaScript and JSX files
    ignores: ['build/**'], // Add this line to ignore the build directory
    languageOptions: {
      parser: babelParser, // Use Babel parser
      parserOptions: {
        requireConfigFile: false, // No need for a Babel config file
        babelOptions: {
          presets: ['@babel/preset-react'], // Use React Babel preset
        },
        ecmaVersion: 'latest', // Use the latest ECMAScript features
        sourceType: 'module', // Use ES Modules
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
      globals: {
        // Define global variables for your environment
        window: 'readonly',
        document: 'readonly',
        jest: 'readonly',
        test: 'readonly',
        expect: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      // Core rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'eqeqeq': 'error',
      'curly': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],

      // React rules
      'react/react-in-jsx-scope': 'off', // React 17+ JSX support
      'react/prop-types': 'off', // Disable PropTypes if using TypeScript
    },
  },
];