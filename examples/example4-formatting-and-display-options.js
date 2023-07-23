// integrations with a single, double and triple calendars
$.agjCalendar({
  dateSelector:  '#example4-single',
  calendarCount: 1,
});
$.agjCalendar({
  dateSelector:  '#example4-double',
  calendarCount: 2,
});
$.agjCalendar({
  dateSelector:  '#example4-triple',
  calendarCount: 3,
});

// integrations with weeks starting on Sunday and Monday
$.agjCalendar({
  dateSelector: '#example4-start-on-sunday',
});
$.agjCalendar({
  dateSelector:      '#example4-start-on-monday',
  startWeekOnMonday: true,
});

// integrations with the four date formats
$.agjCalendar({
  dateSelector: '#example4-dateformat1',
  dateFormat:   1,
});
$.agjCalendar({
  dateSelector: '#example4-dateformat2',
  dateFormat:   2,
});
$.agjCalendar({
  dateSelector: '#example4-dateformat3',
  dateFormat:   3,
});
$.agjCalendar({
  dateSelector: '#example4-dateformat4',
  dateFormat:   4,
});

// integrations with short and medium day names
$.agjCalendar({
  dateSelector: '#example4-short-day-names',
});
$.agjCalendar({
  dateSelector:  '#example4-medium-day-names',
  dayNameFormat: 'medium',
});

// integrations with the three calendar displays
$.agjCalendar({
  dateSelector:     '#example4-inline',
  expanderSelector: '#example4-inline-icon',
  calendarDisplay:  'inline',
});
$.agjCalendar({
  dateSelector:     '#example4-modal',
  expanderSelector: '#example4-modal-icon',
  calendarDisplay:  'modal',
});
$.agjCalendar({
  dateSelector:     '#example4-full',
  expanderSelector: '#example4-full-icon',
  calendarDisplay:  'full',
});
