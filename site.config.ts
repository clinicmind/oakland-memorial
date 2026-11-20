// 所有和教授有關的字串只放這裡或 src/content/。元件與版面不可寫死人名。
export const LOCALES = ['zh-hant', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'zh-hant';
export const HTML_LANG: Record<Lang, string> = { 'zh-hant': 'zh-Hant', en: 'en' };

export const site = {
  person: {
    name: 'Thomas D. Oakland',
    born: '1939',
    died: '2015',
  },
  organizer: {
    'zh-hant': '臨床心語（ClinicMind），臨床心理師',
    en: 'ClinicMind, clinical psychologist',
  },
  title: {
    'zh-hant': 'Thomas D. Oakland 教授紀念網站',
    en: 'In Memoriam: Thomas D. Oakland',
  },
  // 教授沒有中文名字。內容不可出現的中文譯名樣式（供 check-content 使用）。
  forbiddenNames: ['奧克蘭', '歐克蘭', '奥克兰', '欧克兰', '奧克蘭德'],
} as const;
