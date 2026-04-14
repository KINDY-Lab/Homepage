
**Version:** 1.0 | **Date:** 2025 | **Author:** For Claude Code Development  
**Reference Site:** [safeai-lab.github.io](https://safeai-lab.github.io/) | **Hosting:** GitHub Pages

---

## 0. Quick Context

**Lab:** KINDY Lab (Kindergarten and Infant Development Research Lab)  
**PI:** Dr. Runke Huang (黄润珂) — Assistant Professor, School of Humanities and Social Science, CUHK Shenzhen  
**Mission:** Advancing the science of early childhood education through developmental psychology, rigorous intervention research, and AI — with direct impact on kindergartens across China.

**Flagship Product:** ChildMind AI Education (童心智教) — China's **first deployed LLM-based instructional quality assessment system** for early childhood education, currently scaling to 65 kindergartens and 5,000+ children across all 9 districts of Shenzhen.

---

## 1. Project Goals & Success Criteria

### Primary Goals

1. **Attract top PhD/postdoc talent** — the #1 recruitment tool for the lab
2. **Establish prestige and credibility** internationally and domestically
3. **Communicate research impact** to funders, collaborators, and the public
4. **Showcase ChildMind AI** as a flagship achievement

### Success Criteria

- Loads in < 2s on mainland China networks (no blocked CDNs)
- Fully bilingual EN/ZH with a single toggle — no separate URLs
- Mobile-first responsive design
- SEO optimized (Google Scholar, Baidu)
- Maintainable by a non-developer (content via YAML/JSON data files)
- GitHub Pages deployable with zero server cost

---

## 2. Technical Architecture

### 2.1 Stack

```
Framework:      Vanilla HTML + CSS + JS (no build step required)
                OR Jekyll (recommended — best GitHub Pages support)
Hosting:        GitHub Pages (free, custom domain support)
Domain:         kindylab.github.io → optionally kindylab.cuhk.edu.cn (future)
Fonts:          Google Fonts — with fallback (self-host for CN speed)
Icons:          Lucide Icons (CDN) or inline SVG
Animations:     CSS transitions + IntersectionObserver (no heavy libraries)
i18n:           Vanilla JS object-based i18n OR Jekyll with _data/i18n/
CN Performance: Avoid: Google Analytics, YouTube embeds, Cloudflare (blocked)
                Use instead: Plausible or simple counter; Bilibili embeds; jsDelivr CDN
```

### 2.2 Jekyll File Structure (Recommended)

```
kindy-lab/
├── _config.yml                     # Site config (title, base URL, lang)
├── index.html                      # Homepage
├── publications.html               # Full publications page
├── team.html                       # Full team page
├── projects/
│   ├── index.html                  # Projects overview
│   ├── childmind-ai.html           # ChildMind AI project page
│   ├── rct-shenzhen.html           # RCT project page
│   └── longitudinal-quality.html   # Longitudinal study page
├── news/
│   └── index.html                  # News archive
├── teaching.html
├── join.html
├── contact.html
│
├── _data/
│   ├── publications.yml            # All publications (structured)
│   ├── team.yml                    # All team members
│   ├── news.yml                    # News items
│   ├── projects.yml                # Project cards
│   ├── courses.yml                 # Teaching courses
│   ├── funding.yml                 # Grants & funding
│   └── i18n/
│       ├── en.yml                  # All English strings
│       └── zh.yml                  # All Chinese strings
│
├── _includes/
│   ├── navbar.html
│   ├── footer.html
│   ├── pub-card.html
│   └── team-card.html
│
├── _layouts/
│   ├── default.html
│   ├── page.html
│   └── project.html
│
└── assets/
    ├── css/
    │   ├── main.css
    │   ├── variables.css
    │   ├── components.css
    │   └── responsive.css
    ├── js/
    │   ├── main.js                 # Scroll reveal, counters, nav
    │   └── i18n.js                 # Language switching logic
    └── images/                     # (see Section 7 for full asset list)
```

### 2.3 Bilingual Implementation

```javascript
// Single HTML file with data-en / data-zh attributes on every text node
// Language state stored in localStorage
// Toggle button in navbar triggers class swap on <html lang="">

// Example:
<h1 data-en="Unlocking Every Child's Full Potential Through Science"
    data-zh="以科学之力，释放每个孩子的无限潜能"></h1>

// JS switches all elements simultaneously
function setLang(lang) {
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });
  document.documentElement.lang = lang;
  localStorage.setItem('kindy-lang', lang);
}
```

---

## 3. Design System

### 3.1 Color Palette

CUHK Shenzhen official brand colors: **Deep Purple + Gold**

```css
:root {
  /* Primary */
  --purple-900: #1E0A3C;    /* Darkest — hero backgrounds */
  --purple-800: #2D1460;    /* Dark sections */
  --purple-700: #3D1A8A;    /* Navigation scrolled state */
  --purple-600: #5C2D91;    /* CUHK-SZ official purple */
  --purple-500: #7B4BB8;    /* Accent elements */
  --purple-100: #EDE8F5;    /* Light backgrounds */

  /* Gold */
  --gold-500:   #D4A843;    /* Primary accent */
  --gold-400:   #E8C56A;    /* Hover states */
  --gold-300:   #F2D88A;    /* Light accents */
  --gold-100:   #FBF4DE;    /* Very light backgrounds */

  /* Neutrals */
  --white:      #FFFFFF;
  --cream:      #FAFAF7;    /* Page background */
  --cream-2:    #F3EDE4;    /* Card backgrounds */
  --gray-100:   #F5F5F5;
  --gray-400:   #9CA3AF;
  --gray-600:   #6B7280;
  --gray-900:   #111827;

  /* Semantic */
  --bg-dark:    var(--purple-900);
  --bg-medium:  var(--purple-800);
  --accent:     var(--gold-500);
  --accent-hover: var(--gold-400);
  --text-primary: var(--gray-900);
  --text-muted:   var(--gray-600);
  --border:     rgba(0,0,0,0.08);
}
```

### 3.2 Typography

```css
/* Display: Cormorant Garamond — academic, elegant */
/* Body: DM Sans — clean, modern, highly legible */

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

/* FALLBACK for CN: Self-host fonts via assets/fonts/ */

:root {
  --font-display: 'Cormorant Garamond', 'Noto Serif SC', Georgia, serif;
  --font-body:    'DM Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
```

**Chinese Typography Note:** When `lang=zh`, add letter-spacing: 0.05em to body text and use `line-height: 1.9` for better Chinese readability.

### 3.3 Spacing & Layout

```css
--section-pad:  100px 0;       /* Desktop section padding */
--section-pad-m: 60px 0;       /* Mobile */
--container:    1200px;         /* Max width */
--container-pad: 0 60px;       /* Side padding */
--container-pad-m: 0 24px;     /* Mobile */
--radius-sm:    8px;
--radius-md:    14px;
--radius-lg:    20px;
--radius-xl:    28px;
```

### 3.4 Component Tokens

```css
/* Buttons */
.btn-primary   { bg: gold-500, text: purple-900, border-radius: 8px, font-weight: 700 }
.btn-secondary { bg: transparent, border: 1px rgba(white,0.3), text: white }
.btn-outline   { bg: transparent, border: 1px purple-600, text: purple-600 }

/* Cards */
.card          { bg: white, border: 1px var(--border), border-radius: 14px }
.card-dark     { bg: rgba(white,0.05), border: 1px rgba(white,0.08) }

/* Tags/Badges */
.badge-q1      { bg: rgba(purple,0.1), text: purple-600, font-size: 11px }
.badge-gold    { bg: rgba(gold,0.12), text: gold-700 }
.badge-green   { bg: rgba(green,0.1), text: green-700 }  /* For "RCT", "New" */
```

---

## 4. Site Architecture — Page-by-Page Specification

### 4.1 Global Elements

#### Navbar (Fixed, transparent → solid on scroll)

```
Left:  [KINDY Logo Mark (K in purple square)] [KINDY Lab text] [CUHK-SZ sub-text]
Right: About | Research | Projects | Publications | Team | News | Teaching | Join Us (CTA btn)
       [EN | 中文] language toggle

Mobile: Hamburger menu, full-screen overlay
```

**Logo Mark Design:** Square with rounded corners, purple gradient background, white "K" letter in Cormorant Garamond serif.

#### Footer

```
Col 1: KINDY Lab logo + tagline + CUHK-SZ logo + address
Col 2: Research (links to sections)
Col 3: Lab (About, Team, News, Teaching)
Col 4: Connect (Join Us, Contact, Scholar, Twitter/X, WeChat QR)

Bottom bar: © 2025 KINDY Lab · CUHK Shenzhen · ICP备案号 (if needed)
```

---

### 4.2 Homepage (index.html)

The homepage contains ALL major sections as scrollable page (single-page with anchor navigation).

#### Section 1: HERO

```
Layout:     Full-screen (100vh), dark purple gradient
Left:       Content (55% width)
Right:      Hero media (45% width) — photo or looping GIF/video of lab/fieldwork

Content:
  - Badge pill: "KINDY Lab · CUHK Shenzhen"
  - H1: "Unlocking Every Child's Full Potential Through Science"
       ZH: "以科学之力，释放每个孩子的无限潜能"
  - Subline: "We study early childhood education quality, child development,
             and AI-powered assessment — building evidence for kindergartens
             that truly work."
  - CTA buttons: [Explore Our Research →] [Join the Lab]
  - Scroll indicator

Stats bar (bottom edge of hero, border-top):
  | 15+ Publications | ¥1.3M+ Funding | 100+ Kindergartens | 4,000+ Children |

Background:
  - Dark purple (#1E0A3C) base
  - Radial gradient overlay (purple glow right side)
  - Subtle dot grid pattern (rgba white, opacity 0.03)
```

**Hero Media (Right Panel) — REQUIRES ASSET:** Priority: Short looping GIF/video of kindergarten fieldwork or ChildMind AI system demo. Fallback: High-quality photo of Runke in lab/kindergarten setting.

#### Section 2: ABOUT

```
Layout:     Two-column (photo left, text right) on desktop
Left:       Lab photo (aspect 4:3) with floating badge card "2025 Young Researcher Award"
Right:
  - Section label: "About KINDY Lab"
  - H2: "Where Developmental Science Meets Real-World Impact"
  - Body text (2-3 paragraphs from Research Statement)
  - Pull quote (blockquote styled with gold left border):
    EN: "Every child deserves a high-quality early education. Our role is to build
         the science — and the technology — that makes that possible at scale."
    ZH: "每个孩子都应该享有高质量的早期教育。我们的使命，是构建让这一目标
         规模化实现的科学基础与技术工具。"
  - PI Card (inline): Avatar | Dr. Runke Huang | Asst Prof · CUHK-SZ |
    Badges: [PhD Oxford] [MEd HKU Distinction] [BEd BNU]
    Links: [Google Scholar] [Faculty Page]

Bottom: 3 CTA cards (Lab Director | Join Us | Collaborate)
```

#### Section 3: RESEARCH AREAS (4 Pillars)

```
Layout:     Dark purple section, 4-column grid of pillar cards
Header:     "Four Pillars of Early Childhood Science"

Pillar 1: 🏫 Kindergarten Quality Evaluation
  Icon: Custom SVG (classroom)
  EN desc: "Measuring and improving process quality in early childhood settings
           using validated observational tools and multi-level analysis."
  ZH desc: "运用经验证的观察工具与多层次分析方法，测量并改善早期教育环境中的
            过程质量。"
  Tags: [CLASS] [ECERS] [Observation] [HLM]

Pillar 2: 🧠 Child Development & Assessment
  Icon: Custom SVG (brain/child)
  EN desc: "Studying cognitive, social-emotional, and behavioral development
           in preschoolers using longitudinal and latent profile methods."
  Tags: [Self-Regulation] [Longitudinal] [Latent Profile] [Social-Emotional]

Pillar 3: ⚗️ Evidence-Based Interventions (RCT)
  Icon: Custom SVG (experiment/trial)
  EN desc: "Designing and rigorously evaluating professional development programs
           through randomized controlled trials in kindergartens."
  Tags: [RCT] [Professional Development] [Teacher Quality] [Policy]

Pillar 4: 🤖 AI in Early Education (ChildMind AI)
  Icon: Custom SVG (AI chip + child)
  EN desc: "Developing China's first LLM-based instructional quality assessment
           system — making scalable, expert-level evaluation accessible to all."
  ZH desc: "研发中国首个基于大语言模型的早期教育教学质量评估系统，让专家级
            评估触达更多幼儿园。"
  Tags: [LLM] [EdTech] [NLP] [ChildMind AI] [Policy]
  Badge: "★ Flagship Project"

Hover effect: Card lifts, gold border appears, background lightens slightly.
```

#### Section 4: PROJECTS (Featured)

```
Layout:     Grid — 1 featured (2-col span) + 4 regular cards
Header:     "Our Work in the Field" + "View All Projects →" link

Project Cards — Each contains:
  - Video/GIF placeholder (looping, muted) — 16:9 ratio with play overlay
  - Venue label (e.g., "RCT · Shenzhen · 2023–2024")
  - Title (Cormorant Garamond serif)
  - 1-sentence description
  - Tags
  - Link to project page

Featured: ChildMind AI Education (童心智教)
  Media:    GIF/video of system demo (REQUIRED — high priority asset)
  Venue:    "AI System · Shenzhen · 2024–Ongoing"
  Title:    "ChildMind AI Education — China's First LLM-Based ECE Quality System"
  ZH Title: "童心智教 — 中国首个基于大语言模型的幼儿教育质量评估系统"
  Desc:     "Piloted across 40 classrooms in 3 kindergartens; now scaling to 65
            kindergartens and 5,000+ children across all 9 districts of Shenzhen
            in partnership with the Shenzhen Education Supervision Center."
  Tags:     [AI/LLM] [Flagship] [Policy Impact] [深圳市教育督导评估中心]
  Links:    [Project Page →] [Policy Report]

Card 2: RCT — Professional Development in Kindergartens
  Desc:   "Cluster RCT evaluating 'Leadership for Learning' program; published
          in Journal of Educational Psychology (2024)"
  Link:   [Paper PDF] [DOI]

Card 3: Longitudinal Study — Process Quality in Shenzhen
  Desc:   "1-year longitudinal tracking of kindergarten quality and child
          developmental outcomes across Shenzhen"

Card 4: Child Development Profiles (Latent Profile Analysis)
  Desc:   "Multilevel latent profile analysis linking classroom quality to
          children's academic and social-emotional development profiles"
  Link:   [Child Development paper]

Card 5: Educational Equity — Guizhou Poverty-Stricken Counties
  Desc:   "Fieldwork and teacher PD in Zhijin County, Guizhou;
          supported by China Development Research Foundation (CDRF/国发委)"
  Tags:   [CDRF] [Equity] [Rural ECE] [Guizhou]
```

#### Section 5: PUBLICATIONS

```
Layout:     White section, filter tabs + card list
Filter tabs: [All] [2024–2025] [RCT Studies] [Child Development] [AI & Education]

Each publication entry:
  Left:   Year (large gold number, Cormorant serif)
  Center: Title | Authors (PI name bold + different color) | Venue | Badges
  Right:  Action buttons [PDF] [DOI] [BIB] [Abstract ↓]

Publication List (ordered by year, descending):

1. Huang, R., Siraj, I., & Melhuish, E. (2024)
   "Promoting effective teaching and learning through a professional development
   program: A randomized controlled trial"
   Journal of Educational Psychology | Q1 | RCT | DOI: [add]

2. Cheng, Z. J., Ma, C. X., Huang, R., & Bai, Y. (2024)
   "Preschool Children's Deeper-Learning in Mature Play"
   Early Childhood Education Journal | Q1

3. Fang, M., Huang, R., & Zhang, C. (2024) — [add details]
   British Journal of Educational Psychology

4. Huang, R*., & Siraj, I. (2023)
   "Profiles of Chinese pre-schoolers' academic and social-emotional development
   in relation to classroom quality: A multilevel latent profile approach"
   Child Development | Q1 | IF 5.66

5. Huang, R*., Geng, Z., & Siraj, I. (2023)
   "Exploring the Associations among Chinese Kindergartners between Academic
   Achievement and Behavioral, Cognitive and Emotional Self-Regulation"
   Early Education and Development | Q2 | IF 2.1

6. Yang, W., Huang, R*., Li, Y., & Li, H. (2021)
   "Training teacher-researchers through online collective academic supervision"
   Journal of Computer Assisted Learning | Q1 | IF 3.76

7. Huang, R., Yang, W*., & Li, H. (2019)
   "On the road to participatory pedagogy: A mixed-methods study of
   pedagogical interaction in Chinese kindergartens"
   Teaching and Teacher Education | Q1 | IF 3.78

8. Siraj, I*., & Huang, R. (2020)
   "Operationalizing Bronfenbrenner's PPCT Model in Researching Human
   Development: Commentary on Xia, Li and Tudge"
   Human Development | Q1 | IF 5.71

9. Li, H.*, Yang, W., Chen, J., & Huang, R. (2016)
   "The development and future challenges of preschool education in China"
   Early Childhood Education (Educational Sciences)

[Note for CC: Load publications from _data/publications.yml for easy updates]

Footer of section: "View full list on Google Scholar →" (with Scholar icon)
```

#### Section 6: IMPACT COUNTER

```
Layout:   Dark purple strip, 4 animated counters

Counter 1: 15+    | "Peer-Reviewed Publications" | "Q1/Q2 Journals"
Counter 2: ¥130万+ | "Competitive Research Funding" | "NSFC · CDRF · Shenzhen"
Counter 3: 100+   | "Kindergartens Served" | "Shenzhen · Guizhou · Zhejiang"
Counter 4: 4,000+ | "Children Impacted" | "Directly through our programs"

Animation: Numbers count up when section enters viewport (IntersectionObserver).
Font: Cormorant Garamond 64px, white, with gold highlight on the number.
```

#### Section 7: AWARDS & RECOGNITION

```
NEW SECTION (unique differentiator vs demo)
Layout:   Alternating light/dark award cards, 2-column grid

Award 1: 🏆 2025 Young Researcher Award
  EN: "School of Humanities and Social Science Young Researcher Award (2025)
      Sole recipient across the entire School — CUHK Shenzhen"
  ZH: "2025年人文社科学院青年科研奖 · 全院唯一获奖者"
  Badge: [CUHK-SZ]

Award 2: 🔬 NSFC Peer Review Panel
  EN: "Invited peer reviewer for NSFC General Program (面上项目通讯评审) —
      a recognition unusual at this career stage."
  Badge: [NSFC]

Award 3: 🏛 14th China Electronic Information Expo
  EN: "ChildMind AI Education selected for the 14th China Electronic
      Information Expo (中国电子信息博览会)"
  Badge: [CEIE 2024]

Award 4: 📋 Policy Report, Nanshan District Government
  EN: "Policy consultation report for Nanshan District Government
      on kindergarten quality monitoring systems"
  Badge: [Policy Impact]

Funding logos row: NSFC | CDRF (国发委) | 深圳市科创委 | 深圳市社科基金
```

#### Section 8: TEAM

```
Layout:   PI hero card (full-width dark) + student grids below

PI Card (Full Width, Dark Purple):
  Left:   Circular photo (120px) with gold border
  Center: Name + Title + Institution
          "Runke Huang (黄润珂)"
          "Assistant Professor · School of Humanities and Social Science"
          "The Chinese University of Hong Kong, Shenzhen"
  Badges: [PhD · University of Oxford] [MEd · HKU (Distinction)]
          [BEd · Beijing Normal University] [Former Kindergarten Teacher]
  Right:  Bio paragraph (2-3 sentences)
  Links:  [Google Scholar] [Faculty Page] [CV] [Email]

--- PhD Students subheader ---
Grid (4 columns):
  Each card: Photo | Name | Year | Research Focus keywords | Link

PhD Students to add (placeholder — confirm names):
  - Student 1: [Name] | PhD Year X | Early Childhood Assessment
  - Student 2: [Name] | PhD Year X | Child Development & Self-Regulation
  - Student 3: [Name] | PhD Year X | AI in Education / ChildMind AI
  - Student 4: [Name] | PhD Year X | [Research Focus]
  + "We're Recruiting!" placeholder card with gold border

--- Master's Students ---
Grid (3–4 columns, smaller cards)
  3 Master's students + placeholder

--- Research Assistants / Undergraduates ---
Grid (4+ columns, compact cards)
  10+ undergraduate students (can show abbreviated grid)
  Note: "15+ undergraduates trained, including one who has published
         in SSCI Q1 journals"

--- Alumni (if applicable) ---
Compact list with name + current position

--- Collaborators ---
Section with headshots/logos:
  Prof. Iram Siraj (University of Oxford) — PhD supervisor
  Prof. Edward Melhuish (University of Oxford) — PhD supervisor
  [University of Minnesota collaborator — name TBD]
  [Yale University collaborator — name TBD]
```

#### Section 9: NEWS & UPDATES

```
Layout:   Featured news card (left, 60%) + news feed list (right, 40%)

Featured:
  Large card (dark purple), photo/image, category, headline, excerpt, date

News Feed (last 8-10 items from _data/news.yml):
  Date | Category badge [Paper/Award/Grant/Talk/Team] | Headline

Sample news items:
  - 2025.04: Received NSFC Youth Program Grant (国家自然科学基金青年项目)
  - 2025.03: Awarded 2025 Young Researcher Award — sole HSS recipient
  - 2025.02: ChildMind AI advancing to city-wide Shenzhen partnership (65 KGs)
  - 2024.xx: Paper published in Journal of Educational Psychology (RCT results)
  - 2024.xx: ChildMind AI selected for 14th China Electronic Information Expo
  - 2024.xx: Policy consultation report delivered to Nanshan District Gov.
  - 2024.xx: Paper published in British Journal of Educational Psychology
  - 2024.xx: New PhD student joins KINDY Lab
  - 2023.xx: Paper published in Child Development (Q1, IF 5.66)
  - 2023.xx: KINDY Lab founded at CUHK Shenzhen

"View All News →" button
```

#### Section 10: MEDIA & COLLABORATORS

```
Layout:   Light cream section, two subsections

Subsection A — Institutional Collaborators:
  Logo row (grayscale → color on hover):
  [CUHK-SZ] [University of Oxford] [University of Hong Kong] [Beijing Normal Univ.]
  [Yale University] [University of Minnesota] [深圳市教育督导评估中心]
  [中国发展研究基金会 CDRF] [NSFC 国家自然科学基金委]

Subsection B — Published In:
  Journal name cards (typographic, no need for logos):
  [Journal of Educational Psychology] [Child Development]
  [Teaching and Teacher Education] [Journal of Computer Assisted Learning]
  [Human Development] [Early Education and Development]
  [British Journal of Educational Psychology] [Early Childhood Education Journal]
```

#### Section 11: TEACHING

```
Layout:   Dark purple section, quote + 3 course cards

PI Quote:
  "I aim to cultivate researchers who are both rigorous scientists and
   compassionate educators — who understand that good research has the
   power to change children's lives, from Shenzhen to Guizhou and beyond."
   ZH: "我希望培养出兼具严谨科学精神与深厚教育情怀的研究者——
        那些真正相信好的研究能够改变儿童命运的学者。"

Student Metrics Strip (horizontal):
  4 PhD students | 3 Master's students | 10+ Undergrads
  3 PhD students with SSCI Q1 publications | 1 undergrad with SSCI Q1 pub

3 Course Cards:
  Card 1: PSY2120 — Learning and Behavior
    Image: [placeholder — photo from lecture]
    Eval:  "5.72/6.0 ★★★★★"
    Desc:  "Core undergraduate course covering behavioral and cognitive
           learning theories, evidence-based teaching strategies, and
           applications in educational and clinical settings."
    Tags:  [Undergraduate] [Applied Psychology]

  Card 2: PSY5120 — Child and Adolescent Development
    Type:  Postgraduate course
    Eval:  "5.79/6.0 ★★★★★"
    Desc:  "Thematic, systems-oriented approach to developmental science,
           connecting biological, cognitive, social, and contextual factors
           in child and adolescent development."
    Tags:  [Postgraduate] [Developmental Psychology]
    Note:  "Featured: CUHK-SZ Signature Course (精品课程) — under development"
    Badge: [Signature Course]

  Card 3: PSY3160 — Positive Psychology
    Desc:  "Evidence-based introduction to positive psychology — well-being,
           resilience, flourishing — with applications to education and
           personal development."
    Tags:  [Undergraduate] [Well-being]

Additional note card:
  "Undergraduate Programme Director (应用心理学本科项目主任)"
  "Oversees 170+ students across 4 cohorts | 8-year integrated Bachelor's-
  Master's-PhD pathway (首创八年制本硕博贯通培养方案)"
```

#### Section 12: JOIN US

```
Layout:   Forest green gradient section, centered layout

Header:   "Come Build the Science of Better Childhoods"
          ZH: "加入我们，共同构建更好的儿童早期教育科学"

Subtext:  "We are recruiting passionate, rigorous scholars at all levels
          who care deeply about children's futures. You'll join a
          high-impact, internationally connected lab in Shenzhen — one of
          China's most dynamic cities."

3 Position Cards (glassmorphism on green):
  🎓 PhD Students
    EN: "Multiple PhD positions available for 2025/2026 intake. We welcome
        applicants from psychology, education, statistics, and AI backgrounds
        with strong quantitative skills and genuine interest in early
        childhood education."
    ZH: "2025/2026届博士生招募中，欢迎心理学、教育学、统计学、AI相关背景
         的同学申请，要求具备较强定量研究能力及对幼儿教育的真诚热情。"

  🔬 Postdoctoral Researchers
    EN: "We welcome applications from researchers with expertise in
        developmental psychology, ECE quality, quantitative methods,
        or AI in education. Competitive salary with strong publication
        support and international collaboration opportunities."

  🤝 Research Assistants & Interns
    EN: "Undergraduate and Master's students can join as RAs or interns —
        gain hands-on experience in fieldwork, data analysis, and academic
        writing. Several have gone on to publish in SSCI Q1 journals."

Primary CTA: [Apply Now — Send Email →]
Secondary:   [View Lab Culture →] [Contact Dr. Huang]
```

#### Section 13: CONTACT

```
Layout:   Dark purple section, two columns

Left:
  Title: "Let's Talk"
  Info items:
    ✉️  runkehuang@cuhk.edu.cn
    📍  Room 814 TXB, School of Humanities and Social Science
        CUHK Shenzhen, Shenzhen, Guangdong 518172, China
    🌐  myweb.cuhk.edu.cn/runkehuang
    📖  Google Scholar profile (link)
    WeChat QR code (if provided)

Right:
  Contact form:
    First Name | Last Name (row)
    Email
    I am a: [Dropdown: Prospective PhD | Postdoc | Collaborator | Media | Other]
    Research Interest: [text input]
    Message: [textarea]
    [Send Message →] button
```

---

## 5. Sub-Pages

### 5.1 /projects/childmind-ai.html — ChildMind AI Flagship Page

This is the most important sub-page. Model it after academic project pages (e.g., paper project pages).

```
Sections:
1. Header: Large title + teaser video/GIF + subtitle
2. Abstract / One-paragraph summary
3. Problem Statement: "The Challenge" — why conventional evaluation doesn't scale
4. Solution: How ChildMind AI works (system diagram + flowchart)
5. Results: Pilot data — 40 classrooms, 3 kindergartens
6. Scale-up: Shenzhen city-wide partnership (map of 9 districts)
7. Press & Policy: Policy report, Expo selection, Media mentions
8. Team: People working on this project
9. Related Publications
10. BibTeX citation block
11. Contact / Collaboration CTA
```

### 5.2 /publications.html — Full Publications Page

```
- Search bar (JS filter on title/author/year/venue)
- Year filter sidebar
- Category filter (RCT | Child Dev | Quality | AI | Reviews)
- Each pub: expanded card with abstract toggle, DOI, PDF, BIB download
- Stats bar: Total pubs | Citations | h-index | i10-index (from Scholar)
```

### 5.3 /team.html — Full Team Page

```
- PI bio (full, expandable)
- Current members with full bios
- Alumni section with current positions
- Collaborators section with institution logos
```

---

## 6. Interactions & Animations

```
Component               Animation
─────────────────────── ──────────────────────────────────────────────
Page load               Staggered hero content fadeUp (CSS keyframes)
Scroll reveal           IntersectionObserver → add .visible class → fade+translateY
Navbar                  background: transparent → rgba(30,10,60,0.95) blur on scroll
Counter (Impact)        Count-up animation when section enters viewport
Project cards           Hover: translateY(-6px) + box-shadow
Publication items       Hover: border-color to gold, subtle background
Language toggle         Smooth text cross-fade (opacity transition)
Hero stats bar          Slide up after hero content loads (delay 0.9s)
Team PI photo           Subtle scale(1.02) on hover
Mobile menu             Full-screen overlay slide from right

DO NOT USE:
× Heavy JS animation libraries (GSAP, Framer) — slow in CN
× Parallax scroll effects — performance issues mobile
× Auto-playing video with sound
× Google Fonts via googleapis.com (blocked in mainland) — SELF-HOST
× YouTube embeds — use Bilibili or direct <video> tag
× Google Analytics — use Plausible or no analytics
```

---

## 7. Asset Inventory & Requirements

### 7.1 Complete Directory Structure

```
assets/images/
│
├── logo/
│   ├── kindy-logo-color.svg         ★ NEED TO CREATE — lab logo
│   ├── kindy-logo-white.svg         ★ NEED TO CREATE — white version for dark bg
│   ├── kindy-logo-mark.svg          ★ NEED TO CREATE — just the "K" mark
│   └── favicon.ico / favicon.png    ★ NEED TO CREATE
│
├── institution-logos/
│   ├── cuhk-sz-logo.png             ★ REQUIRED — download from cuhk.edu.cn/en/
│   ├── cuhk-sz-logo-white.png       ★ REQUIRED — white version
│   ├── oxford-logo.png              ★ REQUIRED — for collaborators section
│   ├── oxford-logo-white.png        (white version)
│   ├── hku-logo.png                 (for PI education background)
│   ├── bnu-logo.png                 (Beijing Normal — PI background)
│   ├── yale-logo.png                (collaborator)
│   ├── umn-logo.png                 (University of Minnesota)
│   ├── nsfc-logo.png                ★ REQUIRED — funder logo (国家自然科学基金)
│   └── cdrf-logo.png                (中国发展研究基金会)
│
├── team/
│   ├── pi-runke-huang.jpg           ★ REQUIRED — professional headshot
│   │                                   Spec: 400×400px min, square crop,
│   │                                   good lighting, professional attire
│   ├── phd-Junlin Wu.jpg             ★ REQUIRED per student (400×400px)
│   ├── phd-Yanan bao.jpg
│   ├── phd-Yuye Jin.jpg
│   ├── phd-JingwenLi.jpg
│   ├── ma-Baoyi Lu.jpg              (master's students)
│   ├── ma-Zizhenfeng.jpg
│   ├── ma-shuningzhang.jpg
│   ├── ma-daixuMa.jpg
│   ├── collab-iram-siraj.jpg        (Oxford supervisor — public photo OK)
│   ├── collab-edward-melhuish.jpg   (Oxford supervisor)
│   └── placeholder-avatar.svg      (generated — gradient SVG for missing photos)
│
├── hero/
│   ├── hero-bg.jpg                  ★ REQUIRED — primary hero image
│   │                                   Spec: 1920×1080px, landscape
│   │                                   Content: lab group photo OR fieldwork
│   │                                   in kindergarten (authentic, warm)
│   ├── hero-video.mp4               (OPTIONAL — 10-20s looping, muted)
│   └── hero-mobile.jpg              (portrait crop for mobile, 800×1000px)
│
├── projects/
│   ├── childmind-ai-demo.gif        ★ HIGH PRIORITY — animated demo of the system
│   │                                   Spec: 800×450px, <5MB, looping
│   │                                   Content: Screen recording of AI analysis
│   ├── childmind-ai-poster.jpg      (static poster/screenshot for non-animated)
│   ├── rct-fieldwork.jpg            ★ REQUIRED — teacher PD / classroom observation photo
│   ├── longitudinal-classroom.jpg   (kindergarten classroom quality)
│   ├── guizhou-fieldwork.jpg        (equity work in Guizhou)
│   ├── self-regulation-study.jpg    (child assessment setting)
│   └── project-placeholder.svg     (gradient placeholder for missing images)
│
├── news/
│   ├── young-researcher-award.jpg   ★ RECOMMENDED — award ceremony photo
│   ├── expo-exhibition.jpg          (CEIE expo photo if available)
│   ├── fieldwork-guizhou.jpg
│   └── lab-meeting.jpg              (regular lab meeting, informal)
│
├── about/
│   ├── lab-group-photo.jpg          ★ REQUIRED — team group photo
│   │                                   Spec: 800×600px landscape
│   │                                   Content: All lab members together
│   ├── pi-action-photo.jpg          (Runke teaching, at conference, or in field)
│   └── kindergarten-fieldwork.jpg   (authentic classroom observation scene)
│
├── teaching/
│   ├── classroom-psy2120.jpg        (in-class teaching photo)
│   ├── field-teaching.jpg           (15+ undergrads in kindergarten)
│   └── lab-supervision.jpg          (student mentorship/supervision scene)
│
└── childmind-ai/
    ├── system-architecture.png      ★ NEED TO CREATE — diagram of AI system
    ├── shenzhen-map-districts.png   (map of 9 districts — can use SVG)
    ├── pilot-results-chart.png      (data visualization of pilot results)
    └── interface-screenshot-1.jpg  (UI screenshots of the system)
```

需要注意，有些图片我还没有准备好，你看一下怎么处理比较好，有一些可能不完全一致，但是都在assets目录下面

### 7.2 Asset Priority Tiers

```
TIER 1 — Must Have Before Launch:
  ✦ KINDY Lab logo (color + white)
  ✦ PI headshot (Runke Huang)
  ✦ Hero background photo (lab/fieldwork)
  ✦ CUHK-SZ logo (download from official site)
  ✦ PhD student headshots (all 4)

TIER 2 — High Priority (within 2 weeks of launch):
  ✦ ChildMind AI demo GIF/video
  ✦ Lab group photo
  ✦ Oxford, HKU, BNU logos (for PI background section)
  ✦ NSFC, CDRF funder logos
  ✦ Project thumbnails (RCT fieldwork, classroom)

TIER 3 — Nice to Have:
  ✦ Teaching course photos
  ✦ Award ceremony photo
  ✦ Guizhou fieldwork photo
  ✦ News item photos
  ✦ WeChat QR code
```

### 7.3 Logo Download Sources

```
CUHK-SZ official logo:  https://www.cuhk.edu.cn/en/ → About → Brand Assets
Oxford logo:            https://www.ox.ac.uk/brand/our-brand (public use)
NSFC logo:              http://www.nsfc.gov.cn/
HKU logo:               https://www.hku.hk/
BNU logo:               https://www.bnu.edu.cn/
Yale:                   https://www.yale.edu/
U Minnesota:            https://www.umn.edu/
```

---

## 8. Content Data Files

### 8.1 _data/publications.yml structure

```yaml
- id: huang2024rct
  year: 2024
  title_en: "Promoting effective teaching and learning through a professional development program: A randomized controlled trial"
  title_zh: "通过专业发展项目促进有效教学：一项随机对照试验"
  authors: "Huang, R.*, Siraj, I., & Melhuish, E."
  author_highlight: "Huang, R."
  venue: "Journal of Educational Psychology"
  venue_short: "J Educ Psychol"
  year_pub: 2024
  category: [rct, intervention]
  badges: [Q1, RCT]
  doi: ""         # ADD DOI
  pdf: ""         # ADD PDF LINK
  abstract: ""    # ADD ABSTRACT
  featured: true
```

### 8.2 _data/team.yml structure

```yaml
pi:
  name_en: "Runke Huang"
  name_zh: "黄润珂"
  title_en: "Assistant Professor"
  title_zh: "助理教授"
  institution: "School of Humanities and Social Science, CUHK Shenzhen"
  photo: "assets/images/team/pi-runke-huang.jpg"
  email: "runkehuang@cuhk.edu.cn"
  bio_en: "..."
  bio_zh: "..."
  education:
    - degree: "PhD"
      field: "Child Development and Learning"
      institution: "University of Oxford"
      year: 2023
      supervisor: "Prof. Iram Siraj & Prof. Edward Melhuish"
    - degree: "MEd"
      field: "Education"
      institution: "The University of Hong Kong"
      year: 2018
      note: "with Distinction"
    - degree: "BEd"
      field: "Early Childhood Education"
      institution: "Beijing Normal University"
      year: 2017
  links:
    scholar: "https://scholar.google.com/citations?user=Bj3DkxQAAAAJ"
    faculty: "https://myweb.cuhk.edu.cn/runkehuang"
    email: "runkehuang@cuhk.edu.cn"

phd_students:
  - name_en: "[Name]"
    name_zh: "[姓名]"
    year: 1
    research_en: "Research focus here"
    research_zh: "研究方向"
    photo: "assets/images/team/phd-name.jpg"
```

### 8.3 _data/i18n/en.yml (partial sample)

```yaml
nav:
  about: "About"
  research: "Research"
  projects: "Projects"
  publications: "Publications"
  team: "Team"
  news: "News"
  teaching: "Teaching"
  join: "Join Us"
  lang_toggle: "中文"

hero:
  badge: "KINDY Lab · CUHK Shenzhen"
  title: "Unlocking Every Child's Full Potential Through Science"
  subtitle: "We study early childhood education quality, child development, and AI-powered assessment — building evidence for kindergartens that truly work."
  cta_primary: "Explore Our Research"
  cta_secondary: "Join the Lab"

stats:
  publications: "Publications"
  funding: "Competitive Funding"
  kindergartens: "Kindergartens Served"
  children: "Children Impacted"
```

---

## 9. SEO & Technical Requirements

### 9.1 Meta Tags (each page)

```html
<meta name="description" content="KINDY Lab studies early childhood education quality, child development, and AI-powered educational assessment at CUHK Shenzhen. PI: Dr. Runke Huang (黄润珂).">
<meta name="keywords" content="KINDY Lab, early childhood education, kindergarten quality, child development, ChildMind AI, CUHK Shenzhen, 黄润珂, 幼儿教育">
<meta property="og:title" content="KINDY Lab — CUHK Shenzhen">
<meta property="og:image" content="assets/images/og-image.jpg">
<link rel="canonical" href="https://kindylab.github.io/">
```

### 9.2 China Compatibility Checklist

```
✅ Self-host Google Fonts (or use system font fallback)
✅ No Google Analytics (use Plausible or Baidu Analytics alternative)
✅ No YouTube embeds (use <video> tag or Bilibili)
✅ No Cloudflare JS CDN (use jsDelivr which works in CN)
✅ No Google Maps embed (use Baidu Maps or static image)
✅ Test loading speed from mainland China
✅ Provide WeChat contact as alternative to email
✅ Consider both Simplified Chinese (简体) and Traditional Chinese (繁體) — 
   priority: Simplified for mainland, Traditional optional for HK/TW
```

### 9.3 Performance Targets

```
First Contentful Paint:  < 1.5s (CN network)
Largest Contentful Paint: < 2.5s
Total Page Weight:        < 3MB (compress all images)
Image Format:             WebP with JPG fallback
Image Compression:        All images < 300KB (use squoosh.app)
```

---

## 10. GitHub Pages Deployment

### 10.1 Repository Setup

```bash
# Repository name for custom domain:
github.com/[username]/kindy-lab   → kindylab.github.io

# OR for CUHK subdomain (if IT permits):
# CNAME file → kindylab.cuhk.edu.cn

# Branch strategy:
main branch → auto-deployed by GitHub Pages
```

### 10.2 _config.yml (Jekyll)

```yaml
title: KINDY Lab
tagline: "Early Childhood Education Science at CUHK Shenzhen"
description: "KINDY Lab at CUHK Shenzhen studies early childhood education quality, child development, and AI-powered assessment."
url: "https://kindylab.github.io"
baseurl: ""
lang: en

# GitHub Pages compatible plugins only
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap

# Exclude from build
exclude:
  - README.md
  - Gemfile
  - Gemfile.lock
```

### 10.3 Custom Domain (Optional)

```
1. Buy domain: kindylab.com or kindylab.org (~$15/year)
2. Add CNAME file to repo root with domain
3. Configure DNS A records pointing to GitHub IPs
4. Enable HTTPS in GitHub Pages settings
```

---

## 11. Development Phases

### Phase 1 — MVP Launch (2 weeks)

```
Priority: Get a live, impressive site up quickly.

✅ Homepage with all sections (using placeholder images)
✅ Bilingual toggle (EN/ZH)
✅ Publications list (hardcoded from YAML)
✅ Team section (PI card + student placeholders)
✅ Contact form (Formspree or mailto)
✅ Mobile responsive
✅ GitHub Pages deployed
```

### Phase 2 — Polish (week 3-4)

```
✅ Real photos replace all placeholders
✅ ChildMind AI project page (/projects/childmind-ai)
✅ Full publications page with search/filter
✅ News section populated
✅ Google Scholar stats integration (manual update)
✅ Performance optimization (image compression, self-hosted fonts)
✅ SEO meta tags
```

### Phase 3 — Ongoing Maintenance

```
✅ New publications added to _data/publications.yml
✅ News updates via _data/news.yml
✅ Team updates as students join/leave
✅ ChildMind AI progress updates
```

---

## 12. Handoff Notes for Claude Code

### Critical Implementation Notes

1. **Language Toggle**: Store preference in `localStorage`. Default to ZH if browser language is zh-CN, otherwise EN.
    
2. **Publications**: Load from `_data/publications.yml`. Implement keyword filter client-side with JS. Author name "Huang, R." should always render in bold purple with asterisk (*) for corresponding author.
    
3. **Counter Animation**: Use IntersectionObserver with threshold 0.3. Count from 0 to target over 1800ms with ease-out cubic timing. Handle special formats (¥130万+, 4,000+).
    
4. **Contact Form**: Use [Formspree](https://formspree.io/) (free tier, no backend required, works with GitHub Pages). Form endpoint: configure in Formspree dashboard.
    
5. **Fonts in China**: Download Cormorant Garamond and DM Sans font files and self-host in `assets/fonts/`. Do NOT use Google Fonts CDN link.
    
6. **Images**: All images should have `loading="lazy"` except hero. Use `<picture>` with WebP + JPEG fallback.
    
7. **No frameworks**: Keep it vanilla HTML/CSS/JS or Jekyll only. Do NOT use React, Vue, or any SPA framework — GitHub Pages serves static files, and there's no need for complexity.
    
8. **Mobile Menu**: Full-screen overlay on mobile. Purple background, centered links, gold CTA button.
    
9. **PDF links**: Link to DOI (permanent) rather than hosting PDFs directly where possible, to avoid copyright issues.
    
10. **Chinese Typography**: When in ZH mode, use `font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif` for Chinese characters, `line-height: 1.85`, and slightly increased `letter-spacing`.
    



---

## 13. Reference & Inspiration Sites

|Site|What to Learn From|
|---|---|
|safeai-lab.github.io|Overall dark/light contrast, project video cards, metrics bar|
|sitesgo.com AESB Lab example|Grant counter, professional photography integration|
|iprl.stanford.edu|Clean academic project listing, news updates|
|nerfies.github.io|Project page template (for ChildMind AI page)|
|real.stanford.edu|Hero video, mission-first approach|

---

_End of PRD — Version 1.0_  
_For questions, contact the PI at runkehuang@cuhk.edu.cn_