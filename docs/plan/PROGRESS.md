# 進度 Progress

> 每個 session 開始時讀；結束時更新。最新的放最上面。

## 總覽

| # | Milestone | 狀態 | 執行者 | 完成日期 |
|---|---|---|---|---|
| — | 規劃 v2、設計規格、原型、執行手冊 | ✅ 完成 | Fable／Opus | 2026-11-17 |
| M0 | 環境準備（P1–P4、Q9–Q13） | ✅ 完成（P4、Q13 延後） | 使用者 | 2026-11-20 |
| M1 | 事實查證 | ✅ 完成（有限制） | Sonnet | 2026-11-20 |
| M2 | 著作目錄 | ✅ 完成（有限制） | Sonnet | 2026-11-20 |
| M3 | 專案骨架＋檢查腳本 | 🔄 程式完成；待 P4 與 CI 實跑 | Sonnet | |
| M4 | 設計系統 v2（taste-skill）＋首頁 | ✅ 完成（gate PASS：英文、中文） | Sonnet | 2026-11-20 |
| M5 | 首頁＋生平區 | ✅ 完成（有限制：足跡用清單，沒有 SVG 地圖） | Sonnet | 2026-11-20 |
| M6 | 學術貢獻區 | ✅ 完成（測驗 2 套） | Sonnet | 2026-11-20 |
| M7 | 學習中心 | ⬜ | Opus 內容／Sonnet 頁面 | |
| M8 | 澳門歲月、傳承、追思牆 | 🔄 頁面完成；待 Tally 網址與真照片 | Sonnet＋使用者 | |
| M9 | 翻譯審校 | ⬜ | Opus | |
| M10 | 上線前檢查、預覽部署 | ⬜ | Sonnet | |
| M11 | 聯絡家屬提醒、公開、模板化 | ⬜ | Sonnet＋使用者 | |

進度：7/12 ▓▓▓▓▓▓▓░░░░░ 58%（M0–M6）

預計：約 11–13 個工作 session；使用者及時回覆時約 1.5–2 週完成預覽版。

## 下一個任務

1. **M7 學習中心**：Sonnet 先做版面與元件（單元頁、Quiz、GlossaryTerm、詞彙表）。內容（T1–T5、測驗題、詞彙定義）**建議轉 Opus**。
2. **M8**：需要使用者的資料（Q13、照片、投稿管道）。見下方。
3. **M9 翻譯審校**：建議轉 Opus。
4. **M10 剩餘項目**：Lighthouse 手機分數、外部連結檢查、`@astrojs/sitemap`（內容穩定後做）。
5. **M11**：提醒使用者聯絡家屬或 UF（Playbook M11 原文），再取消 `PREVIEW`。

## 待使用者回答

- **Tally 表單網址**：使用者建立表單後給我，我填入 `site.config.ts` 的 `MEMORY_FORM_URL`。欄位設計：姓名（可匿名）、與教授的關係（學生／同事／朋友）、留言、「同意公開」勾選（必填）。在此之前，按鈕連到 `/[lang]/memories/` 說明頁，頁面寫「投稿表單即將開放」。
- 替代照片換成真照片：hero（書和杯子，或有授權的肖像）、其他。

- Q13 `MACAU_STORY.md` 草稿是否同意（M8 前）
- P4 Repo Settings → Pages → Source 選 GitHub Actions（M3 部署前）
- 照片（M8 前）

## 紀錄

### 2026-11-20 M8（頁面）

- Q13 同意，照草稿使用。新增 U1–U9（`approvedByUser: true`，來源 `UM`）、`/[lang]/macau/`、`/legacy/`、`/memories/`。文字照草稿，第一人稱，署名「臨床心語（ClinicMind），臨床心理師」。沒有其他同學的名字；治療師公會不寫正式名稱；不寫喪禮地點。
- 首頁新增連結到這三頁；所有「Share a memory」按鈕指向 `MEMORY_FORM_URL`（目前是 null，所以連到說明頁）。首頁 gate 英文、中文 PASS。
- 仍待：Tally 網址；替代照片換成真照片（使用者選擇「先用替代照片」）；M8 說的「照片紀錄」（來源、拍攝者、授權、照片中的人）等有真照片時再建。追思留言目前 0 則（`memories` collection 的投稿項目還沒有）。
- 澳門草稿用「visiting scholar」，S4 原文是「Visiting Professor」。草稿是使用者核准的文字，我沒有改。


### 2026-11-20 M5／M6／M10（部分）

