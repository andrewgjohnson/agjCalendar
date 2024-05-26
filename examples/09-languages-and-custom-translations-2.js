// Add any unique unicode characters prior to using them in custom translations
$.agjCalendar.addRegexTextPattern('\\u2014'); // em dash (—)

// You can quickly enable all emoji support in most modern browsers
$.agjCalendar.enableEmojiSupport();

// Or you can enable one emoji at a time with
// $.agjCalendar.addRegexTextPattern() if you want to support older versions of
// Microsoft Internet Explorer (using both methods will not conflict with each
// other)
$.agjCalendar.addRegexTextPattern('☀️🌙🔴🟤🟠🟡🪐'); // days of week
$.agjCalendar.addRegexTextPattern('🎉💘🍀🐇🤱🏳️‍🌈🍁😇✊🎃🎖️🎄'); // months
$.agjCalendar.addRegexTextPattern('❌⏭️⏮️👀📅'); // other translations

// Integration with custom translations using emoji
$.agjCalendar({
  dateSelector:               '#example-09-2-emoji',
  allowBlankDates:            true,
  defaultDate:                'blank',
  dateFormat:                 'Y M jS',
  dateFormatDayOfWeekTooltip: 'l D',
  dateFormatDateTooltip:      'D j F Y M',
  dateFormatMonthLabel:       'F M Y',
  dayNameFormat:              'abbreviated',
  calendarCount:              3,
  calendarSize:               'medium',
  translations:               {
    days: {
      full: {
        0: 'Sunday — the sun',
        1: 'Monday — the moon',
        2: 'Tuesday — Mars',
        3: 'Wednesday — Mercury',
        4: 'Thursday — Jupiter',
        5: 'Friday — Venus',
        6: 'Saturday — Saturn'
      },
      abbreviated: {
        0: '☀️',
        1: '🌙',
        2: '🔴',
        3: '🟤',
        4: '🟠',
        5: '🟡',
        6: '🪐'
      }
    },
    months: {
      abbreviated: {
        0:  '🎉', // 🎉 for New Year’s Day
        1:  '💘', // 💘 for Valentine’s Day
        2:  '🍀', // 🍀 for St. Patrick’s Day
        3:  '🐇', // 🐇 for Easter
        4:  '🤱', // 🤱 for Mother’s Day
        5:  '🏳️‍🌈', // 🏳️‍🌈 for Pride Month
        6:  '🍁', // 🍁 for Canada Day
        7:  '😇', // 😇 for the Assumption of Mary
        8:  '✊', // ✊ for Labour Day and Labor Day
        9:  '🎃', // 🎃 for Halloween
        10: '🎖️', // 🎖️ for Remembrance Day, Veterans Day, Armistace Day, etc.
        11: '🎄' // 🎄 for Christmas
      }
    },
    hideCalendar:    '❌',
    nextMonth:       '⏭️',
    previousMonth:   '⏮️',
    poweredByBefore: '👀',
    blankDateText:   '📅'
  }
});
