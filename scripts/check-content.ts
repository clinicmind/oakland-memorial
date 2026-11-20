// 內容檢查（MASTER_PLAN 5.3 第 1–4 項）。失敗時 exit 1。
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'yaml';

export type Problem = string;
const LANGS = ['zh-hant', 'en'];
const BAD_STATUS = new Set(['C', 'X']);

function walk(dir: string, ext: string[]): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p, ext) : ext.some((e) => p.endsWith(e)) ? [p] : [];
  });
}
function frontmatter(text: string): { data: any; body: string } {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return m ? { data: parse(m[1]) ?? {}, body: m[2] } : { data: {}, body: text };
}
const yamlList = (p: string): any[] => (existsSync(p) ? parse(readFileSync(p, 'utf8')) ?? [] : []);

export function checkContent(root: string, forbiddenNames: string[]): Problem[] {
  const problems: Problem[] = [];
  const content = join(root, 'src/content');
  const data = join(content, 'data');

  const sources = yamlList(join(data, 'sources.yaml'));
  const facts = yamlList(join(data, 'facts.yaml'));
  const sourceIds = new Set(sources.map((s) => s.id));
  const factById = new Map(facts.map((f) => [f.id, f]));

  // 2. 來源完整
  const needSources = (kind: string, rows: any[]) => {
    for (const r of rows) {
      const noSourceOk = kind === 'fact' && r.status === 'C'; // C 事實本來就不可上線
      if (!noSourceOk && (!Array.isArray(r.sourceIds) || r.sourceIds.length === 0))
        problems.push(`[來源] ${kind} ${r.id}: 沒有 sourceIds`);
      for (const s of r.sourceIds ?? [])
        if (!sourceIds.has(s)) problems.push(`[來源] ${kind} ${r.id}: sourceId ${s} 不存在於 sources.yaml`);
    }
  };
  needSources('fact', facts);
  needSources('timeline', yamlList(join(data, 'timeline.yaml')));
  needSources('work', yamlList(join(data, 'works.yaml')));

  // 3. 狀態把關：被引用的事實
  const checkFactRef = (where: string, id: string) => {
    const f = factById.get(id);
    if (!f) return problems.push(`[狀態] ${where}: 引用不存在的事實 ${id}`);
    if (BAD_STATUS.has(f.status)) problems.push(`[狀態] ${where}: 引用狀態 ${f.status} 的事實 ${id}`);
    if (f.status === 'U' && f.approvedByUser !== true) problems.push(`[狀態] ${where}: U 事實 ${id} 未經使用者確認`);
  };
  for (const t of yamlList(join(data, 'timeline.yaml')))
    for (const id of t.factIds ?? []) checkFactRef(`timeline ${t.id}`, id);

  // 1. 雙語對等 + 3. 長文引用 + 4. 禁用字
  for (const coll of ['pages', 'learn', 'glossary', 'memories']) {
    const files = walk(join(content, coll), ['.md', '.mdx']);
    const rel = new Map<string, Set<string>>();
    for (const f of files) {
      const r = relative(join(content, coll), f).split(/[\\/]/);
      const lang = r[0];
      const slug = r.slice(1).join('/');
      if (!LANGS.includes(lang)) { problems.push(`[雙語] ${coll}/${r.join('/')}: 第一層目錄必須是 ${LANGS.join(' 或 ')}`); continue; }
      if (!rel.has(slug)) rel.set(slug, new Set());
      rel.get(slug)!.add(lang);
      const { data: fm, body } = frontmatter(readFileSync(f, 'utf8'));
      for (const id of fm.factIds ?? []) checkFactRef(`${coll}/${r.join('/')}`, id);
      for (const m of body.matchAll(/\{fact:([A-Za-z0-9]+)\}/g)) checkFactRef(`${coll}/${r.join('/')}`, m[1]);
      for (const s of fm.sourceIds ?? [])
        if (!sourceIds.has(s)) problems.push(`[來源] ${coll}/${r.join('/')}: sourceId ${s} 不存在`);
    }
    for (const [slug, langs] of rel)
      for (const l of LANGS)
        if (!langs.has(l)) problems.push(`[雙語] ${coll}/${slug}: 缺少 ${l} 版本`);
  }
  for (const f of [...walk(content, ['.md', '.mdx', '.yaml']), ...walk(join(root, 'src/pages'), ['.astro', '.md'])]) {
    const text = readFileSync(f, 'utf8');
    for (const w of forbiddenNames)
      if (text.includes(w)) problems.push(`[禁用字] ${relative(root, f)}: 出現「${w}」（教授沒有中文名字）`);
  }
  return problems;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const cfg = readFileSync('site.config.ts', 'utf8');
  const m = cfg.match(/forbiddenNames:\s*\[([^\]]*)\]/);
  const names = m ? [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]) : [];
  const problems = checkContent(process.cwd(), names);
  if (problems.length) {
    console.error(`內容檢查失敗（${problems.length} 項）：\n` + problems.map((p) => '  - ' + p).join('\n'));
    process.exit(1);
  }
  console.log('內容檢查通過。');
}
