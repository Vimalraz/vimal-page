<script lang="ts">
	import { getType } from '$lib/data';
	import { selectTag } from '$lib/stores/search.svelte';
	import TypeBadge from '$lib/components/TypeBadge.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Prose from '$lib/components/Prose.svelte';
	import Calculator from '$lib/components/Calculator.svelte';
	import TemplatePaper from '$lib/components/TemplatePaper.svelte';
	import RelatedResources from '$lib/components/RelatedResources.svelte';
	import DownloadActions from '$lib/components/DownloadActions.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { data } = $props();
	let r = $derived(data.resource);
	let def = $derived(getType(r.type));
	let m = $derived(r.meta ?? {});

	// checklist interactive state (local only)
	let checked = $state<boolean[]>([]);
	$effect(() => {
		checked = (m.items ?? []).map(() => false);
	});

	let fwBlocks = $derived(
		r.type === 'framework'
			? (
					[
						['When to use', m.whenToUse],
						['When not to use', m.whenNotToUse],
						['Inputs', m.inputs],
						['Steps', m.steps],
						['Outputs', m.outputs],
						['Common mistakes', m.mistakes]
					] as [string, string[] | undefined][]
				)
					.filter(([, arr]) => arr && arr.length)
					.map(([title, arr]) => ({ title, arr: arr as string[] }))
			: []
	);

</script>

<svelte:head>
	<title>{r.title} — PM/OS</title>
	<meta name="description" content={r.summary} />
</svelte:head>

