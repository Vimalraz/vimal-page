# The PM Operating System — Full Product, UX, Data & Build Blueprint

> A search-first, resource-first operating system for product managers.
> Working product codename: **PM/OS** (placeholder — naming options in §1.4).
> Visual register: minimalist, fast, documentation-grade. Single-screen search workflow over deep navigation. Simplest version that still feels premium.

---

## 0) Reading guide & global assumptions

**Stated design constraints applied throughout:**
- Visual style is minimalist, fast, almost documentation-like — not a marketing landing page.
- Single-screen search workflow is preferred over deep navigation wherever possible.
- When complexity and usability conflict, the simplest premium-feeling version wins.
- Every resource type explicitly declares an **open behavior**: `detail page` / `inline preview` / `editor` / `external link` / `download`.

**Explicit assumptions (called out per the prompt):**
1. **Stack:** SvelteKit (Svelte 5 runes), TypeScript, static-first (adapter-static / prerender) with optional Node adapter later. Client-side search in MVP.
2. **Data:** One canonical `resources.json` (logical single source) that may be physically split per type for performance later. A small set of sibling JSON files for `taxonomy.json`, `collections.json`, `paths.json`.
3. **No backend in MVP.** Editor saves to `localStorage` + export; accounts/cloud-save are Phase 3.
4. **Counts are derived, never hand-maintained.** Pane counts, tag counts, and facet counts are computed from the dataset at build/load time.
5. **Slugs are stable IDs.** `id` = `{type}-{slug}`; URLs use `slug`.
6. **Numbers used in examples (292 total etc.) are illustrative targets**, reconciled with the launch inventory in §14.

**Open-behavior legend (used everywhere):**

| Symbol | Behavior | Meaning |
|---|---|---|
| 🗎 | detail page | Routed on-site page (`/type/slug`) |
| 👁 | inline preview | Expands/peeks in result panel or modal, no route change |
| ✎ | editor | Opens on-site editor (`/templates/slug/edit`) |
| ↗ | external link | Leaves site to third-party URL |
| ⬇ | download | Triggers file/asset download |

A single resource can support several (e.g. a template = 🗎 + ✎ + ⬇ + ↗).

---

# 1) Product strategy and positioning

## 1.1 What the product is

**PM/OS is a search-first resource operating system for product managers** — one fast, dense, minimal destination where a PM can find, use, and operate from the best frameworks, templates, guides, playbooks, tools, case studies, AI workflows, interview prep, and definitions, blending the best on-site material with curated off-site references.

**The problem it solves.** PM knowledge is fragmented and low-trust:
- Frameworks live in scattered blog posts of uneven quality.
- Templates live in 14 different Notion directories with no consistent metadata.
- Tools live in noisy "top 50 PM tools" listicles optimized for affiliate revenue, not utility.
- Interview prep, AI workflows, and glossaries are siloed in separate products.
- Bookmarks rot; nothing is searchable across types; nothing is operator-grade.

A PM mid-task ("I need to write a PRD", "which prioritization framework fits a 2-week discovery", "what does a North Star metric actually look like for marketplaces") has to context-switch across 6 tabs and re-evaluate trust each time.

**PM/OS collapses that into one search box.** Type the job; get ranked, typed, tagged, trust-marked results across every resource class; act on them in place (open, preview, edit, download, or jump to the canonical external source).

**Why PMs return repeatedly.** It becomes muscle memory — the "command palette for product work." Repeated value comes from: (a) speed (sub-second search), (b) breadth (every resource type in one index), (c) actionability (edit/download/copy without leaving), (d) trust (curated, deduped, annotated), (e) freshness (new resources, AI workflows kept current).

**Why search-first is the right UX.** PMs arrive with intent, not curiosity. A magazine homepage forces browsing; a search-first homepage matches the actual job-to-be-done ("retrieve the right artifact fast"). It also scales infinitely without redesign — adding 500 resources doesn't bloat navigation, it deepens the index.

**How it differs:**

| Alternative | Their model | Why PM/OS wins |
|---|---|---|
| Generic PM blogs (SVPG, Lenny, Reforge posts) | Chronological essays, SEO funnels | We index *across* sources and types; we're a retrieval layer, not a publisher feed |
| Notion template directories | One type (templates), inconsistent quality, no editing | We unify all types, add on-site editing, add trust/difficulty metadata |
| "Top PM tools" listicles | Affiliate-driven, stale, single type | Structured tool directory with neutral metadata + cross-links to frameworks/guides |
| Random bookmark managers / Raindrop | Personal, unstructured, no curation | Curated, taxonomized, search-weighted, operator-grade |
| ProductPlan/Aha "resource centers" | Vendor content marketing | Vendor-neutral, no funnel, breadth across the discipline |

## 1.2 Target audience segmentation

| Segment | Primary goals | Pain points | What they need from the site | Sections that matter most |
|---|---|---|---|---|
| **Aspiring PM** (transitioning in) | Learn the discipline, build a portfolio, break in | Don't know what's canonical; overwhelmed | Learning paths, glossary, framework explainers, interview prep | Learning Paths, Glossary, Frameworks, Interview Prep |
| **Associate / Junior PM** | Execute well, not look junior, ship first artifacts | Don't know how to write a PRD/strategy doc; weak on metrics | Templates (editable), guides, checklists, calculators | Templates, Guides, Checklists, Glossary |
| **Mid PM** | Move faster, fill gaps, standardize their work | Reinventing artifacts; inconsistent process | Templates, playbooks, frameworks, operating cadences | Templates, Playbooks, Frameworks |
| **Senior / Principal / Group PM** | Make better calls, mentor, raise team bar | Need defensible frameworks; need depth not 101s | Advanced frameworks, teardowns, benchmarks, case studies | Frameworks (advanced), Case Studies, Playbooks |
| **Founder doing PM** | Ship product without a PM org | No process scaffolding; time-poor | Lightweight playbooks, GTM, prioritization, metrics calculators | Playbooks, Frameworks, Calculators, Tools |
| **Growth PM** | Run experiments, move funnels | Need experiment design, growth models, benchmarks | Experimentation templates, growth frameworks, metrics | Frameworks (growth), Templates (experiment), Benchmarks |
| **AI PM** | Build AI products + use AI in PM work | Discipline is new; few canonical resources | AI-for-PM hub, prompt packs, AI eval frameworks | AI for PMs, Prompt Packs, Frameworks |
| **B2B SaaS PM** | Enterprise discovery, pricing, GTM alignment | B2C advice doesn't transfer | B2B-tagged frameworks/templates, pricing, sales-PM playbooks | Frameworks/Templates (B2B), Playbooks |
| **Platform / API PM** | Manage platforms, ecosystems, internal customers | Scarce platform-specific content | Platform-tagged frameworks, teardowns | Frameworks (platform), Case Studies |
| **PM interview candidate** | Pass loops at target companies | Fragmented prep, no structure | Question banks, frameworks for answers, mock structures | Interview Prep, Frameworks, Glossary |
| **PM leader (Head/Dir/VP)** | Build team operating systems | Need to standardize org-wide | Operating cadence kits, meeting packs, templates to roll out | Operating Cadences, Playbooks, Collections |

## 1.3 Value proposition

**One-line value prop:**
> *Everything a product manager needs, one search away.*

**Hero headline options (documentation-grade, low-fluff):**
1. *Search everything a PM needs.*
2. *The product manager's operating system.*
3. *One search bar for every PM resource.*
4. *Frameworks, templates, playbooks, tools — searchable, in one place.*
5. *Stop bookmarking. Start searching.*

**Subheadline options:**
1. *Frameworks, templates, playbooks, guides, tools, case studies, AI workflows, and interview prep — curated, tagged, and instantly searchable.*
2. *A fast, minimal, operator-grade library for aspiring PMs to VPs.*
3. *Find the right artifact in seconds. Edit it, download it, or jump to the source.*

**"Why this exists" copy (about-page seed):**
> Product knowledge is everywhere and trustworthy nowhere. The best frameworks are buried in old blog posts; the best templates are scattered across a hundred Notion pages; the best tools are hidden behind affiliate listicles. PMs waste hours re-finding things they've already found. PM/OS is a single, search-first index of the best of product management — on-site and off — curated, structured, and built to get you back to work in seconds.

**Positioning / differentiation statements:**
- *Not a blog. A retrieval layer.*
- *Vendor-neutral by design — no funnel, no affiliate bias clouding rankings.*
- *Every resource is typed, tagged, difficulty-rated, and trust-marked.*
- *Use resources in place: edit templates, download artifacts, copy snippets — without leaving.*
- *Built for speed: the index loads once, search is instant.*

## 1.4 Brand and tone

**Naming options:** PM/OS, ProductOS, ThePMStack, Operator (theoperator.pm), Productbench, PMlib, Northstar (taken-risk), **Compendium / PM Compendium**, **Toolkit.pm**. *Recommendation: a short, system-flavored name — `PM/OS` or `Operator`.*

**Brand personality:** Calm, precise, senior, generous. The smart staff-PM friend who hands you the exact artifact and a one-line "use this when…", then gets out of your way.

**Copy tone:**
- Direct, second person, verbs first ("Prioritize a backlog", not "A guide to prioritization").
- Operator vocabulary, no thought-leadership fluff, no emoji in product chrome.
- Dense > decorative. Every label earns its space.

**Visual principles:**
- Documentation aesthetic: generous whitespace, one accent color, strong typographic hierarchy, monospace for metadata/badges.
- Search bar is the visual hero — large, centered, unmistakable.
- Result density like Linear/Algolia DocSearch: scannable rows, type badges, tag chips.
- Light + dark mode; system default.
- Motion is minimal and functional (instant filtering, subtle focus states), never decorative.

**Product principles:**
1. **Search before navigation.** If a feature pushes the user off the search screen unnecessarily, reconsider it.
2. **Counts never lie.** Everything quantitative is derived from data.
3. **Trust is a first-class field.** Source, freshness, and curation status are always visible.
4. **Act in place.** Prefer preview/edit/copy over a page jump.
5. **Simple data, clean architecture.** One schema, migration-ready, no premature backend.

**What "simple but premium" means here:** Nothing extra on screen; what's there is impeccable. Fast load, instant keystroke filtering, perfect keyboard control (`/` to focus, `⌘K` palette, arrow-key result nav), pixel-tight alignment, restrained color, real content (no lorem). Premium = the *speed and polish of the interaction*, not gradients and hero illustrations.

---

# 2) Product concept and UX model

## 2.1 Core user journeys

1. **Discover a framework** — type "prioritization" → Frameworks results ranked → preview RICE inline → open detail 🗎 → jump to related template.
2. **Search all PM resources** — type "activation" with scope=All → mixed-type results, type badges differentiate → filter by tag.
3. **Filter only templates** — click Templates pane → scope narrows → tags swap to template-specific → search "PRD".
4. **Find a PRD template and edit it** — Templates → "PRD" → card → *Open in editor* ✎ → fill sections → export Markdown ⬇ / copy.
5. **Find only external PM resources** — toggle source=Off-site → results show only ↗ items → open Lenny's essay.
6. **Compare multiple resources** — select 2–3 frameworks → Compare view (side-by-side when/inputs/outputs).
7. **Browse by tag/category** — click "Discovery" tag → scoped results across types → refine.
8. **Save / share / download** — bookmark (localStorage) ★, copy share link (URL encodes state), download asset ⬇.
9. **Resource chaining** — framework (RICE) → linked template (RICE scoring sheet) → linked guide ("How to run prioritization") → linked playbook ("Quarterly planning").
10. **Command-palette retrieval** — `⌘K` anywhere → type → jump to any resource without going home.

## 2.2 Homepage / main screen concept

Single screen. Everything happens here; navigation is the fallback, not the path.

