# Adding publications and projects

The site is built from the repository root. Preview content locally before committing; publishing is a separate step through the production branch.

## One file per entry

- Project: copy `docs/templates/project.md` to `_projects/your_project_slug.md`.
- Publication: copy `docs/templates/publication.md` to `_publications/your_paper_slug.md`, creating that directory if needed.
- Replace all placeholder text, dates, asset paths, and URLs before using an entry. Commented fields are optional. Do not create a sample entry on the actual homepage.
- Add images under `images/` or the project's existing asset directory. Use `teaser` for the image/poster; add `teaser_video` only for a video preview.
- Both collections use the same `research-card.html` component, media component, and link badges. No homepage HTML editing is needed when adding an entry.

## Field conventions

| Field | Purpose |
| --- | --- |
| `title` | Card title |
| `date` | Newest-first ordering |
| `show_on_homepage` | `false` hides the card while retaining its page and files; omitted means shown |
| `teaser` | Image or video poster |
| `teaser_video` | Optional MP4 preview |
| `teaser_width`, `teaser_height` | Original media pixel dimensions; reserve the correct space before loading. For video entries, use MP4 dimensions rather than poster dimensions |
| `authors` | Authors for a publication; contribution/role for a project. Supports Markdown |
| `venue` | Publication venue or project institution/context |
| `description` | Concise homepage overview; Markdown supported |
| `external_url` | Optional destination for card title/teaser; otherwise links to the local detail page |
| `website`, `paper`, `code` | Optional publication buttons: Website, Paper, Code. Omit outdated or unavailable destinations; SENTINEL currently uses Paper and Code only |
| `arxiv`, `pdf`, `report`, `slides`, `video` | Additional optional resource types, primarily for project entries; absent fields produce no empty buttons |
| `award` | Optional distinction |

Use one or two sentences for the overview; aim for roughly 35–50 English words as guidance, not a forced cutoff. Include only claims supported by the work. Keep longer methodology and results in the detail page. Preview to check wrapping: word count alone does not determine card height.

## Display and review

Top-level project files appear on the homepage; nested lab/phase pages remain accessible through their parent project. A hidden card is not a private page: its direct URL remains accessible.

Publications now contains ManiGuard and SENTINEL. Keep all papers in one list; no Selected/All filter is needed yet. Bold Yiyan Peng in the author list, preserve full author order, and use contribution symbols only when confirmed by the latest paper. Current legend: `*` equal contribution; `†` project lead. Verify the PDF if project-site or arXiv abstract-page author metadata differs. Research Interests now uses the user-approved focus on robot foundation models, world models for data-efficient learning, and adaptive long-horizon manipulation. Keep project-history explanations in project entries or application materials rather than inserting them into this statement.

The publication template links directly to its project website and redirects its generated local URL there, avoiding a redundant detail page. If a local publication detail page is needed later, remove `redirect_to`, set `layout: default`, and add its body.

Both Publications and Projects use identical layout rules: a fluid 36% desktop media column capped at 380px, original image/video proportions without cropping, and vertical centering beside the text. Cards have natural heights; short entries are not padded to match the longest. On mobile, media fills the available width above the text. Enter accurate `teaser_width` and `teaser_height` when adding or replacing an asset to prevent visible layout shifts during lazy loading.

After saving an entry, review `http://localhost:4020/`, the detail page/resource links, and a narrow-screen preview. Publishing is a separate step after review; saving a local file does not update the live website.
