/**
 * Helpers for falling back to Vietnamese when a translated column holds a value
 * that is technically non-empty but carries no content.
 *
 * The naive `row[`title${l}`] || row.titleVi` pattern works for plain text, where an
 * untranslated field is "". It breaks for two kinds of column:
 *
 *  - per-language JSON (`featuresEn`, `specsEn`, `tiersEn`) default to the literal
 *    strings "[]" / "{}", and the product editor writes all three languages on every
 *    save — so an untranslated field holds "[]", which is truthy.
 *  - rich text written by TipTap, which serialises an empty document to "<p></p>"
 *    rather than "".
 *
 * In both cases `||` never fires and the page renders blank instead of showing the
 * Vietnamese original.
 */

const EMPTY_JSON = new Set(['', '[]', '{}', 'null', 'undefined']);

const EMPTY_HTML = new Set([
  '', '<p></p>', '<p><br></p>', '<p><br/></p>', '<p><br /></p>', '<p>&nbsp;</p>',
]);

type Lang = 'Vi' | 'En' | 'Es';

// eslint-disable-next-line
type Row = Record<string, any>;

function pick(row: Row, base: string, l: Lang, empties: Set<string>): string {
  const raw = row[`${base}${l}`];
  const s = typeof raw === 'string' ? raw.trim() : '';
  return empties.has(s) ? (row[`${base}Vi`] ?? '') : raw;
}

/** For per-language JSON string columns (features, specs, tiers). */
export function pickJson(row: Row, base: string, l: Lang): string {
  return pick(row, base, l, EMPTY_JSON);
}

/** For per-language rich-text/HTML columns (content). */
export function pickHtml(row: Row, base: string, l: Lang): string {
  return pick(row, base, l, EMPTY_HTML);
}
