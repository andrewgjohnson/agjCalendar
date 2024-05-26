// Initialize our second date field with a red theme and remember the
// integration for later
var secondIntegration = $.agjCalendar({
  dateSelector: '#example-08-2-second',
  theme:        'red'
});

// Disable our red theme integration on the second date field to allow us to
// reinitialize the date field with a green theme
$.agjCalendar.disable(secondIntegration);

// Attempt to reinitialize our second date field with a green theme which will
// succeed because the original red theme integration has been disabled
$.agjCalendar({
  dateSelector: '#example-08-2-second',
  theme:        'green'
});