```
┌──────────────────────────────────────────────────────────────┐
│  [PM/OS]                         Frameworks Templates ··· ⌘K ◐ │  ← minimal header
├──────────────────────────────────────────────────────────────┤
│                                                                │
│            Search everything a PM needs.                       │  ← hero headline
│   Frameworks · templates · playbooks · tools · AI · prep       │  ← subhead
│                                                                │
│   ┌────────────────────────────────────────────────┐  ▢ All  │
│   │ 🔍  Search frameworks, templates, tools…        │  ▢ On   │  ← hero search + source toggle
│   └────────────────────────────────────────────────┘  ▢ Off  │
│                                                                │
│  [All 292] [Frameworks 25] [Templates 40] [Playbooks 30]       │
│  [Guides 50] [Tools 35] [Case Studies 20] [AI 18]             │  ← category panes w/ counts
│  [Interview 22] [Glossary 52] [Calculators 12] …             │
│                                                                │
│  Tags:  Prioritization  Discovery  GTM  Growth  Pricing  …    │  ← dynamic tags (per pane)
│                                                                │
│  ── Results / Featured ──────────────────────────────────────│
│  RICE Scoring            Framework · Prioritization · Beg  👁🗎 │
│  PRD Template            Template · ✎ Edit ⬇ Download         │
│  North Star Metric       Framework · Metrics · Int      👁🗎   │
│  …                                                            │
└──────────────────────────────────────────────────────────────┘
```

**Above the fold:** header, headline+subhead, search bar, source toggle, category panes, first row of tags. Results begin immediately below; before any query the results area shows **Featured / curated** items (mixed) so the page is never empty.

**Pane behavior:** clicking a pane sets `scope=<type>`, recomputes the tag row to that type's top tags, re-runs the (possibly empty) query within scope, updates result count, and reflects state in the URL. "All" resets scope.

**Tag behavior:** multi-select chips; selecting toggles a tag filter (AND across distinct facets, OR within multi-selected same-type tags — see §7.3). Active tags render filled; a "Clear" chip appears when ≥1 active.

**Search state on pane click:** the query string is preserved; only scope changes (so "PRD" typed under All carries into Templates). Counts and tags recompute.

**Result count update:** a live `N results` label sits above results, recomputed on every keystroke/filter.

**On-site/off-site toggle:** segmented control `All | On-site | Off-site`. Filters `source` facet; persists in URL (`?src=on`).

**Featured/curated:** before a query, show editor-curated featured set; after a query, featured pinned items (if any match) sort to top with a subtle "Featured" marker.

**Empty / no-result states:** see §4.1 and §7.5.

**Mobile:** header collapses to logo + ⌘K/menu; search bar full-width sticky; panes become a horizontal scroll chip row; tags collapse behind a "Filters" sheet; results are full-width cards.

## 2.3 Resource browsing model

Users reach resources six ways, all feeding the same query state:
1. **Global search** (default).
2. **Category panes** (scope filter).
3. **Tags** (topic filter, dynamic per scope).
4. **Filters** (difficulty, source, downloadable, editor-enabled, status — in a Filters drawer).
5. **Direct navigation** (`/frameworks`, `/templates/prd`, deep links with encoded state).
6. **Related resources** (on detail pages — typed cross-links).
Plus **Collections / Learning paths** as curated, ordered groupings that overlay the same data.

---

# 3) Full website information architecture

Search-first: most "pages" are states of the home search. Routed pages exist for detail, editing, SEO, and curated browsing.

| Page | Route | Purpose | User intent | Modules | CTAs | Static/JSON | Search? |
|---|---|---|---|---|---|---|---|
| **Home / Search** | `/` | Primary search command center | "Find a resource" | Header, hero, search, source toggle, panes, tags, results/featured | Search, open resource, edit, download | JSON-driven | Yes (core) |
| **Search results (deep-linked)** | `/search?q=&scope=&tags=&src=` | Shareable search state | "Reproduce/share a query" | Same as home, hydrated from URL | Same | JSON | Yes |
| **Category page** | `/frameworks`, `/templates`, `/guides`, `/playbooks`, `/tools`, `/case-studies`, `/ai`, `/interview`, `/glossary`, `/calculators`, `/checklists` | Scoped landing + SEO | "Browse all of type X" | Scoped search header, type intro, tag rail, results, featured | Open/edit/download | JSON | Yes (scoped) |
| **Resource detail (generic)** | `/{type}/{slug}` | Canonical resource page | "Understand & use this resource" | Title block, metadata, body (MD), actions, related | Open ext / download / edit / copy | JSON | No (has related) |
| **Framework detail** | `/frameworks/{slug}` | Deep framework page | "Apply this framework" | When-to-use, inputs/steps/outputs, mistakes, examples, related templates | Use, copy, related | JSON | No |
| **Template detail** | `/templates/{slug}` | Template landing + preview | "Evaluate then use template" | Preview, metadata, formats, action bar, guide link | Edit ✎ / download ⬇ / copy / source ↗ | JSON | No |
| **Template editor** | `/templates/{slug}/edit` | On-site editing | "Fill this template now" | Section nav, editable fields, live preview, export bar | Save (local), export MD/copy, download | JSON + local state | No |
| **Guide page** | `/guides/{slug}` | Long-form how-to | "Learn to do X" | TOC, MD body, callouts, related artifacts | Copy, related | JSON | No |
| **Playbook page** | `/playbooks/{slug}` | Multi-step operating procedure | "Run this process" | Phases/steps, roles, cadence, linked templates/frameworks | Use templates, download kit | JSON | No |
| **Tool page** | `/tools/{slug}` | Neutral tool profile | "Evaluate a tool" | What/who/pricing tier/alternatives, off-site link | Visit ↗, alternatives | JSON | No |
| **Case study / teardown** | `/case-studies/{slug}` | Worked example | "Learn from a real case" | Context, decisions, outcomes, lessons, frameworks used | Related, source ↗ | JSON | No |
| **AI-for-PM hub** | `/ai` | Sub-index for AI PM | "AI workflows & prompts" | Scoped search, prompt packs, AI frameworks, tools | Copy prompt, open | JSON | Yes (scoped) |
| **Interview prep hub** | `/interview` | Sub-index for prep | "Prepare for loops" | Question banks, frameworks, mock structures, by-company tags | Open bank, practice | JSON | Yes (scoped) |
| **Glossary index** | `/glossary` | A–Z term index | "Look up a term" | Alpha nav, search, term list | Open term | JSON | Yes (scoped) |
| **Glossary term** | `/glossary/{slug}` | Single definition | "Define X" | Definition, example, related terms/frameworks | Related | JSON | No |
| **Calculator/worksheet** | `/calculators/{slug}` | Interactive compute | "Compute a metric" | Inputs, live output, explanation, formula | Compute, copy result | JSON + logic | No |
| **Learning path** | `/paths/{slug}` | Ordered curriculum | "Learn a track end-to-end" | Path overview, ordered steps (resources), progress | Start, mark complete (local) | JSON | No |
| **Collection / bundle** | `/collections/{slug}` | Curated grouping | "Get a themed set" | Description, grouped resources | Open items, download bundle | JSON | No |
| **Contribute / submit** | `/contribute` | UGC submission | "Suggest a resource" | Form, guidelines, contributor wall | Submit (form/Formspree) | Static | No |
| **About** | `/about` | Trust & story | "Who's behind this" | Mission, curation method, team | Newsletter CTA | Static | No |
| **Newsletter** | `/newsletter` | Capture + archive | "Stay updated" | Signup, past issues | Subscribe | Static/JSON | No |
| **Premium / Pro** | `/pro` | Monetization | "Upgrade" | Plan, what's included, FAQ | Subscribe | Static | No |
| **404 / empty** | `*` | Recovery | "Lost" | Search box, popular links | Search | Static | Yes |

---

# 4) Homepage content + UX + build spec

## 4.1 Homepage copy

**Hero headlines (pick 1, A/B the rest):** see §1.3. Default: *Search everything a PM needs.*

**Subheadlines:** see §1.3. Default: *Frameworks, templates, playbooks, guides, tools, case studies, AI workflows, and interview prep — curated, tagged, and instantly searchable.*

**Search placeholder options (rotate or pick one):**
- `Search frameworks, templates, tools…`
- `Try "PRD", "prioritization", "activation metric"…`
- `What do you need to ship today?`
- `Search 290+ PM resources…`

**Pane labels:** `All` · `Frameworks` · `Templates` · `Playbooks` · `Guides` · `Tools` · `Case Studies` · `AI for PMs` · `Interview Prep` · `Glossary` · `Calculators` · `Checklists` (each with derived count).

**Source toggle labels & helper:** `All · On-site · Off-site`. Helper tooltip: *On-site lives here. Off-site jumps to a trusted external source.*

**Empty state (no query yet):**
> **Start typing, or pick a category.** Featured resources below — RICE, the PRD template, and the North Star guide are good places to start.

**No results:**
> **No matches for "{query}" in {scope}.** Try removing filters, switching to **All**, or searching a broader term. [Clear filters] [Search all types]

**Helper text around filters/toggles:**
- Difficulty: *Beginner = 101s, Advanced = staff-level depth.*
- Editor-enabled: *Fill it in right here.*
- Downloadable: *Grab the file.*

**Footer CTA copy:**
> **Missing something great?** [Suggest a resource →] · **Get the best new PM resources monthly.** [Subscribe →]

## 4.2 Homepage UX structure

**Section order (top→bottom):**
1. Header (logo, type-nav links, ⌘K, theme toggle).
2. Hero headline + subhead.
3. Search bar + source toggle (right-aligned segmented control).
4. Category panes (grid/row, with counts).
5. Dynamic tag row (per active pane).
6. Result count + sort control.
7. Results / Featured area.
8. Footer (contribute + newsletter).

**Above the fold:** through the first results row / featured items (sections 1–6 + start of 7).

**Pane behavior:** click → `scope` set, `aria-selected` on pane, tag row + counts + results recompute, URL updates (`/frameworks` or `?scope=frameworks`). Active pane has filled style; counts always derived.

**Tag behavior:** show top N (default 10) tags by frequency within scope; "+ more" expands. Click toggles selection; multi-select supported; selected tags lift to front of the row; "Clear tags" appears.

**Search state on pane click:** preserve `q`; only `scope` changes.

**Result count update:** debounced (~80ms) recompute label `N results`.

**Source toggle behavior:** filters `source ∈ {internal, external}`; persists to URL; affects counts shown in panes? — **No**: pane counts reflect type totals; source filtering changes *results* and the live count label, not pane chips (keeps panes stable). (Assumption, optimizing for stable chrome.)

## 4.3 Homepage build spec

**Svelte component breakdown:**
- `+page.svelte` (home) — orchestrates state, reads from `searchStore`.
- `SiteHeader.svelte`, `CommandPalette.svelte`, `ThemeToggle.svelte`.
- `SearchHero.svelte` (headline + subhead + `SearchBar` + `SourceToggle`).
- `SearchBar.svelte` (input, `/` focus, clear, keyboard nav handoff).
- `SourceToggle.svelte` (segmented All/On/Off).
- `ResourcePaneTabs.svelte` (panes + derived counts).
- `TagFilterBar.svelte` (dynamic tags, multiselect, overflow).
- `ResultsToolbar.svelte` (count + sort + active-filter pills).
- `SearchResultsGrid.svelte` (virtualized list/grid).
- `ResourceCard.svelte` (+ type-specialized variants).
- `FeaturedShelf.svelte` (pre-query state).
- `EmptyState.svelte` / `NoResults.svelte`.
- `SiteFooter.svelte`.

**State model (Svelte 5 runes, central `searchStore`):**
```ts
// src/lib/stores/search.svelte.ts
export const search = $state({
  q: '',
  scope: 'all',          // 'all' | resource type
  tags: [] as string[],
  source: 'all',         // 'all' | 'internal' | 'external'
  difficulty: [] as string[],
  flags: [] as string[], // 'editable' | 'downloadable' | 'featured' | 'new'
  sort: 'relevance'      // 'relevance' | 'newest' | 'popular' | 'az'
});
// derived
export const results = $derived(runSearch(index, search));
export const counts = $derived(deriveCounts(allResources));      // pane counts
export const visibleTags = $derived(topTags(allResources, search.scope, 10));
```

**Props / data dependencies:** components are thin; they read `search` state + derived `results`. `allResources` and the prebuilt `index` are loaded once in the root `+layout.ts` (`load`) and passed via context. No prop-drilling of large arrays.

**JSON-sourced parts:** panes/counts, tags, results, featured (`status.featured`), cards — all from `resources.json` + `taxonomy.json`.

**Search/filter logic requirements:** see §7. Client-side, debounced, weighted token match + tag/facet filter, stable sort, deep-linkable.

**Responsive behavior:** see §4.2 mobile. Breakpoints: ≥1024 grid 2–3 col; 640–1023 single col + sticky search; <640 chip-scroll panes + filter sheet.

