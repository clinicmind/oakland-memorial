// 用法：先 npm run build && npx astro preview --port 4321，再 node scripts/shots.cjs <outDir>
const { chromium } = require('playwright');
const fs = require('fs');
const axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const out = process.argv[2] || 'shots';
fs.mkdirSync(out, { recursive: true });
const base = 'http://localhost:4321/oakland-memorial';
const runs = [
  ['desk-zh', 'zh-hant', 1360, 900], ['desk-en', 'en', 1360, 900],
  ['mob-zh', 'zh-hant', 390, 844], ['mob-en', 'en', 360, 780],
];
(async () => {
  const b = await chromium.launch();
  let bad = 0;
  for (const scheme of ['light', 'dark'])
  for (const [name, lang, w, h] of runs) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, colorScheme: scheme, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    const errs = [];
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto(`${base}/${lang}/styleguide/`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const hscroll = await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    await p.evaluate(axe);
    const res = await p.evaluate(() => axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }));
    const serious = res.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    if (scheme === 'light') await p.screenshot({ path: `${out}/${name}.png`, fullPage: true });
    console.log(scheme, name, 'hscroll=', hscroll, 'console errors=', errs.length, 'axe serious/critical=', serious.length, 'all=', res.violations.length);
    serious.forEach((v) => console.log('  -', v.id, v.nodes.slice(0, 3).map((n) => n.target.join(' ') + ' :: ' + (n.any[0]?.message || '')).join(' | ')));
    errs.forEach((e) => console.log('  console:', e));
    if (hscroll || errs.length || serious.length) bad++;
    await ctx.close();
  }
  await b.close();
  process.exit(bad ? 1 : 0);
})();
