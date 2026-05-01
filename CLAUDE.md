# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KINDY Lab website for CUHK Shenzhen — Jekyll static site deployed on GitHub Pages. Showcases a developmental psychology / early childhood education research lab + flagship product ChildMind AI Education (童心智教).

**Live URL:** https://kindy-lab.github.io/Homepage/

## Build & Deploy

No local Ruby/Jekyll environment. Push to `main` triggers GitHub Pages CI — that is the only build path. No tests, no linter.

## Key Constraints

- **China network:** No Google Analytics, YouTube embeds, or Cloudflare JS. Images via Tencent Cloud COS.
- **No local Ruby/Jekyll.** Never run `bundle` or `jekyll` commands.
- **No frameworks.** Vanilla HTML/CSS/JS + Jekyll only. No React, Vue, SPAs.
- **GitHub Pages plugins only:** `jekyll-seo-tag`, `jekyll-sitemap`.
- **`_config.yml` `exclude:`** must include `CLAUDE.md` and `PROJECT_CONTEXT.md` — Jekyll processes `.md` by default.
- **Single CSS/JS:** `assets/css/main.css` and `assets/js/main.js` — no code splitting.
- **Contact form:** Formspree (no backend).

## Data Files (`_data/`)

- **Plain sequence** files (`publications.yml`, `news.yml`, `projects.yml`): bare YAML list at top level.
- **Mapping with `items:` key** (`courses.yml`, `awards.yml`): wrap list under `items:`, iterate as `site.data.courses.items` / `site.data.awards.items` — not `site.data.courses` directly.
- **`news.yml` ordering:** must iterate with `site.data.news | sort: "date" | reverse` — never iterate `site.data.news` directly.
- **DOI/PDF pattern:** `publications.yml` stores bare DOI identifiers. Template (`pub-card.html`) prepends `https://doi.org/`. PDF fields are full URLs. Empty fields auto-hide buttons via `{% if pub.field %}`.

## Bilingual System

- Every visible text needs `data-en` and `data-zh` HTML attributes.
- Publication titles **always display English** — set `data-zh` to the English title too.
- Language stored in `localStorage` key `kindy-lang`.

## CSS & UI

- Colors defined as CSS variables in `:root` — reference these, never hardcode hex.
- Icons use inline SVG with gold (`#D4A843`) stroke — no emoji.
- Button classes: `.btn-primary` (gold solid), `.btn-secondary` (transparent white border, dark bg only), `.btn-website` (purple solid), `.join-btn-primary` / `.join-btn-secondary` (join section).
