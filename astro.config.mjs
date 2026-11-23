import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeMermaid from 'rehype-mermaid';
import rehypeQuiz from './src/plugins/rehype-quiz.mjs';
import rehypeCite from './src/plugins/rehype-cite.mjs';

// GitHub Pages 專案頁。換教授或換 repo 時只改 site 與 base。
export default defineConfig({
  // mermaid 區塊在建置時轉成靜態 SVG（需要 Chromium；失敗時留下原始碼，不拖垮建置）。
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    rehypePlugins: [[rehypeMermaid, {
      strategy: 'inline-svg',
      // 本機若 Playwright 版本和瀏覽器不符，設 CHROMIUM_PATH 指到現有的 Chromium。CI 用 npx playwright install chromium。
      launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : undefined,
      errorFallback: (element) => element,
    }], rehypeQuiz, rehypeCite],
  },
  site: 'https://clinicmind.github.io',
  // CHECK_BUILD=1 建置給 skill 的 gate 檢查用（--root dist），連結才不會因 base 失效。正式部署不設這個變數。
  base: process.env.CHECK_BUILD ? '/' : '/oakland-memorial',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('learn-demo'), i18n: { defaultLocale: 'zh-hant', locales: { 'zh-hant': 'zh-Hant', en: 'en' } } })],
  i18n: {
    defaultLocale: 'zh-hant',
    locales: [
      { path: 'zh-hant', codes: ['zh-Hant', 'zh-TW'] },
      { path: 'en', codes: ['en'] },
    ],
    routing: { prefixDefaultLocale: true },
  },
});
