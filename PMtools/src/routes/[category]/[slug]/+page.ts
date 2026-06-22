import { error } from '@sveltejs/kit';
import { resources, getTypeByPath, getType } from '$lib/data';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () =>
	resources.map((r) => ({ category: getType(r.type)!.path, slug: r.slug }));

export function load({ params }) {
	const def = getTypeByPath(params.category);
	if (!def) error(404, 'Unknown category');
	const resource = resources.find((r) => r.type === def.id && r.slug === params.slug);
	if (!resource) error(404, 'Resource not found');
	return { resource };
}
