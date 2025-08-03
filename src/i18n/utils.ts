import { ui } from './ui';
import { DEFAULT_LOCALE, LOCALES, PREFIX_DEFAULT_LOCALE } from './config';
import type { Lang } from './config';
import { routes } from './routes';
import type { Routes, RouteNode } from './routes';

/*
Description:
  React-like helper function (for Astro or similar environments).
  Returns a translation function `t(key)` for a specific language.
  If translation for the chosen language is missing, a fallback value from DEFAULT_LOCALE is used.

Parameters:
  lang: keyof typeof ui – selected language key (e.g. "pl", "en", "uk"), must match keys of the `ui` object from i18n/ui.ts

Required Constants:
  DEFAULT_LOCALE: keyof typeof ui – default language, used as fallback (e.g. "pl")

Returns:
  Function `t(key: string) => string` – returns the translated string for the given dot-separated key (e.g. "nav.about").
  Falls back to the value from the default locale if the translation is missing.

Supports:
  - Nested translation objects (e.g. { nav: { about: "..." } })
  - Dot-notation access (e.g. "nav.about")

Example:
  ui = {
    pl: { nav: { about: "O nas" } },
    en: { nav: { about: "About us" } }
  }

  const t = useTranslations("en");
  t("nav.about"); // "About us"
  
*/

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string): string {
    return (
      getNestedValue(ui[lang], key) ??
      getNestedValue(ui[DEFAULT_LOCALE], key) ??
      key // fallback to key if not found
    );
  }
}
function getNestedValue(obj: any, path: string): string | undefined {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}






/*
Description:
  Method generate value for standard Astro params in getStaticPaths().
  For only one path.
  Translatet for choosen language.
  If PREFIX_DEFAULT_LOCALE is false and lang is DEFAULT_LOCALE lang will by undefined

Parameters: 
  lang: string - choosen language from i18n/config.ts/LOCALES
  keys?: string | string[] - url keys from i18n/routes.ts/routes
    Must correspond exactly to the structure of i18n/routes.ts/routes

Required Constans:
  PREFIX_DEFAULT_LOCALE: boolean - should main language by written in url "(domain)/pl" or not.
  DEFAULT_LOCALE: typeof LOCALE - main language "pl"

Example:
  routes = {
    deep: {
      pl: 'gleboko',     
      children: {
        deeper: {
          pl: 'glebiej',        
          children: {
            nested: {
              pl: 'zagniezdzone'    }}}}}}        
           
  getTranslatedPath('pl', [deep, deeper, nested]) 
  will return: 
  {
    lang: "pl",  // or undefined - read description
    deep: "głęboko"
    deeper: "głębiej"
    nested: "zagnieżdżone"
  }
*/
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


/*
Description:
  Builds a translated URL string for a given language and set of route keys.
  Automatically handles whether to include the language prefix based on PREFIX_DEFAULT_LOCALE.
  If no keys are provided or the result is empty, returns "/".

Parameters:
  lang: string - selected language (must exist in LOCALES and match keys in ui/routes).
  keys?: string | string[] - optional route key or array of nested route keys from i18n/routes.ts/routes.

Required Constants:
  DEFAULT_LOCALE: string - default language code (e.g. "pl").
  PREFIX_DEFAULT_LOCALE: boolean - whether the default locale should be included in the URL (e.g. "/pl").

Uses:
  getTranslatedPath(lang, keys) - generates translated segments as an object of key → value pairs.

Returns:
  string - translated URL path starting with "/", e.g. "/pl/blog/pierwszy" or "/blog/first".
  Falls back to "/" if no segments are generated or all values are empty.

Example:
  routes = {
    blog: {
      pl: 'blog',
      en: 'blog',
      children: {
        firstPost: {
          pl: 'pierwszy',
          en: 'first'
        }
      }
    }
  }

  getTranslatedUrl('pl', ['blog', 'firstPost']) returns:
    "/pl/blog/pierwszy" (if PREFIX_DEFAULT_LOCALE === true)
    "/blog/pierwszy"   (if PREFIX_DEFAULT_LOCALE === false)

  getTranslatedUrl('en', ['blog']) returns: "/en/blog"
  getTranslatedUrl('pl') returns:
    "/" (if PREFIX_DEFAULT_LOCALE === false)
    "/pl" (if PREFIX_DEFAULT_LOCALE === true)
*/
export function getTranslatedUrl(lang: string, keys?: string | string[]): string {
  const params = getTranslatedPath(lang, keys);
  const link = ((PREFIX_DEFAULT_LOCALE || lang !== DEFAULT_LOCALE) ? '/' : '') + Object.values(params).join('/');
  return link.trim() === '' ? '/' : link;
}

