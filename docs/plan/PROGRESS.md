# 進度 Progress

> 每個 session 開始時讀；結束時更新。最新的放最上面。

## 總覽

| # | Milestone | 狀態 | 執行者 | 完成日期 |
|---|---|---|---|---|
| — | 規劃 v2、設計規格、原型、執行手冊 | ✅ 完成 | Fable／Opus | 2026-11-17 |
| M0 | 環境準備（P1–P4、Q9–Q13） | ✅ 完成（P4、Q13 延後） | 使用者 | 2026-11-20 |
| M1 | 事實查證 | ✅ 完成（有限制） | Sonnet | 2026-11-20 |
| M2 | 著作目錄 | 🔄 進行中（子代理蒐集中） | Sonnet | |
| M3 | 專案骨架＋檢查腳本 | 🔄 程式完成；待 P4 與 CI 實跑 | Sonnet | |
| M4 | 設計系統（使用者確認截圖） | ⬜ | Sonnet | |
| M5 | 首頁＋生平區 | ⬜ | Sonnet | |
| M6 | 學術貢獻區 | ⬜ | Sonnet | |
| M7 | 學習中心 | ⬜ | Opus 內容／Sonnet 頁面 | |
| M8 | 澳門歲月、傳承、追思牆 | ⬜ | Sonnet＋使用者 | |
| M9 | 翻譯審校 | ⬜ | Opus | |
| M10 | 上線前檢查、預覽部署 | ⬜ | Sonnet | |
| M11 | 聯絡家屬提醒、公開、模板化 | ⬜ | Sonnet＋使用者 | |

進度：2/12 ▓▓░░░░░░░░░░ 17%（M0、M1）

預計：約 11–13 個工作 session；使用者及時回覆時約 1.5–2 週完成預覽版。

## 下一個任務

1. M2：整合 `works.yaml`（等 Crossref／PubMed 子代理；書與測驗清單已有，需抽查）。
2. M3：確認 P4；push 後看 CI 與 deploy 是否通過。
3. M1 待決（建議轉 Opus）：F9、F18b。見下方紀錄。

## 待使用者回答

- Q13 `MACAU_STORY.md` 草稿是否同意（M8 前）
- P4 Repo Settings → Pages → Source 選 GitHub Actions（M3 部署前）
- 照片（M8 前）

## 紀錄

### 2026-11-20 M1／M3

- M1：用子代理核對，再自行用 curl 下載 S1、S2、S3、S4、S8、S12 原文抽查關鍵引句，全部相符。結果寫入 `src/content/data/facts.yaml`（含 `quote`、`note`）。
- 更正：F23 NASP Legend Award 是 **2002**（S8、S12），不是 2001。F30 作者順序是 Oakland、Horton、Glutting；S14 出版者是 Pearson，不寫 The Psychological Corporation。F19 縮窄為 ABAS-3（Harrison & Oakland, 2015；S17）。F16 S4 寫明 2011 年 1–5 月、Visiting Professor、一個學期。
- F7 已解：1967 到任、1995 離任（S2、S12）。1968／1994 在任何來源都沒出現。
- F34：ISPA 會長 1995–1997（只有 S12）。
- 限制：S5（PubMed）、S9（WorldCat）、S10（Legacy）、S15（TAMU）打不開（cookie 或 403），未用偽裝方式繞過。S6 內容已由 S12 重印版取得（S12 p.32–40）。F32 仍為 B。F31b、F33 仍為 C。
- **建議轉 Opus：F9 退休年份。** S3 與 S1 寫 2010；S2 與 S12 寫 2013。計畫中的「2010 停教、2013 正式榮休」解釋與原文不符（S3 明寫 2010 授予 emeritus）。需決定：兩種年份並列加註，或只寫「從 UF 退休」不寫年份。
- **建議轉 Opus：F18b 測驗數量。** S2 寫 11 套；S8、Pearson 寫 5 套。網站目前不寫數字，只列來源上找得到的測驗。需決定如何呈現。
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
