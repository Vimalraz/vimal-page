<script lang="ts">
	import { resources, featured, tagLabel } from '$lib/data';
	import { runSearch } from '$lib/search';
	import { search, resetSearch, toQuery, fromQuery } from '$lib/stores/search.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import PaneTabs from '$lib/components/PaneTabs.svelte';
	import ResourceCard from '$lib/components/ResourceCard.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { onMount } from 'svelte';

	let mounted = $state(false);
	onMount(() => {
		fromQuery(new URLSearchParams(window.location.search));
		mounted = true;
	});

	let results = $derived(runSearch(resources, search));
	let feat = featured();
	let active = $derived(!!search.q || search.scope !== 'all' || search.tags.length > 0);

	// reflect state → URL (shareable), without triggering navigation
	$effect(() => {
		const qs = toQuery(search);
		if (!mounted) return;
		try {
			const url = qs || window.location.pathname;
			if (url !== window.location.search && url !== window.location.pathname + window.location.search) {
				history.replaceState(history.state, '', url);
			}
		} catch {}
	});

	const sorts: { v: typeof search.sort; label: string }[] = [
		{ v: 'relevance', label: 'Relevance' },
		{ v: 'newest', label: 'Newest' },
		{ v: 'az', label: 'A–Z' }
	];
</script>

<svelte:head>
	<title>PM/OS — The product manager's toolkit</title>
	<meta
		name="description"
		content="A PM toolkit. Frameworks, templates, tools, calculators, guides and AI workflows — curated and instantly searchable."
	/>
</svelte:head>

<section class="hero">
	<div class="wrap">
		<div class="eyebrow mono">A PM TOOLKIT</div>
		<h1>Find the resource you <span class="ac">need.</span></h1>
		<p class="sub">
			Frameworks, templates, tools, calculators, guides and AI workflows — curated.
		</p>
		<div class="sbwrap"><SearchBar /></div>
	</div>
</section>

<section class="wrap controls">
	<PaneTabs />
</section>

<section class="wrap results">
	<div class="toolbar">
		<div class="count mono">{results.length} {results.length === 1 ? 'result' : 'results'}</div>
		{#each search.tags as t}
			<button class="tagpill" onclick={() => (search.tags = search.tags.filter((x) => x !== t))}>
				{tagLabel(t)} <Icon name="x" size={12} stroke={2.5} />
			</button>
		{/each}
		<div class="tspace"></div>
		<label class="sort">
			<span class="mono">Sort</span>
			<select bind:value={search.sort}>
				{#each sorts as s}<option value={s.v}>{s.label}</option>{/each}
			</select>
		</label>
	</div>

	{#if !active}
		<div class="featlabel mono">FEATURED</div>
		<div class="grid">
			{#each feat as r, i}<ResourceCard resource={r} index={i} />{/each}
		</div>
		<div class="grid more">
			{#each results.filter((r) => !feat.includes(r)).slice(0, 9) as r, i}
				<ResourceCard resource={r} index={i} />
			{/each}
		</div>
	{:else if results.length}
		<div class="grid">
			{#each results as r, i (r.id)}<ResourceCard resource={r} index={i} />{/each}
		</div>
	{:else}
		<div class="noresults">
			<div class="nr-icon"><Icon name="search" size={26} stroke={1.5} /></div>
			<h3>No matches{#if search.q}&nbsp;for "{search.q}"{/if}</h3>
			<p>Try a broader term or a different category.</p>
			<button onclick={resetSearch}>Reset search</button>
		</div>
	{/if}
</section>

<style>
	.hero {
		padding: 88px 0 40px;
		text-align: center;
		position: relative;
		overflow: hidden;
	}
	.hero::before {
		content: '';
		position: absolute;
		top: -200px;
		left: 50%;
		transform: translateX(-50%);
		width: 720px;
		height: 400px;
		background: radial-gradient(ellipse at center, var(--accent-soft) 0%, transparent 70%);
		pointer-events: none;
	}
	.eyebrow {
		font-size: 11px;
		letter-spacing: 0.16em;
		color: var(--accent);
		margin-bottom: 18px;
		animation: fadeup 0.5s var(--ease) backwards;
	}
	h1 {
		font-size: clamp(36px, 6vw, 58px);
		font-weight: 700;
		letter-spacing: -0.035em;
		line-height: 1.03;
		animation: fadeup 0.5s var(--ease) 0.05s backwards;
	}
	h1 .ac { color: var(--accent); }
	.sub {
		max-width: 540px;
		margin: 18px auto 0;
		font-size: 16px;
		line-height: 1.6;
		color: var(--ink-2);
		animation: fadeup 0.5s var(--ease) 0.1s backwards;
	}
	@keyframes fadeup { from { opacity: 0; transform: translateY(12px); } }
	.sbwrap {
		max-width: 640px;
		margin: 34px auto 0;
		animation: fadeup 0.5s var(--ease) 0.15s backwards;
	}
	.controls { padding-top: 4px; }
	.results { margin-top: 26px; }
	.toolbar {
		display: flex;
		align-items: center;
		gap: 12px;
		padding-bottom: 16px;
		margin-bottom: 20px;
		border-bottom: 1px solid var(--line);
	}
	.count { font-size: 12px; color: var(--ink); font-weight: 500; }
	.tagpill {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		font-weight: 500;
		color: var(--accent-ink);
		background: var(--accent);
		border-radius: 100px;
		padding: 4px 10px;
	}
	.tagpill:hover { filter: brightness(1.08); }
	.tspace { flex: 1; }
	.sort { display: inline-flex; align-items: center; gap: 7px; }
	.sort .mono { font-size: 11px; color: var(--ink-3); }
	.sort select {
		font-family: inherit; font-size: 13px; color: var(--ink);
		background: var(--surface); border: 1px solid var(--line);
		border-radius: 7px; padding: 6px 8px;
	}
	.featlabel { font-size: 10.5px; letter-spacing: 0.08em; color: var(--ink-3); margin-bottom: 12px; }
	.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
	.grid.more { margin-top: 14px; }
	@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
	.noresults { text-align: center; padding: 64px 0; }
	.nr-icon {
		width: 54px; height: 54px; margin: 0 auto 16px;
		display: grid; place-items: center;
		border: 1px solid var(--line); border-radius: 14px;
		color: var(--ink-3); background: var(--surface);
	}
	.noresults h3 { font-size: 18px; font-weight: 600; }
	.noresults p { color: var(--ink-2); margin-top: 6px; }
	.noresults button {
		margin-top: 18px; font-size: 13.5px; font-weight: 500; color: var(--ink);
		border: 1px solid var(--line-2); border-radius: 8px; padding: 9px 16px;
	}
	.noresults button:hover { border-color: var(--ink-3); }
</style>
