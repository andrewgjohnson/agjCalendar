// Initialize our first date field with a red theme
$.agjCalendar({
  dateSelector: '#example-08-1-first',
  theme:        'red'
});

// Attempt to reinitialize our first date field with a green theme which will
// fail because the original red theme integration is still enabled
$.agjCalendar({
  dateSelector: '#example-08-1-first',
  theme:        'green'
});
