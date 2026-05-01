# PROJECT_CONTEXT.md

Comprehensive reference for the KINDY Lab website codebase. Read this when you need to understand file structure, module responsibilities, or implementation details.

---

## 1. File Tree

```
/
├── _config.yml              # Jekyll config: baseurl, CDN URL, plugins, exclude list
├── Gemfile                  # Ruby deps: github-pages gem, jekyll-seo-tag, jekyll-sitemap
├── index.html               # Homepage (single-page with 14 sections)
├── publications.html        # Publications sub-page (layout: page)
├── team.html                # Team sub-page (layout: page)
├── kindy-lab.html           # (unused / legacy)
├── CLAUDE.md                # CC guidance — must be in _config.yml exclude
├── PROJECT_CONTEXT.md       # This file — must be in _config.yml exclude
│
├── _layouts/
│   ├── default.html         # Base: HTML shell, meta, fonts, CDN JS, navbar, footer
│   ├── page.html            # Sub-pages: extends default, adds header + content
│   └── project.html         # Project detail: extends default, hero + back nav
│
├── _includes/
│   ├── navbar.html          # Logo, nav links (About/Research/…/Join Us), lang toggle, hamburger
│   ├── footer.html          # 3-column: brand, research links, lab info + social
│   ├── pub-card.html        # Publication card: year, title, authors, venue, badges, PDF/DOI/BIB
│   └── team-card.html       # Team card: avatar, name (i18n), role, research tags
│
├── _data/
│   ├── publications.yml     # Plain sequence of papers
│   ├── news.yml             # Plain sequence of news items
│   ├── team.yml             # Mapping: pi, phd_students, ma_students, collaborators
│   ├── projects.yml         # Plain sequence of project cards
│   ├── courses.yml          # Mapping with items: key + director_* keys
│   ├── awards.yml           # Mapping with items: key + funders: key
│   └── i18n/
│       ├── en.yml           # All English UI strings
│       └── zh.yml           # All Chinese UI strings
│
├── assets/
│   ├── css/main.css         # Single stylesheet (~2036 lines)
│   ├── js/main.js           # Single script (~294 lines)
│   ├── fonts/               # (empty — future self-hosted WOFF2)
│   └── images/              # Organized: charity/, childmind-ai/, courses/, events/,
│                            #   hero/, lab/, logo/, projects/, team/
│
├── projects/
│   └── childmind-ai.html    # ChildMind AI project detail page
│
├── Assets/                  # Original source images (not used by Jekyll build)
│
└── .github/workflows/
    └── deploy.yml           # GitHub Pages build + incremental COS image sync
```

---

## 2. Layouts

### `default.html`
Base HTML shell for all pages. Responsibilities:
- `<head>`: SEO meta (`jekyll-seo-tag`), font preloading, CSS link
- Font loading: `local()` @font-face with Google Fonts CDN fallback (should be replaced with self-hosted WOFF2 for China access)
- `<body>`: includes navbar, `{{ content }}`, footer, main.js
- CDN image rewrite: inline `<script>` replaces all `<img src="/Homepage/assets/images/...">` and `<video poster="...">` with `site.cdn` prefix at runtime
- Preload links use CDN paths directly

### `page.html`
Extends `default`. Adds a purple header section with section label (`page.label`) and title (`page.title`), then `{{ content }}`.

### `project.html`
Extends `default`. Adds project-specific hero with back-to-projects link, project title/subtitle, content, and bottom back link.

---

## 3. Includes

### `navbar.html`
- Logo: `CUHKSZ+HSS+KINDY_dark_logo.jpg`
- Nav links: About, Research, Projects, Publications, Team, News, Teaching, Join Us (smooth scroll anchors)
- Language toggle button: calls `setLang()`
- Mobile: hamburger icon toggles `.active` on overlay + body scroll lock

### `footer.html`
- 3-column grid: brand+description, research links, lab info
- Social links: Google Scholar, Email
- Copyright with i18n text from `site.data.i18n`

