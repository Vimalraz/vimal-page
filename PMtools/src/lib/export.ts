import type { Resource, EditorSection } from './types';

export function downloadText(filename: string, text: string, mime = 'text/markdown') {
	const blob = new Blob([text], { type: `${mime};charset=utf-8` });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

export async function copyText(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}

/** Render a template scaffold (headings + guidance, blank to fill in) to markdown. */
export function templateScaffoldToMarkdown(title: string, sections: EditorSection[]): string {
	const out: string[] = [`# ${title}`, ''];
	for (const s of sections) {
		out.push(`## ${s.title}`);
		if (s.help) out.push(`> ${s.help}`);
		if (s.type === 'list') {
			out.push('- ', '- ');
		} else if (s.type === 'fields') {
			for (const f of s.fields ?? []) out.push(`**${f.label}:** `);
		} else {
			out.push('');
		}
		out.push('');
	}
	return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

/** Default content generators for non-editor downloadable resources. */
export function resourceToMarkdown(r: Resource): string {
	const out: string[] = [`# ${r.title}`, '', r.summary, ''];
	if (r.type === 'checklist' && r.meta?.items) {
		for (const it of r.meta.items as { label: string }[]) out.push(`- [ ] ${it.label}`);
		return out.join('\n');
	}
	if (r.type === 'framework' && r.meta) {
		const m = r.meta;
		const block = (h: string, arr?: string[]) => {
			if (arr?.length) {
				out.push(`## ${h}`, ...arr.map((x) => `- ${x}`), '');
			}
		};
		block('When to use', m.whenToUse);
		block('When not to use', m.whenNotToUse);
		block('Inputs', m.inputs);
		block('Steps', m.steps);
		block('Outputs', m.outputs);
		block('Common mistakes', m.mistakes);
		if (m.example) out.push('## Example', m.example);
		return out.join('\n');
	}
	if (r.body) out.push(r.body);
	return out.join('\n');
}
