/**
 * QUnit test suite of agjCalendar v1.2.0.
 *
 * Copyright (c) 2013-2024 Andrew G. Johnson <andrew@andrewgjohnson.com>
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
 * @copyright 2013-2024 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @license MIT
 * @see {@link https://github.com/andrewgjohnson/agjCalendar GitHub Repository}
 * @see {@link https://agjCalendar.agjjQuery.org/ Online Documentation}
 * @author Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @version 1.2.0
 */

/**
 * The agjCalendar plugin test suite is built entirely in an IIFE (immediately
 * invoked function expression) to avoid polluting the global namespace.
 * @param {Function} $ - A reference to the global jQuery object.
 */
(function($) {
  // all included language ISO 639-1 codes
  var includedLanguages = [
    'en',
    'ar',
    'bn',
    'de',
    'es',
    'fr',
    'he',
    'hi',
    'it',
    'ja',
    'ko',
    'mr',
    'pa',
    'pt',
    'ru',
    'te',
    'tr',
    'ur',
    'vi',
    'zh'
  ];

  // sample variables to be passed through the parameters of the functions we
  // want to test
  var sampleVariables = {
    'String':                        '~',
    'Empty String':                  '',
    'Unicode String':                '\\u2014', // em dash (—)
    'Emoji String':                  '😊',
    'Multicharacter Emoji String':   '🏳️‍🌈',
    'Carriage Return Line Break':    '\r',
    'Line Feed/New Line Line Break': '\n',
    'Line Break':                    '\r\n',
    'String Object':                 String,
    'Symbol Object':                 Symbol,
    'Boolean':                       true,
    'Boolean False':                 false,
    'Boolean Object':                Boolean,
    'Null':                          null,
    'Zero':                          0,
    'Integer':                       2,
    'Negative Integer':              -2,
    'Maximum Safe Integer':          Number.MAX_SAFE_INTEGER,
    'Minimum Safe Integer':          Number.MIN_SAFE_INTEGER,
    'Maximum Number':                Number.MAX_VALUE,
    'Minimum Number':                Number.MIN_VALUE,
    'Infinity':                      Number.POSITIVE_INFINITY,
    'Negative Infinity':             Number.NEGATIVE_INFINITY,
    'Infinity Object':               Infinity,
    'Decimal':                       1.3,
    'Negative Decimal':              -1.3,
    'Fraction':                      1 / 3,
    'Pi':                            Math.PI,
    'NaN':                           NaN,
    'Number Object':                 Number,
    'BigInt Object':                 BigInt,
    'Date':                          new Date(),
    'Recent Date':                   new Date(2000, 0, 2, 1, 10, 11, 111),
    'Medieval Date':                 new Date(900, 1, 16, 5, 20, 22, 222),
    'Ancient Date':                  new Date(-100, 2, 22, 10, 30, 33, 333),
    'Future Date':                   new Date(20000, 11, 30, 15, 40, 44, 444),
    'Object Object':                 Object,
    'Error Object':                  Error,
    'EvalError Object':              EvalError,
    'RangeError Object':             RangeError,
    'ReferenceError Object':         ReferenceError,
    'SyntaxError Object':            SyntaxError,
    'TypeError Object':              TypeError,
    'URIError Object':               URIError,
    'jQuery Global Object':          jQuery,
    'QUnit Global Object':           QUnit,
    'Date Object':                   Date,
    'Math Object':                   Math,
    'Navigator Object':              navigator,
    'Screen Object':                 screen,
    'History Object':                history,
    'Location Object':               location,
    'Frames Object':                 frames,
    'Self Object':                   self,
    'Parent Object':                 parent,
    'Top Object':                    top,
    'Window Object':                 window,
    'Document Object':               document,
    'DOM Element':                   document.createElement('div'),
    'Element Object':                Element,
    'HTMLElement Object':            HTMLElement,
    'Node Object':                   Node,
    'NodeList Object':               NodeList,
    'HTMLCollection Object':         HTMLCollection,
    'Event Object':                  Event,
    'MouseEvent Object':             MouseEvent,
    'KeyboardEvent Object':          KeyboardEvent,
    'CustomEvent Object':            CustomEvent,
    'Array':                         [],
    'Array Object':                  Array,
    'Int8Array Object':              Int8Array,
    'Uint8Array Object':             Uint8Array,
    'Uint8ClampedArray Object':      Uint8ClampedArray,
    'Int16Array Object':             Int16Array,
    'Uint16Array Object':            Uint16Array,
    'Int32Array Object':             Int32Array,
    'Uint32Array Object':            Uint32Array,
    'Float32Array Object':           Float32Array,
    'Float64Array Object':           Float64Array,
    'BigInt64Array Object':          BigInt64Array,
    'BigUint64Array Object':         BigUint64Array,
    'ArrayBuffer Object':            ArrayBuffer,
    /*
    'SharedArrayBuffer Object':      SharedArrayBuffer,
    'Generator Object':              Generator,
    'GeneratorFunction Object':      GeneratorFunction,
    'AsyncFunction Object':          AsyncFunction,
    */
    'Atomics Object':                Atomics,
    'DataView Object':               DataView,
    'JSON Object':                   JSON,
    'Promise Object':                Promise,
    'Reflect Object':                Reflect,
    'Proxy Object':                  Proxy,
    'Object':                        {},
    'Function':                      function() {},
    'Function Object':               Function,
    'Regular Expression':            /^[a-z]+$/,
    'Regular Expression RegExp':     new RegExp('^[a-z]+$'),
    'RegExp Object':                 RegExp,
    'XMLHttpRequest Object':         XMLHttpRequest,
    'WebSocket Object':              WebSocket,
    'Worker Object':                 Worker,
    'ServiceWorker Object':          ServiceWorker,
    'Map Object':                    Map,
    'Set Object':                    Set,
    'WeakMap Object':                WeakMap,
    'WeakSet Object':                WeakSet,
    'Undefined':                     undefined,
    'Global This':                   globalThis
  };

  // sample dates and a variety of expected output for each to test
  var sampleDates = [
    {
      label:       'A recent date',
      date:        sampleVariables['Recent Date'],
      dateFormats: {
        'm/d/Y':  '01/02/2000',
        'M j, Y': 'Jan 2, 2000',
        'd/m/Y':  '02/01/2000',
        'Y-m-d':  '2000-01-02',
        'j F Y':  '2 January 2000',
        'c':      '2000-01-02T01:10:11',
        'r':      'Sun, 02 Jan 2000 01:10:11 +0000'
      },
      dateFormatCharacters: {
        a: 'am',
        A: 'AM',
        B: '298',
        c: '2000-01-02T01:10:11',
        d: '02',
        D: 'Sun',
        F: 'January',
        g: '1',
        G: '1',
        h: '01',
        H: '01',
        i: '10',
        j: '2',
        l: 'Sunday',
        L: '1',
        m: '01',
        M: 'Jan',
        n: '1',
        N: '7',
        o: '1999',
        r: 'Sun, 02 Jan 2000 01:10:11 +0000',
        s: '11',
        S: 'nd',
        t: '31',
        u: '111000',
        U: '946797011',
        v: '111',
        w: '0',
        W: '52',
        x: '2000',
        X: '+2000',
        y: '00',
        Y: '2000',
        z: '1'
      }
    },
    {
      label:       'A medieval date',
      date:        sampleVariables['Medieval Date'],
      dateFormats: {
        'm/d/Y':  '02/16/0900',
        'M j, Y': 'Feb 16, 0900',
        'd/m/Y':  '16/02/0900',
        'Y-m-d':  '0900-02-16',
        'j F Y':  '16 February 0900',
        'c':      '0900-02-16T05:20:22',
        'r':      'Tue, 16 Feb 0900 05:20:22 +0000'
      },
      dateFormatCharacters: {
        a: 'am',
        A: 'AM',
        B: '492',
        c: '0900-02-16T05:20:22',
        d: '16',
        D: 'Tue',
        F: 'February',
        g: '5',
        G: '5',
        h: '05',
        H: '05',
        i: '20',
        j: '16',
        l: 'Tuesday',
        L: '0',
        m: '02',
        M: 'Feb',
        n: '2',
        N: '2',
        o: '900',
        r: 'Tue, 16 Feb 0900 05:20:22 +0000',
        s: '22',
        S: 'th',
        t: '28',
        u: '222000',
        U: '-33761880662',
        v: '222',
        w: '2',
        W: '7',
        x: '900',
        X: '+900',
        y: '00',
        Y: '0900',
        z: '46'
      }
    },
    {
      label:       'An ancient date',
      date:        sampleVariables['Ancient Date'],
      dateFormats: {
        'm/d/Y':  '03/22/-0100',
        'M j, Y': 'Mar 22, -0100',
        'd/m/Y':  '22/03/-0100',
        'Y-m-d':  '-0100-03-22',
        'j F Y':  '22 March -0100',
        'c':      '-0100-03-22T10:30:33',
        'r':      'Thu, 22 Mar -0100 10:30:33 +0000'
      },
      dateFormatCharacters: {
        a: 'am',
        A: 'AM',
        B: '707',
        c: '-0100-03-22T10:30:33',
        d: '22',
        D: 'Thu',
        F: 'March',
        g: '10',
        G: '10',
        h: '10',
        H: '10',
        i: '30',
        j: '22',
        l: 'Thursday',
        L: '0',
        m: '03',
        M: 'Mar',
        n: '3',
        N: '4',
        o: '-100',
        r: 'Thu, 22 Mar -0100 10:30:33 +0000',
        s: '33',
        S: 'nd',
        t: '31',
        u: '333000',
        U: '-65315919651',
        v: '333',
        w: '4',
        W: '12',
        x: '-100',
        X: '-100',
        y: '00',
        Y: '-0100',
        z: '80'
      }
    },
    {
      label:       'A future date',
      date:        sampleVariables['Future Date'],
      dateFormats: {
        'm/d/Y':  '12/30/20000',
        'M j, Y': 'Dec 30, 20000',
        'd/m/Y':  '30/12/20000',
        'Y-m-d':  '20000-12-30',
        'j F Y':  '30 December 20000',
        'c':      '20000-12-30T15:40:44',
        'r':      'Sat, 30 Dec 20000 15:40:44 +0000'
      },
      dateFormatCharacters: {
        a: 'pm',
        A: 'PM',
        B: '903',
        c: '20000-12-30T15:40:44',
        d: '30',
        D: 'Sat',
        F: 'December',
        g: '3',
        G: '15',
        h: '03',
        H: '15',
        i: '40',
        j: '30',
        l: 'Saturday',
        L: '1',
        m: '12',
        M: 'Dec',
        n: '12',
        N: '6',
        o: '20000',
        r: 'Sat, 30 Dec 20000 15:40:44 +0000',
        s: '44',
        S: 'th',
        t: '31',
        u: '444000',
        U: '569003348444',
        v: '444',
        w: '6',
        W: '52',
        x: '+20000',
        X: '+20000',
        y: '00',
        Y: '20000',
        z: '364'
      }
    }
  ];

  // elements to be added/removed programatically for testing integrations
  var integrationElements = {
    'agjCalendar-start-date':  'text',
    'agjCalendar-end-date':    'text',
    'agjCalendar-start-month': 'dropdown',
    'agjCalendar-end-month':   'dropdown',
    'agjCalendar-start-day':   'dropdown',
    'agjCalendar-end-day':     'dropdown',
    'agjCalendar-start-icon':  'expander',
    'agjCalendar-end-icon':    'expander'
  };

  /**
   * The addIntegrationElements() function will add the integration elements for
   * testing.
   * @returns {void}
   */
  var addIntegrationElements = function() {
    for (var elementId in integrationElements) {
      if (
        Object.prototype.hasOwnProperty.call(integrationElements, elementId)
      ) {
        var element;

        switch (integrationElements[elementId]) {
          case 'text':
            element = document.createElement('input');
            element.type = 'text';
            break;

          case 'dropdown':
            element = document.createElement('select');
            break;

          case 'expander':
          default:
            element = document.createElement('span');
            break;
        }

        element.id = elementId;
        document.getElementsByTagName('body')[0].appendChild(element);
      }
    }
  };

  /**
   * The removeIntegrationElements() function will remove the integration
   * elements for testing.
   * @returns {void}
   */
  var removeIntegrationElements = function() {
    for (var elementId in integrationElements) {
      if (
        Object.prototype.hasOwnProperty.call(integrationElements, elementId)
      ) {
        var element = document.getElementById(elementId);
        if (element !== null) {
          element.parentNode.removeChild(element);
        }
      }
    }
  };

  /**
   * The getUrlParameter() function will return a URL parameter value.
   * @param {string} name - The name of the URL parmater whose value should be
   * returned.
   * @returns {number} - Returns the value of the URL parameter.
   */
  var getUrlParameter = function(name) {
    name = name.replace(/[\\[]/, '\\[').replace(/[\\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ?
      null :
      decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  /**
   * The assertAgjCalendarIntegration() function will run a series of assertions
   * on an agjCalendar integration using the integration options passed via
   * parameter.
   * @param {object} assert - The assert object to run the assertions on.
   * @param {object} integrationOptions - A JSON object of configuration
   * options.
   * @returns {number} - Returns the agjCalendar position if the integration
   * succeeds or -1 if the integration fails.
   */
  var assertAgjCalendarIntegration = function(assert, integrationOptions) {
    var integration = $.agjCalendar(integrationOptions);

    assert.notStrictEqual(
      integration,
      -1,
      'Successfully initialize an integration (return value !== -1) — ' +
      JSON.stringify(integrationOptions)
    );

    assert.strictEqual(
      typeof integration,
      'number',
      'Successfully initialize an integration (return value is a number)'
    );

    assert.ok(
      integration >= 0,
      'Successfully initialize an integration (return value is >= 0)'
    );

    assert.ok(
      $.agjCalendar.disable(integration),
      'Successfully disable an integration'
    );

    assert.notOk(
      $.agjCalendar.disable(integration),
      'Fail to disable an integration a second time'
    );

    return integration;
  };

  /**
   * QUnit global events.
   */
  QUnit.begin(addIntegrationElements);
  QUnit.done(removeIntegrationElements);

  /**
   * $.agjCalendar() module.
   */
  QUnit.module(
    '$.agjCalendar() module',
    function(hooks) {
      QUnit.test(
        'Test sample variables in first parameter',
        function(assert) {
          for (var variableType in sampleVariables) {
            if (
              Object.prototype.hasOwnProperty.call(
                sampleVariables,
                variableType
              )
            ) {
              assert.strictEqual(
                $.agjCalendar(sampleVariables[variableType]),
                -1,
                variableType + ' sample variable'
              );
            }
          }
        }
      );

      QUnit.test(
        'Test missing first parameter',
        function(assert) {
          assert.strictEqual(
            $.agjCalendar(),
            -1,
            'Fail to initialize integration with no parameter'
          );
        }
      );

      QUnit.test(
        'Test integrations using all option values',
        function(assert) {
          /* eslint-disable max-len */
          var integrationOptions = [
            // `allowBlankDates` option
            {allowBlankDate: true, dateSelector: '#agjCalendar-start-date'},
            {allowBlankDate: true, dateSelector: '#agjCalendar-start-date', defaultDay: 'blank'},
            {allowBlankDate: true, dateSelector: '#agjCalendar-start-date', defaultDay: new Date()},
            {allowBlankDate: true, allowRange: true, dateSelector: '#agjCalendar-start-date', defaultDay: 'blank', defaultEndDate: 'blank', endDateSelector: '#agjCalendar-end-date'},
            {allowBlankDate: true, allowRange: true, dateSelector: '#agjCalendar-start-date', defaultDay: new Date(), defaultEndDate: 'blank', endDateSelector: '#agjCalendar-end-date'},
            {allowBlankDate: true, allowRange: true, dateSelector: '#agjCalendar-start-date', defaultDay: 'blank', defaultEndDate: new Date(), endDateSelector: '#agjCalendar-end-date'},
            {allowBlankDate: true, allowRange: true, dateSelector: '#agjCalendar-start-date', defaultDay: new Date(), defaultEndDate: new Date(), endDateSelector: '#agjCalendar-end-date'},
            {allowBlankDate: false, dateSelector: '#agjCalendar-start-date'},
            // `allowRange` option
            {allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            {allowRange: false, dateSelector: '#agjCalendar-start-date'},
            // `autoBlur` option
            {autoBlur: true, dateSelector: '#agjCalendar-start-date'},
            {autoBlur: false, dateSelector: '#agjCalendar-start-date'},
            // `autoSetEndDate` option
            {autoSetEndDate: 'blanks', allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            {autoSetEndDate: 'dates', allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            {autoSetEndDate: 'always', allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            {autoSetEndDate: 'never', allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            // `calendarCount` option
            {calendarCount: 1, dateSelector: '#agjCalendar-start-date'},
            {calendarCount: 2, dateSelector: '#agjCalendar-start-date'},
            {calendarCount: 3, dateSelector: '#agjCalendar-start-date'},
            // `calendarDisplay` option
            {calendarDisplay: 'inline', dateSelector: '#agjCalendar-start-date'},
            {calendarDisplay: 'modal', dateSelector: '#agjCalendar-start-date'},
            {calendarDisplay: 'full', dateSelector: '#agjCalendar-start-date'},
            // `calendarSize` option
            {calendarSize: 'small', dateSelector: '#agjCalendar-start-date'},
            {calendarSize: 'medium', dateSelector: '#agjCalendar-start-date'},
            {calendarSize: 'large', dateSelector: '#agjCalendar-start-date'},
            // `dateFormat` option
            {dateFormat: 'm/d/Y', dateSelector: '#agjCalendar-start-date'},
            {dateFormat: 'M j, Y', dateSelector: '#agjCalendar-start-date'},
            {dateFormat: 'd/m/Y', dateSelector: '#agjCalendar-start-date'},
            {dateFormat: 'Y-m-d', dateSelector: '#agjCalendar-start-date'},
            {dateFormat: 'j F Y', dateSelector: '#agjCalendar-start-date'},
            // `dateFormatDate` option
            {dateFormatDate: 'j', dateSelector: '#agjCalendar-start-date'},
            {dateFormatDate: 'd', dateSelector: '#agjCalendar-start-date'},
            {dateFormatDate: 'z', dateSelector: '#agjCalendar-start-date'},
            // `dateFormatDateTooltip` option
            {dateFormatDateTooltip: 'm/d/Y', dateSelector: '#agjCalendar-start-date'},
            {dateFormatDateTooltip: 'M j, Y', dateSelector: '#agjCalendar-start-date'},
            {dateFormatDateTooltip: 'd/m/Y', dateSelector: '#agjCalendar-start-date'},
            {dateFormatDateTooltip: 'Y-m-d', dateSelector: '#agjCalendar-start-date'},
            {dateFormatDateTooltip: 'j F Y', dateSelector: '#agjCalendar-start-date'},
            // `dateFormatDayInput` option
            {dateFormatDayInput: 'j', inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day'},
            {dateFormatDayInput: 'd', inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day'},
            // `dateFormatDayOfWeekTooltip` option
            {dateFormatDayOfWeekTooltip: 'l', dateSelector: '#agjCalendar-start-date'},
            {dateFormatDayOfWeekTooltip: 'D', dateSelector: '#agjCalendar-start-date'},
            {dateFormatDayOfWeekTooltip: 'N', dateSelector: '#agjCalendar-start-date'},
            {dateFormatDayOfWeekTooltip: 'w', dateSelector: '#agjCalendar-start-date'},
            // `dateFormatMonthDropdown` option
            {dateFormatMonthDropdown: 'M Y', dateSelector: '#agjCalendar-start-date'},
            {dateFormatMonthDropdown: 'm Y', dateSelector: '#agjCalendar-start-date'},
            {dateFormatMonthDropdown: 'F Y', dateSelector: '#agjCalendar-start-date'},
            // `dateFormatMonthInput` option
            {dateFormatMonthInput: 'M Y', inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day'},
            {dateFormatMonthInput: 'm Y', inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day'},
            {dateFormatMonthInput: 'F Y', inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day'},
            // `dateFormatMonthLabel` option
            {dateFormatMonthLabel: 'M Y', dateSelector: '#agjCalendar-start-date'},
            {dateFormatMonthLabel: 'm Y', dateSelector: '#agjCalendar-start-date'},
            {dateFormatMonthLabel: 'F Y', dateSelector: '#agjCalendar-start-date'},
            // `dateSelector` option
            {dateSelector: '#agjCalendar-start-date'},
            // `dayNameEllipsis` option
            {dayNameEllipsis: true, dateSelector: '#agjCalendar-start-date'},
            {dayNameEllipsis: false, dateSelector: '#agjCalendar-start-date'},
            // `dayNameFormat` option
            {dayNameFormat: 'short', dateSelector: '#agjCalendar-start-date'},
            {dayNameFormat: 'abbreviated', dateSelector: '#agjCalendar-start-date'},
            {dayNameFormat: 'full', dateSelector: '#agjCalendar-start-date'},
            // `daySelector` option
            {daySelector: '#agjCalendar-start-day', inputType: 'dropdown', monthSelector: '#agjCalendar-start-month'},
            // `defaultDate` option
            {defaultDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1), dateSelector: '#agjCalendar-start-date'},
            {defaultDate: $.agjCalendar.dateToString(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1), 'Y-m-d'), dateSelector: '#agjCalendar-start-date'},
            // `defaultEndDate` option
            {defaultEndDate: new Date(), allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            {defaultEndDate: $.agjCalendar.dateToString(new Date(), 'Y-m-d'), allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            // `defaultRange` option
            {defaultRange: 0, allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            {defaultRange: 1, allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            {defaultRange: 365, allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            // `endDateSelector` option
            {endDateSelector: '#agjCalendar-end-date', allowRange: true, dateSelector: '#agjCalendar-start-date'},
            // `endDaySelector` option
            {endDaySelector: '#agjCalendar-end-day', allowRange: true, inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day', endMonthSelector: '#agjCalendar-end-month'},
            // `endExpanderSelector` option'
            {endExpanderSelector: '#agjCalendar-end-icon', allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            // `endMonthSelector` option
            {endMonthSelector: '#agjCalendar-end-month', allowRange: true, inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day', endDaySelector: '#agjCalendar-end-day'},
            // `excludeDates` option
            {excludeDates: [], inputType: 'text', dateSelector: '#agjCalendar-start-date'},
            {excludeDates: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)], inputType: 'text', dateSelector: '#agjCalendar-start-date'},
            // `expanderSelector` option
            {expanderSelector: '#agjCalendar-start-icon', dateSelector: '#agjCalendar-start-date'},
            // `inputType` option
            {inputType: 'text', dateSelector: '#agjCalendar-start-date'},
            {inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day'},
            // `language` option
            {language: '', dateSelector: '#agjCalendar-start-date'},
            {language: 'en', dateSelector: '#agjCalendar-start-date'},
            {language: 'ar', dateSelector: '#agjCalendar-start-date'},
            {language: 'bn', dateSelector: '#agjCalendar-start-date'},
            {language: 'de', dateSelector: '#agjCalendar-start-date'},
            {language: 'es', dateSelector: '#agjCalendar-start-date'},
            {language: 'fr', dateSelector: '#agjCalendar-start-date'},
            {language: 'he', dateSelector: '#agjCalendar-start-date'},
            {language: 'hi', dateSelector: '#agjCalendar-start-date'},
            {language: 'it', dateSelector: '#agjCalendar-start-date'},
            {language: 'ja', dateSelector: '#agjCalendar-start-date'},
            {language: 'ko', dateSelector: '#agjCalendar-start-date'},
            {language: 'mr', dateSelector: '#agjCalendar-start-date'},
            {language: 'pa', dateSelector: '#agjCalendar-start-date'},
            {language: 'pt', dateSelector: '#agjCalendar-start-date'},
            {language: 'ru', dateSelector: '#agjCalendar-start-date'},
            {language: 'te', dateSelector: '#agjCalendar-start-date'},
            {language: 'tr', dateSelector: '#agjCalendar-start-date'},
            {language: 'ur', dateSelector: '#agjCalendar-start-date'},
            {language: 'vi', dateSelector: '#agjCalendar-start-date'},
            {language: 'zh', dateSelector: '#agjCalendar-start-date'},
            // `maximumDate` option
            {maximumDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()), dateSelector: '#agjCalendar-start-date'},
            {maximumDate: $.agjCalendar.dateToString(new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()), 'Y-m-d'), dateSelector: '#agjCalendar-start-date'},
            // `maximumRange` option
            {maximumRange: 0, allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            {maximumRange: 1, allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            {maximumRange: 365, allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            // `minimumDate` option
            {minimumDate: new Date(), dateSelector: '#agjCalendar-start-date'},
            {minimumDate: $.agjCalendar.dateToString(new Date(), 'Y-m-d'), dateSelector: '#agjCalendar-start-date'},
            // `minimumRange` option
            {minimumRange: 0, allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            {minimumRange: 1, allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            {minimumRange: 365, allowRange: true, dateSelector: '#agjCalendar-start-date', endDateSelector: '#agjCalendar-end-date'},
            // `monthSelector` option
            {monthSelector: '#agjCalendar-start-month', inputType: 'dropdown', daySelector: '#agjCalendar-start-day'},
            // `overwriteDayOptions` option
            {overwriteDayOptions: true, inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day'},
            {overwriteDayOptions: false, inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day'},
            // `overwriteMonthOptions` option
            {overwriteMonthOptions: true, inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day'},
            {overwriteMonthOptions: false, inputType: 'dropdown', monthSelector: '#agjCalendar-start-month', daySelector: '#agjCalendar-start-day'},
            // `startWeekOnMonday` option
            {startWeekOnMonday: true, dateSelector: '#agjCalendar-start-date'},
            {startWeekOnMonday: false, dateSelector: '#agjCalendar-start-date'},
            // `theme` option
            {theme: '', dateSelector: '#agjCalendar-start-date'},
            {theme: 'red', dateSelector: '#agjCalendar-start-date'},
            {theme: 'orange', dateSelector: '#agjCalendar-start-date'},
            {theme: 'yellow', dateSelector: '#agjCalendar-start-date'},
            {theme: 'green', dateSelector: '#agjCalendar-start-date'},
            {theme: 'cyan', dateSelector: '#agjCalendar-start-date'},
            {theme: 'blue', dateSelector: '#agjCalendar-start-date'},
            {theme: 'purple', dateSelector: '#agjCalendar-start-date'},
            {theme: 'pink', dateSelector: '#agjCalendar-start-date'},
            {theme: 'custom-xxx', dateSelector: '#agjCalendar-start-date'},
            {theme: 'invalid', dateSelector: '#agjCalendar-start-date'},
            // `translations` option
            {translations: {}, dateSelector: '#agjCalendar-start-date'},
            {translations: {hideCalendar: 'x'}, dateSelector: '#agjCalendar-start-date'},
            {translations: {invalid: '~'}, dateSelector: '#agjCalendar-start-date'}
          ];
          /* eslint-enable max-len */

          if (integrationOptions.length > 0) {
            // remove integration elements then fail to intialize agjCalendar
            // without the elements then readd them
            removeIntegrationElements();
            assert.strictEqual(
              $.agjCalendar(integrationOptions[0]),
              -1,
              'Fail to initialize an integration without integration elements'
            );
            addIntegrationElements();

            for (var i = 0; i < integrationOptions.length; i++) {
              assertAgjCalendarIntegration(assert, integrationOptions[i]);
            }
          }
        }
      );

      if (getUrlParameter('pairwise') === 'enabled') {
        QUnit.test(
          'Test many possible integrations (pairwise)',
          function(assert) {
            var integrationOptions = [];
            var integrationOptionValues = [
              {
                name:    'allowBlankDates',
                values:  [true, false],
                default: false
              },
              {
                name:    'allowRange',
                values:  [true, false],
                default: false
              },
              {
                name:    'calendarDisplay',
                values:  ['inline', 'modal', 'full'],
                default: 'inline'
              },
              {
                name:    'dateFormat',
                values:  ['m/d/Y', 'M j, Y', 'd/m/Y', 'Y-m-d', 'j F Y'],
                default: 'm/d/Y'
              },
              {
                name:    'dateFormatDateTooltip',
                values:  ['m/d/Y', 'M j, Y', 'd/m/Y', 'Y-m-d', 'j F Y'],
                default: 'm/d/Y'
              },
              {
                name:    'dateFormatDayOfWeekTooltip',
                values:  ['l', 'D', 'N', 'w'],
                default: 'l'
              },
              {
                name:    'dateFormatMonthDropdown',
                values:  ['M Y', 'm Y', 'F Y'],
                default: 'M Y'
              },
              {
                name:    'dateFormatMonthLabel',
                values:  ['M Y', 'm Y', 'F Y'],
                default: 'M Y'
              },
              {
                name:    'dayNameEllipsis',
                values:  [true, false],
                default: true
              },
              {
                name:    'dayNameFormat',
                values:  ['short', 'abbreviated', 'full'],
                default: 'short'
              },
              {
                name:    'defaultDate',
                values:  ['blank', '2000-01-01', new Date()],
                default: new Date()
              },
              {
                name:    'inputType',
                values:  ['text', 'dropdown'],
                default: 'text'
              },
              {
                name:    'language',
                values:  includedLanguages,
                default: 'en'
              },
              {
                name:   'maximumDate',
                values: [
                  'blank',
                  '2001-01-01',
                  new Date(
                    new Date().getFullYear() + 1,
                    new Date().getMonth(),
                    new Date().getDate()
                  )
                ],
                default: new Date(
                  new Date().getFullYear() + 1,
                  new Date().getMonth(),
                  new Date().getDate()
                )
              },
              {
                name:    'minimumDate',
                values:  ['blank', '2000-01-01', new Date()],
                default: new Date()
              },
              {
                name:    'startWeekOnMonday',
                values:  [true, false],
                default: false
              },
              {
                name:   'theme',
                values: [
                  '',
                  'red',
                  'orange',
                  'yellow',
                  'green',
                  'cyan',
                  'blue',
                  'purple',
                  'pink',
                  'custom-x'
                ],
                default: ''
              },
              {
                name:    'useExpanderElements',
                values:  [true, false],
                default: false
              }
            ];
            var integrationOptionNonFullValues = [
              {
                name:    'calendarCount',
                values:  [1, 2, 3],
                default: 1
              },
              {
                name:    'calendarSize',
                values:  ['small', 'medium', 'large'],
                default: 'small'
              }
            ];
            var integrationOptionDropdownValues = [
              {
                name:    'dateFormatDayInput',
                values:  ['j', 'd'],
                default: 'j'
              },
              {
                name:    'dateFormatMonthInput',
                values:  ['M Y', 'm Y', 'F Y'],
                default: 'M Y'
              },
              {
                name:    'overwriteDayOptions',
                values:  [true, false],
                default: true
              },
              {
                name:    'overwriteMonthOptions',
                values:  [true, false],
                default: true
              }
            ];
            var integrationOptionRangeValues = [
              {
                name:    'autoSetEndDate',
                values:  ['blanks', 'dates', 'always', 'never'],
                default: 'always'
              },
              {
                name:   'defaultEndDate',
                values: [
                  'blank',
                  '2001-01-01',
                  new Date(
                    new Date().getFullYear() + 1,
                    new Date().getMonth(),
                    new Date().getDate()
                  )
                ],
                default: new Date(
                  new Date().getFullYear() + 1,
                  new Date().getMonth(),
                  new Date().getDate()
                )
              },
              {
                name:    'defaultRange',
                values:  [0, 1, 365],
                default: 0
              },
              {
                name:    'maximumRange',
                values:  [0, 1, 365],
                default: 0
              },
              {
                name:    'minimumRange',
                values:  [0, 1, 365],
                default: 0
              }
            ];

            /**
             * The generateAllCombinations() function will generate all possible
             * combinations of integration options.
             * @returns {Array} - An array of all possible integration options.
             */
            var generateAllCombinations = function() {
              var result = [];

              /**
               * Recursively combines options to create all possible
               * configurations.
               * @param {Array} options - The remaining integration options to
               * process.
               * @param {object} current - The current combination of options.
               */
              var combine = function(options, current) {
                if (options.length === 0) {
                  result.push(current);
                  return;
                }

                var first = options[0];
                var rest = options.slice(1);

                for (var i = 0; i < first.values.length; i++) {
                  var value = first.values[i];
                  var newCombination = {};

                  for (var key in current) {
                    if (Object.prototype.hasOwnProperty.call(current, key)) {
                      newCombination[key] = current[key];
                    }
                  }
                  newCombination[first.name] = value;

                  var newOptions = rest.slice(); // Copy the remaining options

                  // Apply conditions based on the value of the current option
                  if (first.name === 'calendarDisplay' && value !== 'full') {
                    newOptions =
                      newOptions.concat(integrationOptionNonFullValues);
                  }
                  if (first.name === 'inputType' && value === 'dropdown') {
                    newOptions =
                      newOptions.concat(integrationOptionDropdownValues);
                  }
                  if (first.name === 'allowRange' && value === true) {
                    newOptions =
                      newOptions.concat(integrationOptionRangeValues);
                  }

                  combine(newOptions, newCombination);
                }
              };

              combine(integrationOptionValues, {});
              return result;
            };
            if (false) { // eslint-disable-line
              // we don’t use this function as it creates far too many
              // permutations of integration options to reasonably test in a
              // browser
              integrationOptions = generateAllCombinations();
            }

            /**
             * The generatePairwiseCombinations() function will generate many
             * combinations of integration options using the pairwise method.
             * @returns {Array} - An array of integration options generated
             * using the pairwise method.
             */
            var generatePairwiseCombinations = function() {
              var pairs = [];

              for (var i = 0; i < integrationOptionValues.length; i++) {
                for (var j = i + 1; j < integrationOptionValues.length; j++) {
                  for (
                    var a = 0; a < integrationOptionValues[i].values.length; a++
                  ) {
                    for (
                      var b = 0;
                      b < integrationOptionValues[j].values.length;
                      b++
                    ) {
                      var pair = {};
                      pair[integrationOptionValues[i].name] =
                        integrationOptionValues[i].values[a];
                      pair[integrationOptionValues[j].name] =
                        integrationOptionValues[j].values[b];
                      pairs.push(pair);
                    }
                  }
                }
              }

              // Additional options based on conditions
              var extendedPairs = [];

              for (var k = 0; k < pairs.length; k++) {
                var pair = pairs[k];
                var extendedPair = {};

                // Copy properties of pair to extendedPair
                for (var key in pair) {
                  if (Object.prototype.hasOwnProperty.call(pair, key)) {
                    extendedPair[key] = pair[key];
                  }
                }

                if (
                  extendedPair.calendarDisplay &&
                  extendedPair.calendarDisplay !== 'full'
                ) {
                  for (
                    var n = 0; n < integrationOptionNonFullValues.length; n++
                  ) {
                    for (
                      var v1 = 0;
                      v1 < integrationOptionNonFullValues[n].values.length;
                      v1++
                    ) {
                      var newPair = {};

                      // Copy properties of extendedPair to newPair
                      for (var key1 in extendedPair) {
                        if (
                          Object.prototype.hasOwnProperty.call(
                            extendedPair,
                            key1
                          )
                        ) {
                          newPair[key1] = extendedPair[key1];
                        }
                      }
                      newPair[integrationOptionNonFullValues[n].name] =
                        integrationOptionNonFullValues[n].values[v1];
                      extendedPairs.push(newPair);
                    }
                  }
                }

                if (
                  extendedPair.inputType &&
                  extendedPair.inputType === 'dropdown'
                ) {
                  for (
                    var d = 0; d < integrationOptionDropdownValues.length; d++
                  ) {
                    for (
                      var v2 = 0;
                      v2 < integrationOptionDropdownValues[d].values.length;
                      v2++
                    ) {
                      var newPair2 = {};

                      // Copy properties of extendedPair to newPair2
                      for (var key2 in extendedPair) {
                        if (
                          Object.prototype.hasOwnProperty.call(
                            extendedPair,
                            key2
                          )
                        ) {
                          newPair2[key2] = extendedPair[key2];
                        }
                      }
                      newPair2[integrationOptionDropdownValues[d].name] =
                        integrationOptionDropdownValues[d].values[v2];
                      extendedPairs.push(newPair2);
                    }
                  }
                }

                if (
                  extendedPair.allowRange && extendedPair.allowRange === true
                ) {
                  for (
                    var r = 0; r < integrationOptionRangeValues.length; r++
                  ) {
                    for (
                      var v3 = 0;
                      v3 < integrationOptionRangeValues[r].values.length;
                      v3++
                    ) {
                      var newPair3 = {};

                      // Copy properties of extendedPair to newPair3
                      for (var key3 in extendedPair) {
                        if (
                          Object.prototype.hasOwnProperty.call(
                            extendedPair,
                            key3
                          )
                        ) {
                          newPair3[key3] = extendedPair[key3];
                        }
                      }
                      newPair3[integrationOptionRangeValues[r].name] =
                        integrationOptionRangeValues[r].values[v3];
                      extendedPairs.push(newPair3);
                    }
                  }
                }

                extendedPairs.push(pair);
              }

              return extendedPairs;
            };
            integrationOptions = generatePairwiseCombinations();

            for (var i = 0; i < integrationOptions.length; i++) {
              var allowRange =
                integrationOptions[i]['allowRange'] !== undefined &&
                integrationOptions[i]['allowRange'] === true;
              var useDropdowns =
                integrationOptions[i]['inputType'] !== undefined &&
                integrationOptions[i]['inputType'] === 'dropdown';
              var useExpanderElements =
                integrationOptions[i]['useExpanderElements'] !== undefined &&
                integrationOptions[i]['useExpanderElements'] === true;

              if (useDropdowns) {
                integrationOptions[i]['monthSelector'] =
                  '#agjCalendar-start-month';
                integrationOptions[i]['daySelector'] = '#agjCalendar-start-day';
                if (allowRange) {
                  integrationOptions[i]['endMonthSelector'] =
                    '#agjCalendar-end-month';
                  integrationOptions[i]['endDaySelector'] =
                    '#agjCalendar-end-day';
                }
              } else {
                integrationOptions[i]['dateSelector'] =
                  '#agjCalendar-start-date';
                if (allowRange) {
                  integrationOptions[i]['endDateSelector'] =
                    '#agjCalendar-end-date';
                }
              }

              if (useExpanderElements) {
                integrationOptions[i]['expanderSelector'] =
                  '#agjCalendar-start-icon';
                if (allowRange) {
                  integrationOptions[i]['endExpanderSelector'] =
                    '#agjCalendar-end-icon';
                }
              }

              assertAgjCalendarIntegration(assert, integrationOptions[i]);
            }
          }
        );
      }
    }
  );

  /**
   * $.fn.agjCalendar() module.
   */
  QUnit.module(
    '$.fn.agjCalendar() module',
    function(hooks) {
      QUnit.test(
        'Test initializing an integration using $.fn.agjCalendar()',
        function(assert) {
          for (
            var i = 0, dateSelectors = [
              '#agjCalendar-start-date',
              '#agjCalendar-invalid'
            ];
            i < dateSelectors.length;
            i++
          ) {
            var integration;
            $('#agjCalendar-start-date').agjCalendar({
              // dateSelector should be ignored in favour of
              // $.fn.agjCalendar()’s calling element(s) which is
              // #agjCalendar-start-date in this case
              dateSelector: dateSelectors[i]
            }, function(value) {
              integration = value;
            });

            assert.notStrictEqual(
              integration,
              -1,
              'Successfully initialize an integration (return value !== -1)'
            );

            assert.strictEqual(
              typeof integration,
              'number',
              'Successfully initialize an integration (return value is a ' +
              'number)'
            );

            assert.ok(
              integration >= 0,
              'Successfully initialize an integration (return value is >= 0)'
            );

            assert.ok(
              $.agjCalendar.disable(integration),
              'Successfully disable an integration'
            );

            assert.notOk(
              $.agjCalendar.disable(integration),
              'Fail to disable an integration a second time'
            );
          }
        }
      );
    }
  );

  /**
   * $.agjCalendar.addRegexTextPattern() module.
   */
  QUnit.module(
    '$.agjCalendar.addRegexTextPattern() module',
    function(hooks) {
      QUnit.test(
        'Test initializing an integration with custom translations including ' +
        'unique unicode characters',
        function(assert) {
          var integrationOptions = {
            dateSelector: '#agjCalendar-start-date',
            translations: {
              days: {
                full: {
                  0: 'Sunday —',
                  1: 'Monday —',
                  2: 'Tuesday —',
                  3: 'Wednesday —',
                  4: 'Thursday —',
                  5: 'Friday —',
                  6: 'Saturday —'
                },
                abbreviated: {
                  0: 'Sun —',
                  1: 'Mon —',
                  2: 'Tue —',
                  3: 'Wed —',
                  4: 'Thu —',
                  5: 'Fri —',
                  6: 'Sat —'
                },
                short: {
                  0: 'S —',
                  1: 'M —',
                  2: 'T —',
                  3: 'W —',
                  4: 'T —',
                  5: 'F —',
                  6: 'S —'
                }
              },
              months: {
                full: {
                  0:  'January —',
                  1:  'February —',
                  2:  'March —',
                  3:  'April —',
                  4:  'May —',
                  5:  'June —',
                  6:  'July —',
                  7:  'August —',
                  8:  'September —',
                  9:  'October —',
                  10: 'November —',
                  11: 'December —'
                },
                abbreviated: {
                  0:  'Jan —',
                  1:  'Feb —',
                  2:  'Mar —',
                  3:  'Apr —',
                  4:  'May —',
                  5:  'Jun —',
                  6:  'Jul —',
                  7:  'Aug —',
                  8:  'Sep —',
                  9:  'Oct —',
                  10: 'Nov —',
                  11: 'Dec —'
                }
              },
              ordinalSuffixes: {
                1:  'st —',
                2:  'nd —',
                3:  'rd —',
                4:  'th —',
                5:  'th —',
                6:  'th —',
                7:  'th —',
                8:  'th —',
                9:  'th —',
                10: 'th —',
                11: 'th —',
                12: 'th —',
                13: 'th —',
                14: 'th —',
                15: 'th —',
                16: 'th —',
                17: 'th —',
                18: 'th —',
                19: 'th —',
                20: 'th —',
                21: 'st —',
                22: 'nd —',
                23: 'rd —',
                24: 'th —',
                25: 'th —',
                26: 'th —',
                27: 'th —',
                28: 'th —',
                29: 'th —',
                30: 'th —',
                31: 'st —'
              },
              meridiemIndicators: {
                lowercase: {
                  0: 'am —',
                  1: 'pm —'
                },
                uppercase: {
                  0: 'AM —',
                  1: 'PM —'
                }
              },
              hideCalendar:    'Hide Calendar —',
              nextMonth:       'Next Month —',
              previousMonth:   'Previous Month —',
              poweredByBefore: 'Powered by —',
              poweredByAfter:  '—',
              blankDateText:   'Select a Date —'
            }
          };

          assert.strictEqual(
            $.agjCalendar(integrationOptions),
            -1,
            'Fail to initialize an integration with custom translations ' +
            'using unique unicode characters without first calling ' +
            '$.agjCalendar.addRegexTextPattern()'
          );

          $.agjCalendar.addRegexTextPattern('\\u2014'); // em dash (—)

          assertAgjCalendarIntegration(assert, integrationOptions);
        }
      );
    }
  );

  /**
   * $.agjCalendar.dateToString() module.
   */
  QUnit.module(
    '$.agjCalendar.dateToString() module',
    function(hooks) {
      QUnit.test(
        'Test missing parameters',
        function(assert) {
          assert.strictEqual(
            $.agjCalendar.dateToString(),
            -1,
            'Fail to convert a string with no parameters'
          );
        }
      );

      QUnit.test(
        'Test missing second parameter',
        function(assert) {
          assert.strictEqual(
            $.agjCalendar.dateToString(new Date()),
            -1,
            'Fail to convert a string with no second parameter'
          );
        }
      );

      QUnit.test(
        'Test sample variables in first parameter',
        function(assert) {
          for (var variableType in sampleVariables) {
            if (
              Object.prototype.hasOwnProperty.call(
                sampleVariables,
                variableType
              )
            ) {
              switch (variableType) {
                case 'Date':
                case 'Recent Date':
                case 'Medieval Date':
                case 'Ancient Date':
                case 'Future Date':
                  // don’t process sample values that are dates
                  break;

                default:
                  assert.strictEqual(
                    $.agjCalendar.dateToString(
                      sampleVariables[variableType],
                      'Y-m-d'
                    ),
                    -1,
                    variableType + ' sample variable'
                  );
                  break;
              }
            }
          }
        }
      );

      QUnit.test(
        'Test sample variables in second parameter',
        function(assert) {
          for (var variableType in sampleVariables) {
            if (
              Object.prototype.hasOwnProperty.call(
                sampleVariables,
                variableType
              )
            ) {
              assert.strictEqual(
                $.agjCalendar.dateToString(
                  new Date(),
                  sampleVariables[variableType]
                ),
                -1,
                variableType + ' sample variable'
              );
            }
          }
        }
      );

      for (var i = 0; i < sampleDates.length; i++) {
        (function(sampleDate) {
          QUnit.test(
            'Test individual characters using ' +
            sampleDates[i]['label'].toLowerCase(),
            function(assert) {
              for (var character in sampleDate['dateFormatCharacters']) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    sampleDate['dateFormatCharacters'],
                    character
                  )
                ) {
                  assert.strictEqual(
                    $.agjCalendar.dateToString(sampleDate['date'], character),
                    sampleDate['dateFormatCharacters'][character],
                    '`' + character + '` character'
                  );
                }
              }
            }
          );
        })(sampleDates[i]);
      }
    }
  );

  /**
   * $.agjCalendar.disable() module.
   */
  QUnit.module(
    '$.agjCalendar.disable() module',
    function(hooks) {
      QUnit.test(
        'Test initializing and then disabling an integration',
        function(assert) {
          assertAgjCalendarIntegration(assert, {
            dateSelector: '#agjCalendar-start-date'
          });
        }
      );
    }
  );

  /**
   * $.agjCalendar.disableEmojiSupport() / $.agjCalendar.enableEmojiSupport()
   * module.
   */
  QUnit.module(
    '$.agjCalendar.disableEmojiSupport() / ' +
    '$.agjCalendar.enableEmojiSupport() module',
    function(hooks) {
      QUnit.test(
        'Test initializing an integration with custom translations including ' +
        'emoji',
        function(assert) {
          var integrationOptions = {
            dateSelector: '#agjCalendar-start-date',
            translations: {
              days: {
                full: {
                  0: 'Sunday 😊🏳️‍🌈',
                  1: 'Monday 😊🏳️‍🌈',
                  2: 'Tuesday 😊🏳️‍🌈',
                  3: 'Wednesday 😊🏳️‍🌈',
                  4: 'Thursday 😊🏳️‍🌈',
                  5: 'Friday 😊🏳️‍🌈',
                  6: 'Saturday 😊🏳️‍🌈'
                },
                abbreviated: {
                  0: 'Sun 😊🏳️‍🌈',
                  1: 'Mon 😊🏳️‍🌈',
                  2: 'Tue 😊🏳️‍🌈',
                  3: 'Wed 😊🏳️‍🌈',
                  4: 'Thu 😊🏳️‍🌈',
                  5: 'Fri 😊🏳️‍🌈',
                  6: 'Sat 😊🏳️‍🌈'
                },
                short: {
                  0: 'S 😊🏳️‍🌈',
                  1: 'M 😊🏳️‍🌈',
                  2: 'T 😊🏳️‍🌈',
                  3: 'W 😊🏳️‍🌈',
                  4: 'T 😊🏳️‍🌈',
                  5: 'F 😊🏳️‍🌈',
                  6: 'S 😊🏳️‍🌈'
                }
              },
              months: {
                full: {
                  0:  'January 😊🏳️‍🌈',
                  1:  'February 😊🏳️‍🌈',
                  2:  'March 😊🏳️‍🌈',
                  3:  'April 😊🏳️‍🌈',
                  4:  'May 😊🏳️‍🌈',
                  5:  'June 😊🏳️‍🌈',
                  6:  'July 😊🏳️‍🌈',
                  7:  'August 😊🏳️‍🌈',
                  8:  'September 😊🏳️‍🌈',
                  9:  'October 😊🏳️‍🌈',
                  10: 'November 😊🏳️‍🌈',
                  11: 'December 😊🏳️‍🌈'
                },
                abbreviated: {
                  0:  'Jan 😊🏳️‍🌈',
                  1:  'Feb 😊🏳️‍🌈',
                  2:  'Mar 😊🏳️‍🌈',
                  3:  'Apr 😊🏳️‍🌈',
                  4:  'May 😊🏳️‍🌈',
                  5:  'Jun 😊🏳️‍🌈',
                  6:  'Jul 😊🏳️‍🌈',
                  7:  'Aug 😊🏳️‍🌈',
                  8:  'Sep 😊🏳️‍🌈',
                  9:  'Oct 😊🏳️‍🌈',
                  10: 'Nov 😊🏳️‍🌈',
                  11: 'Dec 😊🏳️‍🌈'
                }
              },
              ordinalSuffixes: {
                1:  'st 😊🏳️‍🌈',
                2:  'nd 😊🏳️‍🌈',
                3:  'rd 😊🏳️‍🌈',
                4:  'th 😊🏳️‍🌈',
                5:  'th 😊🏳️‍🌈',
                6:  'th 😊🏳️‍🌈',
                7:  'th 😊🏳️‍🌈',
                8:  'th 😊🏳️‍🌈',
                9:  'th 😊🏳️‍🌈',
                10: 'th 😊🏳️‍🌈',
                11: 'th 😊🏳️‍🌈',
                12: 'th 😊🏳️‍🌈',
                13: 'th 😊🏳️‍🌈',
                14: 'th 😊🏳️‍🌈',
                15: 'th 😊🏳️‍🌈',
                16: 'th 😊🏳️‍🌈',
                17: 'th 😊🏳️‍🌈',
                18: 'th 😊🏳️‍🌈',
                19: 'th 😊🏳️‍🌈',
                20: 'th 😊🏳️‍🌈',
                21: 'st 😊🏳️‍🌈',
                22: 'nd 😊🏳️‍🌈',
                23: 'rd 😊🏳️‍🌈',
                24: 'th 😊🏳️‍🌈',
                25: 'th 😊🏳️‍🌈',
                26: 'th 😊🏳️‍🌈',
                27: 'th 😊🏳️‍🌈',
                28: 'th 😊🏳️‍🌈',
                29: 'th 😊🏳️‍🌈',
                30: 'th 😊🏳️‍🌈',
                31: 'st 😊🏳️‍🌈'
              },
              meridiemIndicators: {
                lowercase: {
                  0: 'am 😊🏳️‍🌈',
                  1: 'pm 😊🏳️‍🌈'
                },
                uppercase: {
                  0: 'AM 😊🏳️‍🌈',
                  1: 'PM 😊🏳️‍🌈'
                }
              },
              hideCalendar:    'Hide Calendar 😊🏳️‍🌈',
              nextMonth:       'Next Month 😊🏳️‍🌈',
              previousMonth:   'Previous Month 😊🏳️‍🌈',
              poweredByBefore: 'Powered by 😊🏳️‍🌈',
              poweredByAfter:  '😊🏳️‍🌈',
              blankDateText:   'Select a Date 😊🏳️‍🌈'
            }
          };

          assert.strictEqual(
            $.agjCalendar(integrationOptions),
            -1,
            'Fail to initialize an integration with custom translations ' +
            'using emoji without enabling emoji support'
          );

          $.agjCalendar.enableEmojiSupport();

          assertAgjCalendarIntegration(assert, integrationOptions);

          $.agjCalendar.disableEmojiSupport();

          assert.strictEqual(
            $.agjCalendar(integrationOptions),
            -1,
            'Fail to initialize an integration with custom translations ' +
            'using emoji after disabling emoji support'
          );

          $.agjCalendar.addRegexTextPattern('😊🏳️‍🌈');

          assertAgjCalendarIntegration(assert, integrationOptions);
        }
      );
    }
  );

  /**
   * $.agjCalendar.getIncludedTranslations() module.
   */
  QUnit.module(
    '$.agjCalendar.getIncludedTranslations() module',
    function(hooks) {
      QUnit.test(
        'Test missing first parameter',
        function(assert) {
          assert.strictEqual(
            $.agjCalendar.getIncludedTranslations(),
            -1,
            'Fail to get included translations with no parameter'
          );
        }
      );

      QUnit.test(
        'Test sample variables in first parameter',
        function(assert) {
          for (var variableType in sampleVariables) {
            if (
              Object.prototype.hasOwnProperty.call(
                sampleVariables,
                variableType
              )
            ) {
              assert.strictEqual(
                $.agjCalendar.getIncludedTranslations(
                  sampleVariables[variableType]
                ),
                -1,
                variableType + ' sample variable'
              );
            }
          }
        }
      );

      for (var i = 0; i < includedLanguages.length; i++) {
        (function(language) {
          QUnit.test(
            'Test included language `' + language + '`',
            function(assert) {
              var includedTranslations = $.agjCalendar.getIncludedTranslations(
                language
              );

              assert.strictEqual(
                typeof includedTranslations,
                'object',
                'Succeed to get an object of translations'
              );

              for (
                var j = 0, units = ['days', 'months', 'meridiemIndicators'];
                j < units.length;
                j++
              ) {
                assert.strictEqual(
                  typeof includedTranslations[units[j]],
                  'object',
                  'Confirm `' + units[j] + '` object exists'
                );

                var formats = [];
                switch (units[j]) {
                  case 'days':
                    formats = ['short', 'abbreviated', 'full'];
                    break;

                  case 'months':
                    formats = ['abbreviated', 'full'];
                    break;

                  case 'meridiemIndicators':
                    formats = ['lowercase', 'uppercase'];
                    break;
                }

                for (var k = 0; k < formats.length; k++) {
                  assert.strictEqual(
                    typeof includedTranslations[units[j]][formats[k]],
                    'object',
                    'Confirm `' + units[j] + '[' + formats[k] + ']` object ' +
                    'exists'
                  );

                  var count = 0;
                  switch (units[j]) {
                    case 'days':
                      count = 6;
                      break;

                    case 'months':
                      count = 11;
                      break;

                    case 'meridiemIndicators':
                      count = 1;
                      break;
                  }

                  for (var l = 0; l <= count; l++) {
                    assert.strictEqual(
                      typeof includedTranslations[units[j]][formats[k]][l],
                      'string',
                      'Confirm `' + units[j] + '[' + formats[k] + '][' + l +
                      ']` string exists'
                    );
                  }
                }
              }

              assert.strictEqual(
                typeof includedTranslations['ordinalSuffixes'],
                'object',
                'Confirm `ordinalSuffixes` object exists'
              );

              for (var j = 1; j <= 31; j++) {
                assert.strictEqual(
                  typeof includedTranslations['ordinalSuffixes'][j],
                  'string',
                  'Confirm `ordinalSuffixes[' + j + ']` string exists'
                );
              }

              for (
                var j = 0, keys = [
                  'hideCalendar',
                  'nextMonth',
                  'previousMonth',
                  'poweredByBefore',
                  'poweredByAfter',
                  'blankDateText'
                ];
                j < keys.length;
                j++
              ) {
                assert.strictEqual(
                  typeof includedTranslations[keys[j]],
                  'string',
                  'Confirm `' + keys[j] + '` string exists'
                );
              }

              var integration = $.agjCalendar({
                dateSelector: '#agjCalendar-start-date',
                translations: includedTranslations
              });

              assert.notStrictEqual(
                integration,
                -1,
                'Successfully initialize an integration by passing the ' +
                'included translations in the `translations` option'
              );

              assert.strictEqual(
                $.agjCalendar.disable(integration),
                true,
                'Successfully disable the integration'
              );
            }
          );
        })(includedLanguages[i]);
      }
    }
  );

  /**
   * $.agjCalendar.isActive() module.
   */
  QUnit.module(
    '$.agjCalendar.isActive() module',
    function(hooks) {
      QUnit.test(
        'Test when agjCalendar has never been activated',
        function(assert) {
          assert.strictEqual(
            $.agjCalendar.isActive(),
            false,
            'Test $.agjCalendar.isActive() returns false when agjCalendar ' +
            'has never been activated'
          );
        }
      );
    }
  );

  /**
   * $.agjCalendar.stringToDate() module.
   */
  QUnit.module(
    '$.agjCalendar.stringToDate() module',
    function(hooks) {
      QUnit.test(
        'Test sample variables in first parameter',
        function(assert) {
          for (var variableType in sampleVariables) {
            if (
              Object.prototype.hasOwnProperty.call(
                sampleVariables,
                variableType
              )
            ) {
              assert.strictEqual(
                $.agjCalendar.stringToDate(
                  sampleVariables[variableType],
                  'Y-m-d'
                ),
                -1,
                variableType + ' sample variable'
              );
            }
          }
        }
      );

      QUnit.test(
        'Test sample variables in second parameter',
        function(assert) {
          for (var variableType in sampleVariables) {
            if (
              Object.prototype.hasOwnProperty.call(
                sampleVariables,
                variableType
              )
            ) {
              assert.strictEqual(
                $.agjCalendar.stringToDate(
                  '2000-01-02',
                  sampleVariables[variableType]
                ),
                -1,
                variableType + ' sample variable'
              );
            }
          }
        }
      );

      for (var i = 0; i < sampleDates.length; i++) {
        (function(sampleDate) {
          QUnit.test(
            'Test common date formats using ' +
            sampleDates[i]['label'].toLowerCase(),
            function(assert) {
              for (var dateFormat in sampleDate['dateFormats']) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    sampleDate['dateFormats'],
                    dateFormat
                  )
                ) {
                  var date = $.agjCalendar.stringToDate(
                    sampleDate['dateFormats'][dateFormat],
                    dateFormat
                  );

                  assert.strictEqual(
                    typeof date,
                    'object',
                    '`' + dateFormat + '` date format returns an object'
                  );

                  assert.ok(
                    date instanceof Date,
                    '`' + dateFormat + '` date format returns a date object'
                  );

                  if (date instanceof Date) {
                    assert.strictEqual(
                      date.getFullYear(),
                      sampleDate['date'].getFullYear(),
                      '`' + dateFormat + '` date format returns the correct ' +
                      'year'
                    );

                    assert.strictEqual(
                      date.getMonth(),
                      sampleDate['date'].getMonth(),
                      '`' + dateFormat + '` date format returns the correct ' +
                      'month'
                    );

                    assert.strictEqual(
                      date.getDate(),
                      sampleDate['date'].getDate(),
                      '`' + dateFormat + '` date format returns the correct day'
                    );
                  }
                }
              }
            }
          );
        })(sampleDates[i]);
      }
    }
  );
})(jQuery);
