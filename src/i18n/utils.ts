import { ui } from './ui';
import { defaultLang, allLanguages } from './languages';
import type { Lang } from './languages';
import { routes } from './routes';
import type { Routes, RouteNode } from './routes';

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getTranslatedPath(lang: string, keys?: string | string[]): Record<string, string> {
if (!keys) {
    return {lang: lang};
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
    lang: lang,
    ...Object.fromEntries(parts.map((key, index) => [key, pathParts[index]]))
  }
}


export function getTranslatedUrl(lang: string, keys?: string | string[]): string {
  const params = getTranslatedPath(lang, keys);
  return '/' + Object.values(params).join('/');
}

export function getAllTranslatedPaths(keys?: string | string[]): { params: Record<string, string> }[] {
  return allLanguages.map((lang) => ({
    params: getTranslatedPath(lang, keys)
  }));
}

export function getRouteFromTranslatedPath(path: URL): string[] | null {
  const parts = path.pathname.replace(/^\/|\/$/g, '').split('/');
  const possibleLang = parts[0];

  if (!allLanguages.includes(possibleLang as Lang)) {
    return null;
  }

  const lang = possibleLang as Lang;
  const segments = parts.slice(1);

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

