<script lang="ts">
	import { page } from '$app/stores';
	import SearchBar from '$lib/components/SearchBar.svelte';
</script>

<svelte:head><title>Not found — PM/OS</title></svelte:head>

<div class="wrap err">
	<div class="code mono">{$page.status}</div>
	<h1>{$page.status === 404 ? 'Nothing here.' : 'Something broke.'}</h1>
	<p>{$page.error?.message ?? 'The page you were looking for could not be found.'}</p>
	<div class="sb"><SearchBar size="compact" placeholder="Search resources instead…" /></div>
	<a href="/" class="home">← Back to search</a>
</div>

<style>
	.err { padding: 80px 0; max-width: 520px; text-align: center; margin: 0 auto; }
	.code { font-size: 13px; color: var(--accent); letter-spacing: 0.1em; }
	h1 { font-size: 32px; font-weight: 700; letter-spacing: -0.03em; margin: 10px 0; }
	p { color: var(--ink-2); }
	.sb { margin: 28px 0 18px; text-align: left; }
	.home { font-size: 14px; font-weight: 500; color: var(--accent); }
	.home:hover { text-decoration: underline; }
</style>
