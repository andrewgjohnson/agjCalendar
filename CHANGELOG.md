# Changelog

All notable changes to the [agjCalendar plugin](https://github.com/andrewgjohnson/agjCalendar) will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this plugin adheres to [Semantic Versioning](http://semver.org/).

## v1.0.0 (July 23, 2023)
 * Renamed ctcCalendar to agjCalendar
 * Added support for `npm`, `Yarn` and `Bower` dependency managers
 * Added `.github` folder for extended GitHub support
 * Added `ESLint` support for Javascript
 * Added `Stylelint` support for CSS
 * Added `gulp.js` support to minify Javascript and CSS
 * Removed `minifer.bat` script
 * Changed the `expanderSelector` and `endExpanderSelector` options to be optional
 * Added Date object support to the `defaultDate`, `maximumDate` and `minimumDate` options
 * Removed unused `get_month_text()` and `get_day_text()` functions
 * Changed keyboard bindings to use `event.key` rather than `event.keyCode`
 * Added `$.fn.agjCalendar()` support
 * Fixed a bug causing a Javascript error when an invalid date was pre-entered into a text input
 * Fixed a bug causing a Javascript error when using a `<select>` element containing no `<option>` elements
 * Fixed a bug causing the calendar to prematurely hide if an ID selector wasn’t used
 * Refactored many areas of the codebase
 * Revamped the [examples](https://agjcalendar.agjjquery.org/examples-and-demo/)
 * Created the [agjCalendar.agjjQuery.org documentation website](https://agjcalendar.agjjquery.org/)

## v0.9.4 (June 23, 2023)
 * Updated the plugin to support the most recent version of `jQuery` (3.7.0), although it also works with 2.2.4
 * Dropped special handling for Internet Explorer 6
 * Replaced `google-code-prettify` with `highlight.js` for HTML syntax highlighting

## v0.9.3 (June 14, 2016)
 * Fixed a bug where browser level zooming was causing a display issue

## v0.9.2 (June 10, 2015)
 * Fixed a bug that caused the plugin to pollute the global namespace

## v0.9.1 (January 6, 2013)
 * Fixed a bug affecting some versions of Firefox

## v0.9.0 (January 6, 2013)
 * Intial public release of the plugin
