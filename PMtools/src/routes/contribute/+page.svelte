<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	let submitted = $state(false);
	let title = $state('');
	let url = $state('');
	function submit(e: Event) {
		e.preventDefault();
		submitted = true;
	}
</script>

<svelte:head><title>Contribute — PM/OS</title></svelte:head>

<div class="wrap contrib">
	<div class="crumb mono"><a href="/">Home</a> <span>/</span> Contribute</div>
	<h1>Missing something great?</h1>
	<p class="lead">Suggest a framework, template, guide, or tool. Good submissions get curated into the library with proper metadata and cross-links.</p>

	{#if submitted}
		<div class="thanks"><Icon name="check" size={18} stroke={2.5} /> Thanks — your suggestion was noted. (Demo form — no data is sent.)</div>
	{:else}
		<form onsubmit={submit}>
			<label>Resource name<input bind:value={title} required placeholder="e.g. The Kano Model" /></label>
			<label>Link (if external)<input bind:value={url} type="url" placeholder="https://…" /></label>
			<label>Why it belongs<textarea rows="3" placeholder="One or two lines on why this is worth including."></textarea></label>
			<button type="submit">Submit suggestion</button>
		</form>
	{/if}
</div>

<style>
	.contrib { padding-top: 40px; max-width: 560px; }
	.crumb { font-size: 11.5px; color: var(--ink-3); margin-bottom: 24px; }
	.crumb a:hover { color: var(--accent); }
	.crumb span { margin: 0 4px; }
	h1 { font-size: clamp(28px, 4vw, 38px); font-weight: 700; letter-spacing: -0.03em; }
	.lead { font-size: 16px; line-height: 1.6; color: var(--ink-2); margin-top: 12px; }
	form { display: flex; flex-direction: column; gap: 16px; margin-top: 28px; }
	label { display: flex; flex-direction: column; gap: 6px; font-size: 13.5px; font-weight: 500; }
	input, textarea {
		font-family: inherit; font-size: 14px; color: var(--ink);
		background: var(--surface); border: 1px solid var(--line-2);
		border-radius: 8px; padding: 10px 12px;
	}
	input:focus, textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
	button { align-self: flex-start; font-size: 14px; font-weight: 600; color: var(--accent-ink); background: var(--accent); border-radius: 9px; padding: 11px 20px; }
	button:hover { filter: brightness(1.06); }
	.thanks { display: flex; align-items: center; gap: 10px; margin-top: 28px; font-size: 15px; color: var(--good); background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 18px 20px; }
</style>
