/**
 * Javascript source code of agjCalendar v1.2.0.
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
 * The agjCalendar plugin is built entirely in an IIFE (immediately invoked
 * function expression) to avoid polluting the global namespace.
 * @param {Function} $ - A reference to the global jQuery object.
 */
(function($) {
  'use strict';

  var agjCalendars = [];

  var lastClickWasOnAgjCalendar = false;
  var lastBodyMarginRight = '';
  var lastBodyOverflow = '';
  var lastScrollLeft = 0;
  var lastScrollTop = 0;

  var jQueryMajorVersion = parseInt($.fn.jquery.split('.')[0], 10);
  var zIndexMaximum = 2147483647;

  var emojiSupportEnabled = false;

  var regexPatterns = {
    'YYYY-MM':    new RegExp(/^-?([0-9]+)-([0-9]{2})$/),
    'YYYY-MM-DD': new RegExp(/^-?([0-9]+)-([0-9]{2})-([0-9]{2})$/)
  };

  var regexTextPatterns = [
    // Regular expression for spaces
    ' ',
    // Regular expression for numbers
    '0-9',
    // Regular expressions for non-alphanumeric characters
    '\'',
    '.',
    '\\-',
    '/',
    // Regular expressions for the Latin alphabet
    'A-Z',
    'a-z',
    // Regular expressions for extended and accented Latin characters
    '\\u00BA', // º
    '\\u00C0-\\u00D6',
    '\\u00D8-\\u00F6',
    '\\u00F8-\\u00FF',
    // Regular expressions for اَلْعَرَبِيَّةُ (Arabic) characters
    '\\u0600-\\u06FF',
    '\\u0750-\\u077F',
    '\\u08A0-\\u08FF',
    '\\uFB50-\\uFDFD',
    '\\uFE70-\\uFEFF',
    // Regular expression for বাংলা (Bengali) characters
    '\\u0980-\\u09FF',
    // Regular expression for עִבְרִית (Hebrew) characters
    '\\u0590-\\u05FF',
    // Regular expression for आधुनिक मानक हिन्दी (Hindi) characters
    '\\u0900-\\u097F',
    // Regular expression for 官话 (Chinese Mandarin) characters
    '\\u4E00-\\u9FFF',
    // Regular expression for 日本語 (Japanese) characters
    '\\u3040-\\u30FF',
    // Regular expression for 한국어 (Korean) characters
    '\\uAC00-\\uD7AF',
    // Regular expression for मराठी (Marathi) characters
    '\\u0900-\\u097F',
    // Regular expression for پنجابی (Punjabi) characters
    '\\u0A00-\\u0A7F',
    // Regular expression for русский язык (Russian) characters
    '\\u0400-\\u04FF',
    // Regular expression for తెలుగు (Telugu) characters
    '\\u0C00-\\u0C7F',
    '\\u200C',
    // Regular expressions for Türkçe (Turkish) characters
    '\\u00C7',
    '\\u00E7',
    '\\u011E',
    '\\u011F',
    '\\u0130',
    '\\u0131',
    '\\u00D6',
    '\\u00F6',
    '\\u015E',
    '\\u015F',
    '\\u00DC',
    '\\u00FC',
    // Regular expression for اردو (Urdu) characters
    '\\u0780-\\u07BF',
    // Regular expressions for Tiếng Việt (Vietnamese) characters
    '\\u0100-\\u024F',
    '\\u1E00-\\u1EFF'
  ];

  var includedTranslations = {
    // English
    en: {
      days: {
        full: {
          0: 'Sunday',
          1: 'Monday',
          2: 'Tuesday',
          3: 'Wednesday',
          4: 'Thursday',
          5: 'Friday',
          6: 'Saturday'
        },
        abbreviated: {
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
      ordinalSuffixes: {
        1:  'st',
        2:  'nd',
        3:  'rd',
        4:  'th',
        5:  'th',
        6:  'th',
        7:  'th',
        8:  'th',
        9:  'th',
        10: 'th',
        11: 'th',
        12: 'th',
        13: 'th',
        14: 'th',
        15: 'th',
        16: 'th',
        17: 'th',
        18: 'th',
        19: 'th',
        20: 'th',
        21: 'st',
        22: 'nd',
        23: 'rd',
        24: 'th',
        25: 'th',
        26: 'th',
        27: 'th',
        28: 'th',
        29: 'th',
        30: 'th',
        31: 'st'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'am',
          1: 'pm'
        },
        uppercase: {
          0: 'AM',
          1: 'PM'
        }
      },
      hideCalendar:    'Hide Calendar',
      nextMonth:       'Next Month',
      previousMonth:   'Previous Month',
      poweredByBefore: 'Powered by',
      poweredByAfter:  '',
      blankDateText:   'Select a Date'
    },

    // اَلْعَرَبِيَّةُ (Arabic)
    ar: {
      days: {
        full: {
          0: 'الأحَد',
          1: 'الإثْنَيْن',
          2: 'الثُّلاثَاء',
          3: 'الأرْبِعَاء',
          4: 'الْخَمِيس',
          5: 'الجُمُعَة',
          6: 'السَّبْت'
        },
        abbreviated: {
          0: 'أحد',
          1: 'اثن',
          2: 'ثلاث',
          3: 'أربع',
          4: 'خميس',
          5: 'جمعة',
          6: 'سبت'
        },
        short: {
          0: 'أحد',
          1: 'اثن',
          2: 'ثلاث',
          3: 'أربع',
          4: 'خميس',
          5: 'جمعة',
          6: 'سبت'
        }
      },
      months: {
        full: {
          0:  'يناير',
          1:  'فبراير',
          2:  'مارس',
          3:  'أبريل',
          4:  'مايو',
          5:  'يونيو',
          6:  'يوليو',
          7:  'أغسطس',
          8:  'سبتمبر',
          9:  'أكتوبر',
          10: 'نوفمبر',
          11: 'ديسمبر'
        },
        abbreviated: {
          0:  'ينا',
          1:  'فبر',
          2:  'مار',
          3:  'أبر',
          4:  'ماي',
          5:  'يون',
          6:  'يول',
          7:  'أغس',
          8:  'سبت',
          9:  'أكت',
          10: 'نوف',
          11: 'ديس'
        }
      },
      ordinalSuffixes: {
        1:  'لاولى',
        2:  'لاثانيه',
        3:  'لاثالثه',
        4:  'لرابعه',
        5:  'لخا مسه',
        6:  'لسادسه',
        7:  'لسابعه',
        8:  'لثامنه',
        9:  'لتاسعه',
        10: 'لعاشره',
        11: 'لاحدىعشره',
        12: 'لاثنىعشره',
        13: 'لاثالثهعشره',
        14: 'لرابعهعشره',
        15: 'لخا مسهعشره',
        16: 'لسادسهعشره',
        17: 'لسابعهعشره',
        18: 'لثامنهعشره',
        19: 'لتاسعهعشره',
        20: 'لعشرون',
        21: 'لاحدىوعشرون',
        22: 'لاثانيهوعشرون',
        23: 'لاثالثهوعشرون',
        24: 'لرابعهوعشرون',
        25: 'لخا مسهوعشرون',
        26: 'لسادسهوعشرون',
        27: 'لسابعهوعشرون',
        28: 'لثامنهوعشرون',
        29: 'لتاسعهوعشرون',
        30: 'لعشرون',
        31: 'لاحدىوثلاثون'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'ص',
          1: 'م'
        },
        uppercase: {
          0: 'ص',
          1: 'م'
        }
      },
      hideCalendar:    'إخفاء التقويم',
      nextMonth:       'الشهر القادم',
      previousMonth:   'الشهر الماضى',
      poweredByBefore: '',
      poweredByAfter:  'مدعوم من س',
      blankDateText:   'حدد التاريخ'
    },

    // বাংলা (Bengali)
    bn: {
      days: {
        full: {
          0: 'রবিবার',
          1: 'সোমবার',
          2: 'মঙ্গলবার',
          3: 'বুধবার',
          4: 'বৃহস্পতিবার',
          5: 'সুক্রবার',
          6: 'শনিবার'
        },
        abbreviated: {
          0: 'রবি',
          1: 'সোম',
          2: 'মঙ্গল',
          3: 'বুধ',
          4: 'বৃহস্পতি',
          5: 'শুক্র',
          6: 'শনি'
        },
        short: {
          0: 'রবি',
          1: 'সোম',
          2: 'মঙ্গল',
          3: 'বুধ',
          4: 'বৃহস্পতি',
          5: 'শুক্র',
          6: 'শনি'
        }
      },
      months: {
        full: {
          0:  'জানুয়ারি',
          1:  'ফেব্রুয়ারি',
          2:  'মার্চ',
          3:  'এপ্রিল',
          4:  'মে',
          5:  'জুন',
          6:  'জুলাই',
          7:  'আগস্ট',
          8:  'সেপ্টেম্বর',
          9:  'অক্টোবর',
          10: 'নভেম্বর',
          11: 'ডিসেম্বর'
        },
        abbreviated: {
          0:  'জানু\'',
          1:  'ফেব\'',
          2:  'মার্চ',
          3:  'এপ্রি\'',
          4:  'মে',
          5:  'জুন',
          6:  'জুলা\'',
          7:  'অগা\'',
          8:  'সেপ্ট\'',
          9:  'অক্টো\'',
          10: 'নভে\'',
          11: 'ডিসে\''
        }
      },
      ordinalSuffixes: {
        1:  'ম',
        2:  'য়',
        3:  'য়',
        4:  'থ',
        5:  'ম',
        6:  'ষ',
        7:  'ম',
        8:  'ম',
        9:  'ম',
        10: 'ম',
        11: 'ম',
        12: 'ম',
        13: 'ম',
        14: 'ম',
        15: 'ম',
        16: 'ষ',
        17: 'ম',
        18: 'ম',
        19: 'ম',
        20: 'ম',
        21: 'ম',
        22: 'ম',
        23: 'ম',
        24: 'ম',
        25: 'ম',
        26: 'ষ',
        27: 'ম',
        28: 'ম',
        29: 'ম',
        30: 'ম',
        31: 'ম'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'পূর্বাহ্ণ',
          1: 'অপরাহ্ণ'
        },
        uppercase: {
          0: 'পূর্বাহ্ণ',
          1: 'অপরাহ্ণ'
        }
      },
      hideCalendar:    'ক্যালেন্ডার লুকান',
      nextMonth:       'পরের মাসে',
      previousMonth:   'পূর্ববর্তী মাস',
      poweredByBefore: '',
      poweredByAfter:  'দ্বারা চালিত',
      blankDateText:   'একটি তারিখ নির্বাচন করুন'
    },

    // Deutsch (German)
    de: {
      days: {
        full: {
          0: 'Sonntag',
          1: 'Montag',
          2: 'Dienstag',
          3: 'Mittwoch',
          4: 'Donnerstag',
          5: 'Freitag',
          6: 'Samstag'
        },
        abbreviated: {
          0: 'So',
          1: 'Mo',
          2: 'Di',
          3: 'Mi',
          4: 'Do',
          5: 'Fr',
          6: 'Sa'
        },
        short: {
          0: 'S',
          1: 'M',
          2: 'D',
          3: 'M',
          4: 'D',
          5: 'F',
          6: 'S'
        }
      },
      months: {
        full: {
          0:  'Januar',
          1:  'Februar',
          2:  'März',
          3:  'April',
          4:  'Mai',
          5:  'Juni',
          6:  'Juli',
          7:  'August',
          8:  'September',
          9:  'Oktober',
          10: 'November',
          11: 'Dezember'
        },
        abbreviated: {
          0:  'Jan',
          1:  'Feb',
          2:  'März',
          3:  'Apr',
          4:  'Mai',
          5:  'Jun',
          6:  'Jul',
          7:  'Aug',
          8:  'Sep',
          9:  'Okt',
          10: 'Nov',
          11: 'Dec'
        }
      },
      ordinalSuffixes: {
        1:  '.',
        2:  '.',
        3:  '.',
        4:  '.',
        5:  '.',
        6:  '.',
        7:  '.',
        8:  '.',
        9:  '.',
        10: '.',
        11: '.',
        12: '.',
        13: '.',
        14: '.',
        15: '.',
        16: '.',
        17: '.',
        18: '.',
        19: '.',
        20: '.',
        21: '.',
        22: '.',
        23: '.',
        24: '.',
        25: '.',
        26: '.',
        27: '.',
        28: '.',
        29: '.',
        30: '.',
        31: '.'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'vorm.',
          1: 'nachm.'
        },
        uppercase: {
          0: 'VORM.',
          1: 'NACHM.'
        }
      },
      hideCalendar:    'Kalender ausblenden',
      nextMonth:       'Nächsten Monat',
      previousMonth:   'Vorheriger Monat',
      poweredByBefore: 'Unterstützt von',
      poweredByAfter:  '',
      blankDateText:   'Wählen Sie ein Datum aus'
    },

    // Español (Spanish)
    es: {
      days: {
        full: {
          0: 'domingo',
          1: 'lunes',
          2: 'martes',
          3: 'miércoles',
          4: 'jueves',
          5: 'viernes',
          6: 'sábado'
        },
        abbreviated: {
          0: 'do',
          1: 'lu',
          2: 'ma',
          3: 'mi',
          4: 'ju',
          5: 'vi',
          6: 'sá'
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
          0:  'enero',
          1:  'febrero',
          2:  'marzo',
          3:  'abril',
          4:  'mayo',
          5:  'junio',
          6:  'julio',
          7:  'agosto',
          8:  'septiembre',
          9:  'octubre',
          10: 'noviembre',
          11: 'diciembre'
        },
        abbreviated: {
          0:  'ene',
          1:  'feb',
          2:  'mar',
          3:  'abr',
          4:  'may',
          5:  'jun',
          6:  'jul',
          7:  'ago',
          8:  'set',
          9:  'oct',
          10: 'nov',
          11: 'dic'
        }
      },
      ordinalSuffixes: {
        1:  'º',
        2:  'º',
        3:  'º',
        4:  'º',
        5:  'º',
        6:  'º',
        7:  'º',
        8:  'º',
        9:  'º',
        10: 'º',
        11: 'º',
        12: 'º',
        13: 'º',
        14: 'º',
        15: 'º',
        16: 'º',
        17: 'º',
        18: 'º',
        19: 'º',
        20: 'º',
        21: 'º',
        22: 'º',
        23: 'º',
        24: 'º',
        25: 'º',
        26: 'º',
        27: 'º',
        28: 'º',
        29: 'º',
        30: 'º',
        31: 'º'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'a.m.',
          1: 'p.m.'
        },
        uppercase: {
          0: 'A.M.',
          1: 'P.M.'
        }
      },
      hideCalendar:    'Ocultar calendario',
      nextMonth:       'Próximo mes',
      previousMonth:   'Mes anterior',
      poweredByBefore: 'Desarrollado por',
      poweredByAfter:  '',
      blankDateText:   'Seleccione una fecha'
    },

    // Français (French)
    fr: {
      days: {
        full: {
          0: 'dimanche',
          1: 'lundi',
          2: 'mardi',
          3: 'mercredi',
          4: 'jeudi',
          5: 'vendredi',
          6: 'samedi'
        },
        abbreviated: {
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
      ordinalSuffixes: {
        1:  'er',
        2:  'e',
        3:  'e',
        4:  'e',
        5:  'e',
        6:  'e',
        7:  'e',
        8:  'e',
        9:  'e',
        10: 'e',
        11: 'e',
        12: 'e',
        13: 'e',
        14: 'e',
        15: 'e',
        16: 'e',
        17: 'e',
        18: 'e',
        19: 'e',
        20: 'e',
        21: 'e',
        22: 'e',
        23: 'e',
        24: 'e',
        25: 'e',
        26: 'e',
        27: 'e',
        28: 'e',
        29: 'e',
        30: 'e',
        31: 'e'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'du matin',
          1: 'de l\'après-midi'
        },
        uppercase: {
          0: 'DU MATIN',
          1: 'DE L\'APRÈS-MIDI'
        }
      },
      hideCalendar:    'Masquer le calendrier',
      nextMonth:       'Le mois prochain',
      previousMonth:   'Le mois précédent',
      poweredByBefore: 'Propulsé par',
      poweredByAfter:  '',
      blankDateText:   'Sélectionnez une date'
    },

    // עִבְרִית (Hebrew)
    he: {
      days: {
        full: {
          0: 'יוֹם רִאשׁוֹן',
          1: 'יוֹם שֵׁנִי',
          2: 'יוֹם שְׁלִישִׁי',
          3: 'יום רביעי',
          4: 'יוֹם חֲמִישִׁי',
          5: 'יוֹם שִׁישִׁי',
          6: 'יום שבת'
        },
        abbreviated: {
          0: 'יום א\'',
          1: 'יום ב\'',
          2: 'יום ג\'',
          3: 'יום ד\'',
          4: 'יום ה\'',
          5: 'יום ו\'',
          6: 'שבת'
        },
        short: {
          0: 'יום א\'',
          1: 'יום ב\'',
          2: 'יום ג\'',
          3: 'יום ד\'',
          4: 'יום ה\'',
          5: 'יום ו\'',
          6: 'שבת'
        }
      },
      months: {
        full: {
          0:  'ינואר',
          1:  'פברואר',
          2:  'מרץ',
          3:  'אפריל',
          4:  'מאי',
          5:  'יוני',
          6:  'יולי',
          7:  'אוגוסט',
          8:  'ספטמבר',
          9:  'אוקטובר',
          10: 'נובמבר',
          11: 'דצמבר'
        },
        abbreviated: {
          0:  'ינו\'',
          1:  'פבר\'',
          2:  'מרץ',
          3:  'אפר\'',
          4:  'מאי',
          5:  'יונ\'',
          6:  'יול\'',
          7:  'אוג\'',
          8:  'ספט\'',
          9:  'אוק\'',
          10: 'נוב\'',
          11: 'דצמ\''
        }
      },
      ordinalSuffixes: {
        1:  '.',
        2:  '.',
        3:  '.',
        4:  '.',
        5:  '.',
        6:  '.',
        7:  '.',
        8:  '.',
        9:  '.',
        10: '.',
        11: '.',
        12: '.',
        13: '.',
        14: '.',
        15: '.',
        16: '.',
        17: '.',
        18: '.',
        19: '.',
        20: '.',
        21: '.',
        22: '.',
        23: '.',
        24: '.',
        25: '.',
        26: '.',
        27: '.',
        28: '.',
        29: '.',
        30: '.',
        31: '.'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'לפנה״צ',
          1: 'אחרי הצהריים'
        },
        uppercase: {
          0: 'לפנה״צ',
          1: 'אחרי הצהריים'
        }
      },
      hideCalendar:    'הסתר לוח שנה',
      nextMonth:       'חודש הבא',
      previousMonth:   'חודש שעבר',
      poweredByBefore: '',
      poweredByAfter:  'מופעל על ידי',
      blankDateText:   'בחר תאריך'
    },

    // आधुनिक मानक हिन्दी (Hindi)
    hi: {
      days: {
        full: {
          0: 'रविवार',
          1: 'सोमवार',
          2: 'मंगलवार',
          3: 'बुधवार',
          4: 'गुरुवार',
          5: 'शुक्रवार',
          6: 'शनिवार'
        },
        abbreviated: {
          0: 'रवि.',
          1: 'सोम.',
          2: 'मंगल.',
          3: 'बुध.',
          4: 'गुरु.',
          5: 'शुक्र.',
          6: 'शनि.'
        },
        short: {
          0: 'रवि.',
          1: 'सोम.',
          2: 'मंगल.',
          3: 'बुध.',
          4: 'गुरु.',
          5: 'शुक्र.',
          6: 'शनि.'
        }
      },
      months: {
        full: {
          0:  'जनवरी',
          1:  'फ़रवरी',
          2:  'मार्च',
          3:  'अप्रैल',
          4:  'मई',
          5:  'जून',
          6:  'जुलाई',
          7:  'अगस्त',
          8:  'सितंबर',
          9:  'अक्टूबर',
          10: 'नवंबर',
          11: 'दिसंबर'
        },
        abbreviated: {
          0:  'जन.',
          1:  'फ़र.',
          2:  'मार्च',
          3:  'अप्रै.',
          4:  'मई',
          5:  'जून',
          6:  'जुला.',
          7:  'अग.',
          8:  'सित.',
          9:  'अक्ट.',
          10: 'नव.',
          11: 'दिस.'
        }
      },
      ordinalSuffixes: {
        1:  'ली',
        2:  'रा',
        3:  'रा',
        4:  'था',
        5:  'वा',
        6:  'वा',
        7:  'वा',
        8:  'वा',
        9:  'वा',
        10: 'वा',
        11: 'वा',
        12: 'वा',
        13: 'वा',
        14: 'वा',
        15: 'वा',
        16: 'वा',
        17: 'वा',
        18: 'वा',
        19: 'वा',
        20: 'वा',
        21: 'वा',
        22: 'वा',
        23: 'वा',
        24: 'वा',
        25: 'वा',
        26: 'वा',
        27: 'वा',
        28: 'वा',
        29: 'वा',
        30: 'वा',
        31: 'वा'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'पूर्वाह्न',
          1: 'अपराह्न'
        },
        uppercase: {
          0: 'पूर्वाह्न',
          1: 'अपराह्न'
        }
      },
      hideCalendar:    'कैलेंडर छिपाएँ',
      nextMonth:       'अगले महीने',
      previousMonth:   'पिछला महीना',
      poweredByBefore: '',
      poweredByAfter:  'द्वारा संचालित',
      blankDateText:   'एक तिथि चुनें'
    },

    // Italiano (Italian)
    it: {
      days: {
        full: {
          0: 'Domenica',
          1: 'Lunedì',
          2: 'Martedì',
          3: 'Mercoledì',
          4: 'Giovedì',
          5: 'Venerdì',
          6: 'Sabato'
        },
        abbreviated: {
          0: 'Dom.',
          1: 'Lun.',
          2: 'Mar.',
          3: 'Mer.',
          4: 'Gio.',
          5: 'Ven.',
          6: 'Sab.'
        },
        short: {
          0: 'D',
          1: 'L',
          2: 'M',
          3: 'M',
          4: 'G',
          5: 'V',
          6: 'S'
        }
      },
      months: {
        full: {
          0:  'Gennaio',
          1:  'Febbraio',
          2:  'Marzo',
          3:  'Aprile',
          4:  'Maggio',
          5:  'Giugno',
          6:  'Luglio',
          7:  'Agosto',
          8:  'Settembre',
          9:  'Ottobre',
          10: 'Novembre',
          11: 'Dicembre'
        },
        abbreviated: {
          0:  'Gen.',
          1:  'Feb.',
          2:  'Mar.',
          3:  'Apr.',
          4:  'Mag.',
          5:  'Giu.',
          6:  'Lug.',
          7:  'Ago.',
          8:  'Set.',
          9:  'Ott.',
          10: 'Nov.',
          11: 'Dic.'
        }
      },
      ordinalSuffixes: {
        1:  'º',
        2:  'º',
        3:  'º',
        4:  'º',
        5:  'º',
        6:  'º',
        7:  'º',
        8:  'º',
        9:  'º',
        10: 'º',
        11: 'º',
        12: 'º',
        13: 'º',
        14: 'º',
        15: 'º',
        16: 'º',
        17: 'º',
        18: 'º',
        19: 'º',
        20: 'º',
        21: 'º',
        22: 'º',
        23: 'º',
        24: 'º',
        25: 'º',
        26: 'º',
        27: 'º',
        28: 'º',
        29: 'º',
        30: 'º',
        31: 'º'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'AM',
          1: 'PM'
        },
        uppercase: {
          0: 'AM',
          1: 'PM'
        }
      },
      hideCalendar:    'Nascondi calendario',
      nextMonth:       'Il prossimo mese',
      previousMonth:   'Il mese scorso',
      poweredByBefore: 'Alimentato da',
      poweredByAfter:  '',
      blankDateText:   'Seleziona una data'
    },

    // 日本語 (Japanese)
    ja: {
      days: {
        full: {
          0: '日曜日',
          1: '月曜日',
          2: '火曜日',
          3: '水曜日',
          4: '木曜日',
          5: '金曜日',
          6: '土曜日'
        },
        abbreviated: {
          0: '日',
          1: '月',
          2: '火',
          3: '水',
          4: '木',
          5: '金',
          6: '土'
        },
        short: {
          0: '日',
          1: '月',
          2: '火',
          3: '水',
          4: '木',
          5: '金',
          6: '土'
        }
      },
      months: {
        full: {
          0:  '一月',
          1:  '二月',
          2:  '三月',
          3:  '四月',
          4:  '五月',
          5:  '六月',
          6:  '七月',
          7:  '八月',
          8:  '九月',
          9:  '十月',
          10: '十一月',
          11: '十二月'
        },
        abbreviated: {
          0:  '1月',
          1:  '2月',
          2:  '3月',
          3:  '4月',
          4:  '5月',
          5:  '6月',
          6:  '7月',
          7:  '8月',
          8:  '9月',
          9:  '10月',
          10: '11月',
          11: '12月'
        }
      },
      ordinalSuffixes: {
        1:  '番目',
        2:  '番目',
        3:  '番目',
        4:  '番目',
        5:  '番目',
        6:  '番目',
        7:  '番目',
        8:  '番目',
        9:  '番目',
        10: '番目',
        11: '番目',
        12: '番目',
        13: '番目',
        14: '番目',
        15: '番目',
        16: '番目',
        17: '番目',
        18: '番目',
        19: '番目',
        20: '番目',
        21: '番目',
        22: '番目',
        23: '番目',
        24: '番目',
        25: '番目',
        26: '番目',
        27: '番目',
        28: '番目',
        29: '番目',
        30: '番目',
        31: '番目'
      },
      meridiemIndicators: {
        lowercase: {
          0: '午前',
          1: '午後'
        },
        uppercase: {
          0: '午前',
          1: '午後'
        }
      },
      hideCalendar:    'カレンダーを隠す',
      nextMonth:       '来月',
      previousMonth:   '前月',
      poweredByBefore: '',
      poweredByAfter:  '搭載',
      blankDateText:   '日付を選択してください'
    },

    // 한국어 (Korean)
    ko: {
      days: {
        full: {
          0: '일요일',
          1: '월요일',
          2: '화요일',
          3: '수요일',
          4: '목요일',
          5: '금요일',
          6: '토요일'
        },
        abbreviated: {
          0: '일',
          1: '월',
          2: '화',
          3: '수',
          4: '목',
          5: '금',
          6: '토'
        },
        short: {
          0: '일',
          1: '월',
          2: '화',
          3: '수',
          4: '목',
          5: '금',
          6: '토'
        }
      },
      months: {
        full: {
          0:  '일월',
          1:  '이월',
          2:  '삼월',
          3:  '사월',
          4:  '오월',
          5:  '유월',
          6:  '칠월',
          7:  '팔월',
          8:  '구월',
          9:  '시월',
          10: '십일월',
          11: '십이월'
        },
        abbreviated: {
          0:  '1월',
          1:  '2월',
          2:  '3월',
          3:  '4월',
          4:  '5월',
          5:  '6월',
          6:  '7월',
          7:  '8월',
          8:  '9월',
          9:  '10월',
          10: '11월',
          11: '12월'
        }
      },
      ordinalSuffixes: {
        1:  '번째',
        2:  '번째',
        3:  '번째',
        4:  '번째',
        5:  '번째',
        6:  '번째',
        7:  '번째',
        8:  '번째',
        9:  '번째',
        10: '번째',
        11: '번째',
        12: '번째',
        13: '번째',
        14: '번째',
        15: '번째',
        16: '번째',
        17: '번째',
        18: '번째',
        19: '번째',
        20: '번째',
        21: '번째',
        22: '번째',
        23: '번째',
        24: '번째',
        25: '번째',
        26: '번째',
        27: '번째',
        28: '번째',
        29: '번째',
        30: '번째',
        31: '번째'
      },
      meridiemIndicators: {
        lowercase: {
          0: '오전',
          1: '오후'
        },
        uppercase: {
          0: '오전',
          1: '오후'
        }
      },
      hideCalendar:    '캘린더 숨기기',
      nextMonth:       '다음 달',
      previousMonth:   '지난달',
      poweredByBefore: '',
      poweredByAfter:  '제공',
      blankDateText:   '날짜를 선택하세요'
    },

    // मराठी (Marathi)
    mr: {
      days: {
        full: {
          0: 'रविवार',
          1: 'सोमवार',
          2: 'मंगळवार',
          3: 'बुधवार',
          4: 'गुरुवार',
          5: 'शुक्रवार',
          6: 'शनिवार'
        },
        abbreviated: {
          0: 'रवि.',
          1: 'सोम.',
          2: 'मंगळ.',
          3: 'बुध.',
          4: 'गुरु.',
          5: 'शुक्र.',
          6: 'शनि.'
        },
        short: {
          0: 'रवि.',
          1: 'सोम.',
          2: 'मंगळ.',
          3: 'बुध.',
          4: 'गुरु.',
          5: 'शुक्र.',
          6: 'शनि.'
        }
      },
      months: {
        full: {
          0:  'जानेवारी',
          1:  'फेब्रुवारी',
          2:  'मार्च',
          3:  'एप्रिल',
          4:  'मे',
          5:  'जून',
          6:  'जुलै',
          7:  'ऑगस्ट',
          8:  'सप्टेंबर',
          9:  'ऑक्टोबर',
          10: 'नोव्हेंबर',
          11: 'डिसेंबर'
        },
        abbreviated: {
          0:  'जाने.',
          1:  'फेब्रु.',
          2:  'मार्च',
          3:  'एप्रि.',
          4:  'मे',
          5:  'जून',
          6:  'जुलै',
          7:  'ऑग.',
          8:  'सप्टे.',
          9:  'ऑक्टो.',
          10: 'नोव्हे.',
          11: 'डिसे.'
        }
      },
      ordinalSuffixes: {
        1:  'ली',
        2:  'रा',
        3:  'रा',
        4:  'था',
        5:  'वा',
        6:  'वा',
        7:  'वा',
        8:  'वा',
        9:  'वा',
        10: 'वा',
        11: 'वा',
        12: 'वा',
        13: 'वा',
        14: 'वा',
        15: 'वा',
        16: 'वा',
        17: 'वा',
        18: 'वा',
        19: 'वा',
        20: 'वा',
        21: 'वा',
        22: 'वा',
        23: 'वा',
        24: 'वा',
        25: 'वा',
        26: 'वा',
        27: 'वा',
        28: 'वा',
        29: 'वा',
        30: 'वा',
        31: 'वा'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'पूर्वाह्न',
          1: 'अपराह्न'
        },
        uppercase: {
          0: 'पूर्वाह्न',
          1: 'अपराह्न'
        }
      },
      hideCalendar:    'कॅलेंडर लपवा',
      nextMonth:       'पुढील महिन्यात',
      previousMonth:   'मागील महिना',
      poweredByBefore: '',
      poweredByAfter:  'द्वारा समर्थित',
      blankDateText:   'एक तारीख निवडा'
    },

    // پنجابی (Punjabi)
    pa: {
      days: {
        full: {
          0: 'ਐਤਵਾਰ',
          1: 'ਸੋਮਵਾਰ',
          2: 'ਮੰਗਲਵਾਰ',
          3: 'ਬੁੱਧਵਾਰ',
          4: 'ਵੀਰਵਾਰ',
          5: 'ਸ਼ੁੱਕਰਵਾਰ',
          6: 'ਸ਼ਨੀਚਰਵਾਰ'
        },
        abbreviated: {
          0: 'ਐਤ.',
          1: 'ਸੋਮ.',
          2: 'ਮੰਗ.',
          3: 'ਬੁੱਧ.',
          4: 'ਵੀਰ.',
          5: 'ਸ਼ੁੱਕਰ.',
          6: 'ਸ਼ਨੀ.'
        },
        short: {
          0: 'ਐਤ.',
          1: 'ਸੋਮ.',
          2: 'ਮੰਗ.',
          3: 'ਬੁੱਧ.',
          4: 'ਵੀਰ.',
          5: 'ਸ਼ੁੱਕਰ.',
          6: 'ਸ਼ਨੀ.'
        }
      },
      months: {
        full: {
          0:  'ਜਨਵਰੀ',
          1:  'ਫ਼ਰਵਰੀ',
          2:  'ਮਾਰਚ',
          3:  'ਅਪ੍ਰੈਲ',
          4:  'ਮਈ',
          5:  'ਜੂਨ',
          6:  'ਜੁਲਾਈ',
          7:  'ਅਗਸਤ',
          8:  'ਸਤੰਬਰ',
          9:  'ਅਕਤੂਬਰ',
          10: 'ਨਵੰਬਰ',
          11: 'ਦਿਸੰਬਰ'
        },
        abbreviated: {
          0:  'ਜਨ.',
          1:  'ਫ਼ਰ.',
          2:  'ਮਾਰ.',
          3:  'ਅਪ੍ਰ.',
          4:  'ਮਈ',
          5:  'ਜੂਨ',
          6:  'ਜੁਲਾ.',
          7:  'ਅਗ.',
          8:  'ਸਤੰ.',
          9:  'ਅਕਤੂ.',
          10: 'ਨਵੰ.',
          11: 'ਦਿਸੰ.'
        }
      },
      ordinalSuffixes: {
        1:  'ਵਾਂ',
        2:  'ਵਾਂ',
        3:  'ਵਾਂ',
        4:  'ਵਾਂ',
        5:  'ਵਾਂ',
        6:  'ਵਾਂ',
        7:  'ਵਾਂ',
        8:  'ਵਾਂ',
        9:  'ਵਾਂ',
        10: 'ਵਾਂ',
        11: 'ਵਾਂ',
        12: 'ਵਾਂ',
        13: 'ਵਾਂ',
        14: 'ਵਾਂ',
        15: 'ਵਾਂ',
        16: 'ਵਾਂ',
        17: 'ਵਾਂ',
        18: 'ਵਾਂ',
        19: 'ਵਾਂ',
        20: 'ਵਾਂ',
        21: 'ਵਾਂ',
        22: 'ਵਾਂ',
        23: 'ਵਾਂ',
        24: 'ਵਾਂ',
        25: 'ਵਾਂ',
        26: 'ਵਾਂ',
        27: 'ਵਾਂ',
        28: 'ਵਾਂ',
        29: 'ਵਾਂ',
        30: 'ਵਾਂ',
        31: 'ਵਾਂ'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'ਪੂਰਵ ਦੁਪਹਿਰ',
          1: 'ਦੁਪਹਿਰ'
        },
        uppercase: {
          0: 'ਪੂਰਵ ਦੁਪਹਿਰ',
          1: 'ਦੁਪਹਿਰ'
        }
      },
      hideCalendar:    'ਕੈਲੰਡਰ ਲੁਕਾਓ',
      nextMonth:       'ਅਗਲਾ ਮਹੀਨਾ',
      previousMonth:   'ਪਿਛਲਾ ਮਹੀਨਾ',
      poweredByBefore: '',
      poweredByAfter:  'ਦੁਆਰਾ ਸੰਚਾਲਿਤ',
      blankDateText:   'ਇੱਕ ਮਿਤੀ ਚੁਣੋ'
    },

    // Português (Portuguese)
    pt: {
      days: {
        full: {
          0: 'Domingo',
          1: 'Segunda-feira',
          2: 'Terça-feira',
          3: 'Quarta-feira',
          4: 'Quinta-feira',
          5: 'Sexta-feira',
          6: 'Sábado'
        },
        abbreviated: {
          0: 'Dom.',
          1: 'Seg.',
          2: 'Ter.',
          3: 'Qua.',
          4: 'Qui.',
          5: 'Sex.',
          6: 'Sáb.'
        },
        short: {
          0: 'D',
          1: 'S',
          2: 'T',
          3: 'Q',
          4: 'Q',
          5: 'S',
          6: 'S'
        }
      },
      months: {
        full: {
          0:  'Janeiro',
          1:  'Fevereiro',
          2:  'Março',
          3:  'Abril',
          4:  'Maio',
          5:  'Junho',
          6:  'Julho',
          7:  'Agosto',
          8:  'Setembro',
          9:  'Outubro',
          10: 'Novembro',
          11: 'Dezembro'
        },
        abbreviated: {
          0:  'Jan.',
          1:  'Fev.',
          2:  'Mar.',
          3:  'Abr.',
          4:  'Mai.',
          5:  'Jun.',
          6:  'Jul.',
          7:  'Ago.',
          8:  'Set.',
          9:  'Out.',
          10: 'Nov.',
          11: 'Dez.'
        }
      },
      ordinalSuffixes: {
        1:  'º',
        2:  'º',
        3:  'º',
        4:  'º',
        5:  'º',
        6:  'º',
        7:  'º',
        8:  'º',
        9:  'º',
        10: 'º',
        11: 'º',
        12: 'º',
        13: 'º',
        14: 'º',
        15: 'º',
        16: 'º',
        17: 'º',
        18: 'º',
        19: 'º',
        20: 'º',
        21: 'º',
        22: 'º',
        23: 'º',
        24: 'º',
        25: 'º',
        26: 'º',
        27: 'º',
        28: 'º',
        29: 'º',
        30: 'º',
        31: 'º'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'a.m.',
          1: 'p.m.'
        },
        uppercase: {
          0: 'A.M.',
          1: 'P.M.'
        }
      },
      hideCalendar:    'Ocultar calendário',
      nextMonth:       'Próximo mês',
      previousMonth:   'Mês anterior',
      poweredByBefore: 'Desenvolvido pela',
      poweredByAfter:  '',
      blankDateText:   'Selecione uma data'
    },

    // русский язык (Russian)
    ru: {
      days: {
        full: {
          0: 'Понедельник',
          1: 'Вторник',
          2: 'Среда',
          3: 'Четверг',
          4: 'Пятница',
          5: 'Суббота',
          6: 'Воскресенье'
        },
        abbreviated: {
          0: 'Пн.',
          1: 'Вт.',
          2: 'Ср.',
          3: 'Чт.',
          4: 'Пт.',
          5: 'Сб.',
          6: 'Вс.'
        },
        short: {
          0: 'Пн',
          1: 'Вт',
          2: 'Ср',
          3: 'Чт',
          4: 'Пт',
          5: 'Сб',
          6: 'Вс'
        }
      },
      months: {
        full: {
          0:  'Январь',
          1:  'Февраль',
          2:  'Март',
          3:  'Апрель',
          4:  'Май',
          5:  'Июнь',
          6:  'Июль',
          7:  'Август',
          8:  'Сентябрь',
          9:  'Октябрь',
          10: 'Ноябрь',
          11: 'Декабрь'
        },
        abbreviated: {
          0:  'янв.',
          1:  'фев.',
          2:  'мар.',
          3:  'апр.',
          4:  'май',
          5:  'июн.',
          6:  'июл.',
          7:  'авг.',
          8:  'сен.',
          9:  'окт.',
          10: 'ноя.',
          11: 'дек.'
        }
      },
      ordinalSuffixes: {
        1:  'й',
        2:  'й',
        3:  'й',
        4:  'й',
        5:  'й',
        6:  'й',
        7:  'й',
        8:  'й',
        9:  'й',
        10: 'й',
        11: 'й',
        12: 'й',
        13: 'й',
        14: 'й',
        15: 'й',
        16: 'й',
        17: 'й',
        18: 'й',
        19: 'й',
        20: 'й',
        21: 'й',
        22: 'й',
        23: 'й',
        24: 'й',
        25: 'й',
        26: 'й',
        27: 'й',
        28: 'й',
        29: 'й',
        30: 'й',
        31: 'й'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'до полудня',
          1: 'после полудня'
        },
        uppercase: {
          0: 'ДО ПОЛУДНЯ',
          1: 'ПОСЛЕ ПОЛУДНЯ'
        }
      },
      hideCalendar:    'Скрыть календарь',
      nextMonth:       'В следующем месяце',
      previousMonth:   'Предыдущий месяц',
      poweredByBefore: 'При поддержке',
      poweredByAfter:  '',
      blankDateText:   'Выберите дату'
    },

    // తెలుగు (Telugu)
    te: {
      days: {
        full: {
          0: 'ఆదివారం',
          1: 'సోమవారం',
          2: 'మంగళవారం',
          3: 'బుధవారం',
          4: 'గురువారం',
          5: 'శుక్రవారం',
          6: 'శనివారం'
        },
        abbreviated: {
          0: 'ఆది',
          1: 'సోమ',
          2: 'మంగళ',
          3: 'బుధ',
          4: 'గురు',
          5: 'శుక్ర',
          6: 'శని'
        },
        short: {
          0: 'ఆది',
          1: 'సోమ',
          2: 'మంగళ',
          3: 'బుధ',
          4: 'గురు',
          5: 'శుక్ర',
          6: 'శని'
        }
      },
      months: {
        full: {
          0:  'జనవరి',
          1:  'ఫిబ్రవరి',
          2:  'మార్చి',
          3:  'ఏప్రిల్',
          4:  'మే',
          5:  'జూన్',
          6:  'జూలై',
          7:  'ఆగస్టు',
          8:  'సెప్టెంబర్',
          9:  'అక్టోబర్',
          10: 'నవంబర్',
          11: 'డిసెంబర్'
        },
        abbreviated: {
          0:  'జన.',
          1:  'ఫిబ్ర.',
          2:  'మార్చి',
          3:  'ఏప్రి.',
          4:  'మే',
          5:  'జూన్',
          6:  'జూలై',
          7:  'ఆగ.',
          8:  'సెప్టె.',
          9:  'అక్టో.',
          10: 'నవం.',
          11: 'డిసె.'
        }
      },
      ordinalSuffixes: {
        1:  'వ',
        2:  'వ',
        3:  'వ',
        4:  'వ',
        5:  'వ',
        6:  'వ',
        7:  'వ',
        8:  'వ',
        9:  'వ',
        10: 'వ',
        11: 'వ',
        12: 'వ',
        13: 'వ',
        14: 'వ',
        15: 'వ',
        16: 'వ',
        17: 'వ',
        18: 'వ',
        19: 'వ',
        20: 'వ',
        21: 'వ',
        22: 'వ',
        23: 'వ',
        24: 'వ',
        25: 'వ',
        26: 'వ',
        27: 'వ',
        28: 'వ',
        29: 'వ',
        30: 'వ',
        31: 'వ'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'ఉదయం',
          1: 'సాయంత్రం'
        },
        uppercase: {
          0: 'ఉదయం',
          1: 'సాయంత్రం'
        }
      },
      hideCalendar:    'క్యాలెండర్‌ను దాచండి',
      nextMonth:       'తరువాతి నెల',
      previousMonth:   'పోయిన నెల',
      poweredByBefore: '',
      poweredByAfter:  'ద్వారా ఆధారితం',
      blankDateText:   'తేదీని ఎంచుకోండి'
    },

    // Türkçe (Turkish)
    tr: {
      days: {
        full: {
          0: 'Pazartesi',
          1: 'Salı',
          2: 'Çarşamba',
          3: 'Perşembe',
          4: 'Cuma',
          5: 'Cumartesi',
          6: 'Pazar'
        },
        abbreviated: {
          0: 'Pzt.',
          1: 'Sal.',
          2: 'Çar.',
          3: 'Per.',
          4: 'Cum.',
          5: 'Cmt.',
          6: 'Paz.'
        },
        short: {
          0: 'P',
          1: 'S',
          2: 'Ç',
          3: 'P',
          4: 'C',
          5: 'C',
          6: 'P'
        }
      },
      months: {
        full: {
          0:  'Ocak',
          1:  'Şubat',
          2:  'Mart',
          3:  'Nisan',
          4:  'Mayıs',
          5:  'Haziran',
          6:  'Temmuz',
          7:  'Ağustos',
          8:  'Eylül',
          9:  'Ekim',
          10: 'Kasım',
          11: 'Aralık'
        },
        abbreviated: {
          0:  'Oca.',
          1:  'Şub.',
          2:  'Mar.',
          3:  'Nis.',
          4:  'May.',
          5:  'Haz.',
          6:  'Tem.',
          7:  'Ağu.',
          8:  'Eyl.',
          9:  'Eki.',
          10: 'Kas.',
          11: 'Ara.'
        }
      },
      ordinalSuffixes: {
        1:  '.',
        2:  '.',
        3:  '.',
        4:  '.',
        5:  '.',
        6:  '.',
        7:  '.',
        8:  '.',
        9:  '.',
        10: '.',
        11: '.',
        12: '.',
        13: '.',
        14: '.',
        15: '.',
        16: '.',
        17: '.',
        18: '.',
        19: '.',
        20: '.',
        21: '.',
        22: '.',
        23: '.',
        24: '.',
        25: '.',
        26: '.',
        27: '.',
        28: '.',
        29: '.',
        30: '.',
        31: '.'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'ÖÖ',
          1: 'ÖS'
        },
        uppercase: {
          0: 'ÖÖ',
          1: 'ÖS'
        }
      },
      hideCalendar:    'Takvimi Gizle',
      nextMonth:       'Gelecek ay',
      previousMonth:   'Geçtiğimiz ay',
      poweredByBefore: '',
      poweredByAfter:  'tarafından desteklenmektedir',
      blankDateText:   'Bir Tarih Seçin'
    },

    // اردو (Urdu)
    ur: {
      days: {
        full: {
          0: 'اتوار',
          1: 'پیر',
          2: 'منگل',
          3: 'بدھ',
          4: 'جمعرات',
          5: 'جمعہ',
          6: 'ہفتہ'
        },
        abbreviated: {
          0: 'ات.',
          1: 'پ.',
          2: 'م.',
          3: 'ب.',
          4: 'جم.',
          5: 'ج.',
          6: 'ہ.'
        },
        short: {
          0: 'ات',
          1: 'پ',
          2: 'م',
          3: 'ب',
          4: 'جم',
          5: 'ج',
          6: 'ہ'
        }
      },
      months: {
        full: {
          0:  'جنوری',
          1:  'فروری',
          2:  'مارچ',
          3:  'اپریل',
          4:  'مئی',
          5:  'جون',
          6:  'جولائی',
          7:  'اگست',
          8:  'ستمبر',
          9:  'اکتوبر',
          10: 'نومبر',
          11: 'دسمبر'
        },
        abbreviated: {
          0:  'جن.',
          1:  'فر.',
          2:  'مارچ',
          3:  'اپر.',
          4:  'مئی',
          5:  'جون',
          6:  'جول.',
          7:  'اگ.',
          8:  'ستم.',
          9:  'اکت.',
          10: 'نو.',
          11: 'دس.'
        }
      },
      ordinalSuffixes: {
        1:  'ویں',
        2:  'ویں',
        3:  'ویں',
        4:  'ویں',
        5:  'ویں',
        6:  'ویں',
        7:  'ویں',
        8:  'ویں',
        9:  'ویں',
        10: 'ویں',
        11: 'ویں',
        12: 'ویں',
        13: 'ویں',
        14: 'ویں',
        15: 'ویں',
        16: 'ویں',
        17: 'ویں',
        18: 'ویں',
        19: 'ویں',
        20: 'ویں',
        21: 'ویں',
        22: 'ویں',
        23: 'ویں',
        24: 'ویں',
        25: 'ویں',
        26: 'ویں',
        27: 'ویں',
        28: 'ویں',
        29: 'ویں',
        30: 'ویں',
        31: 'ویں'
      },
      meridiemIndicators: {
        lowercase: {
          0: 'صبح',
          1: 'شام'
        },
        uppercase: {
          0: 'صبح',
          1: 'شام'
        }
      },
      hideCalendar:    'کیلنڈر چھپائیں۔',
      nextMonth:       'اگلے ماہ',
      previousMonth:   'پچھلے مہینے',
      poweredByBefore: '',
      poweredByAfter:  'کے ذریعہ تقویت یافتہ',
      blankDateText:   'ایک تاریخ منتخب کریں۔'
    },

    // Tiếng Việt (Vietnamese)
    vi: {
      days: {
        full: {
          0: 'Chủ Nhật',
          1: 'Thứ Hai',
          2: 'Thứ Ba',
          3: 'Thứ Tư',
          4: 'Thứ Năm',
          5: 'Thứ Sáu',
          6: 'Thứ Bảy'
        },
        abbreviated: {
          0: 'CN',
          1: 'T2',
          2: 'T3',
          3: 'T4',
          4: 'T5',
          5: 'T6',
          6: 'T7'
        },
        short: {
          0: 'CN',
          1: 'T2',
          2: 'T3',
          3: 'T4',
          4: 'T5',
          5: 'T6',
          6: 'T7'
        }
      },
      months: {
        full: {
          0:  'Tháng Một',
          1:  'Tháng Hai',
          2:  'Tháng Ba',
          3:  'Tháng Tư',
          4:  'Tháng Năm',
          5:  'Tháng Sáu',
          6:  'Tháng Bảy',
          7:  'Tháng Tám',
          8:  'Tháng Chín',
          9:  'Tháng Mười',
          10: 'Tháng Mười Một',
          11: 'Tháng Mười Hai'
        },
        abbreviated: {
          0:  'Th1',
          1:  'Th2',
          2:  'Th3',
          3:  'Th4',
          4:  'Th5',
          5:  'Th6',
          6:  'Th7',
          7:  'Th8',
          8:  'Th9',
          9:  'Th10',
          10: 'Th11',
          11: 'Th12'
        }
      },
      ordinalSuffixes: {
        1:  '',
        2:  '',
        3:  '',
        4:  '',
        5:  '',
        6:  '',
        7:  '',
        8:  '',
        9:  '',
        10: '',
        11: '',
        12: '',
        13: '',
        14: '',
        15: '',
        16: '',
        17: '',
        18: '',
        19: '',
        20: '',
        21: '',
        22: '',
        23: '',
        24: '',
        25: '',
        26: '',
        27: '',
        28: '',
        29: '',
        30: '',
        31: ''
      },
      meridiemIndicators: {
        lowercase: {
          0: 'sáng',
          1: 'chiều'
        },
        uppercase: {
          0: 'SÁNG',
          1: 'CHIỀU'
        }
      },
      hideCalendar:    'Ẩn lịch',
      nextMonth:       'Tháng tiếp theo',
      previousMonth:   'Tháng trước',
      poweredByBefore: 'Được hỗ trợ bởi',
      poweredByAfter:  '',
      blankDateText:   'Chọn một ngày'
    },

    // 官话 (Chinese Mandarin)
    zh: {
      days: {
        full: {
          0: '星期天',
          1: '星期一',
          2: '星期二',
          3: '星期三',
          4: '星期四',
          5: '星期五',
          6: '星期六'
        },
        abbreviated: {
          0: '周日',
          1: '周一',
          2: '周二',
          3: '周三',
          4: '周四',
          5: '周五',
          6: '周六'
        },
        short: {
          0: '周日',
          1: '周一',
          2: '周二',
          3: '周三',
          4: '周四',
          5: '周五',
          6: '周六'
        }
      },
      months: {
        full: {
          0:  '一月',
          1:  '二月',
          2:  '三月',
          3:  '四月',
          4:  '五月',
          5:  '六月',
          6:  '七月',
          7:  '八月',
          8:  '九月',
          9:  '十月',
          10: '十一月',
          11: '十二月'
        },
        abbreviated: {
          0:  '1月',
          1:  '2月',
          2:  '3月',
          3:  '4月',
          4:  '5月',
          5:  '6月',
          6:  '7月',
          7:  '8月',
          8:  '9月',
          9:  '10月',
          10: '11月',
          11: '12月'
        }
      },
      ordinalSuffixes: {
        1:  '一',
        2:  '二',
        3:  '三',
        4:  '四',
        5:  '五',
        6:  '六',
        7:  '七',
        8:  '八',
        9:  '九',
        10: '十',
        11: '十一',
        12: '十二',
        13: '十三',
        14: '十四',
        15: '十五',
        16: '十六',
        17: '十七',
        18: '十八',
        19: '十九',
        20: '二十',
        21: '二十一',
        22: '二十二',
        23: '二十三',
        24: '二十四',
        25: '二十五',
        26: '二十六',
        27: '二十七',
        28: '二十八',
        29: '二十九',
        30: '三十',
        31: '三十一'
      },
      meridiemIndicators: {
        lowercase: {
          0: '上午',
          1: '下午'
        },
        uppercase: {
          0: '上午',
          1: '下午'
        }
      },
      hideCalendar:    '隐藏日历',
      nextMonth:       '下个月',
      previousMonth:   '前一个月',
      poweredByBefore: '由',
      poweredByAfter:  '提供支持',
      blankDateText:   '选择日期'
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
      !integrationIsActive(agjCalendar['position'], activateEnd)
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
    var modalBackgroundElement = $('#agjCalendar-modal-background');

    calendarElement.attr({
      'class':                          '', // remove all classes
      'data-agjCalendar-active':        agjCalendar['position'],
      'data-agjCalendar-active-is-end': activateEnd
    });

    // calculate CSS z-index value for the calendar and modal background
    // elements
    var zIndex = 0;

    if (
      agjCalendar['forceMaxZIndex'] ||
      agjCalendar['calendarDisplay'] !== 'inline'
    ) {
      zIndex = zIndexMaximum;
    } else {
      for (
        var i = 0, elementSelectors = [
          'dateSelector',
          'endDateSelector',
          'monthSelector',
          'daySelector',
          'endMonthSelector',
          'endDaySelector',
          'expanderSelector',
          'endExpanderSelector'
        ];
        i < elementSelectors.length;
        i++
      ) {
        var element = $(agjCalendar[elementSelectors[i]]);
        if (element.length > 0) {
          zIndex = Math.max(zIndex, getEffectiveZIndex(element));
        }
      }
    }

    calendarElement.css('zIndex', Math.min(zIndexMaximum, zIndex));
    modalBackgroundElement.css('zIndex', Math.min(zIndexMaximum, zIndex - 1));

    if (agjCalendar['theme'].length > 0) {
      // remove any active themes from the modal background element
      var modalBackgroundClasses = modalBackgroundElement.attr('class');
      if (
        typeof modalBackgroundClasses === 'string' &&
        modalBackgroundClasses.length > 0
      ) {
        modalBackgroundClasses = modalBackgroundClasses.split(' ');
        for (var i = 0; i < modalBackgroundClasses.length; i++) {
          if (modalBackgroundClasses[i].indexOf('agjCalendar-theme-') === 0) {
            modalBackgroundElement.removeClass(modalBackgroundClasses[i]);
          }
        }
      }

      modalBackgroundElement
        .addClass('agjCalendar-theme-' + agjCalendar['theme']);

      calendarElement.addClass('agjCalendar-theme-' + agjCalendar['theme']);
    }

    calendarElement.find('#agjCalendar-hide').attr(
      'title',
      agjCalendar['translations']['hideCalendar']
    ).text(agjCalendar['translations']['hideCalendar']);

    calendarElement.find('#agjCalendar-powered-by-before').text(
      agjCalendar['translations']['poweredByBefore'].length > 0 ?
      agjCalendar['translations']['poweredByBefore'] + ' ' :
      ''
    );

    calendarElement.find('#agjCalendar-powered-by-after').text(
      agjCalendar['translations']['poweredByAfter'].length > 0 ?
      ' ' + agjCalendar['translations']['poweredByAfter'] :
      ''
    );

    calendarElement.find('a.agjCalendar-previous-month').attr(
      'title',
      agjCalendar['translations']['previousMonth']
    ).find('span.agjCalendar-previous-month-inner').text(
      agjCalendar['translations']['previousMonth']
    );

    calendarElement.find('a.agjCalendar-next-month').attr(
      'title',
      agjCalendar['translations']['nextMonth']
    ).find('span.agjCalendar-next-month-inner').text(
      agjCalendar['translations']['nextMonth']
    );

    switch (agjCalendar['calendarCount']) {
      case 2:
        calendarElement.addClass('agjCalendar-double');
        break;

      case 3:
        calendarElement.addClass('agjCalendar-triple');
        break;

      default:
        calendarElement.addClass('agjCalendar-single');
        break;
    }

    switch (agjCalendar['calendarSize']) {
      case 'medium':
        calendarElement.addClass('agjCalendar-medium');
        break;

      case 'large':
        calendarElement.addClass('agjCalendar-large');
        break;

      default:
        calendarElement.addClass('agjCalendar-small');
        break;
    }

    if (agjCalendar['dayNameEllipsis']) {
      calendarElement.addClass('agjCalendar-day-name-ellipsis');
    }

    if (agjCalendar['startWeekOnMonday']) {
      calendarElement.addClass('agjCalendar-start-week-on-monday');
    }

    var days;
    if (agjCalendar['startWeekOnMonday']) {
      days = [1, 2, 3, 4, 5, 6, 0];
    } else {
      days = [0, 1, 2, 3, 4, 5, 6];
    }

    var daysMarkup = '';
    for (var i = 0; i < days.length; i++) {
      var exampleDate = new Date();
      while (exampleDate.getDay() !== days[i]) {
        exampleDate.setFullYear(
          exampleDate.getFullYear(),
          exampleDate.getMonth(),
          exampleDate.getDay() + 1
        );
      }

      var lowercaseDayName =
        includedTranslations['en']['days']['full'][days[i]].toLowerCase();
      var tooltipText = $.agjCalendar.dateToString(
        exampleDate,
        agjCalendar['dateFormatDayOfWeekTooltip'],
        agjCalendar['translations']
      );
      var dayNames =
        agjCalendar['translations']['days'][agjCalendar['dayNameFormat']];
      daysMarkup += '<div';
      daysMarkup += ' class="agjCalendar-' + lowercaseDayName + '"';
      daysMarkup += ' title="' + tooltipText + '"';
      daysMarkup += '>';
      daysMarkup +=   dayNames[days[i]];
      daysMarkup +='</div>';
    }
    calendarElement.find('div.agjCalendar-days').empty().append(daysMarkup);

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
            '<span id="agjCalendar-powered-by-before"></span>' +
            '<a' +
              ' href="https://agjCalendar.agjjQuery.org/"' +
              ' target="_blank"' +
              ' title="agjCalendar"' +
              ' id="agjCalendar-powered-by"' +
            '>' +
              'agjCalendar' +
            '</a>' +
            '<span id="agjCalendar-powered-by-after"></span>' +
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

    versionlessBind(
      calendarElement.find('#agjCalendar-hide'),
      'click',
      function() {
        $.agjCalendar.deactivate();
        return false;
      }
    );

    versionlessBind(
      calendarElement.find('#agjCalendar-dropdown'),
      'change',
      function() {
        var firstDayOfTheMonth = $.agjCalendar.stringToDate(
          $(this).val() + '-01',
          'Y-m-d'
        );
        if (firstDayOfTheMonth !== -1) {
          redrawCalendars(firstDayOfTheMonth);
        }
      }
    );

    versionlessBind(
      calendarElement.find(
        'a.agjCalendar-previous-month, a.agjCalendar-next-month'
      ),
      'click',
      function() {
        var firstDayOfTheMonth = $.agjCalendar.stringToDate(
          $('#agjCalendar-dropdown').val() + '-01',
          'Y-m-d'
        );
        if (firstDayOfTheMonth !== -1) {
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

          var newDropdownValue = $.agjCalendar.dateToString(
            firstDayOfTheMonth,
            'Y-m'
          );
          if (
            calendarElement.find(
              '#agjCalendar-dropdown option[value=' + newDropdownValue + ']'
            ).length > 0
          ) {
            calendarElement.find('#agjCalendar-dropdown').val(newDropdownValue);
            versionlessTrigger(
              calendarElement.find('#agjCalendar-dropdown'),
              'change'
            );
          }
        }
        return false;
      }
    );

    /**
     * The repositionCalendar() function will handle events where the window
     * size may have changed.
     * @returns {void}
     */
    var repositionCalendar = function() {
      if ($.agjCalendar.isActive()) {
        var calendarElement = $('#agjCalendar');
        if (
          calendarElement.attr('data-agjCalendar-active') !== undefined &&
          calendarElement.attr('data-agjCalendar-active').length > 0 &&
          parseInt(calendarElement.attr('data-agjCalendar-active'), 10) !== -1
        ) {
          var agjCalendar = agjCalendars[
            parseInt(calendarElement.attr('data-agjCalendar-active'), 10)
          ];

          var agjCalendarIsEnd =
            calendarElement.attr('data-agjCalendar-active-is-end') === true ||
            calendarElement.attr('data-agjCalendar-active-is-end') === 'true';

          positionCalendar(agjCalendar, agjCalendarIsEnd);
        }
      }
    };
    versionlessBind($(window), 'resize', repositionCalendar);
    versionlessBind($(document), 'resize', repositionCalendar);
    versionlessBind($(document), 'scroll', repositionCalendar);
    versionlessBind(
      $(document),
      'keyup',
      function(event) {
        if (event.key === 'Escape' && $.agjCalendar.isActive()) {
          versionlessTrigger($('*:focus'), 'blur');
          $.agjCalendar.deactivate();
          return false;
        }
        return true;
      }
    );
    versionlessBind(
      $(document),
      'click',
      function(event) {
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
            var active = $('#agjCalendar').attr('data-agjCalendar-active');
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
      }
    );

    return calendarElement;
  };

  /**
   * The dateFormatIsValid() function will determine whether a passed date
   * format is valid for use or not.
   * @param {string} dateFormat - The date format to validate.
   * @returns {boolean} - Returns true for valid formats otherwise false.
   */
  var dateFormatIsValid = function(dateFormat) {
    var exampleDateFormats = {
      a: 'am',
      A: 'AM',
      B: '000',
      c: '2000-01-01T00:00:00+00:00',
      d: '01',
      D: includedTranslations['en']['days']['abbreviated'][0],
      F: includedTranslations['en']['months']['full'][0],
      g: '1',
      G: '0',
      h: '01',
      H: '00',
      i: '00',
      j: '1',
      l: includedTranslations['en']['days']['full'][0],
      L: '0',
      m: '01',
      M: includedTranslations['en']['months']['abbreviated'][0],
      n: '1',
      N: '1',
      o: '2000',
      r: includedTranslations['en']['days']['abbreviated'][0] + ', 25 ' +
        includedTranslations['en']['months']['abbreviated'][0] +
        ' 2024 01:21:33 +0000',
      s: '00',
      S: 'st',
      t: '28',
      u: '123456',
      U: '1000000000',
      v: '123',
      w: '0',
      W: '1',
      x: '2000',
      X: '+2000',
      y: '00',
      Y: '2000',
      z: '0'
    };

    var example = '';

    var processPosition = 0;
    while (dateFormat.length > processPosition) {
      var dateFormatFound = false;

      for (var format in exampleDateFormats) {
        if (
          Object.prototype.hasOwnProperty.call(exampleDateFormats, format) &&
          dateFormat.substring(
            processPosition,
            processPosition + format.length
          ) === format
        ) {
          example += exampleDateFormats[format];
          processPosition += format.length;

          dateFormatFound = true;

          break;
        }
      }

      if (!dateFormatFound) {
        example += dateFormat.substring(
          processPosition,
          processPosition + 1
        );
        processPosition++;
      }
    }

    // if the example string can be used to generate a date using
    // $.agjCalendar.stringToDate() we know it is a valid date format
    var exampleToDate = $.agjCalendar.stringToDate(
      example,
      dateFormat,
      includedTranslations['en']
    );
    return exampleToDate !== -1;
  };

  /**
   * The duplicateObject function() will accept an object as a parameter and
   * return an exact duplicate of that object removing the concern of copying
   * an object by reference.
   * @param {object|*} obj - The object to be duplicated.
   * @returns {object|*} - Returns an exact duplicate of the obj parameter if
   * it is an object and the obj parameter if not.
   */
  var duplicateObject = function(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    var newObj = obj.constructor();
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = duplicateObject(obj[key]);
      }
    }
    return newObj;
  };

  /**
   * The es2018IsSupported function will check if the user’s browser supports
   * ECMAScript 2018 including emoji regular expresion patterns.
   * @returns {boolean} - Returns true if the user’s browser supports ECMAScript
   * 2018 or false if not.
   */
  var es2018IsSupported = function() {
    try {
      // Check for Promise.prototype.finally (introduced in ES2018)
      if (typeof Promise.prototype.finally !== 'function') {
        return false;
      }

      // Check for Object.entries (introduced in ES2017, which implies support
      // for ES2018)
      if (typeof Object.entries !== 'function') {
        return false;
      }

      // Check for async/await support (introduced in ES2017, which implies
      // support for ES2018)
      new Function('async function test() { await Promise.resolve(); }')();

      // Check for RegExp Lookbehind Assertions (introduced in ES2018)
      new RegExp('(?<=a)b');

      // Check for RegExp Unicode Property Escapes (introduced in ES2018)
      new RegExp('\\p{Script=Hiragana}', 'u');

      return true;
    } catch {
      return false;
    }
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
          activeDate = $.agjCalendar.stringToDate(
            $(agjCalendar[
              getEnd ? 'endDateSelector' : 'dateSelector'
            ]).val(),
            agjCalendar['dateFormat'],
            agjCalendar['translations']
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

          activeDate = $.agjCalendar.stringToDate(
            startDateString,
            'Y-m-d',
            agjCalendar['translations']
          );
          break;
      }
    }

    if (activeDate !== -1) {
      if (activeDate < agjCalendar['minimumDate']) {
        return new Date(
          agjCalendar['minimumDate'].getFullYear(),
          agjCalendar['minimumDate'].getMonth(),
          agjCalendar['minimumDate'].getDate()
        );
      } else if (activeDate > agjCalendar['maximumDate']) {
        return new Date(
          agjCalendar['maximumDate'].getFullYear(),
          agjCalendar['maximumDate'].getMonth(),
          agjCalendar['maximumDate'].getDate()
        );
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
    return !isNaN(cssValue) ? parseInt(cssValue, 10) : 0;
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
    return new Date(year, parseInt(month, 10) + 1, 0).getDate();
  };

  /**
   * The getEffectiveZIndex() function will calculate the effective z-index of
   * the passed element. Inspired by jQuery UI’s datepicker_getZindex function.
   * @param {object} element - The jQuery element we want the z-index of.
   * @returns {number} - The z-index of the jQuery element passed.
   */
  var getEffectiveZIndex = function(element) {
    /**
     * This function was inspired by jQuery UI’s datepicker_getZindex function
     * which was released under the following license.
     * @license MIT
     * Copyright OpenJS Foundation and other contributors
     * Released under the MIT license.
     * https://jquery.org/license
     * @see {@link https://github.com/jquery/jquery-ui/blob/1.13.3/ui/widgets/datepicker.js#L43}
     * @see {@link https://jquery.org/license}
     */
    while (element.length && element[0] !== document) {
      switch (element.css('position')) {
        case 'absolute':
        case 'relative':
        case 'fixed':
          var zIndex = parseInt(element.css('zIndex'), 10);
          if (!isNaN(zIndex) && zIndex !== 0) {
            return zIndex;
          }
          break;
      }

      element = element.parent();
    }

    return 0;
  };

  /**
   * The getIso8601WeekNumber() function will return the ISO 8601 week number of
   * the passed date.
   * @param {object} date - The date to extract the ISO 8601 week number from.
   * @returns {number} - The ISO 8601 week number of the passed date.
   */
  var getIso8601WeekNumber = function(date) {
    var date = new Date(date.getTime());
    date.setHours(0, 0, 0, 0);

    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);

    // January 4th is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);

    // Adjust to Thursday in week 1 and count number of weeks from week 1.
    return 1 + Math.round(
      (
        (date.getTime() - week1.getTime()) /
        86400000- 3 + (week1.getDay() + 6) % 7
      ) / 7
    );
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
   * The integrationIsActive() function will check if a specific integration is
   * active.
   * @param {number} position - The position of the integration to check.
   * @param {boolean} isEnd - Check if the end date is active.
   * @returns {boolean} - Returns true if the integration whose position was
   * passed is active or false if not.
   */
  var integrationIsActive = function(position, isEnd) {
    if ($.agjCalendar.isActive()) {
      var calendarElement = $('#agjCalendar');
      if (
        parseInt(
          calendarElement.attr('data-agjCalendar-active'),
          10
        ) === position
      ) {
        var activeIsEnd =
          calendarElement.attr('data-agjCalendar-active-is-end') === true ||
          calendarElement.attr('data-agjCalendar-active-is-end') === 'true';
        return activeIsEnd === isEnd;
      }
    }
    return false;
  };

  /**
   * The mergeObjects function() will accept two objects nad merge them into a
   * single object.
   * @param {object} object1 - The first object.
   * @param {object} object2 - The second object.
   * @returns {object|number} - Returns a merged object if successful or -1 if
   * the merge fails.
   */
  var mergeObjects = function(object1, object2) {
    if (typeof object1 !== 'object' || typeof object2 !== 'object') {
      return -1;
    }

    var newObject = duplicateObject(object1);
    if (object2 !== undefined && object2 !== null) {
      for (var key in object2) {
        if (Object.prototype.hasOwnProperty.call(object2, key)) {
          newObject[key] = object2[key];
        }
      }
    }
    return newObject;
  };

  /**
   * The numberToText() function will return a number as text.
   * @param {number} number - The number to be returned as text.
   * @returns {string|number} - The number as text or -1 if the conversion
   * fails.
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
        calendarElement
          .addClass('agjCalendar-full')
          .css({
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
      var agjCalendar = agjCalendars[
        calendarElement.attr('data-agjCalendar-active')
      ];
      var agjCalendarIsEnd =
        calendarElement.attr('data-agjCalendar-active-is-end') === true ||
        calendarElement.attr('data-agjCalendar-active-is-end') === 'true';

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
              $.agjCalendar.dateToString(drawMonth, 'Y-m')
            );
            break;

          case 2:
          case 3:
            $(calendarSelector + '-month-name').text(
              $.agjCalendar.dateToString(
                drawMonth,
                agjCalendar['dateFormatMonthLabel'],
                agjCalendar['translations']
              )
            );
            break;
        }

        var currentDay = 0;
        var calendarMarkup = '';
        if (getDay > 0) {
          calendarMarkup += '<div';
          calendarMarkup += ' class="agjCalendar-week agjCalendar-week-one"';
          calendarMarkup += '>';
          for (var day = 1; day <= getDay; day++) {
            currentDay++;
            calendarMarkup += '<div class="agjCalendar-blank agjCalendar-';
            calendarMarkup +=   includedTranslations['en']['days']['full'][
              (currentDay - (agjCalendar['startWeekOnMonday'] ? 0 : 1)) % 7
            ].toLowerCase();
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

            var classMarkup = 'agjCalendar-';
            classMarkup += includedTranslations['en']['days']['full'][
              (currentDay + (agjCalendar['startWeekOnMonday'] ? 1 : 0)) % 7
            ].toLowerCase();
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
              calendarMarkup += '<a';
              calendarMarkup += ' href="#"';
              calendarMarkup += ' title="' + $.agjCalendar.dateToString(
                drawDate,
                agjCalendar['dateFormatDateTooltip'],
                agjCalendar['translations']
              ) + '"';
              calendarMarkup += ' data-agjCalendar-date="';
              calendarMarkup += $.agjCalendar.dateToString(drawDate, 'Y-m-d');
              calendarMarkup += '"';
              calendarMarkup += '>';
            }
            calendarMarkup += $.agjCalendar.dateToString(
              drawDate,
              agjCalendar['dateFormatDate'],
              agjCalendar['translations']
            );
            if (dateIsSelectable) {
              calendarMarkup += '</a>';
            }
            calendarMarkup += '</div>';
          } else {
            calendarMarkup += '<div';
            calendarMarkup += ' class="agjCalendar-blank';
            calendarMarkup += ' agjCalendar-';
            calendarMarkup +=     includedTranslations['en']['days']['full'][
              (currentDay + (agjCalendar['startWeekOnMonday'] ? 1 : 0)) % 7
            ].toLowerCase();
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

      versionlessBind(
        $('div.agjCalendar-week a'),
        'click',
        function() {
          var newDate = $.agjCalendar.stringToDate(
            $(this).attr('data-agjCalendar-date'),
            'Y-m-d'
          );
          setDate(agjCalendar, newDate, agjCalendarIsEnd);
          if (agjCalendar['allowRange'] && !agjCalendarIsEnd) {
            autoSetEndDate(agjCalendar);
          }
          $.agjCalendar.deactivate();
          return false;
        }
      );

      if (agjCalendarDropdownElement.val() !== null) {
        var dropdownDate = $.agjCalendar.stringToDate(
          agjCalendarDropdownElement.val() + '-01',
          'Y-m-d'
        );
        dropdownDate.setFullYear(
          dropdownDate.getFullYear(),
          dropdownDate.getMonth() + 1,
          dropdownDate.getDate()
        );
        if (
          agjCalendarDropdownElement.find(
            'option[value=' + $.agjCalendar.dateToString(
              dropdownDate,
              'Y-m'
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
            'option[value=' + $.agjCalendar.dateToString(
              dropdownDate,
              'Y-m'
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
   * The regexTextPattern() function will generate a regular expression pattern
   * of all the stored text patterns.
   * @returns {string} - A regular expression pattern of all the stored text
   * patterns.
   */
  var regexTextPattern = function() {
    var regexTextPattern = '([';
    regexTextPattern += regexTextPatterns.join('');
    if (emojiSupportEnabled) {
      regexTextPattern += '\\p{Emoji}\\u200D';
      regexTextPattern += '(';
      regexTextPattern += '\\uFE0F|\\u200D';
      regexTextPattern += '\\p{Emoji_Presentation}\\p{Extended_Pictographic}';
      regexTextPattern += ')*';
    }
    regexTextPattern += ']+';
    regexTextPattern += ')';

    return regexTextPattern;
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
          newValue = agjCalendar['translations']['blankDateText'];
        } else {
          newValue = $.agjCalendar.dateToString(
            dateToSet,
            agjCalendar['dateFormat'],
            agjCalendar['translations']
          );
        }
        if (newValue.length > 0) {
          dateElement.val(newValue);
          versionlessTrigger(dateElement, 'change');
        }
        break;

      case 'dropdown':
        var dayValue;
        if (dateToSet === 'blank') {
          dayValue = '';
        } else {
          dayValue = $.agjCalendar.dateToString(dateToSet, 'd');
        }

        var monthElement = $(
          agjCalendar[setEnd ? 'endMonthSelector' : 'monthSelector']
        );
        var monthValue;
        if (dateToSet === 'blank') {
          monthValue = '';
        } else {
          monthValue = $.agjCalendar.dateToString(dateToSet, 'Y-m');
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
          monthElement.val(monthValue);
          versionlessTrigger(monthElement, 'change');

          updateDayElement(agjCalendar, setEnd);

          $(agjCalendar[setEnd ? 'endDaySelector' : 'daySelector']).val(
            dayValue
          );
          versionlessTrigger(
            $(agjCalendar[setEnd ? 'endDaySelector' : 'daySelector']),
            'change'
          );
        }
        break;
    }
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
   * The translationTextIsValid() function will validate translation text
   * against all the stored text patterns.
   * @param {string} translationText - The translation text to be validated.
   * @returns {boolean} - Returns true if the translation text is valid
   * otherwise false.
   */
  var translationTextIsValid = function(translationText) {
    return new RegExp(
      '^' + regexTextPattern() + '$',
      'gu'
    ).test(translationText);
  };

  /**
   * The unicodeToString() function will convert unicode characters in a string.
   * @param {string} unicode - The string with unicode characters in it.
   * @returns {void}
   */
  var unicodeToString = function(unicode) {
    if (typeof unicode !== 'string') {
      return unicode;
    }

    return unicode.replace(/\\u([\dA-F]{4})/gi, function(match, grp) {
      return String.fromCharCode(parseInt(grp, 16));
    }).replace(/\\u\{([\dA-F]{1,6})\}/gi, function(match, grp) {
      var codePoint = parseInt(grp, 16);
      if (codePoint <= 0xFFFF) {
        return String.fromCharCode(codePoint);
      } else {
        codePoint -= 0x10000;
        return String.fromCharCode(
          (codePoint >> 10) + 0xD800,
          (codePoint % 0x400) + 0xDC00
        );
      }
    });
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
      if (regexPatterns['YYYY-MM'].test(monthElement.val())) {
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

        var monthElementMonth = monthElement.val().substring(
          monthElement.val().lastIndexOf('-') + 1,
          monthElement.val().lastIndexOf('-') + 3
        );
        monthElementMonth = parseInt(monthElementMonth, 10) - 1;
        var drawDate = $.agjCalendar.stringToDate(
          monthElement.val() + '-01',
          'Y-m-d'
        );
        while (
          drawDate < maximumDate &&
          drawDate.getMonth() === monthElementMonth
        ) {
          if (drawDate >= minimumDate) {
            var optionMarkup = '<option';
            optionMarkup += ' value="' + $.agjCalendar.dateToString(
              drawDate,
              'd'
            ) + '"';
            if (
              selectedDate !== -1 &&
              drawDate.getDate() === selectedDate.getDate()
            ) {
              optionMarkup += ' selected="selected"';
            }
            optionMarkup += '>';
            optionMarkup += $.agjCalendar.dateToString(
              drawDate,
              agjCalendar['dateFormatDayInput'],
              agjCalendar['translations']
            );
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
        '<option value="' + $.agjCalendar.dateToString(drawDate, 'Y-m') + '">' +
          $.agjCalendar.dateToString(
            drawDate,
            agjCalendar['dateFormatMonthDropdown'],
            agjCalendar['translations']
          ) +
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
        optionMarkup += ' value="' + $.agjCalendar.dateToString(
          drawDate,
          'Y-m'
        ) + '"';
        if (
          selectedDate !== -1 &&
          drawDate.getFullYear() === selectedDate.getFullYear() &&
          drawDate.getMonth() === selectedDate.getMonth()
        ) {
          optionMarkup += ' selected="selected"';
        }
        optionMarkup += '>';
        optionMarkup += $.agjCalendar.dateToString(
          drawDate,
          agjCalendar['dateFormatMonthInput'],
          agjCalendar['translations']
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
   * The versionlessBind() function will bind an event handler to an element
   * regardless of jQuery version.
   * @param {object} element - The element to bind the event handler to.
   * @param {string} event - The event to bind the event handler to.
   * @param {object|Function} data - (optional) Data to pass through to the
   * event.
   * @param {Function} fn - The event handler.
   * @returns {jQuery} - Returns the element to allow for chaining.
   */
  var versionlessBind = function(element, event, data, fn) {
    // the data field is optional so this will handle calls to
    // versionlessBind(element, event, fn)
    if (typeof data === 'function' && typeof fn === 'undefined') {
      fn = data;
      data = undefined;
    }

    switch (jQueryMajorVersion) {
      case 1:
        if (data === undefined) {
          return element.bind(event, fn);
        } else {
          return element.bind(event, data, fn);
        }

      case 2:
      case 3:
      default:
        if (data === undefined) {
          return element.on(event, fn);
        } else {
          return element.on(event, data, fn);
        }
    }
  };

  /**
   * The versionlessTrigger() function will trigger an event regardless of
   * jQuery version.
   * @param {object} element - The element to trigger.
   * @param {string} event - The event to trigger.
   * @returns {jQuery} - Returns the element to allow for chaining.
   */
  var versionlessTrigger = function(element, event) {
    switch (jQueryMajorVersion) {
      case 1:
        return element[event]();

      case 2:
      case 3:
      default:
        return element.trigger(event);
    }
  };

  /**
   * The yearIsLeapYear() function will determine if a given year is or isn’t a
   * leap year.
   * @param {number} year - The year we will check.
   * @returns {boolean} - Returns true if the year is a leap year or false if
   * not.
   */
  var yearIsLeapYear = function(year) {
    year = parseInt(year, 10);
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  /**
   * The $.agjCalendar() function will initialize a new agjCalendar integration.
   * @param {object} options - A JSON object of configuration options.
   * @returns {number} - Returns the position of the new agjCalendar integration
   * on success or -1 on error.
   */
  $.agjCalendar = function(options) {
    // options must be an object
    if (typeof options !== 'object') {
      options = {};
    }

    var maximumDateDefaultValue = new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    );

    options = mergeObjects({
      allowBlankDates:            false,
      allowRange:                 false,
      autoBlur:                   null,
      autoSetEndDate:             'dates',
      calendarCount:              1,
      calendarDisplay:            'inline',
      calendarSize:               'small',
      dateFormat:                 'm/d/Y',
      dateFormatDate:             'j',
      dateFormatDateTooltip:      '', // if English 'F j, Y' otherwise 'j F Y'
      dateFormatDayInput:         'j',
      dateFormatDayOfWeekTooltip: 'l',
      dateFormatMonthDropdown:    'M Y',
      dateFormatMonthInput:       'M Y',
      dateFormatMonthLabel:       'F Y',
      dateSelector:               null,
      dayNameEllipsis:            true,
      dayNameFormat:              'short',
      daySelector:                null,
      defaultDate:                new Date(),
      defaultEndDate:             null,
      defaultRange:               -1,
      endDateSelector:            null,
      endDaySelector:             null,
      endExpanderSelector:        null,
      endMonthSelector:           null,
      excludeDates:               [],
      expanderSelector:           null,
      forceMaxZIndex:             false,
      inputType:                  'text',
      language:                   'en',
      maximumDate:                maximumDateDefaultValue,
      maximumRange:               -1,
      minimumDate:                new Date(),
      minimumRange:               -1,
      monthSelector:              null,
      overwriteDayOptions:        true,
      overwriteMonthOptions:      true,
      startWeekOnMonday:          false,
      theme:                      null,
      translations:               {}
    }, options);


    // intialize the new agjCalendar integration
    var agjCalendar = {
      disabled: false,
      position: agjCalendars.length
    };


    // first we duplicate all the values from the included translations using
    // the language option
    switch (options['language']) {
      case 'ar': // اَلْعَرَبِيَّةُ (Arabic)
      case 'bn': // বাংলা (Bengali)
      case 'de': // Deutsch (German)
      case 'es': // Español (Spanish)
      case 'fr': // Français (French)
      case 'he': // עִבְרִית (Hebrew)
      case 'hi': // आधुनिक मानक हिन्दी (Hindi)
      case 'it': // Italiano (Italian)
      case 'ja': // 日本語 (Japanese)
      case 'ko': // 한국어 (Korean)
      case 'mr': // मराठी (Marathi)
      case 'pa': // پنجابی (Punjabi)
      case 'pt': // Português (Portuguese)
      case 'ru': // русский язык (Russian)
      case 'te': // తెలుగు (Telugu)
      case 'tr': // Türkçe (Turkish)
      case 'ur': // اردو (Urdu)
      case 'vi': // Tiếng Việt (Vietnamese)
      case 'zh': // 官话 (Chinese Mandarin)
        agjCalendar['translations'] = duplicateObject(
          includedTranslations[options['language']]
        );
        break;

      case 'en': // English
      default:
        agjCalendar['translations'] = duplicateObject(
          includedTranslations['en']
        );
    }

    // next we overwrite any values passed in the translations option
    if (typeof options['translations'] === 'object') {
      // process day name, month name and meridiem indicator translations
      for (
        var i = 0, units = ['days', 'months', 'meridiemIndicators'];
        i < units.length;
        i++
      ) {
        if (typeof options['translations'][units[i]] !== 'undefined') {
          for (var format in agjCalendar['translations'][units[i]]) {
            if (
              Object.prototype.hasOwnProperty.call(
                options['translations'][units[i]],
                format
              ) &&
              typeof options['translations'][units[i]][format] !== 'undefined'
            ) {
              for (
                var position in agjCalendar['translations'][units[i]][format]
              ) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    options['translations'][units[i]][format],
                    position
                  ) &&
                  typeof options['translations'][units[i]][format][position] !==
                    'undefined'
                ) {
                  if (
                    options['translations'][units[i]][format][position].length >
                      0 &&
                    !translationTextIsValid(
                      options['translations'][units[i]][format][position]
                    )
                  ) {
                    throwError(
                      'Invalid translation `translations[' + units[i] + '][' +
                      format + '][' + position + ']` value: "' +
                      options['translations'][units[i]][format][position] + '"'
                    );
                    return -1;
                  } else {
                    agjCalendar['translations'][units[i]][format][position] =
                      options['translations'][units[i]][format][position];
                  }
                }
              }
            }
          }
        }
      }

      // process ordinal suffix translations
      if (typeof options['translations']['ordinalSuffixes'] !== 'undefined') {
        for (var position in agjCalendar['translations']['ordinalSuffixes']) {
          if (
            Object.prototype.hasOwnProperty.call(
              options['translations']['ordinalSuffixes'],
              position
            ) &&
            typeof options['translations']['ordinalSuffixes'][position] !==
              'undefined'
          ) {
            if (
              options['translations']['ordinalSuffixes'][position].length > 0 &&
              !translationTextIsValid(
                options['translations']['ordinalSuffixes'][position]
              )
            ) {
              throwError(
                'Invalid translation `translations[ordinalSuffixes][' +
                position + ']` value: "' +
                options['translations']['ordinalSuffixes'][position] + '"'
              );
              return -1;
            } else {
              agjCalendar['translations']['ordinalSuffixes'][position] =
                options['translations']['ordinalSuffixes'][position];
            }
          }
        }
      }

      // process all other translations
      for (var i = 0, keys = [
        'hideCalendar',
        'nextMonth',
        'previousMonth',
        'poweredByBefore',
        'poweredByAfter',
        'blankDateText'
      ]; i < keys.length; i++) {
        var key = keys[i];
        if (typeof options['translations'][key] !== 'undefined') {
          if (
            options['translations'][key].length > 0 &&
            !translationTextIsValid(options['translations'][key])
          ) {
            throwError(
              'Invalid translation `translations[' + key + ']` value: "' +
              options['translations'][key] + '"'
            );
            return -1;
          } else {
            agjCalendar['translations'][key] = options['translations'][key];
          }
        }
      }
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


    agjCalendar['calendarDisplay'] = 'inline';
    switch (options['calendarDisplay']) {
      case 'modal':
      case 'full':
        agjCalendar['calendarDisplay'] = options['calendarDisplay'];
        break;
    }


    agjCalendar['calendarCount'] = 1;
    switch (options['calendarDisplay']) {
      case 'inline':
      case 'modal':
        switch (options['calendarCount']) {
          case 2:
          case 3:
            agjCalendar['calendarCount'] = options['calendarCount'];
            break;
        }
        break;
    }


    agjCalendar['calendarSize'] = 'small';
    switch (options['calendarDisplay']) {
      case 'inline':
      case 'modal':
        switch (options['calendarSize']) {
          case 'medium':
          case 'large':
            agjCalendar['calendarSize'] = options['calendarSize'];
            break;
        }
        break;
    }


    agjCalendar['forceMaxZIndex'] = false;
    if (options['forceMaxZIndex'] === true) {
      agjCalendar['forceMaxZIndex'] = true;
    }


    agjCalendar['autoBlur'] = false;
    if (options['autoBlur'] === true) {
      agjCalendar['autoBlur'] = true;
    } else {
      if (agjCalendar['inputType'] === 'text') {
        switch (agjCalendar['calendarDisplay']) {
          case 'modal':
          case 'full':
            agjCalendar['autoBlur'] = true;
            break;
        }
      }
    }


    agjCalendar['dayNameEllipsis'] = true;
    if (options['dayNameEllipsis'] === false) {
      agjCalendar['dayNameEllipsis'] = false;
    }


    agjCalendar['dayNameFormat'] = 'short';
    switch (options['dayNameFormat']) {
      case 'medium': // this is here for backwards compatibility
        agjCalendar['dayNameFormat'] = 'abbreviated';
        break;

      case 'abbreviated':
      case 'full':
        agjCalendar['dayNameFormat'] = options['dayNameFormat'];
        break;
    }


    switch (options['dateFormat']) {
      case 1: // this is here for backwards compatibility
        agjCalendar['dateFormat'] = 'm/d/Y';
        break;

      case 2: // this is here for backwards compatibility
        agjCalendar['dateFormat'] = 'M j, Y';
        break;

      case 3: // this is here for backwards compatibility
        agjCalendar['dateFormat'] = 'd/m/Y';
        break;

      case 4: // this is here for backwards compatibility
        agjCalendar['dateFormat'] = 'Y-m-d';
        break;

      case 5: // this is here for backwards compatibility
        agjCalendar['dateFormat'] = 'j F Y';
        break;

      default:
        if (dateFormatIsValid(options['dateFormat'])) {
          agjCalendar['dateFormat'] = options['dateFormat'];
        } else {
          agjCalendar['dateFormat'] = 'm/d/Y';
        }
        break;
    }


    if (
      typeof options['dateFormatDate'] === 'string' &&
      ( // ensure at least one day character is used
        options['dateFormatDate'].indexOf('j') >= 0 ||
        options['dateFormatDate'].indexOf('d') >= 0 ||
        options['dateFormatDate'].indexOf('z') >= 0
      )
    ) {
      agjCalendar['dateFormatDate'] = options['dateFormatDate'];
    } else {
      agjCalendar['dateFormatDate'] = 'j';
    }


    switch (options['dateFormatDateTooltip']) {
      case 1: // this is here for backwards compatibility
        agjCalendar['dateFormatDateTooltip'] = 'm/d/Y';
        break;

      case 2: // this is here for backwards compatibility
        agjCalendar['dateFormatDateTooltip'] = 'M j, Y';
        break;

      case 3: // this is here for backwards compatibility
        agjCalendar['dateFormatDateTooltip'] = 'd/m/Y';
        break;

      case 4: // this is here for backwards compatibility
        agjCalendar['dateFormatDateTooltip'] = 'Y-m-d';
        break;

      case 5: // this is here for backwards compatibility
        agjCalendar['dateFormatDateTooltip'] = 'j F Y';
        break;

      default:
        if (dateFormatIsValid(options['dateFormatDateTooltip'])) {
          agjCalendar['dateFormatDateTooltip'] =
            options['dateFormatDateTooltip'];
        } else if (options['language'] === 'en') {
          agjCalendar['dateFormatDateTooltip'] = 'F j, Y';
        } else {
          agjCalendar['dateFormatDateTooltip'] = 'j F Y';
        }
        break;
    }


    if (
      typeof options['dateFormatDayOfWeekTooltip'] === 'string' &&
      ( // ensure at least one day of week character is used
        options['dateFormatDayOfWeekTooltip'].indexOf('D') >= 0 ||
        options['dateFormatDayOfWeekTooltip'].indexOf('l') >= 0 ||
        options['dateFormatDayOfWeekTooltip'].indexOf('N') >= 0 ||
        options['dateFormatDayOfWeekTooltip'].indexOf('w') >= 0
      )
    ) {
      agjCalendar['dateFormatDayOfWeekTooltip'] =
        options['dateFormatDayOfWeekTooltip'];
    } else {
      agjCalendar['dateFormatDayOfWeekTooltip'] = 'l';
    }


    if (
      typeof options['dateFormatMonthDropdown'] === 'string' &&
      ( // ensure at least one month character is used
        options['dateFormatMonthDropdown'].indexOf('F') >= 0 ||
        options['dateFormatMonthDropdown'].indexOf('m') >= 0 ||
        options['dateFormatMonthDropdown'].indexOf('M') >= 0 ||
        options['dateFormatMonthDropdown'].indexOf('n') >= 0
      ) &&
      ( // ensure at least one year character is used
        options['dateFormatMonthDropdown'].indexOf('o') >= 0 ||
        options['dateFormatMonthDropdown'].indexOf('x') >= 0 ||
        options['dateFormatMonthDropdown'].indexOf('X') >= 0 ||
        options['dateFormatMonthDropdown'].indexOf('y') >= 0 ||
        options['dateFormatMonthDropdown'].indexOf('Y') >= 0
      )
    ) {
      agjCalendar['dateFormatMonthDropdown'] =
        options['dateFormatMonthDropdown'];
    } else {
      agjCalendar['dateFormatMonthDropdown'] = 'M Y';
    }


    if (
      typeof options['dateFormatMonthInput'] === 'string' &&
      ( // ensure at least one month character is used
        options['dateFormatMonthInput'].indexOf('F') >= 0 ||
        options['dateFormatMonthInput'].indexOf('m') >= 0 ||
        options['dateFormatMonthInput'].indexOf('M') >= 0 ||
        options['dateFormatMonthInput'].indexOf('n') >= 0
      ) &&
      ( // ensure at least one year character is used
        options['dateFormatMonthInput'].indexOf('o') >= 0 ||
        options['dateFormatMonthInput'].indexOf('x') >= 0 ||
        options['dateFormatMonthInput'].indexOf('X') >= 0 ||
        options['dateFormatMonthInput'].indexOf('y') >= 0 ||
        options['dateFormatMonthInput'].indexOf('Y') >= 0
      )
    ) {
      agjCalendar['dateFormatMonthInput'] =
        options['dateFormatMonthInput'];
    } else {
      agjCalendar['dateFormatMonthInput'] = 'M Y';
    }


    if (
      typeof options['dateFormatDayInput'] === 'string' &&
      ( // ensure at least one day character is used
        options['dateFormatDayInput'].indexOf('d') >= 0 ||
        options['dateFormatDayInput'].indexOf('j') >= 0 ||
        options['dateFormatDayInput'].indexOf('z') >= 0
      )
    ) {
      agjCalendar['dateFormatDayInput'] =
        options['dateFormatDayInput'];
    } else {
      agjCalendar['dateFormatDayInput'] = 'j';
    }


    if (
      typeof options['dateFormatMonthLabel'] === 'string' &&
      ( // ensure at least one month character is used
        options['dateFormatMonthLabel'].indexOf('F') >= 0 ||
        options['dateFormatMonthLabel'].indexOf('m') >= 0 ||
        options['dateFormatMonthLabel'].indexOf('M') >= 0 ||
        options['dateFormatMonthLabel'].indexOf('n') >= 0
      ) &&
      ( // ensure at least one year character is used
        options['dateFormatMonthLabel'].indexOf('o') >= 0 ||
        options['dateFormatMonthLabel'].indexOf('x') >= 0 ||
        options['dateFormatMonthLabel'].indexOf('X') >= 0 ||
        options['dateFormatMonthLabel'].indexOf('y') >= 0 ||
        options['dateFormatMonthLabel'].indexOf('Y') >= 0
      )
    ) {
      agjCalendar['dateFormatMonthLabel'] =
        options['dateFormatMonthLabel'];
    } else {
      agjCalendar['dateFormatMonthLabel'] = 'F Y';
    }


    agjCalendar['theme'] = '';
    switch (options['theme']) {
      case 'red':
      case 'orange':
      case 'yellow':
      case 'green':
      case 'cyan':
      case 'blue':
      case 'purple':
      case 'pink':
        agjCalendar['theme'] = options['theme'];
        break;

      default:
        // custom themes must begin with 'custom-'
        if (
          typeof options['theme'] === 'string' &&
          options['theme'].toLowerCase().indexOf('custom-') === 0
        ) {
          agjCalendar['theme'] = options['theme'];
        }
        break;
    }


    agjCalendar['autoSetEndDate'] = 'dates';
    switch (options['autoSetEndDate']) {
      case true: // this is here for backwards compatibility
        agjCalendar['autoSetEndDate'] = 'always';
        break;

      case false: // this is here for backwards compatibility
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
    if (regexPatterns['YYYY-MM-DD'].test(options['minimumDate'])) {
      agjCalendar['minimumDate'] = $.agjCalendar.stringToDate(
        options['minimumDate'],
        'Y-m-d'
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
    if (regexPatterns['YYYY-MM-DD'].test(options['maximumDate'])) {
      var maximumDate = $.agjCalendar.stringToDate(
        options['maximumDate'],
        'Y-m-d'
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
      regexPatterns['YYYY-MM-DD'].test(options['defaultDate']) ||
      options['defaultDate'] instanceof Date
    ) {
      var defaultDate = new Date();

      if (regexPatterns['YYYY-MM-DD'].test(options['defaultDate'])) {
        defaultDate = $.agjCalendar.stringToDate(
          options['defaultDate'],
          'Y-m-d'
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

        if (regexPatterns['YYYY-MM-DD'].test(options['excludeDates'][i])) {
          excludeDate = $.agjCalendar.stringToDate(
            options['excludeDates'][i],
            'Y-m-d'
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
        regexPatterns['YYYY-MM-DD'].test(options['defaultEndDate']) ||
        options['defaultEndDate'] instanceof Date
      ) {
        var defaultEndDate = new Date();

        if (regexPatterns['YYYY-MM-DD'].test(options['defaultEndDate'])) {
          defaultEndDate = $.agjCalendar.stringToDate(
            options['defaultEndDate'],
            'Y-m-d'
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
          agjCalendar['defaultEndDate'] = new Date(
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
     * @returns {boolean} - Returns false.
     */
    var inputFocusEvent = function(event) {
      if (
        $(this).attr('data-agjCalendar-bound-to') !== undefined &&
        $(this).attr('data-agjCalendar-bound-to').length > 0
      ) {
        if (!integrationIsActive(agjCalendar['position'], event.data.isEnd)) {
          // if the integration isn’t active then activate it
          activateCalendar(agjCalendar, event.data.isEnd);
        }

        if (agjCalendar['autoBlur']) {
          versionlessTrigger($(this), 'blur');
        }
      }
      return false;
    };

    var expanderElement = $(options['expanderSelector']);
    if (options['expanderSelector'] !== null) {
      if (expanderElement.length !== 1) {
        throwError(
          'Invalid `expanderSelector` value: "' + options['expanderSelector'] +
          '" (' + expanderElement.length + ' elements found, 1 required)'
        );
        return -1;
      } else if (
        expanderElement.attr('data-agjCalendar-bound-to') !== undefined &&
        expanderElement.attr('data-agjCalendar-bound-to').length > 0
      ) {
        throwError(
          'Already used `expanderSelector`: "' + options['expanderSelector'] +
          '" (`data-agjCalendar-bound-to` attribute found, missing required)'
        );
        return -1;
      } else {
        agjCalendar['expanderSelector'] = options['expanderSelector'];

        expanderElement
          .attr('data-agjCalendar-bound-to', agjCalendar['position']);
        versionlessBind(
          expanderElement,
          'click',
          {
            isEnd: false
          },
          inputFocusEvent
        );

        if (agjCalendar['allowRange']) {
          var endExpanderElement = $(options['endExpanderSelector']);
          if (options['endExpanderSelector'] !== null) {
            if (endExpanderElement.length !== 1) {
              throwError(
                'Invalid `endExpanderSelector` value: "' +
                options['endExpanderSelector'] + '" (' +
                endExpanderElement.length + ' elements found, 1 required)'
              );
              return -1;
            } else if (
              endExpanderElement.attr('data-agjCalendar-bound-to') !==
                undefined &&
              endExpanderElement.attr('data-agjCalendar-bound-to').length > 0
            ) {
              throwError(
                'Already used `endExpanderSelector`: "' +
                options['endExpanderSelector'] +
                '" (`data-agjCalendar-bound-to` attribute found, missing ' +
                'required)'
              );
              return -1;
            } else {
              agjCalendar['endExpanderSelector'] =
                options['endExpanderSelector'];

              endExpanderElement
                .attr('data-agjCalendar-bound-to', agjCalendar['position']);
              versionlessBind(
                endExpanderElement,
                'click',
                {
                  isEnd: true
                },
                inputFocusEvent
              );
            }
          }
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
          return -1;
        } else if (
          dateElement.attr('data-agjCalendar-bound-to') !== undefined &&
          dateElement.attr('data-agjCalendar-bound-to').length > 0
        ) {
          throwError(
            'Already used `dateSelector`: "' + options['dateSelector'] +
            '" (`data-agjCalendar-bound-to` attribute found, missing required)'
          );
          return -1;
        } else {
          agjCalendar['dateSelector'] = options['dateSelector'];

          /**
           * The inputBlurEvent() function will handle events when an
           * integration’s input loses focus.
           * @param {object} event - The event object.
           * @returns {boolean|void} - Returns true to allow chaining.
           */
          var inputBlurEvent = function(event) {
            if (
              $(this).attr('data-agjCalendar-bound-to') !== undefined &&
              $(this).attr('data-agjCalendar-bound-to').length > 0
            ) {
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
            }
          };

          var originalValue = dateElement.val();

          dateElement
            .attr('data-agjCalendar-bound-to', agjCalendar['position']);
          versionlessBind(
            dateElement,
            'blur',
            {
              isEnd: false
            },
            inputBlurEvent
          );
          versionlessBind(
            dateElement,
            'focus',
            {
              isEnd: false
            },
            inputFocusEvent
          );

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
              return -1;
            } else if (
              endDateElement.attr('data-agjCalendar-bound-to') !== undefined &&
              endDateElement.attr('data-agjCalendar-bound-to').length > 0
            ) {
              throwError(
                'Already used `endDateSelector`: "' +
                options['endDateSelector'] +
                '" (`data-agjCalendar-bound-to` attribute found, missing ' +
                'required)'
              );
              return -1;
            } else {
              agjCalendar['endDateSelector'] = options['endDateSelector'];

              originalValue = endDateElement.val();

              endDateElement
                .attr('data-agjCalendar-bound-to', agjCalendar['position']);
              versionlessBind(
                endDateElement,
                'blur',
                {
                  isEnd: true
                },
                inputBlurEvent
              );
              versionlessBind(
                endDateElement,
                'focus',
                {
                  isEnd: true
                },
                inputFocusEvent
              );

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
          return -1;
        } else if (
          monthElement.attr('data-agjCalendar-bound-to') !== undefined &&
          monthElement.attr('data-agjCalendar-bound-to').length > 0
        ) {
          throwError(
            'Already used `monthSelector`: "' + options['monthSelector'] +
            '" (`data-agjCalendar-bound-to` attribute found, missing required)'
          );
          return -1;
        } else {
          var dayElement = $(options['daySelector']);
          if (dayElement.length !== 1) {
            throwError(
              'Invalid `daySelector` value: "' + options['daySelector'] +
              '" (' + dayElement.length + ' elements found, 1 required)'
            );
            return -1;
          } else if (
            dayElement.attr('data-agjCalendar-bound-to') !== undefined &&
            dayElement.attr('data-agjCalendar-bound-to').length > 0
          ) {
            throwError(
              'Already used `daySelector`: "' + options['daySelector'] +
              '" (`data-agjCalendar-bound-to` attribute found, missing ' +
              'required)'
            );
            return -1;
          } else {
            dayElement
              .attr('data-agjCalendar-bound-to', agjCalendar['position']);
            monthElement
              .attr('data-agjCalendar-bound-to', agjCalendar['position']);

            agjCalendar['monthSelector'] = options['monthSelector'];
            agjCalendar['daySelector'] = options['daySelector'];

            /**
             * The monthChangeEvent() function will handle events when an
             * integration’s month input changes.
             * @param {object} event - The event object.
             * @returns {void}
             */
            var monthChangeEvent = function(event) {
              if (
                $(this).attr('data-agjCalendar-bound-to') !== undefined &&
                $(this).attr('data-agjCalendar-bound-to').length > 0
              ) {
                updateDayElement(agjCalendar, event.data.isEnd);
                if (!event.data.isEnd) {
                  autoSetEndDate(agjCalendar);
                }
              }
            };

            var originalMonthValue = monthElement.val();
            var originalDayValue = dayElement.val();

            versionlessBind(
              monthElement,
              'change',
              {
                isEnd: false
              },
              monthChangeEvent
            );

            updateMonthElement(agjCalendar);
            updateDayElement(agjCalendar);

            if (
              originalMonthValue !== null &&
              originalMonthValue.length > 0 &&
              monthElement.find(
                'option[value=' + originalMonthValue + ']'
              ).length > 0
            ) {
              monthElement.val(originalMonthValue);
              versionlessTrigger(monthElement, 'change');
            }

            if (
              originalDayValue !== null &&
              originalDayValue.length > 0 &&
              dayElement.find(
                'option[value=' + originalDayValue + ']'
              ).length > 0
            ) {
              dayElement.val(originalDayValue);
              versionlessTrigger(dayElement, 'change');
            }

            if (agjCalendar['allowRange']) {
              var endMonthElement = $(options['endMonthSelector']);
              if (endMonthElement.length !== 1) {
                throwError(
                  'Invalid `endMonthSelector` value: "' +
                  options['endMonthSelector'] + '" (' +
                  endMonthElement.length + ' elements found, 1 required)'
                );
                return -1;
              } else if (
                endMonthElement.attr('data-agjCalendar-bound-to') !==
                  undefined &&
                endMonthElement.attr('data-agjCalendar-bound-to').length > 0
              ) {
                throwError(
                  'Already used `endMonthSelector`: "' +
                  options['endMonthSelector'] +
                  '" (`data-agjCalendar-bound-to` attribute found, missing ' +
                  'required)'
                );
                return -1;
              } else {
                var endDayElement = $(options['endDaySelector']);
                if (endDayElement.length !== 1) {
                  throwError(
                    'Invalid `endDaySelector` value: "' +
                    options['endDaySelector'] + '" (' + endDayElement.length +
                    ' elements found, 1 required)'
                  );
                  return -1;
                } else if (
                  endDayElement.attr('data-agjCalendar-bound-to') !==
                    undefined &&
                  endDayElement.attr('data-agjCalendar-bound-to').length > 0
                ) {
                  throwError(
                    'Already used `endDaySelector`: "' +
                    options['endDaySelector'] +
                    '" (`data-agjCalendar-bound-to` attribute found, missing ' +
                    'required)'
                  );
                  return -1;
                } else {
                  endMonthElement
                    .attr('data-agjCalendar-bound-to', agjCalendar['position']);
                  endDayElement
                    .attr('data-agjCalendar-bound-to', agjCalendar['position']);

                  agjCalendar['endMonthSelector'] = options['endMonthSelector'];
                  agjCalendar['endDaySelector'] = options['endDaySelector'];

                  var originalMonthValue = endMonthElement.val();
                  var originalDayValue = endDayElement.val();

                  versionlessBind(
                    dayElement,
                    'change',
                    function() {
                      if (
                        $(this).attr('data-agjCalendar-bound-to') !==
                          undefined &&
                        $(this).attr('data-agjCalendar-bound-to').length > 0
                      ) {
                        autoSetEndDate(agjCalendar);
                        updateMonthElement(agjCalendar, true);
                        updateDayElement(agjCalendar, true);
                      }
                    }
                  );

                  endMonthElement
                    .attr('data-agjCalendar-bound-to', agjCalendar['position']);
                  versionlessBind(
                    endMonthElement,
                    'change',
                    {
                      isEnd: true
                    },
                    monthChangeEvent
                  );

                  updateMonthElement(agjCalendar, true);
                  updateDayElement(agjCalendar, true);

                  if (
                    originalMonthValue !== null &&
                    originalMonthValue.length > 0 &&
                    endMonthElement.find(
                      'option[value=' + originalMonthValue + ']'
                    ).length > 0
                  ) {
                    endMonthElement.val(originalMonthValue);
                    versionlessTrigger(endMonthElement, 'change');
                  }

                  if (
                    originalDayValue !== null &&
                    originalDayValue.length > 0 &&
                    endDayElement.find(
                      'option[value=' + originalDayValue + ']'
                    ).length > 0
                  ) {
                    endDayElement.val(originalDayValue);
                    versionlessTrigger(endDayElement, 'change');
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


    // return the position of the new integration to indicate success
    return agjCalendar['position'];
  };

  /**
   * The $.agjCalendar.addRegexTextPattern() function will add a new regular
   * expression so the plugin will identify text strings in dates.
   * @param {string} regexTextPattern - The new regular expression to be added.
   * @returns {void}
   */
  $.agjCalendar.addRegexTextPattern = function(regexTextPattern) {
    regexTextPatterns.push(regexTextPattern);
  };

  /**
   * The $.agjCalendar.dateToString() function will format a given date with a
   * given format in a string.
   * @param {Date} date - The date to format into a string.
   * @param {string} dateFormat - The date format to return the string in.
   * @param {object} translations - An object of translations.
   * @returns {string|number} - The date formatted as a string or -1 if the
   * conversion fails.
   */
  $.agjCalendar.dateToString = function(date, dateFormat, translations) {
    // date must be a date object
    if (typeof date !== 'object' || !(date instanceof Date)) {
      return -1;
    }

    // dateFormat must be a valid non-empty string
    dateFormat = unicodeToString(dateFormat);
    if (
      typeof dateFormat !== 'string' ||
      dateFormat.length === 0 ||
      !new RegExp(/[aABcdDFgGhHijlLmMnNorsStuUvwWxXyYz]{1}/, 'u').test(
        dateFormat
      )
    ) {
      return -1;
    }

    // if translations aren't an object pull in the included translations for
    // English
    if (typeof translations !== 'object') {
      translations = duplicateObject(includedTranslations['en']);
    }

    var dateFormats = {
      a: function(date) {
        var key = date.getHours() < 12 ? 0 : 1;
        return translations['meridiemIndicators']['lowercase'][key];
      },
      A: function(date) {
        var key = date.getHours() < 12 ? 0 : 1;
        return translations['meridiemIndicators']['uppercase'][key];
      },
      B: function(date) {
        // Get UTC time components
        var utcSeconds = date.getUTCSeconds();
        var utcMinutes = date.getUTCMinutes();
        var utcHours = date.getUTCHours();
        if (utcHours >= 24) {
          utcHours -= 24; // Adjust for overflow
        }

        // Calculate total seconds since the start of the day in CET
        var totalSeconds = (utcHours * 3600) + (utcMinutes * 60) + utcSeconds;

        // Calculate .beats
        var beats = Math.floor(totalSeconds / 86.4);

        // Ensure the result is three digits
        var beatsString = '000' + beats;
        return beatsString.slice(-3);
      },
      c: function(date) {
        return $.agjCalendar.dateToString(
          date,
          'Y-m-d',
          translations
        ) + 'T' + $.agjCalendar.dateToString(
          date,
          'H:i:s',
          translations
        );
      },
      d: function(date) {
        return (date.getDate() < 10 ? '0' : '') + date.getDate();
      },
      D: function(date) {
        return translations['days']['abbreviated'][date.getDay()];
      },
      F: function(date) {
        return translations['months']['full'][date.getMonth()];
      },
      g: function(date) {
        return date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      },
      G: function(date) {
        return date.getHours();
      },
      h: function(date) {
        if (date.getHours() > 12) {
          return (date.getHours() - 12 < 10 ? '0' : '') +
            (date.getHours() - 12).toString();
        } else {
          return (date.getHours() < 10 ? '0' : '') + date.getHours();
        }
      },
      H: function(date) {
        return (date.getHours() < 10 ? '0' : '') + date.getHours().toString();
      },
      i: function(date) {
        return (date.getMinutes() < 10 ? '0' : '') +
          date.getMinutes().toString();
      },
      j: function(date) {
        return date.getDate();
      },
      l: function(date) {
        return translations['days']['full'][date.getDay()];
      },
      L: function(date) {
        return yearIsLeapYear(date.getFullYear()) ? '1' : '0';
      },
      m: function(date) {
        return (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
      },
      M: function(date) {
        return translations['months']['abbreviated'][date.getMonth()];
      },
      n: function(date) {
        return date.getMonth() + 1;
      },
      N: function(date) {
        return date.getDay() === 0 ? 7 : date.getDay();
      },
      o: function(date) {
        var checkDate = new Date(date.getTime());
        checkDate.setDate(checkDate.getDate() - ((date.getDay() + 6) % 7) + 3);
        return checkDate.getFullYear();
      },
      r: function(date) {
        return $.agjCalendar.dateToString(
          date,
          'D, d M Y H:i:s +0000',
          translations
        );
      },
      s: function(date) {
        return (date.getSeconds() < 10 ? '0' : '') +
          date.getSeconds().toString();
      },
      S: function(date) {
        return translations['ordinalSuffixes'][date.getDate()];
      },
      t: function(date) {
        return getDaysInMonth(date.getMonth(), date.getFullYear());
      },
      u: function(date) {
        return date.getMilliseconds() * 1000;
      },
      U: function(date) {
        return Math.round(date.getTime() / 1000);
      },
      v: function(date) {
        return date.getMilliseconds();
      },
      w: function(date) {
        return date.getDay() === 7 ? 0 : date.getDay();
      },
      W: function(date) {
        return getIso8601WeekNumber(date);
      },
      x: function(date) {
        var year = date.getFullYear();
        return year >= 10000 ? '+' + year : year;
      },
      X: function(date) {
        if (date.getFullYear() >= 1) {
          return '+' + date.getFullYear();
        } else {
          return date.getFullYear();
        }
      },
      y: function(date) {
        return date.getFullYear().toString().slice(-2);
      },
      Y: function(date) {
        var year = date.getFullYear();

        var isBc = year < 0;
        if (isBc) {
          year *= -1;
        }

        year = year.toString();
        while (year.length < 4) {
          year = '0' + year;
        }

        if (isBc) {
          year = '-' + year;
        }

        return year;
      },
      z: function(date) {
        for (var i = 0; i <= 365; i++) {
          var dateToCheck = new Date(date.getFullYear(), 0, 1 + i);
          if (
            dateToCheck.getFullYear() === date.getFullYear() &&
            dateToCheck.getMonth() === date.getMonth() &&
            dateToCheck.getDate() === date.getDate()
          ) {
            return i;
          }
        }
        return -1;
      }
    };

    var processedRegexPattern = '';

    var processPosition = 0;
    while (dateFormat.length > processPosition) {
      var dateFormatFound = false;

      for (var format in dateFormats) {
        if (
          Object.prototype.hasOwnProperty.call(dateFormats, format) &&
          dateFormat.substring(
            processPosition,
            processPosition + format.length
          ) === format
        ) {
          processedRegexPattern += dateFormats[format](date);
          processPosition += format.length;

          dateFormatFound = true;

          break;
        }
      }

      if (!dateFormatFound) {
        processedRegexPattern += dateFormat.substring(
          processPosition,
          processPosition + 1
        );
        processPosition++;
      }
    }

    return processedRegexPattern;
  };

  /**
   * The $.agjCalendar.deactivate() function will deactivate/hide all date
   * pickers.
   * @returns {void}
   */
  $.agjCalendar.deactivate = function() {
    lastClickWasOnAgjCalendar = false;

    var calendarElement = $('#agjCalendar');
    if (calendarElement.length > 0) {
      $('body').removeClass('agjCalendar-active');
      calendarElement.attr('data-agjCalendar-active', -1);
      $('.agjCalendar-active-input').removeClass('agjCalendar-active-input');
    }

    hideModalBackground();
  };

  /**
   * The $.agjCalendar.disable() function will disable an agjCalendar
   * integration.
   * @param {number} position - The position of the integration to disable.
   * @returns {boolean} - Returns true if an integration was successfully
   * disabled or false if the disabling fails.
   */
  $.agjCalendar.disable = function(position) {
    if (isNaN(position) || agjCalendars[position] === undefined) {
      throwError('Invalid position "' + position + '"');
      return false;
    }

    if (agjCalendars[position]['disabled']) {
      throwError('Position "' + position + '" has already been disabled');
      return false;
    }

    // deactivate the date picker if it is active
    if (
      integrationIsActive(agjCalendars[position]) ||
      (
        agjCalendars[position]['allowRange'] &&
        integrationIsActive(agjCalendars[position], true)
      )
    ) {
      $.agjCalendar.deactivate();
    }

    // unbind elements
    for (
      var i = 0, elementSelectors = [
        'dateSelector',
        'endDateSelector',
        'monthSelector',
        'daySelector',
        'endMonthSelector',
        'endDaySelector',
        'expanderSelector',
        'endExpanderSelector'
      ];
      i < elementSelectors.length;
      i++
    ) {
      var element = $(agjCalendars[position][elementSelectors[i]]);
      if (element.length > 0) {
        element.attr('data-agjCalendar-bound-to', '');
      }
    }

    // flag the integration as disabled
    agjCalendars[position]['disabled'] = true;

    // return true to indicate a successful disabling
    return true;
  };

  /**
   * The $.agjCalendar.disableEmojiSupport() function will disable emoji
   * support.
   * @description Emoji support will have issues with older versions of
   * Microsoft Internet Explorer specifically 6, 7, 8, 9, 10 and 11 as they
   * don’t support ECMAScript 2018. To support older browsers we recommend using
   * $.agjCalendar.addRegexTextPattern() and passing each emoji character you
   * want to use.
   * @returns {void}
   */
  $.agjCalendar.disableEmojiSupport = function() {
    if (es2018IsSupported()) {
      emojiSupportEnabled = false;
    } else {
      throwError(
        '$.agjCalendar.disableEmojiSupport() was called but this browser ' +
        'does not support ECMAScript 2018'
      );
    }
  };

  /**
   * The $.agjCalendar.enableEmojiSupport() function will enable emoji support.
   * @description Emoji support will have issues with older versions of
   * Microsoft Internet Explorer specifically 6, 7, 8, 9, 10 and 11 as they
   * don’t support ECMAScript 2018. To support older browsers we recommend using
   * $.agjCalendar.addRegexTextPattern() and passing each emoji character you
   * want to use.
   * @returns {void}
   */
  $.agjCalendar.enableEmojiSupport = function() {
    if (es2018IsSupported()) {
      emojiSupportEnabled = true;
    } else {
      throwError(
        '$.agjCalendar.enableEmojiSupport() was called but this browser does ' +
        'not support ECMAScript 2018'
      );
    }
  };

  /**
   * The $.agjCalendar.getIncludedTranslations() function will return an object
   * of translations from the plguin’s included translations.
   * @param {string} language - The language of custom translations to return.
   * @returns {object|number} - Returns an object of translations if found
   * otherwise -1.
   */
  $.agjCalendar.getIncludedTranslations = function(language) {
    if (typeof includedTranslations[language] !== 'undefined') {
      return includedTranslations[language];
    } else {
      return -1;
    }
  };

  /**
   * The $.agjCalendar.isActive() function will let you know if a date picker
   * is active.
   * @returns {boolean} - Returns true if a date picker is active or false if
   * none are.
   */
  $.agjCalendar.isActive = function() {
    return $('body').hasClass('agjCalendar-active');
  };

  /**
   * The $.agjCalendar.stringToDate() function will parse a string and return a
   * Date object.
   * @param {string} string - The string we want to extract a date from.
   * @param {number} dateFormat - The format we want to search the string for.
   * @param {object} translations - An object of translations.
   * @returns {number|Date} - Returns a date if one can be extracted from the
   * string or -1 if no date is found or the conversion fails.
   */
  $.agjCalendar.stringToDate = function(string, dateFormat, translations) {
    // string must be a string
    if (typeof string !== 'string' || string.length === 0) {
      return -1;
    }

    // dateFormat must be a string
    if (typeof dateFormat !== 'string' || dateFormat.length === 0) {
      return -1;
    }

    // if translations aren’t an object pull in the included translations for
    // English
    if (typeof translations !== 'object') {
      translations = duplicateObject(includedTranslations['en']);
    }

    dateFormat = unicodeToString(dateFormat);

    var regexDateFormats = {
      a: '(am|pm)',
      A: '(AM|PM)',
      B: '[0-9]{1,3}',
      c: '-?([0-9]+)-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})',
      d: '([0-9]{2})',
      D: regexTextPattern(),
      F: regexTextPattern(),
      g: '[0-9]{1,2}',
      G: '[0-9]{1,2}',
      h: '[0-9]{2}',
      H: '[0-9]{2}',
      i: '[0-9]{2}',
      j: '([0-9]{1,2})',
      l: regexTextPattern(),
      L: '([0-1]{1})',
      m: '([0-9]{1,2})',
      M: regexTextPattern(),
      n: '([0-9]{2})',
      N: '([1-7]{1})',
      o: '-?([0-9]+)',
      r: regexTextPattern() +', ([0-9]{2}) ' + regexTextPattern() +
        ' -?([0-9]+) ([0-9]{2}):([0-9]{2}):([0-9]{2}) \\+0000',
      s: '[0-9]{2}',
      S: regexTextPattern(),
      t: '([0-9]{1,2})',
      u: '[0-9]+',
      U: '-?([0-9]+)',
      v: '[0-9]+',
      w: '([0-6]{1})',
      W: '([0-9]{1,2})',
      x: '\\+-?([0-9]+)',
      X: '\\+-?([0-9]+)',
      y: '([0-9]{2})',
      Y: '-?([0-9]+)',
      z: '([0-9]{1,3})'
    };

    var processedRegexPattern = '^';

    var patternPosition = 0;
    var processPosition = 0;
    while (dateFormat.length > processPosition) {
      var dateFormatFound = false;

      for (var format in regexDateFormats) {
        if (
          Object.prototype.hasOwnProperty.call(regexDateFormats, format) &&
          dateFormat.substring(
            processPosition,
            processPosition + format.length
          ) === format
        ) {
          processedRegexPattern += '(?<pattern';
          processedRegexPattern += patternPosition++;
          processedRegexPattern += '_';
          processedRegexPattern += format;
          processedRegexPattern += '>';
          processedRegexPattern += regexDateFormats[format];
          processedRegexPattern += ')';

          processPosition += format.length;

          dateFormatFound = true;

          break;
        }
      }

      if (!dateFormatFound) {
        var newCharacter = dateFormat.substring(
          processPosition,
          processPosition + 1
        );

        processedRegexPattern += newCharacter;
        processPosition++;
      }
    }

    processedRegexPattern += '$';

    var regexMatches = string.match(new RegExp(processedRegexPattern, 'u'));
    if (regexMatches) {
      var abbreviatedYear = null;
      var fullYear = null;
      var month = null;
      var day = null;

      for (var key in regexMatches.groups) {
        if (Object.prototype.hasOwnProperty.call(regexMatches.groups, key)) {
          var dateFormatCharacter = key.substring(key.lastIndexOf('_') + 1);
          switch (dateFormatCharacter) {
            case 'c':
              var yearMonthDashPosition = regexMatches.groups[key].substring(
                0,
                regexMatches.groups[key].lastIndexOf('-')
              ).lastIndexOf('-');

              fullYear = parseInt(
                regexMatches.groups[key].substring(
                  0,
                  yearMonthDashPosition
                ),
                10
              );
              month = parseInt(
                regexMatches.groups[key].substring(
                  yearMonthDashPosition + 1,
                  yearMonthDashPosition + 3
                ),
                10
              ) - 1;
              day = parseInt(
                regexMatches.groups[key].substring(
                  yearMonthDashPosition + 4,
                  yearMonthDashPosition + 6
                ),
                10
              );

              break;

            case 'r':
              var words = regexMatches.groups[key].split(' ');

              fullYear = words[words.length - 3];

              day = parseInt(
                regexMatches.groups[key].substring(
                  regexMatches.groups[key].indexOf(',') + 2,
                  regexMatches.groups[key].indexOf(',') + 4
                ),
                10
              );

              var monthText = regexMatches.groups[key].substring(
                regexMatches.groups[key].indexOf(',') + 5
              );
              monthText = monthText.substring(
                0,
                monthText.indexOf(fullYear.toString()) - 1
              );

              for (var format in translations['months']) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    translations['months'],
                    format
                  )
                ) {
                  for (var i in translations['months'][format]) {
                    if (
                      Object.prototype.hasOwnProperty.call(
                        translations['months'][format],
                        i
                      )
                    ) {
                      if (
                        translations['months'][format][i].toLowerCase() ===
                          monthText.toLowerCase()
                      ) {
                        month = i;
                      }
                    }
                  }
                }
              }

              break;

            case 'U':
              var date = new Date(
                parseInt(regexMatches.groups[key], 10) * 1000
              );
              fullYear = date.getFullYear();
              month = date.getMonth();
              day = date.getDate();
              break;

            case 'd':
            case 'j':
              day = parseInt(regexMatches.groups[key], 10);
              break;

            case 'F':
            case 'M':
              for (var format in translations['months']) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    translations['months'],
                    format
                  )
                ) {
                  for (var i in translations['months'][format]) {
                    if (
                      Object.prototype.hasOwnProperty.call(
                        translations['months'][format],
                        i
                      )
                    ) {
                      if (
                        translations['months'][format][i].toLowerCase() ===
                          regexMatches.groups[key].toLowerCase()
                      ) {
                        month = i;
                      }
                    }
                  }
                }
              }
              break;

            case 'm':
            case 'n':
              month = parseInt(regexMatches.groups[key], 10) - 1;
              break;

            case 'y':
              abbreviatedYear = parseInt(regexMatches.groups[key], 10);
              break;

            case 'o':
            case 'x':
            case 'X':
            case 'Y':
              fullYear = parseInt(regexMatches.groups[key], 10);
              break;
          }
        }
      }

      if (
        (abbreviatedYear !== null || fullYear !== null) &&
        month !== null &&
        day !== null
      ) {
        if (fullYear === null) {
          // if we have an abbreviated year but not a full year we have to
          // decide whether to treat it as part of this century or part of the
          // previous century
          var presentTwoDigitYear = parseInt(
            new Date().getFullYear().toString().substring(2),
            10
          );
          var presentCenturyOffset =
            new Date().getFullYear() - presentTwoDigitYear;

          // if the abbreviated year would be within 10 years of today then
          // assume the year is part of this century otherwise assume it is
          // part of the previous century
          if (abbreviatedYear <= presentTwoDigitYear + 10) {
            fullYear = presentCenturyOffset + abbreviatedYear;
          } else {
            fullYear = presentCenturyOffset - 100 + abbreviatedYear;
          }
        }

        return new Date(fullYear, month, day);
      }
    }

    return -1;
  };

  /**
   * The previous name of the agjCalendar plugin was ctcCalendar so this
   * function acts solely as an alias to support backwards compatibility.
   * @param {object} options - A JSON object of configuration options.
   * @returns {boolean} - Returns true on success or false on error.
   * @deprecated The plugin’s name changed to agjCalendar in version 1.0.0.
   */
  $.ctcCalendar = function(options) {
    return $.agjCalendar(options);
  };

  /**
   * The $.fn.agjCalendar() function will initialize a new agjCalendar
   * integration.
   * @param {object} options - A JSON object of configuration options.
   * @param {Function} callback - An optional callback function that passes the
   * result of the integration initialization in as the first and only
   * parameter.
   * @returns {jQuery} - Returns the element to allow for chaining.
   */
  $.fn.agjCalendar = function(options, callback) {
    if (typeof options !== 'object') {
      options = {};
    }

    if (typeof callback !== 'function') {
      callback = function() {};
    }

    if (this.prop('tagName').toLowerCase() === 'input') {
      var className;
      do {
        className = 'agjCalendar-' + generateRandomInteger(100000, 999999);
      } while ($('input.' + className).length > 0);

      this.addClass(className);
      options['dateSelector'] = 'input.' + className;

      callback($.agjCalendar(options));
    } else {
      throwError(
        'Invalid tag "' + this.prop('tagName').toLowerCase() +
        '" ("input" expected)'
      );
      callback(false);
    }

    return this;
  };
})(jQuery);
