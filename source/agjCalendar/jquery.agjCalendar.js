/**
 * Javascript source code of agjCalendar v1.0.3.
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
 * @file The Javascript source code for the agjCalendar jQuery plugin.
 * @copyright 2013-2023 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @license MIT
 * @see {@link https://github.com/andrewgjohnson/agjCalendar GitHub Repository}
 * @see {@link https://agjCalendar.agjjQuery.org/ Online Documentation}
 * @author Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @version 1.0.3
 */

/* global jQuery */

(function($) {
  var agjCalendars = [];
  var lastClickWasOnAgjCalendar = false;
  var lastBodyMarginRight = '';
  var lastBodyOverflow = '';
  var lastScrollLeft = 0;
  var lastScrollTop = 0;
  var regexPatterns = {
    // dateFormat 1 = MM/DD/YYYY, e.g. 01/02/2003
    '1': new RegExp(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/),

    // dateFormat 2 = MMM D, YYYY, e.g. Jan 2, 2003
    '2': new RegExp(/^([A-Za-zÀ-ÖØ-öø-ÿ]+) ([0-9]{1,2}), ([0-9]{4})$/),

    // dateFormat 3 = DD/MM/YYYY, e.g. 02/01/2003
    '3': new RegExp(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/),

    // dateFormat 4 = YYYY-MM-DD, e.g. 2003-01-02
    '4': new RegExp(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/),

    // dateFormat 5 = D MMMM YYYY, e.g. 2 January 2003
    '5': new RegExp(/^([0-9]{1,2}) ([A-Za-zÀ-ÖØ-öø-ÿ]+) ([0-9]{4})$/),

    // YYYY-MM, e.g. 2003-01
    'month': new RegExp(/([0-9]{4})-([0-9]{2})$/)
  };
  var translations = {
    // English
    en: {
      daysOfWeek: {
        full: {
          0: 'Sunday',
          1: 'Monday',
          2: 'Tuesday',
          3: 'Wednesday',
          4: 'Thursday',
          5: 'Friday',
          6: 'Saturday'
        },
        medium: {
          0: 'Sun',
          1: 'Mon',
          2: 'Tue',
          3: 'Wed',
          4: 'Thu',
          5: 'Fri',
          6: 'Sat'
        },
        short: {
          0: 'S',
          1: 'M',
          2: 'T',
          3: 'W',
          4: 'T',
          5: 'F',
          6: 'S'
        }
      },
      months: {
        full: {
          0:  'January',
          1:  'February',
          2:  'March',
          3:  'April',
          4:  'May',
          5:  'June',
          6:  'July',
          7:  'August',
          8:  'September',
          9:  'October',
          10: 'November',
          11: 'December'
        },
        abbreviated: {
          0:  'Jan',
          1:  'Feb',
          2:  'Mar',
          3:  'Apr',
          4:  'May',
          5:  'Jun',
          6:  'Jul',
          7:  'Aug',
          8:  'Sep',
          9:  'Oct',
          10: 'Nov',
          11: 'Dec'
        }
      },
      hideCalendar:  'Hide Calendar',
      nextMonth:     'Next Month',
      previousMonth: 'Previous Month',
      poweredBy:     'Powered by',
      selectADate:   'Select a Date'
    },

    // Français (French)
    fr: {
      daysOfWeek: {
        full: {
          0: 'dimanche',
          1: 'lundi',
          2: 'mardi',
          3: 'mercredi',
          4: 'jeudi',
          5: 'vendredi',
          6: 'samedi'
        },
        medium: {
          0: 'dim',
          1: 'lun',
          2: 'mar',
          3: 'mer',
          4: 'jeu',
          5: 'ven',
          6: 'sam'
        },
        short: {
          0: 'd',
          1: 'l',
          2: 'm',
          3: 'm',
          4: 'j',
          5: 'v',
          6: 's'
        }
      },
      months: {
        full: {
          0:  'janvier',
          1:  'février',
          2:  'mars',
          3:  'avril',
          4:  'mai',
          5:  'juin',
          6:  'juillet',
          7:  'août',
          8:  'septembre',
          9:  'octobre',
          10: 'novembre',
          11: 'décembre'
        },
        abbreviated: {
          0:  'janv',
          1:  'févr',
          2:  'mars',
          3:  'avr',
          4:  'mai',
          5:  'juin',
          6:  'juil',
          7:  'août',
          8:  'sept',
          9:  'octo',
          10: 'nov',
          11: 'déc'
        }
      },
      hideCalendar:  'Masquer le calendrier',
      nextMonth:     'Le mois prochain',
      previousMonth: 'Le mois précédent',
      poweredBy:     'Propulsé par',
      selectADate:   'Sélectionnez une date'
    }
  };

  /**
   * The activateCalendar() function will activate an integration.
   * @param {object} agjCalendar - The integration to activate.
   * @param {boolean} activateEnd - Whether or not to activate on the end input.
   * @returns {void}
   */
  var activateCalendar = function(agjCalendar, activateEnd) {
    if (activateEnd !== true) {
      activateEnd = false;
    }

    // if there is an active date picker but it isn’t this one
    if (
      $.agjCalendar.isActive() &&
      !checkIfActive(agjCalendar['position'], activateEnd)
    ) {
      hideModalBackground();
    }

    switch (agjCalendar['inputType']) {
      case 'text':
        $(agjCalendar[activateEnd ? 'endDateSelector' : 'dateSelector'])
          .addClass('agjCalendar-active-input');
        break;

      case 'dropdown':
        $(agjCalendar[activateEnd ? 'endMonthSelector' : 'monthSelector'])
          .addClass('agjCalendar-active-input');
        $(agjCalendar[activateEnd ? 'endDaySelector' : 'daySelector'])
          .addClass('agjCalendar-active-input');
        break;
    }

    var calendarElement = $('#agjCalendar');
    if (calendarElement.length === 0) {
      calendarElement = createDomElements();
    }
    calendarElement.attr({
      'data-active':        agjCalendar['position'],
      'data-active-is-end': activateEnd
    });

    calendarElement.find('#agjCalendar-hide').attr(
      'title',
      translations[agjCalendar['language']]['hideCalendar']
    ).text(translations[agjCalendar['language']]['hideCalendar']);

    calendarElement.find('#agjCalendar-header-inner span').text(
      translations[agjCalendar['language']]['poweredBy']
    );

    calendarElement.find('a.agjCalendar-previous-month').attr(
      'title',
      translations[agjCalendar['language']]['previousMonth']
    ).find('span.agjCalendar-previous-month-inner').text(
      translations[agjCalendar['language']]['previousMonth']
    );

    calendarElement.find('a.agjCalendar-next-month').attr(
      'title',
      translations[agjCalendar['language']]['nextMonth']
    ).find('span.agjCalendar-next-month-inner').text(
      translations[agjCalendar['language']]['nextMonth']
    );

    switch (agjCalendar['calendarCount']) {
      case 2:
        calendarElement
          .removeClass('agjCalendar-single agjCalendar-triple')
          .addClass('agjCalendar-double');
        break;

      case 3:
        calendarElement
          .removeClass('agjCalendar-single agjCalendar-double')
          .addClass('agjCalendar-triple');
        break;

      default:
        calendarElement
          .removeClass('agjCalendar-double agjCalendar-triple')
          .addClass('agjCalendar-single');
        break;
    }

    if (agjCalendar['startWeekOnMonday']) {
      calendarElement.addClass('agjCalendar-start-week-on-monday');
    } else {
      calendarElement.removeClass('agjCalendar-start-week-on-monday');
    }

    var days;
    if (agjCalendar['startWeekOnMonday']) {
      days = [1, 2, 3, 4, 5, 6, 0];
    } else {
      days = [0, 1, 2, 3, 4, 5, 6];
    }

    var daysOfWeekMarkup = '';
    for (var i = 0; i < days.length; i++) {
      daysOfWeekMarkup += '<div';
      daysOfWeekMarkup += ' class="agjCalendar-' + dayNumberToName(
        days[i],
        'full',
        'en'
      ).toLowerCase() + '"';
      daysOfWeekMarkup += ' title="' + dayNumberToName(
        days[i],
        'full',
        agjCalendar['language']
      ) + '"';
      daysOfWeekMarkup += '>';
      daysOfWeekMarkup += dayNumberToName(
        days[i],
        agjCalendar['dayNameFormat'],
        agjCalendar['language']
      );
      daysOfWeekMarkup += '</div>';
    }
    calendarElement
      .find('div.agjCalendar-days')
      .empty()
      .append(daysOfWeekMarkup);

    // prevent scrolling while modal/full display is active using CSS
    switch (agjCalendar['calendarDisplay']) {
      case 'full':
      case 'modal':
        var bodyElement = $('body');

        lastBodyMarginRight = getCssValueInPixels(
          bodyElement.css('marginRight')
        );
        if (isNaN(lastBodyMarginRight)) {
          lastBodyMarginRight = 0;
        }

        lastBodyOverflow = bodyElement.css('overflow');

        var windowWidth = $(window).width();
        bodyElement.css({
          overflow: 'hidden'
        }).css({
          // we do these CSS calls separately because the $(window).width()
          // value will only change after overflow:hidden is applied to the
          // <body> element
          marginRight: lastBodyMarginRight + $(window).width() - windowWidth
        });

        lastScrollLeft = $(window).scrollLeft();
        lastScrollTop = $(window).scrollTop();

        if (agjCalendar['calendarDisplay'] === 'full') {
          // because full calendar display uses the entire display we scroll to
          // the top of the page to ensure the address bar is not visible on
          // mobile/touch devices
          window.scrollTo(0, 1);
          window.scrollTo(0, 0);
        }

        $('#agjCalendar-modal-background').show();

        break;
    }

    updateDropdown(agjCalendar, activateEnd);

    var monthToDraw = getActiveDate(agjCalendar, activateEnd);
    if (monthToDraw === -1) {
      var startDate = getActiveDate(agjCalendar, false);
      if (startDate !== -1) {
        monthToDraw = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + agjCalendar['minimumRange']
        );
      } else {
        monthToDraw = new Date(
          agjCalendar['minimumDate'].getFullYear(),
          agjCalendar['minimumDate'].getMonth(),
          agjCalendar['minimumDate'].getDate()
        );
        if (activateEnd) {
          monthToDraw.setFullYear(
            monthToDraw.getFullYear(),
            monthToDraw.getMonth(),
            monthToDraw.getDate() + agjCalendar['minimumRange']
          );
        }
      }
    }
    redrawCalendars(monthToDraw);

    positionCalendar(agjCalendar, activateEnd);
    $('body').addClass('agjCalendar-active');
  };

  /**
   * The autoSetEndDate() function will automatically set the end date of an
   * integration.
   * @param {object} agjCalendar - The integration to automatically set the end
   * date of.
   * @returns {void}
   */
  var autoSetEndDate = function(agjCalendar) {
    if (agjCalendar['allowRange']) {
      var startDate = getActiveDate(agjCalendar);
      if (startDate !== -1) {
        var endDateNeedsToChange = false;

        var endDateMinimum = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + agjCalendar['minimumRange']
        );
        if (endDateMaximum < agjCalendar['minimumDate']) {
          endDateMinimum.setFullYear(
            agjCalendar['minimumDate'].getFullYear(),
            agjCalendar['minimumDate'].getMonth(),
            agjCalendar['minimumDate'].getDate()
          );
        }

        var endDateMaximum = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + agjCalendar['maximumRange']
        );
        if (endDateMaximum > agjCalendar['maximumDate']) {
          endDateMaximum.setFullYear(
            agjCalendar['maximumDate'].getFullYear(),
            agjCalendar['maximumDate'].getMonth(),
            agjCalendar['maximumDate'].getDate()
          );
        }

        var endDate = getActiveDate(agjCalendar, true);
        if (
          endDate !== -1 &&
          (endDate < endDateMinimum || endDate > endDateMaximum) &&
          (
            agjCalendar['autoSetEndDate'] === 'always' ||
            agjCalendar['autoSetEndDate'] === 'dates'
          )
        ) {
          // endDate is a date and is either earlier than the minimum or later
          // than the maximum
          endDateNeedsToChange = true;
        } else if (
          endDate === -1 &&
          (
            agjCalendar['autoSetEndDate'] === 'always' ||
            agjCalendar['autoSetEndDate'] === 'blanks'
          )
        ) {
          // endDate is a blank
          endDateNeedsToChange = true;
        }

        if (endDateNeedsToChange) {
          endDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + agjCalendar['defaultRange']
          );
          if (endDate < endDateMinimum) {
            endDate.setFullYear(
              endDateMinimum.getFullYear(),
              endDateMinimum.getMonth(),
              endDateMinimum.getDate()
            );
          } else if (endDate > endDateMaximum) {
            endDate.setFullYear(
              endDateMaximum.getFullYear(),
              endDateMaximum.getMonth(),
              endDateMaximum.getDate()
            );
          }
          setDate(agjCalendar, endDate, true);
        }
      }
    }
  };

  /**
   * The checkIfActive() function will check if a specific integration is
   * active.
   * @param {number} position - The position of the integration.
   * @param {boolean} isEnd - Check if the end date is active.
   * @returns {boolean} - Returns true if the integration whose position was
   * passed is active or false if not.
   */
  var checkIfActive = function(position, isEnd) {
    if ($.agjCalendar.isActive()) {
      var calendarElement = $('#agjCalendar');
      if (parseInt(calendarElement.attr('data-active'), 10) === position) {
        var activeAgjCalendarIsEnd =
          calendarElement.attr('data-active-is-end') === true ||
          calendarElement.attr('data-active-is-end') === 'true';
        return activeAgjCalendarIsEnd === isEnd;
      }
    }
    return false;
  };

  /**
   * The createDomElements() function will create the DOM elements needed for
   * the date picker and bind event handlers to them.
   * @returns {object} - Returns the newly created agjCalendar DOM element.
   */
  var createDomElements = function() {
    var calendarElement = $('body').append(
      '<div id="agjCalendar-modal-background"></div>' +
      '<div id="agjCalendar">' +
        '<div id="agjCalendar-header">' +
          '<div id="agjCalendar-header-inner">' +
            '<a href="#" id="agjCalendar-hide"></a>' +
            '<span></span>' +
            ' ' +
            '<a' +
              ' href="https://agjcalendar.agjjquery.org/"' +
              ' target="_blank"' +
              ' title="agjCalendar"' +
              ' id="agjCalendar-powered-by"' +
            '>' +
              'agjCalendar' +
            '</a>' +
          '</div>' +
        '</div>' +
        '<div id="agjCalendar-body">' +
          '<div id="agjCalendar-first">' +
            '<div class="agjCalendar-month">' +
              '<div class="agjCalendar-month-inner-1">' +
                '<div class="agjCalendar-month-inner-2">' +
                  '<select id="agjCalendar-dropdown"></select>' +
                  '<a href="#" class="agjCalendar-next-month">' +
                    '<span class="agjCalendar-next-month-inner"></span>' +
                  '</a>' +
                  '<a href="#" class="agjCalendar-previous-month">' +
                    '<span class="agjCalendar-previous-month-inner"></span>' +
                  '</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="agjCalendar-days"></div>' +
          '</div>' +
          '<div id="agjCalendar-second">' +
            '<div class="agjCalendar-month">' +
              '<div class="agjCalendar-month-inner" colspan="5">' +
                '<strong id="agjCalendar-second-month-name"></strong>' +
                '<a href="#" class="agjCalendar-next-month">' +
                  '<span class="agjCalendar-next-month-inner"></span>' +
                '</a>' +
                '<a href="#" class="agjCalendar-previous-month">' +
                  '<span class="agjCalendar-previous-month-inner"></span>' +
                '</a>' +
              '</div>' +
            '</div>' +
            '<div class="agjCalendar-days"></div>' +
          '</div>' +
          '<div id="agjCalendar-third">' +
            '<div class="agjCalendar-month">' +
              '<div class="agjCalendar-month-inner" colspan="5">' +
                '<strong id="agjCalendar-third-month-name"></strong>' +
                '<a href="#" class="agjCalendar-next-month">' +
                  '<span class="agjCalendar-next-month-inner"></span>' +
                '</a>' +
                '<a href="#" class="agjCalendar-previous-month">' +
                  '<span class="agjCalendar-previous-month-inner"></span>' +
                '</a>' +
              '</div>' +
            '</div>' +
            '<div class="agjCalendar-days"></div>' +
          '</div>' +
        '</div>' +
      '</div>'
    ).find('#agjCalendar');

    calendarElement.find('#agjCalendar-hide').on('click', function() {
      $.agjCalendar.deactivate();
      return false;
    });

    calendarElement.find('#agjCalendar-dropdown').on('change', function() {
      if (regexPatterns['month'].test($(this).val())) {
        var firstDayOfTheMonth = new Date(
          $(this).val().substring(0, 4),
          parseInt($(this).val().substring(5, 7), 10) - 1,
          1
        );
        redrawCalendars(firstDayOfTheMonth);
      }
    });

    calendarElement.find(
      'a.agjCalendar-previous-month, a.agjCalendar-next-month'
    ).on('click', function() {
      if (regexPatterns['month'].test($('#agjCalendar-dropdown').val())) {
        var firstDayOfTheMonth = new Date(
          $('#agjCalendar-dropdown').val().substring(0, 4),
          parseInt($('#agjCalendar-dropdown').val().substring(5, 7), 10) - 1,
          1
        );

        if ($(this).hasClass('agjCalendar-previous-month')) {
          firstDayOfTheMonth.setFullYear(
            firstDayOfTheMonth.getFullYear(),
            firstDayOfTheMonth.getMonth() - 1,
            firstDayOfTheMonth.getDate()
          );
        } else if ($(this).hasClass('agjCalendar-next-month')) {
          firstDayOfTheMonth.setFullYear(
            firstDayOfTheMonth.getFullYear(),
            firstDayOfTheMonth.getMonth() + 1,
            firstDayOfTheMonth.getDate()
          );
        }

        var newDropdownValue = dateToString(firstDayOfTheMonth, 'YYYY-MM');
        if (
          calendarElement.find(
            '#agjCalendar-dropdown option[value=' + newDropdownValue + ']'
          ).length > 0
        ) {
          calendarElement.find('#agjCalendar-dropdown')
            .val(newDropdownValue)
            .trigger('change');
        }
      }
      return false;
    });

    /**
     * The windowSizeChanged() function will handle events where the window
     * size may have changed.
     * @returns {void}
     */
    var windowSizeChanged = function() {
      if ($.agjCalendar.isActive()) {
        var calendarElement = $('#agjCalendar');

        var agjCalendar = agjCalendars[calendarElement.attr('data-active')];
        var agjCalendarIsEnd =
          calendarElement.attr('data-active-is-end') === true ||
          calendarElement.attr('data-active-is-end') === 'true';

        positionCalendar(agjCalendar, agjCalendarIsEnd);
      }
    };
    $(window).on('resize', windowSizeChanged);
    $(document)
      .on('resize', windowSizeChanged)
      .on('keyup', function(event) {
        if (event.key === 'Escape' && $.agjCalendar.isActive()) {
          $('*:focus').trigger('blur');
          $.agjCalendar.deactivate();
          return false;
        }
        return true;
      })
      .on('click', function(event) {
        lastClickWasOnAgjCalendar = false;

        if ($.agjCalendar.isActive()) {
          var targetIsAgjCalendarOrChild =
            $(event.target).attr('id') === 'agjCalendar' ||
            $(event.target).parents('#agjCalendar').length > 0;

          var targetIsActiveInputOrChild =
            $(event.target).is('.agjCalendar-active-input') ||
            $(event.target).parents('.agjCalendar-active-input').length > 0;

          if (targetIsAgjCalendarOrChild || targetIsActiveInputOrChild) {
            // if the user clicked on something related to the date picker
            // while the date picker is active then use the global flag to
            // remember that
            lastClickWasOnAgjCalendar = true;
          } else if (
            !targetIsAgjCalendarOrChild && !targetIsActiveInputOrChild
          ) {
            // if the user clicked on something unrelated to the date picker
            // while the date picker is active then possibly deactivate

            var calendarDisplay = -1;
            var active = $('#agjCalendar').attr('data-active');
            if (active >= 0) {
              calendarDisplay = agjCalendars[active]['calendarDisplay'];
            }
            switch (calendarDisplay) {
              case 'modal':
              case 'full':
                // do nothing for modal or full displays
                break;

              default:
                // deactivate the date picker for all other displays
                $.agjCalendar.deactivate();
                break;
            }
          }
        }

        return true;
      });

    return calendarElement;
  };

  /**
   * The dateToString() function will format a given date with a given format
   * in a string.
   * @param {Date} date - The date to format into a string.
   * @param {string} dateFormat - The date format to return the string in.
   * @param {string} language - The language to use.
   * @returns {string} - The date formatted as a string.
   */
  var dateToString = function(date, dateFormat, language) {
    language = language === 'fr' ? language : 'en';

    var dateFormats = {
      DD: function(date) {
        return (date.getDate() < 10 ? '0' : '') + date.getDate();
      },
      D: function(date) {
        return date.getDate();
      },
      MMMM: function(date) {
        return monthNumberToName(date.getMonth(), true, language);
      },
      MMM: function(date) {
        return monthNumberToName(date.getMonth(), false, language);
      },
      MM: function(date) {
        return (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
      },
      M: function(date) {
        return date.getMonth() + 1;
      },
      YYYY: function(date) {
        return date.getFullYear();
      }
    };

    var processedString = '';

    var processPosition = 0;
    while (dateFormat.length > processPosition) {
      var dateFormatFound = false;
      $.map(dateFormats, function(callbackFunction, dateFormatCheck) {
        if (
          !dateFormatFound &&
          dateFormat.substring(
            processPosition,
            processPosition + dateFormatCheck.length
          ) === dateFormatCheck
        ) {
          processedString += callbackFunction(date);
          processPosition += dateFormatCheck.length;

          dateFormatFound = true;
        }
      });

      if (!dateFormatFound) {
        processedString += dateFormat.substring(
          processPosition,
          processPosition + 1
        );
        processPosition++;
      }
    }

    return processedString;
  };

  /**
   * The dayNumberToName() function will return the name of a day of the week.
   * @param {number} dayNumber - A numeric representation of the day of the
   * week we want the name of.
   * @param {string} variation - The variation of the name you want returned.
   * @param {string} language - The language to use.
   * @returns {string|number} - Returns the day’s name if found or -1 if not.
   */
  var dayNumberToName = function(dayNumber, variation, language) {
    if (dayNumber >= 0 && dayNumber <= 6) {
      switch (variation) {
        case 'full':
        case 'medium':
        case 'short':
          return translations[language]['daysOfWeek'][variation][dayNumber];
      }
    }
    return -1;
  };

  /**
   * The generateRandomInteger() function will generate a random integer
   * between two passed integers.
   * @param {number} minimum - The bottom of the random range.
   * @param {number} maximum - The top of the random range.
   * @returns {number} - Returns a random integer between the passed integers.
   */
  var generateRandomInteger = function(minimum, maximum) {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
  };

  /**
   * The getActiveDate() function will get the active date of an integration.
   * @param {object} agjCalendar - The integration to get the active date of.
   * @param {boolean} getEnd - Whether or not to get the active end date.
   * @returns {void}
   */
  var getActiveDate = function(agjCalendar, getEnd) {
    if (getEnd !== true) {
      getEnd = false;
    }

    var activeDate = -1;

    if (!getEnd || agjCalendar['allowRange']) {
      switch (agjCalendar['inputType']) {
        case 'text':
          activeDate = stringToDate(
            $(agjCalendar[
              getEnd ? 'endDateSelector' : 'dateSelector'
            ]).val(),
            agjCalendar['dateFormat'],
            agjCalendar['language']
          );
          break;

        case 'dropdown':
          var startDateString;
          startDateString = $(
            agjCalendar[getEnd ? 'endMonthSelector' : 'monthSelector']
          ).val();
          startDateString += '-';
          startDateString += $(
            agjCalendar[getEnd ? 'endDaySelector' : 'daySelector']
          ).val();

          activeDate = stringToDate(
            startDateString,
            4,
            agjCalendar['language']
          );
          break;
      }
    }

    if (activeDate !== -1) {
      if (activeDate < agjCalendar['minimumDate']) {
        return agjCalendar['minimumDate'];
      } else if (activeDate > agjCalendar['maximumDate']) {
        return agjCalendar['maximumDate'];
      } else {
        if (agjCalendar['excludeDates'].length > 0) {
          for (var i = 0; i < agjCalendar['excludeDates'].length; i++) {
            var excludeDate = agjCalendar['excludeDates'][i];
            if (
              activeDate.getFullYear() === excludeDate.getFullYear() &&
              activeDate.getMonth() === excludeDate.getMonth() &&
              activeDate.getDate() === excludeDate.getDate()
            ) {
              return -1;
            }
          }
        }
        return activeDate;
      }
    }

    return -1;
  };

  /**
   * The getCssValueInPixels() function will extract the value in pixels from a
   * CSS value.
   * @param {string} cssValue - The CSS value to extract the pixel count.
   * @returns {number} - The pixel count for the CSS value.
   */
  var getCssValueInPixels = function(cssValue) {
    if (cssValue.substring(cssValue.length - 2).toLowerCase() === 'px') {
      cssValue = cssValue.substring(0, cssValue.length - 2);
    }
    return isNaN(cssValue) ? 0 : parseInt(cssValue, 10);
  };

  /**
   * The getDaysInMonth() function will return the number of days in a given
   * month.
   * @param {number} month - The month  to base the calculation on.
   * @param {number} year - The year to base the calculation on.
   * @returns {number} - The number of days in the given month or -1 if the
   * month is invalid.
   */
  var getDaysInMonth = function(month, year) {
    if (!isNaN(month)) {
      month = parseInt(month, 10);
    }

    switch (month) {
      case 0: // January
      case 2: // March
      case 4: // May
      case 6: // July
      case 7: // August
      case 9: // October
      case 11: // December
        return 31;

      case 3: // April
      case 5: // June
      case 8: // September
      case 10: // November
        return 30;

      case 1: // February
        year = parseInt(year, 10);
        var isLeapYear =
          (year % 4 === 0 && year % 100 !== 0) ||
          year % 400 === 0;
        return isLeapYear ? 29 : 28;
    }

    return -1;
  };

  /**
   * The getTrueHeight() function will calculate the true height; height +
   * vertical padding + vertical borders + vertical margins.
   * @param {object} jQueryElement - The jQuery element you want to calculate
   * the true height of.
   * @returns {number} - The true height of the passed jQuery element in pixels.
   */
  var getTrueHeight = function(jQueryElement) {
    var trueHeight = jQueryElement.height();

    var cssAttributes = [
      'margin-top',
      'borderTopWidth',
      'padding-top',
      'padding-bottom',
      'borderBottomWidth',
      'margin-bottom'
    ];
    for (var i = 0; i < cssAttributes.length; i++) {
      var cssValue = getCssValueInPixels(jQueryElement.css(cssAttributes[i]));
      if (!isNaN(cssValue)) {
        trueHeight += cssValue;
      }
    }

    return trueHeight;
  };

  /**
   * The getTrueWidth() function will calculate the true width; width +
   * horizontal padding + horizontal borders + horizontal margins.
   * @param {object} jQueryElement - The jQuery element you want to calculate
   * the true width of.
   * @returns {number} - The true width of the passed jQuery element in pixels.
   */
  var getTrueWidth = function(jQueryElement) {
    var trueWidth = jQueryElement.width();

    var cssAttributes = [
      'margin-left',
      'borderLeftWidth',
      'padding-left',
      'padding-right',
      'borderRightWidth',
      'margin-right'
    ];
    for (var i = 0; i < cssAttributes.length; i++) {
      var cssValue = getCssValueInPixels(jQueryElement.css(cssAttributes[i]));
      if (!isNaN(cssValue)) {
        trueWidth += cssValue;
      }
    }

    return trueWidth;
  };

  /**
   * The hideModalBackground() function will hide the modal background element.
   * @returns {void}
   */
  var hideModalBackground = function() {
    var modalBackgroundElement = $('#agjCalendar-modal-background');
    if (modalBackgroundElement.is(':visible')) {
      window.scrollTo(lastScrollLeft, lastScrollTop);
      $('body').css({
        marginRight: lastBodyMarginRight,
        overflow:    lastBodyOverflow
      });
      modalBackgroundElement.hide();
    }
  };

  /**
   * The monthNameToNumber() function will return the numeric position of a
   * month.
   * @param {string} monthName - The name of the month we want the numeric
   * position of.
   * @param {string} language - The language to use.
   * @returns {number} - The month’s numeric position or -1 if the month isn’t
   * found.
   */
  var monthNameToNumber = function(monthName, language) {
    var returnValue = -1;

    var variations = [
      'full',
      'abbreviated'
    ];
    for (var variation = 0; variation < variations.length; variation++) {
      $.map(
        translations[language]['months'][variations[variation]],
        function(translatedMonthName, monthNumber) {
          if (
            returnValue === -1 &&
            translatedMonthName.toLowerCase() === monthName.toLowerCase()
          ) {
            returnValue = monthNumber;
            return false;
          }
        }
      );
      if (returnValue !== -1) {
        return returnValue;
      }
    }

    return returnValue;
  };

  /**
   * The monthNumberToName() function will return the name of a month.
   * @param {number} monthNumber - A numeric representation of the month we
   * want the name of.
   * @param {boolean} fullName - Whether to return the month’s full name,
   * default is true.
   * @param {string} language - The language to use.
   * @returns {string|number} - Returns the month’s name if found or -1 if not.
   */
  var monthNumberToName = function(monthNumber, fullName, language) {
    if (monthNumber >= 0 && monthNumber <= 11) {
      var variation = fullName ? 'full' : 'abbreviated';
      return translations[language]['months'][variation][monthNumber];
    }
    return -1;
  };

  /**
   * The numberToText() function will return a number as text.
   * @param {number} number - The number to be returned as text.
   * @returns {string} - The number as text.
   */
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

    return -1;
  };

  /**
   * The positionCalendar() function will position the date picker on the
   * webpage.
   * @param {object} agjCalendar - The integration to set the date on.
   * @param {boolean} useEnd - Whether or not to use the end date for
   * positioning.
   * @returns {void}
   */
  var positionCalendar = function(agjCalendar, useEnd) {
    var calendarElement = $('#agjCalendar');

    switch (agjCalendar['calendarDisplay']) {
      case 'inline':
        switch (agjCalendar['inputType']) {
          case 'text':
            var dateElement = $(
              agjCalendar[useEnd ? 'endDateSelector' : 'dateSelector']
            );
            var expanderElement = $(
              agjCalendar[useEnd ? 'endExpanderSelector' : 'expanderSelector']
            );

            if (calendarElement.length === 1 && dateElement.length === 1) {
              var expanderBottom = 0;
              if (expanderElement.length > 0) {
                expanderBottom = expanderElement.offset().top;
                expanderBottom += getTrueHeight(expanderElement);
              }

              var dateBottom;
              if (dateElement.attr('type') === 'hidden') {
                dateBottom = dateElement.parent().offset().top;
                dateBottom += getTrueHeight(dateElement.parent());
              } else {
                dateBottom = dateElement.offset().top;
                dateBottom += getTrueHeight(dateElement);
              }

              var expanderLeft = Number.MAX_SAFE_INTEGER;
              if (expanderElement.length > 0) {
                expanderLeft = expanderElement.offset().left;
              }

              var dateLeft;
              if (dateElement.attr('type') === 'hidden') {
                dateLeft = dateElement.parent().offset().left;
              } else {
                dateLeft = dateElement.offset().left;
              }

              calendarElement.css({
                left: Math.min(expanderLeft, dateLeft),
                top:  Math.max(expanderBottom, dateBottom) + 1
              });
            }

            break;

          case 'dropdown':
            var monthElement = $(
              agjCalendar[useEnd ? 'endMonthSelector' : 'monthSelector']
            );
            var dayElement = $(
              agjCalendar[useEnd ? 'endDaySelector' : 'daySelector']
            );
            var expanderElement = $(
              agjCalendar[useEnd ? 'endExpanderSelector' : 'expanderSelector']
            );

            if (
              calendarElement.length === 1 &&
              monthElement.length === 1 &&
              dayElement.length === 1
            ) {
              var expanderBottom = 0;
              if (expanderElement.length > 0) {
                expanderBottom = expanderElement.offset().top;
                expanderBottom += getTrueHeight(expanderElement);
              }

              var monthBottom = monthElement.offset().top;
              monthBottom += getTrueHeight(monthElement);

              var dayBottom = dayElement.offset().top;
              dayBottom += getTrueHeight(dayElement);

              var calendarTop = 1 + Math.max(
                expanderBottom,
                monthBottom,
                dayBottom
              );

              var expanderLeft = Number.MAX_SAFE_INTEGER;
              if (expanderElement.length > 0) {
                expanderLeft = expanderElement.offset().left;
              }
              var monthLeft = monthElement.offset().left;
              var dayLeft = dayElement.offset().left;
              var calendarLeft = Math.min(expanderLeft, monthLeft, dayLeft);

              calendarElement.css({
                left: calendarLeft,
                top:  calendarTop
              });
            }

            break;
        }

        calendarElement.removeClass('agjCalendar-full').css({
          position: 'absolute'
        });

        break;

      case 'modal':
        calendarElement.removeClass('agjCalendar-full');

        var fixedLeft = $(window).width() / 2;
        fixedLeft -= getTrueWidth(calendarElement) / 2;
        var fixedTop = $(window).height() / 2;
        fixedTop -= getTrueHeight(calendarElement) / 2;

        calendarElement.css({
          left:     fixedLeft,
          position: 'fixed',
          top:      fixedTop
        });

        $('#agjCalendar-modal-background')
          .removeClass('agjCalendar-modal-background-full');

        break;

      case 'full':
        calendarElement.addClass('agjCalendar-full').css({
          left:     0,
          position: 'fixed',
          top:      0
        });

        $('#agjCalendar-modal-background')
          .addClass('agjCalendar-modal-background-full');

        break;
    }
  };

  /**
   * The redrawCalendars() function will redraw the calendars on the date
   * picker.
   * @param {Date} drawMonth - The month to draw on the left most calendar of
   * the date picker.
   * @returns {void}
   */
  var redrawCalendars = function(drawMonth) {
    if (drawMonth.getDate() !== 1) {
      drawMonth.setFullYear(drawMonth.getFullYear(), drawMonth.getMonth(), 1);
    }
    drawMonth.setHours(0, 0, 0, 0);

    var calendarElement = $('#agjCalendar');
    if (calendarElement.length > 0) {
      var agjCalendar = agjCalendars[calendarElement.attr('data-active')];
      var agjCalendarIsEnd =
        calendarElement.attr('data-active-is-end') === true ||
        calendarElement.attr('data-active-is-end') === 'true';

      var currentStartDate = getActiveDate(agjCalendar);
      var currentEndDate = -1;
      if (agjCalendar['allowRange']) {
        currentEndDate = getActiveDate(agjCalendar, true);
      }

      var agjCalendarDropdownElement = $('#agjCalendar-dropdown');

      for (
        var calendar = 1;
        calendar <= agjCalendar['calendarCount'];
        calendar++
      ) {
        var getDay;
        if (agjCalendar['startWeekOnMonday']) {
          getDay = (drawMonth.getDay() + 6) % 7;
        } else {
          getDay = drawMonth.getDay();
        }

        var calendarSelector = -1;
        switch (calendar) {
          case 1:
            calendarSelector = '#agjCalendar-first';
            break;

          case 2:
            calendarSelector = '#agjCalendar-second';
            break;

          case 3:
            calendarSelector = '#agjCalendar-third';
            break;
        }

        switch (calendar) {
          case 1:
            agjCalendarDropdownElement.val(
              dateToString(drawMonth, 'YYYY-MM', agjCalendar['language'])
            );
            break;

          case 2:
          case 3:
            $(calendarSelector + '-month-name').text(
              dateToString(drawMonth, 'MMMM YYYY', agjCalendar['language'])
            );
            break;
        }

        var calendarMarkup = '';
        var currentDay = 0;
        if (getDay > 0) {
          calendarMarkup += '<div';
          calendarMarkup += ' class="agjCalendar-week agjCalendar-week-one"';
          calendarMarkup += '>';
          for (var day = 1; day <= getDay; day++) {
            currentDay++;
            calendarMarkup += '<div';
            calendarMarkup += ' class="agjCalendar-blank';
            calendarMarkup += ' agjCalendar-' + dayNumberToName(
              (currentDay - (agjCalendar['startWeekOnMonday'] ? 0 : 1)) % 7,
              'full',
              'en'
            ).toLowerCase();
            calendarMarkup += '"></div>';
          }
        }

        var minimumDate = new Date(
          agjCalendar['minimumDate'].getFullYear(),
          agjCalendar['minimumDate'].getMonth(),
          agjCalendar['minimumDate'].getDate()
        );
        if (agjCalendar['allowRange'] && agjCalendarIsEnd) {
          if (currentStartDate === -1) {
            minimumDate.setFullYear(
              minimumDate.getFullYear(),
              minimumDate.getMonth(),
              minimumDate.getDate() + agjCalendar['minimumRange']
            );
          } else {
            minimumDate.setFullYear(
              currentStartDate.getFullYear(),
              currentStartDate.getMonth(),
              currentStartDate.getDate() + agjCalendar['minimumRange']
            );
          }
        }
        minimumDate.setHours(0, 0, 0, 0);

        var maximumDate = new Date(
          agjCalendar['maximumDate'].getFullYear(),
          agjCalendar['maximumDate'].getMonth(),
          agjCalendar['maximumDate'].getDate()
        );
        if (agjCalendar['allowRange']) {
          if (!agjCalendarIsEnd) {
            maximumDate.setFullYear(
              maximumDate.getFullYear(),
              maximumDate.getMonth(),
              maximumDate.getDate() - agjCalendar['minimumRange']
            );
          } else if (agjCalendarIsEnd && currentStartDate !== -1) {
            maximumDate.setFullYear(
              currentStartDate.getFullYear(),
              currentStartDate.getMonth(),
              currentStartDate.getDate() + agjCalendar['maximumRange']
            );
            if (maximumDate > agjCalendar['maximumDate']) {
              maximumDate.setFullYear(
                agjCalendar['maximumDate'].getFullYear(),
                agjCalendar['maximumDate'].getMonth(),
                agjCalendar['maximumDate'].getDate()
              );
            }
          }
        }
        maximumDate.setHours(23, 59, 59, 999);

        for (day = 1; day <= 42 - getDay; day++) {
          if (currentDay % 7 === 0) {
            if (calendarMarkup.length > 0) {
              calendarMarkup += '</div>';
            }
            calendarMarkup += '<div';
            calendarMarkup += ' class="agjCalendar-week';
            calendarMarkup += ' agjCalendar-week-' + numberToText(
              Math.round(currentDay / 7) + 1
            ).toLowerCase() + '">';
          }

          var daysInMonth = getDaysInMonth(
            drawMonth.getMonth(),
            drawMonth.getFullYear()
          );
          if (agjCalendar['startWeekOnMonday']) {
            daysInMonth++;
          }
          if (day <= daysInMonth) {
            var drawDate = new Date(
              drawMonth.getFullYear(),
              drawMonth.getMonth(),
              day
            );

            var dateIsSelectable = false;
            if (drawDate >= minimumDate && drawDate <= maximumDate) {
              dateIsSelectable = true;
              if (agjCalendar['excludeDates'].length > 0) {
                for (var i = 0; i < agjCalendar['excludeDates'].length; i++) {
                  var excludeDate = agjCalendar['excludeDates'][i];
                  if (
                    drawDate.getFullYear() === excludeDate.getFullYear() &&
                    drawDate.getMonth() === excludeDate.getMonth() &&
                    drawDate.getDate() === excludeDate.getDate()
                  ) {
                    dateIsSelectable = false;
                    break;
                  }
                }
              }
            }

            var classMarkup = 'agjCalendar-' + dayNumberToName(
              (currentDay + (agjCalendar['startWeekOnMonday'] ? 1 : 0)) % 7,
              'full',
              'en'
            ).toLowerCase();
            if (dateIsSelectable) {
              classMarkup += ' agjCalendar-selectable';
            }
            if (
              drawDate.getFullYear() === new Date().getFullYear() &&
              drawDate.getMonth() === new Date().getMonth() &&
              drawDate.getDate() === new Date().getDate()
            ) {
              classMarkup += ' agjCalendar-today';
            }
            var matchesStartDate =
              currentStartDate !== -1 &&
              (
                drawDate.getFullYear() === currentStartDate.getFullYear() &&
                drawDate.getMonth() === currentStartDate.getMonth() &&
                drawDate.getDate() === currentStartDate.getDate()
              );
            if (matchesStartDate) {
              if (!agjCalendarIsEnd) {
                classMarkup += ' agjCalendar-active';
              } else {
                classMarkup += ' agjCalendar-other-active';
              }
            }
            var matchesEndDate =
              currentEndDate !== -1 &&
              (
                drawDate.getFullYear() === currentEndDate.getFullYear() &&
                drawDate.getMonth() === currentEndDate.getMonth() &&
                drawDate.getDate() === currentEndDate.getDate()
              );
            if (matchesEndDate) {
              if (agjCalendarIsEnd) {
                classMarkup += ' agjCalendar-active';
              } else {
                classMarkup += ' agjCalendar-other-active';
              }
            }
            if (
              currentStartDate !== -1 &&
              currentEndDate !== -1 &&
              currentStartDate !== currentEndDate
            ) {
              if (
                (
                  currentStartDate < currentEndDate &&
                  drawDate >= currentStartDate &&
                  drawDate <= currentEndDate
                ) ||
                (
                  currentStartDate > currentEndDate &&
                  drawDate <= currentStartDate &&
                  drawDate >= currentEndDate
                )
              ) {
                classMarkup += ' agjCalendar-in-range';
              }
            }

            calendarMarkup += '<div class="' + classMarkup + '">';
            if (dateIsSelectable) {
              var fullDateText = '';
              switch (agjCalendar['language']) {
                case 'en':
                  fullDateText = dateToString(
                    drawDate,
                    'MMMM D, YYYY',
                    agjCalendar['language']
                  );
                  break;

                case 'fr':
                  fullDateText = dateToString(
                    drawDate,
                    'D MMMM YYYY',
                    agjCalendar['language']
                  );
                  break;
              }
              calendarMarkup += '<a';
              calendarMarkup += ' href="#"';
              calendarMarkup += ' title="' + fullDateText + '"';
              calendarMarkup += ' id="agjCalendar-' + dateToString(
                drawDate,
                'YYYY-MM-DD',
                agjCalendar['language']
              ) + '"';
              calendarMarkup += '>';
            }
            calendarMarkup += day;
            if (dateIsSelectable) {
              calendarMarkup += '</a>';
            }
            calendarMarkup += '</div>';
          } else {
            calendarMarkup += '<div';
            calendarMarkup += ' class="agjCalendar-blank';
            calendarMarkup += ' agjCalendar-' + dayNumberToName(
              (currentDay + (agjCalendar['startWeekOnMonday'] ? 1 : 0)) % 7,
              'full',
              'en'
            ).toLowerCase();
            calendarMarkup += '"></div>';
          }

          currentDay++;
        }
        calendarMarkup += '</div>';

        $(calendarSelector + ' div.agjCalendar-week').remove();
        $(calendarSelector).append(calendarMarkup);

        if (
          $(
            calendarSelector +
            ' div.agjCalendar-week-five div.agjCalendar-blank'
          ).length === 7
        ) {
          $(calendarSelector)
            .removeClass('agjCalendar-five-weeks agjCalendar-six-weeks')
            .addClass('agjCalendar-four-weeks');
        } else if (
          $(
            calendarSelector +
            ' div.agjCalendar-week-six div.agjCalendar-blank'
          ).length === 7
        ) {
          $(calendarSelector)
            .removeClass('agjCalendar-four-weeks agjCalendar-six-weeks')
            .addClass('agjCalendar-five-weeks');
        } else {
          $(calendarSelector)
            .removeClass('agjCalendar-four-weeks agjCalendar-five-weeks')
            .addClass('agjCalendar-six-weeks');
        }

        drawMonth.setFullYear(
          drawMonth.getFullYear(),
          drawMonth.getMonth() + 1,
          1
        );
      }

      $('div.agjCalendar-week a').on('click', function() {
        var newDate = new Date(
          this.id.substring(12, 16),
          parseInt(this.id.substring(17, 19), 10) - 1,
          this.id.substring(20, 22)
        );
        setDate(agjCalendar, newDate, agjCalendarIsEnd);
        if (agjCalendar['allowRange'] && !agjCalendarIsEnd) {
          autoSetEndDate(agjCalendar);
        }
        $.agjCalendar.deactivate();
        return false;
      });

      if (agjCalendarDropdownElement.val() !== null) {
        var dropdownDate = new Date(
          agjCalendarDropdownElement.val().substring(0, 4),
          parseInt(agjCalendarDropdownElement.val().substring(5, 7), 10),
          1
        );
        if (
          agjCalendarDropdownElement.find(
            'option[value=' + dateToString(
              dropdownDate,
              'YYYY-MM',
              agjCalendar['language']
            ) + ']'
          ).length === 0
        ) {
          $('a.agjCalendar-next-month').fadeTo(1, 0.33);
        } else {
          $('a.agjCalendar-next-month').fadeTo(1, 1);
        }

        dropdownDate.setFullYear(
          dropdownDate.getFullYear(),
          dropdownDate.getMonth() - 2,
          dropdownDate.getDate()
        );
        if (
          agjCalendarDropdownElement.find(
            'option[value=' + dateToString(
              dropdownDate,
              'YYYY-MM',
              agjCalendar['language']
            ) + ']'
          ).length === 0
        ) {
          $('a.agjCalendar-previous-month').fadeTo(1, 0.33);
        } else {
          $('a.agjCalendar-previous-month').fadeTo(1, 1);
        }
      }
    }
  };

  /**
   * The setDate() function will set a date on an integration’s inputs.
   * @param {object} agjCalendar - The integration to set the date on.
   * @param {Date} dateToSet - The date to set on the integration’s inputs.
   * @param {boolean} setEnd - Whether or not to set the end date.
   * @returns {void}
   */
  var setDate = function(agjCalendar, dateToSet, setEnd) {
    if (setEnd === undefined) {
      setEnd = false;
    }

    switch (agjCalendar['inputType']) {
      case 'text':
        var dateElement = $(
          agjCalendar[setEnd ? 'endDateSelector' : 'dateSelector']
        );
        var newValue = '';
        if (dateToSet === 'blank') {
          switch (agjCalendar['dateFormat']) {
            case 1:
              newValue = 'mm/dd/yyyy';
              break;

            case 2:
              newValue = translations[agjCalendar['language']]['selectADate'];
              break;

            case 3:
              newValue = 'dd/mm/yyyy';
              break;

            case 4:
              newValue = 'yyyy-mm-dd';
              break;

            case 5:
              newValue = translations[agjCalendar['language']]['selectADate'];
              break;
          }
        } else {
          switch (agjCalendar['dateFormat']) {
            case 1:
              newValue = dateToString(
                dateToSet,
                'MM/DD/YYYY',
                agjCalendar['language']
              );
              break;

            case 2:
              newValue = dateToString(
                dateToSet,
                'MMM D, YYYY',
                agjCalendar['language']
              );
              break;

            case 3:
              newValue = dateToString(
                dateToSet,
                'DD/MM/YYYY',
                agjCalendar['language']
              );
              break;

            case 4:
              newValue = dateToString(
                dateToSet,
                'YYYY-MM-DD',
                agjCalendar['language']
              );
              break;

            case 5:
              newValue = dateToString(
                dateToSet,
                'D MMMM YYYY',
                agjCalendar['language']
              );
              break;
          }
        }
        if (newValue.length > 0) {
          dateElement.val(newValue).trigger('change');
        }
        break;

      case 'dropdown':
        var dayValue;
        if (dateToSet === 'blank') {
          dayValue = '';
        } else {
          dayValue = dateToString(dateToSet, 'DD', agjCalendar['language']);
        }

        var monthElement = $(
          agjCalendar[setEnd ? 'endMonthSelector' : 'monthSelector']
        );
        var monthValue;
        if (dateToSet === 'blank') {
          monthValue = '';
        } else {
          monthValue = dateToString(
            dateToSet,
            'YYYY-MM',
            agjCalendar['language']
          );
        }

        if (
          monthValue.length > 0 &&
          monthElement.find('option[value=' + monthValue + ']').length > 0 &&
          (
            dateToSet === 'blank' ||
            parseInt(dayValue, 10) <= getDaysInMonth(
              dateToSet.getMonth(),
              dateToSet.getFullYear()
            )
          )
        ) {
          monthElement.val(monthValue).trigger('change');
          updateDayElement(agjCalendar, setEnd);

          $(agjCalendar[setEnd ? 'endDaySelector' : 'daySelector'])
            .val(dayValue)
            .trigger('change');
        }
        break;
    }
  };

  /**
   * The stringToDate() function will parse a string and return a Date object.
   * @param {string} string - The string we want to extract a date from.
   * @param {number} dateFormat - The format we want to search the string for.
   * @param {string} language - The language to use.
   * @returns {number|Date} - Returns a date if one can be extracted from the
   * string or -1 if no date is found.
   */
  var stringToDate = function(string, dateFormat, language) {
    switch (dateFormat) {
      case 1:
        if (regexPatterns[1].test(string)) {
          var dateFromString = new Date(
            string.substring(6, 10),
            parseInt(string.substring(0, 2), 10) - 1,
            string.substring(3, 5)
          );
          return dateFromString;
        }
        break;

      case 2:
        if (regexPatterns[2].test(string)) {
          var monthNumber = monthNameToNumber(
            string.substring(0, string.indexOf(' ')),
            language
          );
          if (monthNumber !== -1) {
            var dateFromString = new Date(
              string.substring(string.length - 4, string.length),
              monthNumber,
              string.substring(string.indexOf(' ') + 1, string.indexOf(','))
            );
            return dateFromString;
          }
        }
        break;

      case 3:
        if (regexPatterns[3].test(string)) {
          var dateFromString = new Date(
            string.substring(6, 10),
            parseInt(string.substring(3, 5), 10) - 1,
            string.substring(0, 2), 10
          );
          return dateFromString;
        }
        break;

      case 4:
        if (regexPatterns[4].test(string)) {
          var dateFromString = new Date(
            string.substring(0, 4),
            parseInt(string.substring(5, 7), 10) - 1,
            string.substring(8, 10)
          );
          return dateFromString;
        }
        break;

      case 5:
        if (regexPatterns[5].test(string)) {
          var monthNumber = monthNameToNumber(
            string.substring(string.indexOf(' ') + 1, string.lastIndexOf(' ')),
            language
          );
          if (monthNumber !== -1) {
            var dateFromString = new Date(
              string.substring(string.lastIndexOf(' ') + 1),
              monthNumber,
              string.substring(0, string.indexOf(' '))
            );
            return dateFromString;
          }
        }
        break;
    }

    return -1;
  };

  /**
   * The throwError() function will throw an error.
   * @param {string} errorMessage - The message of the error to throw.
   * @returns {void}
   */
  var throwError = function(errorMessage) {
    errorMessage = 'agjCalendar Error! ' + errorMessage;

    var console = window.console;
    if (console && console.error) {
      console.error(errorMessage);
    } else if (console && console.log) {
      console.log(errorMessage);
    }
  };

  /**
   * The updateDayElement() function will update an integration’s day element.
   * @param {object} agjCalendar - The integration to update.
   * @param {boolean} updateEnd - Whether or not to update the end date.
   * @returns {void}
   */
  var updateDayElement = function(agjCalendar, updateEnd) {
    if (updateEnd === undefined) {
      updateEnd = false;
    }

    if (agjCalendar['overwriteDayOptions']) {
      var monthElement = $(
        agjCalendar[updateEnd ? 'endMonthSelector' : 'monthSelector']
      );
      var dayElement = $(
        agjCalendar[updateEnd ? 'endDaySelector' : 'daySelector']
      );
      dayElement.find('option').remove();
      if (regexPatterns['month'].test(monthElement.val())) {
        if (agjCalendar['allowBlankDates']) {
          dayElement.append('<option value=""></option>');
        }

        var selectedDate = getActiveDate(agjCalendar, updateEnd);

        var startDate;
        if (agjCalendar['allowRange'] && updateEnd) {
          startDate = getActiveDate(agjCalendar, false);
        }

        var minimumDate = new Date(
          agjCalendar['minimumDate'].getFullYear(),
          agjCalendar['minimumDate'].getMonth(),
          agjCalendar['minimumDate'].getDate()
        );
        if (updateEnd) {
          if (startDate === -1) {
            minimumDate.setFullYear(
              minimumDate.getFullYear(),
              minimumDate.getMonth(),
              minimumDate.getDate() + agjCalendar['minimumRange']
            );
          } else {
            minimumDate.setFullYear(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + agjCalendar['minimumRange']
            );
          }
        }
        minimumDate.setHours(0, 0, 0, 0);

        var maximumDate = new Date(
          agjCalendar['maximumDate'].getFullYear(),
          agjCalendar['maximumDate'].getMonth(),
          agjCalendar['maximumDate'].getDate() - agjCalendar['minimumRange']
        );
        if (updateEnd) {
          if (startDate === -1) {
            maximumDate.setFullYear(
              agjCalendar['maximumDate'].getFullYear(),
              agjCalendar['maximumDate'].getMonth(),
              agjCalendar['maximumDate'].getDate()
            );
          } else {
            maximumDate.setFullYear(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + agjCalendar['maximumRange']
            );
            if (maximumDate > agjCalendar['maximumDate']) {
              maximumDate.setFullYear(
                agjCalendar['maximumDate'].getFullYear(),
                agjCalendar['maximumDate'].getMonth(),
                agjCalendar['maximumDate'].getDate()
              );
            }
          }
        }
        maximumDate.setHours(23, 59, 59, 999);

        var monthElementMonth = monthElement.val().substring(5, 7);
        monthElementMonth = parseInt(monthElementMonth, 10) - 1;
        var drawDate = new Date(
          monthElement.val().substring(0, 4),
          monthElementMonth,
          1
        );
        while (
          drawDate < maximumDate &&
          drawDate.getMonth() === monthElementMonth
        ) {
          if (drawDate >= minimumDate) {
            var optionMarkup = '<option';
            optionMarkup += ' value="' + dateToString(
              drawDate,
              'DD',
              agjCalendar['language']
            ) + '"';
            if (
              selectedDate !== -1 &&
              drawDate.getDate() === selectedDate.getDate()
            ) {
              optionMarkup += ' selected="selected"';
            }
            optionMarkup += '>';
            optionMarkup += drawDate.getDate();
            optionMarkup += '</option>';
            dayElement.append(optionMarkup);
          }

          drawDate.setFullYear(
            drawDate.getFullYear(),
            drawDate.getMonth(),
            drawDate.getDate() + 1
          );
        }
      }

      if (dayElement.find('option').length === 0) {
        dayElement.append('<option value=""></option>');
      }
    }
  };

  /**
   * The updateDropdown() function will update the date picker dropdown.
   * @param {object} agjCalendar - The integration to use to update.
   * @param {boolean} updateForEnd - Whether or not to update for the end date.
   */
  var updateDropdown = function(agjCalendar, updateForEnd) {
    if (updateForEnd === undefined) {
      updateForEnd = false;
    }

    var minimumDate = new Date(
      agjCalendar['minimumDate'].getFullYear(),
      agjCalendar['minimumDate'].getMonth(),
      agjCalendar['minimumDate'].getDate()
    );
    minimumDate.setHours(0, 0, 0, 0);

    var maximumDate = new Date(
      agjCalendar['maximumDate'].getFullYear(),
      agjCalendar['maximumDate'].getMonth(),
      agjCalendar['maximumDate'].getDate()
    );
    maximumDate.setHours(23, 59, 59, 999);

    if (updateForEnd) {
      var currentStartDate = getActiveDate(agjCalendar);
      if (currentStartDate !== -1) {
        minimumDate.setFullYear(
          currentStartDate.getFullYear(),
          currentStartDate.getMonth(),
          currentStartDate.getDate() + agjCalendar['minimumRange']
        );

        var endOfMaximumRange = new Date(
          currentStartDate.getFullYear(),
          currentStartDate.getMonth(),
          currentStartDate.getDate() + agjCalendar['maximumRange']
        );
        if (endOfMaximumRange < agjCalendar['maximumDate']) {
          maximumDate.setFullYear(
            endOfMaximumRange.getFullYear(),
            endOfMaximumRange.getMonth(),
            endOfMaximumRange.getDate()
          );
        }
      }
    }

    var dropdownElement = $('#agjCalendar-dropdown');
    dropdownElement.find('option').remove();

    var drawDate = new Date(
      minimumDate.getFullYear(),
      minimumDate.getMonth(),
      minimumDate.getDate()
    );
    do {
      dropdownElement.append(
        '<option' +
          ' value="' +
            dateToString(drawDate, 'YYYY-MM', agjCalendar['language']) +
          '"' +
        '>' +
          dateToString(drawDate, 'MMM YYYY', agjCalendar['language']) +
        '</option>'
      );
      drawDate.setFullYear(drawDate.getFullYear(), drawDate.getMonth() + 1, 1);
    } while (drawDate < maximumDate);
  };

  /**
   * The updateMonthElement() function will update an integration’s month
   * element.
   * @param {object} agjCalendar - The integration to update.
   * @param {boolean} updateEnd - Whether or not to update the end date.
   * @returns {void}
   */
  var updateMonthElement = function(agjCalendar, updateEnd) {
    if (updateEnd === undefined) {
      updateEnd = false;
    }

    if (agjCalendar['overwriteMonthOptions']) {
      var monthElement = $(
        agjCalendar[updateEnd ? 'endMonthSelector' : 'monthSelector']
      );
      monthElement.find('option').remove();
      if (agjCalendar['allowBlankDates']) {
        monthElement.append('<option value=""></option>');
      }

      var selectedDate = getActiveDate(agjCalendar, updateEnd);

      var startDate;
      if (agjCalendar['allowRange'] && updateEnd) {
        startDate = getActiveDate(agjCalendar, false);
      }

      var minimumDate = new Date(
        agjCalendar['minimumDate'].getFullYear(),
        agjCalendar['minimumDate'].getMonth(),
        agjCalendar['minimumDate'].getDate()
      );
      if (updateEnd) {
        if (startDate === -1) {
          minimumDate.setFullYear(
            minimumDate.getFullYear(),
            minimumDate.getMonth(),
            minimumDate.getDate() + agjCalendar['minimumRange']
          );
        } else {
          minimumDate.setFullYear(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + agjCalendar['minimumRange']
          );
        }
      }
      minimumDate.setHours(0, 0, 0, 0);

      var maximumDate = new Date(
        agjCalendar['maximumDate'].getFullYear(),
        agjCalendar['maximumDate'].getMonth(),
        agjCalendar['maximumDate'].getDate() - agjCalendar['minimumRange']
      );
      if (updateEnd) {
        if (startDate === -1) {
          maximumDate.setFullYear(
            agjCalendar['maximumDate'].getFullYear(),
            agjCalendar['maximumDate'].getMonth(),
            agjCalendar['maximumDate'].getDate()
          );
        } else {
          maximumDate.setFullYear(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + agjCalendar['maximumRange']
          );
          if (maximumDate > agjCalendar['maximumDate']) {
            maximumDate.setFullYear(
              agjCalendar['maximumDate'].getFullYear(),
              agjCalendar['maximumDate'].getMonth(),
              agjCalendar['maximumDate'].getDate()
            );
          }
        }
      }
      maximumDate.setHours(23, 59, 59, 999);

      var drawDate = new Date(
        minimumDate.getFullYear(),
        minimumDate.getMonth(),
        minimumDate.getDate()
      );
      while (drawDate < maximumDate) {
        var optionMarkup = '<option';
        optionMarkup += ' value="' + dateToString(
          drawDate,
          'YYYY-MM',
          agjCalendar['language']
        ) + '"';
        if (
          selectedDate !== -1 &&
          drawDate.getFullYear() === selectedDate.getFullYear() &&
          drawDate.getMonth() === selectedDate.getMonth()
        ) {
          optionMarkup += ' selected="selected"';
        }
        optionMarkup += '>';
        optionMarkup += dateToString(
          drawDate,
          'MMMM YYYY',
          agjCalendar['language']
        );
        optionMarkup += '</option>';
        monthElement.append(optionMarkup);

        drawDate.setFullYear(
          drawDate.getFullYear(),
          drawDate.getMonth() + 1,
          1
        );
      }
    }
  };

  /**
   * The $.fn.agjCalendar() function will intialize a new agjCalendar
   * integration.
   * @param {object} options - A JSON object of confiuguration options.
   * @returns {jQuery} - Returns the element to allow for chaining.
   */
  $.fn.agjCalendar = function(options) {
    if (typeof options !== 'object') {
      options = {};
    }

    if (this.prop('tagName').toLowerCase() === 'input') {
      var className;
      do {
        className = 'agjCalendar-' + generateRandomInteger(100000, 999999);
      } while ($('input.' + className).length > 0);

      this.addClass(className);
      options['dateSelector'] = 'input.' + className;

      $.agjCalendar(options);
    }

    return this;
  };

  /**
   * The $.agjCalendar() function will intialize a new agjCalendar integration.
   * @param {object} options - A JSON object of confiuguration options.
   * @returns {boolean} - Returns true on success or false on error.
   */
  $.agjCalendar = function(options) {
    options = $.extend({
      allowBlankDates:       false,
      allowRange:            false,
      autoSetEndDate:        'dates',
      calendarCount:         1,
      calendarDisplay:       'inline',
      dateFormat:            1,
      dateSelector:          null,
      dayNameFormat:         'short',
      daySelector:           null,
      defaultDate:           new Date(),
      defaultEndDate:        null,
      defaultRange:          -1,
      endDateSelector:       null,
      endDaySelector:        null,
      endExpanderSelector:   null,
      endMonthSelector:      null,
      excludeDates:          [],
      expanderSelector:      null,
      inputType:             'text',
      language:              'en',
      // we are squishing maximumDate into one long line and disabling ESLint
      // with the "eslint-disable-line" comment because of a ESLint bug which
      // won’t let us use the multiline notation without throwing an error.
      maximumDate:           new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()), // eslint-disable-line
      /*
      maximumDate:           new Date(
        new Date().getFullYear() + 1,
        new Date().getMonth(),
        new Date().getDate()
      ),
      */
      maximumRange:          -1,
      minimumDate:           new Date(),
      minimumRange:          -1,
      monthSelector:         null,
      overwriteDayOptions:   true,
      overwriteMonthOptions: true,
      startWeekOnMonday:     false
    }, options);


    var agjCalendar = {
      position: agjCalendars.length
    };


    agjCalendar['language'] = 'en';
    if (options['language'] === 'fr') {
      agjCalendar['language'] = 'fr';
    }


    agjCalendar['overwriteMonthOptions'] = true;
    if (options['overwriteMonthOptions'] === false) {
      agjCalendar['overwriteMonthOptions'] = false;
    }


    agjCalendar['overwriteDayOptions'] = true;
    if (options['overwriteDayOptions'] === false) {
      agjCalendar['overwriteDayOptions'] = false;
    }


    agjCalendar['allowBlankDates'] = false;
    if (options['allowBlankDates'] === true) {
      agjCalendar['allowBlankDates'] = true;
    }


    agjCalendar['startWeekOnMonday'] = false;
    if (options['startWeekOnMonday'] === true) {
      agjCalendar['startWeekOnMonday'] = true;
    }


    agjCalendar['allowRange'] = false;
    if (options['allowRange'] === true) {
      agjCalendar['allowRange'] = true;
    }


    agjCalendar['inputType'] = 'text';
    if (options['inputType'] === 'dropdown') {
      agjCalendar['inputType'] = 'dropdown';
    }


    agjCalendar['calendarCount'] = 1;
    switch (options['calendarCount']) {
      case 2:
      case 3:
        agjCalendar['calendarCount'] = options['calendarCount'];
        break;
    }


    agjCalendar['calendarDisplay'] = 'inline';
    switch (options['calendarDisplay']) {
      case 'modal':
      case 'full':
        agjCalendar['calendarDisplay'] = options['calendarDisplay'];
        break;
    }


    agjCalendar['dayNameFormat'] = 'short';
    switch (options['dayNameFormat']) {
      case 'medium':
      case 'full':
        agjCalendar['dayNameFormat'] = options['dayNameFormat'];
        break;
    }


    agjCalendar['dateFormat'] = 1;
    switch (options['dateFormat']) {
      case 2:
      case 3:
      case 4:
      case 5:
        agjCalendar['dateFormat'] = options['dateFormat'];
        break;
    }


    agjCalendar['autoSetEndDate'] = 'dates';
    switch (options['autoSetEndDate']) {
      case true: // this is here for backwards compatability
        agjCalendar['autoSetEndDate'] = 'always';
        break;

      case false: // this is here for backwards compatability
        agjCalendar['autoSetEndDate'] = 'never';
        break;

      case 'blanks':
      case 'always':
      case 'never':
        agjCalendar['autoSetEndDate'] = options['autoSetEndDate'];
        break;
    }


    agjCalendar['minimumDate'] = new Date();
    agjCalendar['minimumDate'].setHours(0, 0, 0, 0);
    if (regexPatterns[4].test(options['minimumDate'])) {
      agjCalendar['minimumDate'].setFullYear(
        options['minimumDate'].substring(0, 4),
        parseInt(options['minimumDate'].substring(5, 7), 10) - 1,
        options['minimumDate'].substring(8, 10)
      );
    } else if (options['minimumDate'] instanceof Date) {
      agjCalendar['minimumDate'].setFullYear(
        options['minimumDate'].getFullYear(),
        options['minimumDate'].getMonth(),
        options['minimumDate'].getDate()
      );
    }


    agjCalendar['maximumDate'] = new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    );
    agjCalendar['maximumDate'].setHours(23, 59, 59, 999);
    if (regexPatterns[4].test(options['maximumDate'])) {
      var maximumDate = new Date(
        options['maximumDate'].substring(0, 4),
        parseInt(options['maximumDate'].substring(5, 7), 10) - 1,
        options['maximumDate'].substring(8, 10)
      );

      if (maximumDate >= agjCalendar['minimumDate']) {
        agjCalendar['maximumDate'].setFullYear(
          maximumDate.getFullYear(),
          maximumDate.getMonth(),
          maximumDate.getDate()
        );
      }
    } else if (
      options['maximumDate'] instanceof Date &&
      options['maximumDate'] >= agjCalendar['minimumDate']
    ) {
      agjCalendar['maximumDate'].setFullYear(
        options['maximumDate'].getFullYear(),
        options['maximumDate'].getMonth(),
        options['maximumDate'].getDate()
      );
    }


    agjCalendar['defaultDate'] = new Date();
    if (
      regexPatterns[4].test(options['defaultDate']) ||
      options['defaultDate'] instanceof Date
    ) {
      var defaultDate = new Date();

      if (regexPatterns[4].test(options['defaultDate'])) {
        defaultDate.setFullYear(
          options['defaultDate'].substring(0, 4),
          parseInt(options['defaultDate'].substring(5, 7), 10) - 1,
          options['defaultDate'].substring(8, 10)
        );
      } else {
        defaultDate.setFullYear(
          options['defaultDate'].getFullYear(),
          options['defaultDate'].getMonth(),
          options['defaultDate'].getDate()
        );
      }

      if (
        defaultDate >= agjCalendar['minimumDate'] &&
        defaultDate <= agjCalendar['maximumDate']
      ) {
        agjCalendar['defaultDate'].setFullYear(
          defaultDate.getFullYear(),
          defaultDate.getMonth(),
          defaultDate.getDate()
        );
      }
    } else if (
      agjCalendar['allowBlankDates'] &&
      options['defaultDate'] === 'blank'
    ) {
      agjCalendar['defaultDate'] = 'blank';
    }


    agjCalendar['excludeDates'] = [];
    if (
      options['excludeDates'] &&
      options['excludeDates'] instanceof Array &&
      options['excludeDates'].length > 0
    ) {
      for (var i = 0; i < options['excludeDates'].length; i++) {
        var excludeDate = -1;

        if (regexPatterns[4].test(options['excludeDates'][i])) {
          excludeDate = new Date(
            options['excludeDates'][i].substring(0, 4),
            parseInt(options['excludeDates'][i].substring(5, 7), 10) - 1,
            options['excludeDates'][i].substring(8, 10)
          );
        } else if (options['excludeDates'][i] instanceof Date) {
          excludeDate = new Date(
            options['excludeDates'][i].getFullYear(),
            options['excludeDates'][i].getMonth(),
            options['excludeDates'][i].getDate()
          );
        }

        if (
          excludeDate !== -1 &&
          excludeDate >= agjCalendar['minimumDate'] &&
          excludeDate <= agjCalendar['maximumDate']
        ) {
          agjCalendar['excludeDates'].push(excludeDate);
        }
      }
    }


    agjCalendar['minimumRange'] = 0;
    agjCalendar['maximumRange'] = 0;
    agjCalendar['defaultRange'] = 0;

    if (agjCalendar['allowRange']) {
      var totalRange = 0;

      var rangeCheck = new Date(
        agjCalendar['minimumDate'].getFullYear(),
        agjCalendar['minimumDate'].getMonth(),
        agjCalendar['minimumDate'].getDate()
      );
      while (rangeCheck <= agjCalendar['maximumDate']) {
        totalRange++;
        rangeCheck.setFullYear(
          rangeCheck.getFullYear(),
          rangeCheck.getMonth(),
          rangeCheck.getDate() + 1
        );
      }

      agjCalendar['minimumRange'] = totalRange === 0 ? 0 : 1;
      if (
        !isNaN(options['minimumRange']) &&
        parseInt(options['minimumRange'], 10) >= 0 &&
        parseInt(options['minimumRange'], 10) <= totalRange
      ) {
        agjCalendar['minimumRange'] = options['minimumRange'];
      }

      agjCalendar['maximumRange'] = totalRange === 0 ? 0 : totalRange;
      if (
        !isNaN(options['maximumRange']) &&
        parseInt(options['maximumRange'], 10) >= 0 &&
        parseInt(options['maximumRange'], 10) <= totalRange &&
        parseInt(options['maximumRange'], 10) >= agjCalendar['minimumRange']
      ) {
        agjCalendar['maximumRange'] = options['maximumRange'];
      }

      agjCalendar['defaultRange'] = totalRange === 0 ? 0 : 1;
      if (!isNaN(options['defaultRange'])) {
        var defaultRange = parseInt(options['defaultRange'], 10);
        if (
          defaultRange >= agjCalendar['minimumRange'] &&
          defaultRange <= agjCalendar['maximumRange']
        ) {
          agjCalendar['defaultRange'] = defaultRange;
        }
      }


      agjCalendar['defaultEndDate'] =
        agjCalendar['defaultDate'] === 'blank' ?
        'blank' :
        new Date(
          agjCalendar['defaultDate'].getFullYear(),
          agjCalendar['defaultDate'].getMonth(),
          agjCalendar['defaultDate'].getDate() + agjCalendar['defaultRange']
        );
      if (
        regexPatterns[4].test(options['defaultEndDate']) ||
        options['defaultEndDate'] instanceof Date
      ) {
        var defaultEndDate = new Date();

        if (regexPatterns[4].test(options['defaultEndDate'])) {
          defaultEndDate.setFullYear(
            options['defaultEndDate'].substring(0, 4),
            parseInt(options['defaultEndDate'].substring(5, 7), 10) - 1,
            options['defaultEndDate'].substring(8, 10)
          );
        } else {
          defaultEndDate.setFullYear(
            options['defaultEndDate'].getFullYear(),
            options['defaultEndDate'].getMonth(),
            options['defaultEndDate'].getDate()
          );
        }

        if (
          defaultEndDate >= agjCalendar['minimumDate'] &&
          defaultEndDate <= agjCalendar['maximumDate']
        ) {
          agjCalendar['defaultEndDate'].setFullYear(
            defaultEndDate.getFullYear(),
            defaultEndDate.getMonth(),
            defaultEndDate.getDate()
          );
        }
      } else if (
        agjCalendar['allowBlankDates'] &&
        options['defaultEndDate'] === 'blank'
      ) {
        agjCalendar['defaultEndDate'] = 'blank';
      }
    }


    /**
     * The inputFocusEvent() function will handle events when an integration’s
     * input gains focus.
     * @param {object} event - The event object.
     * @returns {boolean} - Returns true to allow chaining.
     */
    var inputFocusEvent = function(event) {
      if (checkIfActive(agjCalendar['position'], event.data.isEnd)) {
        $.agjCalendar.deactivate();
      } else {
        activateCalendar(agjCalendar, event.data.isEnd);
      }
      return false;
    };

    var expanderElement = $(options['expanderSelector']);
    if (expanderElement.length > 0) {
      agjCalendar['expanderSelector'] = options['expanderSelector'];

      expanderElement.on('click', {
        isEnd: false
      }, inputFocusEvent);

      if (agjCalendar['allowRange']) {
        var endExpanderElement = $(options['endExpanderSelector']);
        if (endExpanderElement.length > 0) {
          agjCalendar['endExpanderSelector'] = options['endExpanderSelector'];

          endExpanderElement.on('click', {
            isEnd: true
          }, inputFocusEvent);
        }
      }
    }

    switch (agjCalendar['inputType']) {
      case 'text':
        var dateElement = $(options['dateSelector']);
        if (dateElement.length !== 1) {
          throwError(
            'Invalid `dateSelector` value: "' + options['dateSelector'] +
            '" (' + dateElement.length + ' elements found, 1 required)'
          );
          return false;
        } else {
          agjCalendar['dateSelector'] = options['dateSelector'];

          /**
           * The inputBlurEvent() function will handle events when an
           * integration’s input loses focus.
           * @param {object} event - The event object.
           * @returns {boolean} - Returns true to allow chaining.
           */
          var inputBlurEvent = function(event) {
            setTimeout(function() {
              switch (agjCalendar['calendarDisplay']) {
                case 'full':
                case 'modal':
                  break;

                default:
                  if (!lastClickWasOnAgjCalendar) {
                    $.agjCalendar.deactivate();
                    if (event.data.isEnd) {
                      autoSetEndDate(agjCalendar);
                    }
                  }
                  break;
              }
            }, 1);
            return true;
          };

          var originalValue = dateElement.val();

          dateElement
            .on('blur', {
              isEnd: false
            }, inputBlurEvent)
            .on('focus', {
              isEnd: false
            }, inputFocusEvent);

          setDate(agjCalendar, agjCalendar['defaultDate']);
          if (originalValue.length > 0) {
            dateElement.val(originalValue);
          }

          if (agjCalendar['allowRange']) {
            var endDateElement = $(options['endDateSelector']);
            if (endDateElement.length !== 1) {
              throwError(
                'Invalid `endDateSelector` value: "' +
                options['endDateSelector'] + '" (' + endDateElement.length +
                ' elements found, 1 required)'
              );
              return false;
            } else {
              agjCalendar['endDateSelector'] = options['endDateSelector'];

              originalValue = endDateElement.val();

              endDateElement
                .on('blur', {
                  isEnd: true
                }, inputBlurEvent)
                .on('focus', {
                  isEnd: true
                }, inputFocusEvent);

              setDate(agjCalendar, agjCalendar['defaultEndDate'], true);
              if (originalValue.length > 0) {
                endDateElement.val(originalValue);
              }
            }
          }
        }
        break;

      case 'dropdown':
        var monthElement = $(options['monthSelector']);
        if (monthElement.length !== 1) {
          throwError(
            'Invalid `monthSelector` value: "' +
            options['monthSelector'] + '" (' + monthElement.length +
            ' elements found, 1 required)'
          );
          return false;
        } else {
          var dayElement = $(options['daySelector']);
          if (dayElement.length !== 1) {
            throwError(
              'Invalid `daySelector` value: "' + options['daySelector'] +
              '" (' + dayElement.length + ' elements found, 1 required)'
            );
            return false;
          } else {
            agjCalendar['monthSelector'] = options['monthSelector'];
            agjCalendar['daySelector'] = options['daySelector'];

            /**
             * The inputBlurEvent() function will handle events when an
             * integration’s input loses focus.
             * @param {object} event - The event object.
             * @returns {boolean} - Returns true to allow chaining.
             */

            /**
             * The monthChangeEvent() function will handle events when an
             * integration’s month input changes.
             * @param {object} event - The event object.
             * @returns {void}
             */
            var monthChangeEvent = function(event) {
              updateDayElement(agjCalendar, event.data.isEnd);
              if (!event.data.isEnd) {
                autoSetEndDate(agjCalendar);
              }
            };

            var originalMonthValue = monthElement.val();
            var originalDayValue = dayElement.val();

            monthElement.on('change', {
              isEnd: false
            }, monthChangeEvent);

            updateMonthElement(agjCalendar);
            updateDayElement(agjCalendar);

            if (
              originalMonthValue !== null &&
              originalMonthValue.length > 0 &&
              monthElement.find(
                'option[value=' + originalMonthValue + ']'
              ).length > 0
            ) {
              monthElement.val(originalMonthValue).trigger('change');
            }

            if (
              originalDayValue !== null &&
              originalDayValue.length > 0 &&
              dayElement.find(
                'option[value=' + originalDayValue + ']'
              ).length > 0
            ) {
              dayElement.val(originalDayValue).trigger('change');
            }

            if (agjCalendar['allowRange']) {
              var endMonthElement = $(options['endMonthSelector']);
              if (endMonthElement.length !== 1) {
                throwError(
                  'Invalid `endMonthSelector` value: "' +
                  options['endMonthSelector'] + '" (' +
                  endMonthElement.length + ' elements found, 1 required)'
                );
                return false;
              } else {
                var endDayElement = $(options['endDaySelector']);
                if (endDayElement.length !== 1) {
                  throwError(
                    'Invalid `endDaySelector` value: "' +
                    options['endDaySelector'] + '" (' + endDayElement.length +
                    ' elements found, 1 required)'
                  );
                  return false;
                } else {
                  agjCalendar['endMonthSelector'] = options['endMonthSelector'];
                  agjCalendar['endDaySelector'] = options['endDaySelector'];

                  var originalMonthValue = endMonthElement.val();
                  var originalDayValue = endDayElement.val();

                  dayElement.on('change', function() {
                    autoSetEndDate(agjCalendar);
                    updateMonthElement(agjCalendar, true);
                    updateDayElement(agjCalendar, true);
                  });

                  endMonthElement.on('change', {
                    isEnd: true
                  }, monthChangeEvent);

                  updateMonthElement(agjCalendar, true);
                  updateDayElement(agjCalendar, true);

                  if (
                    originalMonthValue !== null &&
                    originalMonthValue.length > 0 &&
                    endMonthElement.find(
                      'option[value=' + originalMonthValue + ']'
                    ).length > 0
                  ) {
                    endMonthElement.val(originalMonthValue).trigger('change');
                  }

                  if (
                    originalDayValue !== null &&
                    originalDayValue.length > 0 &&
                    endDayElement.find(
                      'option[value=' + originalDayValue + ']'
                    ).length > 0
                  ) {
                    endDayElement.val(originalDayValue).trigger('change');
                  }
                }
              }
            }
          }
        }

        break;
    }


    // the integration was successfully initialized, save the configuration in
    // the agjCalendars global
    agjCalendars.push(agjCalendar);
    return true;
  };

  /**
   * The $.agjCalendar.deactivate will deactivate/hide all date pickers.
   * @returns {void}
   */
  $.agjCalendar.deactivate = function() {
    lastClickWasOnAgjCalendar = false;

    var calendarElement = $('#agjCalendar');
    if (calendarElement.length > 0) {
      $('body').removeClass('agjCalendar-active');
      calendarElement.attr('data-active', -1);
      $('.agjCalendar-active-input').removeClass('agjCalendar-active-input');
    }

    hideModalBackground();
  };

  /**
   * The $.agjCalendar.isActive will let you know if a date picker is active.
   * @returns {boolean} - Returns true if the date picker is active or false if
   * it’s not.
   */
  $.agjCalendar.isActive = function() {
    return $('body').hasClass('agjCalendar-active');
  };

  /**
   * The previous name of the agjCalendar plugin was ctcCalendar so this
   * function acts solely as an alias to support backwards compatability.
   * @param {object} options - A JSON object of confiuguration options.
   * @returns {boolean} - Returns true on success or false on error.
   * @deprecated The plugin’s name changed to agjCalendar for version 1.0.0.
   */
  $.ctcCalendar = function(options) {
    return $.agjCalendar(options);
  };
})(jQuery);
