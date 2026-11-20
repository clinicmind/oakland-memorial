import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const bi = z.object({ en: z.string(), 'zh-hant': z.string() });
const status = z.enum(['V', 'A', 'B', 'C', 'X', 'U']);

const facts = defineCollection({
  loader: file('src/content/data/facts.yaml'),
  schema: z.object({
    claim: bi,
    sourceIds: z.array(z.string()),
    status,
    checkedOn: z.string().nullable(),
    quote: z.string().optional(),
    note: z.string().optional(),
    approvedByUser: z.boolean().optional(),
  }),
});

const sources = defineCollection({
  loader: file('src/content/data/sources.yaml'),
  schema: z.object({
    title: z.string(),
    url: z.string().nullable(),
    kind: z.string().optional(),
    accessedOn: z.string().nullable().optional(),
    note: z.string().optional(),
  }),
});

const timeline = defineCollection({
  loader: file('src/content/data/timeline.yaml'),
  schema: z.object({
    year: z.number(),
    month: z.number().optional(),
    kind: z.enum(['life', 'career', 'award', 'work', 'service']),
    title: bi,
    factIds: z.array(z.string()),
    sourceIds: z.array(z.string()),
  }),
});

const works = defineCollection({
  loader: file('src/content/data/works.yaml'),
  schema: z.object({
    type: z.enum(['test', 'book', 'article', 'chapter']),
    year: z.number(),
    authors: z.array(z.string()),
    title: z.string(),
    venue: z.string().optional(),
    doi: z.string().nullable().optional(),
    url: z.string().nullable().optional(),
    topics: z.array(
      z.enum([
        'adaptive-behavior', 'temperament-styles', 'test-adaptation',
        'international', 'ethics-professional', 'assessment-general', 'other',
      ]),
    ),
    sourceIds: z.array(z.string()),
  }),
});

// 長文集合：目錄為 <lang>/<slug>.md。
const longform = () =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
    factIds: z.array(z.string()).default([]),
    sourceIds: z.array(z.string()).default([]),
  });
const md = (base: string) => glob({ pattern: '**/*.md', base });

export const collections = {
  facts,
  sources,
  timeline,
  works,
  pages: defineCollection({ loader: md('src/content/pages'), schema: longform() }),
  learn: defineCollection({ loader: md('src/content/learn'), schema: longform() }),
  glossary: defineCollection({ loader: md('src/content/glossary'), schema: longform() }),
  memories: defineCollection({
    loader: md('src/content/memories'),
    schema: longform().extend({ consentToPublish: z.boolean().optional() }),
  }),
};
