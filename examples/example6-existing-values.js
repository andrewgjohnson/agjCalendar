// Text integration to choose a date in 2000
$.agjCalendar({
  dateSelector:        '#example6-start',
  expanderSelector:    '#example6-text-icon-start',
  endDateSelector:     '#example6-end',
  endExpanderSelector: '#example6-text-icon-end',
  dateFormat:          1,
  allowRange:          true,
  defaultRange:        3,
  minimumRange:        1,
  maximumRange:        7,
  minimumDate:         '2000-01-01',
  maximumDate:         '2000-12-31',
  allowBlankDates:     true,
  defaultDate:         'blank'
});

// Dropdown integration to choose a date in 2000
$.agjCalendar({
  inputType:           'dropdown',
  monthSelector:       '#example6-month-start',
  daySelector:         '#example6-day-start',
  expanderSelector:    '#example6-dropdown-icon-start',
  endMonthSelector:    '#example6-month-end',
  endDaySelector:      '#example6-day-end',
  endExpanderSelector: '#example6-dropdown-icon-end',
  dateFormat:          1,
  allowRange:          true,
  defaultRange:        3,
  minimumRange:        1,
  maximumRange:        7,
  minimumDate:         '2000-01-01',
  maximumDate:         '2000-12-31',
  allowBlankDates:     true,
  defaultDate:         'blank'
});
