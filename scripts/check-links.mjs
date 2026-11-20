// 內部連結檢查：掃描 dist 的 HTML，每個站內 href／src 都要指到存在的檔案，# 錨點要存在。
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const dist = 'dist';
const base = '/oakland-memorial';
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []; });
const files = walk(dist);
const ids = new Map(files.map((f) => [f, new Set([...readFileSync(f, 'utf8').matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]))]));
const problems = [];
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    let u = m[1];
    if (/^(https?:|mailto:|data:|javascript:)/.test(u)) continue;
    const [path, hash] = u.split('#');
    let target;
    if (!path) target = f;
    else {
      if (!path.startsWith(base)) { problems.push(`${f}: link outside base: ${u}`); continue; }
      const rel = path.slice(base.length);
      target = join(dist, rel);
      if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
      if (!existsSync(target)) { problems.push(`${f}: broken link ${u}`); continue; }
    }
    if (hash && target.endsWith('.html') && !ids.get(target)?.has(hash)) problems.push(`${f}: missing anchor ${u}`);
  }
}
if (problems.length) { console.error(`${problems.length} link problems:\n` + [...new Set(problems)].slice(0, 40).join('\n')); process.exit(1); }
console.log(`links ok (${files.length} pages)`);
