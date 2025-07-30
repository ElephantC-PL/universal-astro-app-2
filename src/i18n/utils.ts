import { ui } from './ui';
import { DEFAULT_LOCALE, LOCALES, PREFIX_DEFAULT_LOCALE } from './config';
import type { Lang } from './config';
import { routes } from './routes';
import type { Routes, RouteNode } from './routes';

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof DEFAULT_LOCALE]) {
    return ui[lang][key] || ui[DEFAULT_LOCALE][key];
  }
}

export function getTranslatedPath(lang: string, keys?: string | string[]): Record<string, string | undefined> {
  const effectiveLang = (PREFIX_DEFAULT_LOCALE === false && lang === DEFAULT_LOCALE) ? undefined : lang;

  if (!keys) {
    return { lang: effectiveLang };
  }

  const parts = Array.isArray(keys) ? keys : [keys];
  let current: Routes | undefined = routes;
  const pathParts: string[] = [];

  for (const key of parts) {
    const node: RouteNode | undefined = current?.[key];
    if (!node || !(lang in node)) {
      throw new Error(`Missing translation for key "${key}" in language "${lang}"`);
    }
    pathParts.push(node[lang as Lang]);
    current = node.children;
  }

  return {
    lang: effectiveLang,
    ...Object.fromEntries(parts.map((key, index) => [key, pathParts[index]]))
  };
}



export function getTranslatedUrl(lang: string, keys?: string | string[]): string {
  const params = getTranslatedPath(lang, keys);
  const link = ((PREFIX_DEFAULT_LOCALE || lang !== DEFAULT_LOCALE) ? '/' : '') + Object.values(params).join('/');
  return link.trim() === '' ? '/' : link;
}

export function getAllTranslatedPaths(keys?: string | string[]): { params: Record<string, string|undefined> }[] {
  return LOCALES.map((lang) => ({
    params: getTranslatedPath(lang, keys)
  }));
}

export function getRouteFromTranslatedPath(path: URL): string[] | null {
  const parts = path.pathname.replace(/^\/|\/$/g, '').split('/');
  let lang: Lang;
  let segments: string[];

  const possibleLang = parts[0];

  if (LOCALES.includes(possibleLang as Lang)) {
    lang = possibleLang as Lang;
    segments = parts.slice(1);
  } else if (PREFIX_DEFAULT_LOCALE === false) {
    lang = DEFAULT_LOCALE;
    segments = parts;
  } else {
    return null;
  }

  segments = segments.map(segment => decodeURIComponent(segment));

  let current: Routes | undefined = routes;
  const keys: string[] = [];

  for (const segment of segments) {
    const entry = Object.entries(current ?? {}) as [string, RouteNode][];
    const match = entry.find(([, value]) => value[lang] === segment);

    if (!match) return null;

    const [key, node] = match;
    keys.push(key);
    current = node.children;
  }

  return keys;
}

export function getPostsInRequiredLanguage<T extends { id: string }>(posts: T[], lang: string): T[] {
  const postsByTitle = new Map<string, T[]>();

  for (const post of posts) {
    const title = post.id.split('/')[0];
    if (!postsByTitle.has(title)) {
      postsByTitle.set(title, []);
    }
    postsByTitle.get(title)!.push(post);
  }

  const result: T[] = [];

  for (const [title, variants] of postsByTitle.entries()) {
    const post = variants.find(p => p.id.endsWith(`/${lang}`));
    if (!post) {
      throw new Error(`Missing post in language "${lang}" for title "${title}"`);
    }
    result.push(post);
  }

  return result;
}

