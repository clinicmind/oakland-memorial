import type { Lang } from '../../site.config';

// 首頁文案。每一句事實都對應 facts.yaml 的編號（見各項 facts 註解）。
// 只用狀態 V 的事實。不用長破折號。年份範圍用 1939-2015。
export interface HomeCopy {
  title: string; description: string; skip: string; menu: string;
  nav: { life: string; work: string; learn: string; writing: string; macau: string; memories: string };
  share: string; readLife: string; otherLang: { label: string; href: string };
  hero: { h1: string; lead: string; alt: string };
  life: { h2: string; lead: string; chapters: { h: string; p: string; alt: string }[] };
  work: { h2: string; lead: string; diagram: { center: string; spokes: string[]; alt: string }; items: { name: string; text: string; value: string }[] };
  idea: { label: string; before: string; strong: string; after: string };
  learn: { h2: string; lead: string; items: { name: string; text: string; value: string }[] };
  writing: { h2: string; lead: string; items: { name: string; text: string; value: string; href: string }[] };
  macau: { h2: string; p: string; quote: string; alt: string };
  memories: { h2: string; p: string };
  close: { h2: string; p: string };
  footer: { lede: string; made: string; credits: string };
}

export const factIds = ['F1','F5','F6','F8','F9','F10','F11','F16','F17','F19','F20','F28','F30','F32'];

