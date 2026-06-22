<script lang="ts">
	interface Props {
		name: string;
		size?: number;
		stroke?: number;
	}
	let { name, size = 16, stroke = 1.75 }: Props = $props();

	// minimal line-icon set (24x24 viewbox paths)
	const paths: Record<string, string> = {
		search: 'M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0 M21 21l-4.3-4.3',
		grid: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z',
		doc: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5 M9 13h6 M9 17h6',
		play: 'M5 4h4v16H5z M11 4l9 8-9 8z',
		book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z M19 3v16',
		wrench: 'M14.7 6.3a4 4 0 0 0-5.2 5.2L4 17l3 3 5.5-5.5a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.1-2.1z',
		chat: 'M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z',
		az: 'M4 18h6 M4 6l3 8 3-8 M14 6h6l-6 12h6',
		check: 'M4 12l2 2 7-7 M9 17l2 2 9-9',
		sun: 'M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0 M12 2v2 M12 20v2 M4 4l1.5 1.5 M18.5 18.5L20 20 M2 12h2 M20 12h2 M4 20l1.5-1.5 M18.5 5.5L20 4',
		moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
		command: 'M6 4a2 2 0 1 1-2 2h12a2 2 0 1 1 2-2v12a2 2 0 1 1 2 2H6a2 2 0 1 1-2-2z',
		external: 'M7 17L17 7 M9 7h8v8',
		download: 'M12 3v12 M7 10l5 5 5-5 M5 21h14',
		edit: 'M4 20h4l10-10-4-4L4 16z M14 6l4 4',
		copy: 'M9 9h10v10H9z M5 15V5h10',
		x: 'M6 6l12 12 M18 6L6 18',
		chevron: 'M9 6l6 6-6 6',
		chevrondown: 'M6 9l6 6 6-6',
		star: 'M12 3l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.4l6-.9z',
		sliders: 'M4 6h10 M18 6h2 M4 12h2 M10 12h10 M4 18h8 M16 18h4 M14 4v4 M6 10v4 M12 16v4',
		arrow: 'M5 12h14 M13 6l6 6-6 6',
		zap: 'M13 3L4 14h7l-1 7 9-11h-7z',
		calc: 'M6 3h12v18H6z M9 7h6 M9 11h2 M13 11h2 M9 15h2 M13 15h2'
	};
	let d = $derived(paths[name] ?? paths.doc);
	let segs = $derived(d.split(' M').map((s, i) => (i === 0 ? s : 'M' + s)));
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={stroke}
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#each segs as seg}
		<path d={seg} />
	{/each}
</svg>
