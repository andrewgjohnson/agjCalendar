/**
 * Copyright (c) 2013–2024 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * @file The ESLint configuration file for the agjCalendar jQuery plugin.
 * @copyright 2013–2024 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @license MIT
 * @see {@link https://github.com/andrewgjohnson/agjCalendar GitHub Repository}
 * @see {@link https://agjCalendar.agjjQuery.org/ Online Documentation}
 * @author Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @version 1.2.0
 */

var globals = require('globals');
var js = require('@eslint/js');
var googleConfig = require('eslint-config-google-jsdocless');
var jsdocPlugin = require('eslint-plugin-jsdoc');

// var qunitPlugin = require('eslint-plugin-qunit'); // plugin doesn't support ESLint 9 yet https://github.com/platinumazure/eslint-plugin-qunit/issues/499

var rules = {
  // ...qunitPlugin.configs.recommended.rules,
  'comma-dangle': [
    'error',
    'never'
  ],
  'eqeqeq': [
    'error',
    'always'
  ],
  'indent': [
    'error',
    2,
    {
      'CallExpression': {
        'arguments': 1
      },
      'FunctionDeclaration': {
        'body':       1,
        'parameters': 1
      },
      'FunctionExpression': {
        'body':       1,
        'parameters': 1
      },
      'MemberExpression': 1,
      'ObjectExpression': 1,
      'SwitchCase':       1,
      'ignoredNodes':     [
        'ConditionalExpression'
      ]
    }
  ],
  'key-spacing': [
    'error',
    {
      'align': {
        'beforeColon': false,
        'afterColon':  true,
        'on':          'value'
      }
    }
  ],
  'no-redeclare':                                  'off',
  'no-var':                                        'off',
  'no-multi-spaces':                               'off',
  'no-invalid-this':                               'off',
  'prefer-rest-params':                            'off',
  'jsdoc/check-examples':                          'off',
  'jsdoc/check-indentation':                       'error',
  'jsdoc/check-line-alignment':                    'error',
  'jsdoc/check-syntax':                            'error',
  'jsdoc/informative-docs':                        'error',
  'jsdoc/match-description':                       'error',
  'jsdoc/no-bad-blocks':                           'error',
  'jsdoc/no-blank-block-descriptions':             'error',
  'jsdoc/no-defaults':                             'error',
  'jsdoc/no-missing-syntax':                       'off',
  'jsdoc/no-restricted-syntax':                    'off',
  'jsdoc/no-types':                                'off',
  'jsdoc/require-asterisk-prefix':                 'error',
  'jsdoc/require-description':                     'error',
  'jsdoc/require-description-complete-sentence':   'error',
  'jsdoc/require-example':                         'off',
  'jsdoc/require-file-overview':                   'error',
  'jsdoc/require-hyphen-before-param-description': 'error',
  'jsdoc/require-throws':                          'error',
  'jsdoc/sort-tags':                               'error'
};

module.exports = [
  js.configs.recommended,
  googleConfig,
  jsdocPlugin.configs['flat/recommended-error'],
  // qunitPlugin.configs.recommended,
  {
    files: [
      'eslint.config.js',
      'examples/*.js',
      'gulpfile.js',
      'nyc.config.js',
      'source/agjCalendar/jquery.agjCalendar.js',
      'stylelint.config.js',
      'tests/*.js'
    ],
    plugins: {
      jsdoc: jsdocPlugin
      // qunit: qunitPlugin
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...globals.jquery,
        ...globals.qunit
      },
      ecmaVersion: 'latest',
      sourceType:  'module'
    },
    rules: rules
  },
  {
    files: [
      'examples/*.js'
    ],
    rules: {
      ...rules,
      'jsdoc/require-file-overview': 'off'
    }
  },
  {
    files: [
      'tests/cli.js'
    ],
    rules: {
      ...rules,
      'object-curly-spacing': 'off'
    }
  }
];
