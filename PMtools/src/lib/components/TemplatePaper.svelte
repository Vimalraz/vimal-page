<script lang="ts">
	import type { Resource } from '$lib/types';
	import { templateScaffoldToMarkdown, downloadText, copyText } from '$lib/export';
	import Icon from './Icon.svelte';

	interface Props {
		resource: Resource;
	}
	let { resource: r }: Props = $props();
	const cfg = r.editor!;

	let removedIds = $state<string[]>([]);
	let sections = $derived(cfg.sections.filter((s) => !removedIds.includes(s.id)));
	let removed = $derived(cfg.sections.filter((s) => removedIds.includes(s.id)));
	let markdown = $derived(templateScaffoldToMarkdown(r.title, sections));
	let copied = $state(false);

	function drop(id: string) {
		removedIds = [...removedIds, id];
	}
	function restore(id: string) {
		removedIds = removedIds.filter((x) => x !== id);
	}
	async function copy() {
		if (await copyText(markdown)) {
			copied = true;
			setTimeout(() => (copied = false), 1600);
		}
	}
</script>

<div class="bar">
	<span class="cnt mono">{sections.length} of {cfg.sections.length} sections</span>
	<div class="sp"></div>
	<button class="btn" onclick={copy}>
		<Icon name={copied ? 'check' : 'copy'} size={14} stroke={2} /> {copied ? 'Copied' : 'Copy'}
	</button>
	<button class="btn primary" onclick={() => downloadText(`${r.slug}.md`, markdown)} disabled={!sections.length}>
		<Icon name="download" size={14} stroke={2} /> Download
	</button>
</div>

{#if removed.length}
	<div class="restore">
		<span class="rl mono">REMOVED</span>
		{#each removed as s}
			<button class="chip" onclick={() => restore(s.id)}>+ {s.title}</button>
		{/each}
	</div>
{/if}

<div class="sheet-wrap">
	<article class="sheet">
		<h1 class="doc-title">{r.title}</h1>
		{#each sections as s (s.id)}
			<section class="psec">
				<button class="drop" title="Remove this section" aria-label="Remove {s.title}" onclick={() => drop(s.id)}>
					<Icon name="x" size={14} stroke={2.5} />
				</button>
				<h2>{s.title}</h2>
				{#if s.help}<p class="help">{s.help}</p>{/if}

				{#if s.type === 'list'}
					<ul class="ph">
						<li>{s.placeholder ?? '…'}</li>
						<li class="faint">…</li>
					</ul>
				{:else if s.type === 'fields'}
					<div class="fields">
						{#each s.fields ?? [] as f}
							<p class="field"><strong>{f.label}:</strong> <span class="line">{f.placeholder ?? ''}</span></p>
						{/each}
					</div>
				{:else}
					<p class="prompt">{s.placeholder ?? '…'}</p>
				{/if}
			</section>
		{:else}
			<p class="empty-doc">All sections removed. Add some back above.</p>
		{/each}
	</article>
</div>

<style>
	.bar {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 12px;
	}
	.cnt { font-size: 11.5px; color: var(--ink-3); }
	.sp { flex: 1; }
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-size: 13px;
		font-weight: 500;
		color: var(--ink);
		background: var(--surface);
		border: 1px solid var(--line-2);
		border-radius: 8px;
		padding: 8px 13px;
	}
	.btn:hover { border-color: var(--ink-3); }
	.btn.primary { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
	.btn.primary:disabled { opacity: 0.4; cursor: not-allowed; }

	.restore {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 7px;
		margin-bottom: 16px;
	}
	.rl { font-size: 10px; letter-spacing: 0.06em; color: var(--ink-3); }
	.chip {
		font-size: 12px;
		font-weight: 500;
		color: var(--accent);
		border: 1px dashed var(--accent-soft-2);
		border-radius: 100px;
		padding: 4px 11px;
	}
	.chip:hover { background: var(--accent-soft); }

	/* The white sheet of paper — fixed light styling regardless of theme */
	.sheet-wrap {
		background: #e9e9ec;
		border-radius: 10px;
		padding: 28px;
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.25);
	}
	.sheet {
		background: #ffffff;
		color: #1c1c20;
		max-width: 600px;
		margin: 0 auto;
		padding: 52px 56px 60px;
		border-radius: 3px;
		box-shadow: 0 6px 28px -6px rgba(0, 0, 0, 0.4);
		font-family: var(--font-serif);
	}
	.doc-title {
		font-size: 27px;
		font-weight: 600;
		letter-spacing: -0.01em;
		margin-bottom: 28px;
		padding-bottom: 16px;
		border-bottom: 1px solid #e3e3e6;
		color: #16161a;
	}
	.psec {
		position: relative;
		margin-bottom: 26px;
	}
	.psec h2 {
		font-size: 17px;
		font-weight: 600;
		color: #16161a;
		margin-bottom: 5px;
	}
	.help {
		font-size: 13px;
		font-style: italic;
		color: #8a8a92;
		margin-bottom: 9px;
		font-family: var(--font-sans);
	}
	.prompt {
		font-size: 14.5px;
		color: #b4b4ba;
		font-family: var(--font-sans);
		min-height: 22px;
		border-bottom: 1px solid #ededf0;
		padding-bottom: 8px;
	}
	.ph { list-style: none; padding: 0; }
	.ph li {
		font-size: 14.5px;
		color: #b4b4ba;
		font-family: var(--font-sans);
		padding: 5px 0 5px 18px;
		position: relative;
		border-bottom: 1px solid #ededf0;
	}
	.ph li::before { content: '•'; position: absolute; left: 2px; color: #c8c8ce; }
	.ph li.faint { color: #cdcdd2; }
	.fields { display: flex; flex-direction: column; gap: 9px; }
	.field { font-size: 14.5px; color: #3a3a42; font-family: var(--font-sans); }
	.field strong { color: #16161a; font-weight: 600; }
	.field .line { color: #b4b4ba; }
	.drop {
		position: absolute;
		top: -2px;
		right: -6px;
		width: 24px;
		height: 24px;
		display: grid;
		place-items: center;
		color: #b4b4ba;
		border-radius: 6px;
		opacity: 0;
		transition: opacity 0.15s, color 0.15s, background 0.15s;
	}
	.psec:hover .drop { opacity: 1; }
	.drop:hover { color: #d23f1f; background: #faeae6; }
	.empty-doc { color: #9a9aa2; font-family: var(--font-sans); font-size: 14px; text-align: center; padding: 30px 0; }

	@media (max-width: 600px) {
		.sheet-wrap { padding: 14px; }
		.sheet { padding: 36px 28px 40px; }
	}
</style>
