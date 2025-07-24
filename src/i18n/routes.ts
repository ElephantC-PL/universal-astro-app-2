import type {Lang } from "./languages";

export type RouteNode = {
  [lang in Lang]: string;
} & {
  children?: Routes; 
};

export type Routes = {
  [key: string]: RouteNode;
};

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


