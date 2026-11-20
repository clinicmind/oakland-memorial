import type { Lang } from '../../site.config';
export const url = (lang: Lang | string, path = '') =>
  `${import.meta.env.BASE_URL}/${lang}/${path}`.replace(/\/{2,}/g, '/').replace(/([^/])$/, '$1/');
