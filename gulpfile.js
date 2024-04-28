/* eslint max-len: 0 */
/* eslint no-undef: 0 */
/* eslint jsdoc/require-file-overview: 0 */


import gulp from 'gulp';
import cleanCss from 'gulp-clean-css';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import uglify from 'gulp-uglify';


/**
 * The minifyJavascript() function will generate jquery.agjCalendar.min.js.
 * @returns {object} - Returns a stream to allow for piping.
 */
export async function minifyJavascript() {
  return gulp
    .src('source/agjCalendar/jquery.agjCalendar.js')
    .pipe(uglify({
      output: {
        comments: 'some'
      }
    }))
    .pipe(rename('jquery.agjCalendar.min.js'))
    .pipe(gulp.dest('source/agjCalendar'));
}


/**
 * The minifyCss() function will generate jquery.agjCalendar.min.css.
 * @returns {object} - Returns a stream to allow for piping.
 */
export async function minifyCss() {
  return gulp
    .src([
      'source/agjCalendar/jquery.agjCalendar.css',
      'source/agjCalendar/jquery.agjCalendar.themes.css'
    ])
    .pipe(replace('/**', '/*!')) // cleanCss removes all comments unless they have the exclamation point
    .pipe(cleanCss({
      compatibility: 'ie7',
      rebase:        false,
      level:         {
        1: {
          optimizeFontWeight: false
        }
      }
    }))
    .pipe(replace('/*!', '/**')) // remove the exclamation points now that cleanCss is finished
    .pipe(concat('jquery.agjCalendar.min.css'))
    .pipe(gulp.dest('source/agjCalendar'));
}


/**
 * The minifyNoThemesCss() function will generate jquery.agjCalendar.min.no-themes.css.
 * @returns {object} - Returns a stream to allow for piping.
 */
export async function minifyNoThemesCss() {
  return gulp
    .src('source/agjCalendar/jquery.agjCalendar.css')
    .pipe(replace('/**', '/*!')) // cleanCss removes all comments unless they have the exclamation point
    .pipe(cleanCss({
      compatibility: 'ie7',
      rebase:        false,
      level:         {
        1: {
          optimizeFontWeight: false
        }
      }
    }))
    .pipe(replace('/*!', '/**')) // remove the exclamation points now that cleanCss is finished
    .pipe(rename('jquery.agjCalendar.min.no-themes.css'))
    .pipe(gulp.dest('source/agjCalendar'));
}


/**
 * Default task that runs all other tasks.
 */
export default gulp.series(
  minifyJavascript, // jquery.agjCalendar.min.js
  minifyCss, // jquery.agjCalendar.min.css
  minifyNoThemesCss // jquery.agjCalendar.min.no-themes.css
);
