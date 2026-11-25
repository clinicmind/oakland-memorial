# External Review Brief: Thomas D. Oakland Memorial Website

> **For:** an outside AI reviewer (Gemini, ChatGPT or similar).
> **From:** the project owner, with the project's planning lead (Claude).
> **Date:** 2026-11-25
> **How your answer will be used:** the planning lead reads it and adopts only the suggestions that fit the project's rules and goals. Clear reasons make adoption more likely.

---

## 1. Your two tasks

1. **Creative extensions.** Suggest new ways to extend the project. Examples: new sections, new interactive learning features, ways to gather memories from his former students and colleagues, a reusable template for memorial sites of other professors.
2. **Use and improve what exists.** Review the current features. Suggest how to make them more useful, more usable, more accessible, faster or easier to maintain.

Answer in the format in section 7. Read sections 2 to 6 first: the rules in section 4 are non-negotiable, and a suggestion that breaks one will be rejected.

---

## 2. What to look at

| What | Where |
|---|---|
| Live preview, Traditional Chinese | https://clinicmind.github.io/oakland-memorial/zh-hant/ |
| Live preview, English | https://clinicmind.github.io/oakland-memorial/en/ |
| Source code (public) | https://github.com/clinicmind/oakland-memorial |
| Master plan | `docs/plan/MASTER_PLAN.md` |
| Design spec (current: v2) | `docs/plan/DESIGN_SPEC.md` |
| Progress log | `docs/plan/PROGRESS.md` |
| Facts, each with source and status | `src/content/data/facts.yaml`, `src/content/data/sources.yaml` |
| Works catalogue | `src/content/data/works.yaml` |
| Learning units | `src/content/learn/{en,zh-hant}/*.md` |
| Glossary | `src/content/glossary/{en,zh-hant}/*.md` |
| Bilingual review report | `docs/plan/M9-translation-review.md` |

The preview is deliberately hidden from search engines (`noindex`) until the family has been contacted.

---

## 3. The project

### 3.1 Purpose

The site remembers **Professor Thomas D. Oakland (1939-2015)**, an American school psychologist. It also introduces his work to new readers, so they can learn from it. He taught at the University of Texas at Austin and the University of Florida. He led international associations (ISPA, ITC). He co-authored the Adaptive Behavior Assessment System (ABAS) and the Student Styles Questionnaire. In 2011 he was a Visiting Professor at the University of Macau.

The owner was his student in Macau, in the Master of Clinical Psychology program. The owner is now a clinical psychologist and clinical supervisor, and founded a therapists' association. The owner writes as **臨床心語 (ClinicMind)**.

### 3.2 Audience

1. Psychology and education students, mainly in Macau, Hong Kong and Taiwan.
2. School psychologists and clinicians.
3. His former colleagues, students and friends around the world.
4. The general public.

### 3.3 Languages

Traditional Chinese (default) and English. The two versions must carry the same facts. Each version must read naturally in its own language.

### 3.4 Current status (about 70 percent)

| Area | Status |
|---|---|
| Fact checking against original sources | Done |
| Works catalogue (Crossref, checked by DOI) | Done; not complete |
| Design v2 (built with the open-source "taste-skill") | Done; home page passes its quality gate |
| Home, life, honors, places, works, test pages, search | Done |
| Learning center: 5 units with self-check quizzes, and a 22-term glossary | Done |
| Macau years, legacy, memories pages | Pages done. Waiting for the memory submission form and real photographs |
| Bilingual review | Done |
| Launch checks | Mostly done |
| Contact the family, then go public | Not started; this step is the owner's |

---

## 4. Non-negotiable rules

Do not suggest anything that breaks these rules.

