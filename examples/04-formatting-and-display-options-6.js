// Integrations with the three calendar displays
$.agjCalendar({
  dateSelector:    '#example-04-6-inline',
  calendarDisplay: 'inline'
});

$.agjCalendar({
  dateSelector:    '#example-04-6-modal',
  calendarDisplay: 'modal'
});

$.agjCalendar({
  dateSelector:    '#example-04-6-full',
  calendarDisplay: 'full'
});

// Integration with a dynamic calendar display based on type of device
var mobilePhoneOrTabletRegex = new RegExp(
  /android|blackberry|fennec|ie|ipad|iphone|ipod|mobile/
);

$.agjCalendar({
  dateSelector: '#example-04-6-dynamic',
  // Set calendarDisplay as 'full' on mobile phones and tablets but 'inline' on
  // all other devices
  calendarDisplay:
    mobilePhoneOrTabletRegex.test(navigator.userAgent.toLowerCase()) ?
    'full' :
    'inline'
});
