---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<span class='anchor' id='about-me'></span>

# About

👋 Hi there! I am Yiyan (Harry) Peng, an M.S. student in Computer Engineering at
[Northwestern University](https://www.mccormick.northwestern.edu/electrical-computer/),
where I am advised by Prof. [Qi Zhu](https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/zhu-qi.html)
in the [IDEAS Lab](https://nu-ideas-lab.github.io/). I also collaborate with Professors
[Ruohan Zhang](https://ruohanzhang.com/), [Manling Li](https://limanling.github.io/),
[Huajie Shao](https://huajieshao.github.io/), and [Minshuo Chen](https://minshuochen.github.io/).

Previously, I received my B.Eng. in Electronic Engineering from the
[Hong Kong University of Science and Technology](https://hkust.edu.hk/) (HKUST),
where I was advised by Prof. [Jun Zhang](https://ece.hkust.edu.hk/eejzhang)
and Dr. [Albert Kai-Sun Wong](https://seng.hkust.edu.hk/about/people/faculty/kai-sun-albert-wong).

<span class='anchor' id='research-interests'></span>

# 🔬 Research Interests

My research interests center on **robot learning and embodied AI**, with a focus on
**representations and learning mechanisms for robot foundation models**. I am
particularly interested in:

- **World models for data-efficient learning** — using predictive models to support policy learning and adaptation.
- **Adaptive, long-horizon manipulation** — connecting memory, reasoning, and feedback-driven action.

My goal is to build robots that generalize to new tasks and environments while
remaining reliable, controllable, and safe.

<span class='anchor' id='news'></span>

# 📢 News

<!-- Edit entries in _data/news.yml, not here. -->

{% for n in site.data.news %}
- *{{ n.date }}*: &nbsp;{{ n.text | markdownify | remove: '<p>' | remove: '</p>' | strip }}
{%- endfor %}

<span class='anchor' id='publications'></span>

# 📚 Publications

<!-- One file per paper in _publications/. See docs/adding-site-content.md. -->

{% assign pubs = site.publications | where_exp: 'p', 'p.show_on_homepage != false' | sort: 'date' | reverse %}
{% if pubs.size > 0 %}
  <p class="publication-note"><sup>&#42;</sup> Equal contribution. <sup>†</sup> Project lead.</p>
  <div class="research-list">
  {% for p in pubs %}{% include research-card.html item=p %}{% endfor %}
  </div>
{% else %}
*Coming soon.*
{% endif %}

<span class='anchor' id='projects'></span>

# 💻 Projects

{%- comment -%}
  Only top-level projects appear here. site.projects also contains the nested
  sub-pages (labs, phases); those are listed on their parent's detail page.
  Filter on path depth rather than on `teaser`, so a future project without a
  teaser still shows up.
{%- endcomment -%}

{% assign projects_sorted = site.projects | sort: 'date' | reverse %}
<div class="project-list">
{% for p in projects_sorted %}
  {%- assign rel = p.path | remove_first: '_projects/' -%}
  {%- unless rel contains '/' -%}
    {% unless p.show_on_homepage == false %}
    {% include research-card.html item=p %}
    {% endunless %}
  {%- endunless -%}
{% endfor %}
</div>

<span class='anchor' id='education'></span>

# 🎓 Education

{% include education.html %}

<span class='anchor' id='honors'></span>

# 🏆 Honors and Awards

- **ECE Best FYP/T Award, 2nd Runner-Up**, HKUST
- **First Class Honors**, HKUST
- **Dean's List**, HKUST
- **University’s Scholarship Scheme for Continuing Undergraduate Students**, HKUST
