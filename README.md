# Thomas D. Oakland (1939–2015) — In Memoriam

A bilingual (Traditional Chinese / English) memorial and learning website for Professor Thomas D. Oakland, school psychologist.

一個紀念 Thomas D. Oakland 教授的雙語網站（繁體中文／English）。

- Plan / 規劃：[`docs/plan/MASTER_PLAN.md`](docs/plan/MASTER_PLAN.md)
- Progress / 進度：[`docs/plan/PROGRESS.md`](docs/plan/PROGRESS.md)
- Visual prototype / 視覺原型：[`docs/plan/prototype/index.html`](docs/plan/prototype/index.html)

## Commands / 指令

| Command | Action |
|---|---|
| `npm ci` | Install dependencies / 安裝套件 |
| `npm run dev` | Dev server / 開發伺服器 |
| `npm run check` | `astro check` + content check + negative tests / 型別與內容檢查（CI 必過） |
| `npm run build` | Static build to `dist/` / 靜態建置 |

## Content rules / 內容規則

- Every claim traces to `src/content/data/sources.yaml` through `facts.yaml` (status V/A/B/C/X/U).
- Pages reference facts with `factIds:` in frontmatter or `{fact:F5}` in the body. Facts with status C or X cannot be cited.
- Every `zh-hant` content file needs an `en` twin, and the reverse.
- The professor has no Chinese name. See `site.config.ts` (`forbiddenNames`).

## Reuse as a template / 當作模板

1. Create a new repo from this template.
2. Replace `site.config.ts` and everything in `src/content/`. Keep components and `scripts/`.
3. Set `site` and `base` in `astro.config.mjs`.
4. Repo Settings → Pages → Source: GitHub Actions.