- M5：`/[lang]/life/`（敘事＋年表，鍵盤可篩選）、`honors/`、`places/`、`sources/`（含來源不一致說明）、`credits/`。每個事實句後面有來源標籤，連到來源頁錨點。
- M6：`works/`（測驗、書籍、可搜尋與篩選的全部著作；來自 Crossref，標示 2015 年後出版）、`tests/abas-3/`（含三領域圖解）、`tests/ssq/`。沒有任何題目、計分或常模。Pagefind 全站搜尋（`search/`），中英文關鍵字都有結果。
- M10（先做的部分）：全站 `noindex`＋`robots.txt` Disallow（`site.config.ts` 的 `PREVIEW`）、canonical、hreflang（zh-Hant、en、x-default）、內部連結檢查（`npm run check:links`，已進 CI）。檢查抓到並修正一個 bug：帶錨點的連結多一個斜線，來源標籤點不到。
- 驗證：`scripts/e2e.cjs`（preview 上全頁 axe、無橫向捲動、無 console 錯誤、`lang` 正確；年表鍵盤篩選、著作篩選、搜尋）全部通過。首頁 gate 英文與中文再次 PASS（4 個 waiver）。
- 新的 waiver：`neighbour #writing`（手機上該區塊的長度不是整數個螢幕）。
- 限制：足跡頁是清單，沒有世界地圖；子頁沒有跑 consistency（那是首頁的一區一畫面規則；規格明說子頁用單欄閱讀）；Lighthouse 還沒跑；外部連結還沒檢查。
- 規格差異：子頁不用 `main > section`（kit 會把它撐成固定螢幕高度並裁切長內容），改用 `div.doc-block`。


### 2026-11-20 M4 v2（taste-skill 設計）

- 依 DESIGN_SPEC v2 重做。發牌結果沒有改（cool-white-slate、Albert Sans、photo hero、photo-chapters＋word-highlight、nav-centre、footer-dark、close-type、surface-pairs、tonal、initial）。
- **Gate：英文 PASS、中文 PASS。** 3 個 waiver（上限 5）：`copy-headline`（h1 是人名，規格已同意）；`hero-lines`、`hero-maxchars`（zh 頁：checker 把 h1 灌到 32 字做壓力測試，實際 h1 17 字放得下）。
- perf：0 FAIL（字體改用 unicode-range 切片，圖片有 500／960／1280 srcset）。layout check 無 findings。截圖在 `docs/plan/design-v2-shots/`（5 種寬度在 `shots/`，不進 repo）。
- 偏離規格或 skill：
  1. hero lead 改成「He co-authored tests and worked in more than 40 countries.」（原文「built fairer ways to assess children」沒有來源）。
  2. 導覽的主按鈕改為文字連結（`nav__link`），原因：手機 320 寬放不下 logo＋按鈕＋選單。語言切換在導覽右側。
  3. 首頁標題改成含主題名詞的寫法（checker 的 copy-headings）：例如「A career history in four universities」。
  4. 澳門區塊用中葡文路牌照片（Commons，2024 年拍攝，只是方向牌，不暗示 2011 年的場景）；人生章節的澳門照片是舊校園（2011 年正確）。
  5. `photos.mjs fetch` 在 Commons 限流（HTTP 429）時會卡住，改用同樣的縮圖網址慢速下載，自己轉 WebP 並寫 `credits.json`。沒有修改 skill 檔案。
- 替代照片（全部要換成使用者提供或有授權的照片）：hero＝UT Austin 塔樓（CC BY-SA 4.0）；Indiana＝Morrison Hall（CC BY-SA 3.0）；UT＝Main Building（CC0）；UF＝Florida Gymnasium 磚造建築（CC BY-SA 3.0）；澳門＝UM 行政大樓（CC BY-SA 1.0）；learn＝空講堂（公有領域）；writing＝Yale 法學院圖書館閱覽室（CC BY-SA 3.0）；macau＝路牌（CC BY-SA 4.0）；memories＝公園長椅（CC0）。授權列表在 `/[lang]/credits/`。
- 未做：來源標籤（S1 等）在首頁沒有。子頁會有。投稿管道還沒決定，「Share a memory」現在連到頁內的 #memories。


### 2026-11-20 M4

- 完成：`tokens.css`、`global.css`、Fontsource 字體（Newsreader、Inter Variable、Noto Serif/Sans TC，400／500）、元件 SiteHeader、LangSwitch、MobileNav、Hero、StatRow、ContributionCard、Timeline、TimelineItem、SourceBadge（popover）、QuoteBlock、TopicTile、Callout、Breadcrumb、SiteFooter；`/[lang]/styleguide/`（noindex）。
- 驗證：4 種視窗 × 亮／暗，共 8 組。無橫向捲動、無 console 錯誤、axe 無 serious／critical（0 項違規）。選單開關、Esc、來源 popover、年表篩選都用 Playwright 測過。截圖在 `docs/plan/styleguide-shots/`，腳本 `scripts/shots.cjs`。
- **偏離規格（為了對比 ≥ 4.5:1）**：淺色 `--ink-3` 由 `#8A857C` 改 `#6E695F`；淺色 `--brass` 由 `#A0742C` 改 `#8A6420`。原規格值對比約 3.3:1 與 3.6:1。深色模式不變（`--ink-3` 由 `#8B877E` 微調為 `#9A958B`）。
- 原型的示意文字有未查證內容（如「11 套」「2010 訪問」），styleguide 不使用。數字用 `00` 占位。
- 限制：WorldMap、TestStructure、WorksBrowser、Quiz、GlossaryTerm、PhotoGallery、StoryCard 留到 M5–M8。導覽連結（life/works/learn/macau/memories）頁面尚未建立。

