---
layout:    layout
title:     agjCalendar&#58; Examples/Demo
permalink: /examples-and-demo/
nav:       3
---

# Examples/Demo

**agjCalendar** is designed to be easily integrated into existing projects quickly and without compatability issues or any other conflicts. Because it’s a jQuery plugin you will first need to include an HTML reference to the [jQuery Javascript library](https://jquery.com) if you don’t already have one. From there, simply add HTML references to [jquery.agjCalendar.js](/source/javascript/) and [jquery.agjCalendar.css](/source/css/) to start using the agjCalendar plugin.

    <!-- Reference to the jQuery Javascript library -->
    <script type="text/javascript" src="//code.jquery.com/jquery-3.7.1.js"></script>

    <!-- Reference to the agjCalendar jQuery plugin -->
    <script type="text/javascript" src="//agjCalendar.agjjQuery.org/source/agjCalendar/jquery.agjCalendar.min.js"></script>

    <!-- Reference to the agjCalendar CSS stylesheet -->
    <style type="text/css">@import "//agjCalendar.agjjQuery.org/source/agjCalendar/jquery.agjCalendar.min.css";</style>

All of the examples below have interactive demos for you to try out.

## Example One: Basic Integration

To initialize a basic integration simply select a jQuery element and call its `agjCalendar()` function. Alternatively you can call the `$.agjCalendar()` function directly and pass your element selector using the `dateSelector` option.

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="interactive">
    {% include examples/example1-basic-integration.html %}
    <pre><code class="language-javascript">{% include examples/example1-basic-integration.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example1-basic-integration.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example1-basic-integration.js)

<script type="text/javascript">
<!--
{% include examples/example1-basic-integration.js %}
-->
</script>

## Example Two: Dropdowns and Expander

Instead of a single text input, you can set the `inputType` option to `dropdown` to allow users to select dates using two dropdowns set by the `monthSelector` and `daySelector` options. You can also integrate an optional expander element to allow the calendar to show up on click using the `expanderElement` option. The `expanderElement` can be used with both text and dropdown integrations.

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="interactive">
{% include examples/example2-dropdowns-and-expander.html %}
    <pre><code class="language-javascript">{% include examples/example2-dropdowns-and-expander.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example2-dropdowns-and-expander.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example2-dropdowns-and-expander.js)

<script type="text/javascript">
<!--
{% include examples/example2-dropdowns-and-expander.js %}
-->
</script>

## Example Three: Minimum, Maximum, Default and Excluded Dates

You can specify a minimum and/or maximum date by using the `minimumDate` and/or `maximumDate` options. Simply pass a string in the format `YYYY-MM-DD` to control which dates can be selected via the calendar. Further, you can choose either a default date to be prefilled using the `defaultDate` option with a `YYYY-MM-DD` formatted string or `blank` along with the `allowBlankDates` option set to `true`.

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="interactive">
    {% include examples/example3-minimum-maximum-default-and-excluded-dates.html %}
    <pre><code class="language-javascript">{% include examples/example3-minimum-maximum-default-and-excluded-dates.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example3-minimum-maximum-default-and-excluded-dates.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example3-minimum-maximum-default-and-excluded-dates.js)

<script type="text/javascript">
<!--
{% include examples/example3-minimum-maximum-default-and-excluded-dates.js %}
-->
</script>

## Example Four: Formatting and Display Options

There are other formatting and display choices for your integration. You can use the `calendarCount` option to choose between a single, double or triple calendar. You can use the `dateFormat` option to choose between four date formats. You can set the `startWeekOnMonday` option to `true` to show weeks starting with Monday on the calendar. You can use the `calendarDisplay` option to choose between `inline`, `modal` and `full` displays butwe recommend only using `modal` and `full` on touch devices along with an expander element.

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="interactive">
    {% include examples/example4-formatting-and-display-options.html %}
    <pre><code class="language-javascript">{% include examples/example4-formatting-and-display-options.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example4-formatting-and-display-options.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example4-formatting-and-display-options.js)

<script type="text/javascript">
<!--
{% include examples/example4-formatting-and-display-options.js %}
-->
</script>

## Example Five: Date Ranges

Instead of being limited to a single date, you can set the `allowRange` option to `true` to enable date ranges and allow a user to select two dates. You can further control the date range by using the `minimumRange`, `maximumRange`, `defaultRange` and `autoSetEndDate` options which are all optional. Text and dropdown integrations both support ranges.

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="interactive">
    {% include examples/example5-date-ranges.html %}
    <pre><code class="language-javascript">{% include examples/example5-date-ranges.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example5-date-ranges.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example5-date-ranges.js)

<script type="text/javascript">
<!--
{% include examples/example5-date-ranges.js %}
-->
</script>

## Example Six: Existing/Original Values

If there is an existing value on the text or dropdown elements, it will be preserved once the integration is initialized. With a text input such as `<input value="02/01/2000" … />` the date will be preserved regardless of if it is valid or not. With a dropdown such as `<select … ><option value="2000-02" selected="selected">February 2000</option>…` the date will be preserved if an option exists with a matching value (`2000-02` in the case of the example) after the integration has been initialized.

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="interactive">
    {% include examples/example6-existing-original-values.html %}
    <pre><code class="language-javascript">{% include examples/example6-existing-original-values.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example6-existing-original-values.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example6-existing-original-values.js)

<script type="text/javascript">
<!--
{% include examples/example6-existing-original-values.js %}
-->
</script>

## Example Seven: Included and Custom Themes

If you want to style your agjCalendar to matching your branding you can tap into on of our eight included themes. They are `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple` & `pink`. You can also use your own theme name which must begin with `custom-`. You will need to add custom stylings to your CSS stylesheet to integration a custom theme, the `custom-xxx` styles are included on the documentation website but not the plugin. There is more details on the [themes page](/themes/) including a [custom theme generator](/themes/#custom-theme-generator).

<form method="post" action="/examples-and-demo/" onsubmit="return false;" class="interactive">
    {% include examples/example7-included-and-custom-themes.html %}
    <pre><code class="language-javascript">{% include examples/example7-included-and-custom-themes.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example7-included-and-custom-themes.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example7-included-and-custom-themes.js)

<script type="text/javascript">
<!--
{% include examples/example7-included-and-custom-themes.js %}
-->
</script>
