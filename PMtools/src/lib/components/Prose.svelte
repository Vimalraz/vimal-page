<script lang="ts">
	import { renderMarkdown } from '$lib/markdown';
	interface Props {
		content: string;
	}
	let { content }: Props = $props();
	let html = $derived(renderMarkdown(content));
</script>

<div class="prose">{@html html}</div>

<style>
	.prose :global(h2) {
		font-size: 18px;
		font-weight: 600;
		letter-spacing: -0.01em;
		margin: 28px 0 10px;
	}
	.prose :global(h2:first-child) { margin-top: 0; }
	.prose :global(h3) {
		font-size: 15px;
		font-weight: 600;
		margin: 20px 0 8px;
	}
	.prose :global(p) {
		font-size: 15px;
		line-height: 1.7;
		color: var(--ink-2);
		margin: 0 0 12px;
	}
	.prose :global(ul),
	.prose :global(ol) {
		margin: 0 0 14px;
		padding-left: 22px;
	}
	.prose :global(li) {
		font-size: 15px;
		line-height: 1.65;
		color: var(--ink-2);
		margin-bottom: 5px;
	}
	.prose :global(strong) { color: var(--ink); font-weight: 600; }
	.prose :global(code) {
		font-family: var(--font-mono);
		font-size: 13px;
		background: var(--paper-2);
		border: 1px solid var(--line);
		border-radius: 4px;
		padding: 1px 5px;
	}
</style>