1. **No fact without a source.** Every fact about Oakland must trace to a source in `sources.yaml` that was opened and checked. Automated checks enforce this at build time. Do not suggest content that "fills gaps" from general knowledge.
2. **No invented quotes, opinions or anecdotes.** Describe his published work. Do not state what he "believed" unless a source quotes him.
3. **No AI-generated or AI-edited images of him.** No synthetic portraits, voice clones, chatbots that speak as him, or "conversations with Professor Oakland".
4. **No copyrighted test content.** No items, scoring rules, norms or manual text from ABAS, SSQ or any other test. Describing purpose and structure is fine.
5. **No Chinese name or transliteration for him.** He had none.
6. **No counts that the sources dispute.** Examples: number of tests, number of publications, retirement year.
7. **His death:** one respectful sentence only, with a link to the University of Florida statement. No details of the crime and no names.
8. **Privacy:** no personal data of his family. No names of other students unless they agree. Memories are published only with the writer's consent.
9. **Static site, no backend.** Hosting is GitHub Pages. Anything that needs a server must use an outside service (for example a form service) and keep a human review step.
10. **Design system v2 is fixed.** It uses a cool white ground, slate text, one teal accent, the Albert Sans and Noto Sans TC typefaces, a full-bleed photo hero, and two dealt motion moments. There is no scroll fade-in. Visual suggestions must work inside this system (see `DESIGN_SPEC.md`), not replace it.
11. **Writing style:** short sentences in active voice. No em dashes (`—`) or en dashes (`–`) in visible text.
12. **Accessibility:** WCAG 2.2 AA, keyboard use, and correct `lang` attributes.

---

## 5. Architecture in brief

- **Stack:** Astro 5 (static output), plain CSS with the taste-skill kit, Pagefind for search, and Fontsource fonts hosted with the site.
- **Content:** Markdown and YAML content collections, checked by Zod schemas.
- **Checks:** `npm run check` runs `astro check`, a content checker and negative tests. The content checker covers bilingual parity, that every source id exists, that facts with status C or X are never used, that U facts are approved, and that no Chinese name appears. Other tools: a link checker, axe accessibility tests, Lighthouse, and the taste-skill gate (a layout and copy checker run in a browser).
- **Routes:** `/[lang]/` home; `/[lang]/[page]` for life, honors, places, sources, Macau, legacy and memories; `/[lang]/works`; `/[lang]/tests/[slug]`; `/[lang]/learn/`; `/[lang]/learn/[slug]`; `/[lang]/glossary`; `/[lang]/search`; `/[lang]/credits`.
- **Components:** SiteNav, SiteFooter, Breadcrumb, SourceRefs (clickable source badges), GlossaryTerm, QuizScript (accessible radio-group quiz).
- **Deploy:** GitHub Actions to GitHub Pages; CI runs the checks on every push.
- **Template goal:** all person-specific content sits in `src/content/` and `site.config.ts`, so the owner can reuse the site for other late professors.

---

## 6. Known limits (suggestions here are welcome)

1. The works catalogue comes from Crossref, so it is not complete. Books are listed only when checked.
2. Only 2 tests have verifiable sources (ABAS-3, SSQ).
3. The "places" page is a list. It has no interactive map.
4. Photos are licensed Wikimedia Commons stand-ins of the universities. The owner will supply a real hero photo.
5. Memory submissions wait for an outside form (Tally is planned) followed by manual review.
6. The learning units are text, diagrams and quizzes. They have no other interactive elements.
7. The site has no update channel (no RSS or newsletter), and analytics have not been decided.

---

## 7. Required answer format

Answer in English or Traditional Chinese. Use two tables, one per task. Keep each cell short.

### Task 1: Creative extensions

| # | Idea | Who benefits | Why it fits the purpose | Effort (S/M/L) | Risks or rules touched (section 4 numbers) | First concrete step |
|---|---|---|---|---|---|---|

### Task 2: Improvements to existing features

| # | Feature or page | Problem you see (with URL or file path) | Suggested change | Impact (H/M/L) | Effort (S/M/L) | How to verify |
|---|---|---|---|---|---|---|

Then add:

1. **Top 3:** your three strongest suggestions overall, with one sentence each on why.
2. **Questions:** anything you could not check, or need the owner to answer.

**Quality bar.**

- Prefer specific, checkable suggestions ("add `aria-live` to the quiz feedback in `QuizScript.astro`") over general advice ("improve accessibility").
- Cite the file or URL you looked at.
- If you could not open something, say so. Do not guess what it contains.
- Do not rewrite content about Oakland; point out what is wrong and why instead.
- Ten good suggestions beat thirty weak ones.

---

## 8. What happens next

The planning lead (Claude) scores each suggestion against section 4 and the project goals. Adopted items go into `PROGRESS.md` as tasks, and a separate agent carries them out. Rejected items are listed with a one-line reason. Nothing from this review changes the site without that step.
