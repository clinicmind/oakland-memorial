# Sonnet 執行手冊 Execution Playbook

> 讀者：執行本專案的 Claude Sonnet session（以及之後接手的任何模型）。
> 先讀 `MASTER_PLAN.md` 第 0 節。本手冊告訴你**每一步怎麼做、做到什麼程度才算完成、什麼時候要停**。

---

## 1. 開工前：使用者要做的準備（M0）

Sonnet 在第一個 session 開頭檢查這些項目。缺少的項目，用一句話請使用者處理，然後先做不受影響的工作。

| # | 準備項目 | 用途 | 缺少時可先做 |
|---|---|---|---|
| P1 | 在 GitHub 建立空 repo `oakland-memorial`（Public） | 放網站程式 | M1、M2（資料先放在 `clinicmind` repo 的 `docs/oakland-memorial/data/`，M3 時搬過去） |
| P2 | 開新 session 時同時選 `oakland-memorial` 和 `clinicmind` 兩個 repo | 讀規劃、寫程式 | — |
| P3 | 環境網路開放：`en.wikipedia.org`、`www.wikidata.org`、`www.kenoshafuneralhome.com`、`education.ufl.edu`、`www.um.edu.mo`、`www.pearsonassessments.com`、`www.legacy.com`、`honorsandawards.iu.edu`、`pubmed.ncbi.nlm.nih.gov`、`api.crossref.org`、`search.worldcat.org`、`marketplace.unl.edu`、`apadivision16.org`、`docs.astro.build` | M1、M2 查證；查 Astro 文件 | M3、M4 |
| P4 | Repo Settings → Pages → Source 選 **GitHub Actions** | 部署 | M3 除部署以外的步驟 |

網路被封鎖時：讀 `read_documentation` 的 `environment.network` 頁，再請使用者開放。不要嘗試繞過。

---

## 2. 每一輪回覆的格式（必須）

使用者要求**每一輪都知道進度和預計完成時間**。每次回覆的第一段固定是：

```text
📍 進度：M5 首頁＋生平區（5/12）▓▓▓▓▓░░░░░░░ 42%
本輪：完成年表元件與篩選；正在做榮譽頁
預計：本 milestone 還需 1 個 session；全站可預覽版約再 6–7 個 session
```

規則：

1. 百分比 = 已完成 milestone 數 ÷ 12（M0–M11）。進行中的 milestone 不計入。
2. 「預計」依 `MASTER_PLAN.md` 第 7 節的估計，扣掉已完成的部分。實際比估計慢時，誠實調整並說明原因。
3. 之後才是本輪內容。內容遵守 `CLAUDE.md`：繁中、短句、精簡。
4. 每個 milestone 結束時，加上交接摘要（目前狀態／已完成／重要決策／限制／下一步），並更新 `PROGRESS.md`。

---

## 3. 每個 session 的工作流程

1. 讀 `PROGRESS.md`，找到目前的 milestone 和下一個任務。
2. 回報進度列（第 2 節）。
3. 執行一個任務：定位 → 修改 → 驗證。
4. 驗證通過才 commit。commit 訊息用英文，格式：`M5: add timeline filter`。
5. 做下一個任務。直到 milestone 完成或 session 快結束。
6. 更新 `PROGRESS.md`，commit，push。
7. 回報交接摘要。

---

## 4. 什麼時候自己處理，什麼時候停下來

### 4.1 自己處理（不用問）

- 套件版本、建置錯誤、型別錯誤、CSS 細節、元件命名、檔案結構微調。
- 原型沒涵蓋的 UI 細節：依 `DESIGN_SPEC.md` 的原則決定。
- 測試失敗：找出原因並修好。**不可**刪除或跳過測試。
- 搜尋結果和登記表一致：把狀態從 A/B 改成 V，填 `checkedOn`。
- 小的中英文用字修改（不改變事實）。

### 4.2 問使用者（用 AskUserQuestion，一次最多 4 題）

- 需要使用者的資料：照片、回憶細節、Q9–Q13。
- 使用者親述內容（U）的最終文字。
- 任何會公開發布的動作（正式公開網址、對外寄信）。

