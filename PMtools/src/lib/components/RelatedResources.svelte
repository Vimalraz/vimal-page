<script lang="ts">
	import type { Resource } from '$lib/types';
	import { getResource, resourcePath } from '$lib/data';
	import TypeBadge from './TypeBadge.svelte';
	import Icon from './Icon.svelte';

	interface Props {
		resource: Resource;
	}
	let { resource }: Props = $props();

	let items = $derived(
		(resource.related ?? [])
			.map((rel) => getResource(rel.id))
			.filter((r): r is Resource => !!r)
	);
</script>

{#if items.length}
	<section class="related">
		<h2>Related</h2>
		<div class="list">
			{#each items as r}
				<a class="row" href={resourcePath(r)}>
					<div class="rtop">
						<TypeBadge type={r.type} plain />
						<span class="arw"><Icon name="arrow" size={14} stroke={2} /></span>
					</div>
					<span class="ti">{r.title}</span>
				</a>
			{/each}
		</div>
	</section>
{/if}

<style>
	.related h2 {
		font-size: 13px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--ink-3);
		margin-bottom: 12px;
	}
	.list { display: flex; flex-direction: column; gap: 8px; }
	.row {
		display: flex;
		flex-direction: column;
		gap: 7px;
		padding: 13px 14px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
		color: var(--ink);
		transition: border-color 0.15s var(--ease), transform 0.15s var(--ease);
	}
	.row:hover { border-color: var(--line-2); transform: translateY(-1px); }
	.rtop { display: flex; align-items: center; justify-content: space-between; }
	.arw { color: var(--ink-3); opacity: 0; transition: opacity 0.15s, color 0.15s; }
	.row:hover .arw { opacity: 1; color: var(--accent); }
	.ti { font-size: 14px; font-weight: 500; line-height: 1.35; }
	.row:hover .ti { color: var(--accent); }
</style>
