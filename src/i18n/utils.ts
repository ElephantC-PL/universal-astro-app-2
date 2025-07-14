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

export function getTranslatedPath(lang: Lang, keys?: string | string[]): string {
  if (!keys) {
    return `/${lang}`;
  }

  const parts = Array.isArray(keys) ? keys : [keys];
  let current: Routes | undefined = routes;
  const pathParts: string[] = [];

  for (const key of parts) {
    const node: RouteNode | undefined = current?.[key];
    if (!node || !(lang in node)) {
      throw new Error(`Missing translation for key "${key}" in language "${lang}"`);
    }
    pathParts.push(node[lang]);
    current = node.children;
  }

  return `/${lang}/${pathParts.join('/')}`;
}

export function getTranslatedPaths(keys?: string | string[]): { params: Record<string, string> }[] {
  const keyPath = keys
    ? Array.isArray(keys) ? keys : [keys]
    : [];

  return allLanguages.map((lang) => {
    let current: Routes | undefined = routes;
    const params: Record<string, string> = { lang };

    for (const key of keyPath) {
      const node: RouteNode | undefined = current?.[key];
      if (!node || !(lang in node)) {
        throw new Error(`Missing translation for key '${key}' in language '${lang}'`);
      }

      params[key] = node[lang];
      current = node.children;
    }

    return { params };
  });
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

export function getOneLanguageVersionPerPost<T extends { id: string }>(posts: T[], lang: string): T[] {
  const postsByTitle = new Map<string, T[]>();

  for (const post of posts) {
    const [title, postLang] = post.id.split('/') as [string, Lang];
    if (!postsByTitle.has(title)) {
      postsByTitle.set(title, []);
    }
    postsByTitle.get(title)!.push(post);
  }

  const result: T[] = [];

  for (const [title, variants] of postsByTitle.entries()) {
    let post = variants.find(p => p.id.endsWith(`/${lang}`));
    if (!post) {
      post = variants.find(p => p.id.endsWith(`/${defaultLang}`));
    }
    if (!post) {
      post = variants[0];
    }
    result.push(post);
  }

  return result;
}
