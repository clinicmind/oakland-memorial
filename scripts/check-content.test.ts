// 檢查腳本的負向測試：故意放壞資料，確認檢查會失敗。
import { cpSync, mkdtempSync, rmSync, writeFileSync, appendFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkContent } from './check-content';

const names = ['奧克蘭', '歐克蘭'];
let failed = 0;
function scenario(label: string, mutate: (root: string) => void, expect: RegExp | null) {
  const root = mkdtempSync(join(tmpdir(), 'chk-'));
  cpSync('src/content', join(root, 'src/content'), { recursive: true });
  cpSync('src/pages', join(root, 'src/pages'), { recursive: true });
  mutate(root);
  const problems = checkContent(root, names);
  rmSync(root, { recursive: true, force: true });
  const ok = expect ? problems.some((p) => expect.test(p)) : problems.length === 0;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok) { failed++; console.log('      problems:', problems); }
}

const page = (lang: string, fm: string, body = 'x') => `---\ntitle: t\n${fm}\n---\n${body}\n`;

scenario('基準資料通過', () => {}, null);
scenario('引用狀態 C 的事實會失敗', (r) =>
  writeFileSync(join(r, 'src/content/pages/en/bad.md'), page('en', 'factIds: [F33]')), /\[狀態\].*F33/);
scenario('引用狀態 X 的事實會失敗', (r) =>
  writeFileSync(join(r, 'src/content/pages/en/bad.md'), page('en', 'factIds: [F18b]')), /\[狀態\].*F18b/);
scenario('內文 {fact:} 引用 C 會失敗', (r) =>
  writeFileSync(join(r, 'src/content/pages/en/bad.md'), page('en', '', 'see {fact:F31b}')), /\[狀態\].*F31b/);
scenario('刪掉一個 en 檔會失敗', (r) =>
  unlinkSync(join(r, 'src/content/pages/en/home.md')), /\[雙語\].*home\.md.*en/);
scenario('sourceId 不存在會失敗', (r) =>
  writeFileSync(join(r, 'src/content/data/timeline.yaml'),
    '- id: T1\n  year: 1939\n  kind: life\n  title: {en: a, zh-hant: b}\n  factIds: [F2]\n  sourceIds: [S99]\n'), /\[來源\].*S99/);
scenario('中文譯名會失敗', (r) =>
  appendFileSync(join(r, 'src/content/pages/zh-hant/home.md'), '\n奧克蘭教授\n'), /\[禁用字\]/);
scenario('U 事實未確認會失敗', (r) => {
  appendFileSync(join(r, 'src/content/data/facts.yaml'),
    '- id: U1\n  claim: {en: a, zh-hant: b}\n  sourceIds: [S4]\n  status: U\n  checkedOn: null\n');
  writeFileSync(join(r, 'src/content/pages/en/bad.md'), page('en', 'factIds: [U1]'));
}, /\[狀態\].*U1/);

if (failed) { console.error(`${failed} 項測試失敗`); process.exit(1); }
console.log('全部負向測試通過。');
