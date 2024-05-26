// An integration to choose a date in May 2000 with Tuesdays excluded
$.agjCalendar({
  dateSelector:    '#example-03-4-exclusions',
  minimumDate:     '2000-05-01',
  maximumDate:     '2000-05-31',
  allowBlankDates: true,
  defaultDate:     'blank',
  excludeDates:    [ // you can use Date objects or strings in this array
    '2000-05-02',
    new Date(2000, 4, 9),
    '2000-05-16',
    new Date(2000, 4, 23),
    '2000-05-30'
  ]
});
