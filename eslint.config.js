/* eslint max-len: 0 */

import globals from 'globals';
import google from 'eslint-config-google-jsdocless';
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  js.configs.recommended,
  google,
  {
    files: [
      'gulpfile.js',
      'source/agjCalendar/jquery.agjCalendar.js',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {
      'no-redeclare': 'off',
      'no-var': 'off',
      'no-multi-spaces': 'off',
      'no-invalid-this': 'off',
      'comma-dangle': [
        'error',
        'never',
      ],
      'eqeqeq': [
        'error',
        'always',
      ],
      'indent': [
        'error',
        2,
        {
          'CallExpression': {
            'arguments': 1, // this is a change from google’s indent rule definition
          },
          'FunctionDeclaration': {
            'body': 1,
            'parameters': 1, // this is a change from google’s indent rule definition
          },
          'FunctionExpression': {
            'body': 1,
            'parameters': 1, // this is a change from google’s indent rule definition
          },
          'MemberExpression': 1, // this is a change from google’s indent rule definition
          'ObjectExpression': 1,
          'SwitchCase': 1,
          'ignoredNodes': [
            'ConditionalExpression',
          ],
        },
      ],
      'key-spacing': [
        'error',
        {
          'align': {
            'beforeColon': false,
            'afterColon': true,
            'on': 'value',
          },
        },
      ],
      'jsdoc/check-access': 'error', // recommended by the jsdoc plugin
      'jsdoc/check-alignment': 'error', // recommended by the jsdoc plugin
      'jsdoc/check-examples': 'off',
      'jsdoc/check-indentation': 'error',
      'jsdoc/check-line-alignment': 'error',
      'jsdoc/check-param-names': 'error', // recommended by the jsdoc plugin
      'jsdoc/check-property-names': 'error', // recommended by the jsdoc plugin
      'jsdoc/check-syntax': 'error',
      'jsdoc/check-tag-names': 'error', // recommended by the jsdoc plugin
      'jsdoc/check-types': 'error', // recommended by the jsdoc plugin
      'jsdoc/check-values': 'error', // recommended by the jsdoc plugin
      'jsdoc/empty-tags': 'error', // recommended by the jsdoc plugin
      'jsdoc/implements-on-classes': 'error', // recommended by the jsdoc plugin
      'jsdoc/informative-docs': 'error',
      'jsdoc/match-description': 'error',
      'jsdoc/multiline-blocks': 'error', // recommended by the jsdoc plugin
      'jsdoc/no-bad-blocks': 'error',
      'jsdoc/no-blank-block-descriptions': 'error',
      'jsdoc/no-defaults': 'error',
      'jsdoc/no-missing-syntax': 'off',
      'jsdoc/no-multi-asterisks': 'error', // recommended by the jsdoc plugin
      'jsdoc/no-restricted-syntax': 'off',
      'jsdoc/no-types': 'off',
      'jsdoc/no-undefined-types': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-asterisk-prefix': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/require-description-complete-sentence': 'error',
      'jsdoc/require-example': 'off',
      'jsdoc/require-file-overview': 'error',
      'jsdoc/require-hyphen-before-param-description': 'error',
      'jsdoc/require-jsdoc': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-param': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-param-description': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-param-name': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-param-type': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-property': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-property-description': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-property-name': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-property-type': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-returns': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-returns-check': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-returns-description': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-returns-type': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-throws': 'error',
      'jsdoc/require-yields': 'error', // recommended by the jsdoc plugin
      'jsdoc/require-yields-check': 'error', // recommended by the jsdoc plugin
      'jsdoc/sort-tags': 'error',
      'jsdoc/tag-lines': 'error', // recommended by the jsdoc plugin
      'jsdoc/valid-types': 'error', // recommended by the jsdoc plugin
    },
  },
];