**Accessibility:** search is a labeled `searchbox`; panes are an ARIA `tablist`/`tab` with arrow-key nav and `aria-selected`; tags are toggle buttons with `aria-pressed`; results are a `listbox`/list with roving tabindex and `aria-live="polite"` count announcements; full keyboard path (`/` focus, `↑↓` results, `Enter` open, `Esc` clear); visible focus rings; color-independent type badges (icon + text); respects `prefers-reduced-motion` and `prefers-color-scheme`.

---

# 5) Resource taxonomy and classification system

## 5.1 Top-level resource types

| Type (`type`) | What it is | Default open behavior | Detail page? | Editor? | Download? |
|---|---|---|---|---|---|
| `framework` | Mental model / method (RICE, JTBD) | 👁 preview + 🗎 detail | Yes | No | Optional (cheatsheet ⬇) |
| `template` | Reusable artifact (PRD, strategy doc) | ✎ editor or 🗎 detail; ⬇/↗ | Yes | Yes (subset) | Yes |
| `guide` | Long-form how-to | 🗎 detail | Yes | No | No |
| `playbook` | Multi-step operating procedure | 🗎 detail | Yes | Optional (kit ⬇) | Sometimes |
| `tool` | Third-party software profile | ↗ external (+ 🗎 profile) | Yes (thin) | No | No |
| `case_study` | Real-world worked example/teardown | 🗎 detail (+ ↗ source) | Yes | No | No |
| `glossary` | Single term definition | 🗎 detail (small) / 👁 | Yes | No | No |
| `interview` | Question bank / prep resource | 🗎 detail | Yes | Sometimes (✎ answer scratchpad) | Optional |
| `calculator` | Interactive compute (CAC, LTV) | 🗎 interactive page | Yes | Interactive (not text editor) | Copy result |
| `worksheet` | Fillable single-purpose artifact | ✎ editor / ⬇ | Yes | Yes | Yes |
| `checklist` | Step list to verify | 👁 inline (checkable) / 🗎 | Yes | ✎ (check state, local) | ⬇ |
| `prompt_pack` | Curated AI prompts | 👁 inline copy / 🗎 | Yes | Copy each | ⬇ |
| `benchmark` | Metric reference data | 🗎 detail (tables) | Yes | No | ⬇ (csv) |
| `learning_path` | Ordered curriculum | 🗎 path page | Yes | progress (local) | No |
| `collection` | Curated bundle/grouping | 🗎 collection page | Yes | No | Optional bundle ⬇ |
| `article` | Short opinion/explainer (on/off-site) | 🗎 or ↗ | Sometimes | No | No |
| `operating_cadence` | Cadence kit (rituals + templates) | 🗎 detail + linked templates | Yes | via linked templates | kit ⬇ |
| `meeting_pack` | Agendas/templates for a meeting type | 🗎 + ✎ templates | Yes | via templates | ⬇ |

*`learning_path` and `collection` are both *resources* and *organizers* — they appear in their own panes optionally, and overlay other resources.*

## 5.2 Topic taxonomy

Topics are the tag universe, grouped into **facet groups** (used for tag-row grouping and filters). A resource may carry tags from multiple groups.

| Facet group | Tags |
|---|---|
| **Lifecycle / function** | discovery, user-research, strategy, roadmap, prioritization, execution, launch, gtm, growth, retention, onboarding, activation, churn, monetization, pricing, analytics, metrics, experimentation |
| **Skill / craft** | product-sense, stakeholder-management, communication, leadership, decision-making, writing, prd, okrs |
| **Domain / business model** | b2b-saas, b2c, marketplace, platform, api, consumer, fintech, devtools, ai-pm, mobile, ecommerce, hardware |
| **Career** | career, interview-prep, hiring, mentoring, ic-to-manager, portfolio |
| **Org / team** | team-systems, operating-cadence, planning, agile, rituals |
| **AI** | ai-pm, llm, prompts, ai-eval, ai-discovery, ai-workflow |

## 5.3 Taxonomy rules

- **Categories vs tags vs filters:**
  - **Category = resource `type`** (drives panes/scope). Exactly one per resource. Structural.
  - **Tag = topic** (`tags[]`, from §5.2). Many per resource. Semantic. Drives the tag row + topic filtering.
  - **Filter = derived attribute** not tied to topic: `difficulty`, `source`, `flags` (editable/downloadable/featured/new), `sort`. Driven by metadata fields, not the tag list.
- **Parent/child:** topics live in flat facet groups (group is the "parent"); avoid deep tag trees (anti-chaos). Group is for display/grouping only, not a navigable hierarchy.
- **Tag rules to avoid chaos:**
  1. Closed vocabulary — tags must exist in `taxonomy.json`; no free-text tags.
  2. Canonical slugs (`ai-pm`, not `AI PM`/`aipm`); `aliases[]` map synonyms for search only.
  3. Max ~6 tags per resource; pick the most load-bearing.
  4. Every tag belongs to exactly one facet group.
  5. Lint step in build fails on unknown tags.
- **Multi-topic membership:** a resource simply lists multiple `tags`; it surfaces under each tag's filter and in each relevant facet group of the tag row.
- **Tag display per pane:** the tag row shows the **top-frequency tags within the current scope**, so Frameworks shows prioritization/discovery/etc., Templates shows prd/roadmap/etc. — derived, not hardcoded.

---

# 6) Unified JSON data model

## 6.1 Top-level structure

Logical single source; physically can be one file or split (`/data/frameworks.json`, etc.) merged at load. Recommended top-level:

```json
{
  "meta": {
    "version": "1.0.0",
    "generatedAt": "2026-06-23T00:00:00Z",
    "schemaVersion": 1
  },
  "taxonomy": {
    "types": [
      { "id": "framework", "label": "Frameworks", "pluralLabel": "Frameworks",
        "icon": "grid", "defaultOpen": "detail", "order": 1 }
      /* … one per type from §5.1 … */
    ],
    "facetGroups": [
      { "id": "lifecycle", "label": "Lifecycle", "tags": ["discovery","strategy","prioritization"] }
      /* … from §5.2 … */
    ],
    "tags": [
      { "id": "prioritization", "label": "Prioritization", "group": "lifecycle",
        "aliases": ["prio","ranking"], "description": "Ordering work by value." }
    ],
    "difficulties": ["beginner","intermediate","advanced"]
  },
  "resources": [ /* array of resource objects, see §6.3 */ ],
  "collections": [ /* §6.3 collection */ ],
  "paths": [ /* §6.3 learning_path */ ],
  "featured": ["framework-rice","template-prd","guide-north-star-metric"]
}
```

## 6.2 Field reference (common to all resources)

| Field | Type | Req | Notes |
|---|---|---|---|
| `id` | string | ✓ | `{type}-{slug}`, globally unique |
| `type` | enum | ✓ | from §5.1 |
| `slug` | string | ✓ | URL segment, unique within type |
| `title` | string | ✓ | display name |
| `summary` | string | ✓ | 1–2 lines, used in cards + search |
| `description` | string | – | longer abstract (search-indexed) |
| `body` | object | – | rich content (see §6.4) — on-site detail |
| `tags` | string[] | ✓ | topic tag ids (≤6) |
| `difficulty` | enum | ✓ | beginner/intermediate/advanced |
| `source` | enum | ✓ | `internal` \| `external` |
| `openBehaviors` | string[] | ✓ | subset of `detail,preview,editor,external,download` |
| `primaryAction` | string | ✓ | the default CTA behavior |
| `externalUrl` | string | cond | required if source=external or external in openBehaviors |
| `canonicalSource` | object | – | `{ name, url, author }` attribution |
| `downloads` | array | – | see §6.5 |
| `editor` | object | cond | for editable templates/worksheets, see §9.4 |
| `related` | array | – | `[{ id, relation }]` see §6.6 |
| `status` | object | ✓ | `{ featured, new, popular, deprecated }` booleans |
| `seo` | object | – | `{ title, description, ogImage, keywords[] }` |
| `searchMeta` | object | – | `{ keywords[], boost }` indexing hints |
| `meta` | object | – | type-specific payload (varies by type) |
| `createdAt` / `updatedAt` | ISO date | ✓ | freshness + sort |
| `readingTime` | number | – | minutes (guides/case studies) |
| `authors` | array | – | `[{ name, url }]` |

**Required vs optional summary:** required for all = `id,type,slug,title,summary,tags,difficulty,source,openBehaviors,primaryAction,status,createdAt,updatedAt`. Everything else is conditional/optional. `externalUrl` and `editor` are conditionally required.

**Relationships (§6.6):** typed edges via `related[]` with `relation ∈ {template-for, framework-for, guide-for, example-of, alternative-to, part-of, prerequisite, next}`. Bidirectional links can be auto-generated at build time (if A `template-for` B, add inverse `has-template` on B).

**Tags/categories representation:** category = `type` (single); tags = `tags[]` of ids resolved against `taxonomy.tags`.

**Search facets representation:** facets are derived at load: `{ type, tags, difficulty, source, flags }` → counts computed by reducing `resources`.

**Pane counts derivation:**
```ts
const counts = resources.reduce((m,r)=>((m[r.type]=(m[r.type]||0)+1),m),{all:resources.length});
```

## 6.3 Example objects

**Framework:**
```json
{
  "id": "framework-rice",
  "type": "framework",
  "slug": "rice",
  "title": "RICE Scoring",
  "summary": "Prioritize initiatives by Reach, Impact, Confidence, and Effort.",
  "description": "A weighted scoring model for ranking a backlog objectively.",
  "tags": ["prioritization","roadmap","execution"],
  "difficulty": "beginner",
  "source": "internal",
  "openBehaviors": ["preview","detail","download"],
  "primaryAction": "detail",
  "downloads": [
    { "label": "RICE cheatsheet (PDF)", "format": "pdf", "url": "/assets/rice.pdf", "size": 84000 }
  ],
  "related": [
    { "id": "template-rice-sheet", "relation": "template-for" },
    { "id": "guide-run-prioritization", "relation": "guide-for" },
    { "id": "framework-ice", "relation": "alternative-to" }
  ],
  "status": { "featured": true, "new": false, "popular": true, "deprecated": false },
  "seo": { "title": "RICE Scoring Framework for PMs", "description": "How to prioritize with RICE.", "keywords": ["rice","prioritization framework"] },
  "createdAt": "2026-01-10", "updatedAt": "2026-05-01",
  "meta": {
    "whenToUse": ["Comparing many initiatives", "Need a defensible ranking"],
    "whenNotToUse": ["Single obvious bet", "Strategy-level bets where conviction beats math"],
    "inputs": ["Reach estimate","Impact (0.25–3)","Confidence %","Effort (person-months)"],
    "steps": ["Score each factor","Compute (R×I×C)/E","Sort descending","Sanity-check top items"],
    "outputs": ["Ranked backlog","RICE score per item"],
    "mistakes": ["False precision","Gaming confidence","Ignoring strategic fit"],
    "example": "A 12-item backlog ranked; feature B (score 42) beats A (score 18)."
  }
}
```

**Template with editor support:**
```json
{
  "id": "template-prd",
  "type": "template",
  "slug": "prd",
  "title": "PRD Template",
  "summary": "A lean product requirements doc you can fill in here.",
  "tags": ["prd","execution","writing"],
  "difficulty": "beginner",
  "source": "internal",
  "openBehaviors": ["editor","detail","download","preview"],
  "primaryAction": "editor",
  "downloads": [
    { "label": "Markdown", "format": "md", "generated": true },
    { "label": "Google Doc copy", "format": "gdoc", "url": "https://docs.google.com/.../copy" }
  ],
  "related": [
    { "id": "guide-writing-prds", "relation": "guide-for" },
    { "id": "framework-jtbd", "relation": "framework-for" }
  ],
  "status": { "featured": true, "new": false, "popular": true, "deprecated": false },
  "createdAt": "2026-02-01", "updatedAt": "2026-06-01",
  "editor": {
    "mode": "structured",
    "exportFormats": ["md","txt","clipboard"],
    "sections": [
      { "id": "summary", "title": "Summary", "required": true,
        "help": "One paragraph: what & why.",
        "placeholder": "We are building … for … because …", "default": "" },
      { "id": "problem", "title": "Problem", "required": true,
        "fields": [
          { "id": "who", "label": "Who has the problem", "type": "text", "placeholder": "Segment…" },
          { "id": "pain", "label": "The pain", "type": "textarea", "placeholder": "Today they…" }
        ]},
      { "id": "goals", "title": "Goals & non-goals", "required": false,
        "type": "list", "placeholder": "Goal…" },
      { "id": "requirements", "title": "Requirements", "required": true,
        "type": "list" },
      { "id": "metrics", "title": "Success metrics", "required": true,
        "help": "Define the North Star + guardrails." }
    ]
  }
}
```

