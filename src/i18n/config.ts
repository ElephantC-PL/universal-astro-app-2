export type Lang = typeof LOCALES[number];

export const LOCALES = ['pl', 'en', 'uk'] as const;
export const DEFAULT_LOCALE: Lang = 'pl';
export const PEFIX_DEFAULT_LOCALE: boolean = true;