### 4.3 停下來，請使用者轉 Opus

符合以下任一情況，停止該項工作，在回覆中寫明「建議轉 Opus：原因＋需要決定的事」，然後繼續做其他不受影響的任務：

1. **學術內容**：撰寫學習中心 T1–T5 的教學內容、小測驗題目、詞彙定義（M7）。Sonnet 只做頁面和元件，內容由 Opus 寫入 `src/content/learn/`。
2. **全站翻譯審校**（M9）。
3. **事實衝突無法依 `MASTER_PLAN.md` 2.5 處理**，或發現新的矛盾。
4. **原文和登記表內容不同**，而且差異會改變網站敘述（例如會長職務不存在、年份差很多）。
5. **架構要改**：換框架、改資料模型、改網址結構、加後端。
6. **敏感內容**：任何關於教授離世的新寫法、涉及家屬或第三者的內容。
7. 同一個問題連續嘗試 3 次仍無法解決。

---

## 5. Milestone 任務卡

每張卡：目標、步驟、驗收標準。驗收全部通過，才算完成。

### M1 事實查證

目標：登記表內所有 A/B 項目都打開原文核對。

1. 對每個來源 S1–S18：用 WebFetch 打開。打不開就記錄原因。
2. 對每一項 F：在原文中找到對應文字。記錄原文引句（英文，≤ 2 句）。
3. 一致 → 狀態改 V，填 `checkedOn`。不一致 → 依 4.3 第 4 點處理。
4. 處理 F7、F9（`MASTER_PLAN.md` 2.5）。
5. 找 F31b、F33、F34 的來源。找不到就維持 C。
6. 產出：`data/sources.yaml`、`data/facts.yaml`（格式見 `MASTER_PLAN.md` 5.4），另加欄位 `quote`（原文引句）。

驗收：

- [ ] 每個 V 項目都有 `quote` 和 `checkedOn`。
- [ ] 沒有 A/B 項目剩下，除非記錄了打不開的原因。
- [ ] 更新 `MASTER_PLAN.md` 第 2.3 表的狀態欄。

### M2 著作目錄

目標：教授的測驗、書籍、論文完整清單。

1. 來源優先順序：Crossref API（`api.crossref.org/works?query.author=Thomas+Oakland`）→ PubMed → WorldCat → Google Scholar 頁面（若可存取）。
2. 小心同名作者。只收：作者含 Oakland, T. 或 Oakland, T. D.，且主題是心理學／教育。不確定的放 `uncertain` 清單，不上線。
3. 每筆欄位：`id`、`type`（test/book/article/chapter）、`year`、`authors`、`title`、`venue`、`doi`、`url`、`topics`、`sourceIds`。
4. 主題標籤固定用：`adaptive-behavior`、`temperament-styles`、`test-adaptation`、`international`、`ethics-professional`、`assessment-general`、`other`。

驗收：

- [ ] `data/works.yaml` 可被 YAML parser 讀取。
- [ ] 隨機抽 10 筆 DOI，能在 Crossref 查到相同標題。
- [ ] 11 套測驗中找到幾套，就列幾套；找不到的寫在 `PROGRESS.md` 限制欄。

### M3 專案骨架＋檢查腳本

目標：可建置、可部署、有自動檢查的空網站。

1. 在 `oakland-memorial` repo 執行 `npm create astro@latest . -- --template minimal --typescript strict --no-git`（依當時 Astro 文件調整參數）。
2. （已完成：規劃已在 `docs/plan/`。）把 M1–M2 的 `data/*.yaml` 搬到 `src/content/data/`。
3. （已完成：`CLAUDE.md` 已建立。）
4. 設定 i18n（查 Astro 文件確認語法）：locales `zh-hant`、`en`；預設 `zh-hant`；兩種語言都加前綴；HTML `lang` 輸出 `zh-Hant`／`en`。
5. 設定 `site` 與 `base`（GitHub Pages 專案頁：`base: '/oakland-memorial'`）。
6. 建立 `site.config.ts`：人名、生卒年、發起人署名、語言清單、社群圖。**所有教授相關字串只放這裡或 `src/content/`。**
7. Content Collections：`facts`、`sources`、`timeline`、`works`、`learn`、`glossary`、`memories`、`pages`。用 Zod schema。
8. 寫 `scripts/check-content.ts`，實作 `MASTER_PLAN.md` 5.3 第 1–4 項。`npm run check` = `astro check` ＋ 本腳本。
9. GitHub Actions：
   - `ci.yml`：push 與 PR 時執行 `npm ci`、`npm run check`、`npm run build`。
   - `deploy.yml`：`main` 分支部署到 Pages（用 `withastro/action`）。
