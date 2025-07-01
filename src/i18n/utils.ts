import { ui, defaultLang } from './ui';

export function getLinkWithLang(lang: keyof typeof ui, path: string) {  
  return  `/${lang}` + "/" + path;
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getSameUrlInNewLang(url: URL, newLang: keyof typeof ui) {
    const prevLang = getLangFromUrl(url);
    const urlWithoutLang = (`${url.pathname}`).substring((prevLang.length + 2));
    return  getLinkWithLang(newLang, urlWithoutLang);
}