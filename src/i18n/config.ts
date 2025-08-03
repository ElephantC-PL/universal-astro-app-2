/* 
    IMPORTANT !!!!
    This config must by the same like in astro.config.mjs.
*/

/*   All languages in aplication.   */
export const LOCALES = ['pl', 'en', 'uk'] as const;

/*   Main language. */
export const DEFAULT_LOCALE: Lang = 'pl';

/*   Main language in url e.g. (domain)/pl/ */
export const PREFIX_DEFAULT_LOCALE: boolean = false;

/*  DO NOT CHANGE - its only type to make sure that translations contain all languages  */
export type Lang = typeof LOCALES[number];