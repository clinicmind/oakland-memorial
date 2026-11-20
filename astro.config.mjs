import { defineConfig } from 'astro/config';

// GitHub Pages 專案頁。換教授或換 repo 時只改 site 與 base。
export default defineConfig({
  site: 'https://clinicmind.github.io',
  base: '/oakland-memorial',
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
