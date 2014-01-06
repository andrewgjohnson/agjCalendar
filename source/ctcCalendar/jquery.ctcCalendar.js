/*
 * ctcCalendar v0.9.1
 *
 * Copyright (c) 2013 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @author Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @copyright Copyright (c) 2013 Andrew G. Johnson <andrew@andrewgjohnson.com>
 * @link http://github.com/ctcCalendar/ctcCalendar
 * @license http://www.opensource.org/licenses/mit-license.php The MIT License
 * @version 0.9.1
 * @package ctcCalendar
 *
 */

;(function($) {
	/*https://github.com/jquery/jquery-browser*/if(!$.browser){(function(e){var t,n=navigator.userAgent||"";e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}};t=e.uaMatch(n);e.browser={};if(t.browser){e.browser[t.browser]=true;e.browser.version=t.version}if(e.browser.webkit){e.browser.safari=true}})(jQuery)}

	var ctcCalendars = new Array();
	var active_ctcCalendar = -1,active_ctcCalendar_is_end = false;
	var last_body_overflow_value = "";
	var last_body_margin_right_value = "";

	get_true_height = function(element) {
		var true_height = element.height();
		if (!isNaN(parseInt(element.css("borderTopWidth"),10)))
			true_height += parseInt(element.css("borderTopWidth"),10);
		if (!isNaN(parseInt(element.css("borderBottomWidth"),10)))
			true_height += parseInt(element.css("borderBottomWidth"),10);
		if (!isNaN(parseInt(element.css("padding-top"),10)))
			true_height += parseInt(element.css("padding-top"),10);
		if (!isNaN(parseInt(element.css("padding-bottom"),10)))
			true_height += parseInt(element.css("padding-bottom"),10);
		if (!isNaN(parseInt(element.css("margin-top"),10)))
			true_height += parseInt(element.css("margin-top"),10);
		if (!isNaN(parseInt(element.css("margin-bottom"),10)))
			true_height += parseInt(element.css("margin-bottom"),10);
		return true_height;
	};

	get_true_width = function(element) {
		var true_width = element.width();
		if (!isNaN(parseInt(element.css("borderLeftWidth"),10)))
			true_width += parseInt(element.css("borderLeftWidth"),10);
		if (!isNaN(parseInt(element.css("borderRightWidth"),10)))
			true_width += parseInt(element.css("borderRightWidth"),10);
		if (!isNaN(parseInt(element.css("padding-left"),10)))
			true_width += parseInt(element.css("padding-left"),10);
		if (!isNaN(parseInt(element.css("padding-right"),10)))
			true_width += parseInt(element.css("padding-right"),10);
		if (!isNaN(parseInt(element.css("margin-left"),10)))
			true_width += parseInt(element.css("margin-left"),10);
		if (!isNaN(parseInt(element.css("margin-right"),10)))
			true_width += parseInt(element.css("margin-right"),10);
		return true_width;
	};

	get_month_name = function(month,full_name,language) {
		if (full_name === undefined)
			full_name = true;
		if (language === undefined)
			language = "en";

		if (language == "en")
		{
			if (month == 1)
				return full_name ? "January" : "Jan";
			else if (month == 2)
				return full_name ? "February" : "Feb";
			else if (month == 3)
				return full_name ? "March" : "Mar";
			else if (month == 4)
				return full_name ? "April" : "Apr";
			else if (month == 5)
				return "May";
			else if (month == 6)
				return full_name ? "June" : "Jun";
			else if (month == 7)
				return full_name ? "July" : "Jul";
			else if (month == 8)
				return full_name ? "August" : "Aug";
			else if (month == 9)
				return full_name ? "September" : "Sep";
			else if (month == 10)
				return full_name ? "October" : "Oct";
			else if (month == 11)
				return full_name ? "November" : "Nov";
			else if (month == 12)
				return full_name ? "December" : "Dec";
		}

		return "";
	};

	get_month_number = function(month,language) {
		if (language === undefined)
			language = "en";

		if (language == "en")
		{
			if (month == "Jan" || month == "January")
				return 1;
			else if (month == "Feb" || month == "February")
				return 2;
			else if (month == "Mar" || month == "March")
				return 3;
			else if (month == "Apr" || month == "April")
				return 4;
			else if (month == "May")
				return 5;
			else if (month == "Jun" || month == "June")
				return 6;
			else if (month == "Jul" || month == "July")
				return 7;
			else if (month == "Aug" || month == "August")
				return 8;
			else if (month == "Sep" || month == "September")
				return 9;
			else if (month == "Oct" || month == "October")
				return 10;
			else if (month == "Nov" || month == "November")
				return 11;
			else if (month == "Dec" || month == "December")
				return 12;
		}

		return "";
	};

	get_day_name = function(day,full_name,language) {
		if (full_name === undefined)
			full_name = true;
		if (language === undefined)
			language = "en";

		if (language == "en")
		{
			if (day == 1)
				return full_name ? "Sunday" : "Sun";
			else if (day == 2)
				return full_name ? "Monday" : "Mon";
			else if (day == 3)
				return full_name ? "Tuesday" : "Tue";
			else if (day == 4)
				return full_name ? "Wednesday" : "Wed";
			else if (day == 5)
				return full_name ? "Thursday" : "Thu";
			else if (day == 6)
				return full_name ? "Friday" : "Fri";
			else if (day == 7)
				return full_name ? "Saturday" : "Sat";
		}

		return "";
	};

	get_month_text = function(language) {
		if (language === undefined)
			language = "en";

		if (language == "en")
			return "";

		return "";
	};

	get_day_text = function(language) {
		if (language === undefined)
			language = "en";

		if (language == "en")
			return "";

		return "";
	};

	get_days_in_month = function(year,month) {
		if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
			return 31;
		else if (month == 4 || month == 6 || month == 9 || month == 11)
			return 30;
		else if (month == 2)
			return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ? 29 : 28;

		return 0;
	};

	number_to_text = function(number) {
		if (!isNaN(number))
			number = parseInt(number,10);

		switch (number)
		{
			case 0 :
				return "Zero";
			case 1:
				return "One";
			case 2:
				return "Two";
			case 3:
				return "Three";
			case 4:
				return "Four";
			case 5:
				return "Five";
			case 6:
				return "Six";
			case 7:
				return "Seven";
			case 8:
				return "Eight";
			case 9:
				return "Nine";
			case 10:
				return "Ten";
		}

		return "";
	};

	$(document).resize(function() {
		$.ctcCalendar.set_position();
	}).click(function(event) {
		if ($("#ctc-calendar").length > 0 && active_ctcCalendar >= 0)
		{
			if (ctcCalendars[active_ctcCalendar]["inputType"] == "text")
			{
				var selector = ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "dateSelector" : "endDateSelector"];
				if (!($(event.target).parents("#ctc-calendar").length > 0 || $(event.target).attr("id") == "ctc-calendar") && !($(event.target).parents(selector).length > 0 || $(event.target).attr("id") == selector.substring(1)))
					$.ctcCalendar.hide();
			}
			else if (ctcCalendars[active_ctcCalendar]["inputType"] == "dropdown")
			{
				if (!($(event.target).parents("#ctc-calendar").length > 0 || $(event.target).attr("id") == "ctc-calendar"))
					$.ctcCalendar.hide();
			}
		}
		return true;
	}).keyup(function(event) {
		if (event.keyCode == 27 && active_ctcCalendar >= 0 && (ctcCalendars[active_ctcCalendar]["calendarDisplay"] == "modal" || ctcCalendars[active_ctcCalendar]["calendarDisplay"] == "full") && $("#ctc-calendar").length > 0)
		{
			$("*:focus").blur();
			$.ctcCalendar.hide();
			return false;
		}
		return true;
	});

	$(window).scroll(function() {
		if (active_ctcCalendar >= 0)
			$.ctcCalendar.set_position();
	});

	$(window).resize(function() {
		if (active_ctcCalendar >= 0)
			$.ctcCalendar.set_position();
	});

	$.ctcCalendar = function(options) {
		var ctcCalendar;
		ctcCalendar = new Array();

		ctcCalendar["calendarCount"] = 1;
		if (options["calendarCount"])
		{
			if (!isNaN(options["calendarCount"]))
			{
				if (parseInt(options["calendarCount"],10) >= 1 && parseInt(options["calendarCount"],10) <= 3)
					ctcCalendar["calendarCount"] = parseInt(options["calendarCount"],10);
			}
		}

		ctcCalendar["overwriteMonthOptions"] = true;
		if (options["overwriteMonthOptions"] || options["overwriteMonthOptions"] === false)
		{
			if (options["overwriteMonthOptions"] == false)
				ctcCalendar["overwriteMonthOptions"] = false;
		}

		ctcCalendar["overwriteDayOptions"] = true;
		if (options["overwriteDayOptions"] || options["overwriteDayOptions"] === false)
		{
			if (options["overwriteDayOptions"] == false)
				ctcCalendar["overwriteDayOptions"] = false;
		}

		ctcCalendar["autoSetEndDate"] = false;
		if (options["autoSetEndDate"])
		{
			if (options["autoSetEndDate"] === true)
				ctcCalendar["autoSetEndDate"] = true;
		}

		ctcCalendar["allowBlankDates"] = false;
		if (options["allowBlankDates"])
		{
			if (options["allowBlankDates"] === true)
				ctcCalendar["allowBlankDates"] = true;
		}

		/*
		 * dateFormat.1 = MM/DD/YYYY, e.g. "01/02/2003"
		 * dateFormat.2 = MMM D, YYYY, e.g. "Jan 2, 2003"
		 * dateFormat.3 = DD/MM/YYYY, e.g. "02/01/2003"
		 */
		ctcCalendar["dateFormat"] = 1;
		if (options["dateFormat"])
		{
			if (options["dateFormat"] == 2 || options["dateFormat"] == 3)
				ctcCalendar["dateFormat"] = options["dateFormat"];
		}

		ctcCalendar["minimumDate"] = new Date();
		if (options["minimumDate"])
		{
			if (/([0-9]{4})-([0-9]{2})-([0-9]{2})/.test(options["minimumDate"]))
			{
				var minimum_year,minimum_month,minimum_day,minimum_date;

				minimum_year = options["minimumDate"].substring(0,4);
				minimum_month = options["minimumDate"].substring(5,7);
				minimum_day = options["minimumDate"].substring(8,10);

				minimum_date = new Date();
				minimum_date.setFullYear(minimum_year,parseInt(minimum_month,10) - 1,minimum_day);

				ctcCalendar["minimumDate"] = minimum_date;
			}
		}
		ctcCalendar["minimumDate"].setHours(0,0,0,0);

		ctcCalendar["maximumDate"] = new Date();
		ctcCalendar["maximumDate"].setFullYear(ctcCalendar["maximumDate"].getFullYear() + 1,ctcCalendar["maximumDate"].getMonth(),ctcCalendar["maximumDate"].getDate());
		if (options["maximumDate"])
		{
			if (/([0-9]{4})-([0-9]{2})-([0-9]{2})/.test(options["maximumDate"]))
			{
				var maximum_year,maximum_month,maximum_day,maximum_date;

				maximum_year = options["maximumDate"].substring(0,4);
				maximum_month = options["maximumDate"].substring(5,7);
				maximum_day = options["maximumDate"].substring(8,10);

				maximum_date = new Date();
				maximum_date.setFullYear(maximum_year,parseInt(maximum_month,10) - 1,maximum_day);

				if (maximum_date >= ctcCalendar["minimumDate"])
					ctcCalendar["maximumDate"] = maximum_date;
			}
		}
		ctcCalendar["maximumDate"].setHours(23,59,59,999);

		ctcCalendar["defaultDate"] = new Date();
		if (options["defaultDate"])
		{
			if (/([0-9]{4})-([0-9]{2})-([0-9]{2})/.test(options["defaultDate"]))
			{
				var default_year,default_month,default_day,default_date;

				default_year = options["defaultDate"].substring(0,4);
				default_month = options["defaultDate"].substring(5,7);
				default_day = options["defaultDate"].substring(8,10);

				default_date = new Date();
				default_date.setFullYear(default_year,parseInt(default_month,10) - 1,default_day);

				if (default_date >= ctcCalendar["minimumDate"] && default_date <= ctcCalendar["maximumDate"])
					ctcCalendar["defaultDate"] = default_date;
			}
			else if (ctcCalendar["allowBlankDates"] && options["defaultDate"] == "blank")
			{
				ctcCalendar["defaultDate"] = options["defaultDate"];
			}
		}

		ctcCalendar["allowRange"] = false;
		if (options["allowRange"])
		{
			if (options["allowRange"] === true)
				ctcCalendar["allowRange"] = true;
		}

		if (options["allowRange"])
		{
			var total_range,range_check;
			range_check = new Date();
			range_check.setFullYear(ctcCalendar["minimumDate"].getFullYear(),ctcCalendar["minimumDate"].getMonth(),ctcCalendar["minimumDate"].getDate());
			total_range = 0;
			while (range_check <= ctcCalendar["maximumDate"])
			{
				total_range++;
				range_check.setFullYear(range_check.getFullYear(),range_check.getMonth(),range_check.getDate() + 1);
			}

			ctcCalendar["minimumRange"] = total_range == 0 ? 0 : 1;
			if (options["minimumRange"] || options["minimumRange"] === 0)
			{
				if (!isNaN(options["minimumRange"]))
				{
					if (parseInt(options["minimumRange"],10) <= total_range)
						ctcCalendar["minimumRange"] = options["minimumRange"];
				}
			}

			ctcCalendar["maximumRange"] = total_range == 0 ? 0 : total_range;
			if (options["maximumRange"] || options["maximumRange"] === 0)
			{
				if (!isNaN(options["maximumRange"]))
				{
					if (parseInt(options["maximumRange"],10) <= total_range)
						ctcCalendar["maximumRange"] = options["maximumRange"];
				}
			}

			ctcCalendar["defaultRange"] = total_range == 0 ? 0 : 1;
			if (options["defaultRange"] || options["defaultRange"] === 0)
			{
				if (!isNaN(options["defaultRange"]))
				{
					if (parseInt(options["defaultRange"],10) >= ctcCalendar["minimumRange"] && parseInt(options["defaultRange"],10) <= ctcCalendar["maximumRange"])
						ctcCalendar["defaultRange"] = options["defaultRange"];
				}
			}
		}
		else
		{
			ctcCalendar["defaultRange"] = 0;
			ctcCalendar["minimumRange"] = 0;
			ctcCalendar["maximumRange"] = 0;
		}

		ctcCalendar["calendarDisplay"] = "inline";
		if (options["calendarDisplay"])
		{
			if (options["calendarDisplay"] == "modal" || options["calendarDisplay"] == "full")
				ctcCalendar["calendarDisplay"] = options["calendarDisplay"];
		}

		ctcCalendar["inputType"] = "text";
		if (options["inputType"])
		{
			if (options["inputType"] == "dropdown")
				ctcCalendar["inputType"] = options["inputType"];
		}

		if (ctcCalendar["inputType"] == "text")
		{
			var expander_element,date_element,end_expander_element,end_date_element;
			expander_element = $(options["expanderSelector"]);
			date_element = $(options["dateSelector"]);

			if (options["allowRange"])
			{
				end_expander_element = $(options["endExpanderSelector"]);
				end_date_element = $(options["endDateSelector"]);
			}

			if (expander_element.length > 0 && date_element.length == 1 && (!options["allowRange"] || (end_expander_element.length > 0 && end_date_element.length == 1)))
			{
				ctcCalendar["expanderSelector"] = options["expanderSelector"];
				ctcCalendar["dateSelector"] = options["dateSelector"];

				if (options["allowRange"])
				{
					ctcCalendar["endExpanderSelector"] = options["endExpanderSelector"];
					ctcCalendar["endDateSelector"] = options["endDateSelector"];
				}

				var newest_ctcCalendar = ctcCalendars.length;
				ctcCalendars[newest_ctcCalendar] = ctcCalendar;
				var former_active_ctcCalendar = active_ctcCalendar;
				active_ctcCalendar = newest_ctcCalendar;
				$.ctcCalendar.set_new_date(ctcCalendar["defaultDate"]);
				active_ctcCalendar = former_active_ctcCalendar;

				display_calendar = function() {
					if (active_ctcCalendar != newest_ctcCalendar || active_ctcCalendar_is_end)
					{
						active_ctcCalendar = newest_ctcCalendar;
						active_ctcCalendar_is_end = false;
						$.ctcCalendar.show();
					}
					else
						$.ctcCalendar.hide();

					return false;
				};
				expander_element.click(display_calendar);
				date_element.focus(display_calendar).keydown(function(event) {
					if (event.keyCode == 9)
					{
						if (options["allowRange"])
						{
							setTimeout(function() {
								if ($(":focus")[0] != end_date_element[0])
									$.ctcCalendar.hide();
							},1);
						}
					}
					return true;
				});
			}

			if (options["allowRange"])
			{
				former_active_ctcCalendar = active_ctcCalendar;

				var end_default_date;
				if (ctcCalendar["defaultDate"] == "blank")
					end_default_date = "blank";
				else
				{
					end_default_date = new Date();
					end_default_date.setFullYear(ctcCalendar["defaultDate"].getFullYear(),ctcCalendar["defaultDate"].getMonth(),ctcCalendar["defaultDate"].getDate() + ctcCalendar["defaultRange"]);
				}
				active_ctcCalendar = newest_ctcCalendar;
				active_ctcCalendar_is_end = true;
				$.ctcCalendar.set_new_date(end_default_date,true);
				active_ctcCalendar = former_active_ctcCalendar;
				active_ctcCalendar_is_end = false;

				date_element.blur(function() {
					if (/([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test($(this).val()))
						$.ctcCalendar.check_end_date(newest_ctcCalendar);
				})

				end_date_element.keydown(function(event) {
					if (event.keyCode == 9)
					{
						setTimeout(function() {
							if ($(":focus")[0] != date_element[0])
								$.ctcCalendar.hide();
						},1);
					}
					return true;
				});

				display_end_calendar = function() {
					if (active_ctcCalendar != newest_ctcCalendar || !active_ctcCalendar_is_end)
					{
						active_ctcCalendar = newest_ctcCalendar;
						active_ctcCalendar_is_end = true;
						$.ctcCalendar.show();
					}
					else
						$.ctcCalendar.hide();

					return false;
				};
				end_expander_element.click(display_end_calendar);
				end_date_element.focus(display_end_calendar);
			}
		}
		else if (ctcCalendar["inputType"] == "dropdown")
		{
			var expander_element,month_element,day_element,end_expander_element,end_month_element,end_day_element;
			expander_element = $(options["expanderSelector"]);
			month_element = $(options["monthSelector"]);
			day_element = $(options["daySelector"]);

			if (options["allowRange"])
			{
				end_expander_element = $(options["endExpanderSelector"]);
				end_month_element = $(options["endMonthSelector"]);
				end_day_element = $(options["endDaySelector"]);
			}

			if (expander_element.length > 0 && month_element.length == 1 && day_element.length == 1 && (!options["allowRange"] || (end_expander_element.length > 0 && end_month_element.length == 1 && end_day_element.length == 1)))
			{
				ctcCalendar["monthSelector"] = options["monthSelector"];
				ctcCalendar["daySelector"] = options["daySelector"];
				ctcCalendar["expanderSelector"] = options["expanderSelector"];

				if (options["allowRange"])
				{
					ctcCalendar["endMonthSelector"] = options["endMonthSelector"];
					ctcCalendar["endDaySelector"] = options["endDaySelector"];
					ctcCalendar["endExpanderSelector"] = options["endExpanderSelector"];
				}

				var newest_ctcCalendar = ctcCalendars.length;
				ctcCalendars[newest_ctcCalendar] = ctcCalendar;

				$.ctcCalendar.update_month_selectors(newest_ctcCalendar);
				$.ctcCalendar.update_day_selectors(newest_ctcCalendar);

				var former_active_ctcCalendar = active_ctcCalendar;
				active_ctcCalendar = newest_ctcCalendar;
				$.ctcCalendar.set_new_date(ctcCalendar["defaultDate"]);
				active_ctcCalendar = former_active_ctcCalendar;

				expander_element.click(function() {
					if (active_ctcCalendar != newest_ctcCalendar || active_ctcCalendar_is_end)
					{
						active_ctcCalendar = newest_ctcCalendar;
						active_ctcCalendar_is_end = false;
						$.ctcCalendar.show();
					}
					else
						$.ctcCalendar.hide();

					return false;
				});

				month_element.change(function() {
					$.ctcCalendar.update_day_selectors(newest_ctcCalendar);
					if (options["allowRange"])
					{
						var start_date,end_date,updated_end_date;

						start_date = new Date();
						start_date.setFullYear(month_element.val().substring(0,4),parseInt(month_element.val().substring(5,7),10) - 1,day_element.val());
						start_date.setHours(0,0,0,0);

						end_date = new Date();
						end_date.setFullYear(end_month_element.val().substring(0,4),parseInt(end_month_element.val().substring(5,7),10) - 1,end_day_element.val());
						end_date.setHours(0,0,0,0);

						$.ctcCalendar.update_month_selectors(newest_ctcCalendar,true);
						$.ctcCalendar.update_day_selectors(newest_ctcCalendar,true);

						if (start_date > end_date)
						{
							active_ctcCalendar = newest_ctcCalendar;

							updated_end_date = new Date();
							updated_end_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendar["defaultRange"]);
							$.ctcCalendar.set_new_date(updated_end_date,true);

							active_ctcCalendar = -1;
						}
					}
				});

				if (options["allowRange"])
				{
					$.ctcCalendar.update_month_selectors(newest_ctcCalendar,true);
					$.ctcCalendar.update_day_selectors(newest_ctcCalendar,true);

					former_active_ctcCalendar = active_ctcCalendar;

					var end_default_date;
					if (ctcCalendar["defaultDate"] == "blank")
						end_default_date = "blank";
					else
					{
						end_default_date = new Date();
						end_default_date.setFullYear(ctcCalendar["defaultDate"].getFullYear(),ctcCalendar["defaultDate"].getMonth(),ctcCalendar["defaultDate"].getDate() + ctcCalendar["defaultRange"]);
					}
					active_ctcCalendar = newest_ctcCalendar;
					active_ctcCalendar_is_end = true;
					$.ctcCalendar.set_new_date(end_default_date,true);
					active_ctcCalendar = former_active_ctcCalendar;
					active_ctcCalendar_is_end = false;

					day_element.change(function() {
						$.ctcCalendar.check_end_date(newest_ctcCalendar);
						$.ctcCalendar.update_month_selectors(newest_ctcCalendar,true);
						$.ctcCalendar.update_day_selectors(newest_ctcCalendar,true);
					});

					end_expander_element.click(function() {
						if (active_ctcCalendar != newest_ctcCalendar || !active_ctcCalendar_is_end)
						{
							active_ctcCalendar = newest_ctcCalendar;
							active_ctcCalendar_is_end = true;
							$.ctcCalendar.show();
						}
						else
							$.ctcCalendar.hide();

						return false;
					});

					end_month_element.change(function() {
						$.ctcCalendar.update_day_selectors(newest_ctcCalendar,true);
					});
				}
			}
		}
	};

	$.ctcCalendar.show = function() {
		var elements_found = false;

		if (ctcCalendars[active_ctcCalendar]["inputType"] == "text")
		{
			var date_element,start_date_element;
			date_element = $(ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "dateSelector" : "endDateSelector"]);
			if (active_ctcCalendar_is_end)
				start_date_element = $(ctcCalendars[active_ctcCalendar]["dateSelector"]);

			elements_found = date_element.length == 1 && (!active_ctcCalendar_is_end || start_date_element.length == 1);
		}
		else if (ctcCalendars[active_ctcCalendar]["inputType"] == "dropdown")
		{
			var month_element,day_element,start_month_element,start_day_element;
			month_element = $(ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "monthSelector" : "endMonthSelector"]);
			day_element = $(ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "daySelector" : "endDaySelector"]);
			if (active_ctcCalendar_is_end)
			{
				start_month_element = $(ctcCalendars[active_ctcCalendar]["monthSelector"]);
				start_day_element = $(ctcCalendars[active_ctcCalendar]["daySelector"]);
			}

			elements_found = month_element.length == 1 && day_element.length == 1 && (!active_ctcCalendar_is_end || (start_month_element.length == 1 && start_day_element.length == 1));
		}

		if (elements_found)
		{
			var calendar_element;
			calendar_element = $("#ctc-calendar,#ctc-calendar-iframe");

			if (calendar_element.length == 0)
			{
				$.ctcCalendar.add_to_dom();
				calendar_element = $("#ctc-calendar,#ctc-calendar-iframe");
			}

			show_calendar = function() {
				if (ctcCalendars[active_ctcCalendar]["calendarDisplay"] == "modal" || ctcCalendars[active_ctcCalendar]["calendarDisplay"] == "full")
				{
					window.scrollTo(0,1);
					window.scrollTo(0,0);

					last_body_overflow_value = $("body").css("overflow");
					last_body_margin_right_value = $("body").css("marginRight");
					if (String(last_body_margin_right_value).indexOf("px") >= 0)
						last_body_margin_right_value = last_body_margin_right_value.substring(0,last_body_margin_right_value.length - 2)
					last_body_margin_right_value = parseInt(last_body_margin_right_value,10);
					$("body").css({
						overflow:"hidden",
						marginRight:last_body_margin_right_value + 17
					});
					$("#ctc-calendar-modal-background").css({
						display:"block"
					});
				}
				$.ctcCalendar.set_position();
				$.ctcCalendar.update_dropdown();

				var current_date = new Date();

				if (ctcCalendars[active_ctcCalendar]["inputType"] == "text")
				{
					if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 1)
					{
						if (/([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(date_element.val()))
							current_date.setFullYear(date_element.val().substring(6,10),parseInt(date_element.val().substring(0,2),10) - 1,parseInt(date_element.val().substring(3,5),10));
						else
						{
							if (active_ctcCalendar_is_end && /([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(start_date_element.val()))
								current_date.setFullYear(start_date_element.val().substring(6,10),parseInt(start_date_element.val().substring(0,2),10) - 1,parseInt(start_date_element.val().substring(3,5),10) + ctcCalendars[active_ctcCalendar]["minimumRange"]);
							else
							{
								if (!active_ctcCalendar_is_end)
									current_date.setFullYear(ctcCalendars[active_ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["minimumDate"].getDate());
								else
									current_date.setFullYear(ctcCalendars[active_ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["minimumDate"].getDate() + ctcCalendars[active_ctcCalendar]["minimumRange"]);
							}
						}

						if (active_ctcCalendar_is_end && /([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(start_date_element.val()))
						{
							var current_start_date = new Date();
							current_start_date.setFullYear(start_date_element.val().substring(6,10),parseInt(start_date_element.val().substring(0,2),10) - 1,parseInt(start_date_element.val().substring(3,5),10));
							if (Math.ceil(Math.abs(current_date.getTime() - current_start_date.getTime()) / (1000 * 60 * 60 * 24)) > ctcCalendars[active_ctcCalendar]["maximumRange"])
								current_date = new Date(current_start_date.getTime() + (1000 * 60 * 60 * 24 * ctcCalendars[active_ctcCalendar]["maximumRange"]));
						}
					}
					else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 2)
					{
						if (/([A-Za-z]{3}) ([0-9]{1,2}), ([0-9]{4})$/.test(date_element.val()))
						{
							var current_year,current_month,current_day;
							current_year = date_element.val().substring(date_element.val().length - 4,date_element.val().length);
							current_month = get_month_number(date_element.val().substring(0,3));
							current_day = date_element.val().substring(date_element.val().indexOf(" ") + 1,date_element.val().indexOf(","));

							current_date.setFullYear(current_year,current_month - 1,current_day);
						}
						else
						{
							if (active_ctcCalendar_is_end && /([A-Za-z]{3}) ([0-9]{1,2}), ([0-9]{4})$/.test(start_date_element.val()))
							{
								var start_date_year,start_date_month,start_date_day;
								start_date_year = start_date_element.val().substring(start_date_element.val().length - 4,start_date_element.val().length);
								start_date_month = get_month_number(start_date_element.val().substring(0,3));
								start_date_day = start_date_element.val().substring(start_date_element.val().indexOf(" ") + 1,start_date_element.val().indexOf(","));

								current_date.setFullYear(start_date_year,start_date_month - 1,parseInt(start_date_day,10) + ctcCalendars[active_ctcCalendar]["minimumRange"]);
							}
							else
							{
								if (!active_ctcCalendar_is_end)
									current_date.setFullYear(ctcCalendars[active_ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["minimumDate"].getDate());
								else
									current_date.setFullYear(ctcCalendars[active_ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["minimumDate"].getDate() + ctcCalendars[active_ctcCalendar]["minimumRange"]);
							}
						}
					}
					else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 3)
					{
						if (/([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(date_element.val()))
							current_date.setFullYear(date_element.val().substring(6,10),parseInt(date_element.val().substring(3,5),10) - 1,1);
						else
						{
							if (active_ctcCalendar_is_end && /([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(start_date_element.val()))
								current_date.setFullYear(start_date_element.val().substring(6,10),parseInt(start_date_element.val().substring(3,5),10) - 1,parseInt(start_date_element.val().substring(0,2),10) + ctcCalendars[active_ctcCalendar]["minimumRange"]);
							else
							{
								if (!active_ctcCalendar_is_end)
									current_date.setFullYear(ctcCalendars[active_ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["minimumDate"].getDate());
								else
									current_date.setFullYear(ctcCalendars[active_ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["minimumDate"].getDate() + ctcCalendars[active_ctcCalendar]["minimumRange"]);
							}
						}
					}
				}
				else if (ctcCalendars[active_ctcCalendar]["inputType"] == "dropdown")
				{
					if (/([0-9]{4})-([0-9]{2})/.test(month_element.val()))
						current_date.setFullYear(month_element.val().substring(0,4),parseInt(month_element.val().substring(5,7),10) - 1,1);
					else
					{
						if (active_ctcCalendar_is_end && /([0-9]{4})-([0-9]{2})/.test(start_month_element.val()))
							current_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,parseInt(start_day_element.val(),10) + ctcCalendars[active_ctcCalendar]["minimumRange"]);
						else
						{
							if (!active_ctcCalendar_is_end)
								current_date.setFullYear(ctcCalendars[active_ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["minimumDate"].getDate());
							else
								current_date.setFullYear(ctcCalendars[active_ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["minimumDate"].getDate() + ctcCalendars[active_ctcCalendar]["minimumRange"]);
						}
					}
				}
				current_date.setHours(0,0,0,0);
				$.ctcCalendar.update_calendars(current_date);

				if (ctcCalendars[active_ctcCalendar]["calendarCount"] == 1)
				{
					$("#ctc-calendar,#ctc-calendar-iframe").addClass("ctc-calendar-single").removeClass("ctc-calendar-double").removeClass("ctc-calendar-triple");
					$("#ctc-calendar-first").show();
					$("#ctc-calendar-second,#ctc-calendar-third").hide();
				}
				else if (ctcCalendars[active_ctcCalendar]["calendarCount"] == 2)
				{
					$("#ctc-calendar,#ctc-calendar-iframe").removeClass("ctc-calendar-single").addClass("ctc-calendar-double").removeClass("ctc-calendar-triple");
					$("#ctc-calendar-first,#ctc-calendar-second").show();
					$("#ctc-calendar-third").hide();
				}
				else if (ctcCalendars[active_ctcCalendar]["calendarCount"] == 3)
				{
					$("#ctc-calendar,#ctc-calendar-iframe").removeClass("ctc-calendar-single").removeClass("ctc-calendar-double").addClass("ctc-calendar-triple");
					$("#ctc-calendar-first,#ctc-calendar-second,#ctc-calendar-third").show();
				}
				calendar_element.show();
				$.ctcCalendar.set_position();
			};

			if (calendar_element.is(":visible"))
			{
				calendar_element.hide();
				show_calendar();
			}
			else
				show_calendar();
		}

		if (ctcCalendars[active_ctcCalendar]["calendarDisplay"] == "full")
		{
			setTimeout(function() {
				$(document).resize();
				$(window).resize();
				$(window).scroll();
			},100);
		}
	};

	$.ctcCalendar.set_position = function() {
		if (active_ctcCalendar > -1)
		{
			if (ctcCalendars[active_ctcCalendar]["calendarDisplay"] == "inline")
			{
				if (ctcCalendars[active_ctcCalendar]["inputType"] == "text")
				{
					var calendar_element,date_element,expander_element;
					calendar_element = $("#ctc-calendar,#ctc-calendar-iframe");
					date_element = $(ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "dateSelector" : "endDateSelector"]);
					expander_element = $(ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "expanderSelector" : "endExpanderSelector"]);

					if ((calendar_element.length == 1 || calendar_element.length == 2) && expander_element.length > 0 && date_element.length == 1)
					{
						var expander_bottom,month_bottom,date_bottom,calendar_top;
						expander_bottom = expander_element.offset().top + get_true_height(expander_element);
						if (date_element.attr("type") == "hidden")
							date_bottom = date_element.parent().offset().top + get_true_height(date_element.parent());
						else
							date_bottom = date_element.offset().top + get_true_height(date_element);
						calendar_top = Math.max(expander_bottom,date_bottom) + 1;

						var expander_left,month_left,date_left,calendar_left;
						expander_left = expander_element.offset().left;
						if (date_element.attr("type") == "hidden")
							date_left = date_element.parent().offset().left;
						else
							date_left = date_element.offset().left;
						calendar_left = Math.min(expander_left,date_left);

						calendar_element.css({
							left:calendar_left,
							top:calendar_top
						});
					}
				}
				else if (ctcCalendars[active_ctcCalendar]["inputType"] == "dropdown")
				{
					var calendar_element,month_element,day_element,expander_element;
					calendar_element = $("#ctc-calendar,#ctc-calendar-iframe");
					month_element = $(ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "monthSelector" : "endMonthSelector"]);
					day_element = $(ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "daySelector" : "endDaySelector"]);
					expander_element = $(ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "expanderSelector" : "endExpanderSelector"]);

					if ((calendar_element.length == 1 || calendar_element.length == 2) && expander_element.length > 0 && month_element.length == 1 && day_element.length == 1)
					{
						var expander_bottom,month_bottom,day_bottom,calendar_top;
						expander_bottom = expander_element.offset().top + get_true_height(expander_element);
						month_bottom = month_element.offset().top + get_true_height(month_element);
						day_bottom = day_element.offset().top + get_true_height(day_element);
						calendar_top = Math.max(expander_bottom,month_bottom,day_bottom) + 1;

						var expander_left,month_left,day_left,calendar_left;
						expander_left = expander_element.offset().left;
						month_left = month_element.offset().left;
						day_left = day_element.offset().left;
						calendar_left = Math.min(expander_left,month_left,day_left);

						calendar_element.css({
							left:calendar_left,
							top:calendar_top
						});
					}
				}

				var calendar_element = $("#ctc-calendar,#ctc-calendar-iframe");
				calendar_element.removeClass("ctc-calendar-full").css({
					position:"absolute"
				});
				$("#ctc-calendar-modal-background").addClass("ctc-calendar-modal-background-full");
			}
			else if (ctcCalendars[active_ctcCalendar]["calendarDisplay"] == "modal")
			{
				var calendar_element = $("#ctc-calendar,#ctc-calendar-iframe");
				calendar_element.removeClass("ctc-calendar-full").css({
					left:($(window).width() / 2) - (get_true_width(calendar_element) / 2),
					position:"fixed",
					top:($(window).height() / 2) - (get_true_height(calendar_element) / 2)
				});
				$("#ctc-calendar-modal-background").addClass("ctc-calendar-modal-background-full");
			}
			else if (ctcCalendars[active_ctcCalendar]["calendarDisplay"] == "full")
			{
				var calendar_element = $("#ctc-calendar,#ctc-calendar-iframe");
				calendar_element.addClass("ctc-calendar-full").css({
					left:0,
					position:"fixed",
					top:0
				});
				$("#ctc-calendar-modal-background").addClass("ctc-calendar-modal-background-full");
			}
		}
	};

	$.ctcCalendar.hide = function() {
		var calendar_element;
		calendar_element = $("#ctc-calendar,#ctc-calendar-iframe");

		if (ctcCalendars[active_ctcCalendar]["calendarDisplay"] == "modal" || ctcCalendars[active_ctcCalendar]["calendarDisplay"] == "full")
		{
			$("body").css({
				overflow:last_body_overflow_value,
				marginRight:last_body_margin_right_value
			});
			$("#ctc-calendar-modal-background").hide();
		}

		if (calendar_element.length == 1 || calendar_element.length == 2)
		{
			calendar_element.hide();
			active_ctcCalendar = -1;
		}
	};

	$.ctcCalendar.update_month_selectors = function(ctcCalendar,update_end_ctcCalendar) {
		if (update_end_ctcCalendar === undefined)
			update_end_ctcCalendar = false;

		if (ctcCalendars[ctcCalendar]["overwriteMonthOptions"])
		{
			var month_element,day_element,start_month_element,start_day_element;
			month_element = $(ctcCalendars[ctcCalendar][!update_end_ctcCalendar ? "monthSelector" : "endMonthSelector"]);
			day_element = $(ctcCalendars[ctcCalendar][!update_end_ctcCalendar ? "daySelector" : "endDaySelector"]);

			if (ctcCalendars[ctcCalendar]["allowRange"] && update_end_ctcCalendar)
			{
				start_month_element = $(ctcCalendars[ctcCalendar]["monthSelector"]);
				start_day_element = $(ctcCalendars[ctcCalendar]["daySelector"]);
			}

			if (month_element.length == 1 && day_element.length == 1 && (!ctcCalendars[ctcCalendar]["allowRange"] || !update_end_ctcCalendar || (start_month_element.length == 1 && start_day_element.length == 1)))
			{
				if (/([0-9]{4})-([0-9]{2})/.test(month_element.val()) && day_element.val().length > 0)
				{
					var active_date = new Date();
					active_date.setFullYear(month_element.val().substring(0,4),parseInt(month_element.val().substring(5,7),10) - 1,1);
					if (get_days_in_month(active_date.getFullYear(),active_date.getMonth() + 1) < parseInt(day_element.val(),10))
						active_date.setFullYear(month_element.val().substring(0,4),parseInt(month_element.val().substring(5,7),10) - 1,get_days_in_month(active_date.getFullYear(),active_date.getMonth() + 1));
					else
						active_date.setFullYear(month_element.val().substring(0,4),parseInt(month_element.val().substring(5,7),10) - 1,parseInt(day_element.val(),10));
				}

				month_element.html("");

				if (ctcCalendars[ctcCalendar]["allowBlankDates"])
					month_element.append('<option value="">' + get_month_text() + '</option>');

				var minimum_date,maximum_date,draw_date;

				minimum_date = new Date();
				minimum_date.setFullYear(ctcCalendars[ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[ctcCalendar]["minimumDate"].getDate());
				if (update_end_ctcCalendar)
				{
					if (start_month_element.length == 1 && start_day_element.length == 1 && start_month_element.val().length > 0 && start_day_element.val().length > 0)
						minimum_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,parseInt(start_day_element.val(),10) + ctcCalendars[ctcCalendar]["minimumRange"]);
				}
				minimum_date.setHours(0,0,0,0);

				maximum_date = new Date();
				maximum_date.setFullYear(ctcCalendars[ctcCalendar]["maximumDate"].getFullYear(),ctcCalendars[ctcCalendar]["maximumDate"].getMonth(),ctcCalendars[ctcCalendar]["maximumDate"].getDate());
				if (ctcCalendars[ctcCalendar]["allowRange"])
				{
					var start_date;
					if (update_end_ctcCalendar)
					{
						if (/([0-9]{4})-([0-9]{2})/.test(start_month_element.val()) && start_day_element.val().length > 0)
						{
							start_date = new Date();
							start_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,1);
							if (get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1) < parseInt(day_element.val(),10))
								start_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1));
							else
								start_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,parseInt(start_day_element.val(),10));
						}
					}

					if (!update_end_ctcCalendar)
						maximum_date.setFullYear(maximum_date.getFullYear(),maximum_date.getMonth(),maximum_date.getDate() - ctcCalendars[ctcCalendar]["minimumRange"]);
					else if (typeof start_date != "undefined")
						maximum_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[ctcCalendar]["maximumRange"]);
				}
				maximum_date.setHours(23,59,59,999);

				draw_date = minimum_date;
				while (draw_date < maximum_date)
				{
					var class_markup = "";
					if (typeof active_date != "undefined")
					{
						if (active_date.getFullYear() == draw_date.getFullYear() && active_date.getMonth() == draw_date.getMonth())
							class_markup = ' selected="selected"';
					}

					month_element.append('<option value="' + draw_date.getFullYear() + '-' + (draw_date.getMonth() + 1 < 10 ? '0' + (draw_date.getMonth() + 1) : draw_date.getMonth() + 1) + '"' + class_markup + '>' + get_month_name(draw_date.getMonth() + 1) + ' ' + draw_date.getFullYear() + '</option>');
					draw_date.setFullYear(draw_date.getFullYear(),draw_date.getMonth() + 1,1);
				}
			}
		}
	};

	$.ctcCalendar.update_day_selectors = function(ctcCalendar,update_end_ctcCalendar) {
		if (update_end_ctcCalendar === undefined)
			update_end_ctcCalendar = false;

		if (ctcCalendars[ctcCalendar]["overwriteDayOptions"])
		{
			var month_element,day_element,start_month_element,start_day_element;
			month_element = $(ctcCalendars[ctcCalendar][!update_end_ctcCalendar ? "monthSelector" : "endMonthSelector"]);
			day_element = $(ctcCalendars[ctcCalendar][!update_end_ctcCalendar ? "daySelector" : "endDaySelector"]);

			if (ctcCalendars[ctcCalendar]["allowRange"] && update_end_ctcCalendar)
			{
				start_month_element = $(ctcCalendars[ctcCalendar]["monthSelector"]);
				start_day_element = $(ctcCalendars[ctcCalendar]["daySelector"]);
			}

			if (month_element.length == 1 && day_element.length == 1)
			{
				if (/([0-9]{4})-([0-9]{2})/.test(month_element.val()))
				{
					if (day_element.val().length > 0)
					{
						var active_date = new Date();
						active_date.setFullYear(month_element.val().substring(0,4),parseInt(month_element.val().substring(5,7),10) - 1,1);
						if (get_days_in_month(active_date.getFullYear(),active_date.getMonth() + 1) < parseInt(day_element.val(),10))
							active_date.setFullYear(month_element.val().substring(0,4),parseInt(month_element.val().substring(5,7),10) - 1,get_days_in_month(active_date.getFullYear(),active_date.getMonth() + 1));
						else
							active_date.setFullYear(month_element.val().substring(0,4),parseInt(month_element.val().substring(5,7),10) - 1,parseInt(day_element.val(),10));
					}

					var total_days = get_days_in_month(month_element.val().substring(0,4),month_element.val().substring(5,7));
					if (total_days > 0)
					{
						day_element.html("");

						if (ctcCalendars[ctcCalendar]["allowBlankDates"])
							day_element.append('<option value="">' + get_day_text() + '</option>');

						var minimum_date,maximum_date;

						minimum_date = new Date();
						minimum_date.setFullYear(ctcCalendars[ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[ctcCalendar]["minimumDate"].getDate());
						if (update_end_ctcCalendar)
						{
							var start_month_element,start_day_element;
							start_month_element = $(ctcCalendars[ctcCalendar]["monthSelector"]);
							start_day_element = $(ctcCalendars[ctcCalendar]["daySelector"]);

							if (start_month_element.length == 1 && start_day_element.length == 1 && start_month_element.val().length > 0 && start_day_element.val().length > 0)
								minimum_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,parseInt(start_day_element.val(),10) + ctcCalendars[ctcCalendar]["minimumRange"]);
							else
								minimum_date.setFullYear(minimum_date.getFullYear(),minimum_date.getMonth(),minimum_date.getDate() + ctcCalendars[ctcCalendar]["minimumRange"]);
						}
						minimum_date.setHours(0,0,0,0);

						maximum_date = new Date();
						maximum_date.setFullYear(ctcCalendars[ctcCalendar]["maximumDate"].getFullYear(),ctcCalendars[ctcCalendar]["maximumDate"].getMonth(),ctcCalendars[ctcCalendar]["maximumDate"].getDate());
						if (ctcCalendars[ctcCalendar]["allowRange"])
						{
							var start_date;
							if (update_end_ctcCalendar)
							{
								if (/([0-9]{4})-([0-9]{2})/.test(start_month_element.val()) && start_day_element.val().length > 0)
								{
									start_date = new Date();
									start_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,1);
									if (get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1) < parseInt(day_element.val(),10))
										start_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1));
									else
										start_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,parseInt(start_day_element.val(),10));
								}
							}

							if (!update_end_ctcCalendar)
								maximum_date.setFullYear(maximum_date.getFullYear(),maximum_date.getMonth(),maximum_date.getDate() - ctcCalendars[ctcCalendar]["minimumRange"]);
							else if (typeof start_date != "undefined")
								maximum_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[ctcCalendar]["maximumRange"]);
						}
						maximum_date.setHours(23,59,59,999);

						var checker_date = new Date();
						checker_date.setFullYear(month_element.val().substring(0,4),parseInt(month_element.val().substring(5,7),10) - 1,1);
						if (checker_date < minimum_date && !ctcCalendars[ctcCalendar]["overwriteMonthOptions"])
							checker_date.setFullYear(minimum_date.getFullYear(),minimum_date.getMonth(),1);

						for (day = 1;day <= total_days;day++)
						{
							checker_date.setFullYear(checker_date.getFullYear(),checker_date.getMonth(),day);
							checker_date.setHours(12,30,30,500);

							var class_markup = "";
							if (typeof active_date != "undefined")
							{
								if (active_date.getDate() == day)
									class_markup = ' selected="selected"';
							}

							if (checker_date >= minimum_date && checker_date <= maximum_date)
								day_element.append('<option value="' + (day < 10 ? '0' + day : day) + '"' + class_markup + '>' + day + '</option>');
						}
					}
				}
				else
					day_element.html('<option value="">' + get_day_text() + '</option>');
			}
		}
	};

	$.ctcCalendar.update_dropdown = function() {
		var dropdown_element,minimum_date,maximum_date;

		dropdown_element = $("#ctc-calendar-dropdown");

		minimum_date = new Date();
		minimum_date.setFullYear(ctcCalendars[active_ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["minimumDate"].getDate());
		if (active_ctcCalendar_is_end)
		{
			if (ctcCalendars[active_ctcCalendar]["inputType"] == "text")
			{
				var start_date_element;
				start_date_element = $(ctcCalendars[active_ctcCalendar]["dateSelector"]);

				if (start_date_element.length == 1)
				{
					if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 1 && /([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(start_date_element.val()))
						minimum_date.setFullYear(start_date_element.val().substring(6,10),parseInt(start_date_element.val().substring(0,2),10) - 1,parseInt(start_date_element.val().substring(3,5),10) + ctcCalendars[active_ctcCalendar]["minimumRange"]);
					else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 2 && /([A-Za-z]{3}) ([0-9]{1,2}), ([0-9]{4})$/.test(start_date_element.val()))
					{
						minimum_year = start_date_element.val().substring(start_date_element.val().length - 4,start_date_element.val().length);
						minimum_month = get_month_number(start_date_element.val().substring(0,3));
						minimum_day = start_date_element.val().substring(start_date_element.val().indexOf(" ") + 1,start_date_element.val().indexOf(","));

						minimum_date = new Date();
						minimum_date.setFullYear(minimum_year,minimum_month - 1,minimum_day);
					}
					else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 3 && /([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(start_date_element.val()))
						minimum_date.setFullYear(start_date_element.val().substring(6,10),parseInt(start_date_element.val().substring(3,5),10) - 1,parseInt(start_date_element.val().substring(0,2),10) + ctcCalendars[active_ctcCalendar]["minimumRange"]);
					else
						minimum_date.setFullYear(minimum_date.getFullYear(),minimum_date.getMonth(),minimum_date.getDate() + ctcCalendars[active_ctcCalendar]["minimumRange"]);
				}
			}
			else if (ctcCalendars[active_ctcCalendar]["inputType"] == "dropdown")
			{
				var start_month_element,start_day_element;
				start_month_element = $(ctcCalendars[active_ctcCalendar]["monthSelector"]);
				start_day_element = $(ctcCalendars[active_ctcCalendar]["daySelector"]);

				if (start_month_element.length == 1 && start_day_element.length == 1 && start_month_element.val().length > 0 && start_day_element.val().length > 0)
					minimum_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,parseInt(start_day_element.val(),10) + ctcCalendars[active_ctcCalendar]["minimumRange"]);
				else
					minimum_date.setFullYear(minimum_date.getFullYear(),minimum_date.getMonth(),minimum_date.getDate() + ctcCalendars[active_ctcCalendar]["minimumRange"]);
			}
		}
		minimum_date.setHours(0,0,0,0);

		maximum_date = new Date();
		maximum_date.setFullYear(ctcCalendars[active_ctcCalendar]["maximumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["maximumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["maximumDate"].getDate());
		if (ctcCalendars[active_ctcCalendar]["allowRange"])
		{
			if (ctcCalendars[active_ctcCalendar]["inputType"] == "text")
			{
				var start_date;
				if (active_ctcCalendar_is_end)
				{
					if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 1 && /([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(start_date_element.val()))
					{
						start_date = new Date();
						start_date.setFullYear(start_date_element.val().substring(6,10),parseInt(start_date_element.val().substring(0,2),10) - 1,parseInt(start_date_element.val().substring(3,5),10));
					}
					else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 2 && /([A-Za-z]{3}) ([0-9]{1,2}), ([0-9]{4})$/.test(start_date_element.val()))
					{
						start_date = new Date();

						start_year = start_date_element.val().substring(start_date_element.val().length - 4,start_date_element.val().length);
						start_month = get_month_number(start_date_element.val().substring(0,3));
						start_day = start_date_element.val().substring(start_date_element.val().indexOf(" ") + 1,start_date_element.val().indexOf(","));

						start_date = new Date();
						start_date.setFullYear(start_year,start_month - 1,start_day);
					}
					else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 3 && /([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(start_date_element.val()))
					{
						start_date = new Date();
						start_date.setFullYear(start_date_element.val().substring(6,10),parseInt(start_date_element.val().substring(3,5),10) - 1,parseInt(start_date_element.val().substring(0,2),10));
					}
				}

				if (!active_ctcCalendar_is_end)
					maximum_date.setFullYear(maximum_date.getFullYear(),maximum_date.getMonth(),maximum_date.getDate() - ctcCalendars[active_ctcCalendar]["minimumRange"]);
				else if (typeof start_date != "undefined")
					maximum_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[active_ctcCalendar]["maximumRange"]);

				if (active_ctcCalendar_is_end && maximum_date > ctcCalendars[active_ctcCalendar]["maximumDate"])
					maximum_date = ctcCalendars[active_ctcCalendar]["maximumDate"];
			}
			else if (ctcCalendars[active_ctcCalendar]["inputType"] == "dropdown")
			{
				var start_date;
				if (active_ctcCalendar_is_end)
				{
					if (/([0-9]{4})-([0-9]{2})/.test(start_month_element.val()) && start_day_element.val().length > 0)
					{
						start_date = new Date();
						start_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,start_day_element.val());
					}
				}

				if (!active_ctcCalendar_is_end)
					maximum_date.setFullYear(maximum_date.getFullYear(),maximum_date.getMonth(),maximum_date.getDate() - ctcCalendars[active_ctcCalendar]["minimumRange"]);
				else if (typeof start_date != "undefined")
					maximum_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[active_ctcCalendar]["maximumRange"]);

				if (active_ctcCalendar_is_end && maximum_date > ctcCalendars[active_ctcCalendar]["maximumDate"])
					maximum_date = ctcCalendars[active_ctcCalendar]["maximumDate"];
			}
		}
		maximum_date.setHours(23,59,59,999);

		dropdown_element.html("");

		var draw_date = minimum_date;
		while (draw_date < maximum_date)
		{
			dropdown_element.append('<option value="' + draw_date.getFullYear() + '-' + (draw_date.getMonth() + 1 < 10 ? '0' + (draw_date.getMonth() + 1) : draw_date.getMonth() + 1) + '">' + get_month_name(draw_date.getMonth() + 1,false) + ' ' + draw_date.getFullYear() + '</option>');
			draw_date.setFullYear(draw_date.getFullYear(),draw_date.getMonth() + 1,1);
		}
	};

	$.ctcCalendar.update_calendars = function(draw_date) {
		var active_date,other_active_date;

		if (draw_date.getDate() != 1)
			draw_date.setFullYear(draw_date.getFullYear(),draw_date.getMonth(),1);

		if (ctcCalendars[active_ctcCalendar]["inputType"] == "text")
		{
			var date_element,other_date_element;
			date_element = $(ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "dateSelector" : "endDateSelector"]);

			if (ctcCalendars[active_ctcCalendar]["allowRange"])
			{
				if (active_ctcCalendar_is_end)
					other_date_element = $(ctcCalendars[active_ctcCalendar]["dateSelector"]);
				else
					other_date_element = $(ctcCalendars[active_ctcCalendar]["endDateSelector"]);
			}
		}
		else if (ctcCalendars[active_ctcCalendar]["inputType"] == "dropdown")
		{
			var month_element,day_element,start_month_element,start_day_element;
			month_element = $(ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "monthSelector" : "endMonthSelector"]);
			day_element = $(ctcCalendars[active_ctcCalendar][!active_ctcCalendar_is_end ? "daySelector" : "endDaySelector"]);

			if (ctcCalendars[active_ctcCalendar]["allowRange"] && active_ctcCalendar_is_end)
			{
				start_month_element = $(ctcCalendars[active_ctcCalendar]["monthSelector"]);
				start_day_element = $(ctcCalendars[active_ctcCalendar]["daySelector"]);
			}
		}

		todays_date = new Date();
		if (ctcCalendars[active_ctcCalendar]["inputType"] == "text")
		{
			if (date_element.length == 1)
			{
				if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 1)
				{
					if (parseInt(date_element.val().substring(3,5),10) <= get_days_in_month(parseInt(date_element.val().substring(6,10)),parseInt(date_element.val().substring(0,2),10)) && /([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(date_element.val()))
					{
						active_date = new Date();
						active_date.setFullYear(date_element.val().substring(6,10),parseInt(date_element.val().substring(0,2),10) - 1,parseInt(date_element.val().substring(3,5),10));
						active_date.setHours(0,0,0,0);

						if (ctcCalendars[active_ctcCalendar]["allowRange"])
						{
							if (parseInt(other_date_element.val().substring(3,5),10) <= get_days_in_month(parseInt(other_date_element.val().substring(6,10)),parseInt(other_date_element.val().substring(0,2),10)) && /([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(other_date_element.val()))
							{
								other_active_date = new Date();
								other_active_date.setFullYear(other_date_element.val().substring(6,10),parseInt(other_date_element.val().substring(0,2),10) - 1,parseInt(other_date_element.val().substring(3,5),10));
								other_active_date.setHours(0,0,0,0);
							}
						}
					}
				}
				else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 2)
				{
					if (/([A-Za-z]{3}) ([0-9]{1,2}), ([0-9]{4})$/.test(date_element.val()))
					{
						var active_year,active_month,active_day;
						active_year = date_element.val().substring(date_element.val().length - 4,date_element.val().length);
						active_month = get_month_number(date_element.val().substring(0,3));
						active_day = date_element.val().substring(date_element.val().indexOf(" ") + 1,date_element.val().indexOf(","));

						active_date = new Date();
						active_date.setFullYear(active_year,active_month - 1,active_day);
						active_date.setHours(0,0,0,0);

						if (ctcCalendars[active_ctcCalendar]["allowRange"])
						{
							if (/([A-Za-z]{3}) ([0-9]{1,2}), ([0-9]{4})$/.test(other_date_element.val()))
							{
								var other_active_year,other_active_month,other_active_day;
								other_active_year = other_date_element.val().substring(other_date_element.val().length - 4,other_date_element.val().length);
								other_active_month = get_month_number(other_date_element.val().substring(0,3));
								other_active_day = other_date_element.val().substring(other_date_element.val().indexOf(" ") + 1,other_date_element.val().indexOf(","));

								other_active_date = new Date();
								other_active_date.setFullYear(other_active_year,other_active_month - 1,other_active_day);
								other_active_date.setHours(0,0,0,0);
							}
						}
					}
				}
				else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 3)
				{
					if (parseInt(date_element.val().substring(0,2),10) <= get_days_in_month(parseInt(date_element.val().substring(6,10)),parseInt(date_element.val().substring(3,5),10)) && /([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(date_element.val()))
					{
						active_date = new Date();
						active_date.setFullYear(date_element.val().substring(6,10),parseInt(date_element.val().substring(3,5),10) - 1,parseInt(date_element.val().substring(0,2),10));
						active_date.setHours(0,0,0,0);

						if (ctcCalendars[active_ctcCalendar]["allowRange"])
						{
							if (parseInt(other_date_element.val().substring(0,2),10) <= get_days_in_month(parseInt(other_date_element.val().substring(6,10)),parseInt(other_date_element.val().substring(3,5),10)) && /([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(other_date_element.val()))
							{
								other_active_date = new Date();
								other_active_date.setFullYear(other_date_element.val().substring(6,10),parseInt(other_date_element.val().substring(3,5),10) - 1,parseInt(other_date_element.val().substring(0,2),10));
								other_active_date.setHours(0,0,0,0);
							}
						}
					}
				}
			}
		}
		else if (ctcCalendars[active_ctcCalendar]["inputType"] == "dropdown")
		{
			if (month_element.length == 1 && day_element.length == 1)
			{
				if (parseInt(day_element.val(),10) <= get_days_in_month(month_element.val().substring(0,4),parseInt(month_element.val().substring(5,7),10)))
				{
					active_date = new Date();
					active_date.setFullYear(month_element.val().substring(0,4),parseInt(month_element.val().substring(5,7),10) - 1,parseInt(day_element.val(),10));
					active_date.setHours(0,0,0,0);
				}
			}
		}

		var ctc_calendar_dropdown_element = $("#ctc-calendar-dropdown");

		for (var calendar = 1;calendar <= 3;calendar++)
		{
			var calendar_name;
			if (calendar == 1)
				calendar_name = "#ctc-calendar-first";
			else if (calendar == 2)
				calendar_name = "#ctc-calendar-second";
			else if (calendar == 3)
				calendar_name = "#ctc-calendar-third";

			if (calendar == 1)
				ctc_calendar_dropdown_element.val(draw_date.getFullYear() + "-" + (draw_date.getMonth() + 1 < 10 ? '0' + (draw_date.getMonth() + 1) : draw_date.getMonth() + 1));
			else if (calendar == 2 || calendar == 3)
				$(calendar_name + "-month-name").text(get_month_name(draw_date.getMonth() + 1) + " " + draw_date.getFullYear());

			var calendar_markup = "",current_day = 0;
			if (draw_date.getDay() > 0)
			{
				calendar_markup += '<div class="ctc-calendar-week ctc-calendar-week-one">';
				for (day = 1;day <= draw_date.getDay();day++)
					calendar_markup += '<div class="ctc-calendar-blank ctc-calendar-' + get_day_name(++current_day % 7).toLowerCase() + '" />';
			}

			var minimum_date,maximum_date;

			minimum_date = new Date();
			minimum_date.setFullYear(ctcCalendars[active_ctcCalendar]["minimumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["minimumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["minimumDate"].getDate());
			if (active_ctcCalendar_is_end)
			{
				if (ctcCalendars[active_ctcCalendar]["inputType"] == "text")
				{
					var other_date_element;
					other_date_element = $(ctcCalendars[active_ctcCalendar]["dateSelector"]);

					if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 1)
					{
						if (/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/.test(other_date_element.val()))
							minimum_date.setFullYear(other_date_element.val().substring(6,10),parseInt(other_date_element.val().substring(0,2),10) - 1,parseInt(other_date_element.val().substring(3,5),10) + ctcCalendars[active_ctcCalendar]["minimumRange"]);
						else
							minimum_date.setFullYear(minimum_date.getFullYear(),minimum_date.getMonth(),minimum_date.getDate() + ctcCalendars[active_ctcCalendar]["minimumRange"]);
					}
					else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 2)
					{
						if (/([A-Za-z]{3}) ([0-9]{1,2}), ([0-9]{4})$/.test(other_date_element.val()))
						{
							var other_date_year,other_date_month,other_date_day;
							other_date_year = other_date_element.val().substring(other_date_element.val().length - 4,other_date_element.val().length);
							other_date_month = get_month_number(other_date_element.val().substring(0,3));
							other_date_day = other_date_element.val().substring(other_date_element.val().indexOf(" ") + 1,other_date_element.val().indexOf(","));

							minimum_date.setFullYear(other_date_year,other_date_month - 1,parseInt(other_date_day) + ctcCalendars[active_ctcCalendar]["minimumRange"]);
						}
						else
							minimum_date.setFullYear(minimum_date.getFullYear(),minimum_date.getMonth(),minimum_date.getDate() + ctcCalendars[active_ctcCalendar]["minimumRange"]);
					}
					else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 3)
					{
						if (/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/.test(other_date_element.val()))
							minimum_date.setFullYear(other_date_element.val().substring(6,10),parseInt(other_date_element.val().substring(3,5),10) - 1,parseInt(other_date_element.val().substring(0,2),10) + ctcCalendars[active_ctcCalendar]["minimumRange"]);
						else
							minimum_date.setFullYear(minimum_date.getFullYear(),minimum_date.getMonth(),minimum_date.getDate() + ctcCalendars[active_ctcCalendar]["minimumRange"]);
					}
				}
				else if (ctcCalendars[active_ctcCalendar]["inputType"] == "dropdown")
				{
					var start_month_element,start_day_element;
					start_month_element = $(ctcCalendars[active_ctcCalendar]["monthSelector"]);
					start_day_element = $(ctcCalendars[active_ctcCalendar]["daySelector"]);

					if (start_month_element.length == 1 && start_day_element.length == 1 && start_month_element.val().length > 0 && start_day_element.val().length > 0)
						minimum_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,parseInt(start_day_element.val(),10) + ctcCalendars[active_ctcCalendar]["minimumRange"]);
					else
						minimum_date.setFullYear(minimum_date.getFullYear(),minimum_date.getMonth(),minimum_date.getDate() + ctcCalendars[active_ctcCalendar]["minimumRange"]);
				}
			}
			minimum_date.setHours(0,0,0,0);

			maximum_date = new Date();
			maximum_date.setFullYear(ctcCalendars[active_ctcCalendar]["maximumDate"].getFullYear(),ctcCalendars[active_ctcCalendar]["maximumDate"].getMonth(),ctcCalendars[active_ctcCalendar]["maximumDate"].getDate());
			if (ctcCalendars[active_ctcCalendar]["allowRange"])
			{
				var start_date;
				if (active_ctcCalendar_is_end)
				{
					if (ctcCalendars[active_ctcCalendar]["inputType"] == "text")
					{
						if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 1)
						{
							if (/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/.test(other_date_element.val()))
							{
								start_date = new Date();
								start_date.setFullYear(other_date_element.val().substring(6,10),parseInt(other_date_element.val().substring(0,2),10) - 1,1);
								if (get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1) < parseInt(other_date_element.val().substring(3,5),10))
									start_date.setFullYear(other_date_element.val().substring(6,10),parseInt(other_date_element.val().substring(0,2),10) - 1,get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1));
								else
									start_date.setFullYear(other_date_element.val().substring(6,10),parseInt(other_date_element.val().substring(0,2),10) - 1,parseInt(other_date_element.val().substring(3,5),10));
							}
						}
						else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 2)
						{
							if (/([A-Za-z]{3}) ([0-9]{1,2}), ([0-9]{4})$/.test(other_date_element.val()))
							{
								var other_date_year,other_date_month,other_date_day;
								other_date_year = other_date_element.val().substring(other_date_element.val().length - 4,other_date_element.val().length);
								other_date_month = get_month_number(other_date_element.val().substring(0,3));
								other_date_day = other_date_element.val().substring(other_date_element.val().indexOf(" ") + 1,other_date_element.val().indexOf(","));

								start_date = new Date();
								start_date.setFullYear(other_date_year,other_date_month - 1,1);
								if (get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1) < other_date_day)
									start_date.setFullYear(other_date_year,other_date_month - 1,get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1));
								else
									start_date.setFullYear(other_date_year,other_date_month - 1,other_date_day);
							}
						}
						else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 3)
						{
							if (/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/.test(other_date_element.val()))
							{
								start_date = new Date();
								start_date.setFullYear(other_date_element.val().substring(6,10),parseInt(other_date_element.val().substring(3,5),10) - 1,1);
								if (get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1) < parseInt(other_date_element.val().substring(0,2),10))
									start_date.setFullYear(other_date_element.val().substring(6,10),parseInt(other_date_element.val().substring(3,5),10) - 1,get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1));
								else
									start_date.setFullYear(other_date_element.val().substring(6,10),parseInt(other_date_element.val().substring(3,5),10) - 1,parseInt(other_date_element.val().substring(0,2),10));
							}
						}
					}
					else if (ctcCalendars[active_ctcCalendar]["inputType"] == "dropdown")
					{
						if (/([0-9]{4})-([0-9]{2})/.test(start_month_element.val()) && start_day_element.val().length > 0)
						{
							start_date = new Date();
							start_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,1);
							if (get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1) < parseInt(day_element.val(),10))
								start_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,get_days_in_month(start_date.getFullYear(),start_date.getMonth() + 1));
							else
								start_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,parseInt(start_day_element.val(),10));
						}
					}
				}

				if (!active_ctcCalendar_is_end)
					maximum_date.setFullYear(maximum_date.getFullYear(),maximum_date.getMonth(),maximum_date.getDate() - ctcCalendars[active_ctcCalendar]["minimumRange"]);
				else if (typeof start_date != "undefined")
					maximum_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[active_ctcCalendar]["maximumRange"]);

				if (active_ctcCalendar_is_end && maximum_date > ctcCalendars[active_ctcCalendar]["maximumDate"])
					maximum_date = ctcCalendars[active_ctcCalendar]["maximumDate"];
			}
			maximum_date.setHours(23,59,59,999);

			for (day = 1;day <= 42 - draw_date.getDay();day++)
			{
				if (current_day % 7 == 0)
				{
					if (calendar_markup.length > 0)
						calendar_markup += '</div>';
					calendar_markup += '<div class="ctc-calendar-week ctc-calendar-week-' + number_to_text(Math.round(current_day / 7) + 1).toLowerCase() + '">';
				}
				if (day <= get_days_in_month(draw_date.getFullYear(),draw_date.getMonth() + 1))
				{
					var current_date,class_markup;

					current_date = new Date();
					current_date.setFullYear(draw_date.getFullYear(),draw_date.getMonth(),day);

					class_markup = '';
					if (current_date >= minimum_date && current_date <= maximum_date)
						class_markup += ' ctc-calendar-selectable';
					if (current_date.getFullYear() == todays_date.getFullYear() && current_date.getMonth() == todays_date.getMonth() && current_date.getDate() == todays_date.getDate())
						class_markup += ' ctc-calendar-today';
					if (active_date)
					{
						if (current_date.getFullYear() == active_date.getFullYear() && current_date.getMonth() == active_date.getMonth() && current_date.getDate() == active_date.getDate())
							class_markup += ' ctc-calendar-active';
					}
					if (other_active_date)
					{
						if (current_date.getFullYear() == other_active_date.getFullYear() && current_date.getMonth() == other_active_date.getMonth() && current_date.getDate() == other_active_date.getDate())
							class_markup += ' ctc-calendar-other-active';
					}
					if (active_date && other_active_date && active_date != other_active_date)
					{
						if ((active_date < other_active_date && current_date >= active_date && current_date <= other_active_date) || (active_date > other_active_date && current_date <= active_date && current_date >= other_active_date))
							class_markup += ' ctc-calendar-in-range';
					}

					calendar_markup += '<div class="ctc-calendar-' + get_day_name((current_day++ % 7) + 1).toLowerCase() + class_markup + '">';

					if (current_date >= minimum_date && current_date <= maximum_date)
						calendar_markup += '<a href="#" title="' + get_month_name(draw_date.getMonth() + 1) + ' ' + day + ', ' + draw_date.getFullYear() + '" id="ctc-calendar-' + draw_date.getFullYear() + '-' + (draw_date.getMonth() + 1 < 10 ? '0' + (draw_date.getMonth() + 1) : draw_date.getMonth() + 1) + '-' + day + '">';
					calendar_markup += day;
					if (current_date >= ctcCalendars[active_ctcCalendar]["minimumDate"] && current_date <= maximum_date)
						calendar_markup += '</a>';
					calendar_markup += '</div>';
				}
				else
					calendar_markup += '<div class="ctc-calendar-blank ctc-calendar-' + get_day_name((current_day++ % 7) + 1).toLowerCase() + '" />';
			}
			calendar_markup += '</div>';

			$(calendar_name + " div.ctc-calendar-week").remove();
			$(calendar_name).append(calendar_markup);

			if ($(calendar_name + " div.ctc-calendar-week-five div.ctc-calendar-blank").length == 7)
				$(calendar_name).addClass("ctc-calendar-four-weeks").removeClass("ctc-calendar-five-weeks").removeClass("ctc-calendar-six-weeks");
			else if ($(calendar_name + " div.ctc-calendar-week-six div.ctc-calendar-blank").length == 7)
				$(calendar_name).removeClass("ctc-calendar-four-weeks").addClass("ctc-calendar-five-weeks").removeClass("ctc-calendar-six-weeks");
			else
				$(calendar_name).removeClass("ctc-calendar-four-weeks").removeClass("ctc-calendar-five-weeks").addClass("ctc-calendar-six-weeks");

			draw_date.setFullYear(draw_date.getFullYear(),draw_date.getMonth() + 1,1);
		}

		$("#ctc-calendar div.ctc-calendar-week a").click(function() {
			var new_date = new Date();
			new_date.setFullYear(this.id.substring(13,17),parseInt(this.id.substring(18,20),10) - 1,this.id.substring(21,23));
			$.ctcCalendar.set_new_date(new_date,active_ctcCalendar_is_end);
			if (!active_ctcCalendar_is_end && ctcCalendars[active_ctcCalendar]["allowRange"])
				$.ctcCalendar.check_end_date(active_ctcCalendar);
			$.ctcCalendar.hide();
			return false;
		});

		var dropdown_date = new Date();

		dropdown_date.setFullYear(ctc_calendar_dropdown_element.val().substring(0,4),parseInt(ctc_calendar_dropdown_element.val().substring(5,7),10) - 2,1);
		if (ctc_calendar_dropdown_element.find("option[value=" + dropdown_date.getFullYear() + "-" + (dropdown_date.getMonth() + 1 < 10 ? '0' + (dropdown_date.getMonth() + 1) : dropdown_date.getMonth() + 1) + "]").length == 0)
			$("#ctc-calendar a.ctc-calendar-previous-month").fadeTo(1,0.33);
		else
			$("#ctc-calendar a.ctc-calendar-previous-month").fadeTo(1,1);

		dropdown_date.setFullYear(ctc_calendar_dropdown_element.val().substring(0,4),parseInt(ctc_calendar_dropdown_element.val().substring(5,7),10),1);
		if (ctc_calendar_dropdown_element.find("option[value=" + dropdown_date.getFullYear() + "-" + (dropdown_date.getMonth() + 1 < 10 ? '0' + (dropdown_date.getMonth() + 1) : dropdown_date.getMonth() + 1) + "]").length == 0)
			$("#ctc-calendar a.ctc-calendar-next-month").fadeTo(1,0.33);
		else
			$("#ctc-calendar a.ctc-calendar-next-month").fadeTo(1,1);
	};

	$.ctcCalendar.set_new_date = function(new_date,update_end_ctcCalendar) {
		if (update_end_ctcCalendar === undefined)
			update_end_ctcCalendar = false;

		if (ctcCalendars[active_ctcCalendar]["inputType"] == "text")
		{
			var date_element = $(ctcCalendars[active_ctcCalendar][!update_end_ctcCalendar ? "dateSelector" : "endDateSelector"]);
			if (new_date == "blank")
			{
				if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 1)
					date_element.val("mm/dd/yyyy").change();
				else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 2)
					date_element.val("Select a Date").change();
				else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 3)
					date_element.val("dd/mm/yyyy").change();
			}
			else
			{
				if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 1)
					date_element.val((new_date.getMonth() + 1 < 10 ? "0" + (new_date.getMonth() + 1) : new_date.getMonth() + 1) + "/" + (new_date.getDate() < 10 ? "0" + "" + new_date.getDate() : new_date.getDate()) + "/" + new_date.getFullYear()).change();
				else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 2)
					date_element.val(get_month_name(new_date.getMonth() + 1,false) + " " + new_date.getDate() + ", " + new_date.getFullYear()).change();
				else if (ctcCalendars[active_ctcCalendar]["dateFormat"] == 3)
					date_element.val((new_date.getDate() < 10 ? "0" + "" + new_date.getDate() : new_date.getDate()) + "/" + (new_date.getMonth() + 1 < 10 ? "0" + (new_date.getMonth() + 1) : new_date.getMonth() + 1)+ "/" + new_date.getFullYear()).change();
			}
		}
		else if (ctcCalendars[active_ctcCalendar]["inputType"] == "dropdown")
		{
			var month_element,day_element,month_value,day_value;

			month_element = $(ctcCalendars[active_ctcCalendar][!update_end_ctcCalendar ? "monthSelector" : "endMonthSelector"]);
			if (new_date == "blank")
				month_value = "";
			else
				month_value = new_date.getFullYear() + "-" + (new_date.getMonth() + 1 < 10 ? "0" + (new_date.getMonth() + 1) : new_date.getMonth() + 1);

			day_element = $(ctcCalendars[active_ctcCalendar][!update_end_ctcCalendar ? "daySelector" : "endDaySelector"]);
			if (new_date == "blank")
				day_value = "";
			else
				day_value = new_date.getDate() < 10 ? "0" + "" + new_date.getDate() : new_date.getDate();

			if (month_element.find("option[value=" + month_value + "]").length > 0 && (new_date == "blank" || parseInt(day_value,10) <= get_days_in_month(new_date.getFullYear(),new_date.getMonth() + 1)))
			{
				month_element.val(month_value).change();
				$.ctcCalendar.update_day_selectors(active_ctcCalendar,update_end_ctcCalendar);
				day_element.val(day_value).change();
			}
		}
	};

	$.ctcCalendar.check_end_date = function(ctcCalendar) {
		if (ctcCalendars[ctcCalendar]["inputType"] == "text")
		{
			var start_date_element,end_date_element;

			start_date_element = $(ctcCalendars[ctcCalendar]["dateSelector"]);
			end_date_element = $(ctcCalendars[ctcCalendar]["endDateSelector"]);

			if (start_date_element.length == 1 && end_date_element.length == 1)
			{
				if (ctcCalendars[ctcCalendar]["dateFormat"] == 1)
				{
					if (/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/.test(start_date_element.val()))
					{
						if (/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/.test(end_date_element.val()))
						{
							var start_date,end_date,minimum_date,maximum_date;

							start_date = new Date();
							start_date.setFullYear(start_date_element.val().substring(6,10),parseInt(start_date_element.val().substring(0,2),10) - 1,parseInt(start_date_element.val().substring(3,5),10));
							start_date.setHours(0,0,0,0);

							end_date = new Date();
							end_date.setFullYear(end_date_element.val().substring(6,10),parseInt(end_date_element.val().substring(0,2),10) - 1,parseInt(end_date_element.val().substring(3,5),10));
							end_date.setHours(0,0,0,0);

							minimum_date = new Date();
							minimum_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[ctcCalendar]["minimumRange"]);
							minimum_date.setHours(0,0,0,0);

							maximum_date = new Date();
							maximum_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[ctcCalendar]["maximumRange"]);
							maximum_date.setHours(0,0,0,0);

							if (end_date < minimum_date || end_date > maximum_date)
							{
								if (end_date > maximum_date)
									end_date.setFullYear(maximum_date.getFullYear(),maximum_date.getMonth(),maximum_date.getDate());
								else
									end_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[ctcCalendar]["defaultRange"]);

								var former_active_ctcCalendar = active_ctcCalendar;
								active_ctcCalendar = ctcCalendar;
								$.ctcCalendar.set_new_date(end_date,true);
								active_ctcCalendar = former_active_ctcCalendar;
							}
						}
						else if (ctcCalendars[ctcCalendar]["autoSetEndDate"])
						{
							var new_date;
							new_date = new Date();
							new_date.setFullYear(start_date_element.val().substring(6,10),parseInt(start_date_element.val().substring(0,2),10) - 1,parseInt(start_date_element.val().substring(3,5),10) + ctcCalendars[ctcCalendar]["defaultRange"]);

							var former_active_ctcCalendar = active_ctcCalendar;
							active_ctcCalendar = ctcCalendar;
							$.ctcCalendar.set_new_date(new_date,true);
							active_ctcCalendar = former_active_ctcCalendar;
						}
					}
				}
				else if (ctcCalendars[ctcCalendar]["dateFormat"] == 2)
				{
					if (/([A-Za-z]{3}) ([0-9]{1,2}), ([0-9]{4})$/.test(start_date_element.val()))
					{
						if (/([A-Za-z]{3}) ([0-9]{1,2}), ([0-9]{4})$/.test(end_date_element.val()))
						{
							var start_year,start_month,start_day,end_year,end_month,end_day;
							start_year = start_date_element.val().substring(start_date_element.val().length - 4,start_date_element.val().length);
							start_month = get_month_number(start_date_element.val().substring(0,3));
							start_day = start_date_element.val().substring(start_date_element.val().indexOf(" ") + 1,start_date_element.val().indexOf(","));
							end_year = end_date_element.val().substring(end_date_element.val().length - 4,end_date_element.val().length);
							end_month = get_month_number(end_date_element.val().substring(0,3));
							end_day = end_date_element.val().substring(end_date_element.val().indexOf(" ") + 1,end_date_element.val().indexOf(","));

							var start_date,end_date,compare_date;

							start_date= new Date();
							start_date.setFullYear(start_year,start_month - 1,start_day);

							end_date = new Date();
							end_date.setFullYear(end_year,end_month - 1,end_day);
							end_date.setHours(0,0,0,0);

							compare_date = new Date();
							compare_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[ctcCalendar]["minimumRange"]);
							compare_date.setHours(0,0,0,0);

							if (compare_date > end_date)
							{
								compare_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[ctcCalendar]["defaultRange"]);

								var former_active_ctcCalendar = active_ctcCalendar;
								active_ctcCalendar = ctcCalendar;
								$.ctcCalendar.set_new_date(compare_date,true);
								active_ctcCalendar = former_active_ctcCalendar;
							}
						}
						else if (ctcCalendars[ctcCalendar]["autoSetEndDate"])
						{
							var start_year,start_month,start_day,end_year,end_month,end_day;
							start_year = start_date_element.val().substring(start_date_element.val().length - 4,start_date_element.val().length);
							start_month = get_month_number(start_date_element.val().substring(0,3));
							start_day = start_date_element.val().substring(start_date_element.val().indexOf(" ") + 1,start_date_element.val().indexOf(","));

							var new_date;
							new_date = new Date();
							new_date.setFullYear(start_year,start_month - 1,parseInt(start_day,10) + ctcCalendars[ctcCalendar]["defaultRange"]);

							var former_active_ctcCalendar = active_ctcCalendar;
							active_ctcCalendar = ctcCalendar;
							$.ctcCalendar.set_new_date(new_date,true);
							active_ctcCalendar = former_active_ctcCalendar;
						}
					}
				}
				else if (ctcCalendars[ctcCalendar]["dateFormat"] == 3)
				{
					if (/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/.test(start_date_element.val()))
					{
						if (/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/.test(end_date_element.val()))
						{
							var start_date,end_date,compare_date;

							start_date= new Date();
							start_date.setFullYear(start_date_element.val().substring(6,10),parseInt(start_date_element.val().substring(3,5),10) - 1,parseInt(start_date_element.val().substring(0,2),10));

							end_date = new Date();
							end_date.setFullYear(end_date_element.val().substring(6,10),parseInt(end_date_element.val().substring(3,5),10) - 1,parseInt(end_date_element.val().substring(0,2),10));
							end_date.setHours(0,0,0,0);

							compare_date = new Date();
							compare_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[ctcCalendar]["minimumRange"]);
							compare_date.setHours(0,0,0,0);

							if (compare_date > end_date)
							{
								compare_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[ctcCalendar]["defaultRange"]);

								var former_active_ctcCalendar = active_ctcCalendar;
								active_ctcCalendar = ctcCalendar;
								$.ctcCalendar.set_new_date(compare_date,true);
								active_ctcCalendar = former_active_ctcCalendar;
							}
						}
						else if (ctcCalendars[ctcCalendar]["autoSetEndDate"])
						{
							var new_date;
							new_date = new Date();
							new_date.setFullYear(start_date_element.val().substring(6,10),parseInt(start_date_element.val().substring(3,5),10) - 1,parseInt(start_date_element.val().substring(0,2),10) + ctcCalendars[ctcCalendar]["defaultRange"]);

							var former_active_ctcCalendar = active_ctcCalendar;
							active_ctcCalendar = ctcCalendar;
							$.ctcCalendar.set_new_date(new_date,true);
							active_ctcCalendar = former_active_ctcCalendar;
						}
					}
				}
			}
		}
		else if (ctcCalendars[ctcCalendar]["inputType"] == "dropdown")
		{
			var start_month_element,start_day_element,end_month_element,end_day_element;

			start_month_element = $(ctcCalendars[ctcCalendar]["monthSelector"]);
			start_day_element = $(ctcCalendars[ctcCalendar]["daySelector"]);
			end_month_element = $(ctcCalendars[ctcCalendar]["endMonthSelector"]);
			end_day_element = $(ctcCalendars[ctcCalendar]["endDaySelector"]);

			if (start_month_element.length == 1 && start_day_element.length == 1 && end_month_element.length == 1 && end_day_element.length == 1)
			{
				if (/([0-9]{4})-([0-9]{2})/.test(start_month_element.val()) && start_day_element.val().length > 0)
				{
					var start_date,end_date,compare_date;

					start_date= new Date();
					start_date.setFullYear(start_month_element.val().substring(0,4),parseInt(start_month_element.val().substring(5,7),10) - 1,parseInt(start_day_element.val(),10));

					end_date = new Date();
					end_date.setFullYear(end_month_element.val().substring(0,4),parseInt(end_month_element.val().substring(5,7),10) - 1,parseInt(end_day_element.val(),10));
					end_date.setHours(0,0,0,0);

					compare_date = new Date();
					compare_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[ctcCalendar]["minimumRange"]);
					compare_date.setHours(0,0,0,0);

					if (compare_date > end_date)
					{
						compare_date.setFullYear(start_date.getFullYear(),start_date.getMonth(),start_date.getDate() + ctcCalendars[ctcCalendar]["defaultRange"]);

						var former_active_ctcCalendar = active_ctcCalendar;
						active_ctcCalendar = ctcCalendar;
						$.ctcCalendar.set_new_date(compare_date,true);
						active_ctcCalendar = former_active_ctcCalendar;
					}
				}
			}
		}
	};

	$.ctcCalendar.add_to_dom = function() {
		var ctcCalendar_markup = '';
		if ($.browser.msie && parseInt($.browser.version) === 6)
			ctcCalendar_markup += '<iframe id="ctc-calendar-iframe" frameborder="0" />';
		ctcCalendar_markup += '' +
			'<div id="ctc-calendar-modal-background" />' +
			'<div id="ctc-calendar">' +
				'<div id="ctc-calendar-header">' +
					'<div id="ctc-calendar-header-inner">' +
						'<a href="#" title="Hide Calendar" id="ctc-calendar-hide">' +
							'Hide Calendar' +
						'</a>' +
						'<span>' +
							'Powered by' +
						'</span>' +
						' ' +
						'<a href="https://github.com/ctcCalendar/ctcCalendar" target="_blank" title="ctcCalendar" id="ctc-calendar-powered-by">' +
							'ctcCalendar' +
						'</a>' +
					'</div>' +
				'</div>' +
				'<div id="ctc-calendar-body">' +
					'<div id="ctc-calendar-first">' +
						'<div class="ctc-calendar-month">' +
							'<div class="ctc-calendar-month-inner-1">' +
								'<div class="ctc-calendar-month-inner-2">' +
									'<select id="ctc-calendar-dropdown" />' +
									'<a href="#" title="Next Month" class="ctc-calendar-next-month">' +
										'<span class="ctc-calendar-next-month-inner">' +
											'Next Month' +
										'</span>' +
									'</a>' +
									'<a href="#" title="Previous Month" class="ctc-calendar-previous-month">' +
										'<span class="ctc-calendar-previous-month-inner">' +
											'Previous Month' +
										'</span>' +
									'</a>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="ctc-calendar-days">' +
							'<div class="ctc-calendar-sunday">' +
								get_day_name(1,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-monday">' +
								get_day_name(2,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-tuesday">' +
								get_day_name(3,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-wednesday">' +
								get_day_name(4,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-thursday">' +
								get_day_name(5,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-friday">' +
								get_day_name(6,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-saturday">' +
								get_day_name(7,false).substring(0,1) +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div id="ctc-calendar-second">' +
						'<div class="ctc-calendar-month">' +
							'<div class="ctc-calendar-month-inner" colspan="5">' +
								'<strong id="ctc-calendar-second-month-name" />' +
								'<a href="#" title="Next Month" class="ctc-calendar-next-month">Next Month</a>' +
								'<a href="#" title="Previous Month" class="ctc-calendar-previous-month">Previous Month</a>' +
							'</div>' +
						'</div>' +
						'<div class="ctc-calendar-days">' +
							'<div class="ctc-calendar-sunday">' +
								get_day_name(1,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-monday">' +
								get_day_name(2,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-tuesday">' +
								get_day_name(3,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-wednesday">' +
								get_day_name(4,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-thursday">' +
								get_day_name(5,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-friday">' +
								get_day_name(6,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-saturday">' +
								get_day_name(7,false).substring(0,1) +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div id="ctc-calendar-third">' +
						'<div class="ctc-calendar-month">' +
							'<div class="ctc-calendar-month-inner" colspan="5">' +
								'<strong id="ctc-calendar-third-month-name" />' +
								'<a href="#" title="Next Month" class="ctc-calendar-next-month">Next Month</a>' +
								'<a href="#" title="Previous Month" class="ctc-calendar-previous-month">Previous Month</a>' +
							'</div>' +
						'</div>' +
						'<div class="ctc-calendar-days">' +
							'<div class="ctc-calendar-sunday">' +
								get_day_name(1,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-monday">' +
								get_day_name(2,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-tuesday">' +
								get_day_name(3,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-wednesday">' +
								get_day_name(4,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-thursday">' +
								get_day_name(5,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-friday">' +
								get_day_name(6,false).substring(0,1) +
							'</div>' +
							'<div class="ctc-calendar-saturday">' +
								get_day_name(7,false).substring(0,1) +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';
		$("body").prepend(ctcCalendar_markup);

		$("#ctc-calendar-hide").click(function() {
			$.ctcCalendar.hide();
			return false;
		});

		$("#ctc-calendar-dropdown").change(function() {
			if (/([0-9]{4})-([0-9]{2})/.test($(this).val()))
			{
				var date = new Date();
				date.setFullYear($(this).val().substring(0,4),parseInt($(this).val().substring(5,7),10) - 1,1);
				$.ctcCalendar.update_calendars(date);
			}
		});

		$("#ctc-calendar a.ctc-calendar-previous-month,#ctc-calendar a.ctc-calendar-next-month").click(function() {
			if (/([0-9]{4})-([0-9]{2})/.test($("#ctc-calendar-dropdown").val()))
			{
				var date = new Date();
				if ($(this).hasClass("ctc-calendar-previous-month"))
					date.setFullYear($("#ctc-calendar-dropdown").val().substring(0,4),parseInt($("#ctc-calendar-dropdown").val().substring(5,7),10) - 1 - 1,1);
				else if ($(this).hasClass("ctc-calendar-next-month"))
					date.setFullYear($("#ctc-calendar-dropdown").val().substring(0,4),parseInt($("#ctc-calendar-dropdown").val().substring(5,7),10) - 1 + 1,1);

				var new_dropdown_value = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				if ($("#ctc-calendar-dropdown option[value=" + new_dropdown_value + "]").length > 0)
					$("#ctc-calendar-dropdown").val(new_dropdown_value).change();
			}
			return false;
		});
	};
})(jQuery);