<script lang="ts">
	import Icon from './Icon.svelte';
	import { search } from '$lib/stores/search.svelte';
	import { suggest } from '$lib/search';
	import { resources, resourcePath, getType } from '$lib/data';
	import { goto } from '$app/navigation';

	interface Props {
		placeholder?: string;
		size?: 'hero' | 'compact';
	}
	let { placeholder = 'Search frameworks, templates, tools…', size = 'hero' }: Props = $props();

	let input: HTMLInputElement;
	let focused = $state(false);
	let active = $state(-1);

	let suggestions = $derived(focused && search.q.trim() ? suggest(resources, search.q, 6) : []);

	function onkey(e: KeyboardEvent) {
		if (!suggestions.length) return;
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			active = (active + 1) % suggestions.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			active = active <= 0 ? suggestions.length - 1 : active - 1;
		} else if (e.key === 'Enter' && active >= 0) {
			e.preventDefault();
			goto(resourcePath(suggestions[active]));
			focused = false;
		} else if (e.key === 'Escape') {
			input.blur();
		}
	}

	$effect(() => {
		const h = (e: KeyboardEvent) => {
			if (e.key === '/' && document.activeElement !== input) {
				const tag = (document.activeElement?.tagName ?? '').toLowerCase();
				if (tag !== 'input' && tag !== 'textarea') {
					e.preventDefault();
					input?.focus();
				}
			}
		};
		window.addEventListener('keydown', h);
		return () => window.removeEventListener('keydown', h);
	});
</script>

<div class="bar {size}" class:focused>
	<Icon name="search" size={size === 'hero' ? 20 : 16} stroke={2} />
	<input
		bind:this={input}
		bind:value={search.q}
		{placeholder}
		type="search"
		autocomplete="off"
		spellcheck="false"
		aria-label="Search resources"
		onfocus={() => (focused = true)}
		onblur={() => setTimeout(() => (focused = false), 150)}
		onkeydown={onkey}
		oninput={() => (active = -1)}
	/>
	{#if search.q}
		<button class="clr" aria-label="Clear" onclick={() => { search.q = ''; input.focus(); }}>
			<Icon name="x" size={15} stroke={2} />
		</button>
	{:else}
		<kbd class="kbd slash">/</kbd>
	{/if}

	{#if suggestions.length}
		<ul class="sugg" role="listbox">
			{#each suggestions as s, i}
				<li role="option" aria-selected={i === active}>
					<a href={resourcePath(s)} class:active={i === active} onmouseenter={() => (active = i)}>
						<span class="st mono">{getType(s.type)?.label}</span>
						<span class="sl">{s.title}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.bar {
		position: relative;
		display: flex;
		align-items: center;
		gap: 12px;
		background: var(--surface);
		border: 1.5px solid var(--line-2);
		border-radius: 12px;
		padding: 0 14px;
		color: var(--ink-3);
		transition: border-color 0.18s var(--ease), box-shadow 0.18s var(--ease);
	}
	.bar.hero {
		height: 64px;
		padding: 0 18px;
		box-shadow: var(--shadow);
	}
	.bar.compact { height: 42px; border-radius: 9px; }
	.bar.focused {
		border-color: var(--accent);
		box-shadow: 0 0 0 4px var(--accent-soft);
	}
	input {
		flex: 1;
		border: none;
		background: none;
		outline: none;
		color: var(--ink);
		font-size: 16px;
		font-weight: 450;
		min-width: 0;
	}
	.bar.hero input { font-size: 19px; }
	input::placeholder { color: var(--ink-3); }
	input::-webkit-search-cancel-button { display: none; }
	.clr { display: grid; place-items: center; color: var(--ink-3); padding: 4px; border-radius: 6px; }
	.clr:hover { color: var(--ink); background: var(--paper-2); }
	.slash {
		font-size: 13px;
		min-width: 22px;
		text-align: center;
	}
	.sugg {
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		right: 0;
		list-style: none;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 12px;
		box-shadow: var(--shadow-lg);
		padding: 6px;
		z-index: 40;
		overflow: hidden;
	}
	.sugg a {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 9px 12px;
		border-radius: 8px;
		color: var(--ink);
	}
	.sugg a.active { background: var(--accent-soft); }
	.st {
		font-size: 10.5px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--ink-3);
		min-width: 76px;
	}
	.sl { font-size: 14px; font-weight: 500; }
</style>
