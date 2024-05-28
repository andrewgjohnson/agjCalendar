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

import globals from 'globals';
import google from 'eslint-config-google-jsdocless';
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';

/**
 * The duplicateObject function() will accept an object as a parameter and
 * return an exact duplicate of that object removing the concern of copying an
 * object by reference.
 * @param {object|*} obj - The object to be duplicated.
 * @returns {object|*} - Returns an exact duplicate of the obj parameter if it
 * is an object and the obj parameter if not.
 */
var duplicateObject = function(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  var newObj = obj.constructor();
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = duplicateObject(obj[key]);
    }
  }
  return newObj;
};

var rules = {
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
        'arguments': 1 // this is a change from google’s indent rule definition
      },
      'FunctionDeclaration': {
        'body':       1,
        'parameters': 1 // this is a change from google’s indent rule definition
      },
      'FunctionExpression': {
        'body':       1,
        'parameters': 1 // this is a change from google’s indent rule definition
      },
      'MemberExpression': 1, // this is a change from google’s indent rule definition
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
  'jsdoc/check-access':                            'error', // recommended by the jsdoc plugin
  'jsdoc/check-alignment':                         'error', // recommended by the jsdoc plugin
  'jsdoc/check-examples':                          'off',
  'jsdoc/check-indentation':                       'error',
  'jsdoc/check-line-alignment':                    'error',
  'jsdoc/check-param-names':                       'error', // recommended by the jsdoc plugin
  'jsdoc/check-property-names':                    'error', // recommended by the jsdoc plugin
  'jsdoc/check-syntax':                            'error',
  'jsdoc/check-tag-names':                         'error', // recommended by the jsdoc plugin
  'jsdoc/check-types':                             'error', // recommended by the jsdoc plugin
  'jsdoc/check-values':                            'error', // recommended by the jsdoc plugin
  'jsdoc/empty-tags':                              'error', // recommended by the jsdoc plugin
  'jsdoc/implements-on-classes':                   'error', // recommended by the jsdoc plugin
  'jsdoc/informative-docs':                        'error',
  'jsdoc/match-description':                       'error',
  'jsdoc/multiline-blocks':                        'error', // recommended by the jsdoc plugin
  'jsdoc/no-bad-blocks':                           'error',
  'jsdoc/no-blank-block-descriptions':             'error',
  'jsdoc/no-defaults':                             'error',
  'jsdoc/no-missing-syntax':                       'off',
  'jsdoc/no-multi-asterisks':                      'error', // recommended by the jsdoc plugin
  'jsdoc/no-restricted-syntax':                    'off',
  'jsdoc/no-types':                                'off',
  'jsdoc/no-undefined-types':                      'error', // recommended by the jsdoc plugin
  'jsdoc/require-asterisk-prefix':                 'error',
  'jsdoc/require-description':                     'error',
  'jsdoc/require-description-complete-sentence':   'error',
  'jsdoc/require-example':                         'off',
  'jsdoc/require-file-overview':                   'error',
  'jsdoc/require-hyphen-before-param-description': 'error',
  'jsdoc/require-jsdoc':                           'error', // recommended by the jsdoc plugin
  'jsdoc/require-param':                           'error', // recommended by the jsdoc plugin
  'jsdoc/require-param-description':               'error', // recommended by the jsdoc plugin
  'jsdoc/require-param-name':                      'error', // recommended by the jsdoc plugin
  'jsdoc/require-param-type':                      'error', // recommended by the jsdoc plugin
  'jsdoc/require-property':                        'error', // recommended by the jsdoc plugin
  'jsdoc/require-property-description':            'error', // recommended by the jsdoc plugin
  'jsdoc/require-property-name':                   'error', // recommended by the jsdoc plugin
  'jsdoc/require-property-type':                   'error', // recommended by the jsdoc plugin
  'jsdoc/require-returns':                         'error', // recommended by the jsdoc plugin
  'jsdoc/require-returns-check':                   'error', // recommended by the jsdoc plugin
  'jsdoc/require-returns-description':             'error', // recommended by the jsdoc plugin
  'jsdoc/require-returns-type':                    'error', // recommended by the jsdoc plugin
  'jsdoc/require-throws':                          'error',
  'jsdoc/require-yields':                          'error', // recommended by the jsdoc plugin
  'jsdoc/require-yields-check':                    'error', // recommended by the jsdoc plugin
  'jsdoc/sort-tags':                               'error',
  'jsdoc/tag-lines':                               'error', // recommended by the jsdoc plugin
  'jsdoc/valid-types':                             'error' // recommended by the jsdoc plugin
};

var rulesForExamples = duplicateObject(rules);
rulesForExamples['jsdoc/require-file-overview'] = 'off';

var rulesForConfigurationFiles = duplicateObject(rules);
rulesForConfigurationFiles['max-len'] = 'off';

export default [
  js.configs.recommended,
  google,
  {
    files: [
      'eslint.config.js',
      'examples/*.js',
      'gulpfile.js',
      'nyc.config.js',
      'source/agjCalendar/jquery.agjCalendar.js',
      'stylelint.config.js',
      'tests/qunit.js'
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        'jQuery': 'readonly',
        '$':      'readonly',
        'QUnit':  'readonly'
      },
      ecmaVersion: 'latest',
      sourceType:  'module'
    },
    plugins: {
      jsdoc: jsdoc
    },
    rules: rules
  },
  {
    files: [
      'examples/*.js'
    ],
    rules: rulesForExamples
  },
  {
    files: [
      'eslint.config.js',
      'nyc.config.js',
      'stylelint.config.js'
    ],
    rules: rulesForConfigurationFiles
  }
];