### 2026-11-20 M2

- `works.yaml`：233 筆。231 筆來自 Crossref（子代理找出 DOI，我再逐筆用 Crossref 重查，標題、作者都由 API 回傳；每筆作者含 Oakland）。另 2 筆測驗：SSQ（S14）、ABAS-3（S17）。來源 S19 = Crossref。
- 排除：33 筆 PsycEXTRA dataset／posted-content（通訊、會議報告，書目性質不明）。不確定的 2 筆放 `docs/plan/works-uncertain.yaml`，不上線。2 筆因 429 沒重查（已排除）。
- 限制：Crossref 召回不完整，清單不是窮盡的。11 套測驗只找到 2 套（SSQ、ABAS-3）；ABAS-II（2003）只有書目引用（F31a）。Pearson 頁說 5 套、訃聞說 11 套（F18b），不寫數字。
- 書籍（Open Library 找到約 10 本，如 1974 *Assessing minority group children*、2010 *Bayley-III clinical use and interpretation*）年份和出版者未逐本核對，**未列入** `works.yaml`。M6 前可用 Crossref／目錄再核。
- 書籍核對（Crossref）：加入 B001 *International Perspectives on Academic Assessment*（Springer, 1995）與 B002 *Bayley-III Clinical Use and Interpretation*（Elsevier, 2010）。其餘 Open Library 的書（*Assessing minority group children* 1974、*Psychological and educational assessment of minority children* 1977、*International perspectives on psychology in the schools*、Mpofu & Oakland 2010 等）Crossref 只找到書評、再版或年份不一致，**仍未列入**。
- 主題標籤已改以標題為主（期刊名 *School Psychology International* 不再觸發 international）。
- 2015 年後的條目是逝世後出版或登錄較晚，M6 顯示時要標註。
- 標題裡有 HTML 實體已解碼。主題標籤用關鍵字自動標，M6 前抽查。

### 2026-11-20 M1／M3

- M1：用子代理核對，再自行用 curl 下載 S1、S2、S3、S4、S8、S12 原文抽查關鍵引句，全部相符。結果寫入 `src/content/data/facts.yaml`（含 `quote`、`note`）。
- 更正：F23 NASP Legend Award 是 **2002**（S8、S12），不是 2001。F30 作者順序是 Oakland、Horton、Glutting；S14 出版者是 Pearson，不寫 The Psychological Corporation。F19 縮窄為 ABAS-3（Harrison & Oakland, 2015；S17）。F16 S4 寫明 2011 年 1–5 月、Visiting Professor、一個學期。
- F7 已解：1967 到任、1995 離任（S2、S12）。1968／1994 在任何來源都沒出現。
- F34：ISPA 會長 1995–1997（只有 S12）。
- 限制：S5（PubMed）、S9（WorldCat）、S10（Legacy）、S15（TAMU）打不開（cookie 或 403），未用偽裝方式繞過。S6 內容已由 S12 重印版取得（S12 p.32–40）。F32 仍為 B。F31b、F33 仍為 C。
- ~~建議轉 Opus：F9 退休年份。~~ **已決定（見 MASTER_PLAN 9.1 Q14）：不寫年份。**原問題： S3 與 S1 寫 2010；S2 與 S12 寫 2013。計畫中的「2010 停教、2013 正式榮休」解釋與原文不符（S3 明寫 2010 授予 emeritus）。需決定：兩種年份並列加註，或只寫「從 UF 退休」不寫年份。
- ~~建議轉 Opus：F18b 測驗數量。~~ **已決定（Q15）：不寫數量。**原問題： S2 寫 11 套；S8、Pearson 寫 5 套。網站目前不寫數字，只列來源上找得到的測驗。需決定如何呈現。
- F17：S2 寫 50 國、S3 寫 45 國、S8 寫 40 多國。網站用「超過 40 個國家」（S8）。
- M3：Astro 5.18、i18n（zh-hant 預設、兩語言都加前綴）、collections、`npm run check`（astro check＋內容檢查＋8 個負向測試）、ci.yml、deploy.yml 已完成。`npm create astro` 無法取得範本，改手寫骨架。

### 2026-11-20 M0

- 使用者回覆 Q9–Q12；網路已完全開放；repo `clinicmind/oakland-memorial` 已建立。
- 規劃文件複製到 `oakland-memorial/docs/plan/`。之後以該處為準。
- 執行交給 Sonnet session；可用 Sonnet 子代理平行處理獨立任務。


### 2026-11-17 規劃 session

- 完成：MASTER_PLAN v2、DESIGN_SPEC、SONNET_PLAYBOOK、MACAU_STORY 草稿、PROGRESS、視覺原型。
- 原型驗證：桌面 1360px（中、英）、手機 390px（中）、360px（英）。無 console 錯誤、無橫向捲動；年表篩選正常。
- 新查證（搜尋摘要層級）：SSQ（F30）、Handbook of International School Psychology（F32）、ABAS-II 2003（F31a）、ABAS-3 年齡範圍（F20）。
- 限制：本 session 無法打開原文網頁（網域被封鎖）。
