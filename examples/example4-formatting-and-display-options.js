// Integrations with various languages
$.agjCalendar({
  dateSelector: '#example4-english',
  dateFormat:   2,
  language:     'en' // English
});
$.agjCalendar({
  dateSelector: '#example4-french',
  dateFormat:   2,
  language:     'fr' // Français (French)
});

// Integrations with a single, double and triple calendars
$.agjCalendar({
  dateSelector:  '#example4-single',
  calendarCount: 1
});
$.agjCalendar({
  dateSelector:  '#example4-double',
  calendarCount: 2
});
$.agjCalendar({
  dateSelector:  '#example4-triple',
  calendarCount: 3
});

// Integrations with weeks starting on Sunday and Monday
$.agjCalendar({
  dateSelector:      '#example4-start-on-sunday',
  startWeekOnMonday: false
});
$.agjCalendar({
  dateSelector:      '#example4-start-on-monday',
  startWeekOnMonday: true
});

// Integrations with the five date formats
$.agjCalendar({
  dateSelector: '#example4-date-format-1',
  dateFormat:   1
});
$.agjCalendar({
  dateSelector: '#example4-date-format-2',
  dateFormat:   2
});
$.agjCalendar({
  dateSelector: '#example4-date-format-3',
  dateFormat:   3
});
$.agjCalendar({
  dateSelector: '#example4-date-format-4',
  dateFormat:   4
});
$.agjCalendar({
  dateSelector: '#example4-date-format-5',
  dateFormat:   5
});

// Integrations with short and medium day names
$.agjCalendar({
  dateSelector:  '#example4-short-day-names',
  dayNameFormat: 'short'
});
$.agjCalendar({
  dateSelector:  '#example4-medium-day-names',
  dayNameFormat: 'medium'
});

// Integrations with the three calendar displays
$.agjCalendar({
  dateSelector:    '#example4-inline',
  calendarDisplay: 'inline'
});
$.agjCalendar({
  dateSelector:    '#example4-modal',
  calendarDisplay: 'modal'
});
$.agjCalendar({
  dateSelector:    '#example4-full',
  calendarDisplay: 'full'
});
$.agjCalendar({
  dateSelector:    '#example4-dynamic',
  // Set calendarDisplay as 'full' on mobile phones and tablets but 'inline' on all other devices
  calendarDisplay: /android|blackberry|fennec|ie|ipad|iphone|ipod|mobile/.test(navigator.userAgent.toLowerCase()) ? 'full' : 'inline'
});
