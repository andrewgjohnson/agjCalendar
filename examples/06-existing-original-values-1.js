// Set values prior to initializing the integrations
$('#example-06-1-start').val('02/01/2000');
$('#example-06-1-end').val('02/03/2000');

// Text and dropdown integrations to choose a date in 2000
$.agjCalendar({
  dateSelector:        '#example-06-1-start',
  expanderSelector:    '#example-06-1-text-icon-start',
  endDateSelector:     '#example-06-1-end',
  endExpanderSelector: '#example-06-1-text-icon-end',
  allowRange:          true,
  defaultRange:        3,
  minimumRange:        0,
  maximumRange:        7,
  minimumDate:         '2000-01-01',
  maximumDate:         '2000-12-31',
  allowBlankDates:     true,
  defaultDate:         'blank'
});

// Confirm the values once the integrations have been initialized
if (console && console.log) {
  console.log($('#example-06-1-start').val()); // '02/01/2000'
  console.log($('#example-06-1-end').val()); // '02/03/2000'
}