**External template link:**
```json
{
  "id": "template-strategy-canvas-ext",
  "type": "template",
  "slug": "strategy-canvas",
  "title": "Product Strategy Canvas",
  "summary": "A one-page strategy canvas (hosted on the author's site).",
  "tags": ["strategy","roadmap"],
  "difficulty": "intermediate",
  "source": "external",
  "openBehaviors": ["external","detail"],
  "primaryAction": "external",
  "externalUrl": "https://example.com/strategy-canvas",
  "canonicalSource": { "name": "Example PM", "url": "https://example.com", "author": "J. Doe" },
  "status": { "featured": false, "new": true, "popular": false, "deprecated": false },
  "createdAt": "2026-06-01", "updatedAt": "2026-06-01"
}
```

**Guide:**
```json
{
  "id": "guide-north-star-metric",
  "type": "guide",
  "slug": "north-star-metric",
  "title": "How to Choose a North Star Metric",
  "summary": "A practical guide to picking and pressure-testing your North Star.",
  "tags": ["metrics","strategy","growth"],
  "difficulty": "intermediate",
  "source": "internal",
  "openBehaviors": ["detail"],
  "primaryAction": "detail",
  "readingTime": 9,
  "body": { "format": "markdown", "content": "## What it is\n…", "toc": true },
  "related": [
    { "id": "framework-north-star", "relation": "framework-for" },
    { "id": "calculator-ltv", "relation": "example-of" }
  ],
  "status": { "featured": true, "new": false, "popular": true, "deprecated": false },
  "createdAt": "2026-01-20", "updatedAt": "2026-04-15"
}
```

**Tool directory item:**
```json
{
  "id": "tool-amplitude",
  "type": "tool",
  "slug": "amplitude",
  "title": "Amplitude",
  "summary": "Product analytics for behavioral cohorts and funnels.",
  "tags": ["analytics","metrics","experimentation"],
  "difficulty": "intermediate",
  "source": "external",
  "openBehaviors": ["external","detail"],
  "primaryAction": "external",
  "externalUrl": "https://amplitude.com",
  "status": { "featured": false, "new": false, "popular": true, "deprecated": false },
  "createdAt": "2026-01-01", "updatedAt": "2026-06-01",
  "meta": {
    "category": "Product analytics",
    "pricingTier": "freemium",
    "bestFor": ["Growth PMs","B2C funnels"],
    "alternatives": ["tool-mixpanel","tool-posthog"],
    "affiliate": false
  }
}
```

**Glossary entry:**
```json
{
  "id": "glossary-north-star-metric",
  "type": "glossary",
  "slug": "north-star-metric",
  "title": "North Star Metric",
  "summary": "The single metric that best captures the core value your product delivers.",
  "tags": ["metrics","strategy"],
  "difficulty": "beginner",
  "source": "internal",
  "openBehaviors": ["detail","preview"],
  "primaryAction": "detail",
  "related": [
    { "id": "guide-north-star-metric", "relation": "guide-for" },
    { "id": "glossary-okr", "relation": "alternative-to" }
  ],
  "status": { "featured": false, "new": false, "popular": true, "deprecated": false },
  "createdAt": "2026-01-05", "updatedAt": "2026-01-05",
  "meta": { "example": "For Spotify, time spent listening; for Airbnb, nights booked." }
}
```

**Learning path:**
```json
{
  "id": "path-prioritization-mastery",
  "type": "learning_path",
  "slug": "prioritization-mastery",
  "title": "Prioritization Mastery",
  "summary": "From RICE basics to portfolio-level tradeoffs in 6 steps.",
  "tags": ["prioritization","strategy"],
  "difficulty": "intermediate",
  "source": "internal",
  "openBehaviors": ["detail"],
  "primaryAction": "detail",
  "status": { "featured": true, "new": true, "popular": false, "deprecated": false },
  "createdAt": "2026-06-01", "updatedAt": "2026-06-01",
  "meta": {
    "steps": [
      { "id": "framework-rice", "note": "Start with the basic model" },
      { "id": "template-rice-sheet", "note": "Apply it to your backlog" },
      { "id": "guide-run-prioritization", "note": "Run a real session" },
      { "id": "framework-kano", "note": "Layer in satisfaction" },
      { "id": "case-study-prio-tradeoffs", "note": "See it in the wild" }
    ],
    "estimatedHours": 3
  }
}
```

**Collection / bundle:**
```json
{
  "id": "collection-new-pm-starter-kit",
  "type": "collection",
  "slug": "new-pm-starter-kit",
  "title": "New PM Starter Kit",
  "summary": "The 10 resources every new PM should bookmark.",
  "tags": ["career","execution"],
  "difficulty": "beginner",
  "source": "internal",
  "openBehaviors": ["detail","download"],
  "primaryAction": "detail",
  "downloads": [{ "label": "Full kit (zip)", "format": "zip", "url": "/assets/new-pm-kit.zip" }],
  "status": { "featured": true, "new": false, "popular": true, "deprecated": false },
  "createdAt": "2026-03-01", "updatedAt": "2026-06-01",
  "meta": {
    "items": ["template-prd","framework-rice","guide-north-star-metric","glossary-okr","checklist-launch"]
  }
}
```

## 6.4 Rich text / markdown content

`body` object: `{ format: "markdown" | "blocks", content: string | Block[], toc: boolean }`.
- MVP uses **markdown** (rendered with a sanitizer like `marked` + `DOMPurify`; or `mdsvex` at build for prerendered guides).
- `blocks` (future) allows structured callouts: `{ type: "callout"|"steps"|"table"|"code", … }`.
- TOC auto-generated from `##` headings when `toc:true`.

## 6.5 Downloadable assets

```json
"downloads": [
  { "label": "PRD (Markdown)", "format": "md", "generated": true },
  { "label": "PRD (PDF)", "format": "pdf", "url": "/assets/prd.pdf", "size": 120000 },
  { "label": "Google Doc", "format": "gdoc", "url": "https://docs.google.com/.../copy" }
]
```
- `generated:true` ⇒ produced client-side from editor state (no stored file).
- `url` ⇒ static asset or external "make a copy" link.
- `format ∈ {md,txt,pdf,csv,xlsx,gdoc,gsheet,notion,zip}`.

## 6.6 Internal vs external link behavior

- **Internal "view on site":** `openBehaviors` includes `detail`/`editor`/`preview`; resolved to in-app routes.
- **External "open externally":** `openBehaviors` includes `external`; uses `externalUrl`; renders ↗, `target=_blank rel="noopener"`, with a source label (`canonicalSource.name`).
- A resource can offer both (template hosted as Google Doc + on-site preview): `openBehaviors:["preview","external"]`, `primaryAction:"external"`.

---

# 7) Search architecture and filtering system

## 7.1 Search model

- **Global search:** tokenize query → match against weighted fields → score → filter by active facets → sort.
- **Scoped (category) search:** same, pre-filtered to `type === scope`.
- **Tag filtering:** post-filter `resource.tags ⊇ selectedTags` (AND across tags by default; see §7.3).
- **Source toggle:** post-filter `source` unless `all`.
- **Pane scope:** sets `type` pre-filter and changes the visible tag set.
- **Matching style:** **tokenized + weighted + light fuzzy** (prefix match + small Levenshtein tolerance for typos). Not pure exact, not heavy NLP. Diacritics-folded, case-insensitive.
- **Indexed fields & weights:**

| Field | Weight |
|---|---|
| `title` | 10 |
| `searchMeta.keywords` / `aliases` | 7 |
| `tags` (label) | 5 |
| `summary` | 4 |
| `description` | 2 |
| `body`/`meta` text | 1 |
| `type` label | 1 |

- **Ranking logic:** `score = Σ(fieldWeight × matchQuality) × statusBoost`, where `statusBoost` = featured ×1.3, popular ×1.15, deprecated ×0.5; tie-break by `popular` then `updatedAt`. Exact title match floats to top.
- **Library:** MVP use **FlexSearch** or **MiniSearch** (tiny, fast, supports field weights + fuzzy). Build a prebuilt index at compile time for instant first query.

## 7.2 Filter system

| Filter | Source field | UI | Multi? |
|---|---|---|---|
| Resource type | `type` | Panes (primary) + drawer | Single (scope) |
| Topic / tag | `tags[]` | Tag row + drawer | Multi |
| Difficulty | `difficulty` | Drawer segmented | Multi |
| Source (on/off-site) | `source` | Hero toggle | Single tri-state |
| Downloadable | `downloads.length>0` | Drawer toggle | Bool |
| Editor-enabled | `editor` present | Drawer toggle | Bool |
| Featured/new/popular | `status.*` | Drawer chips | Multi |
| Free/premium (future) | `meta.access` | Drawer toggle | Bool |

## 7.3 Tag UX

- **Where:** primary tag row under panes (top N=10 by scope frequency); full set in Filters drawer grouped by facet group.
- **Dynamic by pane:** recomputed on scope change.
- **Collapse:** show 10, "+N more" expands inline; drawer holds the rest grouped.
- **Multi-select:** clicking adds to `tags[]`. Default semantics: **AND** (intersect) — selecting `prioritization` + `b2b-saas` shows resources with both. (Simplest mental model; revisit if too restrictive.)
- **Selected display & clear:** selected chips render filled and hoist to row front; an active-filter pill bar above results shows every active filter (`Templates ×`, `prd ×`, `On-site ×`) with a single **Clear all**.

## 7.4 Search result card design

Shared card skeleton, type-specialized action bar:

```
┌────────────────────────────────────────────────────────────┐
│ [TYPE]  Title                                   ★  [actions] │
│ Summary line that wraps to two lines max…                   │
│ #tag #tag #tag         · Beginner · On-site · ⬇ ✎          │
└────────────────────────────────────────────────────────────┘
```

| Element | All types |
|---|---|
| Type badge | colored+iconed label (`Framework`, `Template`…) |
| Title | bold, links to primary action |
| Summary | 1–2 lines, truncated |
| Tags | up to 3 chips + overflow count |
| Difficulty | small label |
| Source | `On-site` / `↗ source name` |
| Bookmark | ★ toggle (local) |
| Actions (type-specific) | see below |

| Type | Card actions |
|---|---|
| framework | Preview 👁 · Open 🗎 · (Cheatsheet ⬇) |
| template | Edit ✎ · Download ⬇ · Source ↗ · Open 🗎 |
| guide | Open 🗎 · Copy link |
| playbook | Open 🗎 · (Kit ⬇) |
| tool | Visit ↗ · Profile 🗎 |
| case_study | Open 🗎 · Source ↗ |
| glossary | Preview 👁 · Open 🗎 |
| interview | Open 🗎 · (Scratchpad ✎) |
| calculator | Open 🗎 (interactive) |
| checklist | Preview 👁 (checkable) · Download ⬇ |
| prompt_pack | Copy · Open 🗎 |
| learning_path / collection | Open 🗎 |

## 7.5 Search states

- **Empty (no query):** Featured shelf + "popular tags" + recent (localStorage) — never blank.
- **No results:** copy from §4.1 + actionable buttons (clear filters / search all types / nearest suggestions via fuzzy fallback).
- **Loading:** index loads once at boot; show a 1-frame skeleton only on first paint. Subsequent queries are synchronous (no spinner).
- **Suggestions:** as-you-type top-5 dropdown (title matches) with type badges; `Enter` runs full search.
- **Recently viewed / trending / featured:** Recently viewed from localStorage; trending = `status.popular`; featured = `status.featured` / `featured[]` list.

---

# 8) Category pane system spec

Shared pane behavior: each pane = a scope. Selecting sets `scope`, recomputes tags (top-frequency within scope), re-runs query, updates count + URL, sets default sort, shows pane-specific empty state, and optionally pins featured.

