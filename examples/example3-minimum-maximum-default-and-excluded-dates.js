// An integration to choose a date in 2000 with a blank date prefilled
$.agjCalendar({
  dateSelector:    '#example3-blank',
  minimumDate:     '2000-01-01',
  maximumDate:     '2000-12-31',
  allowBlankDates: true,
  defaultDate:     'blank'
});

// An integration to choose a date in 2000 with Cinco de Mayo prefilled
$.agjCalendar({
  dateSelector: '#example3-prefill',
  minimumDate:  '2000-01-01',
  maximumDate:  '2000-12-31',
  defaultDate:  '2000-05-05'
});

// An integration using a string as well as a Date object
$.agjCalendar({
  dateSelector:    '#example3-object',
  minimumDate:     new Date(2000, 0, 1), // you can pass a Date Object
  maximumDate:     '2000-12-31', // or you can pass a string
  allowBlankDates: true,
  defaultDate:     'blank'
});

// An integration to choose a date in May 2000 with Tuesdays excluded
$.agjCalendar({
  dateSelector:    '#example3-exclusions',
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
