---
layout:    layout
title:     agjCalendar&#58; Examples/Demo
permalink: /examples-and-demo/
nav:       3
---

# Examples/Demo

**agjCalendar** is designed to be easily integrated into existing projects quickly and without compatability issues or any other conflicts. Because it’s a jQuery plugin you will first need to include an HTML reference to the [jQuery Javascript library](https://jquery.com) if you don’t already have one. From there, simply add HTML references to [jquery.agjCalendar.js](/source/javascript/) and [jquery.agjCalendar.css](/source/css/) to start using the agjCalendar plugin.

    // reference to the jQuery Javascript library
    <script type="text/javascript" src="//code.jquery.com/jquery-3.7.0.js"></script>

    // reference to the agjCalendar jQuery plugin
    <script type="text/javascript" src="//agjCalendar.agjjQuery.org/source/agjCalendar/jquery.agjCalendar.js"></script>

    // reference to the agjCalendar CSS stylesheet
    <style type="text/css">@import "//agjCalendar.agjjQuery.org/source/agjCalendar/jquery.agjCalendar.css";</style>

All of the examples below have interactive demos for you to try out.

## Example One: Basic Integration

To initialize a basic integration simply select a jQuery element and call its `agjCalendar()` function. Alternatively you can call the `$.agjCalendar()` function directly and pass your element selector using the `dateSelector` option.

[**example1-basic-integration.js**](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example1-basic-integration.js)

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="demo">
    <p>
        <input type="text" value="" id="example1-basic" />
        <br />
        <br />
        <input type="text" value="" id="example1-alternative" />
    </p>
    <pre><code>{% include examples/example1-basic-integration.js %}</code></pre>
</form>
<script type="text/javascript">
<!--
{% include examples/example1-basic-integration.js %}
-->
</script>

## Example Two: Dropdowns and Expander

Instead of a single text input, you can set the `inputType` option to `dropdown` to allow users to select dates using two dropdowns set by the `monthSelector` and `daySelector` options. You can also integrate an optional expander element to allow the calendar to show up on click using the `expanderElement` option. The `expanderElement` can be used with both text and dropdown integrations.

[**example2-dropdowns-and-expander.js**](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example2-dropdowns-and-expander.js)

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="demo">
    <p>
        <select id="example2-month"></select>
        <select id="example2-day"></select>
        <img src="/documentation/agjCalendar.agjjQuery.org/images/calendar-icon.gif" alt="Calendar Icon" id="example2-icon" />
    </p>
    <pre><code>{% include examples/example2-dropdowns-and-expander.js %}</code></pre>
</form>
<script type="text/javascript">
<!--
{% include examples/example2-dropdowns-and-expander.js %}
-->
</script>

## Example Three: Minimum, Maximum, Default and Excluded Dates

You can specify a minimum and/or maximum date by using the `minimumDate` and/or `maximumDate` options. Simply pass a string in the format `YYYY-MM-DD` to control which dates can be selected via the calendar. Further, you can choose either a default date to be prefilled using the `defaultDate` option with a `YYYY-MM-DD` formatted string or `blank` along with the `allowBlankDates` option set to `true`.

[**example3-minimum-maximum-default-and-excluded-dates.js**](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example3-minimum-maximum-default-and-excluded-dates.js)

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="demo">
    <p>
        <input type="text" value="" id="example3-blank" />
        <br />
        <br />
        <input type="text" value="" id="example3-prefill" />
        <br />
        <br />
        <input type="text" value="" id="example3-object" />
        <br />
        <br />
        <input type="text" value="" id="example3-exclusions" />
    </p>
    <pre><code>{% include examples/example3-minimum-maximum-default-and-excluded-dates.js %}</code></pre>
</form>
<script type="text/javascript">
<!--
{% include examples/example3-minimum-maximum-default-and-excluded-dates.js %}
-->
</script>

## Example Four: Formatting and Display Options

There are other formatting and display choices for your integration. You can use the `calendarCount` option to choose between a single, double or triple calendar. You can use the `dateFormat` option to choose between four date formats. You can set the `startWeekOnMonday` option to `true` to show weeks starting with Monday on the calendar. You can use the `calendarDisplay` option to choose between `inline`, `modal` and `full` displays butwe recommend only using `modal` and `full` on touch devices along with an expander element.

[**example4-formatting-and-display-options.js**](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example4-formatting-and-display-options.js)

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="demo">
    <p>
        <input type="text" value="" id="example4-english" />
        <br />
        <input type="text" value="" id="example4-french" />
        <br />
        <br />
        <input type="text" value="" id="example4-single" />
        <br />
        <input type="text" value="" id="example4-double" />
        <br />
        <input type="text" value="" id="example4-triple" />
        <br />
        <br />
        <input type="text" value="" id="example4-start-on-sunday" />
        <br />
        <input type="text" value="" id="example4-start-on-monday" />
        <br />
        <br />
        <input type="text" value="" id="example4-date-format-1" />
        <br />
        <input type="text" value="" id="example4-date-format-2" />
        <br />
        <input type="text" value="" id="example4-date-format-3" />
        <br />
        <input type="text" value="" id="example4-date-format-4" />
        <br />
        <input type="text" value="" id="example4-date-format-5" />
        <br />
        <br />
        <input type="text" value="" id="example4-short-day-names" />
        <br />
        <input type="text" value="" id="example4-medium-day-names" />
        <br />
        <br />
        <input type="text" value="" id="example4-inline" />
        <img src="/documentation/agjCalendar.agjjQuery.org/images/calendar-icon.gif" alt="Calendar Icon" id="example4-inline-icon" />
        <br />
        <input type="text" value="" id="example4-modal" />
        <img src="/documentation/agjCalendar.agjjQuery.org/images/calendar-icon.gif" alt="Calendar Icon" id="example4-modal-icon" />
        <br />
        <input type="text" value="" id="example4-full" />
        <img src="/documentation/agjCalendar.agjjQuery.org/images/calendar-icon.gif" alt="Calendar Icon" id="example4-full-icon" />
    </p>
    <pre><code>{% include examples/example4-formatting-and-display-options.js %}</code></pre>
</form>
<script type="text/javascript">
<!--
{% include examples/example4-formatting-and-display-options.js %}
-->
</script>

## Example Five: Date Ranges

Instead of being limited to a single date, you can set the `allowRange` option to `true` to enable date ranges and allow a user to select two dates. You can further control the date range by using the `minimumRange`, `maximumRange`, `defaultRange` and `autoSetEndDate` options which are all optional. Text and dropdown integrations both support ranges.

[**example5-date-ranges.js**](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example5-date-ranges.js)

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="demo">
    <p>
        <input type="text" value="" id="example5-basic-start" />
        <br />
        <input type="text" value="" id="example5-basic-end" />
        <br />
        <br />
        <input type="text" value="" id="example5-advanced-start" />
        <br />
        <input type="text" value="" id="example5-advanced-end" />
        <br />
        <br />
        <select id="example5-month-start"></select>
        <select id="example5-day-start"></select>
        <img src="/documentation/agjCalendar.agjjQuery.org/images/calendar-icon.gif" alt="Calendar Icon" id="example5-icon-start" />
        <br />
        <select id="example5-month-end"></select>
        <select id="example5-day-end"></select>
        <img src="/documentation/agjCalendar.agjjQuery.org/images/calendar-icon.gif" alt="Calendar Icon" id="example5-icon-end" />
    </p>
    <pre><code>{% include examples/example5-date-ranges.js %}</code></pre>
</form>
<script type="text/javascript">
<!--
{% include examples/example5-date-ranges.js %}
-->
</script>