| Pane | Includes types | Count = | Default tags (derived examples) | Default sort | Empty state | Pinned featured? | Custom card? |
|---|---|---|---|---|---|---|---|
| **All** | every type | total | global top tags: prioritization, discovery, gtm, growth, metrics | relevance (popular pre-query) | "Start typing…" | Yes (featured shelf) | No (mixed) |
| **Frameworks** | framework | count(framework) | prioritization, monetization, gtm, discovery, roadmapping, growth, pricing, b2b-saas, ai-pm | popular | "No frameworks match." | Top 3 popular | Slightly (shows when-to-use snippet) |
| **Templates** | template, worksheet, meeting_pack | sum | prd, strategy-doc, roadmap, interview-guide, experiment-design, user-research, launch-checklist, kpi-dashboard | popular | "No templates match. Try the PRD or strategy doc." | Top 3 editable | Yes (Edit/Download primary) |
| **Playbooks** | playbook, operating_cadence | sum | planning, gtm, discovery, growth, launch, rituals | popular | "No playbooks match." | Top 2 | No |
| **Guides** | guide, article | sum | strategy, metrics, discovery, writing, career | newest | "No guides match." | Featured guide | No |
| **Tools** | tool | count(tool) | analytics, roadmap, research, experimentation, ai-pm | popular | "No tools match." | Top picks per category | Yes (pricing tier + Visit) |
| **Case Studies** | case_study | count | growth, b2b-saas, marketplace, pricing, launch | newest | "No case studies match." | 1 hero teardown | Yes (outcome snippet) |
| **AI for PMs** | prompt_pack + tag `ai-pm` across types | count(tag=ai-pm) | llm, prompts, ai-eval, ai-discovery, ai-workflow | popular | "No AI resources match." | Featured prompt pack | Yes (copy-prompt) |
| **Interview Prep** | interview + tag `interview-prep` | count | product-sense, estimation, behavioral, strategy, by-company | popular | "No prep resources match." | Top question bank | Yes (question count) |
| **Glossary** | glossary | count | metrics, strategy, growth, agile | A–Z | "No terms match." | No | Yes (compact, A–Z) |
| **Calculators** | calculator, worksheet | sum | metrics, monetization, growth, pricing | popular | "No calculators match." | CAC/LTV | Yes (interactive badge) |
| **Checklists** | checklist | count | launch, discovery, onboarding | popular | "No checklists match." | Launch checklist | Yes (checkable preview) |
| **Paths/Collections** *(optional pane)* | learning_path, collection | sum | career, prioritization, growth | featured | "No paths yet." | Featured path | Yes (step count) |

*Note:* AI/Interview panes are **tag-driven cross-type views** (not single `type`), so their count = resources matching the tag, and results mix types — a deliberate exception that matches user mental models.

---

# 9) Templates section + online editor

## 9.1 Template library model

- **Template categories (via tags):** prd, strategy-doc, roadmap, okr, experiment-design, user-research, interview-guide, launch-checklist, kpi-dashboard, one-pager, postmortem, standup, planning, gtm-brief, pricing-model, persona, jtbd-canvas.
- **Filters:** tag, difficulty, source (on/off), editable (yes/no), downloadable, format.
- **Metadata:** standard + `editor` block + `downloads`.
- **On vs off-site behavior:**
  - On-site editable ⇒ `openBehaviors:["editor","detail","download","preview"]`, `primaryAction:"editor"`.
  - On-site downloadable only ⇒ `["detail","download","preview"]`.
  - Off-site (Google Doc / Notion duplicate) ⇒ `["external","detail"]`, `primaryAction:"external"`.

## 9.2 Template detail page (`/templates/{slug}`)

```
Title  [Template badge]  ★
Summary
─────────────────────────────────────────────
[ Preview pane (rendered sections) ] | [ Metadata block:
                                      |   difficulty, tags,
                                      |   formats, updated,
                                      |   source ]
─────────────────────────────────────────────
[ ✎ Open in editor ]  [ ⬇ Download ▾ ]  [ ⧉ Copy ]  [ ↗ Source ]
─────────────────────────────────────────────
Guide: How to write a great PRD →   (related guide)
Related: JTBD framework · Launch checklist
```

Modules: title block, preview (read-only render of sections + placeholders), metadata block, action bar, related guides/frameworks, format selector.

## 9.3 Online template editor (`/templates/{slug}/edit`)

- **Which templates support editing:** any with an `editor` block (text-artifact templates: PRD, strategy doc, one-pager, postmortem, interview guide, OKRs, GTM brief, persona, standup). Spreadsheet-shaped ones (KPI dashboard, RICE sheet) link out or use a calculator instead in MVP.
- **Editor modes:**
  - `plain` — single textarea seeded with template markdown.
  - `markdown` — markdown editor with live preview.
  - `structured` — section/field form (recommended default) that compiles to markdown.
  - `block` (Phase 2) — drag/reorder block editor.
- **Save/export/copy/download:** autosave to `localStorage` keyed by template id; **Export** → Markdown/plain text; **Copy to clipboard**; **Download** (.md/.txt, generated client-side); **Open a Google Doc copy** if `gdoc` link present. No account needed in MVP.
- **How the JSON powers the editor:** `editor.sections[]` → render nav + fields; `placeholder`/`default`/`help` drive UX; `required` drives a completeness meter; `exportFormats` drives the export menu. The compiler walks sections → emits `## {title}` + field values → markdown.
- **Fields/sections/placeholders:** see §9.4.
- **PRD vs strategy vs interview guide:** same engine, different `sections` config. PRD = summary/problem/goals/requirements/metrics; strategy = vision/insight/where-to-play/how-to-win/bets/risks; interview guide = role/competencies/questions/scoring rubric. The editor is generic; templates differ only in JSON.
- **MVP vs later:** MVP = `structured` + `markdown` modes, localStorage autosave, export MD/TXT/clipboard. Later = block editor, cloud save (accounts), version history, real-time collab, PDF/Docs/Notion export, AI-assist ("draft this section").

**Editor layout (text wireframe):**
```
┌ Sections ─┐ ┌ Editor ───────────────────┐ ┌ Live preview ┐
│ ✓ Summary │ │ Summary *                 │ │ ## Summary   │
│ • Problem │ │ [ textarea: "We are…" ]   │ │ We are…      │
│ • Goals   │ │ Problem *                 │ │ ## Problem   │
│ • Reqs    │ │  Who [ text ]             │ │ …            │
│ • Metrics │ │  Pain [ textarea ]        │ │              │
└───────────┘ └───────────────────────────┘ └──────────────┘
[ Completeness 3/5 ]  [⧉ Copy] [⬇ Download ▾] [↻ Reset] [autosaved ✓]
```

## 9.4 Editable template JSON schema

```json
"editor": {
  "mode": "structured",                       // plain | markdown | structured | block
  "exportFormats": ["md","txt","clipboard"],  // drives export menu
  "sections": [
    {
      "id": "summary",
      "title": "Summary",
      "required": true,
      "help": "One paragraph: what & why.",
      "placeholder": "We are building … for … because …",
      "default": "",
      "type": "textarea"                        // textarea | text | list | fields | select | date
    },
    {
      "id": "problem",
      "title": "Problem",
      "required": true,
      "type": "fields",
      "fields": [
        { "id": "who", "label": "Who", "type": "text", "placeholder": "Segment…", "required": true },
        { "id": "pain", "label": "Pain", "type": "textarea", "placeholder": "Today they…" }
      ]
    },
    {
      "id": "goals", "title": "Goals & non-goals", "required": false,
      "type": "list", "placeholder": "Add a goal…", "default": []
    },
    {
      "id": "metrics", "title": "Success metrics", "required": true,
      "type": "list", "help": "North Star + guardrails."
    }
  ],
  "linkedGuides": ["guide-writing-prds"],
  "instructions": "Fill each section; export when done."
}
```
- **Field types:** `text, textarea, list, fields(group), select(options[]), date, checkbox`.
- **Defaults/placeholder/help/required** per section/field.
- **Optional sections:** `required:false` + a "add section" affordance.
- **Export/download formats:** `exportFormats[]` (+ any `downloads[]` for static/gdoc).
- **Linked guides:** `linkedGuides[]` resolved to related guide resources.

---

# 10) Frameworks section spec

## 10.1 Content model
Standard fields + `meta`: `whenToUse[]`, `whenNotToUse[]`, `inputs[]`, `steps[]`, `outputs[]`, `mistakes[]`, `example`, optional `diagram` (asset), `variants[]`, `relatedFrameworks[]`.

## 10.2 Framework categories (via tags)
prioritization, discovery, strategy, monetization, gtm, growth, retention, metrics, experimentation, roadmapping, product-sense, decision-making.

## 10.3 Framework detail page (`/frameworks/{slug}`)
```
Title [Framework]  ★  · Prioritization · Beginner
Summary
── When to use ──────────  ── When NOT to use ──────────
• bullet                    • bullet
── How it works (steps) ──  ── Inputs → Outputs ─────────
1. …                        Inputs: …  Outputs: …
── Common mistakes ──       ── Example ──────────────────
• …                         worked example / mini-case
── Related ──────────────────────────────────────────────
Template: RICE sheet ✎  · Guide: Run prioritization · Alt: ICE
[⬇ Cheatsheet]  [⧉ Copy summary]
```

## 10.4 Compare-framework UX
- Select 2–3 (checkbox on cards or "Compare" tray) → `/frameworks/compare?ids=rice,ice,kano`.
- Side-by-side table: when-to-use, inputs, effort, outputs, best-for tag, difficulty.
- CTA per column: open detail / use template.

## 10.5 Appearance across surfaces
- **Search results:** standard card + when-to-use one-liner (custom snippet).
- **Category page:** scoped grid, tag rail = framework tags, sort=popular, top-3 pinned.
- **Detail page:** §10.3.
- **Related modules:** appears as `framework-for` on templates/guides.

---

# 11) Specs for all other major sections

For each: purpose · intent · page types · content structure · JSON additions · search/filter · UI modules · relationships · **open behavior**.

### Guides
- **Purpose/intent:** teach how to do a thing well; "learn to do X."
- **Pages:** category `/guides` + detail `/guides/{slug}`.
- **Content:** markdown `body` + TOC, callouts, linked artifacts. `readingTime`.
- **JSON:** uses `body`, `readingTime`, `related`.
- **Search/filter:** scope=guides, sort=newest, difficulty filter.
- **UI:** TOC sidebar, prose column, related artifacts rail.
- **Relationships:** `guide-for` ↔ frameworks/templates.
- **Open:** 🗎 detail.

### Playbooks
- **Purpose:** run a repeatable process (quarterly planning, launch, discovery sprint).
- **Pages:** `/playbooks`, `/playbooks/{slug}`.
- **Content:** `meta.phases[]` each `{title, steps[], roles[], duration, artifacts[]}`, `cadence`, linked templates/frameworks.
- **JSON additions:** `meta.phases`, `meta.cadence`, optional kit `downloads`.
- **Search/filter:** scope, tags, downloadable.
- **UI:** phase accordion, role chips, linked-template buttons (✎), kit download.
- **Relationships:** consumes templates (`part-of`), references frameworks.
- **Open:** 🗎 detail (+ kit ⬇).

### Tools directory
- **Purpose:** neutral evaluation of PM software.
- **Pages:** `/tools`, `/tools/{slug}`.
- **Content:** `meta.category, pricingTier, bestFor[], alternatives[], affiliate(bool)`.
- **JSON additions:** `meta` above; `externalUrl`.
- **Search/filter:** scope, category tag, pricing tier.
- **UI:** category grouping, pricing badge, "alternatives" row.
- **Relationships:** `alternative-to`; referenced by guides/playbooks.
- **Open:** ↗ external (+ thin 🗎 profile).

### Case studies / teardowns
- **Purpose:** learn from real decisions/outcomes.
- **Pages:** `/case-studies`, `/case-studies/{slug}`.
- **Content:** `meta.context, decisions[], outcomes[], lessons[], frameworksUsed[]`; `source ↗`.
- **Search/filter:** scope, domain tags (b2b/marketplace), newest.
- **UI:** context→decision→outcome→lesson flow; "frameworks used" chips.
- **Relationships:** `example-of` frameworks/guides.
- **Open:** 🗎 detail (+ ↗ source).

### AI for PMs
- **Purpose:** AI workflows for PM work + building AI products.
- **Pages:** `/ai` hub (tag-driven cross-type), detail per resource, prompt-pack pages.
- **Content:** `prompt_pack` type with `meta.prompts[]` `{title, prompt, use, model}`; AI frameworks/guides tagged `ai-pm`.
- **JSON additions:** `meta.prompts`, `meta.model`.
- **Search/filter:** tag=ai-pm scope, sub-tags llm/prompts/ai-eval.
- **UI:** copy-prompt buttons, model badge, prompt cards.
- **Relationships:** cross-links to discovery/experimentation frameworks.
- **Open:** 👁 inline copy / 🗎.

