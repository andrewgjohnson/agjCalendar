---
layout:    layout
title:     agjCalendar&#58; Translations
permalink: /translations/
nav:       6
---

# Translations

The plugin includes twenty languages as well as support for custom translations.

## Included Languages

To use one of the twenty included languages pass its ISO 639-1 code as the `language` option.

    // A basic agjCalendar integration
    $.agjCalendar({
      dateSelector: '#text-input'
    });

    // A basic agjCalendar integration with the Arabic language enabled
    $.agjCalendar({
      dateSelector: '#text-input',
      language:     'ar'
    });

    // Alternatively you can use the $.fn.agjCalendar() function for the same result
    $('#text-input').agjCalendar({
      language: 'ar'
    });

ISO 639-1 code|language|English name
--------------|--------|------------
en|English|English
ar|اَلْعَرَبِيَّةُ|Arabic
bn|বাংলা|Bengali
de|Deutsch|German
es|Español|Spanish
fr|Français|French
he|עִבְרִית|Hebrew
hi|आधुनिक मानक हिन्दी|Hindi
it|Italiano|Italian
ja|日本語|Japanese
ko|한국어|Korean
mr|मराठी|Marathi
pa|پنجابی|Punjabi
pt|Português|Portuguese
ru|русский язык|Russian
te|తెలుగు|Telugu
tr|Türkçe|Turkish
ur|اردو|Urdu
vi|Tiếng Việt|Vietnamese
zh|官话|Chinese Mandarin

## Custom Translations

To use custom translations pass an object of translations as the `translations` option. Below is a list of all valid `translations` object keys.

key|description|English value
---|-----------|-------------
days.full.0|Sunday (full)|Sunday
days.full.1|Monday (full)|Monday
days.full.2|Tuesday (full)|Tuesday
days.full.3|Wednesday (full)|Wednesday
days.full.4|Thursday (full)|Thursday
days.full.5|Friday (full)|Friday
days.full.6|Saturday (full)|Saturday
days.abbreviated.0|Sunday (abbreviated)|Sun
days.abbreviated.1|Monday (abbreviated)|Mon
days.abbreviated.2|Tuesday (abbreviated)|Tue
days.abbreviated.3|Wednesday (abbreviated)|Wed
days.abbreviated.4|Thursday (abbreviated)|Thu
days.abbreviated.5|Friday (abbreviated)|Fri
days.abbreviated.6|Saturday (abbreviated)|Sat
days.short.0|Sunday (short)|S
days.short.1|Monday (short)|M
days.short.2|Tuesday (short)|T
days.short.3|Wednesday (short)|W
days.short.4|Thursday (short)|T
days.short.5|Friday (short)|F
days.short.6|Saturday (short)|S
months.full.0|January (full)|January
months.full.1|February (full)|February
months.full.2|March (full)|March
months.full.3|April (full)|April
months.full.4|May (full)|May
months.full.5|June (full)|June
months.full.6|July (full)|July
months.full.7|August (full)|August
months.full.8|September (full)|September
months.full.9|October (full)|October
months.full.10|November (full)|November
months.full.11|December (full)|December
months.abbreviated.0|January (abbreviated)|Jan
months.abbreviated.1|February (abbreviated)|Feb
months.abbreviated.2|March (abbreviated)|Mar
months.abbreviated.3|April (abbreviated)|Apr
months.abbreviated.4|May (abbreviated)|May
months.abbreviated.5|June (abbreviated)|Jun
months.abbreviated.6|July (abbreviated)|Jul
months.abbreviated.7|August (abbreviated)|Aug
months.abbreviated.8|September (abbreviated)|Sep
months.abbreviated.9|October (abbreviated)|Oct
months.abbreviated.10|November (abbreviated)|Nov
months.abbreviated.11|December (abbreviated)|Dec
ordinalSuffixes.1|Ordinal suffix of 1|st
ordinalSuffixes.2|Ordinal suffix of 2|nd
ordinalSuffixes.3|Ordinal suffix of 3|rd
ordinalSuffixes.4|Ordinal suffix of 4|th
ordinalSuffixes.5|Ordinal suffix of 5|th
ordinalSuffixes.6|Ordinal suffix of 6|th
ordinalSuffixes.7|Ordinal suffix of 7|th
ordinalSuffixes.8|Ordinal suffix of 8|th
ordinalSuffixes.9|Ordinal suffix of 9|th
ordinalSuffixes.10|Ordinal suffix of 10|th
ordinalSuffixes.11|Ordinal suffix of 11|th
ordinalSuffixes.12|Ordinal suffix of 12|th
ordinalSuffixes.13|Ordinal suffix of 13|th
ordinalSuffixes.14|Ordinal suffix of 14|th
ordinalSuffixes.15|Ordinal suffix of 15|th
ordinalSuffixes.16|Ordinal suffix of 16|th
ordinalSuffixes.17|Ordinal suffix of 17|th
ordinalSuffixes.18|Ordinal suffix of 18|th
ordinalSuffixes.19|Ordinal suffix of 19|th
ordinalSuffixes.20|Ordinal suffix of 20|th
ordinalSuffixes.21|Ordinal suffix of 21|st
ordinalSuffixes.22|Ordinal suffix of 22|nd
ordinalSuffixes.23|Ordinal suffix of 23|rd
ordinalSuffixes.24|Ordinal suffix of 24|th
ordinalSuffixes.25|Ordinal suffix of 25|th
ordinalSuffixes.26|Ordinal suffix of 26|th
ordinalSuffixes.27|Ordinal suffix of 27|th
ordinalSuffixes.28|Ordinal suffix of 28|th
ordinalSuffixes.29|Ordinal suffix of 29|th
ordinalSuffixes.30|Ordinal suffix of 30|th
ordinalSuffixes.31|Ordinal suffix of 31|st
meridiemIndicators.lowercase.0|Lowercase variant of ante meridiem|am
meridiemIndicators.lowercase.1|Lowercase variant of post meridiem|pm
meridiemIndicators.uppercase.0|Uppercase variant of ante meridiem|AM
meridiemIndicators.uppercase.1|Uppercase variant of post meridiem|PM
hideCalendar|Hide calendar text|Hide Calendar
nextMonth|Next month text|Next Month
previousMonth|Previous month text|Previous Month
poweredByBefore|Powered by (before agjCalendar link)|Powered by
poweredByAfter|Powered by (after agjCalendar link)|
blankDateText|Blank date text|Select a Date

