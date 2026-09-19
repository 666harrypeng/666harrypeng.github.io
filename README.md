# Yiyan Peng's Homepage

Personal academic website built with Jekyll, hosted at
[666harrypeng.github.io](https://666harrypeng.github.io/).

## Local preview

With Ruby, Bundler, and the dependencies in `Gemfile` available:

```sh
bundle exec jekyll serve --host 127.0.0.1 --port 4020
```

Open `http://localhost:4020/`. Restart the server after editing `_config.yml`.
To build production output without starting a server:

```sh
JEKYLL_ENV=production bundle exec jekyll build
```

Generated `_site/` files and local caches are not committed.

## Editing content

- `_pages/about.md`: introduction, research interests, and homepage sections.
- `_data/`: news, education, navigation, and notes.
- `_publications/`: one Markdown file per paper.
- `_projects/`: projects, detail pages, and associated media.
- `_includes/`, `_layouts/`, `_sass/`, `assets/`: shared presentation.

See [the content guide](docs/adding-site-content.md) and
[entry templates](docs/templates/) for field conventions. Documentation and
templates are excluded from generated web pages.

## Publishing

The repository's production branch is `master`. Review changes on a development
branch and verify the build and browser preview before merging. Keep legacy URL
redirects when renaming or combining pages. Confirm the GitHub Pages publishing
source before making deployment changes; local previews do not publish the site.

## Attribution

The site builds on [Academic Pages](https://github.com/academicpages/academicpages.github.io)
and [AcadHomepage](https://github.com/RayeRen/acad-homepage), with custom layouts,
content, and media. Original license notices are retained in `LICENSE` and source files.