export const copy: Record<Lang, HomeCopy> = {
  en: {
    title: 'Thomas D. Oakland, 1939-2015: school psychologist',
    description: 'A memorial and learning site for Thomas D. Oakland, a school psychologist who co-authored tests of adaptive behavior and student styles.',
    skip: 'Skip to content', menu: 'Menu',
    nav: { life: 'History', work: 'Work', learn: 'Learning', writing: 'Writing', macau: 'Macau', memories: 'Memorial' },
    share: 'Share a memory', readLife: 'Read his life',
    otherLang: { label: '繁體中文', href: '' },
    hero: {
      h1: 'Thomas D. Oakland',
      lead: 'School psychologist, 1939-2015. He co-authored tests of adaptive behavior and student styles and worked in more than 40 countries.',
      alt: 'The University of Texas at Austin Main Building',
    },
    life: {
      h2: 'A career history in four universities',
      lead: 'Where he studied, taught and visited.',
      chapters: [
        { h: 'Indiana University', p: 'He earned his master’s degree in educational psychology in 1965 and his doctorate in 1967.', alt: 'Morrison Hall at Indiana University' },
        { h: 'The University of Texas at Austin', p: 'He taught educational psychology here for 27 years.', alt: 'The University of Texas at Austin Main Building' },
        { h: 'University of Florida', p: 'From 1995 he taught school psychology in Gainesville. He retired as Professor Emeritus.', alt: 'A brick building on the University of Florida campus' },
        { h: 'University of Macau', p: 'He was a Visiting Professor in the Department of Psychology from January to May 2011.', alt: 'The administration building of the University of Macau' },
      ],
    },
    work: {
      h2: 'School psychology: tests and a handbook',
      lead: 'Tests, a handbook and posts held in international bodies.',
      diagram: { center: 'ABAS-3', spokes: ['Conceptual', 'Social', 'Practical'], alt: 'The ABAS-3 groups adaptive skills into three domains: conceptual, social and practical.' },
      items: [
        { name: 'Adaptive Behavior Assessment System, Third Edition', text: 'With P. L. Harrison. Rates daily skills in three domains, conceptual, social and practical, from birth to age 89.', value: '2015' },
        { name: 'Student Styles Questionnaire', text: 'With Connie Horton and Joseph Glutting. Looks at how students differ in preference, temperament and personal style.', value: '1996' },
        { name: 'The Handbook of International School Psychology', text: 'Edited with Shane Jimerson and Peter Farrell. SAGE.', value: '2007' },
        { name: 'International bodies', text: 'President of the International School Psychology Association and of the International Test Commission.', value: '' },
      ],
    },
    idea: {
      label: 'The idea',
      before: 'The ABAS-3 he co-authored describes how a person manages',
      strong: 'daily life',
      after: ', from birth to age 89, in conceptual, social and practical skills.',
    },
    learn: {
      h2: 'Learning units from his work',
      lead: 'Five units, each built on a work he co-authored or edited.',
      items: [
        { name: 'Adaptive behavior', text: 'The three domains of the ABAS-3.', value: 'T1' },
        { name: 'Temperament and styles', text: 'The Student Styles Questionnaire.', value: 'T2' },
        { name: 'Tests across cultures', text: 'Adaptive behavior in three countries, 2013.', value: 'T3' },
        { name: 'International school psychology', text: 'The 2007 handbook.', value: 'T4' },
        { name: 'Ethics of test use', text: 'Ethics standards for test development and use, 2007.', value: 'T5' },
      ],
    },
    writing: {
      h2: 'Selected writing on school psychology',
      lead: 'A few works from the full catalogue.',
      items: [
        { name: 'International Perspectives on Academic Assessment', text: 'With Ronald Hambleton. Springer.', value: '1995', href: 'https://doi.org/10.1007/978-94-011-0639-9' },
        { name: 'The Handbook of International School Psychology', text: 'With Shane Jimerson and Peter Farrell. SAGE.', value: '2007', href: 'https://doi.org/10.4135/9781412976138' },
        { name: 'Ethics Standards Impacting Test Development and Use', text: 'A review of 31 ethics codes. International Journal of Testing.', value: '2007', href: 'https://doi.org/10.1080/15305050709336859' },
        { name: 'Cross-National Assessment of Adaptive Behavior in Three Countries', text: 'With Iliescu, Chen and Chen. Journal of Psychoeducational Assessment.', value: '2013', href: 'https://doi.org/10.1177/0734282912469492' },
      ],
    },
    macau: {
      h2: 'Visit to the University of Macau, 2011',
      p: 'From January to May 2011 the Department of Psychology at the University of Macau hosted him as a Visiting Professor for one semester.',
      quote: 'He “worked diligently with our faculty, students and local schools.” The department newsletter, 2010-2011.',
      alt: 'The administration building of the University of Macau',
    },
    memories: {
      h2: 'Memorial notes',
      p: 'Students, colleagues and friends can send a few lines about him. We ask your permission before anything goes up, and you may stay anonymous.',
    },
    close: { h2: 'Share a memory', p: 'A few lines about what he taught you. Each one is read before it goes up.' },
    footer: {
      lede: 'A memorial and learning site. Every fact on it has a source.',
      made: 'Made by ClinicMind, clinical psychologist',
      credits: '',
    },
  },
  'zh-hant': {
    title: 'Thomas D. Oakland（1939-2015）：學校心理學家',
    description: '紀念與學習網站，獻給學校心理學家 Thomas D. Oakland。他共同編製適應行為與學生風格的測驗，足跡遍及 40 多個國家。',
    skip: '跳到主要內容', menu: '選單',
    nav: { life: '生平', work: '貢獻', learn: '學習', writing: '著作', macau: '澳門', memories: '追思' },
    share: '分享回憶', readLife: '閱讀他的生平',
    otherLang: { label: 'English', href: '' },
    hero: {
      h1: 'Thomas D. Oakland',
      lead: '學校心理學家（1939-2015）。他共同編製適應行為與學生風格的測驗，足跡遍及 40 多個國家。',
      alt: 'The University of Texas at Austin 主樓',
    },
    life: {
      h2: '任教與求學的四所大學',
      lead: '他求學、任教與訪問的地方。',
      chapters: [
        { h: 'Indiana University', p: '1965 年取得教育心理學碩士，1967 年取得博士。', alt: 'Indiana University 的 Morrison Hall' },
        { h: 'The University of Texas at Austin', p: '他在這裡教授教育心理學 27 年。', alt: 'The University of Texas at Austin 主樓' },
        { h: 'University of Florida', p: '1995 年起，他在 Gainesville 教授學校心理學，退休時為榮休教授。', alt: 'University of Florida 校園的一棟磚造建築' },
        { h: 'University of Macau', p: '2011 年 1 月至 5 月，他在心理學系擔任訪問教授。', alt: '澳門大學行政大樓' },
      ],
    },
    work: {
      h2: '學校心理學：測驗與手冊',
      lead: '測驗、一部手冊，以及國際組織的職務。',
      diagram: { center: 'ABAS-3', spokes: ['概念', '社會', '實用'], alt: 'ABAS-3 把適應技能分成三個領域：概念、社會與實用。' },
      items: [
        { name: 'Adaptive Behavior Assessment System 第三版', text: '與 P. L. Harrison 合著。從概念、社會、實用三個領域評量日常技能，適用年齡從出生到 89 歲。', value: '2015' },
        { name: 'Student Styles Questionnaire', text: '與 Connie Horton、Joseph Glutting 合著。了解學生在偏好、氣質與個人風格上的差異。', value: '1996' },
        { name: 'The Handbook of International School Psychology', text: '與 Shane Jimerson、Peter Farrell 共同主編，SAGE 出版。', value: '2007' },
        { name: '國際組織', text: '曾任國際學校心理學協會與國際測驗委員會會長。', value: '' },
      ],
    },
    idea: {
      label: '核心想法',
      before: '他共同編製的 ABAS-3，描述一個人如何處理',
      strong: '日常生活',
      after: '：從出生到 89 歲，涵蓋概念、社會與實用技能。',
    },
    learn: {
      h2: '源自他研究的學習單元',
      lead: '五個單元，每個都以他合著或主編的一項作品為基礎。',
      items: [
        { name: '適應行為', text: 'ABAS-3 的三個領域。', value: 'T1' },
        { name: '氣質與風格', text: 'Student Styles Questionnaire。', value: 'T2' },
        { name: '跨文化的測驗', text: '2013 年三個國家的適應行為研究。', value: 'T3' },
        { name: '國際學校心理學', text: '2007 年的手冊。', value: 'T4' },
        { name: '測驗使用的倫理', text: '2007 年的測驗編製與使用倫理標準。', value: 'T5' },
      ],
    },
    writing: {
      h2: '學校心理學精選著作',
      lead: '從完整著作目錄中挑出的幾項。',
      items: [
        { name: 'International Perspectives on Academic Assessment', text: '與 Ronald Hambleton 合編，Springer。', value: '1995', href: 'https://doi.org/10.1007/978-94-011-0639-9' },
        { name: 'The Handbook of International School Psychology', text: '與 Shane Jimerson、Peter Farrell 合編，SAGE。', value: '2007', href: 'https://doi.org/10.4135/9781412976138' },
        { name: 'Ethics Standards Impacting Test Development and Use', text: '檢視 31 部倫理守則。International Journal of Testing。', value: '2007', href: 'https://doi.org/10.1080/15305050709336859' },
        { name: 'Cross-National Assessment of Adaptive Behavior in Three Countries', text: '與 Iliescu、Chen、Chen 合著。Journal of Psychoeducational Assessment。', value: '2013', href: 'https://doi.org/10.1177/0734282912469492' },
      ],
    },
    macau: {
      h2: '2011 年訪問澳門大學',
      p: '2011 年 1 月至 5 月，澳門大學心理學系邀請他擔任訪問教授，為期一個學期。',
      quote: '系刊寫道，他「與我們的教師、學生和本地學校認真合作」。（2010-2011 年系刊）',
      alt: '澳門大學行政大樓',
    },
    memories: {
      h2: '追思紀念',
      p: '學生、同事與朋友，都可以寫幾行關於他的話。公開前我們會先徵求你的同意，你也可以匿名。',
    },
    close: { h2: '分享回憶', p: '寫幾行他教過你的事。每一則都先經過閱讀，才會公開。' },
    footer: {
      lede: '紀念與學習網站。所有事實都有來源。',
      made: '臨床心語（ClinicMind），臨床心理師 製作',
      credits: '',
    },
  },
};
