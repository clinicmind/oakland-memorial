# M9 翻譯審校報告（草稿，待 Opus 審閱）

## 摘要

1. 審校範圍：`src/content/pages/**`、`src/content/data/*.yaml`、`src/i18n/**`、`src/components/**`、`src/pages/**`、`site.config.ts`。不含 `learn` 與 `glossary`。
2. 已修正 27 處。其中 1 處是頁面可見的長破折號，1 處是內部備註外洩到頁面。
3. 簡體字掃描：沒有真正的簡體字。命中的只有 `site.config.ts` 的 `forbiddenNames`（故意放簡體譯名，用來擋字），以及 `床`、`准` 兩個誤報（「臨床」「獲准」是正體寫法）。
4. 澳門文字（`macau.md`、`legacy.md`、U1–U9）沒有改動。
5. `npm run check` 通過（0 errors）。`npm run build` 通過。
6. 待決定的問題有 9 項，見下方第二張表。

### 檢查結果對照

| 檢查項 | 結果 |
|---|---|
| 1. 中英事實一致 | 修了 F29、F16、F8 的差異。其餘一致 |
| 2. 簡體字 | 無（用 OpenCC 加上 `这们发说时国学会对于与为来门问间见关开里` 清單掃描） |
| 3. 術語表（MASTER_PLAN 第 8 節） | 「評量」全站改「評估」。其餘符合 |
| 4. 自然短句、無破折號 | 修 1 處長破折號。`works.yaml` 的書目標題仍有，見待決定 |
| 5. 無中文譯名、無退休年份、無數量、離世寫法 | 退休年份與離世寫法符合。數量見待決定 |
| 6. lang 屬性與 alt | 全站 `html lang` 正確（`zh-Hant`、`en`）。所有 `img` 都有 alt。補了 3 處 `lang` 標記 |

## 一、已修改

| # | 檔案 | 修改前 | 修改後 | 原因 |
|---|---|---|---|---|
| 1 | `src/pages/[lang]/[page].astro` | `— 臨床心語…`（署名前有長破折號） | `撰文：臨床心語…` ／ `By ClinicMind…` | 全站不用長破折號 |
| 2 | `facts.yaml` F29 zh | `…在家中不幸離世。網站只用這一句，並連到 UF 官方聲明。` | `他於 2015 年 3 月 4 日在 Florida 州 Gainesville 家中不幸離世。` | 內部備註顯示在生平頁；補上地點，與英文版和 6.3 一致 |
| 3 | `facts.yaml` F29 en | `…on 4 March 2015 (see the UF College of Education statement).` | `…in Gainesville, Florida, on 4 March 2015.` | 括號文字和後面的連結重複 |
| 4 | `timeline.yaml` T2015b | `Died at home…`／`…家中離世` | `Died tragically at home…`／`…家中不幸離世` | 和 F29、6.3 的語氣一致 |
| 5 | `facts.yaml` F16 zh | `他以 Visiting Professor 身分在澳門大學心理學系訪問一個學期` | `他在澳門大學心理學系擔任訪問教授，為期一個學期` | 首頁與年表已用「訪問教授」；一詞一義；少一個「訪問」 |
| 6 | `facts.yaml` F8 zh | `…任教，專長為學校心理學` | `…教授學校心理學` | 與英文 `taught school psychology` 和首頁一致 |
| 7 | `facts.yaml` F19 zh | `《適應行為評量系統第三版》（ABAS-3，2015）` | `Adaptive Behavior Assessment System 第三版（ABAS-3，2015）` | 第 8 節規則 1：測驗名保留英文；和首頁、測驗頁標題一致 |
| 8 | `facts.yaml` F28 zh | `跨國評量` | `跨國評估` | 術語：assessment 譯「評估」 |
| 9 | `timeline.yaml` T2013 zh | `跨國評量研究` | `跨國評估研究` | 同上 |
| 10 | `home.ts` zh | `…三個領域評量日常技能` | `…三個領域評估日常技能` | 同上 |
| 11 | `tests/abas-3.md` zh | `ABAS-3 評量適應技能` | `ABAS-3 評估適應技能` | 同上 |
| 12 | `pages.ts` zh topics | `'assessment-general': '評量'` | `'評估'` | 同上 |
| 13 | `facts.yaml` F13、`places.md` zh | `Brasília` | `Brasilia` | 與英文版和來源拼法一致 |
| 14 | `facts.yaml` F15、`places.md` zh | `San José` | `San Jose` | 同上 |
| 15 | `pages.ts` zh `count` 與 `works.astro` 內嵌腳本 | `${total} 筆中的 ${n} 筆` | `顯示 ${n} 筆，共 ${total} 筆` | 原句不通順。兩處要一起改 |
| 16 | `pages.ts` zh kinds.career | `任教` | `經歷` | 該類別含學位、訪問，不只任教 |
| 17 | `pages.ts` zh kinds.life | `生活` | `生平` | 該類別是出生與離世；與頁名「生平」一致 |
| 18 | `home.ts` en nav.life | `History` | `Life` | 與頁名 `Life`、中文「生平」一致 |
| 19 | `home.ts` en life.h2 | `A career history in four universities` | `Four universities in his life` | 原句生硬；求學也算在內 |
| 20 | `home.ts` en／zh footer.made | `Made by ClinicMind…`／`…臨床心理師 製作` | `ClinicMind, clinical psychologist`／`臨床心語（ClinicMind），臨床心理師` | 前面已有 `© 2026`，`© 2026 Made by` 不通順 |
| 21 | `home.ts` zh writing item | `與 Shane Jimerson、Peter Farrell 合編` | `共同主編` | 與同頁另一處同一本書的寫法一致 |
| 22 | `en/legacy.md` title、`home.ts` en footer.links.legacy | `Carrying on his work` | `Legacy` | 頁名與第一個小標重複；對應中文「傳承」 |
| 23 | `en/honors.md` | `Awards, in the order of their years. Each carries its source.` | `Awards, listed by year. Each has a source.` | 較短較自然 |
| 24 | `zh-hant/places.md` | `只列出有已查證來源的地方。` | `只列出來源已查證的地方。` | 原句繞口 |
| 25 | `zh-hant/sources.md` | `S12 寫三打以上。` | `S12 寫 36 個以上（原文是 more than three dozen）。` | 「三打」不是自然的中文；數字不變 |
| 26 | `tests/[slug].astro` | `麵包屑`（breadcrumb 的 aria-label） | `頁面路徑` | 直譯；螢幕閱讀器聽不懂 |
| 27 | `credits.astro`、`[lang]/index.astro`、`pages/index.astro` | 中文頁的「攝影」被標成 `lang="en"`；英文書名與大學名沒有 `lang` | 只把英文人名標 `lang="en"`；英文書名、大學名、重新導向頁的 English 連結補 `lang="en"` | 螢幕閱讀器發音正確 |

