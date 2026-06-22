/** Tiny, safe markdown → HTML renderer (headings, lists, bold, code, paragraphs). */
function esc(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function inline(s: string): string {
	return esc(s)
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/`(.+?)`/g, '<code>$1</code>')
		.replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export function renderMarkdown(md: string): string {
	if (!md) return '';
	const lines = md.split('\n');
	const out: string[] = [];
	let list: 'ul' | 'ol' | null = null;

	const closeList = () => {
		if (list) {
			out.push(`</${list}>`);
			list = null;
		}
	};

	for (const raw of lines) {
		const line = raw.trimEnd();
		if (!line.trim()) {
			closeList();
			continue;
		}
		const h = line.match(/^(#{1,4})\s+(.*)$/);
		if (h) {
			closeList();
			const lvl = h[1].length;
			out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`);
			continue;
		}
		const ol = line.match(/^\d+\.\s+(.*)$/);
		const ul = line.match(/^[-*]\s+(.*)$/);
		if (ol) {
			if (list !== 'ol') {
				closeList();
				out.push('<ol>');
				list = 'ol';
			}
			out.push(`<li>${inline(ol[1])}</li>`);
			continue;
		}
		if (ul) {
			if (list !== 'ul') {
				closeList();
				out.push('<ul>');
				list = 'ul';
			}
			out.push(`<li>${inline(ul[1])}</li>`);
			continue;
		}
		closeList();
		out.push(`<p>${inline(line)}</p>`);
	}
	closeList();
	return out.join('\n');
}
