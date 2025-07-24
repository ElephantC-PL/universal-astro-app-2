export type Lang = typeof allLanguages[number];

export const allLanguages = ['pl', 'en', 'uk'] as const;
export const defaultLang: Lang = 'pl';