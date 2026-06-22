<script lang="ts">
	import { types, deriveCounts } from '$lib/data';
	import { search } from '$lib/stores/search.svelte';
	import Icon from './Icon.svelte';

	const counts = deriveCounts();
	let panes = $derived([
		{ id: 'all', label: 'All', icon: 'grid', count: counts.all },
		...types.map((t) => ({ id: t.id, label: t.plural, icon: t.icon, count: counts[t.id] ?? 0 }))
	]);

	function select(id: string) {
		search.scope = id;
		// drop tags that no longer apply is handled naturally; keep query
	}
</script>

<div class="panes" role="tablist" aria-label="Resource categories">
	{#each panes as p}
		<button
			role="tab"
			aria-selected={search.scope === p.id}
			class:on={search.scope === p.id}
			onclick={() => select(p.id)}
		>
			<Icon name={p.icon} size={14} stroke={2} />
			<span class="lb">{p.label}</span>
			<span class="ct mono">{p.count}</span>
		</button>
	{/each}
</div>

<style>
	.panes {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	button {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-size: 13.5px;
		font-weight: 500;
		color: var(--ink-2);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 9px;
		padding: 8px 12px;
		transition: all 0.16s var(--ease);
	}
	button:hover {
		border-color: var(--line-2);
		color: var(--ink);
		transform: translateY(-1px);
	}
	button.on {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--accent-ink);
		font-weight: 600;
	}
	.ct {
		font-size: 11px;
		opacity: 0.55;
	}
	button.on .ct { opacity: 0.8; }
	@media (max-width: 640px) {
		.panes {
			flex-wrap: nowrap;
			overflow-x: auto;
			padding-bottom: 4px;
			margin: 0 -24px;
			padding-left: 24px;
			padding-right: 24px;
			scrollbar-width: none;
		}
		.panes::-webkit-scrollbar { display: none; }
		button { flex: 0 0 auto; }
	}
</style>
