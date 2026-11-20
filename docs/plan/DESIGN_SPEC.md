# 設計規格 v2 Design Spec

> v2（2026-11-20）取代 v1。使用者認為 v1／M4「太普通，美感不夠」。
> v2 依 **tasteskill 2.5.1**（`Leonxlnx/taste-skill`，MIT）制定。skill 已裝在本 repo：`.claude/skills/design-taste-frontend/`。
> `prototype/` 是 v1 原型，**已作廢**，只留作紀錄。不可再照它做。

---

## 0. 給 Sonnet 的規則

1. 做任何視覺工作前，先用 Skill 工具呼叫 `design-taste-frontend`。讀它的 `SKILL.md`，再讀：`references/copy.md`、`copy-voice.md`、`system.md`、`layout-v4.md`、`sections.md`、`moments.md`、`photos.md`。
2. **本文件的發牌結果已固定。不可重新發牌，不可憑個人品味更改。** 發牌結果見第 2 節。
3. skill 和本專案規則衝突時，依第 6 節的對照表處理。對照表沒有寫到的情況，以 `MASTER_PLAN.md` 第 0 節（事實與倫理）優先，視覺則以 skill 優先。
4. 不可修改 skill 的檔案（`.claude/skills/design-taste-frontend/` 內任何檔案）來讓檢查通過。
5. Node 的網路要走代理：執行 skill 的腳本前先設定 `export NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt`。

---

## 1. Design Read

> 這是一個紀念與學習網站，讀者是心理學與教育學的學生、教授的舊同事、一般大眾。語言風格要冷靜、可信、清楚。網站類型依 skill 視為 **service**，site-kind 為 **other**，行業以 **clinic** 發牌，因為心理學最接近 clinic。

依 skill 的規定，這代表：

- 網站以照片、平面色塊、文字為主。
- 不用 shader、WebGL、grain、漸層、深色頁面。
- 只能有兩種動態：首屏進場一次，以及發到的兩個「時刻」（moment）。
- 不用捲動淡入。v1 的 `.rv` reveal 全部移除。

---

## 2. 發牌結果（已固定）

| 項目 | 結果 | 為什麼適合 |
|---|---|---|
| Palette | `cool-white-slate`（Frost and slate） | 冷白底、深石板色字、青綠色重點。像安靜的診間和研究室，清楚、可信。它也脫離 v1 的米色＋黃銅色，那是 AI 預設配色 |
| Type | `albert`：Albert Sans（中文配 Noto Sans TC） | 一款安靜、精緻的無襯線字體，兩個字重。v1 用的襯線字體被 skill 視為 AI 預設，已取消 |
| Radius | `soft` | |
| Hero | `photo`：全幅照片，文字放在照片較平靜的一側，用實心框承載 | |
| Moment 1 | `photo-chapters`：用 3–5 張全寬照片講一段故事，一次一章 | 「一生的四所大學」 |
| Moment 2 | `word-highlight`：一句大字，捲動時逐字變深 | 一句陳述 |
| Nav | `nav-centre` | |
| Footer | `footer-dark` | |
| Close | `close-type` | |
| Rhythm | `surface-pairs`：一個 `.ground-surface` 色帶，包含一或兩個區塊 | |
| Buttons | `tonal` | |
| Mark | `initial`：字母 O | |

### 2.1 Token（照印出的內容貼上，不可改）

```css
:root {
  --p-bg: #f7f9fa; --p-surface: #ecf0f2; --p-ink: #1f3038; --p-muted: #5d6b72;
  --p-accent: #0d7480; --p-accent-ink: #ffffff; --p-action: #0d7480; --p-action-ink: #ffffff;
  --p-inv-bg: #1f3038; --p-inv-surface: #2c3c44; --p-inv-ink: #f7f9fa; --p-inv-muted: #9ea7ab;
  --p-inv-accent: #f7f9fa; --p-inv-accent-ink: #1f3038; --p-inv-action: #f7f9fa; --p-inv-action-ink: #1f3038;
  --font-display: "Albert Sans Variable", "Albert Sans", "Noto Sans TC", system-ui, sans-serif;
  --font-text: "Albert Sans Variable", "Albert Sans", "Noto Sans TC", system-ui, sans-serif;
  --display-weight: 400;
  --display-tracking: -0.025em;
  --display-tracking-xl: -0.035em;
}
```