### `pub-card.html`
Receives `pub` variable from loop. Key logic:
- **Title**: `<div data-en="{{ pub.title_en }}" data-zh="{{ pub.title_zh }}">`
- **Authors**: Liquid replace of `pub.author_highlight` → `<strong>` for PI name bolding
- **Badges**: conditional rendering — Q1, Q2, RCT, IF tags each get specific CSS class; unknown badges get default `q1` class
- **Actions**: PDF/DOI buttons hidden when field is empty (`{% if pub.pdf %}`); DOI template prepends `https://doi.org/` to bare identifier; BIB button always shown (currently links to `#`)

### `team-card.html`
Receives `member` variable. Shows avatar (or initial placeholder), name with i18n, role, research tags.

---

## 4. Data Files

### `publications.yml` (plain sequence)
```yaml
- id: "huang2024rct"         # unique slug
  year: 2024                  # display year (for filter)
  title_en: "..."             # English title
  title_zh: "..."             # Chinese title (for data-zh attribute)
  authors: "Huang, R.*, ..."  # formatted author string
  author_highlight: "Huang, R."  # substring matched for bold
  venue: "Journal of ..."     # full venue name
  venue_short: "J Educ Psychol"  # abbreviated venue
  year_pub: 2024              # publication year
  category: [rct, intervention]  # filter tags
  badges: [Q1, RCT]           # display badges
  doi: "10.1037/edu0000851"   # bare DOI (template adds https://doi.org/)
  pdf: "https://..."          # full URL (or empty)
  featured: true              # optional flag
```

### `news.yml` (plain sequence)
```yaml
- date: "2026-05"             # YYYY-MM format, sorted by template
  category: "paper"           # paper / award / project / event / grant / talk / team / milestone
  title_en: "..."
  title_zh: "..."
  desc_en: "..."              # optional
  desc_zh: "..."              # optional
  badge: "Paper"              # display badge text
  featured: true              # optional, shows in carousel
  image: "assets/images/..."  # optional, for featured news
```
**Must iterate with** `site.data.news | sort: "date" | reverse` — do not iterate `site.data.news` directly.

### `team.yml` (mapping)
Top-level keys: `pi`, `phd_students`, `ma_students`, `collaborators`. Each member has `name_en`, `name_zh`, `role_en`, `role_zh`, `photo`, `research` tags, etc.

### `courses.yml` (mapping with `items:` key)
```yaml
director_name_en: "Dr. ..."
director_note_en: "..."
items:
  - code: "PSY2120"
    ...
```
Iterate as `site.data.courses.items` (not `site.data.courses`).

### `awards.yml` (mapping with `items:` + `funders:` keys)
```yaml
funders:
  - name: "NSFC"
    logo: "assets/images/logo/nsfc.webp"
items:
  - title_en: "..."
    ...
```
Iterate as `site.data.awards.items`.

### `projects.yml` (plain sequence)
Project cards with `title_en`/`title_zh`, `desc_en`/`desc_zh`, `image`, `tags`, `link`.

### `i18n/en.yml` & `i18n/zh.yml` (mappings)
All UI strings organized by section: `nav`, `hero`, `about`, `research`, `projects`, `publications`, `impact`, `awards`, `team`, `news`, `media`, `teaching`, `join`, `contact`, `footer`.

**YAML structure pitfall:** Files mixing a list of items with extra metadata keys (`funders`, `director_*`) use a top-level mapping with `items:` key. Plain list files (`publications`, `news`, `projects`) use bare sequences at top level.

---

## 5. Homepage Section Order (`index.html`)

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

---

## 6. JavaScript (`assets/js/main.js`)

Single IIFE (~294 lines) with these features:

| Feature | Description |
|---|---|
| **Language toggle** | `setLang(lang)` swaps `[data-en]`/`[data-zh]` textContent, updates toggle button, adjusts typography |
| **Navbar scroll** | Adds `.scrolled` class with backdrop blur when `scrollY > 60` |
| **Mobile menu** | Hamburger toggles `.active` on overlay + body scroll lock |
| **Scroll reveal** | `IntersectionObserver` adds `.visible` to `.reveal` elements (threshold 0.1) |
| **Impact counter** | Eased counting animation (1800ms) triggered when `#impact` enters viewport |
| **Publication tabs** | Client-side filter by All / 2024–2025 / RCT Studies / Child Development using `data-category` and `data-year` |
| **PI name highlighting** | Auto-bolds `Huang, R.*` in `.pub-authors` |
| **News carousel** | Auto-advancing (4s interval), prev/next buttons, dot indicators |
| **Charity lightbox** | Click-to-enlarge with overlay, close button, background click dismiss |
| **Smooth scrolling** | Anchor links with 72px navbar offset |

