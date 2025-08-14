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
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/page/home', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({
		title: z.string(),			
	}),
});

const aboutUs = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/page/aboutUs', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema	
	schema: () => z.object({
		title: z.string(),			
	}),
});

const termsOfService = defineCollection({
	// Load Markdown and MDX files in the `src/content/termsOfService/` directory.
	loader: glob({ base: './src/content/page/termsOfService', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema	
	schema: () => z.object({
		title: z.string(),			
	}),
});

const privacyPolicy = defineCollection({
	// Load Markdown and MDX files in the `src/content/privacyPolicy/` directory.
	loader: glob({ base: './src/content/page/privacyPolicy', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema	
	schema: () => z.object({
		title: z.string(),			
	}),
});

const cookiesPopup = defineCollection({
	// Load Markdown and MDX files in the `src/content/privacyPolicy/` directory.
	loader: glob({ base: './src/content/popup/cookies', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema	
	schema: () => z.object({
	}),
});

const cookiesPage = defineCollection({
	// Load Markdown and MDX files in the `src/content/privacyPolicy/` directory.
	loader: glob({ base: './src/content/page/cookies', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema	
	schema: () => z.object({
		title: z.string(),	
	}),
});

const nested = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/page/nested', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema	
	schema: () => z.object({
		title: z.string(),			
	}),
});

export const collections = { blog, home, aboutUs, termsOfService, privacyPolicy, cookiesPage, cookiesPopup, nested };
