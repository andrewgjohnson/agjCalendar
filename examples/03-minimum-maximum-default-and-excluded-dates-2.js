// An integration using a string as well as a Date object
$.agjCalendar({
  dateSelector:    '#example-03-2-object',
  minimumDate:     new Date(2000, 0, 1), // you can pass a Date Object
  maximumDate:     '2000-12-31', // or you can pass a string
  allowBlankDates: true,
  defaultDate:     'blank'
});
