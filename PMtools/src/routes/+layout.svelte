<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import { initBookmarks } from '$lib/stores/ui.svelte';

	let { children } = $props();
	$effect(() => {
		initBookmarks();
	});
</script>

<Header />
<CommandPalette />
<main>
	{@render children()}
</main>
<Footer />

<style>
	main {
		min-height: 60vh;
	}
</style>
