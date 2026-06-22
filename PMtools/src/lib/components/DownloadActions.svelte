<script lang="ts">
	import type { Resource } from '$lib/types';
	import { downloadText, copyText, resourceToMarkdown } from '$lib/export';
	import Icon from './Icon.svelte';

	interface Props {
		resource: Resource;
	}
	let { resource: r }: Props = $props();
	let copied = $state(false);

	function doDownload() {
		downloadText(`${r.slug}.md`, resourceToMarkdown(r));
	}
	async function doCopy() {
		if (await copyText(resourceToMarkdown(r))) {
			copied = true;
			setTimeout(() => (copied = false), 1600);
		}
	}
	let hasDownload = $derived(!!(r.downloads && r.downloads.some((d) => d.generated)));
	let externalDownloads = $derived((r.downloads ?? []).filter((d) => d.url));
</script>

<div class="dl">
	{#if hasDownload}
		<button class="btn primary" onclick={doDownload}>
			<Icon name="download" size={15} stroke={2} /> Download .md
		</button>
		<button class="btn" onclick={doCopy}>
			<Icon name={copied ? 'check' : 'copy'} size={15} stroke={2} />
			{copied ? 'Copied' : 'Copy'}
		</button>
	{/if}
	{#each externalDownloads as d}
		<a class="btn" href={d.url} target="_blank" rel="noopener noreferrer">
			<Icon name="external" size={14} stroke={2} /> {d.label}
		</a>
	{/each}
	{#if r.externalUrl}
		<a class="btn" href={r.externalUrl} target="_blank" rel="noopener noreferrer">
			<Icon name="external" size={14} stroke={2} /> Open source
		</a>
	{/if}
</div>

<style>
	.dl { display: flex; flex-wrap: wrap; gap: 8px; }
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-size: 13.5px;
		font-weight: 500;
		color: var(--ink);
		background: var(--surface);
		border: 1px solid var(--line-2);
		border-radius: 8px;
		padding: 9px 14px;
		transition: all 0.15s var(--ease);
	}
	.btn:hover { border-color: var(--ink-3); transform: translateY(-1px); }
	.btn.primary {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--accent-ink);
	}
	.btn.primary:hover { filter: brightness(1.05); }
</style>
