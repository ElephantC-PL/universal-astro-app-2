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
  firstPost: {
    pl: 'pierwszy-wpis',
    en: 'first-post',   
  },
  secendPost: {
    pl: 'drugi-wpis',
    en: 'secend-post', 
  },
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


