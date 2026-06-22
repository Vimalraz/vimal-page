type Inputs = Record<string, number>;

export interface CalcOutput {
	label: string;
	value: string;
	hint?: string;
	big?: boolean;
}

const fin = (n: number) => Number.isFinite(n);
const money = (n: number) => (fin(n) ? '$' + Math.round(n).toLocaleString('en-US') : '—');
const num = (n: number, d = 0) =>
	fin(n) ? n.toLocaleString('en-US', { maximumFractionDigits: d }) : '—';

/** compute registry keyed by resource.meta.compute */
export const calculators: Record<string, (i: Inputs) => CalcOutput[]> = {
	cac: (i) => [
		{ label: 'Customer Acquisition Cost', value: money(i.spend / i.customers), big: true }
	],
	ltv: (i) => {
		const ltv = (i.arpu * (i.grossMargin / 100)) / (i.churn / 100);
		return [
			{ label: 'Lifetime Value', value: money(ltv), big: true },
			{ label: 'Avg. customer lifespan', value: fin(100 / i.churn) ? (100 / i.churn).toFixed(1) + ' months' : '—' }
		];
	},
	'ltv-cac-ratio': (i) => {
		const r = i.ltv / i.cac;
		return [
			{
				label: 'LTV : CAC ratio',
				value: (fin(r) ? r.toFixed(1) : '—') + ' : 1',
				big: true,
				hint: !fin(r)
					? ''
					: r >= 3
						? 'Healthy — at or above the 3:1 benchmark'
						: 'Below 3:1 — acquisition may be too expensive'
			}
		];
	},
	'cac-payback': (i) => {
		const m = i.cac / (i.arpu * (i.grossMargin / 100));
		return [
			{
				label: 'CAC payback period',
				value: (fin(m) ? m.toFixed(1) : '—') + ' months',
				big: true,
				hint: !fin(m) ? '' : m <= 12 ? 'Under 12 months — efficient' : 'Over 12 months — watch cash flow'
			}
		];
	},
	'rice-score': (i) => {
		const s = (i.reach * i.impact * (i.confidence / 100)) / i.effort;
		return [{ label: 'RICE score', value: fin(s) ? num(Math.round(s)) : '—', big: true }];
	},
	'funnel-conversion': (i) => {
		const s1 = i.visitors * (i.signup / 100);
		const s2 = s1 * (i.activation / 100);
		const s3 = s2 * (i.paid / 100);
		const overall = i.visitors ? (s3 / i.visitors) * 100 : NaN;
		return [
			{ label: 'Signed up', value: num(s1) },
			{ label: 'Activated', value: num(s2) },
			{ label: 'Paying', value: num(s3), big: true },
			{ label: 'Overall conversion', value: fin(overall) ? overall.toFixed(2) + '%' : '—' }
		];
	},
	runway: (i) => {
		const m = i.cash / i.burn;
		return [
			{
				label: 'Runway',
				value: (fin(m) ? m.toFixed(1) : '—') + ' months',
				big: true,
				hint: !fin(m) ? '' : m < 6 ? 'Under 6 months — raise or cut soon' : ''
			}
		];
	},
	'tam-sam-som': (i) => {
		const tam = i.customers * i.acv;
		const sam = tam * (i.samPct / 100);
		const som = sam * (i.somPct / 100);
		return [
			{ label: 'TAM (total addressable)', value: money(tam) },
			{ label: 'SAM (serviceable)', value: money(sam) },
			{ label: 'SOM (obtainable)', value: money(som), big: true }
		];
	}
};
