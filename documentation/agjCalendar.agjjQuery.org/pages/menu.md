---
layout:    layout
title:     agjCalendar&#58; Menu
permalink: /menu/
---

# Menu

<ul>
  {% assign siteTitleWithSemicolon = site.title | append: '&#58; ' %}
  {% assign pagesSorted = site.pages | sort: 'nav' %}
  {% for page in pagesSorted %}
    {% if page.nav %}
      <li>
        <a href="{{ page.url | prepend: site.baseurl }}" title="{{ page.title | replace: siteTitleWithSemicolon, '' }}">{{ page.title | replace: siteTitleWithSemicolon, '' }}</a>
      </li>
    {% endif %}
  {% endfor %}
</ul>
