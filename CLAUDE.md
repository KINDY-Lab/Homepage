# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KINDY Lab website for CUHK Shenzhen — a Jekyll static site deployed on GitHub Pages. The site showcases a developmental psychology / early childhood education research lab, including its flagship product ChildMind AI Education (童心智教).

**Live URL:** https://kindy-lab.github.io/Homepage/
**Repo:** github.com:KINDY-Lab/Homepage.git

## Build & Development Commands

No local Ruby/Jekyll environment. All builds happen via GitHub Pages CI — push to `main` triggers deployment.

No tests, no linter.

## Architecture

**Jekyll site** with a single-page homepage (`index.html`) plus three sub-pages (`publications.html`, `team.html`, `projects/childmind-ai.html`).

### Layouts (`_layouts/`)
- `default.html` — base HTML shell: meta tags, font loading (`local()` @font-face + Google Fonts CDN fallback), navbar, footer, JS
- `page.html` — extends default; for sub-pages (publications, team)
- `project.html` — extends default; for project detail pages (childmind-ai)

### Includes (`_includes/`)
- `navbar.html` — top navigation bar with language toggle
- `footer.html` — site footer
- `pub-card.html` — reusable publication card component
- `team-card.html` — reusable team member card component

### Data-Driven Content (`_data/`)
All content is managed through YAML files — non-developers can update the site by editing these:

| File | Structure | Purpose |
|---|---|---|
| `publications.yml` | plain sequence | Research papers (title, authors, venue, year, badges, DOI, PDF) |

**DOI/PDF link pattern:** `publications.yml` stores bare DOI identifiers (e.g., `10.1037/edu0000851`). The template `_includes/pub-card.html` prepends `https://doi.org/` to form the link. PDF fields are full URLs. Both use `{% if pub.field %}` to hide buttons when empty.
| `team.yml` | mapping | PI bio/education, PhD/MA students, collaborators |
| `news.yml` | plain sequence | News items with dates, categories, featured flag |
| `projects.yml` | plain sequence | Project cards with image paths, descriptions, tags |
| `courses.yml` | mapping with `items:` key + `director_*` keys | Teaching courses with evaluations |
| `awards.yml` | mapping with `items:` key + `funders:` key | Awards + funder logos |
| `i18n/en.yml` | mapping | All English UI strings |
| `i18n/zh.yml` | mapping | All Chinese UI strings |

**YAML structure pitfall:** Files that mix a list of items with extra metadata keys (like `funders` or `director_*`) must use a top-level mapping — wrap the list under an `items:` key. Plain list-only files (`publications`, `news`, `projects`) use a bare sequence at top level. Iterating in templates: `site.data.awards.items` and `site.data.courses.items` (not `site.data.awards` directly).

### Homepage Section Order (`index.html`)
1. `#hero` — full viewport hero with stats bar
2. `#about` — lab overview with PI card
3. `#research` — four pillars grid (dark purple background)
4. `#projects` — featured project cards
5. `#publications` — filterable publication list
6. `#impact` — animated counter stats bar
7. `#awards` — award cards + funder logos
8. `#charity` — social responsibility photo wall (dual-row infinite scroll + lightbox)
9. `#team` — PI row + student grids + collaborators
10. `#news` — image carousel + news list
11. `#media` — scrolling partner logos + journal names marquee
12. `#teaching` — course cards + director note (dark purple background)
13. `#join` — position cards with CTAs (green background)
14. `#contact` — Formspree form + info (dark purple background)

### Bilingual System (EN/ZH)
- Every visible text element has `data-en` and `data-zh` HTML attributes
- `assets/js/main.js` `setLang()` function swaps all text simultaneously
- Language preference persisted in `localStorage` under key `kindy-lang`
- Auto-detects browser language (`zh-*` → Chinese, else English)
- Chinese mode applies `letter-spacing: 0.05em` and `line-height: 1.9` body-wide
- **Exception:** Publication titles always display in English regardless of language mode (`data-zh` is set to the English title)

