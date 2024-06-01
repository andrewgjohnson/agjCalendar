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
 * @file The Stylelint configuration file for the agjCalendar jQuery plugin.
 * @copyright 2013–2024 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @license MIT
 * @see {@link https://github.com/andrewgjohnson/agjCalendar GitHub Repository}
 * @see {@link https://agjCalendar.agjjQuery.org/ Online Documentation}
 * @author Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @version 1.2.1
 */

module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-stylus'
  ],
  rules: {
    'alpha-value-notation':                      'number',
    'color-function-notation':                   'legacy',
    'color-hex-length':                          'long',
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: [
          'consecutive-duplicates-with-different-values'
        ]
      }
    ],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: [
          'inset'
        ]
      }
    ],
    'declaration-block-single-line-max-declarations': null,
    'function-no-unknown':                            [
      true,
      {
        ignoreFunctions: [
          'alpha'
        ]
      }
    ],
    'media-feature-name-no-unknown': [
      true,
      {
        ignoreMediaFeatureNames: [
          'min-device-pixel-ratio',
          'min--moz-device-pixel-ratio'
        ]
      }
    ],
    'media-feature-name-no-vendor-prefix': null,
    'media-feature-range-notation':        'prefix',
    'no-descending-specificity':           null,
    'stylus/no-eol-whitespace':            true,
    'property-no-vendor-prefix':           [
      true,
      {
        ignoreProperties: [
          'border-radius',
          'filter'
        ]
      }
    ],
    'selector-class-pattern': [
      'agjCalendar-[a-z-]+'
    ],
    'selector-id-pattern': [
      'agjCalendar',
      'agjCalendar-[a-z-]+'
    ],
    'selector-pseudo-element-colon-notation': 'single'
  }
};
