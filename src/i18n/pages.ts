import type { Lang } from '../../site.config';
// 子頁的介面文字。
export const ps = {
  en: {
    timeline: 'Timeline', filter: 'Filter the timeline', all: 'All',
    kinds: { life: 'Life', career: 'Career', award: 'Honors', work: 'Works', service: 'Service' },
    sourceCol: 'Source', checked: 'Checked', notChecked: 'Not checked', open: 'Open the source',
    unopened: 'Not opened', readFull: 'Read the full timeline', allHonors: 'See all honors', places: 'See the places',
    deathLink: 'UF College of Education statement',
  },
  'zh-hant': {
    timeline: '年表', filter: '篩選年表', all: '全部',
    kinds: { life: '生活', career: '任教', award: '榮譽', work: '著作', service: '服務' },
    sourceCol: '來源', checked: '查證日期', notChecked: '尚未查證', open: '開啟來源',
    unopened: '未能打開', readFull: '閱讀完整年表', allHonors: '查看所有榮譽', places: '查看足跡',
    deathLink: 'UF 教育學院聲明',
  },
} satisfies Record<Lang, unknown>;

export const wk = {
  en: {
    title: 'Works', description: 'Tests, books, chapters and articles by Thomas D. Oakland, from Crossref. Bibliographic data only.',
    lead: 'Tests, books, chapters and articles. Bibliographic data only: titles, authors, years and links. No test items, scoring or norms.',
    tests: 'Tests', books: 'Books', browser: 'All works', search: 'Search titles and authors', type: 'Type', topic: 'Topic', all: 'All',
    types: { test: 'Test', book: 'Book', article: 'Article', chapter: 'Chapter' },
    topics: { 'adaptive-behavior': 'Adaptive behavior', 'temperament-styles': 'Temperament and styles', 'test-adaptation': 'Test adaptation', international: 'International', 'ethics-professional': 'Ethics and professional issues', 'assessment-general': 'Assessment', other: 'Other' },
    count: (n: number, total: number) => `${n} of ${total} works`, after: 'Published after 2015', testNote: 'Tests have their own pages.', doi: 'DOI',
    note: 'Data from Crossref, checked entry by entry on 2026-11-20. The list may be incomplete.',
  },
  'zh-hant': {
    title: '著作', description: 'Thomas D. Oakland 的測驗、書籍、章節與論文，資料來自 Crossref。只有書目資料。',
    lead: '測驗、書籍、章節與論文。只有書目資料：標題、作者、年份與連結。不含測驗題目、計分或常模。',
    tests: '測驗', books: '書籍', browser: '全部著作', search: '搜尋標題與作者', type: '類型', topic: '主題', all: '全部',
    types: { test: '測驗', book: '書籍', article: '論文', chapter: '章節' },
    topics: { 'adaptive-behavior': '適應行為', 'temperament-styles': '氣質與風格', 'test-adaptation': '測驗改編', international: '國際', 'ethics-professional': '倫理與專業議題', 'assessment-general': '評量', other: '其他' },
    count: (n: number, total: number) => `${total} 筆中的 ${n} 筆`, after: '2015 年後出版', testNote: '測驗有各自的頁面。', doi: 'DOI',
    note: '資料來自 Crossref，2026-11-20 逐筆核對。清單可能不完整。',
  },
} satisfies Record<Lang, unknown>;
