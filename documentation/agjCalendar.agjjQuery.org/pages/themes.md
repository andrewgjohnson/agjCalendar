---
layout:    layout
title:     agjCalendar&#58; Themes
permalink: /themes/
nav:       4
---

# Themes

Because all visual stylings of agjCalendar are controlled by CSS, it can be straightforward to add your own styles thought your own CSS stylesheet. Alternatively, the plugin has eight included themes and support for custom themes. The included themes can be used to quickly add your website’s colours into your agjCalendar integration. If you have multiple agjCalendar integrations on your website and want to use different colours for each you will need to use multiple themes. To add a theme to your integration use the `theme` option.

    // A basic agjCalendar integration
    $.agjCalendar({
      dateSelector: '#text-input'
    });

    // A basic agjCalendar integration with the 'red' theme enabled
    $.agjCalendar({
      dateSelector: '#text-input',
      theme:        'red'
    });

    // A more complex agjCalendar integration with the 'custom-xxx' theme enabled
    $.agjCalendar({
      theme:           'custom-xxx',
      dateSelector:    '#start-date',
      allowRange:      true,
      endDateSelector: '#end-date',
      minimumRange:    0,
      maximumRange:    99,
      defaultRange:    99,
      minimumDate:     '2000-01-07',
      maximumDate:     '2000-12-31',
      defaultDate:     '2000-01-17',
      defaultEndDate:  '2000-01-21'
    });

## Included Themes

The plugin comes with built-in support for eight themes as well as the default gray theme. Here are preview images for the nine themes that are included with the plugin…

Theme|Preview
-----|-------
*default*|![Default Theme](/documentation/agjCalendar.agjjQuery.org/images/theme-default.png)
red|![Red Theme](/documentation/agjCalendar.agjjQuery.org/images/theme-red.png)
orange|![Orange Theme](/documentation/agjCalendar.agjjQuery.org/images/theme-orange.png)
yellow|![Yellow Theme](/documentation/agjCalendar.agjjQuery.org/images/theme-yellow.png)
green|![Green Theme](/documentation/agjCalendar.agjjQuery.org/images/theme-green.png)
cyan|![Cyan Theme](/documentation/agjCalendar.agjjQuery.org/images/theme-cyan.png)
blue|![Blue Theme](/documentation/agjCalendar.agjjQuery.org/images/theme-blue.png)
purple|![Purple Theme](/documentation/agjCalendar.agjjQuery.org/images/theme-purple.png)
pink|![Pink Theme](/documentation/agjCalendar.agjjQuery.org/images/theme-pink.png)

## Custom Themes

The plugin also supports custom themes beyond the eight included themes. A custom theme must begin with `custom-`. You will need to add custom stylings to your CSS stylesheet to integration a custom theme, the `custom-xxx` styles are included on the documentation website but not the plugin.

### Custom Theme Generator

<noscript><p>You must enable Javascript to use our custom theme generator.</p></noscript>

