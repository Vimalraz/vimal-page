<script lang="ts">
	import { resources } from '$lib/data';
	import { runSearch } from '$lib/search';
	import { search, clearFilters } from '$lib/stores/search.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import ResourceCard from '$lib/components/ResourceCard.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { data } = $props();
	let def = $derived(data.typeDef);

	// force scope to this category whenever the page is shown
	$effect(() => {
		search.scope = def.id;
		return () => {
			search.scope = 'all';
		};
	});

	const intros: Record<string, string> = {
		framework: 'Mental models and methods for thinking through product decisions — when to use each, the inputs, the steps, and the traps.',
		template: 'Reusable artifacts you can fill in on-site, export to Markdown, or copy — PRDs, strategy docs, OKRs, experiment briefs, and more.',
		guide: 'Practical, operator-grade how-tos for the work product managers actually do.',
		playbook: 'Repeatable, multi-step operating procedures for running the recurring rituals of product work.',
		tool: 'A neutral directory of the software product teams use — what it does, who it suits, and the alternatives.',
		case_study: 'Teardowns of real product decisions, the reasoning behind them, and what they teach.',
		interview: 'Structured preparation for PM interview loops — question banks and frameworks for answering them.',
		glossary: 'Clear, no-nonsense definitions of the terms product managers are expected to know.',
		checklist: 'Quick quality bars to run your work against before you ship.'
	};

	let results = $derived(runSearch(resources, { ...search, scope: def.id }));
	let hasFilters = $derived(!!search.q || search.tags.length > 0 || search.source !== 'all');
</script>

<svelte:head>
	<title>{def.plural} — PM/OS</title>
	<meta name="description" content={intros[def.id] ?? `${def.plural} for product managers.`} />
</svelte:head>

<section class="wrap chead">
	<div class="crumb mono"><a href="/">Home</a> <span>/</span> {def.plural}</div>
	<h1>{def.plural}</h1>
	<p class="intro">{intros[def.id] ?? ''}</p>
	<div class="sbwrap"><SearchBar size="compact" placeholder={`Search ${def.plural.toLowerCase()}…`} /></div>
</section>

<section class="wrap results">
	<div class="count mono">{results.length} {results.length === 1 ? def.label.toLowerCase() : def.plural.toLowerCase()}</div>
	{#if results.length}
		<div class="grid">
			{#each results as r, i (r.id)}<ResourceCard resource={r} index={i} />{/each}
		</div>
	{:else}
		<div class="empty">
			<p>Nothing matches yet.</p>
			{#if hasFilters}<button onclick={clearFilters}><Icon name="x" size={13} stroke={2} /> Clear filters</button>{/if}
		</div>
	{/if}
</section>

<style>
	.chead { padding-top: 36px; }
	.crumb { font-size: 11.5px; color: var(--ink-3); margin-bottom: 16px; }
	.crumb a:hover { color: var(--accent); }
	.crumb span { margin: 0 4px; }
	h1 { font-size: clamp(28px, 4vw, 38px); font-weight: 700; letter-spacing: -0.03em; }
	.intro { max-width: 620px; margin-top: 10px; font-size: 15.5px; line-height: 1.6; color: var(--ink-2); }
	.searchrow { display: flex; gap: 10px; align-items: center; margin-top: 24px; }
	.sbwrap { flex: 1; }
	.tagwrap { margin-top: 16px; min-height: 30px; }
	.results { margin-top: 28px; }
	.count { font-size: 12px; color: var(--ink); font-weight: 500; padding-bottom: 16px; margin-bottom: 20px; border-bottom: 1px solid var(--line); }
	.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
	@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } .searchrow { flex-direction: column; } }
	.empty { text-align: center; padding: 56px 0; color: var(--ink-2); }
	.empty button { display: inline-flex; gap: 6px; align-items: center; margin-top: 14px; font-size: 13.5px; color: var(--accent); border: 1px solid var(--accent-soft-2); border-radius: 8px; padding: 8px 14px; }
</style>
