export type Lang = typeof allLanguages[number];

export const allLanguages = ['pl', 'en'] as const;
export const defaultLang: Lang = 'pl';