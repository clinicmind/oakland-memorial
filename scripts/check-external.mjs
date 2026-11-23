// 外部連結檢查（手動執行，不進 CI：外部網站會擋機器人）。node scripts/check-external.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []; });
const urls = new Set();
for (const f of walk('dist')) for (const m of readFileSync(f, 'utf8').matchAll(/href="(https?:\/\/[^"#]+)/g)) { const u = m[1].replace(/&amp;/g, '&'); if (!process.env.SKIP_DOI || !u.includes('doi.org')) urls.add(u); }
const bad = [];
for (const u of urls) {
  let status = 0;
  try {
    const r = await fetch(u, { method: 'GET', redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (link check)' }, signal: AbortSignal.timeout(20000) });
    status = r.status;
  } catch (e) { status = String(e.cause?.code || e.message); }
  const ok = typeof status === 'number' && status < 400;
  console.log(ok ? 'ok ' : 'BAD', status, u);
  if (!ok) bad.push([status, u]);
  await new Promise((r) => setTimeout(r, 400));
}
console.log(`\n${urls.size} external links, ${bad.length} not reachable (a 403/429 may be the site blocking bots).`);