---

## 7. CSS Design System (`assets/css/main.css`)

### Color Palette (CSS variables in `:root`)
- CUHK Shenzhen Deep Purple: `#1E0A3C` to `#7B4BB8`
- Gold accent: `#D4A843`
- **Always reference CSS variables, never hardcode hex values**

### Typography
- Display/serif: Cormorant Garamond
- Body/sans-serif: DM Sans

### Icons
- Pillar, award, About card, Join card, course icons use **inline SVG** with `#D4A843` stroke color (not emoji)

### Responsive Breakpoints
- `1024px` — tablet
- `768px` — mobile (hamburger menu)

### Animation Keyframes
- `fadeUp` — hero content entrance
- `charityScrollLeft` / `charityScrollRight` — dual-row infinite photo wall
- `marqueeScroll` / `marqueeScrollReverse` — partner logos (R→L) and journal names (L→R)

### Button Classes
- `.btn-primary` — gold solid
- `.btn-secondary` — transparent, white border (only visible on dark backgrounds)
- `.btn-website` — purple solid
- `.join-btn-primary` / `.join-btn-secondary` — join section variants

---

## 8. CDN & Deployment Pipeline

### CDN Config
- `site.cdn` in `_config.yml`: `https://kindylab-1421635372.cos.ap-guangzhou.myqcloud.com`
- `default.html` preload links use CDN paths directly
- Runtime JS rewrites `<img src>` and `<video poster>` from `/Homepage/assets/images/...` to CDN URL
- Non-image assets (CSS, JS) served from GitHub Pages

### GitHub Actions (`.github/workflows/deploy.yml`)
- Triggers on push to `main`
- `actions/checkout` with `fetch-depth: 2` so `HEAD~1` is available
- **Git-diff incremental sync**: compares `HEAD~1` vs `HEAD` for changed files in `assets/images/`
- Copies only changed images to temp dir, uploads via `TencentCloud/cos-action@v1`
- Falls back to full sync if `HEAD~1` doesn't exist (first commit)
- COS credentials in GitHub Secrets: `COS_SECRET_ID`, `COS_SECRET_KEY`, `COS_BUCKET`
- After COS sync, deploys Jekyll build to GitHub Pages via `actions/deploy-pages@v4`

### Videos
- Hosted directly on COS (not synced by Actions)
- Use full COS URL in `<video src>`
- Ensure file has public-read ACL

---

## 9. Bilingual System

- Every visible text element has `data-en` and `data-zh` HTML attributes
- `setLang(lang)` in main.js swaps all `[data-en]`/`[data-zh]` textContent simultaneously
- Language preference persisted in `localStorage` under key `kindy-lang`
- Auto-detects browser language: `zh-*` → Chinese, else English
- Chinese mode applies `letter-spacing: 0.05em` and `line-height: 1.9` body-wide
- **Publication titles always display English** regardless of language mode (`data-zh` set to English title)

---

## 10. Infinite Scroll Pattern

Used for charity photo wall and partner logos. Requires **duplicating** the image/element set in HTML so CSS `translateX(-50%)` animation loops seamlessly.

```html
<div class="marquee-container" style="overflow:hidden">
  <div class="track" style="display:flex; width:max-content; animation:marqueeScroll Xs linear infinite">
    <!-- items -->
    <!-- items duplicated for seamless loop -->
  </div>
</div>
```

Animation directions:
- `marqueeScroll` — R→L (partner logos)
- `marqueeScrollReverse` — L→R (journal names)
- `charityScrollLeft` / `charityScrollRight` — dual-row charity photos

---

## 11. Images (`assets/images/`)

Organized by section: `charity/`, `childmind-ai/`, `courses/`, `events/`, `hero/`, `lab/`, `logo/`, `projects/`, `team/`.

- All images use `loading="lazy"` except hero
- Original source files live in `Assets/` (not tracked via Jekyll build)