<article class="wrap detail">
	<div class="crumb mono">
		<a href="/">Home</a> <span>/</span> <a href="/{def?.path}">{def?.plural}</a> <span>/</span> {r.title}
	</div>

	<header class="dhead">
		<div class="badges">
			<TypeBadge type={r.type} size="md" />
			<span class="diff mono">{r.difficulty}</span>
			{#if r.readingTime}<span class="diff mono">{r.readingTime} min read</span>{/if}
			{#if r.source === 'external'}<span class="diff mono ext"><Icon name="external" size={11} stroke={2} /> {r.canonicalSource?.name}</span>{/if}
		</div>
		<h1>{r.title}</h1>
		<p class="lead">{r.summary}</p>
		<div class="tags">
			{#each r.tags as t}<Tag id={t} onclick={() => selectTag(t)} />{/each}
		</div>

		{#if !r.editor}
			<div class="actions">
				<DownloadActions resource={r} />
			</div>
		{/if}
	</header>

	<div class="body">
		<div class="main">
			{#if r.type === 'calculator'}
				<Calculator resource={r} />
			{/if}

			{#if fwBlocks.length}
				<div class="fwgrid">
					{#each fwBlocks as b}
						<div class="fwcard">
							<h3>{b.title}</h3>
							<ul>{#each b.arr as x}<li>{x}</li>{/each}</ul>
						</div>
					{/each}
				</div>
				{#if m.example}
					<div class="example">
						<h3>Example</h3>
						<p>{m.example}</p>
					</div>
				{/if}
			{/if}

			{#if r.type === 'glossary'}
				<div class="defcard">
					<p class="def">{r.summary}</p>
					{#if m.example}<p class="ex"><span class="mono">e.g.</span> {m.example}</p>{/if}
				</div>
			{/if}

			{#if r.type === 'checklist' && m.items}
				<div class="checklist">
					{#each m.items as it, i}
						<label class="citem" class:done={checked[i]}>
							<input type="checkbox" bind:checked={checked[i]} />
							<span class="box"><Icon name="check" size={13} stroke={2.5} /></span>
							<span class="ct">{it.label}</span>
						</label>
					{/each}
				</div>
			{/if}

			{#if r.type === 'interview' && m.questions}
				<div class="qbank">
					<div class="round mono">{m.round}</div>
					{#each m.questions as q, i}
						<div class="qrow">
							<span class="qn mono">{String(i + 1).padStart(2, '0')}</span>
							<span class="qt">{q.q}</span>
							{#if q.type}<span class="qtype mono">{q.type}</span>{/if}
						</div>
					{/each}
				</div>
			{/if}

			{#if r.type === 'tool'}
				<div class="toolmeta">
					<div class="tm"><span class="k mono">Category</span><span class="v">{m.category}</span></div>
					<div class="tm"><span class="k mono">Pricing</span><span class="v">{m.pricingTier}</span></div>
					{#if m.bestFor}<div class="tm"><span class="k mono">Best for</span><span class="v">{m.bestFor.join(', ')}</span></div>{/if}
				</div>
			{/if}

			{#if r.editor}
				<TemplatePaper resource={r} />
			{/if}

			{#if r.body}
				<Prose content={r.body} />
			{/if}
		</div>

		<aside class="side">
			<RelatedResources resource={r} />
			<div class="updated mono">Updated {r.updatedAt}</div>
		</aside>
	</div>
</article>

<style>
	.detail { padding-top: 32px; max-width: 920px; }
	.crumb { font-size: 11.5px; color: var(--ink-3); margin-bottom: 22px; }
	.crumb a:hover { color: var(--accent); }
	.crumb span { margin: 0 4px; }
	.badges { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
	.diff { font-size: 11px; color: var(--ink-3); text-transform: capitalize; }
	.diff.ext { display: inline-flex; gap: 3px; align-items: center; }
	.dhead h1 { font-size: clamp(28px, 4.5vw, 42px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.08; margin: 14px 0 0; }
	.lead { font-size: 17px; line-height: 1.55; color: var(--ink-2); margin-top: 12px; max-width: 680px; }
	.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
	.actions { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-top: 24px; }
	.cta {
		display: inline-flex; align-items: center; gap: 8px;
		font-size: 14px; font-weight: 600; color: var(--accent-ink);
		background: var(--accent); border-radius: 9px; padding: 11px 18px;
		transition: filter 0.15s, transform 0.15s;
	}
	.cta:hover { filter: brightness(1.06); transform: translateY(-1px); }

	.body { display: grid; grid-template-columns: 1fr 264px; gap: 40px; margin-top: 40px; align-items: start; }
	.main { min-width: 0; }
	.side { position: sticky; top: 84px; display: flex; flex-direction: column; gap: 20px; }
	.updated { font-size: 11px; color: var(--ink-3); }

	.fwgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
	.fwcard { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 16px 18px; }
	.fwcard h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); margin-bottom: 10px; }
	.fwcard ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
	.fwcard li { font-size: 14px; line-height: 1.5; color: var(--ink-2); padding-left: 16px; position: relative; }
	.fwcard li::before { content: '–'; position: absolute; left: 0; color: var(--ink-3); }
	.example { margin-top: 16px; background: var(--accent-soft); border: 1px solid var(--accent-soft-2); border-radius: var(--radius); padding: 16px 18px; }
	.example h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); margin-bottom: 8px; }
	.example p { font-size: 14.5px; line-height: 1.6; color: var(--ink); }

	.defcard { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 22px 24px; }
	.def { font-size: 18px; line-height: 1.55; color: var(--ink); }
	.ex { margin-top: 14px; font-size: 14.5px; color: var(--ink-2); }
	.ex .mono { color: var(--accent); font-size: 12px; }

	.checklist { display: flex; flex-direction: column; gap: 2px; }
	.citem { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); cursor: pointer; transition: all 0.15s; }
	.citem:hover { border-color: var(--line-2); }
	.citem input { position: absolute; opacity: 0; }
	.box { width: 20px; height: 20px; border: 1.5px solid var(--line-2); border-radius: 6px; display: grid; place-items: center; color: transparent; flex: 0 0 auto; transition: all 0.15s; }
	.citem.done .box { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
	.ct { font-size: 14.5px; color: var(--ink); }
	.citem.done .ct { color: var(--ink-3); text-decoration: line-through; }

	.qbank { display: flex; flex-direction: column; gap: 2px; }
	.round { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin-bottom: 12px; }
	.qrow { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
	.qn { font-size: 12px; color: var(--ink-3); }
	.qt { font-size: 15px; flex: 1; }
	.qtype { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink-3); background: var(--paper-2); padding: 3px 8px; border-radius: 100px; }

	.toolmeta { display: flex; flex-direction: column; gap: 1px; border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; }
	.tm { display: flex; padding: 14px 18px; background: var(--surface); border-bottom: 1px solid var(--line); }
	.tm:last-child { border-bottom: none; }
	.tm .k { font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink-3); width: 110px; flex: 0 0 auto; }
	.tm .v { font-size: 14px; color: var(--ink); }

	.tpreview { border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; margin-bottom: 24px; }
	.tphead { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; background: var(--paper-2); border-bottom: 1px solid var(--line); }
	.tphead .mono { font-size: 10.5px; letter-spacing: 0.06em; color: var(--ink-3); }
	.tplink { font-size: 12.5px; font-weight: 500; color: var(--accent); }
	.tpbody { padding: 20px 22px; }
	.tpbody :global(h1) { font-size: 18px; margin-bottom: 12px; }
	.tpbody :global(p), .tpbody :global(li) { color: var(--ink-3); font-style: italic; }

	@media (max-width: 820px) {
		.body { grid-template-columns: 1fr; }
		.side { position: static; }
		.fwgrid { grid-template-columns: 1fr; }
	}
</style>