### Interview prep
- **Purpose:** structured prep for PM loops.
- **Pages:** `/interview` hub, `/interview/{slug}` (banks), per-question optional.
- **Content:** `interview` type `meta.questions[]` `{q, type, rubric, sampleAnswerOutline}`, `byCompany` tag, `round` (product-sense/estimation/behavioral/strategy/technical).
- **JSON additions:** `meta.questions`, `meta.round`, `meta.company`.
- **Search/filter:** scope, round tag, company tag, difficulty.
- **UI:** question bank list, filter by round, optional ✎ answer scratchpad (local), framework links for structuring answers.
- **Relationships:** links to frameworks (e.g., CIRCLES) + glossary.
- **Open:** 🗎 detail (+ ✎ scratchpad).

### Glossary
- **Purpose:** fast definitions.
- **Pages:** `/glossary` (A–Z index), `/glossary/{slug}`.
- **Content:** `summary` = definition, `meta.example`, related terms/frameworks.
- **Search/filter:** scope, A–Z, tag.
- **UI:** alpha nav, compact list, inline preview on hover/click.
- **Relationships:** `guide-for`/`framework-for` cross-links; dense internal linking (SEO moat).
- **Open:** 👁 preview / 🗎 (small).

### Learning paths
- **Purpose:** ordered curricula across resources.
- **Pages:** `/paths`, `/paths/{slug}`.
- **Content:** `meta.steps[]` `{id, note}`, `estimatedHours`.
- **Search/filter:** scope, difficulty.
- **UI:** numbered step list w/ resource cards, progress (local), "next" CTA.
- **Relationships:** aggregates any resource type.
- **Open:** 🗎 path page.

### Collections / bundles
- **Purpose:** curated themed sets ("New PM starter kit").
- **Pages:** `/collections`, `/collections/{slug}`.
- **Content:** `meta.items[]`, optional `downloads` (zip).
- **UI:** grouped grid + bundle download.
- **Open:** 🗎 (+ optional bundle ⬇).

### Calculators / worksheets / checklists
- **Calculators** (`/calculators/{slug}`): `meta.inputs[]` `{id,label,type,default}`, `meta.formula` (id or function key), live output, explanation. **Open:** 🗎 interactive; copy result. Examples: CAC, LTV, LTV:CAC, payback, ICE/RICE score, funnel conversion, runway.
- **Worksheets:** editable single-purpose artifacts (persona, JTBD canvas) — reuse editor engine. **Open:** ✎ / ⬇.
- **Checklists:** `meta.items[]` `{label, help}`; checkable preview (local state). **Open:** 👁 checkable inline / ⬇.

---

# 12) Svelte / SvelteKit implementation architecture

## 12.1 App architecture
- **Framework:** SvelteKit, TypeScript, Svelte 5 runes, `adapter-static` (prerender all known routes), Vite.
- **Routing:** file-based (see §12.3). Detail/category pages prerendered from JSON via `entries()`.
- **State:** central rune-based `searchStore` (`$state`/`$derived`); URL is the source of truth for shareable state (sync via `replaceState`/`goto`).
- **Data load:** `src/routes/+layout.ts` `load()` imports `resources.json` + `taxonomy.json`, builds the search index once, exposes via context/store. Prerender-friendly (static import).
- **Search state management:** mutate `search` rune; `results = $derived(runSearch(...))`; effects sync `search ↔ URL`.
- **Filters ↔ URL:** serialize `{q,scope,tags,src,diff,flags,sort}` to query params; parse on load; `pushState` on navigations, `replaceState` on keystroke.
- **Category pane selection:** sets `scope`; on dedicated category routes, `scope` is fixed by the route.
- **Editor state:** local `$state` per template seeded from JSON; autosave to `localStorage`; export utils pure functions.

## 12.2 Component breakdown

| Component | Purpose | Props | State | Events | Deps |
|---|---|---|---|---|---|
| `SiteHeader` | nav + palette + theme | `links` | — | open-palette | ThemeToggle |
| `CommandPalette` | ⌘K global search | — | open, q | navigate | searchStore, index |
| `SearchHero` | headline + search + toggle | `placeholder` | — | — | SearchBar, SourceToggle |
| `SearchBar` | query input | `value` | focus | input, enter, nav | searchStore |
| `SourceToggle` | on/off/all | `value` | — | change | searchStore |
| `ResourcePaneTabs` | panes + counts | `counts`, `active` | — | select | taxonomy |
| `TagFilterBar` | dynamic tags | `tags`, `selected` | expanded | toggle, clear | taxonomy |
| `ResultsToolbar` | count + sort + pills | `count`, `filters` | — | sort, clear | searchStore |
| `SearchResultsGrid` | render results | `results` | — | — | ResourceCard, virtual list |
| `ResourceCard` | generic card | `resource` | bookmarked | open, bookmark | DownloadActions |
| `FrameworkCard`/`TemplateCard`/`ToolCard` | specialized cards | `resource` | — | open/edit/download/visit | — |
| `FeaturedShelf` | pre-query content | `items` | — | — | ResourceCard |
| `EmptyState`/`NoResults` | states | `query`,`scope` | — | clear | — |
| `ResourceDetailLayout` | detail shell | `resource` | — | — | RelatedResources, DownloadActions |
| `MarkdownBody` | render MD safely | `content` | — | — | marked+DOMPurify/mdsvex |
| `TemplateEditor` | editor engine | `template` | model | export, save | EditorSection, exporters |
| `EditorSection` | one section | `section`,`value` | — | change | field inputs |
| `DownloadActions` | export/download menu | `downloads`,`getContent` | — | download | exporters |
| `RelatedResources` | typed cross-links | `related` | — | open | ResourceCard |
| `CompareTable` | framework compare | `ids` | — | — | resources |
| `Calculator` | compute widget | `config` | inputs | compute | formula engine |
| `Checklist` | checkable list | `items` | checked | — | localStorage |
| `ThemeToggle` | light/dark | — | theme | — | — |

## 12.3 Routes / pages
```
/                          home/search
/search                    deep-linked search (alias of home, hydrated from URL)
/frameworks                category
/frameworks/[slug]         framework detail
/frameworks/compare        compare view
/templates                 category
/templates/[slug]          template detail
/templates/[slug]/edit     template editor
/guides , /guides/[slug]
/playbooks , /playbooks/[slug]
/tools , /tools/[slug]
/case-studies , /case-studies/[slug]
/ai                        AI hub (tag-driven)
/interview , /interview/[slug]
/glossary , /glossary/[slug]
/calculators , /calculators/[slug]
/checklists , /checklists/[slug]
/paths , /paths/[slug]
/collections , /collections/[slug]
/contribute , /about , /newsletter , /pro
/[...404]
```

## 12.4 Search implementation options (MVP → scale)
1. **MVP:** purely client-side over one `resources.json` with **MiniSearch/FlexSearch**; prebuild the index at compile time (Vite plugin / `+layout.ts`) and ship as JSON for instant first query. Works to ~2–5k resources comfortably.
2. **Precomputed index** shipped alongside data (avoids per-load indexing cost).
3. **Split data by type** when JSON > ~1–2 MB; lazy-load non-active types.
4. **Progressive migration:** when dataset/UGC grows, move to a hosted search (Algolia/Typesense/Meilisearch) behind the same `runSearch()` interface — only the adapter changes, UI unchanged.

## 12.5 Performance & scaling
- **One JSON is fine** until ~1–2 MB / a few thousand items. Keep `body` out of the search payload (load detail content lazily per route).
- **Split** by type and **lazy-load** when large; ship a slim index (title/summary/tags/type) separately from full bodies.
- **Preserve simplicity while scaling:** keep `runSearch()`/data access behind an interface so storage can change (JSON → split JSON → API) without touching components.
- **SEO:** prerender all detail/category/glossary pages (static), real meta from `seo` block, sitemap from data, internal links via `related`. Search-first home still has crawlable category + detail pages (the SEO surface).
- **Static generation:** `adapter-static` + `prerender=true`; `entries()` enumerate slugs from JSON. Add Node adapter only when accounts/cloud-save arrive.

---

# 13) Page-by-page build specification

| Page | Route | Purpose | Key components | Data deps | Primary action | Secondary | SEO fields | Analytics | Empty/error | Mobile |
|---|---|---|---|---|---|---|---|---|---|---|
| Home/Search | `/` | retrieve resources | SearchHero, ResourcePaneTabs, TagFilterBar, ResultsToolbar, SearchResultsGrid, FeaturedShelf | resources, taxonomy, index | run search | open/edit/download | site title/desc, OG | search_query, pane_select, tag_toggle, result_open | EmptyState/NoResults | sticky search, chip panes, filter sheet |
| Search (deep link) | `/search` | shareable query | same | same | same | same | noindex (canonical→/) | share_open | same | same |
| Category | `/{type}` | browse/scope+SEO | scoped header, TagFilterBar, grid | scoped resources | open | filter | type title/desc | category_view | "no items" | scroll grid |
| Framework detail | `/frameworks/[slug]` | apply framework | ResourceDetailLayout, MarkdownBody, RelatedResources, DownloadActions | resource | use template/related | copy, ⬇ cheatsheet | seo block | framework_view, related_click | 404 | stacked sections |
| Template detail | `/templates/[slug]` | evaluate template | DetailLayout, preview, DownloadActions | resource | Open editor ✎ | ⬇ / ↗ / copy | seo | template_view, edit_start, download | 404 | action bar pinned bottom |
| Template editor | `/templates/[slug]/edit` | fill template | TemplateEditor, EditorSection, DownloadActions | resource.editor + local | export | copy, save, reset | noindex | editor_open, section_edit, export | restore-from-local prompt | single col, section dropdown |
| Guide | `/guides/[slug]` | learn | DetailLayout, MarkdownBody (TOC), Related | resource.body | read | copy, related | seo | guide_view, read_complete | 404 | collapsible TOC |
| Playbook | `/playbooks/[slug]` | run process | DetailLayout, phase accordion, linked templates | resource.meta | use template | ⬇ kit | seo | playbook_view, template_jump | 404 | accordions |
| Tool | `/tools/[slug]` | evaluate tool | thin DetailLayout, pricing badge, alternatives | resource.meta | Visit ↗ | alternatives | seo | tool_view, visit_click | 404 | compact |
| Glossary term | `/glossary/[slug]` | define | small DetailLayout, related terms | resource | read | related | seo (rich) | term_view | 404 | compact |
| Learning path | `/paths/[slug]` | curriculum | path overview, step list, progress | resource.meta + local | start | mark complete | seo | path_start, step_complete | 404 | stacked steps |
| Collection | `/collections/[slug]` | themed set | grouped grid, bundle ⬇ | resource.meta | open items | ⬇ bundle | seo | collection_view, bundle_download | 404 | stacked |
| Calculator | `/calculators/[slug]` | compute | Calculator, explanation | resource.meta | compute | copy result | seo | calc_use | invalid input msg | stacked inputs |
| Contribute | `/contribute` | submit | form | static | submit | guidelines | basic | submit_resource | success/fail | form |
| About | `/about` | trust | prose | static | newsletter | — | basic | — | — | prose |
| Newsletter | `/newsletter` | capture | signup, archive | static/json | subscribe | read issues | basic | subscribe | success | form |
| Pro | `/pro` | monetize | plan, FAQ | static | subscribe | — | basic | upgrade_click | — | stacked |
| 404 | `/[...404]` | recover | search box, popular | static | search | popular links | noindex | 404_view | — | search |

---

# 14) Launch content blueprint (starter inventory)

Targets (reconciled total ≈ **300**). Each item below lists **title — why it belongs — tags — source — open behavior/needs**. (Abbrev: I=internal, E=external; behaviors per legend.)

