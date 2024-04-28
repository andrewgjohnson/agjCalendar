# agjCalendar

[![MIT License](https://img.shields.io/badge/license-MIT-0366d6.png?colorB=0366d6&style=flat-square)](https://github.com/andrewgjohnson/agjCalendar/blob/master/LICENSE)
[![Current Release](https://img.shields.io/github/release/andrewgjohnson/agjCalendar.png?colorB=0366d6&style=flat-square&logoColor=white&logo=github)](https://github.com/andrewgjohnson/agjCalendar/releases)
[![GitHub Stars](https://img.shields.io/github/stars/andrewgjohnson/agjCalendar.png?colorB=0366d6&style=flat-square&logoColor=white&logo=github)](https://github.com/andrewgjohnson/agjCalendar/stargazers)
[![Contributors](https://img.shields.io/github/contributors/andrewgjohnson/agjCalendar.png?colorB=0366d6&style=flat-square&logoColor=white&logo=github)](https://github.com/andrewgjohnson/agjCalendar/graphs/contributors)
[![npm Downloads](https://img.shields.io/npm/dt/agjcalendar.png?colorB=0366d6&style=flat-square&logoColor=white&logo=npm)](https://www.npmjs.com/package/agjcalendar)
[![Issues](https://img.shields.io/github/issues/andrewgjohnson/agjCalendar.png?colorB=0366d6&style=flat-square&logoColor=white&logo=github)](https://github.com/andrewgjohnson/agjCalendar/issues)
[![Patreon](https://img.shields.io/endpoint.png?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dagjopensource%26type%3Dpatrons&colorB=0366d6&style=flat-square&logoColor=white&logo=patreon)](https://patreon.com/agjopensource)

<p align="center">
  <a href="https://agjcalendar.agjjquery.org/" title="">
    <img src="https://agjcalendar.agjjquery.org/documentation/agjCalendar.agjjQuery.org/images/avatar.png" alt="" title="" width="400" id="avatar" />
  </a>
</p>

## Description

**agjCalendar** is a plugin for the [jQuery](https://jquery.com/) Javascript library to deal with calendars, dates and date ranges.

[![Patreon - Become a Patron](https://raster.shields.io/badge/Patreon%20-become%20a%20Patron-FD334A.png?style=for-the-badge&logo=patreon&logoColor=FD334A)](https://patreon.com/agjopensource)

**agjCalendar** is an [agjjQuery.org](https://agjjquery.org) plugin.

## Examples

    // The most basic agjCalendar integration
    $.agjCalendar({
      dateSelector: '#text-input'
    });

    // An alternative way of doing the same thing
    $('#text-input').agjCalendar();

    // A more complex agjCalendar integration
    $.agjCalendar({
      dateFormat:          2,
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
allowBlankDates|`boolean`|`false`|`true`<br />`false`|If set to `true` blank dates (e.g. mm/dd/yyyy) will be permitted
allowRange|`boolean`|`false`|`true`<br />`false`|If set to `true` a second date can be entered with the `endDateSelector` option or the `endMonthSelector` and `endDaySelector` options
autoSetEndDate|`string`|`'dates'`|`'blanks'`<br />`'dates'`<br />`'always'`<br />`'never'`|This option controls whether or not the end date will automatically change when the start date changes;<br />`'blanks'` will only trigger when the end date is blank,<br />`'dates'` will only trigger when the end date is a date,<br />`'always'` will trigger for both and<br />`'never'` will trigger for neither<br />(only used when `allowRange` is set to `true`)
calendarCount|`integer`|`1`|`1`<br />`2`<br />`3`|Defines whether the date picker uses a single, double or triple calendar (only used when `calendarDisplay` is set to `'inline'` or `'modal'`)
calendarDisplay|`string`|`'inline'`|`'inline'`<br />`'modal'`<br />`'full'`|Toggles whether the date picker is displayed as `'inline'`, `'modal'` or `'full'`
dateFormat|`integer`|`1`|`1`<br />`2`<br />`3`<br />`4`<br />`5`|Determines which date format is used for text inputs (only used when `inputType` is set to `'text'`)<br /><br />`1` = MM/DD/YYYY, e.g. 01/02/2003<br />`2` = MMM D, YYYY, e.g. Jan 2, 2003<br />`3` = DD/MM/YYYY, e.g. 02/01/2003<br />`4` = YYYY-MM-DD, e.g. 2003-01-02<br />`5` = D MMMM YYYY, e.g. 2 January 2003
dateSelector|`string`|`null`||Accepts a string value for your target text element such as `'#text-input'` (only used when `inputType` is set to `'text'`)
dayNameFormat|`string`|`'short'`|`'short'`<br />`'medium'`<br />`'full'`|Determines which day format is used for days of the week on the date picker<br /><br />`'short'` = one letter, e.g. F<br />`'medium'` = abbreviated, e.g. Fri<br />`'full'` = full name, e.g. Friday
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
inputType|`string`|`'text'`|`'text'`<br />`'dropdown'`|If set to `'text'` will use the `dateSelector` option to store the date or if set to `'dropdown'` will use the `monthSelector` and `daySelector` options to store the date
language|`string`|`'en'`|`'en'`<br />`'fr'`|The language for the text elements on the date picker<br /><br />`'en'` = English<br />`'fr'` = Français (French)
maximumDate|`Date|string`|Today’s date plus one year|A Date object or a string formatted as YYYY-MM-DD|The maximum date that can be picked
maximumRange|`integer`|The number of days between the `minimumDate` and `maximumDate` options|Any non-negative integer|The maximum date range (only used when `allowRange` is set to `true`)
minimumDate|`Date|string`|Today’s date|A Date object or a string formatted as YYYY-MM-DD|The minimum date that can be picked
minimumRange|`integer`|`0` if the `minimumDate` and `maximumDate` options are set to the same date otherwise `1`|Any non-negative integer|The minimum date range (only used when `allowRange` is set to `true`)
monthSelector|`string`|`null`||Accepts a string value for your target month dropdown element such as `'#month-select'` (only used when `inputType` is set to `'dropdown'`)
overwriteDayOptions|`boolean`|`true`|`true`<br />`false`|If set to `true` the options on the `daySelector` and `endDaySelector` dropdown elements will dynamically update (only used when `inputType` is set to `'dropdown'`)
overwriteMonthOptions|`boolean`|`true`|`true`<br />`false`|If set to `true` the options on the `monthSelector` and `endMonthSelector` dropdown elements will dynamically update (only used when `inputType` is set to `'dropdown'`)
startWeekOnMonday|`boolean`|`false`|`true`<br />`false`|If set to `true` the weeks on the calendar will start on Monday instead of Sunday
theme|`string`|`null`|`'red'`<br />`'orange'`<br />`'yellow'`<br />`'green'`<br />`'cyan'`<br />`'blue'`<br />`'purple'`<br />`'pink'`<br />`'custom-*'`|A string of one of the eight included themes or a custom theme that must begin with `custom-` (our online documentation has more details on the [themes page](https://agjcalendar.agjjquery.org/themes/))

## Javascript Functions

The majority of the functionality for the agjCalendar plugin is self-contained but there are four functions that are added to extend jQuery. We use the dollar sign ($) instead of the jQuery global for documentation but either can be referenced.

### $.agjCalendar(_[options]_)

    var integration = $.agjCalendar({
      dateSelector: '#text-input'
    });
    if (integration) {
      alert('The integration was a success!');
    } else {
      alert('The integration failed; check your Javascript console for details.');
    }

The `$.agjCalendar()` function accepts an options JSON object of values to initialize a new agjCalendar integration. Returns `true` if the integration was successful or `false` if it was not.

### $.fn.agjCalendar(_[options]_)

    $('#text-input').agjCalendar();

The `$.fn.agjCalendar()` function works similar to the `$.agjCalendar()` function but does not require the `dateSelector` option as you would be selecting the element and calling this function directly off of it. Returns the element to allow for chaining. We recommend using the `$.agjCalendar()` function if possible to be able to examine the return value to determine a successful integration.

### $.agjCalendar.deactivate()

    $.agjCalendar.deactivate();

The `$.agjCalendar.deactivate()` function will deactivate any active date pickers.

### $.agjCalendar.isActive()

    if ($.agjCalendar.isActive()) {
      alert('There is a date picker currently active!');
    } else {
      alert('There are no date pickers currently active.');
    }

The `$.agjCalendar.isActive()` function will determine whether or not any date pickers are active. Returns `true` if a date picker is active or `false` if none are.

## Usage/Installation

You will need an HTML reference to jQuery in order for the the plugin to function.

    <!-- Reference to the jQuery Javascript library -->
    <script type="text/javascript" src="//code.jquery.com/jquery-3.7.1.js"></script>

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

To use without npm, Yarn or Bower add HTML references to the [Javascript source](https://agjcalendar.agjjquery.org/source/javascript/) and the [CSS source](https://agjcalendar.agjjquery.org/source/css/) which you will need to download and host.

    <!-- Reference to the agjCalendar jQuery plugin -->
    <script type="text/javascript" src="jquery.agjCalendar.min.js"></script>

    <!-- Reference to the agjCalendar CSS stylesheet -->
    <style type="text/css">@import 'jquery.agjCalendar.min.css';</style>

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