/*
Description:
  Generates translated path params for all languages defined in LOCALES.
  Used for creating multiple paths in static site generation (e.g. Astro's getStaticPaths()).
  If PREFIX_DEFAULT_LOCALE is false and lang is DEFAULT_LOCALE, then lang will be undefined in the result.

Parameters:
  keys?: string | string[] - list of route keys from i18n/routes.ts/routes.
    Can be a single key or an array of keys (e.g. ['blog', 'firstPost']).
    Must match the structure of the `routes` object.

Required Constants:
  LOCALES: string[] - list of supported languages (e.g. ['pl', 'en', 'uk']).
  DEFAULT_LOCALE: string - default language key (e.g. 'pl').
  PREFIX_DEFAULT_LOCALE: boolean - controls whether default locale should appear in URL or not.
  routes: Routes - nested structure of translated URL segments.

Uses:
  getTranslatedPath(lang, keys) - function that generates translated segments per language.

Returns:
  Array of objects in the form:
    { params: Record<string, string | undefined> }

Example:
  LOCALES = ['pl', 'en']
  routes = {
    blog: {
      pl: 'blog',
      en: 'blog',
      children: {
        firstPost: {
          pl: 'pierwszy',
          en: 'first'
        }
      }
    }
  }

  getAllTranslatedPaths(['blog', 'firstPost']) returns:
  [
    {
      params: {
        lang: 'pl',
        blog: 'blog',
        firstPost: 'pierwszy'
      }
    },
    {
      params: {
        lang: 'en',
        blog: 'blog',
        firstPost: 'first'
      }
    }
  ]

  If PREFIX_DEFAULT_LOCALE === false, the "lang" key will be `undefined` for default locale.
*/
export function getAllTranslatedPaths(keys?: string | string[]): { params: Record<string, string|undefined> }[] {
  return LOCALES.map((lang) => ({
    params: getTranslatedPath(lang, keys)
  }));
}

/*
Description:
  Reverses a translated URL path back to its internal route keys.
  Useful for resolving translated URLs into their original routing structure (e.g. ['blog', 'firstPost']).
  Handles URLs with or without language prefix depending on PREFIX_DEFAULT_LOCALE.
  Returns null if the path does not match any known translation.

Parameters:
  path: URL - full URL object, from which the pathname will be extracted and analyzed.
    Example: new URL("https://example.com/pl/blog/pierwszy")

Required Constants:
  LOCALES: string[] - list of supported language codes (e.g. ['pl', 'en', 'uk']).
  DEFAULT_LOCALE: string - default language code (e.g. 'pl').
  PREFIX_DEFAULT_LOCALE: boolean - controls whether default locale is expected in URL.
  routes: Routes - nested structure of translated URL segments (from i18n/routes.ts).

Returns:
  string[] | null - array of route keys (e.g. ['blog', 'firstPost']) if path matches,
                    or null if no match found.

Behavior:
  - If the first segment of the path matches one of the LOCALES → it's treated as the language prefix.
  - If not, and PREFIX_DEFAULT_LOCALE is false → default language is assumed.
  - Each segment is decoded (e.g. `%D0%B1%D0%BB%D0%BE%D0%B3` → `блог`) and matched against translations.

Example:
  routes = {
    blog: {
      pl: 'blog',
      en: 'blog',
      children: {
        firstPost: {
          pl: 'pierwszy',
          en: 'first'
        }
      }
    }
  }

  getRouteFromTranslatedPath(new URL("Astro.url") // (domain)/blog/pierwszy
    → ['blog', 'firstPost']

*/
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

/*
Description:
  Filters a list of localized posts to return only those in the required language.
  Assumes each post ID follows the pattern "title/lang" (e.g. "markdownstyleguide/en").
  For each unique post title, exactly one language version is selected.
  If a language variant is missing for any post, an error is thrown.

Generic:
  T extends { id: string } - post object must contain an `id` field (string) representing path-like identifier.

Parameters:
  posts: T[] - array of post objects, each representing a language version of a post (e.g. one for "pl", one for "en", etc.).
  lang: string - required language to filter for (e.g. "pl", "en", "uk").

Returns:
  T[] - list of posts available in the required language, one per unique post title.

Behavior:
  - Groups posts by title (based on the first part of `post.id` before the slash).
  - For each group, finds the variant whose `id` ends with `/${lang}`.
  - If not found, throws an error indicating missing translation.

Example:
  Input:
    posts = [
      { id: 'firstPost/pl', ... },
      { id: 'firstPost/en', ... },
      { id: 'secondPost/pl', ... },
      { id: 'secondPost/en', ... }
    ]

  getPostsInRequiredLanguage(posts, 'en') returns:
    [
      { id: 'firstPost/en', ... },
      { id: 'secondPost/en', ... }
    ]

Notes:
  This function is useful when generating localized blog indexes or feed lists.
  The language version must exist for every post — otherwise an exception is raised.
*/
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

