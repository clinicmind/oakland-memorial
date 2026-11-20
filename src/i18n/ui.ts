import type { Lang } from '../../site.config';

// 介面文字（和教授無關的通用字串）。
export const ui = {
  skip: { 'zh-hant': '跳到主要內容', en: 'Skip to content' },
  menu: { 'zh-hant': '選單', en: 'Menu' },
  close: { 'zh-hant': '關閉', en: 'Close' },
  langName: { 'zh-hant': '繁中', en: 'EN' },
  nav: {
    life: { 'zh-hant': '生平', en: 'Life' },
    works: { 'zh-hant': '學術貢獻', en: 'Works' },
    learn: { 'zh-hant': '學習中心', en: 'Learn' },
    macau: { 'zh-hant': '澳門歲月', en: 'Macau' },
    memories: { 'zh-hant': '追思', en: 'Memories' },
  },
  footer: {
    note: {
      'zh-hant': '本站所有事實都有來源。發現錯誤請告訴我們。',
      en: 'Every fact on this site is sourced. Please tell us if you find an error.',
    },
    sources: { 'zh-hant': '資料來源', en: 'Sources' },
    about: { 'zh-hant': '關於本站', en: 'About' },
    report: { 'zh-hant': '回報錯誤', en: 'Report an error' },
  },
  src: { open: { 'zh-hant': '查看來源', en: 'Show source' }, checked: { 'zh-hant': '查證日期', en: 'Checked' }, notChecked: { 'zh-hant': '尚未打開原文核對', en: 'Original not yet checked' } },
  all: { 'zh-hant': '全部', en: 'All' },
  explore: { 'zh-hant': '了解更多', en: 'Explore' },
} as const;

export const t = <T extends Record<Lang, string>>(o: T, lang: Lang) => o[lang];
