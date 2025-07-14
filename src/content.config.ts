import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const bloga = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/bloga', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

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
	loader: glob({ base: './src/content/home', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({
		title: z.string(),			
	}),
});

const aboutUs = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/aboutUs', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema	
	schema: () => z.object({
		title: z.string(),			
	}),
});

const nested = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/nested', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema	
	schema: () => z.object({
		title: z.string(),			
	}),
});

export const collections = { bloga, blog, home, aboutUs, nested };
