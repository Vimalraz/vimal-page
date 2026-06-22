<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.url.pathname !== '/'}
	<header class="hdr">
		<div class="wrap inner">
			<a href="/" class="logo"><span class="mark">PM</span><span class="slash">/</span><span class="os">OS</span></a>
		</div>
	</header>
{/if}

<style>
	.hdr {
		position: sticky;
		top: 0;
		z-index: 30;
		background: color-mix(in srgb, var(--paper) 82%, transparent);
		backdrop-filter: saturate(140%) blur(12px);
		border-bottom: 1px solid var(--line);
	}
	.inner { display: flex; align-items: center; height: 56px; }
	.logo { font-weight: 700; font-size: 17px; letter-spacing: -0.02em; }
	.logo .slash { color: var(--accent); }
	.logo .os { color: var(--ink-2); }
</style>
