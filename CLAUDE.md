# CLAUDE.md — Trishul Biotech Website

## Project Overview

**Project Name:** vimal-page  
**Client:** Trishul Biotech  
**Domain:** trishulbiotech.com (deployed via Cloudflare Pages at vimal.page)  
**Type:** Single-page application (SPA) — static HTML/CSS/JS, no framework

This is the official marketing website for **Trishul Biotech**, an Indian science-led biologicals company specialising in marine algae biostimulants, organic fertilizers, and the UPCROP® Seven Pillar crop intelligence system.

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|------------------------------------------------|
| Structure   | Vanilla HTML5 (`index.html`)                   |
| Styling     | Vanilla CSS (`styles.css`)                     |
| Logic       | Vanilla JavaScript (`script.js`)               |
| Maps        | Leaflet.js v1.9.4 (CDN)                        |
| Fonts       | Google Fonts — Raleway, Darker Grotesque, Playfair Display, Poppins, Inter |
| Deployment  | Cloudflare Pages via Wrangler (`wrangler.jsonc`) |
| Version Control | Git                                        |

**No build step, no framework, no npm dependencies in production.** `package.json` is present but currently unused for build tooling.

---

## File Structure

```
vimal-page/
├── index.html          # Entire SPA — all pages/sections inside one file
├── styles.css          # All styles (~93 KB) — single global stylesheet
├── script.js           # All JS (~30 KB) — navigation, animations, interactions
├── img/                # All images and media assets
│   ├── landing.mp4                              # Hero video background
│   ├── homepage.jpg                             # Hero poster fallback
│   ├── trishul-biotech-logo.svg                 # Full logo (loading screen etc.)
│   ├── trishul-color-01.svg                     # Colour logo (header)
│   ├── F-icon-01.png                            # Favicon
│   ├── agricultural-research-and-development-center.jpg
│   ├── trishul-biotech-manufacturing-unit.jpg
│   ├── bio-stimulant.jpg
│   ├── trishul-biotech-sectors.jpg
│   ├── trishul-biotech-biostimulants.jpg
│   ├── trishul-biotech-organic-fertilizer.jpg
│   ├── trishul-biotech-agricultural-solutions.jpg
│   ├── agriculture-lab.jpg
│   ├── fertilizer-analysis-lab.jpg
│   ├── technology-to-improve-crop-quality.jpg
│   ├── sustainable-farming-solutions.jpg
│   └── trishul-biotech.jpg
├── old-website/        # Archive of previous site (do not edit)
├── .claude/            # VS Code launch config / local settings
├── .git/               # Git repo
├── .gitignore
├── .assetsignore       # Cloudflare Pages asset exclusions
├── CNAME               # → vimal.page
├── package.json        # Placeholder (no build scripts active)
├── wrangler.jsonc      # Cloudflare Pages / Workers config
└── README.md           # Minimal stub
```

---

## Site Architecture (Sections / Pages)

The site is a **tab-based SPA** — all content lives inside `index.html`. Navigation via `navTo(id, event)` toggles section visibility with CSS classes. The active section gets class `active`; others are hidden.

| Nav Label       | Section `id` | Description                                         |
|-----------------|--------------|-----------------------------------------------------|
| Home            | `home`       | Hero video, Why Trishul, Product overview, Map, Heritage |
| UPCROP® System  | `tech`       | Technology platform, 7-Pillar Journey, SDGs         |
| Labs            | `labs`       | Lab network tabs, Certifications, SDGs              |
| Products        | `india`      | Product portfolio with filter tabs and modals       |
| Resources       | `gallery`    | Gallery / resources section                         |
| Contact         | `contact`    | Contact form and info                               |

---

## Key Design Decisions & Patterns

### Navigation
- `navTo(sectionId, event)` defined in `script.js` handles all section transitions
- Mobile nav uses `toggleMobileNav()` / `closeMobileNav()` — full-screen overlay
- Header `#main-header` is a full-width fixed bar; all content lives inside `.header-inner` (width: 70%, centred)
- **Header states:**
  - Default (home at top): `transparent` background, white logo (`filter: brightness(0) invert(1)`), white nav text
  - `.scrolled` (scroll > 10px): glassmorphism (`rgba(255,255,255,0.80)` + backdrop-blur), coloured logo, dark nav
  - `.header-solid` (non-home sections, set by `navTo`): solid `#ffffff`, coloured logo, dark nav
- Nav buttons get `.active` class based on current section
- **Underline animation:** Left-to-right wipe effect on nav button hover

### Animations & Interactions
- **Loading screen:** `#loading-screen` fades out on `DOMContentLoaded`
- **Hero:** Full-viewport (`height: 100vh`, no margin/border-radius), video behind transparent fixed header. Content (`.hero-bl-content`) is `width: 70%` centered — left edge aligns with `.header-inner` left edge
- **Hero canvas:** `#hero-grid-canvas` — dot-grid dots-only effect (blob bridges removed), tight 30px spacing
- **Scroll ease-out coast:** Native scroll is untouched. After the wheel stops (60ms timeout), the last measured scroll velocity decays at 0.84× per frame until it reaches < 0.4 px/frame. Both `wheel` and `scroll` listeners are passive — no `preventDefault`. Tuning: decay factor in the `coast()` function in `script.js`.
- **Scroll reveals:** Elements with `.reveal` class animate in via `IntersectionObserver`
  - Delay variants: `.reveal-delay-1`, `.reveal-delay-2`