- 字體用 Fontsource 自行託管：`@fontsource-variable/albert-sans`、`@fontsource/noto-sans-tc`（只用 400、500）。不用 Google Fonts 連結。
- 這個 `<style>` 放在 kit 的 CSS 之後，因為 `layout.css` 會重設 `--ly-scale`。
- 中文頁面的 `--display-tracking` 改為 `0`。中文不可用負字距。

---

## 3. Kit 整合（Astro）

依 skill 第 4 節第 0 步：在現有專案中，用專案自己的技術建置。元件採用 starter 的 markup 和 class，kit 放在 public 資料夾，作為一般檔案載入。

1. 只複製本站會用到的 kit 檔案到 `public/assets/`。不要複製整個 38MB 的 `assets/`。需要的檔案：
   - `system.css`、`system.js`
   - `motion/`
   - `layout/layout.css`、`layout/layout.js`
   - `moments/moments.js`、`moments/lib.js`、`moments/photo-chapters/`、`moments/word-highlight/`
   - `icons/icon.css`
   - `ui/cards.css`
   - 用到 diagram 時，再加 `diagrams/` 的對應檔案

   漏掉的檔案，用 gate 和瀏覽器 console 找出來再補。
2. 刪除 v1 的 `src/styles/tokens.css` 內容，改用第 2.1 節的 token。`global.css` 只留 kit 沒有涵蓋的部分。
3. 依 starter 和 `hero-photo.html` 的 markup，重做這些元件：`SiteHeader`（nav-centre）、`SiteFooter`（footer-dark＋close-type）、`Hero`（photo）、按鈕、`LangSwitch`。刪除不再使用的 v1 元件：`StatRow`、`TopicTile`、`ContributionCard`、`Reveal`。
4. `<html>` 要設定：`lang`（`zh-Hant` 或 `en`）、`data-type="service"`、`data-radius="soft"`、`data-buttons="tonal"`、`data-motion`。
5. `<head>` 要有：`<meta name="page-type" content="service">`、`<meta name="site-kind" content="other">`，以及 skill `system.md` 的 Head 區塊（title、description、og、icon、theme-color）。
6. 保留 skip link 和 `m-enter` 那一行 head 設定。
7. Gate 要檢查建置後的頁面。GitHub Pages 的 `base` 是 `/oakland-memorial`，在 `--root dist` 下連結會失效。做法：
   - 支援環境變數，例如 `CHECK_BUILD=1` 時 `base` 改為 `/`。
   - 用 `CHECK_BUILD=1 npm run build` 建置，再執行 `gate.mjs --start dist/en/index.html --root dist`。
   - 正式部署的建置不受影響。
8. 在 `.gitignore` 加入 `.taste-skill/chrome-*`、`shots/`。

---

## 4. 首頁規劃（以 1440×900 為一個畫面）

英文先做完並通過 gate，再做中文版。兩版的結構必須相同。