You can also pass the `language` option as a fallback for any missing translations. The `translations` option will always take precedence over the `language` option. If you are using unique characters you will also need to call the `$.agjCalendar.addRegexTextPattern()` and pass a regular expression pattern to match the new characters. You don’t have to add patterns for any of the included languages or emoji. If this step is skipped the plugin will fail to identify the values when they are used in input fields.

<form method="post" action="/translations/" onsubmit="return false;" class="interactive">
  <p>
    <input type="text" id="tamil-input" />
  </p>
  <pre><code class="language-javascript">// Add Tamiḻ (Tamil) characters regular expression pattern
$.agjCalendar.addRegexTextPattern('\u0B80-\u0BFF');

// A basic agjCalendar integration with Tamiḻ (Tamil) translations
$.agjCalendar({
  dateSelector:    '#tamil-input',
  allowBlankDates: true,
  defaultDate:     'blank',
  dateFormat:      'j F Y',
  calendarCount:   2,
  calendarSize:    'large',
  translations:    {
    days: {
      full: {
        0: 'ஞாயிற்றுக்கிழமை',
        1: 'திங்கட்கிழமை',
        2: 'செவ்வாய்க்கிழமை',
        3: 'புதன்கிழமை',
        4: 'வியாழக்கிழமை',
        5: 'வெள்ளிக்கிழமை',
        6: 'சனிக்கிழமை'
      },
      abbreviated: {
        0: 'ஞாயி.',
        1: 'திங்.',
        2: 'செவ்.',
        3: 'புதன்.',
        4: 'வியா.',
        5: 'வெள்.',
        6: 'சனி.'
      },
      short: {
        0: 'ஞாயி.',
        1: 'திங்.',
        2: 'செவ்.',
        3: 'புதன்.',
        4: 'வியா.',
        5: 'வெள்.',
        6: 'சனி.'
      }
    },
    months: {
      full: {
        0:  'ஜனவரி',
        1:  'பிப்ரவரி',
        2:  'மார்ச்',
        3:  'ஏப்ரல்',
        4:  'மே',
        5:  'ஜூன்',
        6:  'ஜூலை',
        7:  'ஆகஸ்ட்',
        8:  'செப்டம்பர்',
        9:  'அக்டோபர்',
        10: 'நவம்பர்',
        11: 'டிசம்பர்'
      },
      abbreviated: {
        0:  'ஜன.',
        1:  'பிப்.',
        2:  'மார்ச்.',
        3:  'ஏப்.',
        4:  'மே.',
        5:  'ஜூன்.',
        6:  'ஜூலை.',
        7:  'ஆக.',
        8:  'செப்.',
        9:  'அக்ட்.',
        10: 'நவ.',
        11: 'டிச.'
      }
    },
    ordinalSuffixes: {
      1: 'ஆம்',
      2: 'ஆம்',
      3: 'ஆம்',
      4: 'ஆம்',
      5: 'ஆம்',
      6: 'ஆம்',
      7: 'ஆம்',
      8: 'ஆம்',
      9: 'ஆம்',
      10: 'ஆம்',
      11: 'ஆம்',
      12: 'ஆம்',
      13: 'ஆம்',
      14: 'ஆம்',
      15: 'ஆம்',
      16: 'ஆம்',
      17: 'ஆம்',
      18: 'ஆம்',
      19: 'ஆம்',
      20: 'ஆம்',
      21: 'ஆம்',
      22: 'ஆம்',
      23: 'ஆம்',
      24: 'ஆம்',
      25: 'ஆம்',
      26: 'ஆம்',
      27: 'ஆம்',
      28: 'ஆம்',
      29: 'ஆம்',
      30: 'ஆம்',
      31: 'ஆம்',
    },
    meridiemIndicators: {
      lowercase: {
        0: 'காலை',
        1: 'மாலை'
      },
      uppercase: {
        0: 'காலை',
        1: 'மாலை'
      }
    },
    hideCalendar:    'காலெண்டரை மறை',
    nextMonth:       'அடுத்த மாதம்',
    previousMonth:   'சென்ற மாதம்',
    poweredByBefore: '',
    poweredByAfter:  'மூலம் இயக்கப்படுகிறது',
    blankDateText:   'ஒரு தேதியைத் தேர்ந்தெடுக்கவும்'
  }
});</code></pre>
</form>