10. `README.md`：專案說明、指令、如何用模板建立新教授網站。

驗收：

- [ ] `npm run check` 和 `npm run build` 通過。
- [ ] 故意放一筆狀態 C 的事實到頁面，`npm run check` 會失敗。之後移除。
- [ ] 故意刪一個 `en` 檔，`npm run check` 會失敗。之後還原。
- [ ] `/zh-hant/` 和 `/en/` 都能開啟；語言切換到對應頁。

### M4 設計系統

目標：把原型轉成可重用的元件和 token。

1. 把 `DESIGN_SPEC.md` 第 2 節的 token 寫入 `src/styles/tokens.css`。
2. 安裝字體：`@fontsource/newsreader`、`@fontsource-variable/inter`、`@fontsource/noto-serif-tc`、`@fontsource/noto-sans-tc`（只匯入需要的字重）。
3. 建立 `DESIGN_SPEC.md` 第 3 節列出的原型元件，加上 `MobileNav`、`Callout`、`Breadcrumb`。
4. 做一個 `/[lang]/styleguide/` 頁面展示所有元件（`noindex`，不放在導覽）。
5. 驗證色彩對比。

驗收：

- [ ] styleguide 頁 4 張截圖（`DESIGN_SPEC.md` 第 7 節）和原型風格一致。
- [ ] 截圖傳給使用者確認（SendUserFile）。**這是唯一的設計確認點**，使用者同意後才進 M5。
- [ ] axe 無 serious／critical。

### M5 首頁＋生平區

1. 首頁：照原型的區塊順序。數字列的每個數字連到來源。
2. 年表：資料來自 `timeline` collection；每項帶 `factIds`，自動顯示來源標籤。
3. 榮譽頁、地圖頁。地圖只標狀態 V 的地點。
4. 生平長文頁：依事實寫成敘事。每段後面標來源。離世只用一句話（`MASTER_PLAN.md` 6.3）。

驗收：

- [ ] 所有頁面通過 `DESIGN_SPEC.md` 第 7 節。
- [ ] 每一個事實句都能點到來源。
- [ ] 年表篩選可用鍵盤操作。

### M6 學術貢獻區

1. 測驗頁：每套測驗一頁。只寫目的、對象、結構、出版資料、官方連結。ABAS 頁用 `TestStructure` 元件。
2. 書籍頁。
3. 論文瀏覽器：`WorksBrowser`。資料量大時用 build 時產生的 JSON。
4. 接上 Pagefind 全站搜尋。

驗收：

- [ ] 測驗頁沒有任何題目、計分或常模內容。
- [ ] 搜尋中英文關鍵字都有結果。

### M7 學習中心（內容由 Opus 寫）

1. Sonnet 先做：單元頁版面、`Quiz`、`GlossaryTerm`、詞彙表頁。用一個標示「示意」的假單元測試。
2. 然後**停下來，請使用者轉 Opus** 撰寫 T1–T5 內容和詞彙表。
3. Opus 完成後，Sonnet 接回：檢查格式、連結、截圖。

驗收：

- [ ] 每個單元有 7 個部分（`MASTER_PLAN.md` 第 4 節）。
- [ ] 每個單元有教育用途聲明。
- [ ] 小測驗可作答，並顯示解釋。

### M8 澳門歲月、傳承、追思牆

