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
 * @file The gulp.js configuration file for the agjCalendar jQuery plugin.
 * @copyright 2013–2024 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @license MIT
 * @see {@link https://github.com/andrewgjohnson/agjCalendar GitHub Repository}
 * @see {@link https://agjCalendar.agjjQuery.org/ Online Documentation}
 * @author Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @version 1.2.0
 */

/* global Buffer */

import gulp from 'gulp';
import cleanCss from 'gulp-clean-css';
import concat from 'gulp-concat';
import replace from 'gulp-replace';
import through2 from 'through2';
import uglify from 'gulp-uglify';

/**
 * The processCss() function will process one or more CSS files into a single
 * minified CSS file.
 * @param {Array} paths - Path(s) to the source CSS file(s).
 * @param {string} folder - The folder of the minified CSS file.
 * @param {string} filename - The filename of the minified CSS file.
 * @returns {object} - Returns a stream to allow for piping.
 */
var processCss = function(paths, folder, filename) {
  return gulp
    .src(paths)
    // cleanCss removes all comments unless they have the exclamation point
    .pipe(replace('/**', '/*!'))
    .pipe(cleanCss({
      compatibility: 'ie7',
      rebase:        false,
      level:         {
        1: {
          optimizeFontWeight: false
        }
      }
    }))
    // remove the exclamation points now that cleanCss is finished
    .pipe(replace('/*!', '/**'))
    .pipe(concat(filename))
    .pipe(gulp.dest(folder));
};

/**
 * The processJavascript() function will process one or more Javascript files
 * into a single minified Javascript file.
 * @param {Array} paths - Path(s) to the source Javascript file(s).
 * @param {string} folder - The folder of the minified Javascript file.
 * @param {string} filename - The filename of the minified Javascript file.
 * @param {boolean} removeNonEnglish - Whether or not to remove non-English
 * languages.
 * @returns {object} - Returns a stream to allow for piping.
 */
var processJavascript = function(paths, folder, filename, removeNonEnglish) {
  removeNonEnglish = removeNonEnglish === true;

  return gulp
    .src(paths)
    // run the Javascript code through the removeNonEnglishLanguages function
    // if removeNonEnglish is true
    .pipe(through2.obj(function(file, encoding, callback) {
      if (removeNonEnglish && file.isBuffer()) {
        var contents = file.contents.toString(encoding);
        var processedContents = removeNonEnglishLanguages(contents);
        file.contents = Buffer.from(processedContents, encoding);
      }
      callback(null, file);
    }))
    .pipe(uglify({
      output: {
        comments: 'some'
      }
    }))
    .pipe(through2.obj(function(file, encoding, callback) {
      if (file.isBuffer()) {
        var contents = file.contents.toString(encoding);
        var processedContents = formatMultilineComments(contents);
        file.contents = Buffer.from(processedContents, encoding);
      }
      callback(null, file);
    }))
    .pipe(concat(filename))
    .pipe(gulp.dest(folder));
};

/**
 * The formatMultilineComments() function will format multiline comments in the
 * Javascript code.
 * @param {string} javascriptCode - The Javascript code from which to format the
 * multiline comments.
 * @returns {string} - Returns the Javascript code with non-English languages
 * removed.
 */
var formatMultilineComments = function(javascriptCode) {
  var javascriptLines = javascriptCode.split('\n');

  var multilineComment = false;
  for (var i = 0; i < javascriptLines.length; i++) {
    if (multilineComment && javascriptLines[i].trimStart().indexOf('*') === 0) {
      // we want exactly one space before the asterisk
      javascriptLines[i] = ' ' + javascriptLines[i].substring(
        javascriptLines[i].indexOf('*')
      );
    }

    if (javascriptLines[i].indexOf('/**') !== -1) {
      multilineComment = true;
    } else if (javascriptLines[i].indexOf('*/') !== -1) {
      multilineComment = false;
    }
  }

  return javascriptLines.join('\n');
};

/**
 * The enableCliUsage() function will enable CLI usage of the Javascript code.
 * @param {string} javascriptCode - The Javascript code to enable CLI use of.
 * @returns {string} - Returns the Javascript code ready for CLI use.
 */
var enableCliUsage = function(javascriptCode) {
  var cliFriendlyJavascriptCode = '';

  cliFriendlyJavascriptCode += '/**';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * THIS IS A GENERATED FILE, ANY CHANGES SHOU' +
    'LD HAPPEN IN gulpfile.js NOT';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * DIRECTLY TO THIS FILE';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' *';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * Copyright (c) 2013–2024 Andrew G. Johnson ' +
    '<andrew@andrewgjohnson.com>';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * Permission is hereby granted, free of char' +
    'ge, to any person obtaining a copy';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * of this software and associated documentat' +
    'ion files (the “Software”), to deal';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * in the Software without restriction, inclu' +
    'ding without limitation the rights';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * to use, copy, modify, merge, publish, dist' +
    'ribute, sublicense, and/or sell';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * copies of the Software, and to permit pers' +
    'ons to whom the Software is';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * furnished to do so, subject to the followi' +
    'ng conditions:';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * The above copyright notice and this permis' +
    'sion notice shall be included in';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * all copies or substantial portions of the ' +
    'Software.';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT ' +
    'WARRANTY OF ANY KIND, EXPRESS OR';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * IMPLIED, INCLUDING BUT NOT LIMITED TO THE ' +
    'WARRANTIES OF MERCHANTABILITY,';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * FITNESS FOR A PARTICULAR PURPOSE AND NONIN' +
    'FRINGEMENT. IN NO EVENT SHALL THE';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR' +
    ' ANY CLAIM, DAMAGES OR OTHER';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * LIABILITY, WHETHER IN AN ACTION OF CONTRAC' +
    'T, TORT OR OTHERWISE, ARISING FROM,';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * OUT OF OR IN CONNECTION WITH THE SOFTWARE ' +
    'OR THE USE OR OTHER DEALINGS IN THE';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * SOFTWARE.';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * @file The QUnit test suite CLI script for ' +
    'the agjCalendar jQuery plugin.';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * @copyright 2013–2024 Andrew G. Johnson <an' +
    'drew@andrewgjohnson.com>';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * @license MIT';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * @see {@link https://github.com/andrewgjohn' +
    'son/agjCalendar GitHub Repository}';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * @see {@link https://agjCalendar.agjjQuery.' +
    'org/ Online Documentation}';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * @author Andrew G. Johnson <andrew@andrewgj' +
    'ohnson.com>';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' * @version 1.2.0';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += ' */';
  cliFriendlyJavascriptCode += '\n\n';
  cliFriendlyJavascriptCode += '/* THIS IS A GENERATED FILE, ANY CHANGES SHOU' +
    'LD HAPPEN IN gulpfile.js NOT';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += 'DIRECTLY TO THIS FILE */';
  cliFriendlyJavascriptCode += '\n\n';
  cliFriendlyJavascriptCode += 'import { readFileSync } from \'fs\';';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += 'import { JSDOM } from \'jsdom\';';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += 'import jQuery from \'jquery\';';
  cliFriendlyJavascriptCode += '\n\n';
  cliFriendlyJavascriptCode += 'console.error = function() {}; // suppress co' +
    'nsole.error calls in the test suite';
  cliFriendlyJavascriptCode += '\n\n';
  cliFriendlyJavascriptCode += 'const { window } = new JSDOM(readFileSync(\'t' +
    'ests/index.html\', \'utf-8\'));';
  cliFriendlyJavascriptCode += '\n\n';
  cliFriendlyJavascriptCode += 'const { document, navigator } = window;';
  cliFriendlyJavascriptCode += '\n\n';
  cliFriendlyJavascriptCode += 'global.window = window;';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += 'global.document = document;';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += 'global.navigator = navigator;';
  cliFriendlyJavascriptCode += '\n\n';
  cliFriendlyJavascriptCode += 'const jQueryModule = await import(\'jquery\');';
  cliFriendlyJavascriptCode += '\n';
  cliFriendlyJavascriptCode += 'global.jQuery = jQueryModule.default(window);';
  cliFriendlyJavascriptCode += '\n\n';
  cliFriendlyJavascriptCode += javascriptCode;
  cliFriendlyJavascriptCode += '\n\n';
  cliFriendlyJavascriptCode += 'export default QUnit;';
  cliFriendlyJavascriptCode += '\n';

  while (
    cliFriendlyJavascriptCode !==
      cliFriendlyJavascriptCode.replace('})(jQuery);', '})(global.jQuery);')
  ) {
    cliFriendlyJavascriptCode =
      cliFriendlyJavascriptCode.replace('})(jQuery);', '})(global.jQuery);');
  }

  while (
    cliFriendlyJavascriptCode !==
      cliFriendlyJavascriptCode.replace('}(jQuery);', '}(global.jQuery);')
  ) {
    cliFriendlyJavascriptCode =
      cliFriendlyJavascriptCode.replace('}(jQuery);', '}(global.jQuery);');
  }

  return cliFriendlyJavascriptCode;
};

/**
 * The removeNonEnglishLanguages() function will remove the non-English
 * languages from the Javascript code.
 * @param {string} javascriptCode - The Javascript code from which to remove
 * the non-English languages.
 * @returns {string} - Returns the Javascript code with non-English languages
 * removed.
 */
var removeNonEnglishLanguages = function(javascriptCode) {
  var startOfTranslations = javascriptCode.indexOf(
    'var includedTranslations = {'
  );
  if (startOfTranslations >= 0) {
    var endOfEnglishString = '\n    },';
    var endOfEnglish = javascriptCode.indexOf(
      endOfEnglishString,
      startOfTranslations
    );
    if (startOfTranslations >= 0) {
      var endOfTranslationsString = '\n  };';
      var endOfTranslations = javascriptCode.indexOf(
        endOfTranslationsString,
        endOfEnglish
      );
      if (endOfTranslations >= 0) {
        var startThroughEnglish = javascriptCode.substring(
          0,
          endOfEnglish + endOfEnglishString.length
        );
        var endOfTranslationsThroughEof = javascriptCode.substring(
          endOfTranslations
        );
        return startThroughEnglish + endOfTranslationsThroughEof;
      }
    }
  }

  return javascriptCode;
};

/**
 * The generateQUnitCli() function will generate cli.js.
 * @returns {object} - Returns a stream to allow for piping.
 */
export async function generateQUnitCli() {
  return gulp
    .src([
      'source/agjCalendar/jquery.agjCalendar.js',
      'tests/qunit.js'
    ])
    .pipe(uglify({
      output: {
        comments: 'some'
      }
    }))
    .pipe(through2.obj(function(file, encoding, callback) {
      if (file.isBuffer()) {
        var contents = file.contents.toString(encoding);
        var processedContents = formatMultilineComments(contents);
        file.contents = Buffer.from(processedContents, encoding);
      }
      callback(null, file);
    }))
    .pipe(concat('cli.js'))
    // run the Javascript code through the enableCliUsage function
    .pipe(through2.obj(function(file, encoding, callback) {
      if (file.isBuffer()) {
        var contents = file.contents.toString(encoding);
        var processedContents = enableCliUsage(contents);
        file.contents = Buffer.from(processedContents, encoding);
      }
      callback(null, file);
    }))
    .pipe(gulp.dest('tests'));
}

/**
 * The minifyCss() function will generate jquery.agjCalendar.min.css.
 * @returns {object} - Returns a stream to allow for piping.
 */
export async function minifyCss() {
  return processCss(
    [
      'source/agjCalendar/jquery.agjCalendar.css',
      'source/agjCalendar/jquery.agjCalendar.themes.css'
    ],
    'source/agjCalendar',
    'jquery.agjCalendar.min.css'
  );
}

/**
 * The minifyNoThemesCss() function will generate
 * jquery.agjCalendar.min.no-themes.css.
 * @returns {object} - Returns a stream to allow for piping.
 */
export async function minifyNoThemesCss() {
  return processCss(
    [
      'source/agjCalendar/jquery.agjCalendar.css'
    ],
    'source/agjCalendar',
    'jquery.agjCalendar.min.no-themes.css'
  );
}

/**
 * The minifyJavascript() function will generate jquery.agjCalendar.min.js.
 * @returns {object} - Returns a stream to allow for piping.
 */
export async function minifyJavascript() {
  return processJavascript(
    [
      'source/agjCalendar/jquery.agjCalendar.js'
    ],
    'source/agjCalendar',
    'jquery.agjCalendar.min.js'
  );
}

/**
 * The minifyJavascript() function will generate
 * jquery.agjCalendar.min.english-only.js.
 * @returns {object} - Returns a stream to allow for piping.
 */
export async function minifyEnglishOnlyJavascript() {
  return processJavascript(
    [
      'source/agjCalendar/jquery.agjCalendar.js'
    ],
    'source/agjCalendar',
    'jquery.agjCalendar.min.english-only.js',
    true
  );
}

/**
 * Default task that runs all other tasks.
 */
export default gulp.series(

  // Generate cli.js
  generateQUnitCli,

  // Generate jquery.agjCalendar.min.css
  minifyCss,

  // Generate jquery.agjCalendar.min.no-themes.css
  minifyNoThemesCss,

  // Generate jquery.agjCalendar.min.js
  minifyJavascript,

  // Generate jquery.agjCalendar.min.english-only.js
  minifyEnglishOnlyJavascript

);
