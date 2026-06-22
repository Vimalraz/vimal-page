# PM/OS — The Product Manager's Operating System

A search-first, resource-first operating system for product managers. One fast,
minimal, documentation-grade destination to find and use frameworks, templates,
playbooks, guides, tools, case studies, interview prep, glossary terms, and
checklists — curated, tagged, and instantly searchable.

Built with **SvelteKit (Svelte 5) + TypeScript**, statically generated, with a
client-side weighted-fuzzy search over a single JSON dataset. No backend required.

> Full product/UX/data/build spec lives in [`PM_PLATFORM_BLUEPRINT.md`](./PM_PLATFORM_BLUEPRINT.md).

## Quick start

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # static build → ./build
npm run preview    # preview the production build
npm run check      # type-check
```

## What's implemented (MVP)

- **Search-first homepage** — one hero search bar, category panes with derived
  counts, live results, featured shelf, empty state. Search state is shareable
  via the URL. Deliberately minimal: no nav bar, no filter clutter.
- **Live weighted search** — title/keyword/summary/body weighting, light fuzzy
  matching, status boosts, typeahead suggestions, `/` to focus, `⌘K` command palette.
  Type a topic (e.g. "prioritization") or click a category to scope.
- **Category pages** — scoped landing pages per resource type (`/frameworks`, …).
- **Detail pages** — type-aware layouts: framework (when-to-use / inputs / steps /
  outputs / mistakes / example), glossary, checklist (interactive), interview
  question banks, tool profiles, guide/case-study/playbook prose, template preview.
- **Interactive calculators** (`/calculators/[slug]`) — CAC, LTV, LTV:CAC, payback,
  RICE score, funnel conversion, runway, TAM/SAM/SOM. Live compute with verdicts.
- **Clickable tags** — every card and detail page shows its tags; click one to filter
  the whole library to that topic.
- **Downloadable templates** — each template renders as a white "sheet of paper"
  preview. Drop the sections you don't need, then download the scaffold as Markdown
  or copy it. No on-site editing.
- **Related resources**, dark documentation-grade theme, full keyboard + ARIA.

## Project structure

```
src/
  lib/
    data/           taxonomy.json + resources.json  ← the single content source
    components/      UI components (SearchBar, ResourceCard, TemplateEditor, …)
    stores/          search state (runes) + UI/bookmarks/theme
    search.ts        weighted-fuzzy search engine
    data.ts          typed accessors + derived counts/tags
    export.ts        markdown generation + download/copy
    markdown.ts      tiny safe markdown renderer
    types.ts         shared TypeScript types
  routes/
    +page.svelte                       home / search
    [category]/+page.svelte            category listing
    [category]/[slug]/+page.svelte     resource detail
    [category]/[slug]/edit/+page.svelte template editor
    about/  contribute/  +error.svelte
```

## Adding content

Everything is data-driven. Add a resource object to
`src/lib/data/resources.json` (see existing entries and the schema in the
blueprint, §6). Counts, panes, tags, search, and related links update
automatically. Tags must exist in `src/lib/data/taxonomy.json`.

## Roadmap

See blueprint §17 for the phased plan. Next up: AI-for-PM hub, calculators,
learning paths & collections, framework compare view, and (when the dataset
grows) swapping the search engine behind the same interface for a hosted index.
