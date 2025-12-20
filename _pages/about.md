---
permalink: /
title: "About Me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

👋 Hi there! I am Yiyan (Harry) Peng, and I am a first-year Master of Science in Computer Engineering student at the [Northwestern University](https://www.mccormick.northwestern.edu/electrical-computer/). 

Previously, I finished my undergraduate study at the [Hong Kong University of Science and Technology](https://hkust.edu.hk/) (HKUST) from the [Department of Electronic and Computer Engineering (ECE)](https://ece.hkust.edu.hk/). I was fortunate to be advised by Prof. [Jun Zhang](https://ece.hkust.edu.hk/eejzhang) and Dr. [Albert Kai-Sun Wong](https://ece.hkust.edu.hk/eealbert).

My research interests include the intersection of **AI and robotics** (particularly **embodied AI** in the topics of **vision-language-action models, robotic perception and manipulation**, and also the applications of AI in **healthcare**). I am eager to learn more and take on challenging projects and research opportunities, with passion for making robots' intelligence more tangible and accessible to people by merging AI and robotics to genuinely benefit our society.

## Projects

{% for project in site.projects reversed %}
  {% if project.teaser %}
  <div class="project-container">
    <div class="project-image">
      <a href="{{ project.url | relative_url }}">
        <img src="{{ project.teaser | relative_url }}" alt="{{ project.title }}">
      </a>
    </div>
    <div class="project-details">
      <div class="project-title">
           <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
      </div>
      <div class="project-authors">
        {{ project.authors }}
      </div>
      <div class="project-venue">
        {{ project.venue }}
      </div>
      {% if project.award %}
      <div class="project-award">
        🏆 {{ project.award }}
      </div>
      {% endif %}
      <div class="project-links">
        {% if project.report %}
          [<a href="{{ project.report }}">Technical Report</a>]
        {% endif %}
        {% if project.slides %}
          [<a href="{{ project.slides }}">Slides</a>]
        {% endif %}
        {% if project.code %}
          [<a href="{{ project.code }}"><i class="fab fa-github"></i> Code</a>]
        {% endif %}
      </div>
      <div class="project-description">
        {{ project.description | markdownify }}
      </div>
    </div>
  </div>
  {% endif %}
{% endfor %}

## Education

- M.S. in Computer Engineering, Northwestern University, Sep 2025 - May 2027 (Expected)
- B.Eng. in Electronic Engineering, HKUST, Sep 2021 - May 2025
- Non-Degree Exchange in Electrical and Computer Engineering, Cornell University, Jan 2024 - May 2024

## Others

- [Posts](https://666harrypeng.github.io/posts/) : I will post some of my study notes here occasionally, for different topics.
