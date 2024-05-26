// An integration with an advanced date range
$.agjCalendar({
  dateSelector:    '#example-05-2-advanced-start',
  allowRange:      true,
  endDateSelector: '#example-05-2-advanced-end',
  minimumRange:    1,
  maximumRange:    7,
  defaultRange:    2,
  autoSetEndDate:  'always',
  minimumDate:     '2023-01-01',
  maximumDate:     '2023-12-31',
  allowBlankDates: true,
  defaultDate:     'blank'
});
