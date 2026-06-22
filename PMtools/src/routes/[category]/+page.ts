import { error } from '@sveltejs/kit';
import { types, getTypeByPath } from '$lib/data';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => types.map((t) => ({ category: t.path }));

export function load({ params }) {
	const def = getTypeByPath(params.category);
	if (!def) error(404, 'Unknown category');
	return { typeDef: def };
}
