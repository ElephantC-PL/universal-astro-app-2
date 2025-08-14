import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({	
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),	
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),		
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

const home = defineCollection({	
	loader: glob({ base: './src/content/page/home', pattern: '**/*.{md,mdx}' }),	
	schema: () => z.object({
		title: z.string(),			
	}),
});

const aboutUs = defineCollection({	
	loader: glob({ base: './src/content/page/aboutUs', pattern: '**/*.{md,mdx}' }),		
	schema: () => z.object({
		title: z.string(),			
	}),
});

const termsOfService = defineCollection({	
	loader: glob({ base: './src/content/page/termsOfService', pattern: '**/*.{md,mdx}' }),	
	schema: () => z.object({
		title: z.string(),			
	}),
});

const privacyPolicy = defineCollection({	
	loader: glob({ base: './src/content/page/privacyPolicy', pattern: '**/*.{md,mdx}' }),		
	schema: () => z.object({
		title: z.string(),			
	}),
});

const cookiesPopup = defineCollection({	
	loader: glob({ base: './src/content/popup/cookies', pattern: '**/*.{md,mdx}' }),	
	schema: () => z.object({
	}),
});

const cookiesPage = defineCollection({	
	loader: glob({ base: './src/content/page/cookies', pattern: '**/*.{md,mdx}' }),	
	schema: () => z.object({
		title: z.string(),	
	}),
});

const nested = defineCollection({	
	loader: glob({ base: './src/content/page/nested', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		title: z.string(),			
	}),
});

export const collections = { blog, home, aboutUs, termsOfService, privacyPolicy, cookiesPage, cookiesPopup, nested };
