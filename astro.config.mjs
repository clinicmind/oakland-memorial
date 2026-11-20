import { defineConfig } from 'astro/config';

// GitHub Pages 專案頁。換教授或換 repo 時只改 site 與 base。
export default defineConfig({
  site: 'https://clinicmind.github.io',
  // CHECK_BUILD=1 建置給 skill 的 gate 檢查用（--root dist），連結才不會因 base 失效。正式部署不設這個變數。
  base: process.env.CHECK_BUILD ? '/' : '/oakland-memorial',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'zh-hant',
    locales: [
      { path: 'zh-hant', codes: ['zh-Hant', 'zh-TW'] },
      { path: 'en', codes: ['en'] },
    ],
    routing: { prefixDefaultLocale: true },
  },
});
