<script lang="ts">
	import { tagLabel } from '$lib/data';
	interface Props {
		id: string;
		active?: boolean;
		count?: number;
		onclick?: () => void;
		interactive?: boolean;
	}
	let { id, active = false, count, onclick, interactive = true }: Props = $props();
</script>

{#if interactive}
	<button class="tag" class:active aria-pressed={active} {onclick}>
		<span>{tagLabel(id)}</span>
		{#if count != null}<span class="ct">{count}</span>{/if}
	</button>
{:else}
	<span class="tag static">{tagLabel(id)}</span>
{/if}

<style>
	.tag {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12.5px;
		font-weight: 500;
		color: var(--ink-2);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 100px;
		padding: 5px 11px;
		transition: all 0.15s var(--ease);
		white-space: nowrap;
	}
	.tag:hover:not(.static) {
		border-color: var(--line-2);
		color: var(--ink);
		transform: translateY(-1px);
	}
	.tag.active {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--accent-ink);
	}
	.tag .ct {
		font-family: var(--font-mono);
		font-size: 10.5px;
		opacity: 0.6;
	}
	.tag.static {
		font-size: 11.5px;
		padding: 3px 9px;
		color: var(--ink-3);
		background: transparent;
	}
</style>
