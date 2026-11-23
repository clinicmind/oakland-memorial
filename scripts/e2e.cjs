// 端對端檢查。先 npm run build，再 node scripts/e2e.cjs（會自己啟動 astro preview）。
const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = 'http://localhost:4322/oakland-memorial';
const pages = ['', 'life/', 'honors/', 'places/', 'sources/', 'works/', 'tests/abas-3/', 'tests/ssq/', 'credits/', 'search/', 'macau/', 'legacy/', 'memories/'];
(async () => {
  const srv = spawn('npx', ['astro', 'preview', '--port', '4322'], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 4000));
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  let bad = 0;
  const fail = (m) => { bad++; console.log('FAIL', m); };
  for (const [vw, vh] of [[1440, 900], [390, 844]]) {
    for (const lang of ['en', 'zh-hant']) {
      const ctx = await b.newContext({ viewport: { width: vw, height: vh }, reducedMotion: 'reduce' });
      for (const p of pages) {
        const page = await ctx.newPage();
        const errs = [];
        page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
        page.on('pageerror', (e) => errs.push(String(e)));
        const res = await page.goto(`${base}/${lang}/${p}`, { waitUntil: 'networkidle' });
        const tag = `${lang}/${p} @${vw}`;
        if (res.status() !== 200) fail(`${tag} status ${res.status()}`);
        if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)) fail(`${tag} horizontal scroll`);
        if (errs.length) fail(`${tag} console: ${errs.join(' | ').slice(0, 200)}`);
        await page.evaluate(axe);
        const r = await page.evaluate(() => axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }));
        const bads = r.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
        if (bads.length) fail(`${tag} axe: ${bads.map((v) => v.id + ' ' + v.nodes[0].target.join(' ')).join('; ')}`);
        const lh = await page.evaluate(() => document.documentElement.lang);
        if (lh !== (lang === 'en' ? 'en' : 'zh-Hant')) fail(`${tag} html lang ${lh}`);
        await page.close();
      }
      await ctx.close();
    }
  }
  // 互動
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  let page = await ctx.newPage();
  await page.goto(`${base}/en/life/`, { waitUntil: 'networkidle' });
  const total = await page.locator('.tl li').count();
  await page.focus('.tl-filters button[data-f="award"]');
  await page.keyboard.press('Enter');
  const shown = await page.locator('.tl li:visible').count();
  if (!(shown > 0 && shown < total)) fail(`timeline keyboard filter: ${shown}/${total}`); else console.log('ok timeline filter', shown, '/', total);
  await page.goto(`${base}/en/works/`, { waitUntil: 'networkidle' });
  await page.fill('#wb-q', 'adaptive behavior');
  const n1 = await page.locator('#wb-list > li:visible').count();
  await page.selectOption('#wb-type', 'chapter');
  const n2 = await page.locator('#wb-list > li:visible').count();
  if (!(n1 > 0 && n2 <= n1)) fail(`works filter ${n1} ${n2}`); else console.log('ok works filter', n1, n2);
  for (const [lang, q] of [['en', 'adaptive behavior'], ['zh-hant', '適應行為'], ['en', 'Handbook']]) {
    page = await ctx.newPage();
    await page.goto(`${base}/${lang}/search/`, { waitUntil: 'networkidle' });
    await page.fill('.pagefind-ui__search-input', q);
    await page.waitForSelector('.pagefind-ui__result', { timeout: 8000 }).catch(() => {});
    const n = await page.locator('.pagefind-ui__result').count();
    if (!n) fail(`search "${q}" (${lang}) has no results`); else console.log('ok search', lang, q, n);
    await page.close();
  }
  await b.close(); srv.kill();
  process.exit(bad ? 1 : 0);
})();
