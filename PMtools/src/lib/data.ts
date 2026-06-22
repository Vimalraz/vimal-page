import resourcesJson from './data/resources.json';
import taxonomyJson from './data/taxonomy.json';
import type { Resource, TypeDef, TagDef } from './types';

export const resources: Resource[] = resourcesJson.resources as Resource[];
export const featuredIds: string[] = resourcesJson.featured as string[];

export const types: TypeDef[] = (taxonomyJson.types as TypeDef[])
	.slice()
	.sort((a, b) => a.order - b.order);
export const tags: TagDef[] = taxonomyJson.tags as TagDef[];
export const difficulties = taxonomyJson.difficulties as string[];

const byId = new Map(resources.map((r) => [r.id, r]));
const typeById = new Map(types.map((t) => [t.id, t]));
const typeByPath = new Map(types.map((t) => [t.path, t]));
const tagById = new Map(tags.map((t) => [t.id, t]));

export const getResource = (id: string) => byId.get(id);
export const getType = (id: string) => typeById.get(id);
export const getTypeByPath = (path: string) => typeByPath.get(path);
export const getTag = (id: string) => tagById.get(id);
export const tagLabel = (id: string) => tagById.get(id)?.label ?? id;

/** Path to a resource's detail page. */
export const resourcePath = (r: Resource) => {
	const t = typeById.get(r.type);
	return `/${t ? t.path : r.type}/${r.slug}`;
};

export const editorPath = (r: Resource) => `${resourcePath(r)}/edit`;

/** Derived counts per type, plus `all`. */
export function deriveCounts(): Record<string, number> {
	const counts: Record<string, number> = { all: resources.length };
	for (const r of resources) counts[r.type] = (counts[r.type] ?? 0) + 1;
	return counts;
}

/** Top tags by frequency within a scope ('all' or a type id). */
export function topTags(scope: string, limit = 12): string[] {
	const freq = new Map<string, number>();
	for (const r of resources) {
		if (scope !== 'all' && r.type !== scope) continue;
		for (const tg of r.tags) freq.set(tg, (freq.get(tg) ?? 0) + 1);
	}
	return [...freq.entries()]
		.sort((a, b) => b[1] - a[1])
		.slice(0, limit)
		.map(([id]) => id);
}

export const featured = (): Resource[] =>
	featuredIds.map((id) => byId.get(id)).filter((r): r is Resource => !!r);
