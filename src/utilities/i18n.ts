const definedLanguages = ["en"]

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  return definedLanguages.includes(lang) ? lang : "";
}

export function getLinkWithLang(url: URL, path: string) {
  const lang = getLangFromUrl(url);
  return (lang ? "/": "") + lang + "/" + path;
}