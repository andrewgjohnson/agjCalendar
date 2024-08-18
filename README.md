# agjCalendar

[![MIT License](https://img.shields.io/badge/license-MIT-0366d6.png?colorB=0366d6&style=flat-square)](https://github.com/andrewgjohnson/agjCalendar/blob/master/LICENSE)
[![Current Release](https://img.shields.io/github/release/andrewgjohnson/agjCalendar.png?colorB=0366d6&style=flat-square&logoColor=white&logo=github)](https://github.com/andrewgjohnson/agjCalendar/releases)
[![Tested by QUnit](https://img.shields.io/badge/qunit-passing-0366d6.png?colorB=0366d6&style=flat-square)](https://agjCalendar.agjjQuery.org/tests/index.html)
[![Coveralls Coverage](https://img.shields.io/coverallsCoverage/github/andrewgjohnson/agjCalendar.png?colorB=0366d6&style=flat-square&logoColor=white&logo=coveralls)](https://coveralls.io/github/andrewgjohnson/agjCalendar)
[![Issues](https://img.shields.io/github/issues/andrewgjohnson/agjCalendar.png?colorB=0366d6&style=flat-square&logoColor=white&logo=github)](https://github.com/andrewgjohnson/agjCalendar/issues)
[![npm Downloads](https://img.shields.io/npm/dt/agjcalendar.png?colorB=0366d6&style=flat-square&logoColor=white&logo=npm)](https://www.npmjs.com/package/agjcalendar)
[![Patreon](https://agjCalendar.agjjQuery.org/documentation/agjgd.org/images/patreon-badge.png)](https://patreon.com/agjopensource)

<p align="center">
  <a href="https://agjcalendar.agjjquery.org/" title="">
    <img src="https://agjcalendar.agjjquery.org/documentation/agjCalendar.agjjQuery.org/images/avatar.png" alt="" title="" width="400" height="400" id="avatar" />
  </a>
</p>

## Description

**agjCalendar** is a plugin for the [jQuery](https://jquery.com/) Javascript library to deal with calendars, dates and date ranges.

[![Patreon - Become a Patron](https://raster.shields.io/badge/Patreon%20-become%20a%20Patron-FD334A.png?style=for-the-badge&logo=patreon&logoColor=FD334A)](https://patreon.com/agjopensource)

**agjCalendar** is an [agjjQuery.org](https://agjjquery.org) plugin.

## Examples

    // The most basic agjCalendar integration
    $('#text-input').agjCalendar();

    // An alternative way of doing the same thing
    $.agjCalendar({
      dateSelector: '#text-input'
    });

    // A more complex agjCalendar integration
    $.agjCalendar({
      dateFormat:          'M j, Y',
      calendarCount:       3,
      inputType:           'text',
      dateSelector:        '#start-date',
      expanderSelector:    '#start-date-icon',
      minimumDate:         '2023-01-01',
      maximumDate:         '2023-12-31',
      defaultDate:         '2023-07-09',
      defaultEndDate:      '2023-07-10',
      allowRange:          true,
      minimumRange:        1,
      maximumRange:        7,
      defaultRange:        2,
      endDateSelector:     '#end-date',
      endExpanderSelector: '#end-date-icon'
    });

There are [other examples](https://github.com/andrewgjohnson/agjCalendar/tree/master/examples) included in the GitHub repository and on [agjCalendar.agjjQuery.org](https://agjcalendar.agjjquery.org/examples-and-demo/).

## Options

When intializing an agjCalendar integration you can set its configuration options by passing a JSON object of values.

    // A basic agjCalendar integration that will render a calendar that uses Monday to start the week
    $.agjCalendar({
      dateSelector:      '#text-input',
      startWeekOnMonday: true
    });

    // Alternatively you can use the $.fn.agjCalendar() function for the same result
    $('#text-input').agjCalendar({
      startWeekOnMonday: true
    });

A complete list of all options, their default values, valid values and notes is available below.

key|type|default|values|notes
---|----|-------|------|-----
allowBlankDates|`boolean`|`false`|`true`<br />`false`|If set to `true` blank dates will be permitted
allowRange|`boolean`|`false`|`true`<br />`false`|If set to `true` a second date can be entered with the `endDateSelector` option or the `endMonthSelector` and `endDaySelector` options
autoBlur|`boolean`|`true` if `calendarDisplay` is set to `'modal'` or `'full'` otherwise `false`|`true`<br />`false`|If set to `true` automatically lose focus (blur) immediately after a text field is focused (only used when `inputType` is set to `'text'`)<br />
autoSetEndDate|`string`|`'dates'`|`'blanks'`<br />`'dates'`<br />`'always'`<br />`'never'`|This option controls whether or not the end date will automatically change when the start date changes;<br />`'blanks'` will only trigger when the end date is blank,<br />`'dates'` will only trigger when the end date is a date,<br />`'always'` will trigger for both and<br />`'never'` will trigger for neither (only used when `allowRange` is set to `true`)
calendarCount|`integer`|`1`|`1`<br />`2`<br />`3`|Defines whether the date picker uses a single, double or triple calendar (only used when `calendarDisplay` is set to `'inline'` or `'modal'`)
calendarDisplay|`string`|`'inline'`|`'inline'`<br />`'modal'`<br />`'full'`|Toggles whether the date picker is displayed as `'inline'`, `'modal'` or `'full'`
calendarSize|`string`|`'small'`|`'small'`<br />`'medium'`<br />`'large'`|Defines whether the date picker displays as small, medium or large (only used when `calendarDisplay` is set to `'inline'` or `'modal'`)
dateFormat|`string`|`'m/d/Y'`|A string using our [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options)|Determines which date format is used for text inputs (only used when inputType is set to `'text'`)<br /><br />See [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options) for details
dateFormatDate|`string`|`'j'`|A string using our [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options)|Determines which date format is used for dates on the date picker<br /><br />See [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options) for details
dateFormatDateTooltip|`string`|`'F j, Y'` for English<br /><br />`'j F Y'` for non-English|A string using our [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options)|Determines which date format is used for date tooltips on the date picker<br /><br />See [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options) for details
dateFormatDayInput|`string`|`'j'`|A string using our [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options)|Determines which date format is used for day dropdown inputs (only used when `inputType` is set to `'dropdown'` and `calendarDisplay` is set to `'inline'` or `'modal'`)<br /><br />See [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options) for details
dateFormatDayOfWeekTooltip|`string`|`'l'`|A string using our [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options)|Determines which date format is used for day of week tooltips on the date picker<br /><br />See [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options) for details
dateFormatMonthDropdown|`string`|`'M Y'`|A string using our [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options)|Determines which date format is used for the month dropdown on the date picker<br /><br />See [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options) for details
dateFormatMonthInput|`string`|`'M Y'`|A string using our [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options)|Determines which date format is used for month dropdown inputs (only used when `inputType` is set to `'dropdown'` and `calendarDisplay` is set to `'inline'` or `'modal'`)<br /><br />See [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options) for details
dateFormatMonthLabel|`string`|`'F Y'`|A string using our [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options)|Determines which date format is used for month labels on the date picker (only used when `calendarCount` is set to `2` or `3`)<br /><br />See [Date Format Options](https://agjCalendar.agjjQuery.org/#date-format-options) for details
dateSelector|`string`|`null`||Accepts a string value for your target text element such as `'#text-input'` (only used when `inputType` is set to `'text'`)
dayNameEllipsis|`boolean`|`true`|`true`<br />`false`|Determines whether longer day names will be cut-off with an ellipsis
dayNameFormat|`string`|`'short'`|`'short'`<br />`'abbreviated'`<br />`'full'`|Determines which day format is used for days of the week on the date picker<br /><br />`'short'` = first letter, e.g. F<br />`'abbreviated'` = partial name, e.g. Fri<br />`'full'` = full name, e.g. Friday
daySelector|`string`|`null`||Accepts a string value for your target day dropdown element such as `'#day-select'` (only used when `inputType` is set to `'dropdown'`)
defaultDate|`Date|string`|Today’s date|A Date object, a string formatted as YYYY-MM-DD or `'blank'`|The default date to prefill
defaultEndDate|`Date|string`|Today’s date plus the `defaultRange`|A Date object, a string formatted as YYYY-MM-DD or `'blank'`|The default end date to prefill (only used when `allowRange` is set to `true`)
defaultRange|`integer`|`0` if the `minimumDate` and `maximumDate` options are set to the same date otherwise `1`|Any non-negative integer|The default date range (only used when `allowRange` is set to `true`)
endDateSelector|`string`|`null`||The same as `dateSelector` but for the end date (only used when `allowRange` is set to `true` and `inputType` is set to `'text'`)
endDaySelector|`string`|`null`||The same as `daySelector` but for the end date (only used when `allowRange` is set to `true` and `inputType` is set to `'dropdown'`)
endExpanderSelector|`string`|`null`||The same as `expanderSelector` but for the end date (only used when `allowRange` is set to `true`)
endMonthSelector|`string`|`null`||The same as `monthSelector` but for the end date (only used when `allowRange` is set to `true` and `inputType` is set to `'dropdown'`)
excludeDates|`array`|`[]`|An array of Date objects and/or strings formatted as YYYY-MM-DD|Individual dates that will be excluded from the date picker
expanderSelector|`string`|`null`||Accepts a string value for an additional target element to expand the calendar such as `'#calendar-icon'`
forceMaxZIndex|`boolean`|`false`|`true`<br />`false`|Force the maximum z-index value (`2147483647`) on the date picker instead of calculating based on an integration’s elements’ z-index values (only used when `calendarDisplay` is set to `'inline'`)
inputType|`string`|`'text'`|`'text'`<br />`'dropdown'`|If set to `'text'` will use the `dateSelector` option to store the date or if set to `'dropdown'` will use the `monthSelector` and `daySelector` options to store the date
language|`string`|`'en'`|`'en'`<br />`'ar'`<br />`'bn'`<br />`'de'`<br />`'es'`<br />`'fr'`<br />`'he'`<br />`'hi'`<br />`'it'`<br />`'ja'`<br />`'ko'`<br />`'mr'`<br />`'pa'`<br />`'pt'`<br />`'ru'`<br />`'te'`<br />`'tr'`<br />`'ur'`<br />`'vi'`<br />`'zh'`|The language for the text elements on the date picker<br /><br />`'en'` = English<br />`'ar'` = اَلْعَرَبِيَّةُ (Arabic)<br />`'bn'` = বাংলা (Bengali)<br />`'de'` = Deutsch (German)<br />`'es'` = Español (Spanish)<br />`'fr'` = Français (French)<br />`'he'` = עִבְרִית (Hebrew)<br />`'hi'` = आधुनिक मानक हिन्दी (Hindi)<br />`'it'` = Italiano (Italian)<br />`'ja'` = 日本語 (Japanese)<br />`'ko'` = 한국어 (Korean)<br />`'mr'` = मराठी (Marathi)<br />`'pa'` = پنجابی (Punjabi)<br />`'pt'` = Português (Portuguese)<br />`'ru'` = русский язык (Russian)<br />`'te'` = తెలుగు (Telugu)<br />`'tr'` = Türkçe (Turkish)<br />`'ur'` = اردو (Urdu)<br />`'vi'` = Tiếng Việt (Vietnamese)<br />`'zh'` = 官话 (Chinese Mandarin)<br /><br />Our online documentation has more details on the [translations page](https://agjcalendar.agjjquery.org/translations/)
maximumDate|`Date|string`|Today’s date plus one year|A Date object or a string formatted as YYYY-MM-DD|The maximum date that can be picked
maximumRange|`integer`|The number of days between the `minimumDate` and `maximumDate` options|Any non-negative integer|The maximum date range (only used when `allowRange` is set to `true`)
minimumDate|`Date|string`|Today’s date|A Date object or a string formatted as YYYY-MM-DD|The minimum date that can be picked
minimumRange|`integer`|`0` if the `minimumDate` and `maximumDate` options are set to the same date otherwise `1`|Any non-negative integer|The minimum date range (only used when `allowRange` is set to `true`)
monthSelector|`string`|`null`||Accepts a string value for your target month dropdown element such as `'#month-select'` (only used when `inputType` is set to `'dropdown'`)
overwriteDayOptions|`boolean`|`true`|`true`<br />`false`|If set to `true` the options on the `daySelector` and `endDaySelector` dropdown elements will dynamically update (only used when `inputType` is set to `'dropdown'`)
overwriteMonthOptions|`boolean`|`true`|`true`<br />`false`|If set to `true` the options on the `monthSelector` and `endMonthSelector` dropdown elements will dynamically update (only used when `inputType` is set to `'dropdown'`)
startWeekOnMonday|`boolean`|`false`|`true`<br />`false`|If set to `true` the weeks on the calendar will start on Monday instead of Sunday
theme|`string`|`null`|`'red'`<br />`'orange'`<br />`'yellow'`<br />`'green'`<br />`'cyan'`<br />`'blue'`<br />`'purple'`<br />`'pink'`<br />`'custom-*'`|A string of one of the eight included themes or a custom theme that must begin with `custom-` (our online documentation has more details on the [themes page](https://agjcalendar.agjjquery.org/themes/))
translations|`object`|`[]`|An object of translations|The `translations` option will always take precedence over the `language` option<br /><br />Our online documentation has more details on the [translations page](https://agjcalendar.agjjquery.org/translations/)

### Date Format Options

The plugin uses common date formating for the `dateFormat`, `dateFormatDate`, `dateFormatDateTooltip`, `dateFormatDayInput`, `dateFormatDayOfWeekTooltip`, `dateFormatMonthDropdown`, `dateFormatMonthInput` and `dateFormatMonthLabel` options. You can choose any combination of the below characters to format dates for users. The characters are based on [PHP’s *DateTime::format* function](https://www.php.net/manual/en/datetime.format.php) which is in turn based on [C Standard Library’s *strftime* function](https://en.cppreference.com/w/cpp/chrono/c/strftime).

*__Warning:__ This plugin does not support timezones, all dates and times are treated timezone agnostically*

character|description|example(s)
---------|-----------|----------
*Day*|---|---
d|Day of the month, 2 digits with leading zeros|01
D|A textual representation of a day, three letters|Sun
j|Day of the month without leading zeros|1
l (lowercase ‘L’)|A full textual representation of the day of the week|Sunday
N|ISO 8601 numeric representation of the day of the week|1 (for Monday) through 7 (for Sunday)
S|English ordinal suffix for the day of the month, 2 characters|st, nd, rd or th
w|Numeric representation of the day of the week|0 (for Sunday) through 6 (for Saturday)
z|The day of the year (starting from 0)|0 through 365
*Week*|---|---
W|ISO 8601 week number of year, weeks starting on Monday|42 (the 42nd week in the year)
*Month*|---|---
F|A full textual representation of a month, such as January or March|January
m|Numeric representation of a month, with leading zeros|01
M|A short textual representation of a month, three letters|Jan
n|Numeric representation of a month, without leading zeros|1
t|Number of days in the given month|28
*Time*|---|---
a|Lowercase Ante meridiem and Post meridiem|am or pm
A|Uppercase Ante meridiem and Post meridiem|AM or PM
g|12-hour format of an hour without leading zeros|1 through 12
G|24-hour format of an hour without leading zeros|0 through 23
h|12-hour format of an hour with leading zeros|01 through 12
H|24-hour format of an hour with leading zeros|00 through 23
i|Minutes with leading zeros|00 to 59
s|Seconds with leading zeros|00 through 59
u|Microseconds. Note that date() will always generate 000000 since it takes an int parameter, whereas DateTime::format() does support microseconds if DateTime was created with microseconds.|Example: 654321
v|Milliseconds. Same note applies as for u.|Example: 654
*Year*|---|---
L|Whether it’s a leap year|1 if it is a leap year, 0 otherwise
o|ISO 8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead.|2000
x|An expanded full numeric representation if required, or a standard full numeral representation if possible (like Y). At least four digits. Years BCE are prefixed with a -. Years beyond (and including) 10000 are prefixed by a +.|Examples: -0055, 0787, 1999, +10191
X|An expanded full numeric representation of a year, at least 4 digits, with - for years BCE, and + for years CE|Examples: -0055, +0787, +1999, +10191
y|A two digit representation of a year|00
Y|A full numeric representation of a year, at least 4 digits, with - for years BCE|2000
*Full Date*|---|---
c|ISO 8601 date|2000-01-01T00:00:00
r|RFC 2822/RFC 5322 formatted date<br /><br />*__Warning:__ This plugin does not support timezones so this formatted date will always end in +0000*|Thu, 21 Dec 2000 10:01:07 +0000
U|Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)|946706400

## Javascript Functions

The majority of the functionality for the agjCalendar plugin is self-contained but there are some functions that are added to extend jQuery that can be accessed by any of your Javascript code. We use the dollar sign alias (`$`) instead of the `jQuery` global for documentation but either can be referenced.

### $.agjCalendar(_[options]_)

    var integration = $.agjCalendar({
      dateSelector: '#text-input'
    });
    if (integration !== -1) {
      alert('The integration was a success!');
    } else {
      alert('The integration failed; check your Javascript console for details.');
    }

The `$.agjCalendar()` function accepts an options JSON object of values to initialize a new agjCalendar integration. Returns `true` if the integration was successful or `false` if it was not.

### $.fn.agjCalendar(_[options] [, callback]_)

    var integration;
    $('#text-input').agjCalendar({
      dateFormat: 'Y-m-d'
    }, function(returnValue) {
      integration = returnValue;
    });
    if (integration !== -1) {
      alert('The integration was a success!');
    } else {
      alert('The integration failed; check your Javascript console for details.');
    }

The `$.fn.agjCalendar()` function works similar to the `$.agjCalendar()` function but does not require the `dateSelector` option as you would be selecting the element and calling this function directly off of it. Returns the element to allow for chaining. This function also has an optional callback parameter that will be executed on completion of the integration attempt and will pass the integration attempt outcome into the callback’s first and only parameter.

### $.agjCalendar.addRegexTextPattern(_regexTextPattern_)

    $.agjCalendar.addRegexTextPattern('\u3040-\u30FF');

The `$.agjCalendar.addRegexTextPattern()` function will add a regular expression pattern to the plugin’s text checks. This function should be used if custom unicode characters are being used in custom translations. Our online documentation has more details on the [translations page](https://agjcalendar.agjjquery.org/translations).

### $.agjCalendar.dateToString(_date, dateFormat[, translations]_)

    var formattedDate = $.agjCalendar.dateToString(new Date(), 'j F Y');

The `$.agjCalendar.dateToString()` function will accept a date & date format and return a formatted string. It also accepts an optional translations parameters which is an object of translations (including day and month names) which will be used in the string, if no translations are passed the included English translations will be used. Read more about [date format options](https://agjCalendar.agjjQuery.org/#date-format-options) and [custom translations](https://agjCalendar.agjjQuery.org/translations/#custom-translations).

### $.agjCalendar.deactivate()

    $.agjCalendar.deactivate();

The `$.agjCalendar.deactivate()` function will deactivate any active date pickers.

### $.agjCalendar.disable(_position_)

    var integration = $.agjCalendar({
      dateSelector: '#text-input'
    });
    if (integration !== -1) {
      $.agjCalendar.disable(integration);
    }

The `$.agjCalendar.disable()` function will disable an agjCalendar integration after it has been initialized.

### $.agjCalendar.disableEmojiSupport()

    $.agjCalendar.disableEmojiSupport();

The `$.agjCalendar.disableEmojiSupport()` function will disable emoji support for custom translations.

*__Warning:__ Emoji support will have issues with older versions of Microsoft Internet Explorer specifically 6, 7, 8, 9, 10 and 11 as they don’t support ECMAScript 2018. To support older browsers we recommend using [$.agjCalendar.addRegexTextPattern()](https://agjCalendar.agjjQuery.org/#agjcalendaraddregextextpatternregextextpattern) and passing each emoji character you want to use.*

### $.agjCalendar.enableEmojiSupport()

    $.agjCalendar.enableEmojiSupport();

The `$.agjCalendar.enableEmojiSupport()` function will enable emoji support for custom translations.

*__Warning:__ Emoji support will have issues with older versions of Microsoft Internet Explorer specifically 6, 7, 8, 9, 10 and 11 as they don’t support ECMAScript 2018. To support older browsers we recommend using [$.agjCalendar.addRegexTextPattern()](https://agjCalendar.agjjQuery.org/#agjcalendaraddregextextpatternregextextpattern) and passing each emoji character you want to use.*

### $.agjCalendar.getIncludedTranslations(_language_)

    var dateInFrench = $.agjCalendar.dateToString(
      new Date(),
      'j F Y',
      $.agjCalendar.getIncludedTranslations('fr')
    );

The `$.agjCalendar.getIncludedTranslations()` function will return an object of translations for one of the plugin’s included translations.

### $.agjCalendar.isActive()

    if ($.agjCalendar.isActive()) {
      alert('There is a date picker currently active!');
    } else {
      alert('There are no date pickers currently active.');
    }

The `$.agjCalendar.isActive()` function will determine whether or not any date pickers are active. Returns `true` if a date picker is active or `false` if none are.

### $.agjCalendar.stringToDate(_string, dateFormat[, translations]_)

    var extractedDate = $.agjCalendar.stringToDate('1 January 2000', 'j F Y');
    if (extractedDate !== -1) {
      alert('Date successfully extracted: ' + extractedDate);
    } else {
      alert('The date extraction failed.');
    }

The `$.agjCalendar.stringToDate()` function will accept a string & date format and return a date object. It also accepts an optional translations parameters which is an object of translations (including day and month names) which will be used in parsing the string, if no translations are passed the included English translations will be used. Read more about [date format options](https://agjCalendar.agjjQuery.org/#date-format-options) and [custom translations](https://agjCalendar.agjjQuery.org/translations/#custom-translations).

## Usage/Installation

You will need an HTML reference to jQuery in order for the plugin to function.

    <!-- Reference to the jQuery Javascript library -->
    <script type="text/javascript" src="//code.jquery.com/jquery-3.7.1.min.js"></script>

### With npm or Yarn

This plugin offers support for the [npm](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com/) dependency managers. You can find the agjCalendar package online on [npmjs.com](https://www.npmjs.com/package/agjcalendar).

#### Install using npm

Run this command to install the plugin using npm:

    npm install agjcalendar

#### Install using Yarn

Run this command to install the plugin using Yarn:

    yarn add agjcalendar

Once installed you can start using agjCalendar within your project by adding HTML references to the plugin’s Javascript and CSS stylesheet files.

    <!-- Reference to the agjCalendar jQuery plugin -->
    <script type="text/javascript" src="./node_modules/agjcalendar/source/agjCalendar/jquery.agjCalendar.js"></script>

    <!-- Reference to the agjCalendar CSS stylesheet -->
    <style type="text/css">@import './node_modules/agjcalendar/source/agjCalendar/jquery.agjCalendar.css';</style>

### With Bower

This plugin also offers support for the now-deprecated [Bower](https://bower.io/) dependency manager.

#### Install using Bower

Run this command to install the plugin using Bower:

    bower install andrewgjohnson/agjCalendar --save

Once installed you can start using agjCalendar within your project by adding HTML references to the plugin’s Javascript and CSS stylesheet files.

    <!-- Reference to the agjCalendar jQuery plugin -->
    <script type="text/javascript" src="./bower_components/agjCalendar/source/agjCalendar/jquery.agjCalendar.js"></script>

    <!-- Reference to the agjCalendar CSS stylesheet -->
    <style type="text/css">@import './bower_components/agjCalendar/source/agjCalendar/jquery.agjCalendar.css';</style>

### Without npm, Yarn or Bower

To use without npm, Yarn or Bower add HTML references to the [Javascript source](https://agjcalendar.agjjquery.org/source/javascript/) and the [CSS source](https://agjcalendar.agjjquery.org/source/css/) which you will need to download and host. Run these commands to download them via the terminal:

    curl -o jquery.agjCalendar.min.css 'https://agjCalendar.agjjQuery.org/source/agjCalendar/jquery.agjCalendar.min.css'
    curl -o jquery.agjCalendar.min.js 'https://agjCalendar.agjjQuery.org/source/agjCalendar/jquery.agjCalendar.min.js'

Once downloaded, you must reference the files in your HTML:

    <!-- Reference to the agjCalendar jQuery plugin -->
    <script type="text/javascript" src="jquery.agjCalendar.min.js"></script>

    <!-- Reference to the agjCalendar CSS stylesheet -->
    <style type="text/css">@import 'jquery.agjCalendar.min.css';</style>

## Backwards Compatibility

The plugin strives to keep backwards compatibiltiy with all past releases. New features should be off by default with few exceptions. Changes to existing features should continue to support past options/values/configurations so older integrations of agjCalendar will continue to function without any need for change if their core plugin is updated.

### List of Backward Compatibility Changes

version|deprecated feature|backwards support
-------|------------------|-----------------
v1.0.0|`$.ctcCalendar()` function|The plugin was renamed from `ctcCalendar` to `agjCalendar`<br /><br />The `$.ctcCalendar()` function is now an alias of `$.agjCalendar()`
v1.0.0|`autoSetEndDate` options `true` and `false`|`autoSetEndDate` deprecated boolean values in favour of four possible strings (`'always'`, `'never'`, `'blanks'` and `'dates'`)<br /><br />`true` is now an alias of `'always'` and `false` is now an alias of `'never'` for the `autoSetEndDate` option
v1.2.0|`dayNameFormat` option `'medium'`|`dayNameFormat` deprecated `'medium'` in favour of `'abbreviated'`<br /><br />`'medium'` is now an alias of `'abbreviated'` for the `dayNameFormat` option
v1.2.0|`dateFormat` options `1`, `2`, `3`, `4` and `5`|`dateFormat` was refactored to allow for custom formats<br /><br />`1` is now an alias of `'m/d/Y'`, `2` is now an alias of `'M j, Y'`, `3` is now an alias of `'d/m/Y'`, `4` is now an alias of `'Y-m-d'` and `5` is now an alias of `'j F Y'` for the `dateFormat` and `dateFormatDateTooltip` options
v1.2.0|`$.agjCalendar` returns `-1` instead of `false` on failure|Successful integrations function in the same manner but failures will now return `-1` instead of `false`
v1.2.0|The `z-index` CSS values of the calendar and modal background elements now change dynamically based upon the integration elements when `calendarDisplay` is set to `'inline'`|Previously the `z-index` CSS value was always set to the maximum for the calendar element and maximum minus one for the modal background element when `calendarDisplay` was set to `'inline'` which will still happen if the integration sets the `forceMaxZIndex` option to `true` (which is set to `false` by default)
v1.2.0|The `autoBlur` option will be automatically set to `true` when the `calendarDisplay` option is set to `'modal'` or `'full'`|Previously all integrations of agjCalendar had the `false` behaviour which is still the case for integrations with the `calendarDisplay` set to `'inline'` and can still happen if the `autoBlur` option is set to `false`

### Older Versions of jQuery

The plugin is designed to work with the newest version of jQuery (3.7.1) but will also work with older versions of jQuery 3.x as well as jQuery 2.x (tested up to 2.2.4) and jQuery 1.x (tested up to 1.12.4). We recommend using the newest version of jQuery.

## Unit Testing

The plugin uses jQuery’s [QUnit](https://qunitjs.com/) framework for unit testing. All units tests are located in the [qunit.js](https://github.com/andrewgjohnson/agjCalendar/blob/master/tests/qunit.js) file. The unit tests can be run online in-browser at [agjCalendar.agjjQuery.org/tests/index.html](https://agjCalendar.agjjQuery.org/tests/index.html). We strive to cover all public facing functions and API’s to ensure all permutations of parameters, options, fail scenarios, success scenarios, etc. are covered. Many novel scenarios are included in the unit tests to achieve high code coverage.

## Help Requests

Please post any questions in the [discussions area](https://github.com/andrewgjohnson/agjCalendar/discussions) on GitHub if you need help.

If you discover a bug please [enter an issue](https://github.com/andrewgjohnson/agjCalendar/issues/new) on GitHub. When submitting an issue please use our [issue templates](https://github.com/andrewgjohnson/agjCalendar/tree/master/.github/ISSUE_TEMPLATE).

## Contributing

Please read our [contributing guidelines](https://github.com/andrewgjohnson/agjCalendar/blob/master/.github/CONTRIBUTING.md) if you want to contribute.

You can contribute financially by becoming a [patron](https://patreon.com/agjopensource) at [patreon.com/agjopensource](https://patreon.com/agjopensource) to support agjCalendar and [other agjjQuery.org plugins](https://agjjquery.org/plugins/).

[![Patreon - Become a Patron](https://raster.shields.io/badge/Patreon%20-become%20a%20Patron-FD334A.png?style=for-the-badge&logo=patreon&logoColor=FD334A)](https://patreon.com/agjopensource)

## Acknowledgements

This plugin was started by [Andrew G. Johnson (@andrewgjohnson)](https://github.com/andrewgjohnson).

Full list of contributors:
 * [Andrew G. Johnson (@andrewgjohnson)](https://github.com/andrewgjohnson)

Our [security policies and procedures](https://github.com/andrewgjohnson/agjCalendar/blob/master/.github/SECURITY.md) comes via the [atomist/samples](https://github.com/atomist/samples/blob/master/SECURITY.md) project. Our [issue templates](https://github.com/andrewgjohnson/agjCalendar/tree/master/.github/ISSUE_TEMPLATE) comes via the [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow/blob/master/SECURITY.md) project. Our [pull request template](https://github.com/andrewgjohnson/agjCalendar/blob/master/.github/PULL_REQUEST_TEMPLATE.md) comes via the [stevemao/github-issue-templates](https://github.com/stevemao/github-issue-templates) project. The [forest photo](https://unsplash.com/photos/RfTD9NoLMEE) comes via [Radek Homola](https://unsplash.com/@radekhomola).

## Changelog

You can find all notable changes in the [changelog](https://github.com/andrewgjohnson/agjCalendar/blob/master/CHANGELOG.md).
