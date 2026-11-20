import type { Lang } from '../../site.config';
// 站內連結。目錄式網址以斜線結尾；帶錨點（#id）的不再加斜線。
export const url = (lang: Lang | string, path = '') => {
  const joined = `${import.meta.env.BASE_URL}/${lang}/${path}`.replace(/\/{2,}/g, '/');
  return joined.includes('#') ? joined : joined.replace(/([^/])$/, '$1/');
};