| # | id | 一個重點 | 畫面／視覺 | 畫面數 |
|---|---|---|---|---|
| 1 | `top` | 他是誰 | photo hero | 1 |
| 2 | `life` | 一生的四所大學 | **Moment 1：photo-chapters**，4 章 | 4（live） |
| 3 | `work` | 他留給這個領域的東西 | 列表＋1 張靜態圖表（ABAS：3 個領域 → 11 個技能範圍） | 1–2 |
| 4 | `idea` | 一句陳述 | **Moment 2：word-highlight** | 1 |
| 5 | `learn` | 從他的研究學習（`.ground-surface` 色帶開始） | 5 個單元的入口 | 1 |
| 6 | `writing` | 著作（仍在 surface 色帶中） | 精選 3–5 筆＋「全部著作」連結 | 1 |
| 7 | `macau` | 澳門歲月 | 文字＋照片並排 | 1 |
| 8 | `memories` | 追思 | 一則有署名的引言＋分享方式 | 1 |
| — | `contact` | close-type＋footer-dark | 「Share a memory」大按鈕；一行照片授權 | — |

### 4.1 各區塊的文案方向

只能使用狀態 **V** 的事實。下表是方向，最終文字由 Sonnet 依 `copy.md` 和 `copy-voice.md` 撰寫，並通過 `copy-lint`。

**1. Hero**

- h1：`Thomas D. Oakland`。copy-lint 若要求 h1 寫出類別，就加 waiver，理由是「紀念網站：h1 是人名，類別寫在 lead」。
- lead（20 字以內）：School psychologist, 1939-2015. He built fairer ways to assess children and worked in more than 40 countries.
  - 中文：學校心理學家（1939-2015）。他為兒童建立更公平的評估方法，足跡遍及 40 多個國家。
  - 「40 多個國家」的來源是 F17／S8。
- 主按鈕：`Share a memory`（分享回憶）。次按鈕：`Read his life`（閱讀他的生平）。

**2. Life（photo-chapters）**

h2：`A life in four universities`。每章一個標題加兩行說明：

1. **Indiana University**：教育心理學 MS 1965、PhD 1967（F5）。
2. **The University of Texas at Austin**：教育心理學系，任教 27 年（F6）。**不寫起訖年份**（F7 有矛盾）。
3. **University of Florida**：1995 年起任教學校心理學；榮休教授（F8、F9）。**不寫退休年份。**
4. **University of Macau**：2011 年 1–5 月任訪問教授（F16）。

**3. Work**

列出已查證的貢獻，每項一行，並連到子頁：

- ABAS-3（F19、F20）
- Student Styles Questionnaire（F30）
- *The Handbook of International School Psychology*（F32，**要先變成 V 才能列**）
- 國際組織職務（F10、F11，**要是 V 才能列**）

圖表：一張靜態 diagram，用 `diagrams.md` 的 hub 或 lanes preset，畫出 ABAS 的「3 個領域 → 11 個技能範圍」。**不可列出任何題目。**

**4. Idea（word-highlight）**

在 Q13 核准前，用描述性的句子，不寫成教授的話。例如：「He measured what a child can do in everyday life: at home, at school and with other people.」

Q13 核准後，可改成使用者的話（U4），加署名。

**5–6. Learn／Writing**

- 不要做三張一樣的卡片。用 skill 的 `rows` 或 `features-2x2` 系列。
- 著作只列精選 3–5 筆，加上「全部著作」連結。**不寫著作總數**（F18b）。

**7. Macau**

在 Q13 核准前，只寫 F16 和一句說明，並連到澳門子頁。照片位置先用替代照片。

**8. Memories**

在 Q13 核准前，不放任何引言，只放分享方式。不可虛構引言。

---

## 5. 照片

依 skill 的 `photos.md`：每張 `<img>` 都要有 `data-source` 和 `data-subject`。照片下面不放說明文字（caption），授權資訊集中在 footer 的一行。

### 5.1 Life 章節：Commons 候選照片（已用 `photos.mjs search` 找到）

每張都要用 `photos.mjs fetch` 取得，並**親自看過原尺寸**，確認清晰、沒有可辨識的人臉、色調和其他照片一致。不合格就重新搜尋。

