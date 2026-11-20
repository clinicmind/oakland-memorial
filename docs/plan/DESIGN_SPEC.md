# 設計規格 Design Spec

> 參考實作：`prototype/index.html`（用瀏覽器打開）。正式站要和原型的視覺一致，再依本規格擴充。
> 原型的文字是示意文字。正式文案必須來自 `facts.yaml`。

## 1. 設計原則

1. **安靜、莊重、現代。** 像一本做得很好的學術專刊，不像傳統訃聞頁。
2. **內容先行。** 大量留白。一頁只有一個重點。
3. **可信。** 每項事實旁邊都有來源標籤。來源標籤是設計的一部分，不是附註。
4. **克制的動態。** 只有淡入和輕微位移。尊重 `prefers-reduced-motion`。
5. **雙語平等。** 中英文各自調整排版，不是一種語言遷就另一種。

## 2. 設計 Token

### 2.1 色彩

| Token | Light | Dark | 用途 |
|---|---|---|---|
| `--paper` | `#FAF8F3` | `#131412` | 頁面背景（暖白） |
| `--surface` | `#FFFFFF` | `#1B1C1A` | 卡片 |
| `--sunken` | `#F2EEE6` | `#171816` | 區塊底色 |
| `--ink` | `#1B1A17` | `#EFECE5` | 主文字 |
| `--ink-2` | `#55514A` | `#B9B4AA` | 次文字 |
| `--ink-3` | `#8A857C` | `#8B877E` | 輔助文字（只用於 ≥ 14px 的非必要文字） |
| `--line` | `#E4DED2` | `#2B2C29` | 分隔線、邊框 |
| `--accent` | `#1E4D4A` | `#7FBFB6` | 主色：深青綠。按鈕、連結、強調 |
| `--accent-ink` | `#F3F7F5` | `#0F1F1D` | 主色上的文字 |
| `--accent-soft` | `#E3EDEA` | `#1C2A28` | 標籤底色 |
| `--brass` | `#A0742C` | `#D2A55B` | 點綴色：年份、編號、eyebrow。不用於內文 |

對比要求：內文對背景 ≥ 4.5:1；大字（≥ 24px）≥ 3:1。M4 用工具驗證每一組。

### 2.2 字體

| 角色 | 英文 | 中文 | 用途 |
|---|---|---|---|
| Serif | Newsreader | Noto Serif TC | 標題、引言、年份、數字 |
| Sans | Inter | Noto Sans TC | 內文、介面 |

- 全部用 Fontsource 自行託管。中文字體只載入 400、500 兩個字重，並用 `unicode-range` 子集。
- `font-display: swap`。

### 2.3 字級

| 名稱 | 大小 | 行高（英／中） | 用途 |
|---|---|---|---|
| display | `clamp(44px, 7vw, 84px)` | 1.02 | 首頁人名 |
| h2 | `clamp(30px, 4vw, 44px)` | 1.12 | 區塊標題 |
| h3 | 19–23px | 1.25–1.4 | 卡片標題 |
| lead | `clamp(20px, 2.2vw, 24px)` | 1.55 / 1.8 | 導言 |
| body | 17px | 1.7 / 1.85 | 內文 |
| small | 13–15px | 1.5 | 標籤、說明 |
| eyebrow | 13px，大寫，字距 .18em | — | 區塊小標 |

中文頁面：`letter-spacing: .01em`；行高加大。內文行寬：英文 ≤ 70 字元，中文 ≤ 36 字。

### 2.4 間距、圓角、陰影

- 間距單位 4px。區塊上下：桌面 96px，手機 64px。
- 內容最大寬度 1120px；長文最大寬度 720px。
- 圓角：一般 14px；大卡片 22px；標籤與按鈕 999px。
- 陰影：只在 hover 和肖像使用 `--shadow`。

### 2.5 斷點

| 名稱 | 寬度 | 變化 |
|---|---|---|
| mobile | < 700px | 單欄；年表線移到左側 |
| tablet | 700–860px | 卡片單欄；導覽收起 |
| desktop | > 860px | 完整版面 |

手機導覽：漢堡按鈕 → 全螢幕選單（原型未實作，M4 要做）。

## 3. 元件

原型已有的元件（M4 要轉成 Astro 元件）：

| 元件 | 說明 |
|---|---|
| `SiteHeader` | sticky、半透明模糊背景、語言切換膠囊按鈕 |
| `LangSwitch` | 切換時保持同一頁面的對應路徑（正式站是換 URL，不是 JS 隱藏） |
| `Hero` | eyebrow 年份、人名、角色、導言、兩個按鈕、肖像 |
| `StatRow` | 4 個數字；每個數字要能連到來源 |
| `ContributionCard` | 編號、標題、摘要、了解更多 |
| `Timeline` + `TimelineItem` | 年份、標題、說明、類別標籤、來源標籤；類別篩選 |
| `SourceBadge` | `S1` 樣式小標；點擊開啟來源 popover（標題、網址、查證日期） |
| `QuoteBlock` | 深色主色底、大引號裝飾 |
| `TopicTile` | 學習單元入口；hover 反白 |
| `SiteFooter` | 來源、關於、回報錯誤 |

M4–M8 要新增的元件：

| 元件 | 說明 |
|---|---|
| `MobileNav` | 全螢幕選單；可用鍵盤關閉（Esc）；鎖定捲動 |
| `WorldMap` | SVG 地圖；標記可聚焦；點擊顯示機構與年份 |
| `TestStructure` | 圖解測驗結構（例：ABAS 3 領域 → 11 技能）。不含題目 |
| `WorksBrowser` | 搜尋框＋年份／主題篩選＋結果列表（APA 格式＋DOI） |
| `Quiz` | 選擇題；作答後顯示解釋；不存資料 |
| `GlossaryTerm` | 內文詞彙；hover／focus 顯示定義；手機用點擊 |
| `PhotoGallery` | 格狀照片；燈箱；每張有雙語圖說與拍攝資料 |
| `StoryCard` | 傳承頁的故事卡 |
| `Callout` | 提示框：聲明、矛盾說明 |
| `Breadcrumb` | 次頁麵包屑 |

## 4. 動態

- 進場：`opacity 0 → 1`、`translateY 14px → 0`、700ms ease。用 IntersectionObserver，只播一次。
- Hover：卡片上移 3px＋陰影，250ms。
- `prefers-reduced-motion: reduce` 時：全部關閉。

## 5. 影像

- 肖像比例 4:5。沒有照片時用原型的字母組合占位。
- 照片一律輸出 AVIF/WebP，用 Astro `<Image>`。
- 可選：整站照片統一為輕微暖色調。**不可**修改教授的面貌。

## 6. 無障礙

- WCAG 2.2 AA。
- 每頁 `lang` 正確：`zh-Hant` 或 `en`。混排時，外文片段加 `lang`。
- 所有互動元件可用鍵盤操作；`:focus-visible` 明顯。
- 篩選按鈕用 `aria-pressed`；地圖標記用 `button`。
- 圖片都有雙語 alt。裝飾性圖片 `alt=""`。

## 7. 驗收

每個頁面完成時，用 Playwright 截圖（以下 4 張），並用 axe 掃描：

1. 桌面 1360×900 繁中
2. 桌面 1360×900 English
3. 手機 390×844 繁中
4. 手機 360×780 English

條件：無橫向捲動、無 console 錯誤、axe 無 serious／critical。
