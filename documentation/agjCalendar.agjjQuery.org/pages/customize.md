---
layout:    layout
title:     agjCalendar&#58; Customize
permalink: /customize/
nav:       4
---

# Customize

You can customize your integration of agjCalendar using the [options](/#options) listed on our README. The options are a JSON object of values.

## Customize Tool

<noscript><p>You must enable Javascript to use our customize tool.</p></noscript>

<div id="ct" style="display:none">
  <p>You can use the customize tool below to pick the exact configuration options for your agjCalendar integration.</p>
  <p>Copy and paste the generated HTML onto your website.</p>
  <form method="post" action="/customize/#customize-tool" onsubmit="return false;" class="interactive interactive-tool">
    <p>
      <label for="ct-references">HTML references</label>
      <br />
      <select id="ct-references" data-hash-default="both">
        <option value="both" selected="selected">jQuery and agjCalendar</option>
        <!--
        <option value="jquery">jQuery</option>
        -->
        <option value="agjcalendar">agjCalendar</option>
        <option value="none">Neither</option>
      </select>
      <br />
      <br />
      <input type="checkbox" id="ct-html-elements" value="" class="checkbox" checked="checked" data-hash-default="true" />
      <label for="ct-html-elements">HTML elements</label>
      <br />
      <br />
      <label for="ct-input-type">Input type</label>
      <br />
      <select id="ct-input-type" data-hash-default="text">
        <option value="text" selected="selected">Text</option>
        <option value="dropdown">Dropdown</option>
      </select>
      <br />
      <br />
      <input type="checkbox" id="ct-expander-icons" value="" class="checkbox" data-hash-default="false" />
      <label for="ct-expander-icons">Expander icons</label>
      <br />
      <br />
      <label for="ct-language">Language</label>
      <br />
      <select id="ct-language" data-hash-default="en">
        <option value="en" selected="selected">English</option>
        <option value="ar">اَلْعَرَبِيَّةُ (Arabic)</option>
        <option value="bn">বাংলা (Bengali)</option>
        <option value="de">Deutsch (German)</option>
        <option value="es">Español (Spanish)</option>
        <option value="fr">Français (French)</option>
        <option value="he">עִבְרִית (Hebrew)</option>
        <option value="hi">आधुनिक मानक हिन्दी (Hindi)</option>
        <option value="it">Italiano (Italian)</option>
        <option value="ja">日本語 (Japanese)</option>
        <option value="ko">한국어 (Korean)</option>
        <option value="mr">मराठी (Marathi)</option>
        <option value="pa">پنجابی (Punjabi)</option>
        <option value="pt">Português (Portuguese)</option>
        <option value="ru">русский язык (Russian)</option>
        <option value="te">తెలుగు (Telugu)</option>
        <option value="tr">Türkçe (Turkish)</option>
        <option value="ur">اردو (Urdu)</option>
        <option value="vi">Tiếng Việt (Vietnamese)</option>
        <option value="zh">官话 (Chinese Mandarin)</option>
      </select>
      <br />
      <br />
      <label for="ct-theme">Theme</label>
      <br />
      <select id="ct-theme" data-hash-default="default">
        <option value="default" selected="selected">No theme (default gray)</option>
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="cyan">Cyan</option>
        <option value="blue">Blue</option>
        <option value="purple">Purple</option>
        <option value="pink">Pink</option>
        <option value="custom">Custom</option>
      </select>
      <br />
      <br />
      <span id="ct-custom-theme-container">
        <label for="ct-custom-theme">Custom theme</label>
        <br />
        <input type="text" id="ct-custom-theme" value="" placeholder="your-theme" data-hash-default="" />
        <br />
        <br />
      </span>
      <label for="ct-calendar-display">Calendar display</label>
      <br />
      <select id="ct-calendar-display" data-hash-default="inline">
        <option value="inline" selected="selected">Inline</option>
        <option value="modal">Modal</option>
        <option value="full">Full</option>
      </select>
      <br />
      <br />
      <span id="ct-auto-blur-container">
        <input type="checkbox" id="ct-auto-blur" value="" class="checkbox" data-hash-default="false" />
        <label for="ct-auto-blur">Auto blur</label>
        <br />
        <br />
      </span>
      <span id="ct-force-max-z-index-container">
        <input type="checkbox" id="ct-force-max-z-index" value="" class="checkbox" data-hash-default="false" />
        <label for="ct-force-max-z-index">Force max z-index</label>
        <br />
        <br />
      </span>
      <span id="ct-calendar-count-container">
        <label for="ct-calendar-count">Calendar count</label>
        <br />
        <select id="ct-calendar-count" data-hash-default="1">
          <option value="1" selected="selected">Single</option>
          <option value="2">Double</option>
          <option value="3">Triple</option>
        </select>
        <br />
        <br />
      </span>
      <span id="ct-calendar-size-container">
        <label for="ct-calendar-size">Calendar size</label>
        <br />
        <select id="ct-calendar-size" data-hash-default="small">
          <option value="small" selected="selected">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <br />
        <br />
      </span>
      <label for="ct-start-of-week">Start of week</label>
      <br />
      <select id="ct-start-of-week" data-hash-default="Sunday">
        <option value="Sunday" selected="selected">Sunday</option>
        <option value="Monday">Monday</option>
      </select>
      <br />
      <br />
      <span id="ct-date-format-container">
        <label for="ct-date-format">Date format</label>
        <br />
        <input type="text" id="ct-date-format" value="m/d/Y" data-hash-default="m/d/Y" />
        <br />
        <br />
      </span>
      <span id="ct-date-format-month-input-container">
        <label for="ct-date-format-month-input">Date format (month input)</label>
        <br />
        <input type="text" id="ct-date-format-month-input" value="M Y" data-hash-default="M Y" />
        <br />
        <br />
      </span>
      <span id="ct-date-format-day-input-container">
        <label for="ct-date-format-day-input">Date format (day input)</label>
        <br />
        <input type="text" id="ct-date-format-day-input" value="j" data-hash-default="j" />
        <br />
        <br />
      </span>
      <label for="ct-date-format-date">Date format (date)</label>
      <br />
      <input type="text" id="ct-date-format-date" value="j" data-hash-default="j" />
      <br />
      <br />
      <label for="ct-date-format-date-tooltip">Date format (date tooltip)</label>
      <br />
      <input type="text" id="ct-date-format-date-tooltip" value="F j, Y" data-hash-default="F j, Y" />
      <br />
      <br />
      <label for="ct-date-format-day-of-week-tooltip">Date format (day of week tooltip)</label>
      <br />
      <input type="text" id="ct-date-format-day-of-week-tooltip" value="l" data-hash-default="l" />
      <br />
      <br />
      <label for="ct-date-format-month-dropdown">Date format (month dropdown)</label>
      <br />
      <input type="text" id="ct-date-format-month-dropdown" value="M Y" data-hash-default="M Y" />
      <br />
      <br />
      <label for="ct-date-format-month-label">Date format (month label)</label>
      <br />
      <input type="text" id="ct-date-format-month-label" value="F Y" data-hash-default="F Y" />
      <br />
      <br />
      <input type="checkbox" id="ct-day-name-ellipsis" value="" class="checkbox" checked="checked" data-hash-default="true" />
      <label for="ct-day-name-ellipsis">Day name ellipsis</label>
      <br />
      <br />
      <label for="ct-day-name-format">Day name format</label>
      <br />
      <select id="ct-day-name-format" data-hash-default="short">
        <option value="short" selected="selected">Short (e.g. S)</option>
        <option value="abbreviated">Abbreviated (e.g. Sun)</option>
        <option value="full">Full (e.g. Sunday)</option>
      </select>
      <br />
      <br />
      <input type="checkbox" id="ct-allow-blank-dates" value="" class="checkbox" data-hash-default="false" />
      <label for="ct-allow-blank-dates">Allow blank dates</label>
      <br />
      <br />
      <span id="ct-default-date-type-container">
        <label for="ct-default-date-type">Default date type</label>
        <br />
        <select id="ct-default-date-type" data-hash-default="date">
          <option value="date" selected="selected">Date</option>
          <option value="blank">Blank</option>
        </select>
        <br />
        <br />
      </span>
      <span id="ct-default-date-container">
        <label for="ct-default-date">Default date</label>
        <br />
        <input type="text" id="ct-default-date" value="" data-hash-default="" />
        <br />
        <br />
      </span>
      <!--
      <label for="ct-excluded-dates">Excluded date(s)</label>
      <br />
      <input type="text" id="ct-excluded-dates" value="" data-hash-default="" />
      <br />
      <br />
      -->
      <label for="ct-minimum-date">Minimum date</label>
      <br />
      <input type="text" id="ct-minimum-date" value="" data-hash-default="" />
      <br />
      <br />
      <label for="ct-maximum-date">Maximum date</label>
      <br />
      <input type="text" id="ct-maximum-date" value="" data-hash-default="" />
      <br />
      <br />
      <input type="checkbox" id="ct-allow-date-range" value="" class="checkbox" data-hash-default="false" />
      <label for="ct-allow-date-range">Allow date range</label>
      <br />
      <br />
      <span id="ct-default-end-date-type-container">
        <label for="ct-default-end-date-type">Default end date type</label>
        <br />
        <select id="ct-default-end-date-type" data-hash-default="date">
          <option value="date" selected="selected">Date</option>
          <option value="blank">Blank</option>
        </select>
        <br />
        <br />
      </span>
      <span id="ct-default-end-date-container">
        <label for="ct-default-end-date">Default end date</label>
        <br />
        <input type="text" id="ct-default-end-date" value="" data-hash-default="" />
        <br />
        <br />
      </span>
      <span id="ct-default-range-container">
        <label for="ct-default-range">Default range</label>
        <br />
        <input type="text" id="ct-default-range" value="1" data-hash-default="1" />
        <br />
        <br />
      </span>
      <span id="ct-minimum-range-container">
        <label for="ct-minimum-range">Minimum range</label>
        <br />
        <input type="text" id="ct-minimum-range" value="1" data-hash-default="1" />
        <br />
        <br />
      </span>
      <span id="ct-maximum-range-container">
        <label for="ct-maximum-range">Maximum range</label>
        <br />
        <input type="text" id="ct-maximum-range" value="365" data-hash-default="365" />
        <br />
        <br />
      </span>
      <input type="submit" value="Generate" class="submit" id="ct-generate" />
    </p>
    <pre><code id="ct-code"></code></pre>
  </form>
  <div id="ct-live-preview"></div>
</div>

<script type="text/javascript">
  (function($) {
    var ctElement = document.getElementById('ct');
    if (ctElement !== null) {
      // Store initial values
      var initialFormState = {};

      // Function to initialize the initialFormState object
      var initializeFormState = function() {
        $('#ct form.interactive > p').find('input[type=text], input[type=checkbox], select').each(function() {
          var id = $(this).attr('id');
          if ($(this).attr('type') === 'checkbox') {
            initialFormState[id] = $(this).is(':checked') ? 'true' : 'false';
          } else {
            initialFormState[id] = $(this).val();
          }
        });
      };

      // Call the function to initialize the initialFormState on page load
      initializeFormState();

      // Regex patterns for each date format
      var regexPatterns = {
        '1': new RegExp(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/), // Date format 1 = MM/DD/YYYY, e.g. 01/02/2003
        '2': new RegExp(/^([A-Za-zÀ-ÖØ-öø-ÿ]+) ([0-9]{1,2}), ([0-9]{4})$/), // Date format 2 = MMM D, YYYY, e.g. Jan 2, 2003
        '3': new RegExp(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/), // Date format 3 = DD/MM/YYYY, e.g. 02/01/2003
        '4': new RegExp(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/), // Date format 4 = YYYY-MM-DD, e.g. 2003-01-02
        '5': new RegExp(/^([0-9]{1,2}) ([A-Za-zÀ-ÖØ-öø-ÿ]+) ([0-9]{4})$/) // Date format 5 = D MMMM YYYY, e.g. 2 January 2003
      };

      // Calculate default date values
      var defaultDefaultDate = new Date(); // Today
      var defaultMinimumDate = new Date(); // Today
      var defaultMaximumDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()); // Today next year
      var defaultDefaultEndDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1); // Tomorrow

      // Set value to date fields to their respective defaults and initialize agjCalendar integrations
      var fieldsToDefaults = {
        'default-date':     defaultDefaultDate,
        'minimum-date':     defaultMinimumDate,
        'maximum-date':     defaultMaximumDate,
        'default-end-date': defaultDefaultEndDate
      };
      for (var key in fieldsToDefaults) {
        if (Object.prototype.hasOwnProperty.call(fieldsToDefaults, key)) {
          $('#ct-' + key).val(
            $.agjCalendar.dateToString(fieldsToDefaults[key], 'Y-m-d')
          );
        }
      }

      var yearsBack = 100;
      var yearsForward = 10;

      $.agjCalendar({
        dateSelector:    '#ct-default-date',
        defaultDate:     defaultDefaultDate,
        endDateSelector: '#ct-default-end-date',
        defaultEndDate:  defaultDefaultEndDate,
        allowRange:      true,
        minimumRange:    0,
        defaultRange:    1,
        minimumDate:     (new Date().getFullYear() - yearsBack) + '-01-01',
        maximumDate:     (new Date().getFullYear() + yearsForward) + '-12-31',
        dateFormat:      'Y-m-d'
      });

      $.agjCalendar({
        dateSelector:    '#ct-minimum-date',
        defaultDate:     defaultMinimumDate,
        endDateSelector: '#ct-maximum-date',
        defaultEndDate:  defaultMaximumDate,
        allowRange:      true,
        minimumRange:    0,
        defaultRange:    1,
        minimumDate:     (new Date().getFullYear() - yearsBack) + '-01-01',
        maximumDate:     (new Date().getFullYear() + yearsForward) + '-12-31',
        dateFormat:      'Y-m-d'
      });

      // Live preview
      var livePreviewIntegration = -1;
      var livePreviewTimeout = -1;

      // Function to parse hash string to object
      var parseHash = function(hash) {
        var params = {};
        var hashString = hash.charAt(0) === '#' ? hash.substring(1) : hash;
        var pairs = hashString.split('&');
        for (var i = 0; i < pairs.length; i++) {
          var parts = pairs[i].split('=');
          if (parts.length === 2) {
            params[parts[0]] = decodeURIComponent(parts[1]);
          }
        }
        return params;
      };

      // Fill form fields from hash
      var fillFormFromHash = function(hash) {
        var hashValues = {};

        var params = parseHash(hash);
        for (var key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            var element = $('#ct-' + key);
            if (element.length) {
              hashValues[key] = params[key];
            }
          }
        }
        
        $('#ct form.interactive > p').find('input[type=text],input[type=checkbox],select').each(function() {
          var inHash = false;
          for (var key in hashValues) {
            if (Object.prototype.hasOwnProperty.call(hashValues, key) && key === this.id.substring(3)) {
              inHash = true;
              break;
            }
          }

          if (inHash) {
            if ($(this).attr('type') === 'checkbox') {
              $(this).prop('checked', params[this.id.substring(3)] === 'true');
            } else {
              $(this).val(params[this.id.substring(3)]);
            }
          } else {
            if (Object.prototype.hasOwnProperty.call(fieldsToDefaults, this.id.substring(3))) {
              $(this).val($.agjCalendar.dateToString(fieldsToDefaults[this.id.substring(3)], 'Y-m-d'));
            } else if ($(this).attr('type') === 'checkbox') {
              $(this).prop('checked', $(this).attr('data-hash-default') === 'true');
            } else if ($(this).attr('data-hash-default')) {
              $(this).val($(this).attr('data-hash-default'));
            } else {
              $(this).val('');
            }
          }
        });
      };

      // Function to generate and set window.location.hash from form fields
      var updateHashFromForm = function() {
        var hash = '';
        var allDefault = true;
        $('#ct form.interactive > p').find('input[type=text],input[type=checkbox],select').each(function() {
          var isDefault = true;
          
          var id = $(this).attr('id').substring(3); // Remove 'ct-' prefix
          var isCheckbox = /*$(this).prop('tagName').toLowerCase() === 'input' &&*/ $(this).attr('type') === 'checkbox';
          var value = isCheckbox
            ? ($(this).is(':checked') ? 'true' : 'false')
            : encodeURIComponent($(this).val());

          if (Object.prototype.hasOwnProperty.call(fieldsToDefaults, id)) {
            var defaultValue = fieldsToDefaults[id];
            if (defaultValue instanceof Date) {
              defaultValue = $.agjCalendar.dateToString(defaultValue, 'Y-m-d');
            }
            if (defaultValue.toString() !== decodeURIComponent(value)) {
              isDefault = false;
            }
          } else if ($(this).attr('data-hash-default') !== decodeURIComponent(value)) {
            isDefault = false;
          }

          if (!isDefault) {
            allDefault = false;

            if (hash.length > 0) {
              hash += '&';
            }
            hash += id + '=' + value;
          }
        });

        if (!window.location.hash && allDefault) {
          // If hash is empty and all fields are default, keep the hash empty
          return;
        } else {
          window.location.hash = hash;
        }
      };

      var fillCt = function() {
        // Hide/show optional field containers
        $('#ct-custom-theme-container').css('display', $('#ct-theme').val() === 'custom' ? 'block' : 'none');
        $('#ct-auto-blur-container').css('display', $('#ct-input-type').val() === 'text' ? 'block' : 'none');
        $('#ct-force-max-z-index-container').css('display', $('#ct-calendar-display').val() === 'inline' ? 'block' : 'none');
        $('#ct-calendar-count-container').css('display', $('#ct-calendar-display').val() === 'inline' || $('#ct-calendar-display').val() === 'modal' ? 'block' : 'none');
        $('#ct-calendar-size-container').css('display', $('#ct-calendar-display').val() === 'inline' || $('#ct-calendar-display').val() === 'modal' ? 'block' : 'none');
        $('#ct-date-format-container').css('display', $('#ct-input-type').val() === 'text' && ($('#ct-calendar-display').val() === 'inline' || $('#ct-calendar-display').val() === 'modal') ? 'block' : 'none');
        $('#ct-date-format-day-input-container').css('display', $('#ct-input-type').val() === 'dropdown' && ($('#ct-calendar-display').val() === 'inline' || $('#ct-calendar-display').val() === 'modal') ? 'block' : 'none');
        $('#ct-date-format-month-input-container').css('display', $('#ct-input-type').val() === 'dropdown' && ($('#ct-calendar-display').val() === 'inline' || $('#ct-calendar-display').val() === 'modal') ? 'block' : 'none');
        $('#ct-default-date-type-container').css('display', $('#ct-allow-blank-dates').is(':checked') ? 'block' : 'none');
        $('#ct-default-date-container').css('display', !$('#ct-allow-blank-dates').is(':checked') || $('#ct-default-date-type').val() === 'date' ? 'block' : 'none');
        $('#ct-default-end-date-type-container').css('display', $('#ct-allow-blank-dates').is(':checked') && $('#ct-allow-date-range').is(':checked') ? 'block' : 'none');
        $('#ct-default-end-date-container').css('display', $('#ct-allow-date-range').is(':checked') && (!$('#ct-allow-blank-dates').is(':checked') || $('#ct-default-end-date-type').val() === 'date') ? 'block' : 'none');
        $('#ct-default-range-container').css('display', $('#ct-allow-date-range').is(':checked') ? 'block' : 'none');
        $('#ct-minimum-range-container').css('display', $('#ct-allow-date-range').is(':checked') ? 'block' : 'none');
        $('#ct-maximum-range-container').css('display', $('#ct-allow-date-range').is(':checked') ? 'block' : 'none');

        // Generate integration options
        var integrationOptions = {};

        if ($('#ct-input-type').val() === 'dropdown') {
          integrationOptions['inputType'] = 'dropdown';

          if ($('#ct-allow-date-range').is(':checked')) {
            integrationOptions['monthSelector'] = '#start-month';
            integrationOptions['daySelector'] = '#start-day';
            integrationOptions['endMonthSelector'] = '#end-month';
            integrationOptions['endDaySelector'] = '#end-day';
          } else {
            integrationOptions['monthSelector'] = '#month';
            integrationOptions['daySelector'] = '#day';
          }

          if ($('#ct-date-format-day-input').val() !== 'j') {
            integrationOptions['dateFormatDayInput'] = $('#ct-date-format-day-input').val();
          }

          if ($('#ct-date-format-month-input').val() !== 'M Y') {
            integrationOptions['dateFormatMonthInput'] = $('#ct-date-format-month-input').val();
          }
        } else {
          if ($('#ct-allow-date-range').is(':checked')) {
            integrationOptions['dateSelector'] = '#start-date';
            integrationOptions['endDateSelector'] = '#end-date';
          } else {
            integrationOptions['dateSelector'] = '#date';
          }

          if ($('#ct-date-format').val() !== 'm/d/Y') {
            integrationOptions['dateFormat'] = $('#ct-date-format').val();
          }
        }

        if ($('#ct-expander-icons').is(':checked')) {
          if ($('#ct-allow-date-range').is(':checked')) {
            integrationOptions['expanderSelector'] = '#start-icon';
            integrationOptions['endExpanderSelector'] = '#end-icon';
          } else {
            integrationOptions['expanderSelector'] = '#calendar-icon';
          }
        }

        if ($('#ct-language').val() !== 'en') {
          integrationOptions['language'] = $('#ct-language').val();
        }

        switch ($('#ct-theme').val()) {
          case 'red':
          case 'orange':
          case 'yellow':
          case 'green':
          case 'cyan':
          case 'blue':
          case 'purple':
          case 'pink':
            integrationOptions['theme'] = $('#ct-theme').val();
            break;

          default:
            if ($('#ct-theme').val() === 'custom') {
              var customTheme;
              if (new RegExp(/^([a-zA-Z0-9-]+)$/).test($('#ct-custom-theme').val())) {
                customTheme = $('#ct-custom-theme').val();
              } else {
                customTheme = $('#ct-custom-theme').attr('placeholder');
              }
              // All custom themes must begin with 'custom-'
              if (customTheme.indexOf('custom-') !== 0) {
                customTheme = 'custom-' + customTheme;
              }

              integrationOptions['theme'] = customTheme;
            }
            break;
        }

        switch ($('#ct-calendar-display').val()) {
          case 'modal':
          case 'full':
            integrationOptions['calendarDisplay'] = $('#ct-calendar-display').val();
            break;
        }

        if ($('#ct-input-type').val() === 'text') {
          if ($('#ct-calendar-display').val() !== 'inline' && !$('#ct-auto-blur').is(':checked')) {
            integrationOptions['autoBlur'] = false;
          } else if ($('#ct-calendar-display').val() === 'inline' && $('#ct-auto-blur').is(':checked')) {
            integrationOptions['autoBlur'] = true;
          }
        }

        if ($('#ct-calendar-display').val() === 'inline' && $('#ct-force-max-z-index').is(':checked')) {
          integrationOptions['forceMaxZIndex'] = true;
        }

        switch ($('#ct-calendar-display').val()) {
          case 'inline':
          case 'modal':
            if ($('#ct-calendar-count').val() !== '1') {
              integrationOptions['calendarCount'] = parseInt($('#ct-calendar-count').val(), 10);
            }

            if ($('#ct-calendar-size').val() !== 'small') {
              integrationOptions['calendarSize'] = $('#ct-calendar-size').val();
            }
            break;
        }

        if ($('#ct-start-of-week').val() === 'Monday') {
          integrationOptions['startWeekOnMonday'] = true;
        }

        if ($('#ct-date-format-date').val() !== 'j') {
          integrationOptions['dateFormatDate'] = $('#ct-date-format-date').val();
        }

        if (
          ($('#ct-language').val() === 'en' && $('#ct-date-format-date-tooltip').val() !== 'F j, Y') ||
          ($('#ct-language').val() !== 'en' && $('#ct-date-format-date-tooltip').val() !== 'j F Y')
        ) {
          integrationOptions['dateFormatDateTooltip'] = $('#ct-date-format-date-tooltip').val();
        }

        if ($('#ct-date-format-day-of-week-tooltip').val() !== 'l') {
          integrationOptions['dateFormatDayOfWeekTooltip'] = $('#ct-date-format-day-of-week-tooltip').val();
        }

        if ($('#ct-date-format-month-dropdown').val() !== 'M Y') {
          integrationOptions['dateFormatMonthDropdown'] = $('#ct-date-format-month-dropdown').val();
        }

        if ($('#ct-date-format-month-label').val() !== 'F Y') {
          integrationOptions['dateFormatMonthLabel'] = $('#ct-date-format-month-label').val();
        }

        if (!$('#ct-day-name-ellipsis').is(':checked')) {
          integrationOptions['dayNameEllipsis'] = false;
        }

        if ($('#ct-day-name-format').val() !== 'short') {
          integrationOptions['dayNameFormat'] = $('#ct-day-name-format').val();
        }

        if ($('#ct-allow-blank-dates').is(':checked')) {
          integrationOptions['allowBlankDates'] = true;
        }

        var defaultDate = new Date();
        if ($('#ct-allow-blank-dates').is(':checked') && $('#ct-default-date-type').val() === 'blank') {
          defaultDate = 'blank';
        } else if (regexPatterns[4].test($('#ct-default-date').val())) {
          defaultDate = new Date(
            $('#ct-default-date').val().substring(0, 4),
            parseInt($('#ct-default-date').val().substring(5, 7), 10) - 1,
            $('#ct-default-date').val().substring(8, 10)
          );
        }
        if (defaultDate === 'blank') {
          integrationOptions['defaultDate'] = defaultDate;
        } else if (defaultDate instanceof Date && (defaultDate.getFullYear() !== defaultDefaultDate.getFullYear() || defaultDate.getMonth() !== defaultDefaultDate.getMonth() || defaultDate.getDate() !== defaultDefaultDate.getDate())) {
          integrationOptions['defaultDate'] = $.agjCalendar.dateToString(defaultDate, 'Y-m-d');
        }

        var minimumDate = new Date(defaultMinimumDate.getFullYear(), defaultMinimumDate.getMonth(), defaultMinimumDate.getDate());
        if (regexPatterns[4].test($('#ct-minimum-date').val())) {
          minimumDate = new Date(
            $('#ct-minimum-date').val().substring(0, 4),
            parseInt($('#ct-minimum-date').val().substring(5, 7), 10) - 1,
            $('#ct-minimum-date').val().substring(8, 10)
          );
        }
        if (minimumDate.getFullYear() !== defaultMinimumDate.getFullYear() || minimumDate.getMonth() !== defaultMinimumDate.getMonth() || minimumDate.getDate() !== defaultMinimumDate.getDate()) {
          integrationOptions['minimumDate'] = $.agjCalendar.dateToString(minimumDate, 'Y-m-d');
        }
        minimumDate.setHours(0, 0, 0, 0);

        var maximumDate = new Date(defaultMaximumDate.getFullYear(), defaultMaximumDate.getMonth(), defaultMaximumDate.getDate());
        if (regexPatterns[4].test($('#ct-maximum-date').val())) {
          maximumDate = new Date(
            $('#ct-maximum-date').val().substring(0, 4),
            parseInt($('#ct-maximum-date').val().substring(5, 7), 10) - 1,
            $('#ct-maximum-date').val().substring(8, 10)
          );
        }
        if (maximumDate.getFullYear() !== defaultMaximumDate.getFullYear() || maximumDate.getMonth() !== defaultMaximumDate.getMonth() || maximumDate.getDate() !== defaultMaximumDate.getDate()) {
          integrationOptions['maximumDate'] = $.agjCalendar.dateToString(maximumDate, 'Y-m-d');
        }
        maximumDate.setHours(0, 0, 0, 0);

        if ($('#ct-allow-date-range').is(':checked')) {
          integrationOptions['allowRange'] = true;
        }

        if ($('#ct-allow-date-range').is(':checked')) {
          var defaultEndDate = new Date();
          if ($('#ct-default-end-date-type').val() === 'blank') {
            defaultEndDate = 'blank';
          } else if (regexPatterns[4].test($('#ct-default-end-date').val())) {
            defaultEndDate = new Date(
              $('#ct-default-end-date').val().substring(0, 4),
              parseInt($('#ct-default-end-date').val().substring(5, 7), 10) - 1,
              $('#ct-default-end-date').val().substring(8, 10)
            );
          }
          if (defaultEndDate === 'blank') {
            integrationOptions['defaultEndDate'] = defaultEndDate;
          } else if (defaultEndDate instanceof Date && (defaultEndDate.getFullYear() !== defaultDefaultEndDate.getFullYear() || defaultEndDate.getMonth() !== defaultDefaultEndDate.getMonth() || defaultEndDate.getDate() !== defaultDefaultEndDate.getDate())) {
            integrationOptions['defaultEndDate'] = $.agjCalendar.dateToString(defaultEndDate, 'Y-m-d');
          }

          // defaultRange default = 0 if the minimumDate and maximumDate options are set to the same date otherwise 1
          var defaultDefaultRange = minimumDate.getFullYear() === maximumDate.getFullYear() && minimumDate.getMonth() === maximumDate.getMonth() && minimumDate.getDate() === maximumDate.getDate() ? 0 : 1;
          if ($('#ct-default-range').val() != defaultDefaultRange) {
            integrationOptions['defaultRange'] = parseInt($('#ct-default-range').val(), 10);
          }

          // minimumRange default = 0 if the minimumDate and maximumDate options are set to the same date otherwise 1
          var defaultMinimumRange = minimumDate.getFullYear() == maximumDate.getFullYear() && minimumDate.getMonth() == maximumDate.getMonth() && minimumDate.getDate() == maximumDate.getDate() ? 0 : 1;
          if ($('#ct-minimum-range').val() != defaultMinimumRange) {
            integrationOptions['minimumRange'] = parseInt($('#ct-minimum-range').val(), 10);
          }

          // maximumRange default = The number of days between the minimumDate and maximumDate options
          var defaultMaximumRange = Math.round(Math.abs(maximumDate.getTime() - minimumDate.getTime()) / (1000 * 60 * 60 * 24));
          if ($('#ct-maximum-range').val() != defaultMaximumRange) {
            integrationOptions['maximumRange'] = parseInt($('#ct-maximum-range').val(), 10);
          }
        }

        // Calculate the length of the longest integration option key
        var integrationOptionsMaxKeyLength = 0;
        for (var key in integrationOptions) {
          if (Object.prototype.hasOwnProperty.call(integrationOptions, key) && key.length > integrationOptionsMaxKeyLength) {
            integrationOptionsMaxKeyLength = key.length;
          }
        }

        // Update HTML code
        var escapeHtml = function(text) {
          var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
          };

          return text.replace(
            /[&<>"']/g,
            function(m) {
              return map[m];
            }
          );
        };

        // The duplicateObject function() will accept an object as a parameter and return an exact duplicate of that object removing the concern of copying an object by reference.
        // @param {object|*} obj - The object to be duplicated.
        // @returns {object|*} - Returns an exact duplicate of the obj parameter if it is an object and the obj parameter if not.
        var duplicateObject = function(obj) {
          if (obj === null || typeof obj !== 'object') {
            return obj;
          }

          var newObj = obj.constructor();
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              newObj[key] = duplicateObject(obj[key]);
            }
          }
          return newObj;
        };

        var strRepeat = function(inputString, numberOfTimes) { // Based on https://www.php.net/manual/function.str-repeat.php
          var result = '';
          for (var i = 0; i < numberOfTimes; i++) {
            result += inputString;
          }
          return result;
        };

        var ctLivePreview = '';
        ctLivePreview += '%3Cp%3E';
        if ($('#ct-input-type').val() === 'dropdown') {
          ctLivePreview += '\r\n';
          ctLivePreview += '  %3Cselect id="' + ($('#ct-allow-date-range').is(':checked') ? 'start-month' : 'month') + '"%3E%3C/select%3E';
          ctLivePreview += '\r\n';
          ctLivePreview += '  %3Cselect id="' + ($('#ct-allow-date-range').is(':checked') ? 'start-day' : 'day') + '"%3E%3C/select%3E';
        } else {
          ctLivePreview += '\r\n';
          ctLivePreview += '  %3Cinput type="text" id="' + ($('#ct-allow-date-range').is(':checked') ? 'start-date' : 'date') + '" /%3E';
        }
        if ($('#ct-expander-icons').is(':checked')) {
          ctLivePreview += '\r\n';
          ctLivePreview += '  %3Cimg ' + '\r\n    ' + 'src="//agjCalendar.agjjQuery.org/documentation/agjCalendar.agjjQuery.org/images/calendar-icon.gif" ' + '\r\n    ' + 'alt="Calendar Icon" ' + '\r\n    ' + 'height="17" ' + '\r\n    ' + 'width="16" ' + '\r\n    ' + 'id="' + ($('#ct-allow-date-range').is(':checked') ? 'start-icon' : 'calendar-icon') + '" /%3E';
        }
        ctLivePreview += '\r\n';
        ctLivePreview += '%3C/p%3E';
        if ($('#ct-allow-date-range').is(':checked')) {
          ctLivePreview += '\r\n';
          ctLivePreview += '%3Cp%3E';
          ctLivePreview += '\r\n';
          if ($('#ct-input-type').val() === 'dropdown') {
            ctLivePreview += '  %3Cselect id="end-month"%3E%3C/select%3E';
            ctLivePreview += '\r\n';
            ctLivePreview += '  %3Cselect id="end-day"%3E%3C/select%3E';
          } else {
            ctLivePreview += '  %3Cinput type="text" id="end-date" /%3E';
          }
          if ($('#ct-expander-icons').is(':checked')) {
            ctLivePreview += '\r\n';
            ctLivePreview += '  %3Cimg ' + '\r\n    ' + 'src="//agjCalendar.agjjQuery.org/documentation/agjCalendar.agjjQuery.org/images/calendar-icon.gif" ' + '\r\n    ' + 'alt="Calendar Icon" ' + '\r\n    ' + 'height="17" ' + '\r\n    ' + 'width="16" ' + '\r\n    ' + 'id="end-icon" /%3E';
          }
          ctLivePreview += '\r\n';
          ctLivePreview += '%3C/p%3E';
        }

        if (livePreviewIntegration !== -1) {
          $.agjCalendar.disable(livePreviewIntegration);
          livePreviewIntegration = -1;
        }

        if ($('#ct-live-preview-loading').length === 0) {
          $('#ct-live-preview')[0].innerHTML = unescape('%3Ch6%3ECustomize Tool: Live Preview%3C/h6%3E%3Cp%3E%3Cimg src="/documentation/agjCalendar.agjjQuery.org/images/loading.gif" alt="Loading" id="ct-live-preview-loading" height="50" width="50" /%3E%3C/p%3E');
        }

        if (livePreviewTimeout !== -1) {
          clearTimeout(livePreviewTimeout);
        }

        livePreviewTimeout = setTimeout(function() {
          $('#ct-live-preview')[0].innerHTML = unescape('%3Ch6%3ECustomize Tool: Live Preview%3C/h6%3E' + ctLivePreview);
          livePreviewIntegration = $.agjCalendar(integrationOptions);
        }, 2500);

        var ctMarkup = '';
        ctMarkup += '%3C!-- Generated by the agjCalendar Customize Tool --%3E';
        ctMarkup += '\r\n';
        ctMarkup += '%3C!-- https://agjCalendar.agjjQuery.org/customize/ --%3E';
        ctMarkup += '\r\n';
        if ($('#ct-references').val() !== 'none') {
          ctMarkup += '\r\n';
          if ($('#ct-references').val() === 'jquery') {
            ctMarkup += '%3C!-- Reference to jQuery --%3E';
          } else if ($('#ct-references').val() === 'agjcalendar') {
            ctMarkup += '%3C!-- References to agjCalendar --%3E';
          } else {
            ctMarkup += '%3C!-- References to jQuery and agjCalendar --%3E';
          }
          if ($('#ct-references').val() === 'both' || $('#ct-references').val() === 'jquery') {
            ctMarkup += '\r\n';
            ctMarkup += '%3Cscript ' + '\r\n  ' + 'type="text/javascript" ' + '\r\n  ' + 'src="//code.jquery.com/jquery-3.7.1.min.js"%3E' + '\r\n' + '%3C' + '/script%3E';
          }
          if ($('#ct-references').val() === 'both' || $('#ct-references').val() === 'agjcalendar') {
            ctMarkup += '\r\n';
            ctMarkup += '%3Cscript ' + '\r\n  ' + 'type="text/javascript" ' + '\r\n  ' + 'src="//agjCalendar.agjjQuery.org/source/agjCalendar/jquery.agjCalendar.min.js"%3E' + '\r\n' + '%3C/script%3E';
            ctMarkup += '\r\n';
            ctMarkup += '%3Cstyle type="text/css"%3E' + '\r\n  ' + '@import ' + '\r\n    ' + '"//agjCalendar.agjjQuery.org/source/agjCalendar/jquery.agjCalendar.min.css";' + '\r\n' + '%3C/style%3E';
          }
          ctMarkup += '\r\n';
        }
        if ($('#ct-html-elements').is(':checked')) {
          ctMarkup += '\r\n';
          ctMarkup += '%3C!-- HTML elements for agjCalendar --%3E';
          ctMarkup += '\r\n';
          ctMarkup += ctLivePreview;
          ctMarkup += '\r\n';
        }
        ctMarkup += '\r\n';
        ctMarkup += '%3C!-- Javascript integration of agjCalendar --%3E';
        ctMarkup += '\r\n';
        ctMarkup += '%3Cscript type="text/javascript"%3E';
        ctMarkup += '\r\n';
        ctMarkup += '%3C!--';
        ctMarkup += '\r\n';
        ctMarkup += '  (function($) {';
        ctMarkup += '\r\n';
        ctMarkup += '    var integration = $.agjCalendar({';
        ctMarkup += '\r\n';
        ctMarkup += '      // https://agjCalendar.agjjQuery.org/#options';
        for (var key in integrationOptions) {
          if (Object.prototype.hasOwnProperty.call(integrationOptions, key)) {
            ctMarkup += '\r\n';
            ctMarkup += '      ' + key + ': ' + strRepeat(' ', integrationOptionsMaxKeyLength - key.length);
            switch (typeof integrationOptions[key]) {
              case 'string':
                ctMarkup += '\'' + integrationOptions[key] + '\'';
                break;

              case 'boolean':
                ctMarkup += integrationOptions[key] === false ? 'false' : 'true';
                break;

              default:
                ctMarkup += integrationOptions[key];
                break;
            }
            ctMarkup += ',';
          }
        }
        ctMarkup = ctMarkup.substring(0, ctMarkup.length - 1); // Remove the trailing comma on the last integration option
        ctMarkup += '\r\n';
        ctMarkup += '    });';
        ctMarkup += '\r\n';
        ctMarkup += '  })(jQuery);';
        ctMarkup += '\r\n';
        ctMarkup += '--%3E';
        ctMarkup += '\r\n';
        ctMarkup += '%3C' + '/script%3E';
        ctMarkup += '\r\n';
        ctMarkup += ' ';

        $('#ct-code')[0].innerHTML = escapeHtml(unescape(ctMarkup));

        // Refresh highlight.js syntax highlighting
        $('#ct-code').attr({
          'class':            '',
          'data-highlighted': ''
        });
        hljs.highlightAll();

        // Update window.location.hash
        updateHashFromForm();
      };

      // Check if the form state has changed
      var hasFormChanged = function() {
        var formChanged = false;
        $('#ct form.interactive > p').find('input[type=text], input[type=checkbox], select').each(function() {
          var id = this.id;
          if ($(this).attr('type') === 'checkbox') {
            if (
              (initialFormState[id] === 'true' && !$(this).is(':checked')) ||
              (initialFormState[id] === 'false' && $(this).is(':checked'))
            ) {
              formChanged = true;
            }
          } else {
            if (initialFormState[id] !== $(this).val()) {
              formChanged = true;
            }
          }
        });
        return formChanged;
      };

      // Fill form from hash on page load
      if (window.location.hash) {
        fillFormFromHash(window.location.hash);
        initializeFormState();
      }

      // Call fillCt on page load
      fillCt();

      // Handle browser back/forward navigation
      $(window).on('hashchange', function() {
        fillFormFromHash(window.location.hash);
        fillCt();
      });

      // Bind the tool’s fields
      $('#ct form.interactive > p input[type=text]').on('blur', function() {
        if (hasFormChanged()) {
          fillCt();
          initializeFormState(); // Update initial form state after changes
        }
      }).on('change', function() {
        fillCt();
        initializeFormState(); // Update initial form state after changes
      });
      $('#ct form.interactive > p input[type=checkbox]').on('change', function() {
        if (hasFormChanged()) {
          fillCt();
          initializeFormState(); // Update initial form state after changes
        }
      });
      $('#ct form.interactive > p select').on('blur', function() {
        if (hasFormChanged()) {
          fillCt();
          initializeFormState(); // Update initial form state after changes
        }
      }).on('change', function() {
        fillCt();
        initializeFormState(); // Update initial form state after changes
      });
      $('#ct form.interactive > p input[type=submit]').on('click', function() {
        fillCt();
        initializeFormState(); // Update initial form state after changes
      });

      // Unhide the Customize Tool
      ctElement.style.display = 'block';
    }

    var preload = new Image();
    preload.src = '/documentation/agjCalendar.agjjQuery.org/images/loading.gif';
  })(jQuery);
</script>

<style>
  #ct-live-preview
  {
    background-color:#f6f8fa;
    border:1px solid #dbdddf;
    border-radius:5px;
    box-shadow:rgba(255,255,255,0.5) 0 0 10px;
    float:left;
    left:10px;
    -moz-border-radius:5px;
    -moz-box-shadow:rgba(255,255,255,0.5) 0 0 10px;
    padding:0 10px 20px;
    position:fixed;
    text-align:center;
    top:71px;
    -webkit-box-shadow:rgba(255,255,255,0.5) 0 0 10px
  }
  @media (max-width: 1200px) { #ct-live-preview { display:none!important } }

    #ct-live-preview h6
    {
      color:#000000;
      white-space:nowrap
    }

    #ct-live-preview img
    {
      cursor:pointer;
      padding:0
    }

    #ct-live-preview-loading
    {
      cursor:default!important
    }
</style>
