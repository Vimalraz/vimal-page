<script lang="ts">
	import type { Resource } from '$lib/types';
	import { resourcePath, tagLabel } from '$lib/data';
	import { selectTag } from '$lib/stores/search.svelte';
	import TypeBadge from './TypeBadge.svelte';
	import Icon from './Icon.svelte';

	interface Props {
		resource: Resource;
		index?: number;
	}
	let { resource: r, index = 0 }: Props = $props();

	let external = $derived(r.primaryAction === 'external');
	let href = $derived(external && r.externalUrl ? r.externalUrl : resourcePath(r));

	function onTag(e: MouseEvent, tag: string) {
		e.preventDefault();
		e.stopPropagation();
		selectTag(tag);
	}
</script>

<article class="card" style="--i:{index}">
	<a
		class="hit"
		{href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		aria-label={r.title}
	></a>

	<div class="top">
		<TypeBadge type={r.type} plain />
		<span class="arw"><Icon name={external ? 'external' : 'arrow'} size={15} stroke={2} /></span>
	</div>
	<h3>{r.title}</h3>
	<p class="sum">{r.summary}</p>

	<div class="tags">
		{#each r.tags.slice(0, 3) as t, i}
			{#if i > 0}<span class="sep">·</span>{/if}
			<button class="tg" onclick={(e) => onTag(e, t)} title={'See all ' + tagLabel(t)}>{tagLabel(t)}</button>
		{/each}
	</div>
</article>

<style>
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 9px;
		padding: 18px 18px 15px;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		transition: border-color 0.18s var(--ease), transform 0.18s var(--ease), box-shadow 0.18s var(--ease);
		animation: rise 0.4s var(--ease) backwards;
		animation-delay: calc(var(--i) * 26ms);
	}
	@keyframes rise {
		from { opacity: 0; transform: translateY(8px); }
	}
	.card:hover {
		border-color: var(--line-2);
		transform: translateY(-2px);
		box-shadow: var(--shadow);
	}
	.card:hover h3 { color: var(--accent); }
	.hit {
		position: absolute;
		inset: 0;
		z-index: 1;
		border-radius: var(--radius);
	}
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 16px;
	}
	.arw {
		color: var(--accent);
		opacity: 0;
		transform: translateX(-4px);
		transition: opacity 0.18s var(--ease), transform 0.18s var(--ease);
		display: inline-flex;
	}
	.card:hover .arw { opacity: 1; transform: translateX(0); }
	h3 {
		font-size: 16px;
		font-weight: 600;
		line-height: 1.3;
		letter-spacing: -0.01em;
		transition: color 0.18s;
	}
	.sum {
		font-size: 13.5px;
		color: var(--ink-2);
		line-height: 1.55;
		flex: 1;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
		margin-top: 2px;
		position: relative;
		z-index: 2;
	}
	.tg {
		font-size: 11.5px;
		color: var(--ink-3);
		transition: color 0.14s;
	}
	.tg:hover { color: var(--accent); }
	.sep { color: var(--line-2); font-size: 11px; }
</style>