## 二、待決定

| # | 位置 | 問題 | 建議 |
|---|---|---|---|
| 1 | `facts.yaml` F18a；`life.md`「測驗與書籍」 | 頁面寫「12 本書」。這是出版品數量，Q15 只明說不寫測驗與章節、論文數。F18a 的備註也說 12 本書沒有一本在來源上列出 | 建議改成不寫數字，或確認可寫。需要決定 |
| 2 | `sources.md` 中英第 3 項 | 來源頁列出「11 套、5 套、200 多篇、180 多篇」等數量，違反「全站不寫數量」的字面規則 | 建議保留「來源不一致」的說明，但拿掉數字。或明確同意來源頁例外（如退休年份） |
| 3 | `macau.md` vs F16、首頁、年表 | 核准文字寫「訪問學者／visiting scholar」。F16、首頁、年表寫「訪問教授／Visiting Professor」。來源 S4 是 Visiting Professor | 核准文字不可動。請使用者同意改成「訪問教授」，或其他頁改「訪問學者」 |
| 4 | `macau.md` vs F16 | Q10 說網站不寫學期。F16、首頁、年表寫 2011 年 1 月至 5 月（S4 已確認） | 確認 Q10 已被 S4 取代。若仍要不寫，要改 4 處 |
| 5 | `works.yaml` 第 146、776、2210、2338、2559、2574 行 | 6 筆書目標題含 `—` 或 `–`（例如 `Ages 5–21`、`System – Second Edition`）。顯示在著作頁 | 這是 Crossref 的原標題。若要全站零破折號，要改成 `5-21` 與連字號。我沒改，以免書目不準確 |
| 6 | `facts.yaml` F12 zh | 「國際兒童教育基金會」是自譯。F12 備註要求 M9 確認 | 沒有可查的官方中文名。建議改成英文原名 `International Foundation for Children's Education`（規則 1） |
| 7 | `facts.yaml` F25 zh | 「APA 國際心理學進展傑出貢獻獎」是自譯。備註要求 M9 確認 | 保留譯名並附英文（已有）。請確認譯法 |
| 8 | `src/i18n/ui.ts` | 整個檔案沒有被任何程式引用。裡面的導覽文字（`Works`、`學術貢獻`、`學習中心`）和實際使用的 `home.ts`（`Work`、`貢獻`、`學習`）不同 | 建議刪檔，或讓 M7 學習中心決定導覽用字 |
| 9 | 導覽「貢獻」vs 頁名「著作」vs 首頁區塊「學校心理學：測驗與手冊」 | 同一個區塊有三種名字 | 小問題。建議導覽改「著作」，或維持現狀 |

## 三、其他觀察

1. 中文頁的「系刊寫道」引文（首頁澳門區塊）與英文引文一致。引文是否逐字出自 S4，這次沒有重新核對。
2. `PREVIEW = true`，全站仍是 `noindex`。
3. 搜尋頁使用 Pagefind 預設介面，介面文字語言由 `html lang` 決定。中文頁的介面文字未逐項檢查。
4. `src/content/learn`、`src/content/glossary` 由其他 session 撰寫。完成後，需要用同一支簡體字掃描與術語檢查再跑一次。
