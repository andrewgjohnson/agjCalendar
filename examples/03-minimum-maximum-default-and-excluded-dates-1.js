// An integration to choose a date in 2000 with a blank date prefilled
$.agjCalendar({
  dateSelector:    '#example-03-1-blank',
  minimumDate:     '2000-01-01',
  maximumDate:     '2000-12-31',
  allowBlankDates: true,
  defaultDate:     'blank'
});