| 章節 | 候選 | 授權 |
|---|---|---|
| Indiana University | `f38900072` Morrison Hall, 1942（LOC） | Public domain |
| 同上（備選） | `f62114269` Indiana Memorial Union | CC BY 2.0 |
| UT Austin | `f52969256` Main Building, DSC08595 | CC0 |
| University of Florida | `f9168925` Historic University of Florida Campus | CC BY-SA 2.0 |
| 同上（備選） | `f7580841` UF Buckman Face | CC BY-SA 3.0 |
| University of Macau | `f14809678` UM Admin Building（**氹仔舊校園**；2011 年時大學還在舊校園，所以比新校園照片更符合史實） | CC BY-SA 1.0 |

alt 文字要重新寫，只描述地點，例如「The University of Texas at Austin Main Building」。不可暗示照片裡有教授。

### 5.2 Hero

1. **最終版**：使用者提供的照片。最好是教授的肖像（家屬或 UF 授權），或使用者書架上教授的書和杯子（U8）。
2. **過渡版**：從 5.1 中選一張有平靜區域的照片（例如 UT Austin Main Building，CC0）。在 `PROGRESS.md` 記錄這是替代照片。
3. 不可用 AI 生成或修改教授的照片。

### 5.3 給使用者的拍攝清單

在交接摘要中列出：

1. 書和杯子：窗邊自然光，不開閃光燈，橫拍，畫面一側留空。
2. 與教授的合照：只用使用者有權使用、照片中其他人也同意的合照。

---

## 6. skill 與本專案規則的對照

| 主題 | skill | 本專案決定 |
|---|---|---|
| 圖片說明 | 照片下不放說明；授權寫在 footer 一行 | **照 skill。** 雙語描述寫在 alt。MASTER_PLAN 6.2 要求的照片紀錄寫在資料檔，不顯示在頁面 |
| 來源標籤 | 沒有規定 | **保留。** 事實句後面的 `S1` 標籤屬於內文，不算 caption。樣式用 kit 的連結樣式，小而安靜 |
| 深色模式 | 非 tech 網站不用深色頁 | **只做淺色。** 取消 v1 的 dark mode；footer 用 footer-dark |
| 捲動淡入 | 禁止 | 全部移除 |
| 數字列 | 禁止大數字列 | 取消 v1 的 StatRow |
| 一個區塊一個畫面 | 首頁適用 | **首頁照 skill。** 長文子頁（年表、著作目錄、學習單元、來源）用同一套 token、字級、nav、footer、按鈕，但版面是單欄閱讀（約 65ch），不套用一個區塊一個畫面，也不放 moment |
| 長破折號 | 視為 AI 寫作痕跡 | 中英文都不用 `—`、`–`、`——`。年份範圍用 `1939-2015` |
| 地址、電話 | skill rule 9 | 本站不放任何地址或電話 |
| copy-lint | 以英文為主 | 英文頁跑 copy-lint，FAIL 一律修正。中文頁人工檢查：短句、名詞標題、按鈕用「動詞＋名詞」 |
| 引言 | 不可虛構 | 與 MASTER_PLAN 一致；U 內容等 Q13 核准 |

---

## 7. 驗收（設計確認點）

1. **Gate**：首頁英文版 `gate.mjs` 最後一行是 `GATE: PASS`。或是 `GATE: OPEN`，但每個 waiver 都寫明理由。
2. **其他檢查**：`consistency.mjs`、`layout/check.mjs`、`perf.mjs` 沒有 FAIL。
3. **截圖**：用 `shoot.mjs`，中英文各拍 1440、1024、820×1180、768×1024、390 共 5 種寬度。
4. **專案檢查**：`npm run check` 和 `npm run build`（正式 base）都通過。
5. **使用者確認**：用 SendUserFile 把 1440 和 390 的中英文截圖傳給使用者，並附 gate 結果、發牌結果，以及替代照片清單。

**使用者同意後才可做子頁（M5 以後）。** 如果使用者仍不滿意，停下來，請使用者轉 Opus，不要自行重新發牌。