[HTML Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example1-basic-integration.html) & [Javascript Source](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples/example1-basic-integration.js)

<script type="text/javascript">
<!--
  // Add Tamiḻ (Tamil) characters regular expression pattern
  $.agjCalendar.addRegexTextPattern('\u0B80-\u0BFF');

  // A basic agjCalendar integration with Tamiḻ (Tamil) translations
  $.agjCalendar({
    dateSelector:    '#tamil-input',
    allowBlankDates: true,
    defaultDate:     'blank',
    dateFormat:      'j F Y',
    calendarCount:   2,
    calendarSize:    'medium',
    translations:    {
      days: {
        full: {
          0: 'ஞாயிற்றுக்கிழமை',
          1: 'திங்கட்கிழமை',
          2: 'செவ்வாய்க்கிழமை',
          3: 'புதன்கிழமை',
          4: 'வியாழக்கிழமை',
          5: 'வெள்ளிக்கிழமை',
          6: 'சனிக்கிழமை'
        },
        abbreviated: {
          0: 'ஞாயி.',
          1: 'திங்.',
          2: 'செவ்.',
          3: 'புதன்.',
          4: 'வியா.',
          5: 'வெள்.',
          6: 'சனி.'
        },
        short: {
          0: 'ஞாயி.',
          1: 'திங்.',
          2: 'செவ்.',
          3: 'புதன்.',
          4: 'வியா.',
          5: 'வெள்.',
          6: 'சனி.'
        }
      },
      months: {
        full: {
          0:  'ஜனவரி',
          1:  'பிப்ரவரி',
          2:  'மார்ச்',
          3:  'ஏப்ரல்',
          4:  'மே',
          5:  'ஜூன்',
          6:  'ஜூலை',
          7:  'ஆகஸ்ட்',
          8:  'செப்டம்பர்',
          9:  'அக்டோபர்',
          10: 'நவம்பர்',
          11: 'டிசம்பர்'
        },
        abbreviated: {
          0:  'ஜன.',
          1:  'பிப்.',
          2:  'மார்ச்.',
          3:  'ஏப்.',
          4:  'மே.',
          5:  'ஜூன்.',
          6:  'ஜூலை.',
          7:  'ஆக.',
          8:  'செப்.',
          9:  'அக்ட்.',
          10: 'நவ.',
          11: 'டிச.'
        }
      },
      ordinalSuffixes: {
        1: 'ஆம்',
        2: 'ஆம்',
        3: 'ஆம்',
        4: 'ஆம்',
        5: 'ஆம்',
        6: 'ஆம்',
        7: 'ஆம்',
        8: 'ஆம்',
        9: 'ஆம்',
        10: 'ஆம்',
        11: 'ஆம்',
        12: 'ஆம்',
        13: 'ஆம்',
        14: 'ஆம்',
        15: 'ஆம்',
        16: 'ஆம்',
        17: 'ஆம்',
        18: 'ஆம்',
        19: 'ஆம்',
        20: 'ஆம்',
        21: 'ஆம்',
        22: 'ஆம்',
        23: 'ஆம்',
        24: 'ஆம்',
        25: 'ஆம்',
        26: 'ஆம்',
        27: 'ஆம்',
        28: 'ஆம்',
        29: 'ஆம்',
        30: 'ஆம்',
        31: 'ஆம்',
      },
      meridiemIndicators: {
        lowercase: {
          0: 'காலை',
          1: 'மாலை'
        },
        uppercase: {
          0: 'காலை',
          1: 'மாலை'
        }
      },
      hideCalendar:    'காலெண்டரை மறை',
      nextMonth:       'அடுத்த மாதம்',
      previousMonth:   'சென்ற மாதம்',
      poweredByBefore: '',
      poweredByAfter:  'மூலம் இயக்கப்படுகிறது',
      blankDateText:   'ஒரு தேதியைத் தேர்ந்தெடுக்கவும்'
    }
  });
-->
</script>
