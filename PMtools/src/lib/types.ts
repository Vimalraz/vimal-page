export type Source = 'internal' | 'external';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type OpenBehavior = 'detail' | 'preview' | 'editor' | 'external' | 'download';

export interface Download {
	label: string;
	format: string;
	url?: string;
	generated?: boolean;
	size?: number;
}

export interface Related {
	id: string;
	relation: string;
}

export interface EditorField {
	id: string;
	label: string;
	type: 'text' | 'textarea';
	placeholder?: string;
	required?: boolean;
}

export interface EditorSection {
	id: string;
	title: string;
	type: 'text' | 'textarea' | 'list' | 'fields';
	required?: boolean;
	help?: string;
	placeholder?: string;
	fields?: EditorField[];
}

export interface EditorConfig {
	mode: string;
	exportFormats: string[];
	linkedGuides?: string[];
	sections: EditorSection[];
}

export interface Status {
	featured: boolean;
	new: boolean;
	popular: boolean;
	deprecated: boolean;
}

export interface Resource {
	id: string;
	type: string;
	slug: string;
	title: string;
	summary: string;
	description?: string;
	body?: string;
	tags: string[];
	difficulty: Difficulty;
	source: Source;
	openBehaviors: OpenBehavior[];
	primaryAction: OpenBehavior;
	externalUrl?: string;
	canonicalSource?: { name: string; url: string; author?: string };
	downloads?: Download[];
	editor?: EditorConfig;
	related?: Related[];
	status: Status;
	readingTime?: number;
	updatedAt: string;
	meta?: Record<string, any>;
}

export interface TypeDef {
	id: string;
	label: string;
	plural: string;
	path: string;
	icon: string;
	order: number;
}

export interface TagDef {
	id: string;
	label: string;
	group: string;
}

export interface SearchState {
	q: string;
	scope: string; // 'all' | type id
	tags: string[];
	source: 'all' | Source;
	difficulty: Difficulty[];
	flags: string[]; // 'editor' | 'download' | 'new' | 'popular'
	sort: 'relevance' | 'newest' | 'az';
}
