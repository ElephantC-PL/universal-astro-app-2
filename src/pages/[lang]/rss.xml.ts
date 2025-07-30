import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { Lang } from '../../i18n/config';
import { getAllTranslatedPaths, getPostsInRequiredLanguage, getTranslatedUrl, useTranslations } from '../../i18n/utils';


export function getStaticPaths() {
	const params = getAllTranslatedPaths()	
  	return params;
}

export async function GET(context: { site: any; params: { lang: Lang } }) {
	
	const lang = context.params.lang;
	const posts = getPostsInRequiredLanguage((await getCollection('blog')), lang).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);	

	const t = useTranslations(lang);

	return rss({
		title: t('name'),
		description: t('meta.description'),
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: getTranslatedUrl(lang, ['blog', post.id.split('/')[0]]) + `/`,
		})),
	});
}
