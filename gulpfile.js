/* eslint no-undef: 0 */
/* eslint jsdoc/require-file-overview: 0 */
var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');


gulp.task('default', async function() {
  console.log('Starting the minifying process');


  // minify the Javascript source
  console.log('Starting to minify the Javascript source');
  gulp
    .src('source/agjCalendar/jquery.agjCalendar.js')
    .pipe(uglify({
      output: {
        comments: 'some'
      }
    }))
    .pipe(rename({
      suffix:  '.min',
      extname: '.js'
    }))
    .pipe(gulp.dest('source/agjCalendar'));
  console.log('Finished minifying the Javascript source');


  // minify the CSS source
  console.log('Starting to minify the CSS source');
  gulp
    .src('source/agjCalendar/jquery.agjCalendar.css')
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
    .pipe(replace('/*!', '/**'))
    .pipe(rename({
      suffix:  '.min',
      extname: '.css'
    }))
    .pipe(gulp.dest('source/agjCalendar'));
  console.log('Finished minifying the CSS source');


  console.log('Finished the minifying process');
});
