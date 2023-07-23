// an integration with a basic date range
$.agjCalendar({
  dateSelector:    '#example5-basic-start',
  allowRange:      true,
  endDateSelector: '#example5-basic-end',
});

// an integration with an advanced date range
$.agjCalendar({
  dateSelector:    '#example5-advanced-start',
  allowRange:      true,
  endDateSelector: '#example5-advanced-end',
  minimumRange:    1,
  maximumRange:    7,
  defaultRange:    2,
  autoSetEndDate:  true,
  minimumDate:     '2023-01-01',
  maximumDate:     '2023-12-31',
  allowBlankDates: true,
  defaultDate:     'blank',
});

// an integration with a date range using dropdowns
$.agjCalendar({
  inputType:           'dropdown',
  monthSelector:       '#example5-month-start',
  daySelector:         '#example5-day-start',
  expanderSelector:    '#example5-icon-start',
  allowRange:          true,
  endMonthSelector:    '#example5-month-end',
  endDaySelector:      '#example5-day-end',
  endExpanderSelector: '#example5-icon-end',
});