### JavaScript Features (`assets/js/main.js`)
Single IIFE with these features:
- **Language toggle** — `setLang(lang)` swaps `[data-en]`/`[data-zh]` textContent, updates toggle button, adjusts typography
- **Navbar scroll effect** — adds `.scrolled` class with backdrop blur when `scrollY > 60`
- **Mobile menu** — hamburger toggles `.active` on overlay + body scroll lock
- **Scroll reveal** — `IntersectionObserver` adds `.visible` to `.reveal` elements (threshold 0.1)
- **Impact counter** — eased counting animation (1800ms) triggered when `#impact` enters viewport
- **Publication tabs** — client-side filter by All / 2024–2025 / RCT Studies / Child Development using `data-category` and `data-year`
- **PI name highlighting** — auto-bolds `Huang, R.*` in `.pub-authors`
- **News carousel** — auto-advancing (4s interval), prev/next buttons, dot indicators
- **Charity photo lightbox** — click-to-enlarge with overlay, close button, background click dismiss
- **Smooth scrolling** — anchor links with 72px navbar offset

### Design System (`assets/css/main.css`)
- **Color palette:** CUHK Shenzhen Deep Purple (`#1E0A3C` to `#7B4BB8`) + Gold (`#D4A843`)
- **Typography:** Cormorant Garamond (display/serif) + DM Sans (body/sans-serif)
- All colors defined as CSS variables in `:root` — reference these, never hardcode hex values
- **Icons:** Pillar, award, About card, Join card, and course icons use inline SVG with `#D4A843` stroke color (not emoji)
- **Responsive breakpoints:** `1024px` (tablet) and `768px` (mobile, hamburger menu)
- **Animation keyframes:**
  - `fadeUp` — hero content entrance animation
  - `charityScrollLeft` / `charityScrollRight` — dual-row infinite photo wall
  - `marqueeScroll` / `marqueeScrollReverse` — partner logos (R→L) and journal names (L→R) bidirectional scrolling

### Infinite Scroll Pattern
Used for charity photo wall and partner logos. Requires **duplicating** the image/element set in HTML so the CSS `translateX(-50%)` animation loops seamlessly. Structure:
```html
<div class="marquee-container" style="overflow:hidden">
  <div class="track" style="display:flex; width:max-content; animation:marqueeScroll Xs linear infinite">
    <!-- items -->
    <!-- items duplicated for seamless loop -->
  </div>
</div>
```

### Images (`assets/images/`)
Organized by section: `logo/`, `team/`, `events/`, `charity/`, `lab/`, `childmind-ai/`, `courses/`. Original source files live in `Assets/` (not tracked via Jekyll build). All images use `loading="lazy"` except hero.

### CDN Integration (Tencent Cloud COS)
- `site.cdn` in `_config.yml` points to COS bucket domain: `https://kindylab-1421635372.cos.ap-guangzhou.myqcloud.com`
- Preload links in `default.html` use CDN paths directly
- Runtime JS in `default.html` rewrites all `<img>` src from `/Homepage/assets/images/...` to CDN URL
- Non-image assets (CSS, JS) still served from GitHub Pages
- GitHub Actions workflow (`.github/workflows/deploy.yml`) syncs `assets/images/` to COS on every push to `main`
- COS credentials stored in GitHub repo Secrets: `COS_SECRET_ID`, `COS_SECRET_KEY`, `COS_BUCKET`
- `TencentCloud/cos-action@v1` parameter names: `cos_bucket` / `cos_region` (not `bucket` / `region`)
- **Videos** are hosted directly on COS (not synced by Actions) — use full COS URL in `<video src>` and ensure file has public-read ACL

## Key Constraints

- **China network compatibility:** No Google Analytics, no YouTube embeds, no Cloudflare JS. Images served via Tencent Cloud COS. Note: `default.html` currently loads Google Fonts CDN — should be replaced with self-hosted WOFF2 files for production China access.
- **No local Ruby/Jekyll environment.** Do not attempt `bundle` or `jekyll` commands. Rely on GitHub Pages CI for build verification — push to `main` branch triggers automatic deployment.
- **No frameworks:** Vanilla HTML/CSS/JS + Jekyll only. No React, Vue, or SPAs.
- **GitHub Pages compatible plugins only:** `jekyll-seo-tag`, `jekyll-sitemap`
- **Contact form:** Uses Formspree (no backend needed)
- **Single CSS/JS:** All styles in `assets/css/main.css`, all scripts in `assets/js/main.js` — no code splitting
