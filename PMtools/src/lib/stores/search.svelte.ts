import type { SearchState } from '$lib/types';
import { goto } from '$app/navigation';

export const defaultState = (): SearchState => ({
	q: '',
	scope: 'all',
	tags: [],
	source: 'all',
	difficulty: [],
	flags: [],
	sort: 'relevance'
});

/** Central reactive search state (Svelte 5 runes). */
export const search = $state<SearchState>(defaultState());

export function resetSearch() {
	const d = defaultState();
	search.q = d.q;
	search.scope = d.scope;
	search.tags = d.tags;
	search.source = d.source;
	search.difficulty = d.difficulty;
	search.flags = d.flags;
	search.sort = d.sort;
}

export function toggleTag(id: string) {
	search.tags = search.tags.includes(id)
		? search.tags.filter((t) => t !== id)
		: [...search.tags, id];
}

export function toggleFlag(id: string) {
	search.flags = search.flags.includes(id)
		? search.flags.filter((f) => f !== id)
		: [...search.flags, id];
}

export function clearFilters() {
	search.tags = [];
	search.difficulty = [];
	search.flags = [];
	search.source = 'all';
}

/** Filter the whole library down to a single tag and show the results on home. */
export function selectTag(tag: string) {
	search.q = '';
	search.scope = 'all';
	search.source = 'all';
	search.difficulty = [];
	search.flags = [];
	search.tags = [tag];
	goto('/' + toQuery(search));
}

/** Serialize to URLSearchParams for shareable state. */
export function toQuery(s: SearchState): string {
	const p = new URLSearchParams();
	if (s.q) p.set('q', s.q);
	if (s.scope !== 'all') p.set('scope', s.scope);
	if (s.tags.length) p.set('tags', s.tags.join(','));
	if (s.source !== 'all') p.set('src', s.source);
	if (s.difficulty.length) p.set('diff', s.difficulty.join(','));
	if (s.flags.length) p.set('flags', s.flags.join(','));
	if (s.sort !== 'relevance') p.set('sort', s.sort);
	const str = p.toString();
	return str ? `?${str}` : '';
}

export function fromQuery(params: URLSearchParams) {
	search.q = params.get('q') ?? '';
	search.scope = params.get('scope') ?? 'all';
	search.tags = params.get('tags')?.split(',').filter(Boolean) ?? [];
	search.source = (params.get('src') as SearchState['source']) ?? 'all';
	search.difficulty = (params.get('diff')?.split(',').filter(Boolean) as SearchState['difficulty']) ?? [];
	search.flags = params.get('flags')?.split(',').filter(Boolean) ?? [];
	search.sort = (params.get('sort') as SearchState['sort']) ?? 'relevance';
}
