<script lang="ts">
	import { deriveCounts } from '$lib/data';
	const counts = deriveCounts();
</script>

<svelte:head><title>About — PM/OS</title></svelte:head>

<div class="wrap about">
	<div class="crumb mono"><a href="/">Home</a> <span>/</span> About</div>
	<h1>Product knowledge is everywhere<br /><span class="ac">and trustworthy nowhere.</span></h1>
	<p class="lead">
		The best frameworks are buried in old blog posts. The best templates are scattered across a
		hundred Notion pages. The best tools are hidden behind affiliate listicles. PM/OS is a single,
		search-first index of the best of product management — curated, structured, and built to get you
		back to work in seconds.
	</p>

	<div class="stats">
		<div class="stat"><span class="n mono">{counts.all}</span><span class="l">resources</span></div>
		<div class="stat"><span class="n mono">{counts.framework ?? 0}</span><span class="l">frameworks</span></div>
		<div class="stat"><span class="n mono">{counts.template ?? 0}</span><span class="l">templates</span></div>
		<div class="stat"><span class="n mono">{counts.glossary ?? 0}</span><span class="l">definitions</span></div>
	</div>

	<div class="principles">
		<h2>How it works</h2>
		<ol>
			<li><strong>Search before navigation.</strong> The homepage is one search box across every resource type. Scope it with a category, sharpen it with tags, filter on-site vs off-site.</li>
			<li><strong>Act in place.</strong> Edit templates on-site, export to Markdown, copy snippets, or jump to the canonical source — without losing your place.</li>
			<li><strong>Counts never lie.</strong> Every number on the site is derived from the data, not hand-maintained.</li>
			<li><strong>Trust is a field.</strong> Source, freshness, and difficulty are always visible.</li>
		</ol>
	</div>

	<div class="cta">
		<a href="/">Start searching →</a>
	</div>
</div>

<style>
	.about { padding-top: 40px; max-width: 720px; }
	.crumb { font-size: 11.5px; color: var(--ink-3); margin-bottom: 28px; }
	.crumb a:hover { color: var(--accent); }
	.crumb span { margin: 0 4px; }
	h1 { font-size: clamp(30px, 5vw, 46px); font-weight: 700; letter-spacing: -0.035em; line-height: 1.05; }
	h1 .ac { color: var(--accent); }
	.lead { font-size: 17px; line-height: 1.65; color: var(--ink-2); margin-top: 22px; }
	.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 40px 0; }
	.stat { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 18px; text-align: center; }
	.stat .n { display: block; font-size: 30px; font-weight: 600; color: var(--accent); }
	.stat .l { font-size: 12px; color: var(--ink-3); }
	.principles h2 { font-size: 20px; font-weight: 600; letter-spacing: -0.01em; margin-bottom: 16px; }
	.principles ol { padding-left: 22px; display: flex; flex-direction: column; gap: 12px; }
	.principles li { font-size: 15px; line-height: 1.6; color: var(--ink-2); }
	.principles strong { color: var(--ink); }
	.cta { margin-top: 36px; }
	.cta a { font-size: 15px; font-weight: 600; color: var(--accent); }
	.cta a:hover { text-decoration: underline; }
	@media (max-width: 560px) { .stats { grid-template-columns: repeat(2, 1fr); } }
</style>