- **Why Trishul section:** Compact card with sticky scroll — image left, text right, 4 slides cross-fade on scroll
  - `.why-outer-card` = transparent scroll container (`height: 4×100vh`), no background, no spacer elements
  - `.why-card-sticky` = actual visual card (`position: sticky; height: 540px`), gray bg, rounded, centered
  - Scroll detection uses `.why-outer-card.getBoundingClientRect().top` in `initWhyScroll()`
  - Dot navigation: `.why-dot[data-target]` clicks scroll to `card.top + i × viewH`
- **UPCROP Journey:** Animated SVG path + node cards that animate in on scroll
- **Product modals:** `openModal(productId)` / `closeModal()` for product detail overlays

### Why Trishul Section (Critical Layout)
- **Card:** `max-width: 940px`, `height: 540px`, `background: #eeedea`, `border-radius: 24px`, centered via `margin: 0 auto`
- **Split:** `.why-image-col` (`flex: 0 0 46%`, image fills flush `inset: 0`) | `.why-text-col` (`flex: 1`)
- Image fills left column edge-to-edge; card `overflow: hidden` rounds the left corners
- Text panels: `position: absolute; inset: 0` inside `.why-text-col`, flex column, `padding: 40px 44px 64px`
- Progress dots: `position: absolute; bottom: 28px; left: 44px` inside `.why-text-col`
- 4 slides: Multi-Centre R&D (0), Own Manufacturing (1), Biological Portfolio (2), Pan-India Reach (3)
- **Do NOT use `.why-split-section`, `.why-sticky-left`, `.why-scroll-right`, or scroll spacers** — these are removed

### Color Palette (CSS Variables in `:root`)
| Variable        | Usage                              |
|-----------------|------------------------------------|
| `--forest-dk`   | Primary dark green                 |
| `--forest-md`   | Mid green                          |
| `--mint`        | Accent green (used on dark backgrounds) |
| `--gold-dk`     | Gold accent (journey path, highlights) |
| `--white`       | Text on dark sections              |

### Typography
- **Headings:** Playfair Display (serif) — section headlines
- **UI / Body:** Darker Grotesque, Inter, Poppins, Raleway
- All fonts loaded via Google Fonts in `<head>`

### Leaflet Map (`#india-leaflet-map`)
- Leaflet CSS loaded from unpkg CDN
- Shows distribution network markers: green = R&D / Field Lab, gold = Manufacturing / Distribution

### Product Modals
- Triggered via `openModal('productId')` inline JS
- Product IDs: `pb201`, `pb261`, `st351`, `qg451`, `ns501` (and more in the india section)
- UPCROP® Pillars with "Arriving Soon" label: RaizUp (01), BioGuard (06), BioFlow (07)

---

## Deployment

**Platform:** Cloudflare Pages (via `wrangler.jsonc`)  
**Worker name:** `vimal-page`  
**Assets directory:** `.` (project root)  
**Custom domain:** `vimal.page` (CNAME)  
**Compatibility date:** 2026-04-03  
**Flags:** `nodejs_compat`

To deploy: `npx wrangler pages deploy .` (or use the Cloudflare dashboard).

---

## SEO

- Full Open Graph + Twitter Card meta tags in `<head>`
- JSON-LD structured data for `Organization` schema
- Canonical URL: `https://trishulbiotech.com/`
- Primary `<h1>` on home hero: *"Biological Intelligence. Delivered."*
- All section headings use `<h2>`, product/lab names use `<h3>`

---

## Brand / Content Notes

- **Company:** Trishul Biotech, headquartered in **Sivakasi, Tamil Nadu**
- **Manufacturing:** ISO 9001:2015 + GMP certified, zero water discharge / zero solid waste
- **Certifications:** ISO 9001:2015, NPOP, NOP (USDA), EC Organic — all via Control Union
- **R&D Labs:** Chennai (Biomarker), Noida (Crop Physiology), Pune (Field Research), Hyderabad (Biotic Stress)
- **UPCROP® System:** 7-pillar biological intelligence cycle — core IP and brand differentiator
- **Marine algae species:** Kappaphycus alvarezii, Gracilaria edulis, Ascophyllum nodosum, Ecklonia maxima
- Social: Facebook `/trishulbiotech`, Instagram `@trishulbiotech_`, LinkedIn `/company/trishul-biotech/`

---

## Common Tasks

### Add a new product modal
1. Add a `<span class="node-prod-pill" onclick="openModal('newid')">Product Name</span>` in the correct pillar node in `index.html`
2. Add the modal data object in `script.js` in the `products` map / `openModal` function

### Add a new Why Trishul slide
1. Add a `.why-text-panel` div with `data-slide="N"` in `.why-sticky-left`
2. Add a `.why-image-layer` div with `data-index="N"` in `.why-image-stack`
3. Add a `.why-scroll-spacer` div with `data-target="N"` in `.why-scroll-right`
4. Add a `.why-dot` button with `data-target="N"` in `.why-progress`

### Change section visibility order
Edit `navTo()` in `script.js` — it toggles `.active` class on section `div`s.

### Update map markers
Search for Leaflet marker initialization in `script.js` — markers are defined inline with lat/lng + popup text.

---

## Do Not Edit

- `old-website/` — archived reference only
- `.claude/` — editor config
- `CNAME` — only change if domain changes
- `.assetsignore` — manages Cloudflare asset exclusions
