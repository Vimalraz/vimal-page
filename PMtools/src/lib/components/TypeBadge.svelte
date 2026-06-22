<script lang="ts">
	import { getType } from '$lib/data';
	import Icon from './Icon.svelte';
	interface Props {
		type: string;
		size?: 'sm' | 'md';
		plain?: boolean;
	}
	let { type, size = 'sm', plain = false }: Props = $props();
	let def = $derived(getType(type));
</script>

{#if plain}
	<span class="plain" data-type={type}>{def?.label ?? type}</span>
{:else}
	<span class="badge {size}" data-type={type}>
		{#if def}<Icon name={def.icon} size={size === 'sm' ? 12 : 13} stroke={2} />{/if}
		<span>{def?.label ?? type}</span>
	</span>
{/if}

<style>
	.plain {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: var(--ink-2);
		background: var(--paper-2);
		border: 1px solid var(--line);
		border-radius: 100px;
		padding: 3px 9px 3px 7px;
		white-space: nowrap;
	}
	.badge.md { font-size: 12px; padding: 4px 11px 4px 9px; }
	[data-type='framework'] { color: #e8915a; }
	[data-type='template'] { color: #6cb6d8; }
	[data-type='guide'] { color: #a99cff; }
	[data-type='playbook'] { color: #6fd99b; }
	[data-type='tool'] { color: #d8b85a; }
	[data-type='calculator'] { color: #79c7b0; }
	[data-type='case_study'] { color: #e07ba8; }
	[data-type='interview'] { color: #5fd8d2; }
	[data-type='glossary'] { color: #aab0bc; }
	[data-type='checklist'] { color: #9bd96f; }
</style>
