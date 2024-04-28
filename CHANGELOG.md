# Changelog

All notable changes to the [agjCalendar plugin](https://github.com/andrewgjohnson/agjCalendar) will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this plugin adheres to [Semantic Versioning](http://semver.org/).

## v1.1.0 (April 28, 2024)
 * The big new feature in v1.1.0 is *themes*
   * Added the `theme` option
   * Included eight built-in themes (`red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple` & `pink`)
   * Also included for support for custom themes
   * Added the `jquery.agjCalendar.themes.css` file to house the theme stylings
   * Added the `jquery.agjCalendar.min.no-themes.css` file to offer a smaller footprint to integrations without themes instead of `jquery.agjCalendar.min.css` which now includes theme styleings
 * Refactored `gulpfile.js` to separate each minified file into its own function
 * Updated `ESlint` to v19.1.1
 * Replaced the `eslint-config-google` package with the `eslint-config-google-jsdocless` package to avoid the now deprecated `valid-jsdoc` and `require-jsdoc` rules
 * Removed `.estlintrc.yml` and replaced with `eslint.config.js`
 * Updated `Stylelint` to v16.4.0
 * Removed `no-eol-whitespace` rule for `Stylelint` now that it is fully deprecated and replaced with the `stylus/no-eol-whitespace` rule from the `stylelint-stylus` package
 * Added semi-transparent PNG’s as the default instead of GIF’s which are remaining for old IE support
 * Added `border-radius` in CSS and an exception in `.stylelintrc.yml`
 * Updated jQuery version from `3.7.0` to `3.7.1`
 * Updated HTML examples to use `<!--` and `-->` XML style comments rather than `//` Javascript style comments
 * Updated `highlight.js` on the documentation website to v11.9.0
 * Added new one-off files to `exclude` list of `_config.yml`
 * Various fixes for typos throughout comments and documentation

## v1.0.3 (August 5, 2023)
 * Fixed a bug where the `defaultDate` or `defaultEndDate` option being set to `"blank"` would occasionally throw a Javascript error

## v1.0.2 (August 5, 2023)
 * Cleaned up [example 6](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example6-existing-values.js) to better illustrate existing/original values
 * Enabled the `eqeqeq` rule in ESLint and ensured all comparisons are `===`/`!==` instead of `==`/`!=`
 * Fixed a typo in the documentation of the `dateToString()` function
 * Fixed a bug in the `updateDropdown()` function that caused extra months to be presented in the date picker dropdown for end dates when a start date was already set
 * Fixed a bug that would cause the date picker to be correctly positioned when switching between `"modal"` and `"full"` integrations
 * Added the `defaultEndDate` option
 * Updated the `getDaysInMonth()` function to use base 0 for the months rather than base 1
 * Updated the `monthNameToNumber()` function with a minor optimization
 * Updated calendar-icon.gif to be retina display friendly on the documentation website
 * Updated `highlight.js` on the documentation website to v11.8.0 and explicitly defined the languages (CSS and Javascript) used in code snippets
 * Added some details to README.md

## v1.0.1 (July 30, 2023)
 * Added retina display support for images
 * Updated `Stylelint` to allow retina display support in the CSS stylesheet
 * Added support for original/existing values and added an example showing how they work
 * Removed leading zero from tooltips on the date picker when `language` is set to French
 * Updated comments on layout.html template
 * Images were optimized by [@ImgBotApp](https://github.com/ImgBotApp)

## v1.0.0 (July 30, 2023)
 * Renamed ctcCalendar to agjCalendar (the `$.ctcCalender()` function is still supported for backwards compatability)
 * Added support for `npm`, `Yarn` and `Bower` dependency managers
 * Added `.github` folder for extended GitHub support
 * Added `ESLint` support for Javascript
 * Added `Stylelint` support for CSS
 * Added `gulp.js` support to minify Javascript and CSS 
 * Removed `minifer.bat` script
 * Added `JSDoc` comments to all functions within the plugin
 * Changed the `expanderSelector` and `endExpanderSelector` options to be optional
 * Refactored the `autoSetEndDate` option to use four possible values rather than boolean logic (true and false are handled for backwards compatibility)
 * Added Date object support to the `defaultDate`, `maximumDate` and `minimumDate` options
 * Removed unused `get_month_text()` and `get_day_text()` functions
 * Changed keyboard bindings to use `event.key` rather than `event.keyCode`
 * Added `$.fn.agjCalendar()` support
 * Added the `excludeDates` option to allow individual dates to be excluded
 * Added the `language` option with support for both English and French
 * Added date format 5 for the `dateFormat` option, primarily for use in French integrations
 * Added tooltips to the days of the week header
 * Added console error messages when invalid selectors are used
 * Added retina display support to the CSS image icons
 * Fixed a bug causing a Javascript error when an invalid date was pre-entered into a text input
 * Fixed a bug causing a Javascript error when using a `<select>` element containing no `<option>` elements
 * Fixed a bug causing the calendar to prematurely hide if an ID selector wasn’t used
 * Fixed a bug causing an invalid end date to be set automatically when the `defaultRange` option went past the `maximumDate` option
 * Fixed a bug causing date formats 2 and 4 to not update the end date when a start date was manually typed into a text input (blur event)
 * Fixed a bug where after selecting a date the user’s scroll position would be lost and the user would be bounced to the top of the page when the `calendarDisplay` option was set to `"modal"` or `"full"`
 * Fixed a bug where the date picker would flicker and be unusable on some desktop computers when the `calendarDisplay` option was set to `"modal"` or `"full"`
 * Updated copyright comments to strictly follow `JSDoc` recommendations
 * Refactored many areas of the codebase
 * Revamped the [examples](https://github.com/andrewgjohnson/agjCalendar/tree/master/examples)
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
