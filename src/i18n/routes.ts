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
  },
  secondpost: {
    pl: 'drugi-wpis',
    en: 'second-post', 
  },
  thirdpost: {
    pl: 'trzeci-wpis',
    en: 'third-post', 
  },
  markdownstyleguide: {
    pl: 'stylowanie-markdown',
    en: 'markdown-style-guide', 
  }
};

export const routes: Routes = {
  aboutUs: {
    pl: 'o-nas',
    en: 'about-us',
  },
  blog: {
    pl: 'blog',
    en: 'blog',
    children: blogRoutes
  },
   deep: {
    pl: 'gleboko',
    en: 'deep',
    children: {
      deeper: {
        pl: 'glebiej',
        en: 'deeper',
        children: {
          nested: {
            pl: 'zagniezdzone',
            en: 'nested',
          }
        }
      }
    }
  },
};