1. 用 AskUserQuestion 問 Q9–Q13（`MASTER_PLAN.md` 9.1）。
2. 依答案修改 `MACAU_STORY.md` 草稿，給使用者看最終文字。使用者同意後，事實的 `approvedByUser` 改 true。
3. 照片：請使用者上傳。記錄每張的來源、拍攝者、授權、照片中的人。
4. 追思牆：建立外部表單（請使用者用自己的帳號建立，Sonnet 提供欄位設計：姓名或匿名、身分、留言、同意公開勾選）。網站放連結。審核後的留言寫入 `memories` collection。

驗收：

- [ ] 每段 U 內容都有使用者同意紀錄（在 `PROGRESS.md` 記錄日期）。
- [ ] 沒有其他同學的名字（除非本人同意）。

### M9 翻譯審校（Opus）

停下來，請使用者轉 Opus。

### M10 上線前檢查

1. SEO：每頁 `title`、`description`、`hreflang`（zh-Hant、en、x-default）、canonical、Open Graph 圖。
2. `sitemap`（`@astrojs/sitemap`）、`robots.txt`。**預覽期間** robots 設為 `noindex`。
3. Lighthouse（手機）：Performance、Accessibility、Best Practices、SEO 各 ≥ 90。
4. 全站斷鏈檢查（內部＋外部）。
5. 部署到 GitHub Pages 預覽網址。

驗收：

- [ ] 上述全部通過，結果寫進 `PROGRESS.md`。
- [ ] 把預覽網址給使用者。

### M11 公開與模板化

1. **提醒使用者聯絡家屬或 UF**，原文照貼：

   > 網站預覽版已完成。依你的決定（Q6），正式公開前，建議先聯絡 Oakland 教授的家屬或 University of Florida School Psychology Program，告訴他們這個網站，並請他們看預覽版。需要的話，我可以幫你起草中英文的信。

2. 使用者確認可以公開後：移除 `noindex`，更新 sitemap。
3. Repo Settings → 勾選 Template repository（請使用者操作或確認）。
4. 在 `README.md` 寫「為另一位教授建立網站」的步驟。
5. 最後交接摘要。

---

## 6. 常見錯誤（不要做）

1. 用記憶補事實。例如「他是 ABAS 第一作者」「他得過 XX 獎」。沒有來源就不寫。
2. 給教授取中文名字或音譯。
3. 用 AI 生成教授照片。
4. 在測驗頁放題目範例。
5. 用 JS 隱藏另一種語言來做雙語（原型這樣做只是為了展示）。正式站每種語言是獨立的 URL。
6. 為了讓 CI 通過而刪除測試或放寬檢查。
7. 寫出嫌疑人姓名或案件細節。
8. 中文用簡體字，或混用簡體字（檢查「后／後」「台／臺」以外的常見錯字：「里／裡」「发／發」）。
9. 未經使用者同意就公開網站或對外發信。

---

## 7. 啟動指令（貼到新 session）

### Sonnet：第一次開工

```text
請讀 clinicmind repo 的 docs/oakland-memorial/MASTER_PLAN.md 第 0 節，
再讀 SONNET_PLAYBOOK.md 和 PROGRESS.md。
先檢查 Playbook 第 1 節的準備項目，告訴我缺什麼。
然後從 PROGRESS.md 的下一個任務開始做。每輪回覆開頭給我進度列。
```

### Sonnet：之後的 session

```text
請讀 oakland-memorial repo 的 docs/plan/PROGRESS.md 和 MASTER_PLAN.md 第 0 節，
從下一個任務繼續。每輪開頭給我進度列。
```

### Opus：學習中心內容（M7）或翻譯審校（M9）

```text
請讀 oakland-memorial repo 的 docs/plan/MASTER_PLAN.md（第 0、2、4、8 節）和 PROGRESS.md。
任務：撰寫學習中心 T1–T5 與詞彙表內容（或：全站翻譯審校）。
只用已查證（狀態 V）的事實與教授的一手著作。完成後更新 PROGRESS.md，交回給 Sonnet。
```

### Opus：調整規劃

```text
請讀 oakland-memorial repo 的 docs/plan/ 全部文件。
Sonnet 停在這個問題：〔貼上 Sonnet 的「建議轉 Opus」說明〕。
請做決定，更新相關文件，並寫明 Sonnet 下一步。
```
