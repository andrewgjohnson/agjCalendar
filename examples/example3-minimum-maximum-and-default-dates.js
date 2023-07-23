// an integration to choose a date in 2000 with a blank date prefilled
$.agjCalendar({
  dateSelector:    '#example3-blank',
  minimumDate:     '2000-01-01',
  maximumDate:     '2000-12-31',
  allowBlankDates: true,
  defaultDate:     'blank',
});

// an integration to choose a date in 2000 with Cinco de Mayo prefilled
$.agjCalendar({
  dateSelector: '#example3-prefill',
  minimumDate:  '2000-01-01',
  maximumDate:  '2000-12-31',
  defaultDate:  '2000-05-05',
});

// an integration using a string as well as a Date object
$.agjCalendar({
  dateSelector:    '#example3-object',
  minimumDate:     '2000-01-01', // you can pass a string
  maximumDate:     new Date(), // or you can pass a Date object
  allowBlankDates: true,
  defaultDate:     'blank',
});
