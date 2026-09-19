---
title: "Notes"
permalink: /posts/
author_profile: true
---

<!-- No `layout:` key on purpose: _config.yml's `defaults` already assigns
     `layout: default` to every page. AcadHomepage has no `single` layout, and
     Jekyll ignores a missing layout silently - the page then renders with no
     HTML shell at all. -->

# 📝 Notes

Study notes and summaries on topics I find interesting. Updated from time to time.

<!-- Entries live in _data/notes.yml -->
<ul class="notes-list">
{%- for n in site.data.notes %}
  <li>
    <a class="notes-list__title" href="{{ n.url }}">{{ n.title }}</a>
    {%- if n.blurb %}<span class="notes-list__blurb">{{ n.blurb }}</span>{% endif %}
  </li>
{%- endfor %}
</ul>

<p class="notes-list__back"><a href="{{ '/' | relative_url }}">← Back to homepage</a></p>
