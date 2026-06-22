<script lang="ts">
	import type { Resource } from '$lib/types';
	import { calculators } from '$lib/calculators';

	interface Props {
		resource: Resource;
	}
	let { resource: r }: Props = $props();
	const cfg = r.meta!;

	let values = $state<Record<string, number>>(
		Object.fromEntries(cfg.inputs.map((inp: any) => [inp.id, inp.default]))
	);
	let outputs = $derived(calculators[cfg.compute]?.(values) ?? []);
</script>

<div class="calc">
	<div class="inputs">
		{#each cfg.inputs as inp}
			<label class="field">
				<span class="il">{inp.label}</span>
				<div class="ctrl">
					{#if inp.prefix}<span class="aff">{inp.prefix}</span>{/if}
					<input type="number" step={inp.step ?? 1} bind:value={values[inp.id]} />
					{#if inp.suffix}<span class="aff suf">{inp.suffix}</span>{/if}
				</div>
			</label>
		{/each}
	</div>

	<div class="results">
		{#each outputs as o}
			<div class="out" class:big={o.big}>
				<span class="ol">{o.label}</span>
				<span class="ov">{o.value}</span>
				{#if o.hint}<span class="oh">{o.hint}</span>{/if}
			</div>
		{/each}
	</div>
</div>

{#if cfg.note}<p class="note"><span class="mono">FORMULA</span> {cfg.note}</p>{/if}

<style>
	.calc {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		align-items: start;
	}
	.inputs {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 20px;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius);
	}
	.field { display: flex; flex-direction: column; gap: 6px; }
	.il { font-size: 13px; font-weight: 500; color: var(--ink-2); }
	.ctrl {
		display: flex;
		align-items: center;
		background: var(--paper-2);
		border: 1px solid var(--line-2);
		border-radius: 8px;
		padding: 0 12px;
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	.ctrl:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
	.aff { font-family: var(--font-mono); font-size: 13px; color: var(--ink-3); }
	.aff.suf { margin-left: 4px; }
	.ctrl input {
		flex: 1;
		border: none;
		background: none;
		outline: none;
		color: var(--ink);
		font-size: 15px;
		font-family: var(--font-mono);
		padding: 10px 6px;
		min-width: 0;
		text-align: right;
	}
	.results {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 20px;
		background: var(--accent-soft);
		border: 1px solid var(--accent-soft-2);
		border-radius: var(--radius);
	}
	.out { display: flex; flex-direction: column; gap: 3px; }
	.ol { font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-2); }
	.ov { font-family: var(--font-mono); font-size: 18px; font-weight: 600; color: var(--ink); }
	.out.big .ov { font-size: 34px; color: var(--accent); letter-spacing: -0.02em; }
	.oh { font-size: 12px; color: var(--ink-2); }
	.note { font-size: 13px; color: var(--ink-3); margin-top: 16px; line-height: 1.55; }
	.note .mono { font-size: 10px; letter-spacing: 0.06em; color: var(--accent); margin-right: 6px; }
	@media (max-width: 700px) { .calc { grid-template-columns: 1fr; } }
</style>
