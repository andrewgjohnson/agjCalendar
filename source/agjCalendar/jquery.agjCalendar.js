/**
 * agjCalendar v1.0.0
 *
 * Copyright (c) 2013-2023 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @author Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @copyright 2013-2023 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @link http://github.com/andrewgjohnson/agjCalendar
 * @license https://opensource.org/license/mit/ The MIT License
 * @version 1.0.0
 * @package agjCalendar
 *
 */

/* global jQuery */

(function($) {
  var agjCalendars = [];
  var activeAgjCalendar = -1;
  var activeAgjCalendarIsEnd = false;
  var lastBodyOverflowValue = '';
  var lastBodyMarginRightValue = '';
  var dateFormatRegexPatterns = {
    // MM/DD/YYYY, e.g. "01/02/2003"
    '1': new RegExp(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/),

    // MMM D, YYYY, e.g. "Jan 2, 2003"
    '2': new RegExp(/^([A-Za-z]{3}) ([0-9]{1,2}), ([0-9]{4})$/),

    // DD/MM/YYYY, e.g. "02/01/2003"
    '3': new RegExp(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/),

    // YYYY-MM-DD, e.g. "2003-01-02"
    '4': new RegExp(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/),

    // YYYY-MM, e.g. "2003-01"
    'month': new RegExp(/([0-9]{4})-([0-9]{2})$/),
  };

  var getTrueHeight = function(jQueryElement) {
    var trueHeight = jQueryElement.height();

    var cssAttributes = [
      'margin-top',
      'borderTopWidth',
      'padding-top',
      'padding-bottom',
      'borderBottomWidth',
      'margin-bottom',
    ];
    for (var i = 0; i < cssAttributes.length; i++) {
      var cssValue = jQueryElement.css(cssAttributes[i]);
      if (cssValue.substring(cssValue.length - 2).toLowerCase() == 'px') {
        cssValue = cssValue.substring(0, cssValue.length - 2);
      }
      if (!isNaN(cssValue)) {
        trueHeight += parseInt(cssValue, 10);
      }
    }

    return trueHeight;
  };

  var getTrueWidth = function(jQueryElement) {
    var trueWidth = jQueryElement.width();

    var cssAttributes = [
      'margin-left',
      'borderLeftWidth',
      'padding-left',
      'padding-right',
      'borderRightWidth',
      'margin-right',
    ];
    for (var i = 0; i < cssAttributes.length; i++) {
      var cssValue = jQueryElement.css(cssAttributes[i]);
      if (cssValue.substring(cssValue.length - 2).toLowerCase() == 'px') {
        cssValue = cssValue.substring(0, cssValue.length - 2);
      }
      if (!isNaN(cssValue)) {
        trueWidth += parseInt(cssValue, 10);
      }
    }

    return trueWidth;
  };

  var getMonthName = function(month, fullName, language) {
    if (fullName === undefined) {
      fullName = true;
    }
    if (language === undefined) {
      language = 'en';
    }

    if (language == 'en') {
      switch (month) {
        case 1:
          return fullName ? 'January' : 'Jan';

        case 2:
          return fullName ? 'February' : 'Feb';

        case 3:
          return fullName ? 'March' : 'Mar';

        case 4:
          return fullName ? 'April' : 'Apr';

        case 5:
          return 'May';

        case 6:
          return fullName ? 'June' : 'Jun';

        case 7:
          return fullName ? 'July' : 'Jul';

        case 8:
          return fullName ? 'August' : 'Aug';

        case 9:
          return fullName ? 'September' : 'Sep';

        case 10:
          return fullName ? 'October' : 'Oct';

        case 11:
          return fullName ? 'November' : 'Nov';

        case 12:
          return fullName ? 'December' : 'Dec';
      }
    }

    return '';
  };

  var getMonthNumber = function(month, language) {
    if (language === undefined) {
      language = 'en';
    }

    if (language == 'en') {
      switch (month) {
        case 'Jan':
        case 'January':
          return 1;

        case 'Feb':
        case 'February':
          return 2;

        case 'Mar':
        case 'March':
          return 3;

        case 'Apr':
        case 'April':
          return 4;

        case 'May':
          return 5;

        case 'Jun':
        case 'June':
          return 6;

        case 'Jul':
        case 'July':
          return 7;

        case 'Aug':
        case 'August':
          return 8;

        case 'Sep':
        case 'September':
          return 9;

        case 'Oct':
        case 'October':
          return 10;

        case 'Nov':
        case 'November':
          return 11;

        case 'Dec':
        case 'December':
          return 12;
      }
    }

    return '';
  };

  var getDayName = function(day, language) {
    if (language === undefined) {
      language = 'en';
    }

    if (language == 'en') {
      if (agjCalendars[activeAgjCalendar]['startWeekOnMonday'] === true) {
        switch (day) {
          case 1:
            return 'Monday';

          case 2:
            return 'Tuesday';

          case 3:
            return 'Wednesday';

          case 4:
            return 'Thursday';

          case 5:
            return 'Friday';

          case 6:
            return 'Saturday';

          case 7:
            return 'Sunday';
        }
      } else {
        switch (day) {
          case 1:
            return 'Sunday';

          case 2:
            return 'Monday';

          case 3:
            return 'Tuesday';

          case 4:
            return 'Wednesday';

          case 5:
            return 'Thursday';

          case 6:
            return 'Friday';

          case 7:
            return 'Saturday';
        }
      }
    }

    return '';
  };

  var getDaysInMonth = function(year, month) {
    switch (parseInt(month, 10)) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;

      case 4:
      case 6:
      case 9:
      case 11:
        return 30;

      case 2:
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ? 29 : 28;
    }

    return 0;
  };

  var numberToText = function(number) {
    if (!isNaN(number)) {
      number = parseInt(number, 10);
    }

    switch (number) {
      case 0:
        return 'Zero';

      case 1:
        return 'One';

      case 2:
        return 'Two';

      case 3:
        return 'Three';

      case 4:
        return 'Four';

      case 5:
        return 'Five';

      case 6:
        return 'Six';

      case 7:
        return 'Seven';

      case 8:
        return 'Eight';

      case 9:
        return 'Nine';

      case 10:
        return 'Ten';
    }

    return '';
  };

  var getDaysOfWeekMarkup = function() {
    var calendarMarkup = '';

    var dayNameLength = (function() {
      switch (agjCalendars[activeAgjCalendar]['dayNameFormat']) {
        case 'full':
          return Number.MAX_SAFE_INTEGER;

        case 'medium':
          return 3;
      }
      return 1;
    })();

    if (agjCalendars[activeAgjCalendar]['startWeekOnMonday'] === true) {
      calendarMarkup += '' +
        '<div class="agjCalendar-monday">' +
          getDayName(1).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-tuesday">' +
          getDayName(2).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-wednesday">' +
          getDayName(3).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-thursday">' +
          getDayName(4).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-friday">' +
          getDayName(5).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-saturday">' +
          getDayName(6).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-sunday">' +
          getDayName(7).substring(0, dayNameLength) +
        '</div>';
    } else {
      calendarMarkup += '' +
        '<div class="agjCalendar-sunday">' +
          getDayName(1).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-monday">' +
          getDayName(2).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-tuesday">' +
          getDayName(3).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-wednesday">' +
          getDayName(4).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-thursday">' +
          getDayName(5).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-friday">' +
          getDayName(6).substring(0, dayNameLength) +
        '</div>' +
        '<div class="agjCalendar-saturday">' +
          getDayName(7).substring(0, dayNameLength) +
        '</div>';
    }

    return calendarMarkup;
  };

  $(document).on('resize', function() {
    $.agjCalendar.setPosition();
  }).on('click', function(event) {
    if ($('#agjCalendar').length > 0 && activeAgjCalendar >= 0) {
      switch (agjCalendars[activeAgjCalendar]['inputType']) {
        case 'text':
          var selector = agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'dateSelector' : 'endDateSelector'];
          if (!($(event.target).parents('#agjCalendar').length > 0 || $(event.target).attr('id') == 'agjCalendar') && !($(event.target).parents(selector).length > 0 || $(event.target).is(selector))) {
            $.agjCalendar.hide();
          }
          break;

        case 'dropdown':
          if (!($(event.target).parents('#agjCalendar').length > 0 || $(event.target).attr('id') == 'agjCalendar')) {
            $.agjCalendar.hide();
          }
          break;
      }
    }

    return true;
  }).on('keyup', function(event) {
    if (event.key === 'Escape' && activeAgjCalendar >= 0 && (agjCalendars[activeAgjCalendar]['calendarDisplay'] == 'modal' || agjCalendars[activeAgjCalendar]['calendarDisplay'] == 'full') && $('#agjCalendar').length > 0) {
      $('*:focus').trigger('blur');
      $.agjCalendar.hide();
      return false;
    }

    return true;
  });

  $(window).on('scroll', function() {
    if (activeAgjCalendar >= 0) {
      $.agjCalendar.setPosition();
    }
  });

  $(window).on('resize', function() {
    if (activeAgjCalendar >= 0) {
      $.agjCalendar.setPosition();
    }
  });

  $.fn.agjCalendar = function(options) {
    if (typeof options != 'object') {
      options = {};
    }

    if (this.prop('tagName').toLowerCase() == 'input') {
      var randomNumber = function() {
        var minimum = 100000;
        var maximum = 999999;
        return Math.round(Math.random() * (maximum - minimum) + minimum);
      };

      var className;
      do {
        className = 'agjCalendar-' + randomNumber();
      } while ($('input.' + className).length > 0);

      this.addClass(className);
      options['dateSelector'] = 'input.' + className;

      $.agjCalendar(options);
    }

    return this;
  };

  $.agjCalendar = function(options) {
    var agjCalendar = {};

    /*
    var optionDefaults = {
      allowBlankDates:       false,
      allowRange:            false,
      autoSetEndDate:        false,
      calendarCount:         1,
      calendarDisplay:       "inline",
      dateFormat:            1,
      dateSelector:          null,
      dayNameFormat:         "short",
      daySelector:           null,
      defaultDate:           new Date(),
      defaultRange:          -1,
      endDateSelector:       null,
      endDaySelector:        null,
      endExpanderSelector:   null,
      endMonthSelector:      null,
      expanderSelector:      null,
      inputType:             "text",
      maximumDate:           (function() {
        var maximumDateDefault = new Date();
        maximumDateDefault.setFullYear(
          maximumDateDefault.getFullYear() + 1,
          maximumDateDefault.getMonth(),
          maximumDateDefault.getDate()
        );
        return maximumDateDefault;
      })(),
      maximumRange:          -1,
      minimumDate:           new Date(),
      minimumRange:          -1,
      monthSelector:         null,
      overwriteDayOptions:   true,
      overwriteMonthOptions: true,
      startWeekOnMonday:     false
    };
    options = $.extend(optionDefaults,options);
    console.log(options);
    */

    agjCalendar['calendarCount'] = 1;
    if (options['calendarCount']) {
      if (!isNaN(options['calendarCount'])) {
        if (parseInt(options['calendarCount'], 10) >= 1 && parseInt(options['calendarCount'], 10) <= 3) {
          agjCalendar['calendarCount'] = parseInt(options['calendarCount'], 10);
        }
      }
    }

    agjCalendar['overwriteMonthOptions'] = true;
    if (options['overwriteMonthOptions'] || options['overwriteMonthOptions'] === false) {
      if (options['overwriteMonthOptions'] == false) {
        agjCalendar['overwriteMonthOptions'] = false;
      }
    }

    agjCalendar['overwriteDayOptions'] = true;
    if (options['overwriteDayOptions'] || options['overwriteDayOptions'] === false) {
      if (options['overwriteDayOptions'] == false) {
        agjCalendar['overwriteDayOptions'] = false;
      }
    }

    agjCalendar['autoSetEndDate'] = false;
    if (options['autoSetEndDate']) {
      if (options['autoSetEndDate'] === true) {
        agjCalendar['autoSetEndDate'] = true;
      }
    }

    agjCalendar['allowBlankDates'] = false;
    if (options['allowBlankDates']) {
      if (options['allowBlankDates'] === true) {
        agjCalendar['allowBlankDates'] = true;
      }
    }

    agjCalendar['startWeekOnMonday'] = false;
    if (options['startWeekOnMonday']) {
      if (options['startWeekOnMonday'] === true) {
        agjCalendar['startWeekOnMonday'] = true;
      }
    }

    agjCalendar['dayNameFormat'] = 'short';
    if (options['dayNameFormat']) {
      switch (options['dayNameFormat']) {
        case 'short':
        case 'medium':
        case 'full':
          agjCalendar['dayNameFormat'] = options['dayNameFormat'];
          break;
      }
    }

    /*
     * dateFormat.1 = MM/DD/YYYY, e.g. "01/02/2003"
     * dateFormat.2 = MMM D, YYYY, e.g. "Jan 2, 2003"
     * dateFormat.3 = DD/MM/YYYY, e.g. "02/01/2003"
     * dateFormat.4 = YYYY-MM-DD, e.g. "2003-01-02"
     */
    agjCalendar['dateFormat'] = 1;
    if (options['dateFormat']) {
      if (options['dateFormat'] == 2 || options['dateFormat'] == 3 || options['dateFormat'] == 4) {
        agjCalendar['dateFormat'] = options['dateFormat'];
      }
    }

    agjCalendar['minimumDate'] = new Date();
    if (options['minimumDate']) {
      if (dateFormatRegexPatterns[4].test(options['minimumDate'])) {
        var minimumYear = options['minimumDate'].substring(0, 4);
        var minimumMonth = options['minimumDate'].substring(5, 7);
        var minimumDay = options['minimumDate'].substring(8, 10);

        agjCalendar['minimumDate'].setFullYear(minimumYear, parseInt(minimumMonth, 10) - 1, minimumDay);
      } else if (options['minimumDate'] instanceof Date) {
        agjCalendar['minimumDate'].setFullYear(options['minimumDate'].getFullYear(), options['minimumDate'].getMonth(), options['minimumDate'].getDate());
      }
    }
    agjCalendar['minimumDate'].setHours(0, 0, 0, 0);

    agjCalendar['maximumDate'] = new Date();
    agjCalendar['maximumDate'].setFullYear(agjCalendar['maximumDate'].getFullYear() + 1, agjCalendar['maximumDate'].getMonth(), agjCalendar['maximumDate'].getDate());
    if (options['maximumDate']) {
      if (dateFormatRegexPatterns[4].test(options['maximumDate'])) {
        var maximumYear = options['maximumDate'].substring(0, 4);
        var maximumMonth = options['maximumDate'].substring(5, 7);
        var maximumDay = options['maximumDate'].substring(8, 10);

        var maximumDate = new Date();
        maximumDate.setFullYear(maximumYear, parseInt(maximumMonth, 10) - 1, maximumDay);

        if (maximumDate >= agjCalendar['minimumDate']) {
          agjCalendar['maximumDate'] = maximumDate;
        }
      } else if (options['maximumDate'] instanceof Date && options['maximumDate'] >= agjCalendar['minimumDate']) {
        agjCalendar['maximumDate'].setFullYear(options['maximumDate'].getFullYear(), options['maximumDate'].getMonth(), options['maximumDate'].getDate());
      }
    }
    agjCalendar['maximumDate'].setHours(23, 59, 59, 999);

    agjCalendar['defaultDate'] = new Date();
    if (options['defaultDate']) {
      if (dateFormatRegexPatterns[4].test(options['defaultDate'])) {
        var defaultYear = options['defaultDate'].substring(0, 4);
        var defaultMonth = options['defaultDate'].substring(5, 7);
        var defaultDay = options['defaultDate'].substring(8, 10);

        var defaultDate = new Date();
        defaultDate.setFullYear(defaultYear, parseInt(defaultMonth, 10) - 1, defaultDay);

        if (defaultDate >= agjCalendar['minimumDate'] && defaultDate <= agjCalendar['maximumDate']) {
          agjCalendar['defaultDate'] = defaultDate;
        }
      } else if (options['defaultDate'] instanceof Date) {
        agjCalendar['defaultDate'].setFullYear(options['defaultDate'].getFullYear(), options['defaultDate'].getMonth(), options['defaultDate'].getDate());
      } else if (agjCalendar['allowBlankDates'] && options['defaultDate'] == 'blank') {
        agjCalendar['defaultDate'] = options['defaultDate'];
      }
    }
    if (agjCalendar['defaultDate'] < agjCalendar['minimumDate']) {
      agjCalendar['defaultDate'].setFullYear(agjCalendar['minimumDate'].getFullYear(), agjCalendar['minimumDate'].getMonth(), agjCalendar['minimumDate'].getDate());
    } else if (agjCalendar['defaultDate'] > agjCalendar['maximumDate']) {
      agjCalendar['defaultDate'].setFullYear(agjCalendar['maximumDate'].getFullYear(), agjCalendar['maximumDate'].getMonth(), agjCalendar['maximumDate'].getDate());
    }

    agjCalendar['allowRange'] = false;
    if (options['allowRange']) {
      if (options['allowRange'] === true) {
        agjCalendar['allowRange'] = true;
      }
    }

    if (options['allowRange']) {
      var totalRange = 0;

      var rangeCheck = new Date();
      rangeCheck.setFullYear(agjCalendar['minimumDate'].getFullYear(), agjCalendar['minimumDate'].getMonth(), agjCalendar['minimumDate'].getDate());
      while (rangeCheck <= agjCalendar['maximumDate']) {
        totalRange++;
        rangeCheck.setFullYear(rangeCheck.getFullYear(), rangeCheck.getMonth(), rangeCheck.getDate() + 1);
      }

      agjCalendar['minimumRange'] = totalRange == 0 ? 0 : 1;
      if (options['minimumRange'] || options['minimumRange'] === 0) {
        if (!isNaN(options['minimumRange'])) {
          if (parseInt(options['minimumRange'], 10) <= totalRange) {
            agjCalendar['minimumRange'] = options['minimumRange'];
          }
        }
      }

      agjCalendar['maximumRange'] = totalRange == 0 ? 0 : totalRange;
      if (options['maximumRange'] || options['maximumRange'] === 0) {
        if (!isNaN(options['maximumRange'])) {
          if (parseInt(options['maximumRange'], 10) <= totalRange) {
            agjCalendar['maximumRange'] = options['maximumRange'];
          }
        }
      }

      agjCalendar['defaultRange'] = totalRange == 0 ? 0 : 1;
      if (options['defaultRange'] || options['defaultRange'] === 0) {
        if (!isNaN(options['defaultRange'])) {
          if (parseInt(options['defaultRange'], 10) >= agjCalendar['minimumRange'] && parseInt(options['defaultRange'], 10) <= agjCalendar['maximumRange']) {
            agjCalendar['defaultRange'] = options['defaultRange'];
          }
        }
      }
    } else {
      agjCalendar['defaultRange'] = 0;
      agjCalendar['minimumRange'] = 0;
      agjCalendar['maximumRange'] = 0;
    }

    agjCalendar['calendarDisplay'] = 'inline';
    if (options['calendarDisplay']) {
      if (options['calendarDisplay'] == 'modal' || options['calendarDisplay'] == 'full') {
        agjCalendar['calendarDisplay'] = options['calendarDisplay'];
      }
    }

    agjCalendar['inputType'] = 'text';
    if (options['inputType']) {
      if (options['inputType'] == 'dropdown') {
        agjCalendar['inputType'] = options['inputType'];
      }
    }

    switch (agjCalendar['inputType']) {
      case 'text':
        var expanderElement = $(options['expanderSelector']);
        var dateElement = $(options['dateSelector']);

        var endExpanderElement;
        var endDateElement;
        if (options['allowRange']) {
          endExpanderElement = $(options['endExpanderSelector']);
          endDateElement = $(options['endDateSelector']);
        }

        if (dateElement.length == 1 && (!options['allowRange'] || endDateElement.length == 1)) {
          agjCalendar['expanderSelector'] = options['expanderSelector'];
          agjCalendar['dateSelector'] = options['dateSelector'];

          if (options['allowRange']) {
            agjCalendar['endExpanderSelector'] = options['endExpanderSelector'];
            agjCalendar['endDateSelector'] = options['endDateSelector'];
          }

          var newestAgjCalendar = agjCalendars.length;
          agjCalendars[newestAgjCalendar] = agjCalendar;
          var formerActiveAgjCalendar = activeAgjCalendar;
          activeAgjCalendar = newestAgjCalendar;
          $.agjCalendar.setNewDate(agjCalendar['defaultDate']);
          activeAgjCalendar = formerActiveAgjCalendar;

          var displayCalendar = function() {
            if (activeAgjCalendar != newestAgjCalendar || activeAgjCalendarIsEnd || $(dateElement).is(':focus')) {
              activeAgjCalendar = newestAgjCalendar;
              activeAgjCalendarIsEnd = false;
              $.agjCalendar.show();
            } else {
              $.agjCalendar.hide();
            }

            return false;
          };
          if (expanderElement.length > 0) {
            expanderElement.on('click', displayCalendar);
          }
          dateElement.on('focus', displayCalendar).on('keydown', function(event) {
            if (event.key === 'Tab') {
              if (options['allowRange']) {
                setTimeout(function() {
                  if ($(':focus')[0] != endDateElement[0]) {
                    $.agjCalendar.hide();
                  }
                }, 1);
              }
            }

            return true;
          });
        }

        if (options['allowRange']) {
          formerActiveAgjCalendar = activeAgjCalendar;

          var endDefaultDate;
          if (agjCalendar['defaultDate'] == 'blank') {
            endDefaultDate = 'blank';
          } else {
            endDefaultDate = new Date();
            endDefaultDate.setFullYear(agjCalendar['defaultDate'].getFullYear(), agjCalendar['defaultDate'].getMonth(), agjCalendar['defaultDate'].getDate() + agjCalendar['defaultRange']);
          }
          activeAgjCalendar = newestAgjCalendar;
          activeAgjCalendarIsEnd = true;
          $.agjCalendar.setNewDate(endDefaultDate, true);
          activeAgjCalendar = formerActiveAgjCalendar;
          activeAgjCalendarIsEnd = false;

          dateElement.on('blur', function() {
            if (dateFormatRegexPatterns[1].test($(this).val())) {
              $.agjCalendar.checkEndDate(newestAgjCalendar);
            }
          });

          endDateElement.on('keydown', function(event) {
            if (event.key === 'Tab') {
              setTimeout(function() {
                if ($(':focus')[0] != dateElement[0]) {
                  $.agjCalendar.hide();
                }
              }, 1);
            }

            return true;
          });

          var displayEndCalendar = function() {
            if (activeAgjCalendar != newestAgjCalendar || !activeAgjCalendarIsEnd || $(endDateElement).is(':focus')) {
              activeAgjCalendar = newestAgjCalendar;
              activeAgjCalendarIsEnd = true;
              $.agjCalendar.show();
            } else {
              $.agjCalendar.hide();
            }

            return false;
          };
          if (endExpanderElement.length > 0) {
            endExpanderElement.on('click', displayEndCalendar);
          }
          endDateElement.on('focus', displayEndCalendar);
        }
        break;

      case 'dropdown':
        var expanderElement = $(options['expanderSelector']);
        var monthElement = $(options['monthSelector']);
        var dayElement = $(options['daySelector']);

        var endExpanderElement;
        var endMonthElement;
        var endDayElement;
        if (options['allowRange']) {
          endExpanderElement = $(options['endExpanderSelector']);
          endMonthElement = $(options['endMonthSelector']);
          endDayElement = $(options['endDaySelector']);
        }

        if (monthElement.length == 1 && dayElement.length == 1 && (!options['allowRange'] || (endMonthElement.length == 1 && endDayElement.length == 1))) {
          agjCalendar['monthSelector'] = options['monthSelector'];
          agjCalendar['daySelector'] = options['daySelector'];
          agjCalendar['expanderSelector'] = options['expanderSelector'];

          if (options['allowRange']) {
            agjCalendar['endMonthSelector'] = options['endMonthSelector'];
            agjCalendar['endDaySelector'] = options['endDaySelector'];
            agjCalendar['endExpanderSelector'] = options['endExpanderSelector'];
          }

          var newestAgjCalendar = agjCalendars.length;
          agjCalendars[newestAgjCalendar] = agjCalendar;

          $.agjCalendar.updateMonthSelectors(newestAgjCalendar);
          $.agjCalendar.updateDaySelectors(newestAgjCalendar);

          var formerActiveAgjCalendar = activeAgjCalendar;
          activeAgjCalendar = newestAgjCalendar;
          $.agjCalendar.setNewDate(agjCalendar['defaultDate']);
          activeAgjCalendar = formerActiveAgjCalendar;

          if (expanderElement.length > 0) {
            expanderElement.on('click', function() {
              if (activeAgjCalendar != newestAgjCalendar || activeAgjCalendarIsEnd) {
                activeAgjCalendar = newestAgjCalendar;
                activeAgjCalendarIsEnd = false;
                $.agjCalendar.show();
              } else {
                $.agjCalendar.hide();
              }

              return false;
            });
          }

          monthElement.on('change', function() {
            $.agjCalendar.updateDaySelectors(newestAgjCalendar);
            if (options['allowRange']) {
              var startDate = new Date();
              startDate.setFullYear(monthElement.val().substring(0, 4), parseInt(monthElement.val().substring(5, 7), 10) - 1, dayElement.val());
              startDate.setHours(0, 0, 0, 0);

              var endDate = new Date();
              endDate.setFullYear(endMonthElement.val().substring(0, 4), parseInt(endMonthElement.val().substring(5, 7), 10) - 1, endDayElement.val());
              endDate.setHours(0, 0, 0, 0);

              $.agjCalendar.updateMonthSelectors(newestAgjCalendar, true);
              $.agjCalendar.updateDaySelectors(newestAgjCalendar, true);

              if (startDate > endDate) {
                activeAgjCalendar = newestAgjCalendar;

                var updatedEndDate = new Date();
                updatedEndDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendar['defaultRange']);
                $.agjCalendar.setNewDate(updatedEndDate, true);

                activeAgjCalendar = -1;
              }
            }
          });

          if (options['allowRange']) {
            $.agjCalendar.updateMonthSelectors(newestAgjCalendar, true);
            $.agjCalendar.updateDaySelectors(newestAgjCalendar, true);

            formerActiveAgjCalendar = activeAgjCalendar;

            var endDefaultDate;
            if (agjCalendar['defaultDate'] == 'blank') {
              endDefaultDate = 'blank';
            } else {
              endDefaultDate = new Date();
              endDefaultDate.setFullYear(agjCalendar['defaultDate'].getFullYear(), agjCalendar['defaultDate'].getMonth(), agjCalendar['defaultDate'].getDate() + agjCalendar['defaultRange']);
            }
            activeAgjCalendar = newestAgjCalendar;
            activeAgjCalendarIsEnd = true;
            $.agjCalendar.setNewDate(endDefaultDate, true);
            activeAgjCalendar = formerActiveAgjCalendar;
            activeAgjCalendarIsEnd = false;

            dayElement.on('change', function() {
              $.agjCalendar.checkEndDate(newestAgjCalendar);
              $.agjCalendar.updateMonthSelectors(newestAgjCalendar, true);
              $.agjCalendar.updateDaySelectors(newestAgjCalendar, true);
            });

            if (endExpanderElement.length > 0) {
              endExpanderElement.on('click', function() {
                if (activeAgjCalendar != newestAgjCalendar || !activeAgjCalendarIsEnd) {
                  activeAgjCalendar = newestAgjCalendar;
                  activeAgjCalendarIsEnd = true;
                  $.agjCalendar.show();
                } else {
                  $.agjCalendar.hide();
                }

                return false;
              });
            }

            endMonthElement.on('change', function() {
              $.agjCalendar.updateDaySelectors(newestAgjCalendar, true);
            });
          }
        }
        break;
    }
  };

  $.agjCalendar.show = function() {
    var elementsFound = false;

    switch (agjCalendars[activeAgjCalendar]['inputType']) {
      case 'text':
        var dateElement = $(agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'dateSelector' : 'endDateSelector']);
        var startDateElement;
        if (activeAgjCalendarIsEnd) {
          startDateElement = $(agjCalendars[activeAgjCalendar]['dateSelector']);
        }

        elementsFound = dateElement.length == 1 && (!activeAgjCalendarIsEnd || startDateElement.length == 1);
        break;

      case 'dropdown':
        var monthElement = $(agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'monthSelector' : 'endMonthSelector']);
        var dayElement = $(agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'daySelector' : 'endDaySelector']);

        var startMonthElement;
        var startDayElement;
        if (activeAgjCalendarIsEnd) {
          startMonthElement = $(agjCalendars[activeAgjCalendar]['monthSelector']);
          startDayElement = $(agjCalendars[activeAgjCalendar]['daySelector']);
        }

        elementsFound = monthElement.length == 1 && dayElement.length == 1 && (!activeAgjCalendarIsEnd || (startMonthElement.length == 1 && startDayElement.length == 1));
        break;
    }

    if (agjCalendars[activeAgjCalendar]['startWeekOnMonday'] === true) {
      $('#agjCalendar-body').addClass('agjCalendar-start-week-on-monday');
    } else {
      $('#agjCalendar-body').removeClass('agjCalendar-start-week-on-monday');
    }
    $('div.agjCalendar-days').empty().append(getDaysOfWeekMarkup());

    if (elementsFound) {
      var calendarElement = $('#agjCalendar');
      if (calendarElement.length == 0) {
        $.agjCalendar.addToDom();
        calendarElement = $('#agjCalendar');
      }

      var showCalendar = function() {
        if (agjCalendars[activeAgjCalendar]['calendarDisplay'] == 'modal' || agjCalendars[activeAgjCalendar]['calendarDisplay'] == 'full') {
          window.scrollTo(0, 1);
          window.scrollTo(0, 0);

          lastBodyOverflowValue = $('body').css('overflow');
          lastBodyMarginRightValue = $('body').css('marginRight');
          if (String(lastBodyMarginRightValue).indexOf('px') >= 0) {
            lastBodyMarginRightValue = lastBodyMarginRightValue.substring(0, lastBodyMarginRightValue.length - 2);
          }
          lastBodyMarginRightValue = parseInt(lastBodyMarginRightValue, 10);
          $('body').css({
            overflow:    'hidden',
            marginRight: lastBodyMarginRightValue + 17,
          });
          $('#agjCalendar-modal-background').css({
            display: 'block',
          });
        }
        $.agjCalendar.setPosition();
        $.agjCalendar.updateMonthDropdown();

        var currentDate = new Date();

        switch (agjCalendars[activeAgjCalendar]['inputType']) {
          case 'text':
            switch (agjCalendars[activeAgjCalendar]['dateFormat']) {
              case 1:
                if (dateFormatRegexPatterns[1].test(dateElement.val())) {
                  currentDate.setFullYear(dateElement.val().substring(6, 10), parseInt(dateElement.val().substring(0, 2), 10) - 1, parseInt(dateElement.val().substring(3, 5), 10));
                } else {
                  if (activeAgjCalendarIsEnd && dateFormatRegexPatterns[1].test(startDateElement.val())) {
                    currentDate.setFullYear(startDateElement.val().substring(6, 10), parseInt(startDateElement.val().substring(0, 2), 10) - 1, parseInt(startDateElement.val().substring(3, 5), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
                  } else {
                    if (!activeAgjCalendarIsEnd) {
                      currentDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate());
                    } else {
                      currentDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
                    }
                  }
                }

                if (activeAgjCalendarIsEnd && dateFormatRegexPatterns[1].test(startDateElement.val())) {
                  var currentStartDate = new Date();
                  currentStartDate.setFullYear(startDateElement.val().substring(6, 10), parseInt(startDateElement.val().substring(0, 2), 10) - 1, parseInt(startDateElement.val().substring(3, 5), 10));
                  if (Math.ceil(Math.abs(currentDate.getTime() - currentStartDate.getTime()) / (1000 * 60 * 60 * 24)) > agjCalendars[activeAgjCalendar]['maximumRange']) {
                    currentDate = new Date(currentStartDate.getTime() + (1000 * 60 * 60 * 24 * agjCalendars[activeAgjCalendar]['maximumRange']));
                  }
                }
                break;

              case 2:
                if (dateFormatRegexPatterns[2].test(dateElement.val())) {
                  var currentYear = dateElement.val().substring(dateElement.val().length - 4, dateElement.val().length);
                  var currentMonth = getMonthNumber(dateElement.val().substring(0, 3));
                  var currentDay = dateElement.val().substring(dateElement.val().indexOf(' ') + 1, dateElement.val().indexOf(','));

                  currentDate.setFullYear(currentYear, currentMonth - 1, currentDay);
                } else {
                  if (activeAgjCalendarIsEnd && dateFormatRegexPatterns[2].test(startDateElement.val())) {
                    var startDateYear = startDateElement.val().substring(startDateElement.val().length - 4, startDateElement.val().length);
                    var startDateMonth = getMonthNumber(startDateElement.val().substring(0, 3));
                    var startDateDay = startDateElement.val().substring(startDateElement.val().indexOf(' ') + 1, startDateElement.val().indexOf(','));

                    currentDate.setFullYear(startDateYear, startDateMonth - 1, parseInt(startDateDay, 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
                  } else {
                    if (!activeAgjCalendarIsEnd) {
                      currentDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate());
                    } else {
                      currentDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
                    }
                  }
                }
                break;

              case 3:
                if (dateFormatRegexPatterns[3].test(dateElement.val())) {
                  currentDate.setFullYear(dateElement.val().substring(6, 10), parseInt(dateElement.val().substring(3, 5), 10) - 1, parseInt(dateElement.val().substring(0, 2), 10));
                } else {
                  if (activeAgjCalendarIsEnd && dateFormatRegexPatterns[3].test(startDateElement.val())) {
                    currentDate.setFullYear(startDateElement.val().substring(6, 10), parseInt(startDateElement.val().substring(3, 5), 10) - 1, parseInt(startDateElement.val().substring(0, 2), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
                  } else {
                    if (!activeAgjCalendarIsEnd) {
                      currentDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate());
                    } else {
                      currentDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
                    }
                  }
                }
                break;

              case 4:
                if (dateFormatRegexPatterns[4].test(dateElement.val())) {
                  currentDate.setFullYear(dateElement.val().substring(0, 4), parseInt(dateElement.val().substring(5, 7), 10) - 1, parseInt(dateElement.val().substring(8, 10), 10));
                } else {
                  if (activeAgjCalendarIsEnd && dateFormatRegexPatterns[4].test(startDateElement.val())) {
                    currentDate.setFullYear(startDateElement.val().substring(0, 4), parseInt(startDateElement.val().substring(5, 7), 10) - 1, parseInt(startDateElement.val().substring(8, 10), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
                  } else {
                    if (!activeAgjCalendarIsEnd) {
                      currentDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate());
                    } else {
                      currentDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
                    }
                  }
                }
                break;
            }
            break;

          case 'dropdown':
            if (dateFormatRegexPatterns['month'].test(monthElement.val())) {
              currentDate.setFullYear(monthElement.val().substring(0, 4), parseInt(monthElement.val().substring(5, 7), 10) - 1, 1);
            } else {
              if (activeAgjCalendarIsEnd && dateFormatRegexPatterns['month'].test(startMonthElement.val())) {
                currentDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, parseInt(startDayElement.val(), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
              } else {
                if (!activeAgjCalendarIsEnd) {
                  currentDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate());
                } else {
                  currentDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
                }
              }
            }
            break;
        }

        if (currentDate < agjCalendars[activeAgjCalendar]['minimumDate']) {
          currentDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate());
        } else if (currentDate > agjCalendars[activeAgjCalendar]['maximumDate']) {
          currentDate.setFullYear(agjCalendars[activeAgjCalendar]['maximumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['maximumDate'].getMonth(), agjCalendars[activeAgjCalendar]['maximumDate'].getDate());
        }

        currentDate.setHours(0, 0, 0, 0);

        $.agjCalendar.updateCalendars(currentDate);

        switch (agjCalendars[activeAgjCalendar]['calendarCount']) {
          case 1:
            $('#agjCalendar').removeClass('agjCalendar-double agjCalendar-triple').addClass('agjCalendar-single');
            $('#agjCalendar-first').show();
            $('#agjCalendar-second, #agjCalendar-third').hide();
            break;

          case 2:
            $('#agjCalendar').removeClass('agjCalendar-single agjCalendar-triple').addClass('agjCalendar-double');
            $('#agjCalendar-first, #agjCalendar-second').show();
            $('#agjCalendar-third').hide();
            break;

          case 3:
            $('#agjCalendar').removeClass('agjCalendar-single agjCalendar-double').addClass('agjCalendar-triple');
            $('#agjCalendar-first, #agjCalendar-second, #agjCalendar-third').show();
            break;
        }
        calendarElement.show();
        $.agjCalendar.setPosition();
      };

      if (calendarElement.is(':visible')) {
        calendarElement.hide();
      }
      showCalendar();
    }

    if (agjCalendars[activeAgjCalendar]['calendarDisplay'] == 'full') {
      setTimeout(function() {
        $(document).trigger('resize');
        $(window).trigger('resize');
        $(window).trigger('scroll');
      }, 100);
    }
  };

  $.agjCalendar.setPosition = function() {
    if (activeAgjCalendar >= 0) {
      switch (agjCalendars[activeAgjCalendar]['calendarDisplay']) {
        case 'inline':
          switch (agjCalendars[activeAgjCalendar]['inputType']) {
            case 'text':
              var calendarElement = $('#agjCalendar');
              var dateElement = $(agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'dateSelector' : 'endDateSelector']);
              var expanderElement = $(agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'expanderSelector' : 'endExpanderSelector']);

              if (calendarElement.length == 1 && dateElement.length == 1) {
                var expanderBottom;
                if (expanderElement.length > 0) {
                  expanderBottom = expanderElement.offset().top + getTrueHeight(expanderElement);
                } else {
                  expanderBottom = 0;
                }

                var dateBottom;
                if (dateElement.attr('type') == 'hidden') {
                  dateBottom = dateElement.parent().offset().top + getTrueHeight(dateElement.parent());
                } else {
                  dateBottom = dateElement.offset().top + getTrueHeight(dateElement);
                }

                var calendarTop = Math.max(expanderBottom, dateBottom) + 1;

                var expanderLeft;
                if (expanderElement.length > 0) {
                  expanderLeft = expanderElement.offset().left;
                } else {
                  expanderLeft = Number.MAX_SAFE_INTEGER;
                }

                var dateLeft;
                if (dateElement.attr('type') == 'hidden') {
                  dateLeft = dateElement.parent().offset().left;
                } else {
                  dateLeft = dateElement.offset().left;
                }

                var calendarLeft = Math.min(expanderLeft, dateLeft);

                calendarElement.css({
                  left: calendarLeft,
                  top:  calendarTop,
                });
              }
              break;

            case 'dropdown':
              var calendarElement = $('#agjCalendar');
              var monthElement = $(agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'monthSelector' : 'endMonthSelector']);
              var dayElement = $(agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'daySelector' : 'endDaySelector']);
              var expanderElement = $(agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'expanderSelector' : 'endExpanderSelector']);

              if (calendarElement.length == 1 && monthElement.length == 1 && dayElement.length == 1) {
                var expanderBottom;
                if (expanderElement.length > 0) {
                  expanderBottom = expanderElement.offset().top + getTrueHeight(expanderElement);
                } else {
                  expanderBottom = 0;
                }
                var monthBottom = monthElement.offset().top + getTrueHeight(monthElement);
                var dayBottom = dayElement.offset().top + getTrueHeight(dayElement);
                var calendarTop = Math.max(expanderBottom, monthBottom, dayBottom) + 1;

                var expanderLeft;
                if (expanderElement.length > 0) {
                  expanderLeft = expanderElement.offset().left;
                } else {
                  expanderLeft = Number.MAX_SAFE_INTEGER;
                }
                var monthLeft = monthElement.offset().left;
                var dayLeft = dayElement.offset().left;
                var calendarLeft = Math.min(expanderLeft, monthLeft, dayLeft);

                calendarElement.css({
                  left: calendarLeft,
                  top:  calendarTop,
                });
              }
              break;
          }

          var calendarElement = $('#agjCalendar');
          calendarElement.removeClass('agjCalendar-full').css({
            position: 'absolute',
          });
          $('#agjCalendar-modal-background').addClass('agjCalendar-modal-background-full');
          break;

        case 'modal':
          var calendarElement = $('#agjCalendar');
          calendarElement.removeClass('agjCalendar-full').css({
            left:     ($(window).width() / 2) - (getTrueWidth(calendarElement) / 2),
            position: 'fixed',
            top:      ($(window).height() / 2) - (getTrueHeight(calendarElement) / 2),
          });
          $('#agjCalendar-modal-background').addClass('agjCalendar-modal-background-full');
          break;

        case 'full':
          var calendarElement = $('#agjCalendar');
          calendarElement.addClass('agjCalendar-full').css({
            left:     0,
            position: 'fixed',
            top:      0,
          });
          $('#agjCalendar-modal-background').addClass('agjCalendar-modal-background-full');
          break;
      }
    }
  };

  $.agjCalendar.hide = function() {
    var calendarElement;
    calendarElement = $('#agjCalendar');

    if (activeAgjCalendar >= 0 && (agjCalendars[activeAgjCalendar]['calendarDisplay'] == 'modal' || agjCalendars[activeAgjCalendar]['calendarDisplay'] == 'full')) {
      $('body').css({
        overflow:    lastBodyOverflowValue,
        marginRight: lastBodyMarginRightValue,
      });
      $('#agjCalendar-modal-background').hide();
    }

    if (calendarElement.length == 1) {
      calendarElement.hide();
      activeAgjCalendar = -1;
    }
  };

  $.agjCalendar.updateMonthSelectors = function(agjCalendar, updateEndAgjCalendar) {
    if (updateEndAgjCalendar === undefined) {
      updateEndAgjCalendar = false;
    }

    if (agjCalendars[agjCalendar]['overwriteMonthOptions']) {
      var monthElement = $(agjCalendars[agjCalendar][!updateEndAgjCalendar ? 'monthSelector' : 'endMonthSelector']);
      var dayElement = $(agjCalendars[agjCalendar][!updateEndAgjCalendar ? 'daySelector' : 'endDaySelector']);

      var startMonthElement;
      var startDayElement;
      if (agjCalendars[agjCalendar]['allowRange'] && updateEndAgjCalendar) {
        startMonthElement = $(agjCalendars[agjCalendar]['monthSelector']);
        startDayElement = $(agjCalendars[agjCalendar]['daySelector']);
      }

      if (monthElement.length == 1 && dayElement.length == 1 && (!agjCalendars[agjCalendar]['allowRange'] || !updateEndAgjCalendar || (startMonthElement.length == 1 && startDayElement.length == 1))) {
        if (dateFormatRegexPatterns['month'].test(monthElement.val()) && dayElement.val().length > 0) {
          var activeDate = new Date();
          activeDate.setFullYear(monthElement.val().substring(0, 4), parseInt(monthElement.val().substring(5, 7), 10) - 1, 1);
          if (getDaysInMonth(activeDate.getFullYear(), activeDate.getMonth() + 1) < parseInt(dayElement.val(), 10)) {
            activeDate.setFullYear(monthElement.val().substring(0, 4), parseInt(monthElement.val().substring(5, 7), 10) - 1, getDaysInMonth(activeDate.getFullYear(), activeDate.getMonth() + 1));
          } else {
            activeDate.setFullYear(monthElement.val().substring(0, 4), parseInt(monthElement.val().substring(5, 7), 10) - 1, parseInt(dayElement.val(), 10));
          }
        }

        monthElement.html('');

        if (agjCalendars[agjCalendar]['allowBlankDates']) {
          monthElement.append('<option value=""></option>');
        }

        var minimumDate = new Date();
        minimumDate.setFullYear(agjCalendars[agjCalendar]['minimumDate'].getFullYear(), agjCalendars[agjCalendar]['minimumDate'].getMonth(), agjCalendars[agjCalendar]['minimumDate'].getDate());
        if (updateEndAgjCalendar) {
          if (startMonthElement.length == 1 && startDayElement.length == 1 && startMonthElement.val().length > 0 && startDayElement.val().length > 0) {
            minimumDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, parseInt(startDayElement.val(), 10) + agjCalendars[agjCalendar]['minimumRange']);
          }
        }
        minimumDate.setHours(0, 0, 0, 0);

        var maximumDate = new Date();
        maximumDate.setFullYear(agjCalendars[agjCalendar]['maximumDate'].getFullYear(), agjCalendars[agjCalendar]['maximumDate'].getMonth(), agjCalendars[agjCalendar]['maximumDate'].getDate());
        if (agjCalendars[agjCalendar]['allowRange']) {
          var startDate;
          if (updateEndAgjCalendar) {
            if (dateFormatRegexPatterns['month'].test(startMonthElement.val()) && startDayElement.val().length > 0) {
              startDate = new Date();
              startDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, 1);
              if (getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1) < parseInt(dayElement.val(), 10)) {
                startDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1));
              } else {
                startDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, parseInt(startDayElement.val(), 10));
              }
            }
          }

          if (!updateEndAgjCalendar) {
            maximumDate.setFullYear(maximumDate.getFullYear(), maximumDate.getMonth(), maximumDate.getDate() - agjCalendars[agjCalendar]['minimumRange']);
          } else if (typeof startDate != 'undefined') {
            maximumDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['maximumRange']);
          }
        }
        maximumDate.setHours(23, 59, 59, 999);

        var drawDate = minimumDate;
        while (drawDate < maximumDate) {
          var classMarkup = '';
          if (typeof activeDate != 'undefined') {
            if (activeDate.getFullYear() == drawDate.getFullYear() && activeDate.getMonth() == drawDate.getMonth()) {
              classMarkup = ' selected="selected"';
            }
          }

          monthElement.append('<option value="' + drawDate.getFullYear() + '-' + (drawDate.getMonth() + 1 < 10 ? '0' + (drawDate.getMonth() + 1) : drawDate.getMonth() + 1) + '"' + classMarkup + '>' + getMonthName(drawDate.getMonth() + 1) + ' ' + drawDate.getFullYear() + '</option>');
          drawDate.setFullYear(drawDate.getFullYear(), drawDate.getMonth() + 1, 1);
        }
      }
    }
  };

  $.agjCalendar.updateDaySelectors = function(agjCalendar, updateEndAgjCalendar) {
    if (updateEndAgjCalendar === undefined) {
      updateEndAgjCalendar = false;
    }

    if (agjCalendar >= 0 && agjCalendars[agjCalendar]['overwriteDayOptions']) {
      var monthElement = $(agjCalendars[agjCalendar][!updateEndAgjCalendar ? 'monthSelector' : 'endMonthSelector']);
      var dayElement = $(agjCalendars[agjCalendar][!updateEndAgjCalendar ? 'daySelector' : 'endDaySelector']);

      var startMonthElement;
      var startDayElement;
      if (agjCalendars[agjCalendar]['allowRange'] && updateEndAgjCalendar) {
        startMonthElement = $(agjCalendars[agjCalendar]['monthSelector']);
        startDayElement = $(agjCalendars[agjCalendar]['daySelector']);
      }

      if (monthElement.length == 1 && dayElement.length == 1) {
        if (dateFormatRegexPatterns['month'].test(monthElement.val())) {
          if (dayElement.find('option').length > 0 && dayElement.val().length > 0) {
            var activeDate = new Date();
            activeDate.setFullYear(monthElement.val().substring(0, 4), parseInt(monthElement.val().substring(5, 7), 10) - 1, 1);
            if (getDaysInMonth(activeDate.getFullYear(), activeDate.getMonth() + 1) < parseInt(dayElement.val(), 10)) {
              activeDate.setFullYear(monthElement.val().substring(0, 4), parseInt(monthElement.val().substring(5, 7), 10) - 1, getDaysInMonth(activeDate.getFullYear(), activeDate.getMonth() + 1));
            } else {
              activeDate.setFullYear(monthElement.val().substring(0, 4), parseInt(monthElement.val().substring(5, 7), 10) - 1, parseInt(dayElement.val(), 10));
            }
          }

          var totalDays = getDaysInMonth(monthElement.val().substring(0, 4), monthElement.val().substring(5, 7));
          if (totalDays > 0) {
            dayElement.html('');

            if (agjCalendars[agjCalendar]['allowBlankDates']) {
              dayElement.append('<option value=""></option>');
            }

            var minimumDate = new Date();
            minimumDate.setFullYear(agjCalendars[agjCalendar]['minimumDate'].getFullYear(), agjCalendars[agjCalendar]['minimumDate'].getMonth(), agjCalendars[agjCalendar]['minimumDate'].getDate());
            if (updateEndAgjCalendar) {
              var startMonthElement = $(agjCalendars[agjCalendar]['monthSelector']);
              var startDayElement = $(agjCalendars[agjCalendar]['daySelector']);
              if (startMonthElement.length == 1 && startDayElement.length == 1 && startMonthElement.val().length > 0 && startDayElement.val().length > 0) {
                minimumDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, parseInt(startDayElement.val(), 10) + agjCalendars[agjCalendar]['minimumRange']);
              } else {
                minimumDate.setFullYear(minimumDate.getFullYear(), minimumDate.getMonth(), minimumDate.getDate() + agjCalendars[agjCalendar]['minimumRange']);
              }
            }
            minimumDate.setHours(0, 0, 0, 0);

            var maximumDate = new Date();
            maximumDate.setFullYear(agjCalendars[agjCalendar]['maximumDate'].getFullYear(), agjCalendars[agjCalendar]['maximumDate'].getMonth(), agjCalendars[agjCalendar]['maximumDate'].getDate());
            if (agjCalendars[agjCalendar]['allowRange']) {
              var startDate;
              if (updateEndAgjCalendar) {
                if (dateFormatRegexPatterns['month'].test(startMonthElement.val()) && startDayElement.val().length > 0) {
                  startDate = new Date();
                  startDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, 1);
                  if (getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1) < parseInt(dayElement.val(), 10)) {
                    startDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1));
                  } else {
                    startDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, parseInt(startDayElement.val(), 10));
                  }
                }
              }

              if (!updateEndAgjCalendar) {
                maximumDate.setFullYear(maximumDate.getFullYear(), maximumDate.getMonth(), maximumDate.getDate() - agjCalendars[agjCalendar]['minimumRange']);
              } else if (typeof startDate != 'undefined') {
                maximumDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['maximumRange']);
              }
            }
            maximumDate.setHours(23, 59, 59, 999);

            var checkerDate = new Date();
            checkerDate.setFullYear(monthElement.val().substring(0, 4), parseInt(monthElement.val().substring(5, 7), 10) - 1, 1);
            if (checkerDate < minimumDate && !agjCalendars[agjCalendar]['overwriteMonthOptions']) {
              checkerDate.setFullYear(minimumDate.getFullYear(), minimumDate.getMonth(), 1);
            }

            for (var day = 1; day <= totalDays; day++) {
              checkerDate.setFullYear(checkerDate.getFullYear(), checkerDate.getMonth(), day);
              checkerDate.setHours(12, 30, 30, 500);

              var classMarkup = '';
              if (typeof activeDate != 'undefined') {
                if (activeDate.getDate() == day) {
                  classMarkup = ' selected="selected"';
                }
              }

              if (checkerDate >= minimumDate && checkerDate <= maximumDate) {
                dayElement.append('<option value="' + (day < 10 ? '0' + day : day) + '"' + classMarkup + '>' + day + '</option>');
              }
            }
          }
        } else {
          dayElement.html('<option value=""></option>');
        }
      }
    }
  };

  $.agjCalendar.updateMonthDropdown = function() {
    var dropdownElement = $('#agjCalendar-dropdown');

    var minimumDate = new Date();
    minimumDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate());
    if (activeAgjCalendarIsEnd) {
      switch (agjCalendars[activeAgjCalendar]['inputType']) {
        case 'text':
          var startDateElement;
          startDateElement = $(agjCalendars[activeAgjCalendar]['dateSelector']);

          if (startDateElement.length == 1) {
            if (agjCalendars[activeAgjCalendar]['dateFormat'] == 1 && dateFormatRegexPatterns[1].test(startDateElement.val())) {
              minimumDate.setFullYear(startDateElement.val().substring(6, 10), parseInt(startDateElement.val().substring(0, 2), 10) - 1, parseInt(startDateElement.val().substring(3, 5), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
            } else if (agjCalendars[activeAgjCalendar]['dateFormat'] == 2 && dateFormatRegexPatterns[2].test(startDateElement.val())) {
              var minimumYear = startDateElement.val().substring(startDateElement.val().length - 4, startDateElement.val().length);
              var minimumMonth = getMonthNumber(startDateElement.val().substring(0, 3));
              var minimumDay = startDateElement.val().substring(startDateElement.val().indexOf(' ') + 1, startDateElement.val().indexOf(','));

              minimumDate = new Date();
              minimumDate.setFullYear(minimumYear, minimumMonth - 1, minimumDay);
            } else if (agjCalendars[activeAgjCalendar]['dateFormat'] == 3 && dateFormatRegexPatterns[3].test(startDateElement.val())) {
              minimumDate.setFullYear(startDateElement.val().substring(6, 10), parseInt(startDateElement.val().substring(3, 5), 10) - 1, parseInt(startDateElement.val().substring(0, 2), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
            } else if (agjCalendars[activeAgjCalendar]['dateFormat'] == 4 && dateFormatRegexPatterns[4].test(startDateElement.val())) {
              minimumDate.setFullYear(startDateElement.val().substring(0, 4), parseInt(startDateElement.val().substring(5, 7), 10) - 1, parseInt(startDateElement.val().substring(8, 10), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
            } else {
              minimumDate.setFullYear(minimumDate.getFullYear(), minimumDate.getMonth(), minimumDate.getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
            }
          }
          break;

        case 'dropdown':
          var startMonthElement = $(agjCalendars[activeAgjCalendar]['monthSelector']);
          var startDayElement = $(agjCalendars[activeAgjCalendar]['daySelector']);
          if (startMonthElement.length == 1 && startDayElement.length == 1 && startMonthElement.val().length > 0 && startDayElement.val().length > 0) {
            minimumDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, parseInt(startDayElement.val(), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
          } else {
            minimumDate.setFullYear(minimumDate.getFullYear(), minimumDate.getMonth(), minimumDate.getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
          }
          break;
      }
    }
    minimumDate.setHours(0, 0, 0, 0);

    var maximumDate = new Date();
    maximumDate.setFullYear(agjCalendars[activeAgjCalendar]['maximumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['maximumDate'].getMonth(), agjCalendars[activeAgjCalendar]['maximumDate'].getDate());
    if (agjCalendars[activeAgjCalendar]['allowRange']) {
      switch (agjCalendars[activeAgjCalendar]['inputType']) {
        case 'text':
          var startDate;
          if (activeAgjCalendarIsEnd) {
            if (agjCalendars[activeAgjCalendar]['dateFormat'] == 1 && dateFormatRegexPatterns[1].test(startDateElement.val())) {
              startDate = new Date();
              startDate.setFullYear(startDateElement.val().substring(6, 10), parseInt(startDateElement.val().substring(0, 2), 10) - 1, parseInt(startDateElement.val().substring(3, 5), 10));
            } else if (agjCalendars[activeAgjCalendar]['dateFormat'] == 2 && dateFormatRegexPatterns[2].test(startDateElement.val())) {
              var startYear = startDateElement.val().substring(startDateElement.val().length - 4, startDateElement.val().length);
              var startMonth = getMonthNumber(startDateElement.val().substring(0, 3));
              var startDay = startDateElement.val().substring(startDateElement.val().indexOf(' ') + 1, startDateElement.val().indexOf(','));

              startDate = new Date();
              startDate.setFullYear(startYear, startMonth - 1, startDay);
            } else if (agjCalendars[activeAgjCalendar]['dateFormat'] == 3 && dateFormatRegexPatterns[3].test(startDateElement.val())) {
              startDate = new Date();
              startDate.setFullYear(startDateElement.val().substring(6, 10), parseInt(startDateElement.val().substring(3, 5), 10) - 1, parseInt(startDateElement.val().substring(0, 2), 10));
            } else if (agjCalendars[activeAgjCalendar]['dateFormat'] == 4 && dateFormatRegexPatterns[4].test(startDateElement.val())) {
              startDate = new Date();
              startDate.setFullYear(startDateElement.val().substring(0, 4), parseInt(startDateElement.val().substring(5, 7), 10) - 1, parseInt(startDateElement.val().substring(8, 10), 10));
            }
          }

          if (!activeAgjCalendarIsEnd) {
            maximumDate.setFullYear(maximumDate.getFullYear(), maximumDate.getMonth(), maximumDate.getDate() - agjCalendars[activeAgjCalendar]['minimumRange']);
          } else if (typeof startDate != 'undefined') {
            maximumDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[activeAgjCalendar]['maximumRange']);
          }

          if (activeAgjCalendarIsEnd && maximumDate > agjCalendars[activeAgjCalendar]['maximumDate']) {
            maximumDate = agjCalendars[activeAgjCalendar]['maximumDate'];
          }
          break;

        case 'dropdown':
          var startDate;
          if (activeAgjCalendarIsEnd) {
            if (dateFormatRegexPatterns['month'].test(startMonthElement.val()) && startDayElement.val().length > 0) {
              startDate = new Date();
              startDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, startDayElement.val());
            }
          }

          if (!activeAgjCalendarIsEnd) {
            maximumDate.setFullYear(maximumDate.getFullYear(), maximumDate.getMonth(), maximumDate.getDate() - agjCalendars[activeAgjCalendar]['minimumRange']);
          } else if (typeof startDate != 'undefined') {
            maximumDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[activeAgjCalendar]['maximumRange']);
          }

          if (activeAgjCalendarIsEnd && maximumDate > agjCalendars[activeAgjCalendar]['maximumDate']) {
            maximumDate = agjCalendars[activeAgjCalendar]['maximumDate'];
          }
          break;
      }
    }
    maximumDate.setHours(23, 59, 59, 999);

    dropdownElement.html('');

    var drawDate = minimumDate;
    while (drawDate < maximumDate) {
      dropdownElement.append('<option value="' + drawDate.getFullYear() + '-' + (drawDate.getMonth() + 1 < 10 ? '0' + (drawDate.getMonth() + 1) : drawDate.getMonth() + 1) + '">' + getMonthName(drawDate.getMonth() + 1, false) + ' ' + drawDate.getFullYear() + '</option>');
      drawDate.setFullYear(drawDate.getFullYear(), drawDate.getMonth() + 1, 1);
    }
  };

  $.agjCalendar.updateCalendars = function(drawDate) {
    var activeDate;
    var otherActiveDate;

    if (drawDate.getDate() != 1) {
      drawDate.setFullYear(drawDate.getFullYear(), drawDate.getMonth(), 1);
    }

    switch (agjCalendars[activeAgjCalendar]['inputType']) {
      case 'text':
        var dateElement = $(agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'dateSelector' : 'endDateSelector']);
        var otherDateElement;

        if (agjCalendars[activeAgjCalendar]['allowRange']) {
          if (activeAgjCalendarIsEnd) {
            otherDateElement = $(agjCalendars[activeAgjCalendar]['dateSelector']);
          } else {
            otherDateElement = $(agjCalendars[activeAgjCalendar]['endDateSelector']);
          }
        }
        break;

      case 'dropdown':
        var monthElement = $(agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'monthSelector' : 'endMonthSelector']);
        var dayElement = $(agjCalendars[activeAgjCalendar][!activeAgjCalendarIsEnd ? 'daySelector' : 'endDaySelector']);

        var startMonthElement;
        var startDayElement;
        if (agjCalendars[activeAgjCalendar]['allowRange'] && activeAgjCalendarIsEnd) {
          startMonthElement = $(agjCalendars[activeAgjCalendar]['monthSelector']);
          startDayElement = $(agjCalendars[activeAgjCalendar]['daySelector']);
        }
        break;
    }

    switch (agjCalendars[activeAgjCalendar]['inputType']) {
      case 'text':
        if (dateElement.length == 1) {
          switch (agjCalendars[activeAgjCalendar]['dateFormat']) {
            case 1:
              if (parseInt(dateElement.val().substring(3, 5), 10) <= getDaysInMonth(parseInt(dateElement.val().substring(6, 10)), parseInt(dateElement.val().substring(0, 2), 10)) && dateFormatRegexPatterns[1].test(dateElement.val())) {
                activeDate = new Date();
                activeDate.setFullYear(dateElement.val().substring(6, 10), parseInt(dateElement.val().substring(0, 2), 10) - 1, parseInt(dateElement.val().substring(3, 5), 10));
                activeDate.setHours(0, 0, 0, 0);

                if (agjCalendars[activeAgjCalendar]['allowRange']) {
                  if (parseInt(otherDateElement.val().substring(3, 5), 10) <= getDaysInMonth(parseInt(otherDateElement.val().substring(6, 10)), parseInt(otherDateElement.val().substring(0, 2), 10)) && dateFormatRegexPatterns[1].test(otherDateElement.val())) {
                    otherActiveDate = new Date();
                    otherActiveDate.setFullYear(otherDateElement.val().substring(6, 10), parseInt(otherDateElement.val().substring(0, 2), 10) - 1, parseInt(otherDateElement.val().substring(3, 5), 10));
                    otherActiveDate.setHours(0, 0, 0, 0);
                  }
                }
              }
              break;

            case 2:
              if (dateFormatRegexPatterns[2].test(dateElement.val())) {
                var activeYear = dateElement.val().substring(dateElement.val().length - 4, dateElement.val().length);
                var activeMonth = getMonthNumber(dateElement.val().substring(0, 3));
                var activeDay = dateElement.val().substring(dateElement.val().indexOf(' ') + 1, dateElement.val().indexOf(','));

                activeDate = new Date();
                activeDate.setFullYear(activeYear, activeMonth - 1, activeDay);
                activeDate.setHours(0, 0, 0, 0);

                if (agjCalendars[activeAgjCalendar]['allowRange']) {
                  if (dateFormatRegexPatterns[2].test(otherDateElement.val())) {
                    var otherActiveYear = otherDateElement.val().substring(otherDateElement.val().length - 4, otherDateElement.val().length);
                    var otherActiveMonth = getMonthNumber(otherDateElement.val().substring(0, 3));
                    var otherActiveDay = otherDateElement.val().substring(otherDateElement.val().indexOf(' ') + 1, otherDateElement.val().indexOf(','));

                    otherActiveDate = new Date();
                    otherActiveDate.setFullYear(otherActiveYear, otherActiveMonth - 1, otherActiveDay);
                    otherActiveDate.setHours(0, 0, 0, 0);
                  }
                }
              }
              break;

            case 3:
              if (parseInt(dateElement.val().substring(0, 2), 10) <= getDaysInMonth(parseInt(dateElement.val().substring(6, 10)), parseInt(dateElement.val().substring(3, 5), 10)) && dateFormatRegexPatterns[3].test(dateElement.val())) {
                activeDate = new Date();
                activeDate.setFullYear(dateElement.val().substring(6, 10), parseInt(dateElement.val().substring(3, 5), 10) - 1, parseInt(dateElement.val().substring(0, 2), 10));
                activeDate.setHours(0, 0, 0, 0);

                if (agjCalendars[activeAgjCalendar]['allowRange']) {
                  if (parseInt(otherDateElement.val().substring(0, 2), 10) <= getDaysInMonth(parseInt(otherDateElement.val().substring(6, 10)), parseInt(otherDateElement.val().substring(3, 5), 10)) && dateFormatRegexPatterns[3].test(otherDateElement.val())) {
                    otherActiveDate = new Date();
                    otherActiveDate.setFullYear(otherDateElement.val().substring(6, 10), parseInt(otherDateElement.val().substring(3, 5), 10) - 1, parseInt(otherDateElement.val().substring(0, 2), 10));
                    otherActiveDate.setHours(0, 0, 0, 0);
                  }
                }
              }
              break;

            case 4:
              if (parseInt(dateElement.val().substring(8, 10), 10) <= getDaysInMonth(parseInt(dateElement.val().substring(0, 4)), parseInt(dateElement.val().substring(5, 7), 10)) && dateFormatRegexPatterns[4].test(dateElement.val())) {
                activeDate = new Date();
                activeDate.setFullYear(dateElement.val().substring(0, 4), parseInt(dateElement.val().substring(5, 7), 10) - 1, parseInt(dateElement.val().substring(8, 10), 10));
                activeDate.setHours(0, 0, 0, 0);

                if (agjCalendars[activeAgjCalendar]['allowRange']) {
                  if (parseInt(otherDateElement.val().substring(8, 10), 10) <= getDaysInMonth(parseInt(otherDateElement.val().substring(0, 4)), parseInt(otherDateElement.val().substring(5, 7), 10)) && dateFormatRegexPatterns[4].test(otherDateElement.val())) {
                    otherActiveDate = new Date();
                    otherActiveDate.setFullYear(otherDateElement.val().substring(0, 4), parseInt(otherDateElement.val().substring(5, 7), 10) - 1, parseInt(otherDateElement.val().substring(8, 10), 10));
                    otherActiveDate.setHours(0, 0, 0, 0);
                  }
                }
              }
              break;
          }
        }
        break;

      case 'dropdown':
        if (monthElement.length == 1 && dayElement.length == 1) {
          if (parseInt(dayElement.val(), 10) <= getDaysInMonth(monthElement.val().substring(0, 4), parseInt(monthElement.val().substring(5, 7), 10))) {
            activeDate = new Date();
            activeDate.setFullYear(monthElement.val().substring(0, 4), parseInt(monthElement.val().substring(5, 7), 10) - 1, parseInt(dayElement.val(), 10));
            activeDate.setHours(0, 0, 0, 0);
          }
        }
        break;
    }

    var agjCalendarDropdownElement = $('#agjCalendar-dropdown');
    var calendarCount = agjCalendars[activeAgjCalendar]['calendarCount'];

    for (var calendar = 1; calendar <= calendarCount; calendar++) {
      var getDay;
      if (agjCalendars[activeAgjCalendar]['startWeekOnMonday'] === true) {
        getDay = (drawDate.getDay() + 6) % 7;
      } else {
        getDay = drawDate.getDay();
      }

      var calendarSelector = (function() {
        switch (calendar) {
          case 1:
            return '#agjCalendar-first';

          case 2:
            return '#agjCalendar-second';

          case 3:
            return '#agjCalendar-third';
        }
        return false;
      })();

      if (calendar == 1) {
        agjCalendarDropdownElement.val(drawDate.getFullYear() + '-' + (drawDate.getMonth() + 1 < 10 ? '0' + (drawDate.getMonth() + 1) : drawDate.getMonth() + 1));
      } else if (calendar == 2 || calendar == 3) {
        $(calendarSelector + '-month-name').text(getMonthName(drawDate.getMonth() + 1) + ' ' + drawDate.getFullYear());
      }

      var calendarMarkup = '';
      var currentDay = 0;
      if (getDay > 0) {
        calendarMarkup += '<div class="agjCalendar-week agjCalendar-week-one">';
        for (var day = 1; day <= getDay; day++) {
          calendarMarkup += '<div class="agjCalendar-blank agjCalendar-' + getDayName(++currentDay % 7).toLowerCase() + '"></div>';
        }
      }

      var minimumDate = new Date();
      minimumDate.setFullYear(agjCalendars[activeAgjCalendar]['minimumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['minimumDate'].getMonth(), agjCalendars[activeAgjCalendar]['minimumDate'].getDate());
      if (activeAgjCalendarIsEnd) {
        switch (agjCalendars[activeAgjCalendar]['inputType']) {
          case 'text':
            var otherDateElement = $(agjCalendars[activeAgjCalendar]['dateSelector']);

            switch (agjCalendars[activeAgjCalendar]['dateFormat']) {
              case 1:
                if (dateFormatRegexPatterns[1].test(otherDateElement.val())) {
                  minimumDate.setFullYear(otherDateElement.val().substring(6, 10), parseInt(otherDateElement.val().substring(0, 2), 10) - 1, parseInt(otherDateElement.val().substring(3, 5), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
                } else {
                  minimumDate.setFullYear(minimumDate.getFullYear(), minimumDate.getMonth(), minimumDate.getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
                }
                break;

              case 2:
                if (dateFormatRegexPatterns[2].test(otherDateElement.val())) {
                  var otherDateYear = otherDateElement.val().substring(otherDateElement.val().length - 4, otherDateElement.val().length);
                  var otherDateMonth = getMonthNumber(otherDateElement.val().substring(0, 3));
                  var otherDateDay = otherDateElement.val().substring(otherDateElement.val().indexOf(' ') + 1, otherDateElement.val().indexOf(','));

                  minimumDate.setFullYear(otherDateYear, otherDateMonth - 1, parseInt(otherDateDay, 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
                } else {
                  minimumDate.setFullYear(minimumDate.getFullYear(), minimumDate.getMonth(), minimumDate.getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
                }
                break;

              case 3:
                if (dateFormatRegexPatterns[3].test(otherDateElement.val())) {
                  minimumDate.setFullYear(otherDateElement.val().substring(6, 10), parseInt(otherDateElement.val().substring(3, 5), 10) - 1, parseInt(otherDateElement.val().substring(0, 2), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
                } else {
                  minimumDate.setFullYear(minimumDate.getFullYear(), minimumDate.getMonth(), minimumDate.getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
                }
                break;

              case 4:
                if (dateFormatRegexPatterns[4].test(otherDateElement.val())) {
                  minimumDate.setFullYear(otherDateElement.val().substring(0, 4), parseInt(otherDateElement.val().substring(5, 7), 10) - 1, parseInt(otherDateElement.val().substring(8, 10), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
                } else {
                  minimumDate.setFullYear(minimumDate.getFullYear(), minimumDate.getMonth(), minimumDate.getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
                }
                break;
            }
            break;

          case 'dropdown':
            var startMonthElement = $(agjCalendars[activeAgjCalendar]['monthSelector']);
            var startDayElement = $(agjCalendars[activeAgjCalendar]['daySelector']);

            if (startMonthElement.length == 1 && startDayElement.length == 1 && startMonthElement.val().length > 0 && startDayElement.val().length > 0) {
              minimumDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, parseInt(startDayElement.val(), 10) + agjCalendars[activeAgjCalendar]['minimumRange']);
            } else {
              minimumDate.setFullYear(minimumDate.getFullYear(), minimumDate.getMonth(), minimumDate.getDate() + agjCalendars[activeAgjCalendar]['minimumRange']);
            }
            break;
        }
      }
      minimumDate.setHours(0, 0, 0, 0);

      var maximumDate = new Date();
      maximumDate.setFullYear(agjCalendars[activeAgjCalendar]['maximumDate'].getFullYear(), agjCalendars[activeAgjCalendar]['maximumDate'].getMonth(), agjCalendars[activeAgjCalendar]['maximumDate'].getDate());
      if (agjCalendars[activeAgjCalendar]['allowRange']) {
        var startDate;
        if (activeAgjCalendarIsEnd) {
          switch (agjCalendars[activeAgjCalendar]['inputType'] == 'text') {
            case 'text':
              switch (agjCalendars[activeAgjCalendar]['dateFormat']) {
                case 1:
                  if (dateFormatRegexPatterns[1].test(otherDateElement.val())) {
                    startDate = new Date();
                    startDate.setFullYear(otherDateElement.val().substring(6, 10), parseInt(otherDateElement.val().substring(0, 2), 10) - 1, 1);
                    if (getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1) < parseInt(otherDateElement.val().substring(3, 5), 10)) {
                      startDate.setFullYear(otherDateElement.val().substring(6, 10), parseInt(otherDateElement.val().substring(0, 2), 10) - 1, getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1));
                    } else {
                      startDate.setFullYear(otherDateElement.val().substring(6, 10), parseInt(otherDateElement.val().substring(0, 2), 10) - 1, parseInt(otherDateElement.val().substring(3, 5), 10));
                    }
                  }
                  break;

                case 2:
                  if (dateFormatRegexPatterns[2].test(otherDateElement.val())) {
                    var otherDateYear = otherDateElement.val().substring(otherDateElement.val().length - 4, otherDateElement.val().length);
                    var otherDateMonth = getMonthNumber(otherDateElement.val().substring(0, 3));
                    var otherDateDay = otherDateElement.val().substring(otherDateElement.val().indexOf(' ') + 1, otherDateElement.val().indexOf(','));

                    startDate = new Date();
                    startDate.setFullYear(otherDateYear, otherDateMonth - 1, 1);
                    if (getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1) < otherDateDay) {
                      startDate.setFullYear(otherDateYear, otherDateMonth - 1, getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1));
                    } else {
                      startDate.setFullYear(otherDateYear, otherDateMonth - 1, otherDateDay);
                    }
                  }
                  break;

                case 3:
                  if (dateFormatRegexPatterns[3].test(otherDateElement.val())) {
                    startDate = new Date();
                    startDate.setFullYear(otherDateElement.val().substring(6, 10), parseInt(otherDateElement.val().substring(3, 5), 10) - 1, 1);
                    if (getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1) < parseInt(otherDateElement.val().substring(0, 2), 10)) {
                      startDate.setFullYear(otherDateElement.val().substring(6, 10), parseInt(otherDateElement.val().substring(3, 5), 10) - 1, getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1));
                    } else {
                      startDate.setFullYear(otherDateElement.val().substring(6, 10), parseInt(otherDateElement.val().substring(3, 5), 10) - 1, parseInt(otherDateElement.val().substring(0, 2), 10));
                    }
                  }
                  break;

                case 4:
                  if (dateFormatRegexPatterns[4].test(otherDateElement.val())) {
                    startDate = new Date();
                    startDate.setFullYear(otherDateElement.val().substring(0, 4), parseInt(otherDateElement.val().substring(5, 7), 10) - 1, 1);
                    if (getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1) < parseInt(otherDateElement.val().substring(8, 10), 10)) {
                      startDate.setFullYear(otherDateElement.val().substring(0, 4), parseInt(otherDateElement.val().substring(5, 7), 10) - 1, getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1));
                    } else {
                      startDate.setFullYear(otherDateElement.val().substring(0, 4), parseInt(otherDateElement.val().substring(5, 7), 10) - 1, parseInt(otherDateElement.val().substring(8, 10), 10));
                    }
                  }
                  break;
              }
              break;

            case 'dropdown':
              if (dateFormatRegexPatterns['month'].test(startMonthElement.val()) && startDayElement.val().length > 0) {
                startDate = new Date();
                startDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, 1);
                if (getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1) < parseInt(dayElement.val(), 10)) {
                  startDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1));
                } else {
                  startDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, parseInt(startDayElement.val(), 10));
                }
              }
              break;
          }
        }

        if (!activeAgjCalendarIsEnd) {
          maximumDate.setFullYear(maximumDate.getFullYear(), maximumDate.getMonth(), maximumDate.getDate() - agjCalendars[activeAgjCalendar]['minimumRange']);
        } else if (typeof startDate != 'undefined') {
          maximumDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[activeAgjCalendar]['maximumRange']);
        }

        if (activeAgjCalendarIsEnd && maximumDate > agjCalendars[activeAgjCalendar]['maximumDate']) {
          maximumDate = agjCalendars[activeAgjCalendar]['maximumDate'];
        }
      }
      maximumDate.setHours(23, 59, 59, 999);

      for (day = 1; day <= 42 - getDay; day++) {
        if (currentDay % 7 == 0) {
          if (calendarMarkup.length > 0) {
            calendarMarkup += '</div>';
          }
          calendarMarkup += '<div class="agjCalendar-week agjCalendar-week-' + numberToText(Math.round(currentDay / 7) + 1).toLowerCase() + '">';
        }

        if (day <= getDaysInMonth(drawDate.getFullYear(), drawDate.getMonth() + 1)) {
          var currentDate = new Date();
          currentDate.setFullYear(drawDate.getFullYear(), drawDate.getMonth(), day);

          var classMarkup = '';
          if (currentDate >= minimumDate && currentDate <= maximumDate) {
            classMarkup += ' agjCalendar-selectable';
          }
          if (currentDate.getFullYear() == new Date().getFullYear() && currentDate.getMonth() == new Date().getMonth() && currentDate.getDate() == new Date().getDate()) {
            classMarkup += ' agjCalendar-today';
          }
          if (activeDate) {
            if (currentDate.getFullYear() == activeDate.getFullYear() && currentDate.getMonth() == activeDate.getMonth() && currentDate.getDate() == activeDate.getDate()) {
              classMarkup += ' agjCalendar-active';
            }
          }
          if (otherActiveDate) {
            if (currentDate.getFullYear() == otherActiveDate.getFullYear() && currentDate.getMonth() == otherActiveDate.getMonth() && currentDate.getDate() == otherActiveDate.getDate()) {
              classMarkup += ' agjCalendar-other-active';
            }
          }
          if (activeDate && otherActiveDate && activeDate != otherActiveDate) {
            if ((activeDate < otherActiveDate && currentDate >= activeDate && currentDate <= otherActiveDate) || (activeDate > otherActiveDate && currentDate <= activeDate && currentDate >= otherActiveDate)) {
              classMarkup += ' agjCalendar-in-range';
            }
          }

          calendarMarkup += '<div class="agjCalendar-' + getDayName((currentDay++ % 7) + 1).toLowerCase() + classMarkup + '">';
          if (currentDate >= minimumDate && currentDate <= maximumDate) {
            calendarMarkup += '<a href="#" title="' + getMonthName(drawDate.getMonth() + 1) + ' ' + day + ', ' + drawDate.getFullYear() + '" id="agjCalendar-' + drawDate.getFullYear() + '-' + (drawDate.getMonth() + 1 < 10 ? '0' + (drawDate.getMonth() + 1) : drawDate.getMonth() + 1) + '-' + (day < 10 ? '0' + '' + day : day) + '">';
          }
          calendarMarkup += day;
          if (currentDate >= agjCalendars[activeAgjCalendar]['minimumDate'] && currentDate <= maximumDate) {
            calendarMarkup += '</a>';
          }
          calendarMarkup += '</div>';
        } else {
          calendarMarkup += '<div class="agjCalendar-blank agjCalendar-' + getDayName((currentDay++ % 7) + 1).toLowerCase() + '"></div>';
        }
      }
      calendarMarkup += '</div>';

      $(calendarSelector + ' div.agjCalendar-week').remove();
      $(calendarSelector).append(calendarMarkup);

      if ($(calendarSelector + ' div.agjCalendar-week-five div.agjCalendar-blank').length == 7) {
        $(calendarSelector).addClass('agjCalendar-four-weeks').removeClass('agjCalendar-five-weeks').removeClass('agjCalendar-six-weeks');
      } else if ($(calendarSelector + ' div.agjCalendar-week-six div.agjCalendar-blank').length == 7) {
        $(calendarSelector).removeClass('agjCalendar-four-weeks').addClass('agjCalendar-five-weeks').removeClass('agjCalendar-six-weeks');
      } else {
        $(calendarSelector).removeClass('agjCalendar-four-weeks').removeClass('agjCalendar-five-weeks').addClass('agjCalendar-six-weeks');
      }

      drawDate.setFullYear(drawDate.getFullYear(), drawDate.getMonth() + 1, 1);
    }

    $('#agjCalendar div.agjCalendar-week a').on('click', function() {
      var newDate = new Date();
      newDate.setFullYear(this.id.substring(12, 16), parseInt(this.id.substring(17, 19), 10) - 1, this.id.substring(20, 22));
      $.agjCalendar.setNewDate(newDate, activeAgjCalendarIsEnd);
      if (activeAgjCalendar >= 0 && !activeAgjCalendarIsEnd && agjCalendars[activeAgjCalendar]['allowRange']) {
        $.agjCalendar.checkEndDate(activeAgjCalendar);
      }
      $.agjCalendar.hide();
      return false;
    });

    var dropdownDate = new Date();

    dropdownDate.setFullYear(agjCalendarDropdownElement.val().substring(0, 4), parseInt(agjCalendarDropdownElement.val().substring(5, 7), 10) - 2, 1);
    if (agjCalendarDropdownElement.find('option[value=' + dropdownDate.getFullYear() + '-' + (dropdownDate.getMonth() + 1 < 10 ? '0' + (dropdownDate.getMonth() + 1) : dropdownDate.getMonth() + 1) + ']').length == 0) {
      $('#agjCalendar a.agjCalendar-previous-month').fadeTo(1, 0.33);
    } else {
      $('#agjCalendar a.agjCalendar-previous-month').fadeTo(1, 1);
    }

    dropdownDate.setFullYear(agjCalendarDropdownElement.val().substring(0, 4), parseInt(agjCalendarDropdownElement.val().substring(5, 7), 10), 1);
    if (agjCalendarDropdownElement.find('option[value=' + dropdownDate.getFullYear() + '-' + (dropdownDate.getMonth() + 1 < 10 ? '0' + (dropdownDate.getMonth() + 1) : dropdownDate.getMonth() + 1) + ']').length == 0) {
      $('#agjCalendar a.agjCalendar-next-month').fadeTo(1, 0.33);
    } else {
      $('#agjCalendar a.agjCalendar-next-month').fadeTo(1, 1);
    }
  };

  $.agjCalendar.setNewDate = function(newDate, updateEndAgjCalendar) {
    if (updateEndAgjCalendar === undefined) {
      updateEndAgjCalendar = false;
    }

    switch (agjCalendars[activeAgjCalendar]['inputType']) {
      case 'text':
        var dateElement = $(agjCalendars[activeAgjCalendar][!updateEndAgjCalendar ? 'dateSelector' : 'endDateSelector']);
        if (newDate == 'blank') {
          switch (agjCalendars[activeAgjCalendar]['dateFormat']) {
            case 1:
              dateElement.val('mm/dd/yyyy').trigger('change');
              break;

            case 2:
              dateElement.val('Select a Date').trigger('change');
              break;

            case 3:
              dateElement.val('dd/mm/yyyy').trigger('change');
              break;

            case 4:
              dateElement.val('yyyy-mm-dd').trigger('change');
              break;
          }
        } else {
          switch (agjCalendars[activeAgjCalendar]['dateFormat']) {
            case 1:
              dateElement.val((newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '/' + (newDate.getDate() < 10 ? '0' + '' + newDate.getDate() : newDate.getDate()) + '/' + newDate.getFullYear()).trigger('change');
              break;

            case 2:
              dateElement.val(getMonthName(newDate.getMonth() + 1, false) + ' ' + newDate.getDate() + ', ' + newDate.getFullYear()).trigger('change');
              break;

            case 3:
              dateElement.val((newDate.getDate() < 10 ? '0' + '' + newDate.getDate() : newDate.getDate()) + '/' + (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1)+ '/' + newDate.getFullYear()).trigger('change');
              break;

            case 4:
              dateElement.val(newDate.getFullYear() + '-' + (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-' + (newDate.getDate() < 10 ? '0' + '' + newDate.getDate() : newDate.getDate())).trigger('change');
              break;
          }
        }
        break;

      case 'dropdown':
        var monthElement = $(agjCalendars[activeAgjCalendar][!updateEndAgjCalendar ? 'monthSelector' : 'endMonthSelector']);
        var monthValue;
        if (newDate == 'blank') {
          monthValue = '';
        } else {
          monthValue = newDate.getFullYear() + '-' + (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1);
        }

        var dayElement = $(agjCalendars[activeAgjCalendar][!updateEndAgjCalendar ? 'daySelector' : 'endDaySelector']);
        var dayValue;
        if (newDate == 'blank') {
          dayValue = '';
        } else {
          dayValue = newDate.getDate() < 10 ? '0' + '' + newDate.getDate() : newDate.getDate();
        }

        if (monthValue.length > 0 && monthElement.find('option[value=' + monthValue + ']').length > 0 && (newDate == 'blank' || parseInt(dayValue, 10) <= getDaysInMonth(newDate.getFullYear(), newDate.getMonth() + 1))) {
          monthElement.val(monthValue).trigger('change');
          $.agjCalendar.updateDaySelectors(activeAgjCalendar, updateEndAgjCalendar);
          dayElement.val(dayValue).trigger('change');
        }
        break;
    }
  };

  $.agjCalendar.checkEndDate = function(agjCalendar) {
    switch (agjCalendars[agjCalendar]['inputType']) {
      case 'text':
        var startDateElement = $(agjCalendars[agjCalendar]['dateSelector']);
        var endDateElement = $(agjCalendars[agjCalendar]['endDateSelector']);

        if (startDateElement.length == 1 && endDateElement.length == 1) {
          switch (agjCalendars[agjCalendar]['dateFormat']) {
            case 1:
              if (dateFormatRegexPatterns[1].test(startDateElement.val())) {
                if (dateFormatRegexPatterns[1].test(endDateElement.val())) {
                  var startDate = new Date();
                  startDate.setFullYear(startDateElement.val().substring(6, 10), parseInt(startDateElement.val().substring(0, 2), 10) - 1, parseInt(startDateElement.val().substring(3, 5), 10));
                  startDate.setHours(0, 0, 0, 0);

                  var endDate = new Date();
                  endDate.setFullYear(endDateElement.val().substring(6, 10), parseInt(endDateElement.val().substring(0, 2), 10) - 1, parseInt(endDateElement.val().substring(3, 5), 10));
                  endDate.setHours(0, 0, 0, 0);

                  var minimumDate = new Date();
                  minimumDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['minimumRange']);
                  minimumDate.setHours(0, 0, 0, 0);

                  var maximumDate = new Date();
                  maximumDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['maximumRange']);
                  maximumDate.setHours(0, 0, 0, 0);

                  if (endDate < minimumDate || endDate > maximumDate) {
                    if (endDate > maximumDate) {
                      endDate.setFullYear(maximumDate.getFullYear(), maximumDate.getMonth(), maximumDate.getDate());
                    } else {
                      endDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['defaultRange']);
                    }

                    var formerActiveAgjCalendar = activeAgjCalendar;
                    activeAgjCalendar = agjCalendar;
                    $.agjCalendar.setNewDate(endDate, true);
                    activeAgjCalendar = formerActiveAgjCalendar;
                  }
                } else if (agjCalendars[agjCalendar]['autoSetEndDate']) {
                  var newDate;
                  newDate = new Date();
                  newDate.setFullYear(startDateElement.val().substring(6, 10), parseInt(startDateElement.val().substring(0, 2), 10) - 1, parseInt(startDateElement.val().substring(3, 5), 10) + agjCalendars[agjCalendar]['defaultRange']);

                  var formerActiveAgjCalendar = activeAgjCalendar;
                  activeAgjCalendar = agjCalendar;
                  $.agjCalendar.setNewDate(newDate, true);
                  activeAgjCalendar = formerActiveAgjCalendar;
                }
              }
              break;

            case 2:
              if (dateFormatRegexPatterns[2].test(startDateElement.val())) {
                if (dateFormatRegexPatterns[2].test(endDateElement.val())) {
                  var startYear = startDateElement.val().substring(startDateElement.val().length - 4, startDateElement.val().length);
                  var startMonth = getMonthNumber(startDateElement.val().substring(0, 3));
                  var startDay = startDateElement.val().substring(startDateElement.val().indexOf(' ') + 1, startDateElement.val().indexOf(','));

                  var startDate = new Date();
                  startDate.setFullYear(startYear, startMonth - 1, startDay);

                  var endYear = endDateElement.val().substring(endDateElement.val().length - 4, endDateElement.val().length);
                  var endMonth = getMonthNumber(endDateElement.val().substring(0, 3));
                  var endDay = endDateElement.val().substring(endDateElement.val().indexOf(' ') + 1, endDateElement.val().indexOf(','));

                  var endDate = new Date();
                  endDate.setFullYear(endYear, endMonth - 1, endDay);
                  endDate.setHours(0, 0, 0, 0);

                  var compareDate = new Date();
                  compareDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['minimumRange']);
                  compareDate.setHours(0, 0, 0, 0);

                  if (compareDate > endDate) {
                    compareDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['defaultRange']);

                    var formerActiveAgjCalendar = activeAgjCalendar;
                    activeAgjCalendar = agjCalendar;
                    $.agjCalendar.setNewDate(compareDate, true);
                    activeAgjCalendar = formerActiveAgjCalendar;
                  }
                } else if (agjCalendars[agjCalendar]['autoSetEndDate']) {
                  var startYear = startDateElement.val().substring(startDateElement.val().length - 4, startDateElement.val().length);
                  var startMonth = getMonthNumber(startDateElement.val().substring(0, 3));
                  var startDay = startDateElement.val().substring(startDateElement.val().indexOf(' ') + 1, startDateElement.val().indexOf(','));

                  var newDate = new Date();
                  newDate.setFullYear(startYear, startMonth - 1, parseInt(startDay, 10) + agjCalendars[agjCalendar]['defaultRange']);

                  var formerActiveAgjCalendar = activeAgjCalendar;
                  activeAgjCalendar = agjCalendar;
                  $.agjCalendar.setNewDate(newDate, true);
                  activeAgjCalendar = formerActiveAgjCalendar;
                }
              }
              break;

            case 3:
              if (dateFormatRegexPatterns[3].test(startDateElement.val())) {
                if (dateFormatRegexPatterns[3].test(endDateElement.val())) {
                  var startDate = new Date();
                  startDate.setFullYear(startDateElement.val().substring(6, 10), parseInt(startDateElement.val().substring(3, 5), 10) - 1, parseInt(startDateElement.val().substring(0, 2), 10));

                  var endDate = new Date();
                  endDate.setFullYear(endDateElement.val().substring(6, 10), parseInt(endDateElement.val().substring(3, 5), 10) - 1, parseInt(endDateElement.val().substring(0, 2), 10));
                  endDate.setHours(0, 0, 0, 0);

                  var compareDate = new Date();
                  compareDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['minimumRange']);
                  compareDate.setHours(0, 0, 0, 0);

                  if (compareDate > endDate) {
                    compareDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['defaultRange']);

                    var formerActiveAgjCalendar = activeAgjCalendar;
                    activeAgjCalendar = agjCalendar;
                    $.agjCalendar.setNewDate(compareDate, true);
                    activeAgjCalendar = formerActiveAgjCalendar;
                  }
                } else if (agjCalendars[agjCalendar]['autoSetEndDate']) {
                  var newDate;
                  newDate = new Date();
                  newDate.setFullYear(startDateElement.val().substring(6, 10), parseInt(startDateElement.val().substring(3, 5), 10) - 1, parseInt(startDateElement.val().substring(0, 2), 10) + agjCalendars[agjCalendar]['defaultRange']);

                  var formerActiveAgjCalendar = activeAgjCalendar;
                  activeAgjCalendar = agjCalendar;
                  $.agjCalendar.setNewDate(newDate, true);
                  activeAgjCalendar = formerActiveAgjCalendar;
                }
              }
              break;

            case 4:
              if (dateFormatRegexPatterns[4].test(startDateElement.val())) {
                if (dateFormatRegexPatterns[4].test(endDateElement.val())) {
                  var startDate = new Date();
                  startDate.setFullYear(startDateElement.val().substring(0, 4), parseInt(startDateElement.val().substring(5, 7), 10) - 1, parseInt(startDateElement.val().substring(8, 10), 10));

                  var endDate = new Date();
                  endDate.setFullYear(endDateElement.val().substring(0, 4), parseInt(endDateElement.val().substring(5, 7), 10) - 1, parseInt(endDateElement.val().substring(8, 10), 10));
                  endDate.setHours(0, 0, 0, 0);

                  var compareDate = new Date();
                  compareDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['minimumRange']);
                  compareDate.setHours(0, 0, 0, 0);

                  if (compareDate > endDate) {
                    compareDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['defaultRange']);

                    var formerActiveAgjCalendar = activeAgjCalendar;
                    activeAgjCalendar = agjCalendar;
                    $.agjCalendar.setNewDate(compareDate, true);
                    activeAgjCalendar = formerActiveAgjCalendar;
                  }
                } else if (agjCalendars[agjCalendar]['autoSetEndDate']) {
                  var newDate;
                  newDate = new Date();
                  newDate.setFullYear(startDateElement.val().substring(0, 4), parseInt(startDateElement.val().substring(5, 7), 10) - 1, parseInt(startDateElement.val().substring(8, 10), 10) + agjCalendars[agjCalendar]['defaultRange']);

                  var formerActiveAgjCalendar = activeAgjCalendar;
                  activeAgjCalendar = agjCalendar;
                  $.agjCalendar.setNewDate(newDate, true);
                  activeAgjCalendar = formerActiveAgjCalendar;
                }
              }
              break;
          }
        }
        break;

      case 'dropdown':
        var startMonthElement = $(agjCalendars[agjCalendar]['monthSelector']);
        var startDayElement = $(agjCalendars[agjCalendar]['daySelector']);
        var endMonthElement = $(agjCalendars[agjCalendar]['endMonthSelector']);
        var endDayElement = $(agjCalendars[agjCalendar]['endDaySelector']);

        if (startMonthElement.length == 1 && startDayElement.length == 1 && endMonthElement.length == 1 && endDayElement.length == 1) {
          if (dateFormatRegexPatterns['month'].test(startMonthElement.val()) && startDayElement.val().length > 0) {
            var startDate = new Date();
            startDate.setFullYear(startMonthElement.val().substring(0, 4), parseInt(startMonthElement.val().substring(5, 7), 10) - 1, parseInt(startDayElement.val(), 10));

            var endDate = new Date();
            endDate.setFullYear(endMonthElement.val().substring(0, 4), parseInt(endMonthElement.val().substring(5, 7), 10) - 1, parseInt(endDayElement.val(), 10));
            endDate.setHours(0, 0, 0, 0);

            var compareDate = new Date();
            compareDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['minimumRange']);
            compareDate.setHours(0, 0, 0, 0);

            if (compareDate > endDate) {
              compareDate.setFullYear(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + agjCalendars[agjCalendar]['defaultRange']);

              var formerActiveAgjCalendar = activeAgjCalendar;
              activeAgjCalendar = agjCalendar;
              $.agjCalendar.setNewDate(compareDate, true);
              activeAgjCalendar = formerActiveAgjCalendar;
            }
          }
        }
        break;
    }
  };

  $.agjCalendar.addToDom = function() {
    var daysOfWeekMarkup = getDaysOfWeekMarkup();
    var pluginMarkup = '';
    pluginMarkup += '' +
      '<div id="agjCalendar-modal-background"></div>' +
        '<div id="agjCalendar">' +
          '<div id="agjCalendar-header">' +
            '<div id="agjCalendar-header-inner">' +
              '<a href="#" title="Hide Calendar" id="agjCalendar-hide">' +
                'Hide Calendar' +
              '</a>' +
              '<span>' +
                'Powered by' +
              '</span>' +
              ' ' +
              '<a href="https://agjcalendar.agjjquery.org/" target="_blank" title="agjCalendar" id="agjCalendar-powered-by">' +
                'agjCalendar' +
              '</a>' +
            '</div>' +
          '</div>' +
          '<div id="agjCalendar-body"';
    if (agjCalendars[activeAgjCalendar]['startWeekOnMonday'] === true) {
      pluginMarkup += ' class="agjCalendar-start-week-on-monday"';
    }
    pluginMarkup += '>' +
            '<div id="agjCalendar-first">' +
              '<div class="agjCalendar-month">' +
                '<div class="agjCalendar-month-inner-1">' +
                  '<div class="agjCalendar-month-inner-2">' +
                    '<select id="agjCalendar-dropdown"></select>' +
                    '<a href="#" title="Next Month" class="agjCalendar-next-month">' +
                      '<span class="agjCalendar-next-month-inner">' +
                        'Next Month' +
                      '</span>' +
                    '</a>' +
                    '<a href="#" title="Previous Month" class="agjCalendar-previous-month">' +
                      '<span class="agjCalendar-previous-month-inner">' +
                        'Previous Month' +
                      '</span>' +
                    '</a>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="agjCalendar-days">' +
                daysOfWeekMarkup +
              '</div>' +
            '</div>' +
            '<div id="agjCalendar-second">' +
              '<div class="agjCalendar-month">' +
                '<div class="agjCalendar-month-inner" colspan="5">' +
                  '<strong id="agjCalendar-second-month-name"></strong>' +
                  '<a href="#" title="Next Month" class="agjCalendar-next-month">' +
                    '<span class="agjCalendar-next-month-inner">' +
                      'Next Month' +
                    '</span>' +
                  '</a>' +
                  '<a href="#" title="Previous Month" class="agjCalendar-previous-month">' +
                    '<span class="agjCalendar-previous-month-inner">' +
                      'Previous Month' +
                    '</span>' +
                  '</a>' +
                '</div>' +
              '</div>' +
              '<div class="agjCalendar-days">' +
                daysOfWeekMarkup +
              '</div>' +
            '</div>' +
            '<div id="agjCalendar-third">' +
              '<div class="agjCalendar-month">' +
                '<div class="agjCalendar-month-inner" colspan="5">' +
                  '<strong id="agjCalendar-third-month-name"></strong>' +
                  '<a href="#" title="Next Month" class="agjCalendar-next-month">' +
                    '<span class="agjCalendar-next-month-inner">' +
                      'Next Month' +
                    '</span>' +
                  '</a>' +
                  '<a href="#" title="Previous Month" class="agjCalendar-previous-month">' +
                    '<span class="agjCalendar-previous-month-inner">' +
                      'Previous Month' +
                    '</span>' +
                  '</a>' +
                '</div>' +
              '</div>' +
              '<div class="agjCalendar-days">' +
                daysOfWeekMarkup +
              '</div>' +
            '</div>' +
        '</div>' +
      '</div>';
    $('body').prepend(pluginMarkup);

    $('#agjCalendar-hide').on('click', function() {
      $.agjCalendar.hide();
      return false;
    });

    $('#agjCalendar-dropdown').on('change', function() {
      if (dateFormatRegexPatterns['month'].test($(this).val())) {
        var date = new Date();
        date.setFullYear($(this).val().substring(0, 4), parseInt($(this).val().substring(5, 7), 10) - 1, 1);
        $.agjCalendar.updateCalendars(date);
      }
    });

    $('#agjCalendar a.agjCalendar-previous-month, #agjCalendar a.agjCalendar-next-month').on('click', function() {
      if (dateFormatRegexPatterns['month'].test($('#agjCalendar-dropdown').val())) {
        var date = new Date();
        date.setFullYear($('#agjCalendar-dropdown').val().substring(0, 4), parseInt($('#agjCalendar-dropdown').val().substring(5, 7), 10) - 1, 1);

        if ($(this).hasClass('agjCalendar-previous-month')) {
          date.setFullYear(date.getFullYear(), date.getMonth() - 1, date.getDate());
        } else if ($(this).hasClass('agjCalendar-next-month')) {
          date.setFullYear(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }

        var newDropdownValue = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        if ($('#agjCalendar-dropdown option[value=' + newDropdownValue + ']').length > 0) {
          $('#agjCalendar-dropdown').val(newDropdownValue).trigger('change');
        }
      }
      return false;
    });
  };

  $.ctcCalendar = function(options) {
    $.agjCalendar(options);
  };
})(jQuery);