### Frameworks (25)
| # | Title | Why | Tags | Src | Needs |
|---|---|---|---|---|---|
|1|RICE Scoring|canonical prioritization|prioritization,roadmap|I|🗎+👁, cheatsheet ⬇|
|2|ICE|lightweight prio|prioritization|I|🗎|
|3|Kano Model|satisfaction vs features|prioritization,discovery|I|🗎+diagram|
|4|MoSCoW|scoping|prioritization,planning|I|🗎|
|5|Weighted Scoring|custom criteria|prioritization|I|🗎+template|
|6|JTBD|discovery foundation|discovery,product-sense|I|🗎|
|7|Opportunity Solution Tree|continuous discovery|discovery|I|🗎+diagram|
|8|North Star Framework|metrics alignment|metrics,strategy|I|🗎|
|9|AARRR (Pirate Metrics)|growth funnel|growth,metrics|I|🗎|
|10|HEART (Google)|UX metrics|metrics,analytics|I|🗎|
|11|Product Strategy Stack|strategy clarity|strategy|I|🗎|
|12|Working Backwards (PR/FAQ)|Amazon method|strategy,writing|I|🗎+template|
|13|GE/McKinsey or 2x2 Prioritization|portfolio view|prioritization,strategy|I|🗎|
|14|Hooked Model|habit products|retention,growth|I|🗎|
|15|Bullseye (GTM channels)|channel selection|gtm,growth|I|🗎|
|16|Pricing: Van Westendorp|pricing research|pricing,monetization|I|🗎+calculator|
|17|Value-Based Pricing|monetization|pricing,monetization|I|🗎|
|18|Crossing the Chasm|adoption|gtm,strategy|I|🗎|
|19|CIRCLES (design Qs)|interview/product sense|product-sense,interview-prep|I|🗎|
|20|Double Diamond|discovery→delivery|discovery,execution|I|🗎|
|21|OKRs|goal setting|okrs,strategy|I|🗎+template|
|22|Cost of Delay / WSJF|economic prio|prioritization|I|🗎|
|23|Four Fits (Growth)|product/market/channel/model|growth,gtm|I|🗎|
|24|Eisenhower Matrix|exec prioritization|execution,decision-making|I|🗎|
|25|AI Product Eval Framework|AI PM rigor|ai-pm,ai-eval,metrics|I|🗎|

### Templates (40) — *bold = editor-enabled*
PRD**, Lean PRD/one-pager**, Product Strategy doc**, Vision doc**, OKR planner**, Roadmap (now/next/later), Quarterly plan**, Experiment brief / A-B design**, Hypothesis canvas**, User research plan**, Interview script**, Usability test plan, Persona**, JTBD canvas**, Customer journey map, Competitive analysis**, Market sizing (TAM/SAM/SOM) [calculator-linked], GTM brief**, Launch plan, Launch checklist (checklist), Press release / PR-FAQ**, Feature spec**, Tech-PM RFC**, Post-mortem / incident review**, Decision log**, Stakeholder map**, RACI**, Standup/async update**, Sprint review notes, Status report**, KPI dashboard (sheet, ↗/⬇), North Star tree, Pricing model (sheet), Sales/PM handoff brief**, Beta program plan**, Customer feedback tracker, Roadmap comms email**, 30-60-90 day plan**, Discovery sprint plan, Prioritization sheet (RICE)** .
- Tags by item (prd/strategy/roadmap/experiment-design/user-research/gtm/launch/pricing/okrs…). Mostly **I**; KPI dashboard + pricing sheet can be **E** (Sheets copy) or ⬇. All editable ones: ✎+🗎+⬇.

### Playbooks (30)
Quarterly planning, Continuous discovery cadence, 0→1 product, Product launch (tiered), Pricing change rollout, Experimentation program setup, Onboarding optimization, Activation improvement, Churn reduction, Retention program, Roadmap creation, Stakeholder alignment, Exec updates cadence, Sprint operating rhythm, Async PM operating system, User research operations, Beta program, GTM for B2B, GTM for B2C, PLG motion, Sales-led→PLG transition, Feature deprecation/sunset, Incident & postmortem, Competitive response, Annual strategy planning, OKR rollout, New-PM onboarding (team), Discovery sprint, Data instrumentation rollout, AI feature shipping playbook. Tags per lifecycle/domain. **I**, 🗎 (+ kit ⬇ for several), linked templates.

### Guides (40)
Writing great PRDs, Choosing a North Star metric, Running effective discovery interviews, Prioritization in practice, Building a roadmap that survives, Stakeholder management 101, Influencing without authority, Storytelling for PMs, Writing strategy docs, Setting OKRs that work, Metrics that matter (and vanity metrics), Designing experiments, Reading an A/B result correctly, Activation deep-dive, Retention analysis, Churn diagnosis, Pricing for PMs, Positioning & messaging, Working with engineers, Working with design, Working with data science, Managing up, Saying no, Roadmap communication, Discovery vs delivery, JTBD in practice, Competitive analysis, Market sizing, Launch comms, Beta programs, From IC to manager, PM career ladders, Getting promoted, Product sense, Estimation, Technical concepts for PMs, Using AI in PM workflows, Prompting for PMs, Building AI features responsibly, Instrumentation & tracking plans. Tags per topic. **I**, 🗎.

### Tools (35)
Analytics: Amplitude, Mixpanel, PostHog, GA4, Heap. Experimentation: Optimizely, LaunchDarkly, Statsig, GrowthBook. Roadmap/PM: Productboard, Aha!, Jira, Linear, Shortcut. Discovery/research: Dovetail, Maze, UserTesting, Hotjar, Notion. Feedback: Canny, Pendo. Whiteboard/docs: Miro, FigJam, Figma, Confluence. Surveys: Typeform, SurveyMonkey. Data viz/SQL: Looker, Metabase, Hex. AI PM: ChatGPT, Claude, Notion AI, Perplexity, Gamma. Tags = analytics/roadmap/research/experimentation/ai-pm. **E**, ↗ (+ thin 🗎). Neutral metadata, mark `affiliate` honestly.

### Case studies / teardowns (20)
Superhuman PMF survey, Slack's GTM, Notion's PLG, Figma multiplayer wedge, Duolingo gamification/retention, Spotify Wrapped growth loop, Airbnb 11-star experience, Amazon Working Backwards examples, Stripe docs-as-product, Linear's opinionated PM, Calendly viral loop, Dropbox referral program, Canva onboarding, Loom async wedge, Zoom freemium, HubSpot freemium→enterprise, Atlassian no-sales model, Shopify ecosystem/platform, OpenAI ChatGPT launch, Midjourney community-led growth. Tags = growth/b2b/marketplace/platform/pricing/launch. 🗎 + ↗ source. Mix I (analysis) referencing E sources.

### AI for PMs (20)
PM prompt pack (discovery), PM prompt pack (PRD drafting), PM prompt pack (competitive analysis), Prompt pack (user research synthesis), Prompt pack (data/SQL helper), Prompt pack (strategy review), AI product eval framework, LLM evals for PMs guide, Building RAG features guide, Prompt engineering for PMs guide, AI discovery workflow, AI-assisted roadmap, AI feature scoping template, AI risk/safety checklist, Model selection guide for PM features, Cost/latency tradeoffs for AI features, Hallucination mitigation patterns, Human-in-the-loop design, AI metrics & guardrails, AI tools roundup. Tags = ai-pm/llm/prompts/ai-eval. Prompt packs 👁 copy + 🗎; guides 🗎. Mostly I.

### Interview prep (22)
Product sense question bank, Product design Qs, Estimation/market sizing Qs, Analytical/metrics Qs, Behavioral/leadership Qs, Strategy Qs, Technical Qs for PMs, Execution/RCA Qs, "Favorite product" prep, A/B test case Qs, Prioritization case Qs, Company-specific: Google/Meta/Amazon/Microsoft/Stripe banks, CIRCLES walkthrough, Metrics framework for answers, RCA framework, Estimation framework, Behavioral STAR guide, 30-60-90 for new PM role, Negotiation guide, Portfolio/case study prep, Mock interview structures. Tags = interview-prep + round/company. 🗎 (+ ✎ scratchpad). Mostly I.

### Glossary (52)
North Star Metric, OKR, KPI, MVP, PMF, ICP, JTBD, PRD, MRD, Roadmap, Backlog, Epic, User story, Acceptance criteria, Sprint, Velocity, Burndown, A/B test, Cohort, Retention, Churn, DAU/MAU, Stickiness, Activation, Aha moment, Funnel, Conversion rate, CAC, LTV, LTV:CAC, Payback period, ARPU, MRR/ARR, NRR, Gross margin, NPS, CSAT, CES, TAM/SAM/SOM, Positioning, Value prop, GTM, PLG, SLG, Freemium, Land-and-expand, Feature flag, Canary release, Dogfooding, North Star tree, Guardrail metric, Counter metric. Tags = metrics/strategy/growth/agile. 👁/🗎. I.

### Calculators / worksheets / checklists (≈16, fills to ~300)
Calculators: CAC, LTV, LTV:CAC, Payback, RICE score, ICE score, Funnel conversion, TAM/SAM/SOM, Runway, A/B sample size. Worksheets: Persona, JTBD canvas. Checklists: Launch checklist, Discovery readiness, Onboarding audit, PRD review checklist. Tags per topic. Calculators 🗎 interactive; worksheets ✎/⬇; checklists 👁/⬇. I.

**Inventory total:** 25+40+30+40+35+20+20+22+52+16 = **300**. (Plus a handful of learning paths & collections built *from* these, not counted as new content.)

**Learning paths (launch 6):** New PM Starter, Prioritization Mastery, Discovery & Research, Metrics & Growth, Strategy for PMs, PM Interview Crash Course.
**Collections (launch 6):** New PM Starter Kit, Founder PM Kit, Growth PM Kit, B2B SaaS PM Kit, AI PM Kit, Interview Prep Kit.

---

# 15) SEO, discoverability & content moat

- **Search-first home implication:** the homepage is an app shell (thin for SEO); **SEO surface = prerendered category + detail + glossary pages**. Ensure every resource has a crawlable static URL and rich `seo` block.
- **Category landing strategy:** `/frameworks`, `/templates`, etc. target head terms ("product manager templates", "prioritization frameworks") with an intro paragraph + the full scoped list (real, crawlable).
- **Detail page strategy:** long-tail per resource ("RICE scoring framework", "PRD template"). Structured, scannable, internally linked.
- **Glossary strategy:** 52+ definition pages = high-coverage long-tail + featured-snippet bait; use definition + example schema (`DefinedTerm`). Dense internal links to frameworks/guides — the cheapest, strongest moat.
- **Long-tail framework/template pages:** one URL per artifact; FAQ blocks; "when to use" answers map to People-Also-Ask.
- **Internal linking model:** `related[]` renders cross-links on every page; auto-generate inverse links; glossary terms auto-link within guide bodies. This builds a dense topical graph (topical authority).
- **Structured data:** `Article`/`HowTo` (guides/playbooks), `DefinedTerm` (glossary), `SoftwareApplication` (tools), `BreadcrumbList`, `FAQPage`.
- **Free vs premium:** keep all framework/guide/glossary/tool content free (SEO + trust); gate *advanced* template packs, prompt packs, cohort access (no SEO cost).
- **Content moat / defensibility:** (1) breadth across types in one index (hard to replicate), (2) curation + consistent metadata (trust), (3) on-site editing (utility lock-in), (4) the internal-link graph (topical authority), (5) freshness on AI-for-PM (fast-moving, evergreen demand).
- **Freshness mechanisms:** `updatedAt` shown; "new" badges; monthly "what's new" newsletter; expert curation notes; **user submissions** (`/contribute`) reviewed into the dataset; periodic dead-link checks for external resources.

---

# 16) Monetization strategy

| Model | What it is | Who buys | Stays free | Fit in product | Integrate without ruining UX |
|---|---|---|---|---|---|
| **Free hub + newsletter** | core library + monthly digest | everyone | all core content | foundation/top-of-funnel | unobtrusive footer + `/newsletter` |
| **Pro membership** | advanced templates, cloud save, version history, AI-assist in editor, premium paths | working PMs | frameworks/guides/glossary/tools | `/pro`; ✎ editor upsell at save/export | soft gate (preview free, save/AI gated), no nags in search |
| **Template packs** | curated downloadable bundles (Notion/Sheets) | new PMs, founders | individual on-site templates | collections → premium bundles | "Get the pack" button on collection pages only |
| **Prompt packs** | premium AI prompt libraries | AI PMs | sample prompts free | `/ai` | copy free samples; full pack gated |
| **Sponsored tool directory / affiliate** | clearly-labeled placements/affiliate links | tool vendors | neutral profiles | `/tools` | label sponsorship; never alter neutral ranking/metadata; affiliate flag honest |
| **Workshops / cohorts** | live training | aspiring/junior PMs, teams | guides | linked from learning paths | banner on relevant paths only |
| **Interview prep product** | structured course + mock bank + scratchpad pro | candidates | sample question banks | `/interview` | gated advanced banks/rubrics |
| **Consulting/advisory** | "build your team's PM OS" | PM leaders | operating-cadence kits | from `/pro`/about | contact CTA, not in search |
| **Community / job board** | Slack/Discord + jobs | all | — | new top-level later | separate surface; keep search clean |

