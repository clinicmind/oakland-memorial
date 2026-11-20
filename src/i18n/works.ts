// 著作書目的 APA 風格格式化（只用 works.yaml 的欄位）。
export function initials(given: string): string {
  return given.split(/[\s-]+/).filter(Boolean).map((p) => (/^[A-Za-z]/.test(p) ? `${p[0].toUpperCase()}.` : p)).join(' ');
}
export function authorName(a: string): string {
  const [family, ...rest] = a.split(',');
  const given = rest.join(',').trim();
  return given ? `${family.trim()}, ${initials(given)}` : family.trim();
}
export function authorList(authors: string[]): string {
  const n = authors.map(authorName);
  if (n.length <= 2) return n.join(' & ');
  return `${n.slice(0, -1).join(', ')}, & ${n[n.length - 1]}`;
}
