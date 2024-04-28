// Set values prior to initializing the integrations
$('#example6-start').val('02/01/2000');
$('#example6-end').val('02/03/2000');

$('#example6-month-start').val('2000-02');
$('#example6-day-start').val('01');
$('#example6-month-end').val('2000-02');
$('#example6-day-end').val('03');

// Text and dropdown integratiosn to choose a date in 2000
$.agjCalendar({
  dateSelector:        '#example6-start',
  expanderSelector:    '#example6-text-icon-start',
  endDateSelector:     '#example6-end',
  endExpanderSelector: '#example6-text-icon-end',
  dateFormat:          1,
  allowRange:          true,
  defaultRange:        3,
  minimumRange:        0,
  maximumRange:        7,
  minimumDate:         '2000-01-01',
  maximumDate:         '2000-12-31',
  allowBlankDates:     true,
  defaultDate:         'blank'
});

$.agjCalendar({
  inputType:           'dropdown',
  monthSelector:       '#example6-month-start',
  daySelector:         '#example6-day-start',
  expanderSelector:    '#example6-dropdown-icon-start',
  endMonthSelector:    '#example6-month-end',
  endDaySelector:      '#example6-day-end',
  endExpanderSelector: '#example6-dropdown-icon-end',
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
  console.log($('#example6-start').val()); // '02/01/2000'
  console.log($('#example6-end').val()); // '02/03/2000'

  console.log($('#example6-month-start').val()); // '2000-02'
  console.log($('#example6-day-start').val()); // '01'
  console.log($('#example6-month-end').val()); // '2000-02'
  console.log($('#example6-day-end').val()); // '03'
}
