---
layout:    layout
title:     agjCalendar&#58; Examples/Demo
permalink: /examples-and-demo/
nav:       3
---

# Examples/Demo

**agjCalendar** is designed to be easily integrated into existing projects quickly and without compatibility issues or any other conflicts. Because it’s a jQuery plugin you will first need to include an HTML reference to the [jQuery Javascript library](https://jquery.com) if you don’t already have one. From there, simply add HTML references to [jquery.agjCalendar.js](/source/javascript/) and [jquery.agjCalendar.css](/source/css/) to start using the agjCalendar plugin.

    <!-- Reference to the jQuery Javascript library -->
    <script type="text/javascript" src="//code.jquery.com/jquery-3.7.1.min.js"></script>

    <!-- Reference to the agjCalendar jQuery plugin -->
    <script type="text/javascript" src="//agjCalendar.agjjQuery.org/source/agjCalendar/jquery.agjCalendar.min.js"></script>

    <!-- Reference to the agjCalendar CSS stylesheet -->
    <style type="text/css">@import "//agjCalendar.agjjQuery.org/source/agjCalendar/jquery.agjCalendar.min.css";</style>

All of the examples below have interactive demos for you to try out.

## Example One: Basic Integration

To initialize a basic integration simply select a jQuery element and call its `agjCalendar()` function. Alternatively you can call the `$.agjCalendar()` function directly and pass your element selector using the `dateSelector` option.

<form method="post" action="/examples-and-demo/#example-one-basic-integration" onsubmit="return false;" class="interactive">
  {% include examples/01-basic-integration-1.html %}
  <pre><code class="language-javascript">{% include examples/01-basic-integration-1.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/01-basic-integration-1.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/01-basic-integration-1.js)

<script type="text/javascript">
<!--
{% include examples/01-basic-integration-1.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-one-basic-integration" onsubmit="return false;" class="interactive">
  {% include examples/01-basic-integration-2.html %}
  <pre><code class="language-javascript">{% include examples/01-basic-integration-2.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/01-basic-integration-2.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/01-basic-integration-2.js)

<script type="text/javascript">
<!--
{% include examples/01-basic-integration-2.js %}
-->
</script>

## Example Two: Dropdowns and Expander

Instead of a single text input, you can set the `inputType` option to `dropdown` to allow users to select dates using two dropdowns set by the `monthSelector` and `daySelector` options. You can also integrate an optional expander element to allow the calendar to show up on click using the `expanderElement` option. The `expanderElement` can be used with both text and dropdown integrations.

<form method="post" action="/examples-and-demo/#example-two-dropdowns-and-expander" onsubmit="return false;" class="interactive">
  {% include examples/02-dropdowns-and-expander-1.html %}
  <pre><code class="language-javascript">{% include examples/02-dropdowns-and-expander-1.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/02-dropdowns-and-expander-1.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/02-dropdowns-and-expander-1.js)

<script type="text/javascript">
<!--
{% include examples/02-dropdowns-and-expander-1.js %}
-->
</script>

## Example Three: Minimum, Maximum, Default and Excluded Dates

You can specify a minimum and/or maximum date by using the `minimumDate` and/or `maximumDate` options. Simply pass a string in the format `YYYY-MM-DD` or a date object to control which dates can be selected via the calendar. Further, you can choose either a default date to be prefilled using the `defaultDate` option with a `YYYY-MM-DD` formatted string, a date object or `blank` along with the `allowBlankDates` option set to `true`. We also allow you to pass an array of dates that users will not be able to select using the `excludeDates` option.

<form method="post" action="/examples-and-demo/#example-three-minimum-maximum-default-and-excluded-dates" onsubmit="return false;" class="interactive">
  {% include examples/03-minimum-maximum-default-and-excluded-dates-1.html %}
  <pre><code class="language-javascript">{% include examples/03-minimum-maximum-default-and-excluded-dates-1.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/03-minimum-maximum-default-and-excluded-dates-1.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/03-minimum-maximum-default-and-excluded-dates-1.js)

<script type="text/javascript">
<!--
{% include examples/03-minimum-maximum-default-and-excluded-dates-1.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-three-minimum-maximum-default-and-excluded-dates" onsubmit="return false;" class="interactive">
  {% include examples/03-minimum-maximum-default-and-excluded-dates-2.html %}
  <pre><code class="language-javascript">{% include examples/03-minimum-maximum-default-and-excluded-dates-2.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/03-minimum-maximum-default-and-excluded-dates-2.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/03-minimum-maximum-default-and-excluded-dates-2.js)

<script type="text/javascript">
<!--
{% include examples/03-minimum-maximum-default-and-excluded-dates-2.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-three-minimum-maximum-default-and-excluded-dates" onsubmit="return false;" class="interactive">
  {% include examples/03-minimum-maximum-default-and-excluded-dates-3.html %}
  <pre><code class="language-javascript">{% include examples/03-minimum-maximum-default-and-excluded-dates-3.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/03-minimum-maximum-default-and-excluded-dates-3.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/03-minimum-maximum-default-and-excluded-dates-3.js)

<script type="text/javascript">
<!--
{% include examples/03-minimum-maximum-default-and-excluded-dates-3.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-three-minimum-maximum-default-and-excluded-dates" onsubmit="return false;" class="interactive">
  {% include examples/03-minimum-maximum-default-and-excluded-dates-4.html %}
  <pre><code class="language-javascript">{% include examples/03-minimum-maximum-default-and-excluded-dates-4.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/03-minimum-maximum-default-and-excluded-dates-4.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/03-minimum-maximum-default-and-excluded-dates-4.js)

<script type="text/javascript">
<!--
{% include examples/03-minimum-maximum-default-and-excluded-dates-4.js %}
-->
</script>

## Example Four: Formatting and Display Options

There are other formatting and display choices for your integration. You can use the `calendarCount` option to choose between a single, double or triple calendar. You can use the `calendarSize` option to choose between a small, medium or large display. You can use the `dateFormat` option to choose any date format. You can set the `startWeekOnMonday` option to `true` to show weeks starting with Monday on the calendar. You can use the `dayNameFormat` option to choose between short, abbreviated or full day of week names. You can use the `calendarDisplay` option to choose between `inline`, `modal` and `full` displays but we recommend only using `modal` and `full` on touch devices along with an expander element.

<form method="post" action="/examples-and-demo/#example-four-formatting-and-display-options" onsubmit="return false;" class="interactive">
  {% include examples/04-formatting-and-display-options-1.html %}
  <pre><code class="language-javascript">{% include examples/04-formatting-and-display-options-1.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-1.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-1.js)

<script type="text/javascript">
<!--
{% include examples/04-formatting-and-display-options-1.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-four-formatting-and-display-options" onsubmit="return false;" class="interactive">
  {% include examples/04-formatting-and-display-options-2.html %}
  <pre><code class="language-javascript">{% include examples/04-formatting-and-display-options-2.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-2.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-2.js)

<script type="text/javascript">
<!--
{% include examples/04-formatting-and-display-options-2.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-four-formatting-and-display-options" onsubmit="return false;" class="interactive">
  {% include examples/04-formatting-and-display-options-3.html %}
  <pre><code class="language-javascript">{% include examples/04-formatting-and-display-options-3.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-3.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-3.js)

<script type="text/javascript">
<!--
{% include examples/04-formatting-and-display-options-3.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-four-formatting-and-display-options" onsubmit="return false;" class="interactive">
  {% include examples/04-formatting-and-display-options-4.html %}
  <pre><code class="language-javascript">{% include examples/04-formatting-and-display-options-4.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-4.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-4.js)

<script type="text/javascript">
<!--
{% include examples/04-formatting-and-display-options-4.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-four-formatting-and-display-options" onsubmit="return false;" class="interactive">
  {% include examples/04-formatting-and-display-options-5.html %}
  <pre><code class="language-javascript">{% include examples/04-formatting-and-display-options-5.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-5.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-5.js)

<script type="text/javascript">
<!--
{% include examples/04-formatting-and-display-options-5.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-four-formatting-and-display-options" onsubmit="return false;" class="interactive">
  {% include examples/04-formatting-and-display-options-6.html %}
  <pre><code class="language-javascript">{% include examples/04-formatting-and-display-options-6.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-6.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/04-formatting-and-display-options-6.js)

<script type="text/javascript">
<!--
{% include examples/04-formatting-and-display-options-6.js %}
-->
</script>

## Example Five: Date Ranges

Instead of being limited to a single date, you can set the `allowRange` option to `true` to enable date ranges and allow a user to select two dates. You can further control the date range by using the `minimumRange`, `maximumRange`, `defaultRange` and `autoSetEndDate` options which are all optional. Text and dropdown integrations both support ranges.

<form method="post" action="/examples-and-demo/#example-five-date-ranges" onsubmit="return false;" class="interactive">
  {% include examples/05-date-ranges-1.html %}
  <pre><code class="language-javascript">{% include examples/05-date-ranges-1.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/05-date-ranges-1.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/05-date-ranges-1.js)

<script type="text/javascript">
<!--
{% include examples/05-date-ranges-1.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-five-date-ranges" onsubmit="return false;" class="interactive">
  {% include examples/05-date-ranges-2.html %}
  <pre><code class="language-javascript">{% include examples/05-date-ranges-2.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/05-date-ranges-2.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/05-date-ranges-2.js)

<script type="text/javascript">
<!--
{% include examples/05-date-ranges-2.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-five-date-ranges" onsubmit="return false;" class="interactive">
  {% include examples/05-date-ranges-3.html %}
  <pre><code class="language-javascript">{% include examples/05-date-ranges-3.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/05-date-ranges-3.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/05-date-ranges-3.js)

<script type="text/javascript">
<!--
{% include examples/05-date-ranges-3.js %}
-->
</script>

## Example Six: Existing/Original Values

If there is an existing value on the text or dropdown elements, it will be preserved once the integration is initialized. With a text input such as `<input value="02/01/2000" … />` the date will be preserved regardless of if it is valid or not. With a dropdown such as `<select … ><option value="2000-02" selected="selected">February 2000</option>…` the date will be preserved if an option exists with a matching value (`2000-02` in the case of the example) after the integration has been initialized.

<form method="post" action="/examples-and-demo/#example-six-existingoriginal-values" onsubmit="return false;" class="interactive">
  {% include examples/06-existing-original-values-1.html %}
  <pre><code class="language-javascript">{% include examples/06-existing-original-values-1.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/06-existing-original-values-1.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/06-existing-original-values-1.js)

<script type="text/javascript">
<!--
{% include examples/06-existing-original-values-1.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-six-existingoriginal-values" onsubmit="return false;" class="interactive">
  {% include examples/06-existing-original-values-2.html %}
  <pre><code class="language-javascript">{% include examples/06-existing-original-values-2.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/06-existing-original-values-2.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/06-existing-original-values-2.js)

<script type="text/javascript">
<!--
{% include examples/06-existing-original-values-2.js %}
-->
</script>

## Example Seven: Included and Custom Themes

If you want to style your agjCalendar to matching your branding you can tap into on of our eight included themes. They are `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple` & `pink`. You can also use your own theme name which must begin with `custom-`. You will need to add custom stylings to your CSS stylesheet to integration a custom theme, the `custom-xxx` styles are included on the documentation website but not the plugin. There are more details on the [themes page](/themes/) including a [custom theme generator](/themes/#custom-theme-generator).

<form method="post" action="/examples-and-demo/#example-seven-included-and-custom-themes" onsubmit="return false;" class="interactive">
  {% include examples/07-included-and-custom-themes-1.html %}
  <pre><code class="language-javascript">{% include examples/07-included-and-custom-themes-1.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/07-included-and-custom-themes-1.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/07-included-and-custom-themes-1.js)

<script type="text/javascript">
<!--
{% include examples/07-included-and-custom-themes-1.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-seven-included-and-custom-themes" onsubmit="return false;" class="interactive">
  {% include examples/07-included-and-custom-themes-2.html %}
  <pre><code class="language-javascript">{% include examples/07-included-and-custom-themes-2.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/07-included-and-custom-themes-2.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/07-included-and-custom-themes-2.js)

<script type="text/javascript">
<!--
{% include examples/07-included-and-custom-themes-2.js %}
-->
</script>

## Example Eight: Disabling and Reinitializing Integrations

If you want to disable or change an integration you can use the `$.agjCalendar.disable()` function. If you want to disable the integration you can call the function. If you want to change an integration you can disable the integration by calling the function and then initialize a new integration.

<form method="post" action="/examples-and-demo/#example-eight-disabling-and-reinitializing-integrations" onsubmit="return false;" class="interactive">
  {% include examples/08-disabling-and-reinitializing-integrations-1.html %}
  <pre><code class="language-javascript">{% include examples/08-disabling-and-reinitializing-integrations-1.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/08-disabling-and-reinitializing-integrations-1.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/08-disabling-and-reinitializing-integrations-1.js)

<script type="text/javascript">
<!--
{% include examples/08-disabling-and-reinitializing-integrations-1.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-eight-disabling-and-reinitializing-integrations" onsubmit="return false;" class="interactive">
  {% include examples/08-disabling-and-reinitializing-integrations-2.html %}
  <pre><code class="language-javascript">{% include examples/08-disabling-and-reinitializing-integrations-2.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/08-disabling-and-reinitializing-integrations-2.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/08-disabling-and-reinitializing-integrations-2.js)

<script type="text/javascript">
<!--
{% include examples/08-disabling-and-reinitializing-integrations-2.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-eight-disabling-and-reinitializing-integrations" onsubmit="return false;" class="interactive">
  {% include examples/08-disabling-and-reinitializing-integrations-3.html %}
  <pre><code class="language-javascript">{% include examples/08-disabling-and-reinitializing-integrations-3.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/08-disabling-and-reinitializing-integrations-3.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/08-disabling-and-reinitializing-integrations-3.js)

<script type="text/javascript">
<!--
{% include examples/08-disabling-and-reinitializing-integrations-3.js %}
-->
</script>

## Example Nine: Languages and Custom Translations

The plugin has support for twenty languages as well as custom translations. To use one of the included languages pass `'en'`, `'ar'`, `'bn'`, `'de'`, `'es'`, `'fr'`, `'he'`, `'hi'`, `'it'`, `'ja'`, `'ko'`, `'mr'`, `'pa'`, `'pt'`, `'ru'`, `'te'`, `'tr'`, `'ur'`, `'vi'` or `'zh'` as the `language` option. To use custom translations pass an object of translations as the `translations` option. There are more details on the [translations page](/translations/).

<form method="post" action="/examples-and-demo/#example-nine-languages-and-custom-translations" onsubmit="return false;" class="interactive">
  {% include examples/09-languages-and-custom-translations-1.html %}
  <pre><code class="language-javascript">{% include examples/09-languages-and-custom-translations-1.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/09-languages-and-custom-translations-1.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/09-languages-and-custom-translations-1.js)

<script type="text/javascript">
<!--
{% include examples/09-languages-and-custom-translations-1.js %}
-->
</script>

<form method="post" action="/examples-and-demo/#example-nine-languages-and-custom-translations" onsubmit="return false;" class="interactive">
  {% include examples/09-languages-and-custom-translations-2.html %}
  <pre><code class="language-javascript">{% include examples/09-languages-and-custom-translations-2.js %}</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/09-languages-and-custom-translations-2.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/09-languages-and-custom-translations-2.js)

<script type="text/javascript">
<!--
{% include examples/09-languages-and-custom-translations-2.js %}
-->
</script>

<script type="text/javascript">
<!--
  (function($) {
    $('form.interactive > p').find('input[type=text], select, img').each(function() {
      // add a tooltip with the element’s id to all elements
      $(this).attr('title', this.id);
    });
  })(jQuery);
-->
</script>