<div id="ctg" style="display:none">
  <p>You can use the custom theme generator below to style agjCalendar to match your branding. The custom theme generator supports long hex codes (with or without the <code>#</code>), short hex codes (with or without the <code>#</code>), RGB colours, RGBA colours, HSL colours, HSLA colours and all colour keywords as defined by the <a href="https://www.w3.org/wiki/CSS/Properties/color/keywords" title="World Wide Web Consortium (W3C)">World Wide Web Consortium (W3C)</a>. We recommend using hex codes.</p>
  <form method="post" action="/themes/#custom-theme-generator" onsubmit="return false;" class="interactive">
    <p>
      <label for="ctg-theme-name">Custom theme name</label>
      <br />
      <input type="text" id="ctg-theme-name" value="" placeholder="hotdog" />
      <br />
      <br />
      <label for="ctg-border">Border</label>
      <br />
      <input type="text" id="ctg-border" value="" placeholder="#000000" />
      <br />
      <br />
      <label for="ctg-title-bar">Title bar</label>
      <br />
      <input type="text" id="ctg-title-bar" value="" placeholder="#ff0000" />
      <br />
      <br />
      <label for="ctg-inner-colour">Inner colour</label>
      <br />
      <input type="text" id="ctg-inner-colour" value="" placeholder="#c6c6c6" />
      <br />
      <br />
      <label for="ctg-header-border">Header border</label>
      <br />
      <input type="text" id="ctg-header-border" value="" placeholder="#000000" />
      <br />
      <br />
      <label for="ctg-header-background">Header background</label>
      <br />
      <input type="text" id="ctg-header-background" value="" placeholder="#ff0000" />
      <br />
      <br />
      <label for="ctg-header-text">Header text</label>
      <br />
      <input type="text" id="ctg-header-text" value="" placeholder="#ffffff" />
      <br />
      <br />
      <label for="ctg-calendar-border">Calendar border</label>
      <br />
      <input type="text" id="ctg-calendar-border" value="" placeholder="#848484" />
      <br />
      <br />
      <label for="ctg-calendar-background">Calendar background</label>
      <br />
      <input type="text" id="ctg-calendar-background" value="" placeholder="#ffffff" />
      <br />
      <br />
      <label for="ctg-unselectable-background">Unselectable background</label>
      <br />
      <input type="text" id="ctg-unselectable-background" value="" placeholder="#c6c6c6" />
      <br />
      <br />
      <label for="ctg-unselectable-colour">Unselectable colour</label>
      <br />
      <input type="text" id="ctg-unselectable-colour" value="" placeholder="#848484" />
      <br />
      <br />
      <label for="ctg-date-background">Date background</label>
      <br />
      <input type="text" id="ctg-date-background" value="" placeholder="#ffff00" />
      <br />
      <br />
      <label for="ctg-date-background-active">Date background (active)</label>
      <br />
      <input type="text" id="ctg-date-background-active" value="" placeholder="#ff0000" />
      <br />
      <br />
      <label for="ctg-date-background-other-active">Date background (other active)</label>
      <br />
      <input type="text" id="ctg-date-background-other-active" value="" placeholder="#ff8000" />
      <br />
      <br />
      <label for="ctg-date-background-in-range">Date background (in range)</label>
      <br />
      <input type="text" id="ctg-date-background-in-range" value="" placeholder="#ffbf00" />
      <br />
      <br />
      <label for="ctg-date-colour">Date colour</label>
      <br />
      <input type="text" id="ctg-date-colour" value="" placeholder="#000000" />
      <br />
      <br />
      <label for="ctg-date-colour-active">Date colour (active)</label>
      <br />
      <input type="text" id="ctg-date-colour-active" value="" placeholder="#ffffff" />
      <br />
      <br />
      <label for="ctg-date-colour-other-active">Date colour (other active)</label>
      <br />
      <input type="text" id="ctg-date-colour-other-active" value="" placeholder="#ffffff" />
      <br />
      <br />
      <label for="ctg-date-colour-in-range">Date colour (in range)</label>
      <br />
      <input type="text" id="ctg-date-colour-in-range" value="" placeholder="#000000" />
      <br />
      <br />
      <input type="submit" value="Generate" class="submit" id="ctg-generate" />
    </p>
    <pre><code id="ctg-code"></code></pre>
  </form>
  <div id="agjCalendar" class="agjCalendar-single" style="bottom:-233px;display:block;left:10px;position:fixed">
    <div id="agjCalendar-header">
      <div id="agjCalendar-header-inner">
        <a onclick="return false;" href="#" id="agjCalendar-hide" title="Hide Calendar">Hide Calendar</a><span>Powered by</span> <a onclick="return false;" href="https://agjcalendar.agjjquery.org/" target="_blank" title="agjCalendar" id="agjCalendar-powered-by">agjCalendar</a>
      </div>
    </div>
    <div id="agjCalendar-body">
      <div id="agjCalendar-first" class="agjCalendar-six-weeks">
        <div class="agjCalendar-month">
          <div class="agjCalendar-month-inner-1">
            <div class="agjCalendar-month-inner-2">
              <select id="agjCalendar-dropdown">
                <option value="2000-01">Jan 2000</option>
              </select>
              <a onclick="return false;" href="#" class="agjCalendar-next-month" title="Next Month">
                <span class="agjCalendar-next-month-inner">Next Month</span>
              </a>
              <a onclick="return false;" href="#" class="agjCalendar-previous-month" title="Previous Month">
                <span class="agjCalendar-previous-month-inner">Previous Month</span>
              </a>
            </div>
          </div>
        </div>
        <div class="agjCalendar-days">
          <div class="agjCalendar-sunday" title="Sunday">S</div>
          <div class="agjCalendar-monday" title="Monday">M</div>
          <div class="agjCalendar-tuesday" title="Tuesday">T</div>
          <div class="agjCalendar-wednesday" title="Wednesday">W</div>
          <div class="agjCalendar-thursday" title="Thursday">T</div>
          <div class="agjCalendar-friday" title="Friday">F</div>
          <div class="agjCalendar-saturday" title="Saturday">S</div>
        </div>
        <div class="agjCalendar-week agjCalendar-week-one">
          <div class="agjCalendar-blank agjCalendar-sunday"></div>
          <div class="agjCalendar-blank agjCalendar-monday"></div>
          <div class="agjCalendar-blank agjCalendar-tuesday"></div>
          <div class="agjCalendar-blank agjCalendar-wednesday"></div>
          <div class="agjCalendar-blank agjCalendar-thursday"></div>
          <div class="agjCalendar-blank agjCalendar-friday"></div>
          <div class="agjCalendar-saturday">1</div>
        </div>
        <div class="agjCalendar-week agjCalendar-week-two">
          <div class="agjCalendar-sunday agjCalendar-selectable">2</div>
          <div class="agjCalendar-monday agjCalendar-selectable">3</div>
          <div class="agjCalendar-tuesday agjCalendar-selectable">4</div>
          <div class="agjCalendar-wednesday agjCalendar-selectable">5</div>
          <div class="agjCalendar-thursday agjCalendar-selectable">6</div>
          <div class="agjCalendar-friday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 7, 2000" id="agjCalendar-2000-01-07">7</a>
          </div>
          <div class="agjCalendar-saturday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 8, 2000" id="agjCalendar-2000-01-08">8</a>
          </div>
        </div>
        <div class="agjCalendar-week agjCalendar-week-three">
          <div class="agjCalendar-sunday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 9, 2000" id="agjCalendar-2000-01-09">9</a>
          </div>
          <div class="agjCalendar-monday agjCalendar-selectable">
             <a onclick="return false;" href="#" title="January 10, 2000" id="agjCalendar-2000-01-10">10</a></div>
          <div class="agjCalendar-tuesday agjCalendar-selectable">
             <a onclick="return false;" href="#" title="January 11, 2000" id="agjCalendar-2000-01-11">11</a></div>
          <div class="agjCalendar-wednesday agjCalendar-selectable">
             <a onclick="return false;" href="#" title="January 12, 2000" id="agjCalendar-2000-01-12">12</a></div>
          <div class="agjCalendar-thursday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 13, 2000" id="agjCalendar-2000-01-13">13</a></div>
          <div class="agjCalendar-friday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 14, 2000" id="agjCalendar-2000-01-14">14</a></div>
          <div class="agjCalendar-saturday agjCalendar-selectable">
             <a onclick="return false;" href="#" title="January 15, 2000" id="agjCalendar-2000-01-15">15</a></div>
        </div>
        <div class="agjCalendar-week agjCalendar-week-four">
          <div class="agjCalendar-sunday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 16, 2000" id="agjCalendar-2000-01-16">16</a>
          </div>
          <div class="agjCalendar-monday agjCalendar-selectable agjCalendar-active">
            <a onclick="return false;" href="#" title="January 17, 2000" id="agjCalendar-2000-01-17">17</a>
          </div>
          <div class="agjCalendar-tuesday agjCalendar-selectable agjCalendar-in-range">
            <a onclick="return false;" href="#" title="January 18, 2000" id="agjCalendar-2000-01-18">18</a>
          </div>
          <div class="agjCalendar-wednesday agjCalendar-selectable agjCalendar-in-range">
            <a onclick="return false;" href="#" title="January 19, 2000" id="agjCalendar-2000-01-19">19</a>
          </div>
          <div class="agjCalendar-thursday agjCalendar-selectable agjCalendar-in-range">
            <a onclick="return false;" href="#" title="January 20, 2000" id="agjCalendar-2000-01-20">20</a>
          </div>
          <div class="agjCalendar-friday agjCalendar-selectable agjCalendar-other-active">
            <a onclick="return false;" href="#" title="January 21, 2000" id="agjCalendar-2000-01-21">21</a>
          </div>
          <div class="agjCalendar-saturday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 22, 2000" id="agjCalendar-2000-01-22">22</a>
          </div>
       </div>
      <div class="agjCalendar-week agjCalendar-week-five">
        <div class="agjCalendar-sunday agjCalendar-selectable">
          <a onclick="return false;" href="#" title="January 23, 2000" id="agjCalendar-2000-01-23">23</a>
        </div>
        <div class="agjCalendar-monday agjCalendar-selectable">
          <a onclick="return false;" href="#" title="January 24, 2000" id="agjCalendar-2000-01-24">24</a>
        </div>
        <div class="agjCalendar-tuesday agjCalendar-selectable">
          <a onclick="return false;" href="#" title="January 25, 2000" id="agjCalendar-2000-01-25">25</a>
        </div>
        <div class="agjCalendar-wednesday agjCalendar-selectable">
          <a onclick="return false;" href="#" title="January 26, 2000" id="agjCalendar-2000-01-26">26</a>
        </div>
        <div class="agjCalendar-thursday agjCalendar-selectable">
          <a onclick="return false;" href="#" title="January 27, 2000" id="agjCalendar-2000-01-27">27</a>
        </div>
        <div class="agjCalendar-friday agjCalendar-selectable">
          <a onclick="return false;" href="#" title="January 28, 2000" id="agjCalendar-2000-01-28">28</a>
        </div>
        <div class="agjCalendar-saturday agjCalendar-selectable">
          <a onclick="return false;" href="#" title="January 29, 2000" id="agjCalendar-2000-01-29">29</a>
        </div>
      </div>
      <div class="agjCalendar-week agjCalendar-week-six">
        <div class="agjCalendar-sunday agjCalendar-selectable">
          <a onclick="return false;" href="#" title="January 30, 2000" id="agjCalendar-2000-01-30">30</a>
        </div>
        <div class="agjCalendar-monday agjCalendar-selectable">
          <a onclick="return false;" href="#" title="January 31, 2000" id="agjCalendar-2000-01-31">31</a>
        </div>
        <div class="agjCalendar-blank agjCalendar-tuesday"></div>
        <div class="agjCalendar-blank agjCalendar-wednesday"></div>
        <div class="agjCalendar-blank agjCalendar-thursday"></div>
        <div class="agjCalendar-blank agjCalendar-friday"></div>
        <div class="agjCalendar-blank agjCalendar-saturday"></div>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
  (function() {
    var ctgElement = document.getElementById('ctg');
    var ctgThemeNameElement = document.getElementById('ctg-theme-name');
    var ctgBorderElement = document.getElementById('ctg-border');
    var ctgTitleBarElement = document.getElementById('ctg-title-bar');
    var ctgInnerColourElement = document.getElementById('ctg-inner-colour');
    var ctgHeaderBorderElement = document.getElementById('ctg-header-border');
    var ctgHeaderBackgroundElement = document.getElementById('ctg-header-background');
    var ctgHeaderTextElement = document.getElementById('ctg-header-text');
    var ctgCalendarBorderElement = document.getElementById('ctg-calendar-border');
    var ctgCalendarBackgroundElement = document.getElementById('ctg-calendar-background');
    var ctgUnselectableBackgroundElement = document.getElementById('ctg-unselectable-background');
    var ctgUnselectableColourElement = document.getElementById('ctg-unselectable-colour');
    var ctgDateBackgroundElement = document.getElementById('ctg-date-background');
    var ctgDateBackgroundActiveElement = document.getElementById('ctg-date-background-active');
    var ctgDateBackgroundOtherActiveElement = document.getElementById('ctg-date-background-other-active');
    var ctgDateBackgroundInRangeElement = document.getElementById('ctg-date-background-in-range');
    var ctgDateColourElement = document.getElementById('ctg-date-colour');
    var ctgDateColourActiveElement = document.getElementById('ctg-date-colour-active');
    var ctgDateColourOtherActiveElement = document.getElementById('ctg-date-colour-other-active');
    var ctgDateColourInRangeElement = document.getElementById('ctg-date-colour-in-range');
    var ctgCodeElement = document.getElementById('ctg-code');
    if (
      ctgElement !== null &&
      ctgThemeNameElement !== null &&
      ctgBorderElement !== null &&
      ctgTitleBarElement !== null &&
      ctgInnerColourElement !== null &&
      ctgHeaderBorderElement !== null &&
      ctgHeaderBackgroundElement !== null &&
      ctgHeaderTextElement !== null &&
      ctgCalendarBorderElement !== null &&
      ctgCalendarBackgroundElement !== null &&
      ctgUnselectableBackgroundElement !== null &&
      ctgUnselectableColourElement !== null &&
      ctgDateBackgroundElement !== null &&
      ctgDateBackgroundActiveElement !== null &&
      ctgDateBackgroundOtherActiveElement !== null &&
      ctgDateBackgroundInRangeElement !== null &&
      ctgDateColourElement !== null &&
      ctgDateColourActiveElement !== null &&
      ctgDateColourOtherActiveElement !== null &&
      ctgDateColourInRangeElement !== null &&
      ctgCodeElement !== null
    ) {
      var fillCtg = function() {
        var determineThemeName = function(element) {
          var themeNameRegex = new RegExp(/^([a-zA-Z0-9-]+)$/);
          if (themeNameRegex.test(element.value)) {
            // all custom themes must begin with 'custom-'
            return element.value.indexOf('custom-') === 0 ? element.value : 'custom-' + element.value;
          }

          // all custom themes must begin with 'custom-'
          return element.placeholder.indexOf('custom-') === 0 ? element.placeholder : 'custom-' + element.placeholder;
        };

        var determineColour = function(element) {
          var hexRegex = new RegExp(/^#?(?:[0-9a-fA-F]{3}){1,2}$/);
          if (hexRegex.test(element.value)) {
            // the # is optional in our form fields but mandatory for CSS
            return element.value.indexOf('#') === 0 ? element.value : '#' + element.value; 
          }

          var nonHexRegex = new RegExp(/^((rgba?|hsla?)\((\d{1,3}%?,\s*){2}\d{1,3}%?(,\s*(0|1|0?\.\d+))?\)|(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen))$/);
          if (nonHexRegex.test(element.value)) {
            return element.value;
          }

          return element.placeholder;
        };

        // determine theme name and colours
        var themeName = determineThemeName(ctgThemeNameElement);
        var border = determineColour(ctgBorderElement);
        var titleBar = determineColour(ctgTitleBarElement);
        var innerColour = determineColour(ctgInnerColourElement);
        var headerBorder = determineColour(ctgHeaderBorderElement);
        var headerBackground = determineColour(ctgHeaderBackgroundElement);
        var headerText = determineColour(ctgHeaderTextElement);
        var calendarBorder = determineColour(ctgCalendarBorderElement);
        var calendarBackground = determineColour(ctgCalendarBackgroundElement);
        var unselectableBackground = determineColour(ctgUnselectableBackgroundElement);
        var unselectableColour = determineColour(ctgUnselectableColourElement);
        var dateBackground = determineColour(ctgDateBackgroundElement);
        var dateBackgroundActive = determineColour(ctgDateBackgroundActiveElement);
        var dateBackgroundOtherActive = determineColour(ctgDateBackgroundOtherActiveElement);
        var dateBackgroundInRange = determineColour(ctgDateBackgroundInRangeElement);
        var dateColour = determineColour(ctgDateColourElement);
        var dateColourActive = determineColour(ctgDateColourActiveElement);
        var dateColourOtherActive = determineColour(ctgDateColourOtherActiveElement);
        var dateColourInRange = determineColour(ctgDateColourInRangeElement);

        // update CSS code
        var strRepeat = function(inputString, numberOfTimes) { // based on https://www.php.net/manual/function.str-repeat.php
          var result = '';
          for (var i = 0; i < numberOfTimes; i++) {
            result += inputString;
          }
          return result;
        };

        var ctgMarkup = '';
        ctgMarkup += '/* start of agjCalendar `' + themeName + '` theme */';
        ctgMarkup += '\r\n';
        ctgMarkup += '\r\n';
        ctgMarkup += '#agjCalendar.agjCalendar-theme-' + themeName + '  ' + strRepeat(' ', 109 + themeName.length) + '{ border-color:' + border + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-header  ' + strRepeat(' ', 98 + themeName.length) + '{ background-color:' + titleBar + ';border-color:' + border + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-dropdown  ' + strRepeat(' ', 96 + themeName.length) + '{ border-color:' + headerBorder + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-body  ' + strRepeat(' ', 100 + themeName.length) + '{ background-color:' + innerColour + ';border-color:' + innerColour + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-days,div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-month ' + strRepeat(' ', 17) + '{ background-color:' + headerBackground + ';border-color:' + headerBorder + ';color:' + headerText + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-week  ' + strRepeat(' ', 79 + themeName.length) + '{ background-color:' + calendarBackground + ';border-color:' + calendarBorder + ';border-bottom-color:' + calendarBorder + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-week-six  ' + strRepeat(' ', 75 + themeName.length) + '{ border-bottom-color:' + calendarBorder + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-week div  ' + strRepeat(' ', 75 + themeName.length) + '{ background-color:' + unselectableBackground + ';border-color:' + calendarBorder + ';color:' + unselectableColour + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-week div.agjCalendar-blank  ' + strRepeat(' ', 57 + themeName.length) + '{ background-color:' + calendarBackground + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-week a  ' + strRepeat(' ', 77 + themeName.length) + '{ background-color:' + dateBackground + ';color:' + dateColour + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-in-range,div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-in-range a ' + strRepeat(' ', 8) + '{ background-color:' + dateBackgroundInRange + ';color:' + dateColourInRange + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-other-active,div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-other-active a { background-color:' + dateBackgroundOtherActive + ';color:' + dateColourOtherActive + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-active,div.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-active a ' + strRepeat(' ', 12) + '{ background-color:' + dateBackgroundActive + ';color:' + dateColourActive + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += 'div.agjCalendar-full.agjCalendar-theme-' + themeName + ' #agjCalendar-body div.agjCalendar-month a span ' + strRepeat(' ', 55 + themeName.length) + '{ border-color:transparent ' + border + ' }';
        ctgMarkup += '\r\n';
        ctgMarkup += '\r\n';
        ctgMarkup += '/* end of agjCalendar `' + themeName + '` theme */';
        ctgMarkup += '\r\n';
        ctgMarkup += ' ';

        ctgCodeElement.innerHTML = ctgMarkup;

        // refresh highlight.js syntax highlighting
        ctgCodeElement.removeAttribute('data-highlighted');
        ctgCodeElement.removeAttribute('class');
        hljs.highlightAll();

        // update live preview
        jQuery('#agjCalendar').css('borderColor', border);

        jQuery('#agjCalendar-header').css({
          'borderBottomColor': border,
          'backgroundColor': titleBar
        });

        jQuery('#agjCalendar-body').css({
          'backgroundColor': innerColour,
          'borderColor': innerColour
        });

        jQuery('#agjCalendar-dropdown').css('borderColor', headerBorder);

        jQuery('div.agjCalendar-days').css({
          'backgroundColor': headerBackground,
          'borderColor': headerBorder,
          'color': headerText
        });

        jQuery('div.agjCalendar-month').css({
          'backgroundColor': headerBackground,
          'borderColor': headerBorder
        });

        jQuery('div.agjCalendar-week').css({
          'backgroundColor': calendarBackground,
          'borderColor': calendarBorder
        });

        jQuery('div.agjCalendar-week div').css({
          'borderLeftColor': calendarBorder,
          'backgroundColor': unselectableBackground,
          'color': unselectableColour
        });

        jQuery('div.agjCalendar-week div.agjCalendar-blank').css('backgroundColor', calendarBackground);

        jQuery('div.agjCalendar-week a').css({
          'backgroundColor': dateBackground,
          'color': dateColour
        });

        jQuery('div.agjCalendar-active a').css({
          'backgroundColor': dateBackgroundActive,
          'color': dateColourActive
        });

        jQuery('div.agjCalendar-other-active a').css({
          'backgroundColor': dateBackgroundOtherActive,
          'color': dateColourOtherActive
        });

        jQuery('div.agjCalendar-in-range a').css({
          'backgroundColor': dateBackgroundInRange,
          'color': dateColourInRange
        });
      };
      fillCtg();

      ctgThemeNameElement.addEventListener('blur', fillCtg);
      ctgBorderElement.addEventListener('blur', fillCtg);
      ctgTitleBarElement.addEventListener('blur', fillCtg);
      ctgInnerColourElement.addEventListener('blur', fillCtg);
      ctgHeaderBorderElement.addEventListener('blur', fillCtg);
      ctgHeaderBackgroundElement.addEventListener('blur', fillCtg);
      ctgHeaderTextElement.addEventListener('blur', fillCtg);
      ctgCalendarBorderElement.addEventListener('blur', fillCtg);
      ctgCalendarBackgroundElement.addEventListener('blur', fillCtg);
      ctgUnselectableBackgroundElement.addEventListener('blur', fillCtg);
      ctgUnselectableColourElement.addEventListener('blur', fillCtg);
      ctgDateBackgroundElement.addEventListener('blur', fillCtg);
      ctgDateBackgroundActiveElement.addEventListener('blur', fillCtg);
      ctgDateBackgroundOtherActiveElement.addEventListener('blur', fillCtg);
      ctgDateBackgroundInRangeElement.addEventListener('blur', fillCtg);
      ctgDateColourElement.addEventListener('blur', fillCtg);
      ctgDateColourActiveElement.addEventListener('blur', fillCtg);
      ctgDateColourOtherActiveElement.addEventListener('blur', fillCtg);
      ctgDateColourInRangeElement.addEventListener('blur', fillCtg);

      var ctgGenerateElement = document.getElementById('ctg-generate');
      if (ctgGenerateElement !== null) {
        ctgGenerateElement.addEventListener('click', fillCtg);
      }

      jQuery(window).on('scroll', function() {
        var ctgTop = jQuery('#custom-theme-generator').offset().top;
        var animationSpeed = 250;
        if (ctgTop <= jQuery(window).scrollTop() + jQuery(window).height()) {
          // slide up
          jQuery('#agjCalendar').stop().animate({
            'bottom': '10px'
          }, animationSpeed);
        } else {
          // slide down
          jQuery('#agjCalendar').stop().animate({
            'bottom': '-233px'
          }, animationSpeed);
        }
      });

      ctgElement.style.display = 'block';
    }
  })();
</script>

<style>@media (max-width: 1200px) { #agjCalendar{ display:none!important } }</style>
