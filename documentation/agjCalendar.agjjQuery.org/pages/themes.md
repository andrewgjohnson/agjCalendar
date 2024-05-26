---
layout:    layout
title:     agjCalendar&#58; Themes
permalink: /themes/
nav:       5
---

# Themes

Because all visual stylings of agjCalendar are controlled by CSS, it can be straightforward to add your own agjCalendar stylings into your website’s CSS. Alternatively, the plugin has eight included themes and support for custom themes. The included themes can be used to quickly add your website’s colours into your integration. If you have multiple integrations on your website and want to use different colours for each you will need to use multiple themes. To add a theme to your integration use the `theme` option.

    // A basic agjCalendar integration
    $.agjCalendar({
      dateSelector: '#text-input'
    });

    // A basic agjCalendar integration with the 'red' theme enabled
    $.agjCalendar({
      dateSelector: '#text-input',
      theme:        'red'
    });

    // Alternatively you can use the $.fn.agjCalendar() function for the same result
    $('#text-input').agjCalendar({
      theme: 'red'
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

theme|preview
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
  <p>You can use the custom theme generator below to style agjCalendar to match your branding.</p>
  <p>The custom theme generator supports long hex codes (with or without the <code>#</code>), short hex codes (with or without the <code>#</code>), RGB colours, RGBA colours, HSL colours, HSLA colours and all colour keywords as defined by the <a href="https://www.w3.org/wiki/CSS/Properties/color/keywords" title="World Wide Web Consortium (W3C)">World Wide Web Consortium (W3C)</a>. We recommend using hex codes.</p>
  <p>Copy and paste the generated CSS into your own stylesheet for the stylings to appear on your website.</p>
  <form method="post" action="/themes/#custom-theme-generator" onsubmit="return false;" class="interactive interactive-tool">
    <p>
      <label for="ctg-theme-name">Custom theme name</label>
      <br />
      <input type="text" id="ctg-theme-name" value="" placeholder="hotdog-stand" />
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
  <div id="agjCalendar" class="agjCalendar-single agjCalendar-small" style="bottom:-233px;display:block;left:10px;position:fixed">
    <div id="agjCalendar-header">
      <div id="agjCalendar-header-inner">
        <a onclick="return false;" href="#" id="agjCalendar-hide" title="Hide Calendar">Hide Calendar</a>
        <span id="agjCalendar-powered-by-before">Powered by </span>
        <a onclick="return false;" href="https://agjcalendar.agjjquery.org/" target="_blank" title="agjCalendar" id="agjCalendar-powered-by">agjCalendar</a>
        <span id="agjCalendar-powered-by-before"></span>
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
            <a onclick="return false;" href="#" title="January 7, 2000">7</a>
          </div>
          <div class="agjCalendar-saturday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 8, 2000">8</a>
          </div>
        </div>
        <div class="agjCalendar-week agjCalendar-week-three">
          <div class="agjCalendar-sunday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 9, 2000">9</a>
          </div>
          <div class="agjCalendar-monday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 10, 2000">10</a>
          </div>
          <div class="agjCalendar-tuesday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 11, 2000">11</a>
          </div>
          <div class="agjCalendar-wednesday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 12, 2000">12</a>
          </div>
          <div class="agjCalendar-thursday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 13, 2000">13</a>
          </div>
          <div class="agjCalendar-friday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 14, 2000">14</a>
          </div>
          <div class="agjCalendar-saturday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 15, 2000">15</a>
          </div>
        </div>
        <div class="agjCalendar-week agjCalendar-week-four">
          <div class="agjCalendar-sunday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 16, 2000">16</a>
          </div>
          <div class="agjCalendar-monday agjCalendar-selectable agjCalendar-active">
            <a onclick="return false;" href="#" title="January 17, 2000">17</a>
          </div>
          <div class="agjCalendar-tuesday agjCalendar-selectable agjCalendar-in-range">
            <a onclick="return false;" href="#" title="January 18, 2000">18</a>
          </div>
          <div class="agjCalendar-wednesday agjCalendar-selectable agjCalendar-in-range">
            <a onclick="return false;" href="#" title="January 19, 2000">19</a>
          </div>
          <div class="agjCalendar-thursday agjCalendar-selectable agjCalendar-in-range">
            <a onclick="return false;" href="#" title="January 20, 2000">20</a>
          </div>
          <div class="agjCalendar-friday agjCalendar-selectable agjCalendar-other-active">
            <a onclick="return false;" href="#" title="January 21, 2000">21</a>
          </div>
          <div class="agjCalendar-saturday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 22, 2000">22</a>
          </div>
        </div>
        <div class="agjCalendar-week agjCalendar-week-five">
          <div class="agjCalendar-sunday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 23, 2000">23</a>
          </div>
          <div class="agjCalendar-monday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 24, 2000">24</a>
          </div>
          <div class="agjCalendar-tuesday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 25, 2000">25</a>
          </div>
          <div class="agjCalendar-wednesday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 26, 2000">26</a>
          </div>
          <div class="agjCalendar-thursday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 27, 2000">27</a>
          </div>
          <div class="agjCalendar-friday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 28, 2000">28</a>
          </div>
          <div class="agjCalendar-saturday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 29, 2000">29</a>
          </div>
        </div>
        <div class="agjCalendar-week agjCalendar-week-six">
          <div class="agjCalendar-sunday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 30, 2000">30</a>
          </div>
          <div class="agjCalendar-monday agjCalendar-selectable">
            <a onclick="return false;" href="#" title="January 31, 2000">31</a>
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
</div>

<script type="text/javascript">
  (function($) {
    var ctgElement = document.getElementById('ctg');
    if (ctgElement !== null) {
      var fillCtg = function() {
        // determine theme name and colours
        var determineThemeName = function(jQueryElement) {
          var themeName;
          if (new RegExp(/^([a-zA-Z0-9-]+)$/).test(jQueryElement.val())) {
            themeName = jQueryElement.val();
          } else {
            themeName = jQueryElement.attr('placeholder');
          }              
          // all custom themes must begin with 'custom-'
          if (themeName.indexOf('custom-') !== 0) {
            themeName = 'custom-' + themeName;
          }
          return themeName;

          var themeNameRegex = new RegExp(/^([a-zA-Z0-9-]+)$/);
          if (themeNameRegex.test(element.value)) {
            // all custom themes must begin with 'custom-'
            return element.value.indexOf('custom-') === 0 ? element.value : 'custom-' + element.value;
          }

          // all custom themes must begin with 'custom-'
          return element.placeholder.indexOf('custom-') === 0 ? element.placeholder : 'custom-' + element.placeholder;
        };

        var determineColour = function(jQueryElement) {
          var hexRegex = new RegExp(/^#?(?:[0-9a-fA-F]{3}){1,2}$/);
          if (hexRegex.test(jQueryElement.val())) {
            // the # is optional in our form fields but mandatory for CSS
            return jQueryElement.val().indexOf('#') === 0 ? jQueryElement.val() : '#' + jQueryElement.val(); 
          }

          var nonHexRegex = new RegExp(/^((rgba?|hsla?)\((\d{1,3}%?,\s*){2}\d{1,3}%?(,\s*(0|1|0?\.\d+))?\)|(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen))$/);
          if (nonHexRegex.test(jQueryElement.val())) {
            return jQueryElement.val();
          }

          return jQueryElement.attr('placeholder');
        };

        var themeName = determineThemeName($('#ctg-theme-name'));
        var border = determineColour($('#ctg-border'));
        var titleBar = determineColour($('#ctg-title-bar'));
        var innerColour = determineColour($('#ctg-inner-colour'));
        var headerBorder = determineColour($('#ctg-header-border'));
        var headerBackground = determineColour($('#ctg-header-background'));
        var headerText = determineColour($('#ctg-header-text'));
        var calendarBorder = determineColour($('#ctg-calendar-border'));
        var calendarBackground = determineColour($('#ctg-calendar-background'));
        var unselectableBackground = determineColour($('#ctg-unselectable-background'));
        var unselectableColour = determineColour($('#ctg-unselectable-colour'));
        var dateBackground = determineColour($('#ctg-date-background'));
        var dateBackgroundActive = determineColour($('#ctg-date-background-active'));
        var dateBackgroundOtherActive = determineColour($('#ctg-date-background-other-active'));
        var dateBackgroundInRange = determineColour($('#ctg-date-background-in-range'));
        var dateColour = determineColour($('#ctg-date-colour'));
        var dateColourActive = determineColour($('#ctg-date-colour-active'));
        var dateColourOtherActive = determineColour($('#ctg-date-colour-other-active'));
        var dateColourInRange = determineColour($('#ctg-date-colour-in-range'));

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

        $('#ctg-code')[0].innerHTML = ctgMarkup;

        // refresh highlight.js syntax highlighting
        $('#ctg-code').attr({
          'class':            '',
          'data-highlighted': ''
        });
        hljs.highlightAll();

        // update live preview
        $('#agjCalendar').css('borderColor', border);

        $('#agjCalendar-header').css({
          'borderBottomColor': border,
          'backgroundColor': titleBar
        });

        $('#agjCalendar-body').css({
          'backgroundColor': innerColour,
          'borderColor': innerColour
        });

        $('#agjCalendar-dropdown').css('borderColor', headerBorder);

        $('div.agjCalendar-days').css({
          'backgroundColor': headerBackground,
          'borderColor': headerBorder,
          'color': headerText
        });

        $('div.agjCalendar-month').css({
          'backgroundColor': headerBackground,
          'borderColor': headerBorder
        });

        $('div.agjCalendar-week').css({
          'backgroundColor': calendarBackground,
          'borderColor': calendarBorder
        });

        $('div.agjCalendar-week div').css({
          'borderLeftColor': calendarBorder,
          'backgroundColor': unselectableBackground,
          'color': unselectableColour
        });

        $('div.agjCalendar-week div.agjCalendar-blank').css('backgroundColor', calendarBackground);

        $('div.agjCalendar-week a').css({
          'backgroundColor': dateBackground,
          'color': dateColour
        });

        $('div.agjCalendar-active a').css({
          'backgroundColor': dateBackgroundActive,
          'color': dateColourActive
        });

        $('div.agjCalendar-other-active a').css({
          'backgroundColor': dateBackgroundOtherActive,
          'color': dateColourOtherActive
        });

        $('div.agjCalendar-in-range a').css({
          'backgroundColor': dateBackgroundInRange,
          'color': dateColourInRange
        });
      };
      fillCtg();

      // show/hide the live preview
      $(window).on('scroll', function() {
        if ($('#agjCalendar').is(':visible') && !$('#agjCalendar').hasClass('in-motion')) {
          var ctgTop = $('#custom-theme-generator').offset().top;
          var animationSpeed = 250;
          if (ctgTop <= $(window).scrollTop() + $(window).height()) {
            // slide up
            $('#agjCalendar').stop().animate({
              'bottom': '10px'
            }, animationSpeed, function() {
              $('#agjCalendar').removeClass('in-motion');
            }).addClass('in-motion');
          } else {
            // slide down
            $('#agjCalendar').stop().animate({
              'bottom': '-233px'
            }, animationSpeed, function() {
              $('#agjCalendar').removeClass('in-motion');
            }).addClass('in-motion');
          }
        }
      });

      // bind the tool's fields
      $('#ctg form.interactive > p input[type=text]').on('blur', fillCtg).on('change', fillCtg);
      $('#ctg form.interactive > p input[type=checkbox]').on('change', fillCtg);
      $('#ctg form.interactive > p select').on('blur', fillCtg).on('change', fillCtg);
      $('#ctg form.interactive > p input[type=submit]').on('click', fillCtg);

      // unhide the Custom Theme Generator
      ctgElement.style.display = 'block';
    }
  })(jQuery);
</script>

<style>@media (max-width: 1200px) { #agjCalendar { display:none!important } }</style>