**Principle:** monetization never degrades search. Gated items still appear in results (clearly marked, with free preview); the search box is sacred.

---

# 17) MVP roadmap & build sequence

## Phase 1 — MVP (launch)
**Pages:** Home/Search, category pages, generic resource detail, framework detail, template detail, **template editor**, guide page, glossary index+term, tool page, 404, about, newsletter.
**Data model:** full common schema + `framework`, `template`(+`editor`), `guide`, `glossary`, `tool` `meta`. One `resources.json` + `taxonomy.json`.
**Resource types at launch:** framework, template, guide, glossary, tool (+ checklist if cheap). ~150–300 items (start ~120, ramp to 300).
**Search/filter:** client-side MiniSearch; scope panes; dynamic tags; on/off-site toggle; difficulty filter; URL state; ⌘K palette.
**Editor scope:** `structured` + `markdown` modes; localStorage autosave; export MD/TXT/clipboard. PRD, strategy, one-pager, OKR, post-mortem, persona to start.
**Leave out:** accounts/cloud save, block editor, compare view, calculators logic depth, learning-path progress, premium gating, UGC review pipeline, sponsored directory.

## Phase 2
Playbooks, case studies, interview prep hub, AI-for-PM hub + prompt packs, calculators, checklists (interactive), learning paths + collections, compare-frameworks, recently-viewed/bookmarks polish, contribute form, newsletter automation, structured data/SEO pass, split-data + prebuilt index for scale.

## Phase 3
Accounts + cloud save + version history, block editor + AI-assist ("draft this section"), premium membership + packs gating, hosted search (Algolia/Typesense) behind same interface, community/job board, sponsored/affiliate directory, analytics dashboards, UGC submission→review pipeline, exports to Docs/Notion/PDF, collaborative editing.

## Recommended Svelte component build order
1. Data layer: load JSON, `taxonomy`, build index, `searchStore`.
2. `SearchBar` + `searchStore` + `runSearch`.
3. `ResultsToolbar` + `SearchResultsGrid` + `ResourceCard`.
4. `ResourcePaneTabs` (scope+counts).
5. `SourceToggle` + `TagFilterBar` + URL sync.
6. `FeaturedShelf`, `EmptyState`, `NoResults`.
7. `SiteHeader`, `ThemeToggle`, `CommandPalette`.
8. `ResourceDetailLayout` + `MarkdownBody` + `RelatedResources` + `DownloadActions`.
9. Type detail variants (framework/template/tool/guide/glossary).
10. `TemplateEditor` + `EditorSection` + exporters.
11. Category routes + prerender entries.
12. SEO/meta, sitemap, 404, about/newsletter.

## Recommended JSON authoring order
1. `taxonomy.json` (types, facet groups, tags).
2. Glossary (52 — fast, builds internal-link targets).
3. Frameworks (25 — high value, structured `meta`).
4. Templates (40, with `editor` blocks).
5. Guides (40).
6. Tools (35).
7. `featured[]`, `collections`, `paths`.
8. Phase-2 types as built.

## Launch checklist
- [ ] All Phase-1 routes prerender with no console errors.
- [ ] Search returns correct, ranked results across all seeded types.
- [ ] Pane counts match dataset; tags recompute per scope.
- [ ] On/off-site toggle filters correctly; external links `rel=noopener`, labeled.
- [ ] Editor: open → fill → autosave → export MD/TXT/copy verified for ≥3 templates.
- [ ] Every resource has required fields (build-time schema lint passes).
- [ ] Tag lint passes (no unknown tags).
- [ ] Mobile: sticky search, chip panes, filter sheet usable.
- [ ] A11y: keyboard path, ARIA roles, focus rings, color-independent badges.
- [ ] SEO: per-page meta, sitemap, structured data on glossary/guides/tools.
- [ ] Lighthouse: perf ≥95, a11y ≥95.
- [ ] Dead-link check on external resources.
- [ ] Analytics events firing (search, open, edit, download).

## Metrics to track
Activation: % sessions running ≥1 search; searches/session. Engagement: result open rate, editor opens, exports/downloads, copy events, bookmark rate. Retention: returning users, ⌘K usage. Content: zero-result query rate (content gaps), top queries, top resources, dead-link rate. Growth: newsletter conversion, organic landing on detail/glossary, internal-link click-through. North Star candidate: **weekly resources used (opened/edited/downloaded) per active PM.**

---

# 18) Build-ready output

## Final sitemap
```
/
/search
/frameworks
/frameworks/[slug]
/frameworks/compare        (Phase 2)
/templates
/templates/[slug]
/templates/[slug]/edit
/guides
/guides/[slug]
/playbooks                 (Phase 2)
/playbooks/[slug]          (Phase 2)
/tools
/tools/[slug]
/case-studies              (Phase 2)
/case-studies/[slug]       (Phase 2)
/ai                        (Phase 2)
/interview                 (Phase 2)
/interview/[slug]          (Phase 2)
/glossary
/glossary/[slug]
/calculators               (Phase 2)
/calculators/[slug]        (Phase 2)
/checklists
/checklists/[slug]
/paths                     (Phase 2)
/paths/[slug]              (Phase 2)
/collections               (Phase 2)
/collections/[slug]        (Phase 2)
/contribute
/about
/newsletter
/pro                       (Phase 3)
/[...404]
```

## Final JSON top-level schema
```json
{
  "meta": { "version": "string", "generatedAt": "ISO", "schemaVersion": 1 },
  "taxonomy": {
    "types":   [ { "id": "", "label": "", "pluralLabel": "", "icon": "", "defaultOpen": "detail|preview|editor|external|download", "order": 0 } ],
    "facetGroups": [ { "id": "", "label": "", "tags": [] } ],
    "tags":    [ { "id": "", "label": "", "group": "", "aliases": [], "description": "" } ],
    "difficulties": ["beginner","intermediate","advanced"]
  },
  "resources": [
    {
      "id": "", "type": "", "slug": "", "title": "", "summary": "",
      "description": "", "body": { "format": "markdown", "content": "", "toc": true },
      "tags": [], "difficulty": "", "source": "internal|external",
      "openBehaviors": ["detail","preview","editor","external","download"],
      "primaryAction": "", "externalUrl": "",
      "canonicalSource": { "name": "", "url": "", "author": "" },
      "downloads": [ { "label": "", "format": "", "url": "", "generated": false, "size": 0 } ],
      "editor": {
        "mode": "structured|markdown|plain|block",
        "exportFormats": [], "instructions": "", "linkedGuides": [],
        "sections": [ { "id": "", "title": "", "required": false, "type": "", "help": "",
                        "placeholder": "", "default": null,
                        "fields": [ { "id": "", "label": "", "type": "", "placeholder": "", "required": false } ] } ]
      },
      "related": [ { "id": "", "relation": "" } ],
      "status": { "featured": false, "new": false, "popular": false, "deprecated": false },
      "seo": { "title": "", "description": "", "ogImage": "", "keywords": [] },
      "searchMeta": { "keywords": [], "boost": 1 },
      "meta": {},
      "readingTime": 0, "authors": [ { "name": "", "url": "" } ],
      "createdAt": "ISO", "updatedAt": "ISO"
    }
  ],
  "collections": [ { "id": "", "slug": "", "title": "", "summary": "", "items": [], "downloads": [] } ],
  "paths": [ { "id": "", "slug": "", "title": "", "summary": "", "steps": [ { "id": "", "note": "" } ], "estimatedHours": 0 } ],
  "featured": []
}
```

## Final Svelte route map
```
src/routes/
  +layout.ts                 # load JSON + build index → context
  +layout.svelte             # header, theme, footer, palette
  +page.svelte               # Home/Search
  search/+page.svelte        # deep-linked search (hydrate from URL)
  frameworks/+page.svelte
  frameworks/[slug]/+page.svelte
  frameworks/compare/+page.svelte
  templates/+page.svelte
  templates/[slug]/+page.svelte
  templates/[slug]/edit/+page.svelte
  guides/+page.svelte
  guides/[slug]/+page.svelte
  playbooks/+page.svelte
  playbooks/[slug]/+page.svelte
  tools/+page.svelte
  tools/[slug]/+page.svelte
  case-studies/+page.svelte
  case-studies/[slug]/+page.svelte
  ai/+page.svelte
  interview/+page.svelte
  interview/[slug]/+page.svelte
  glossary/+page.svelte
  glossary/[slug]/+page.svelte
  calculators/+page.svelte
  calculators/[slug]/+page.svelte
  checklists/+page.svelte
  checklists/[slug]/+page.svelte
  paths/+page.svelte
  paths/[slug]/+page.svelte
  collections/+page.svelte
  collections/[slug]/+page.svelte
  contribute/+page.svelte
  about/+page.svelte
  newsletter/+page.svelte
  pro/+page.svelte
  +error.svelte              # 404
src/lib/
  data/resources.json, taxonomy.json, collections.json, paths.json
  stores/search.svelte.ts
  search/index.ts            # buildIndex, runSearch, deriveCounts, topTags
  search/adapter.ts          # storage interface (json → api swap point)
  utils/exporters.ts         # md/txt/clipboard
  components/ … (see below)
```

## Final component list
```
SiteHeader, SiteFooter, ThemeToggle, CommandPalette
SearchHero, SearchBar, SourceToggle
ResourcePaneTabs, TagFilterBar, ResultsToolbar, FilterDrawer
SearchResultsGrid, ResourceCard, FrameworkCard, TemplateCard, ToolCard,
  GlossaryCard, FeaturedShelf
EmptyState, NoResults, ActiveFilterPills
ResourceDetailLayout, MarkdownBody, RelatedResources, DownloadActions,
  MetadataBlock, SourceBadge, TypeBadge, TagChip, DifficultyBadge
TemplateEditor, EditorSection, EditorField, CompletenessMeter, ExportMenu
CompareTable, Calculator, Checklist, PromptCard, PathSteps, CollectionGrid
```

## Final MVP resource inventory (counts)
```
Frameworks   25   (🗎 + 👁, some ⬇ cheatsheet)
Templates    40   (✎ editor on ~24, ⬇ all, ↗ a few)   — MVP editor: PRD, strategy, one-pager, OKR, post-mortem, persona first
Guides       40   (🗎)
Glossary     52   (🗎 / 👁)
Tools        35   (↗ + thin 🗎)
Checklists    4   (👁 checkable / ⬇)
────────────────────────────────────
MVP total   196   (ramp toward 300 with Phase-2 types)
Phase 2 adds: Playbooks 30, Case studies 20, AI 20, Interview 22, Calculators 10, Worksheets 2  → ~300 total
Curated overlays: 6 learning paths, 6 collections
```

## Final build order
```
1.  Scaffold SvelteKit + TS + adapter-static + theme tokens
2.  taxonomy.json  → types, facet groups, tags
3.  Data layer: +layout.ts load + buildIndex + searchStore
4.  SearchBar → runSearch → ResultsToolbar → SearchResultsGrid → ResourceCard
5.  ResourcePaneTabs (scope + derived counts)
6.  SourceToggle + TagFilterBar + URL state sync
7.  FeaturedShelf / EmptyState / NoResults
8.  SiteHeader / ThemeToggle / CommandPalette
9.  Seed JSON: glossary(52) → frameworks(25) → templates(40) → guides(40) → tools(35)
10. ResourceDetailLayout + MarkdownBody + RelatedResources + DownloadActions
11. Type detail variants (framework, template, tool, guide, glossary)
12. TemplateEditor + EditorSection + exporters (structured + markdown)
13. Category routes + prerender entries()
14. SEO/meta + structured data + sitemap + 404
15. A11y + mobile pass + Lighthouse + launch checklist
16. Phase 2: playbooks, case studies, AI hub, interview, calculators, paths, collections, compare, hosted-search swap
```
