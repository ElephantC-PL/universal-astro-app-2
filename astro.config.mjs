// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	i18n: {
		defaultLocale: "pl",
		locales: ["pl", "en", "uk"],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: true
		}
	}
});
