import type { Resource, SearchState } from './types';
import { tagLabel } from './data';

/** Normalize: lowercase, fold diacritics, strip punctuation. */
function norm(s: string): string {
	return s
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

const tokenize = (s: string): string[] => (s ? norm(s).split(' ').filter(Boolean) : []);

/** Build a weighted searchable haystack for a resource. */
interface Indexed {
	r: Resource;
	title: string;
	keywords: string; // tags + type
	summary: string;
	body: string;
}

let cache: Indexed[] | null = null;

function buildIndex(resources: Resource[]): Indexed[] {
	return resources.map((r) => ({
		r,
		title: norm(r.title),
		keywords: norm([...r.tags.map(tagLabel), ...r.tags, r.type].join(' ')),
		summary: norm(r.summary + ' ' + (r.description ?? '')),
		body: norm((r.body ?? '') + ' ' + JSON.stringify(r.meta ?? {}))
	}));
}

const FIELD_WEIGHTS = { title: 10, keywords: 5, summary: 4, body: 1 };

function scoreOne(idx: Indexed, tokens: string[]): number {
	let score = 0;
	for (const tok of tokens) {
		let matched = false;
		for (const [field, weight] of Object.entries(FIELD_WEIGHTS) as [keyof typeof FIELD_WEIGHTS, number][]) {
			const hay = idx[field];
			if (!hay) continue;
			// exact word boundary > prefix > substring
			const wordRe = new RegExp(`\\b${tok}`, 'g');
			if (wordRe.test(hay)) {
				score += weight;
				matched = true;
			} else if (hay.includes(tok)) {
				score += weight * 0.5;
				matched = true;
			}
		}
		if (!matched) return -1; // every token must match somewhere (AND)
	}
	// status boosts
	if (idx.r.status.featured) score *= 1.3;
	if (idx.r.status.popular) score *= 1.12;
	if (idx.r.status.deprecated) score *= 0.5;
	// exact title bonus
	if (tokens.length && idx.title === tokens.join(' ')) score += 50;
	return score;
}

function passesFilters(r: Resource, s: SearchState): boolean {
	if (s.scope !== 'all' && r.type !== s.scope) return false;
	if (s.source !== 'all' && r.source !== s.source) return false;
	if (s.difficulty.length && !s.difficulty.includes(r.difficulty)) return false;
	if (s.tags.length && !s.tags.every((t) => r.tags.includes(t))) return false;
	for (const flag of s.flags) {
		if (flag === 'editor' && !r.editor) return false;
		if (flag === 'download' && !(r.downloads && r.downloads.length)) return false;
		if (flag === 'new' && !r.status.new) return false;
		if (flag === 'popular' && !r.status.popular) return false;
	}
	return true;
}

export function runSearch(resources: Resource[], s: SearchState): Resource[] {
	if (!cache) cache = buildIndex(resources);
	const tokens = tokenize(s.q);
	const hasQuery = tokens.length > 0;

	let scored: { r: Resource; score: number }[] = [];
	for (const idx of cache) {
		if (!passesFilters(idx.r, s)) continue;
		let score = 0;
		if (hasQuery) {
			score = scoreOne(idx, tokens);
			if (score < 0) continue;
		}
		scored.push({ r: idx.r, score });
	}

	const byDate = (a: Resource, b: Resource) => (a.updatedAt < b.updatedAt ? 1 : -1);
	const byAz = (a: Resource, b: Resource) => a.title.localeCompare(b.title);

	if (s.sort === 'newest') scored.sort((a, b) => byDate(a.r, b.r));
	else if (s.sort === 'az') scored.sort((a, b) => byAz(a.r, b.r));
	else if (hasQuery) scored.sort((a, b) => b.score - a.score || byDate(a.r, b.r));
	else {
		// relevance with no query → featured/popular first, then recent
		scored.sort((a, b) => {
			const fa = (a.r.status.featured ? 2 : 0) + (a.r.status.popular ? 1 : 0);
			const fb = (b.r.status.featured ? 2 : 0) + (b.r.status.popular ? 1 : 0);
			return fb - fa || byDate(a.r, b.r);
		});
	}
	return scored.map((x) => x.r);
}

/** Lightweight typeahead suggestions (titles only). */
export function suggest(resources: Resource[], q: string, limit = 6): Resource[] {
	const tokens = tokenize(q);
	if (!tokens.length) return [];
	if (!cache) cache = buildIndex(resources);
	return cache
		.map((idx) => ({ r: idx.r, score: scoreOne(idx, tokens) }))
		.filter((x) => x.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map((x) => x.r);
}
