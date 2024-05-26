// Set values prior to initializing the integrations
$('#example-06-2-month-start').val('2000-02');
$('#example-06-2-day-start').val('01');
$('#example-06-2-month-end').val('2000-02');
$('#example-06-2-day-end').val('03');

// Text and dropdown integrations to choose a date in 2000
$.agjCalendar({
  inputType:           'dropdown',
  monthSelector:       '#example-06-2-month-start',
  daySelector:         '#example-06-2-day-start',
  expanderSelector:    '#example-06-2-dropdown-icon-start',
  endMonthSelector:    '#example-06-2-month-end',
  endDaySelector:      '#example-06-2-day-end',
  endExpanderSelector: '#example-06-2-dropdown-icon-end',
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
  console.log($('#example-06-2-month-start').val()); // '2000-02'
  console.log($('#example-06-2-day-start').val()); // '01'
  console.log($('#example-06-2-month-end').val()); // '2000-02'
  console.log($('#example-06-2-day-end').val()); // '03'
}
