<script lang="ts">
	import { palette } from '$lib/stores/ui.svelte';
	import { resources, resourcePath, getType } from '$lib/data';
	import { suggest } from '$lib/search';
	import { goto } from '$app/navigation';
	import Icon from './Icon.svelte';

	let q = $state('');
	let active = $state(0);
	let inputEl: HTMLInputElement;

	let results = $derived(q.trim() ? suggest(resources, q, 8) : resources.filter((r) => r.status.featured).slice(0, 6));

	$effect(() => {
		const h = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				palette.open = !palette.open;
			}
			if (e.key === 'Escape') palette.open = false;
		};
		window.addEventListener('keydown', h);
		return () => window.removeEventListener('keydown', h);
	});

	$effect(() => {
		if (palette.open) {
			q = '';
			active = 0;
			setTimeout(() => inputEl?.focus(), 30);
		}
	});

	function nav(i: number) {
		const r = results[i];
		if (!r) return;
		palette.open = false;
		goto(resourcePath(r));
	}
	function onkey(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % results.length; }
		else if (e.key === 'ArrowUp') { e.preventDefault(); active = active <= 0 ? results.length - 1 : active - 1; }
		else if (e.key === 'Enter') { e.preventDefault(); nav(active); }
	}
</script>

{#if palette.open}
	<div class="ov" onclick={() => (palette.open = false)} role="presentation">
		<div class="pal" onclick={(e) => e.stopPropagation()} role="dialog" aria-label="Command palette">
			<div class="ph">
				<Icon name="search" size={18} stroke={2} />
				<input bind:this={inputEl} bind:value={q} onkeydown={onkey} oninput={() => (active = 0)} placeholder="Jump to any resource…" aria-label="Search" />
				<kbd class="kbd">ESC</kbd>
			</div>
			<ul class="pr">
				{#if !q.trim()}<li class="hint">Featured</li>{/if}
				{#each results as r, i}
					<li>
						<button class:active={i === active} onmouseenter={() => (active = i)} onclick={() => nav(i)}>
							<span class="t mono">{getType(r.type)?.label}</span>
							<span class="n">{r.title}</span>
							<Icon name="arrow" size={14} stroke={2} />
						</button>
					</li>
				{:else}
					<li class="empty">No matches</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style>
	.ov {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: color-mix(in srgb, var(--ink) 28%, transparent);
		backdrop-filter: blur(3px);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 14vh;
		animation: fade 0.15s var(--ease);
	}
	@keyframes fade { from { opacity: 0; } }
	.pal {
		width: min(560px, 92vw);
		background: var(--surface);
		border: 1px solid var(--line-2);
		border-radius: 14px;
		box-shadow: var(--shadow-lg);
		overflow: hidden;
		animation: pop 0.2s var(--ease);
	}
	@keyframes pop { from { opacity: 0; transform: translateY(-8px) scale(0.99); } }
	.ph {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 18px;
		border-bottom: 1px solid var(--line);
		color: var(--ink-3);
	}
	.ph input { flex: 1; border: none; background: none; outline: none; font-size: 16px; color: var(--ink); }
	.pr { list-style: none; max-height: 52vh; overflow: auto; padding: 6px; }
	.hint { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-3); padding: 8px 12px 4px; }
	.pr button {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
		text-align: left;
		padding: 10px 12px;
		border-radius: 8px;
		color: var(--ink);
	}
	.pr button.active { background: var(--accent-soft); }
	.pr button.active :global(svg) { color: var(--accent); }
	.t { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink-3); min-width: 80px; }
	.n { font-size: 14px; font-weight: 500; flex: 1; }
	.pr button :global(svg) { color: var(--ink-3); }
	.empty { padding: 20px; text-align: center; color: var(--ink-3); font-size: 14px; }
</style>
