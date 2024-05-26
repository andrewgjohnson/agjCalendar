// Initialize our third date field with a red theme using the
// $.fn.agjCalendar() method and remember the integration for later by using a
// callback function
var thirdIntegration;

$('#example-08-3-third').agjCalendar({
  theme: 'red'
}, function(returnValue) {
  thirdIntegration = returnValue;
});

// Disable our red theme integration on the third date field to allow us to
// reinitialize the date field with a green theme
$.agjCalendar.disable(thirdIntegration);

// Attempt to reinitialize our third date field with a green theme which will
// succeed because the original red theme integration has been disabled
$.agjCalendar({
  dateSelector: '#example-08-3-third',
  theme:        'green'
});
