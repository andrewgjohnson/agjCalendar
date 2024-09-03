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
 * @version 1.2.2
 */

/* global Buffer */

var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var through2 = require('through2');
var uglify = require('gulp-uglify');

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
 * The minifyCss() function will generate jquery.agjCalendar.min.css.
 * @returns {object} - Returns a stream to allow for piping.
 */
var minifyCss = function() {
  return processCss(
    [
      'source/agjCalendar/jquery.agjCalendar.css',
      'source/agjCalendar/jquery.agjCalendar.themes.css'
    ],
    'source/agjCalendar',
    'jquery.agjCalendar.min.css'
  );
};

/**
 * The minifyNoThemesCss() function will generate
 * jquery.agjCalendar.min.no-themes.css.
 * @returns {object} - Returns a stream to allow for piping.
 */
var minifyNoThemesCss = function() {
  return processCss(
    [
      'source/agjCalendar/jquery.agjCalendar.css'
    ],
    'source/agjCalendar',
    'jquery.agjCalendar.min.no-themes.css'
  );
};

/**
 * The minifyJavascript() function will generate jquery.agjCalendar.min.js.
 * @returns {object} - Returns a stream to allow for piping.
 */
var minifyJavascript = function() {
  return processJavascript(
    [
      'source/agjCalendar/jquery.agjCalendar.js'
    ],
    'source/agjCalendar',
    'jquery.agjCalendar.min.js'
  );
};

/**
 * The minifyJavascript() function will generate
 * jquery.agjCalendar.min.english-only.js.
 * @returns {object} - Returns a stream to allow for piping.
 */
var minifyEnglishOnlyJavascript = function() {
  return processJavascript(
    [
      'source/agjCalendar/jquery.agjCalendar.js'
    ],
    'source/agjCalendar',
    'jquery.agjCalendar.min.english-only.js',
    true
  );
};

/**
 * Default task that runs all other tasks.
 */
gulp.task('default', gulp.series(

  // Generate jquery.agjCalendar.min.css
  minifyCss,

  // Generate jquery.agjCalendar.min.no-themes.css
  minifyNoThemesCss,

  // Generate jquery.agjCalendar.min.js
  minifyJavascript,

  // Generate jquery.agjCalendar.min.english-only.js
  minifyEnglishOnlyJavascript

));
