const KEY = 'pmos-bookmarks';

function load(): string[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		return JSON.parse(localStorage.getItem(KEY) ?? '[]');
	} catch {
		return [];
	}
}

export const bookmarks = $state<{ ids: string[] }>({ ids: [] });

export function initBookmarks() {
	bookmarks.ids = load();
}

export function isBookmarked(id: string) {
	return bookmarks.ids.includes(id);
}

export function toggleBookmark(id: string) {
	bookmarks.ids = bookmarks.ids.includes(id)
		? bookmarks.ids.filter((b) => b !== id)
		: [...bookmarks.ids, id];
	try {
		localStorage.setItem(KEY, JSON.stringify(bookmarks.ids));
	} catch {}
}

export const palette = $state<{ open: boolean }>({ open: false });

export function getTheme(): 'light' | 'dark' {
	if (typeof document === 'undefined') return 'light';
	return (document.documentElement.dataset.theme as 'light' | 'dark') ?? 'light';
}

export function toggleTheme() {
	const next = getTheme() === 'dark' ? 'light' : 'dark';
	document.documentElement.dataset.theme = next;
	try {
		localStorage.setItem('pmos-theme', next);
	} catch {}
}
