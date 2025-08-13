import type {Lang } from "./config";

/*
  MAIN TRANSLATIONS OBJECT is in the bottom of this file
*/

/*
  PARTIAL TRANSLATIONS OBJECT

  You can use this for children of main translations object.
  Its separated for egsample for blog post itp.
*/
export const blogRoutes: Routes = {
  firstpost: {
    pl: 'pierwszy-wpis',
    en: 'first-post',
    uk: 'перша-стаття',
  },
  secondpost: {
    pl: 'drugi-wpis',
    en: 'second-post',
    uk: 'друга-стаття',
  },
  thirdpost: {
    pl: 'trzeci-wpis',
    en: 'third-post',
    uk: 'третя-стаття',
  },
  markdownstyleguide: {
    pl: 'stylowanie-markdown',
    en: 'markdown-style-guide',
    uk: 'настанови-markdown',
  }
};

/*
  MAIN TRANSLATIONS OBJECT

  Main object with translations for urls.
  Must contain all languages from config.ts/LOCALES
  Structure correspond to url parts - children are parts after "/"
*/
export const routes: Routes = {
  aboutUs: {
    pl: 'o-nas',
    en: 'about-us',
    uk: 'про-нас',
  },
  blog: {
    pl: 'blog',
    en: 'blog',
    uk: 'блог',
    children: blogRoutes
  },
  privacyPolicy: {
    pl: 'polityka-prywatnosci',
    en: 'privacy-policy',
    uk: 'політика-конфіденційності'
  }, 
  cookies: {
    pl: 'ciasteczka',
    en: 'cookies',
    uk: 'файли'
  },
  regimen: {
    pl: 'regulamin',
    en: 'regimen',
    uk: 'статут' 
  },
  deep: {
    pl: 'gleboko',
    en: 'deep',
    uk: 'глибоко',
    children: {
      deeper: {
        pl: 'glebiej',
        en: 'deeper',
        uk: 'глибше',
        children: {
          nested: {
            pl: 'zagniezdzone',
            en: 'nested',
            uk: 'вкладене',
          }
        }
      }
    }
  },
};


/*  
  DO NOT CHANGE !!!! 
  - its only types to make sure that structure of routes is correct  
*/
export type RouteNode = {
  [lang in Lang]: string;
} & {
  children?: Routes; 
};

export type Routes = {
  [key: string]: RouteNode;
};



