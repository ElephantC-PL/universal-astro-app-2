# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── i18n/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

## 🌍 Multi-language i18n

All translation-related features are located in the folder: `src/i18n`

1. `./config.ts` – Define all the languages your application should support here. Remember that the same settings must also be applied in `astro.config.ts`.
2. `./routes.ts` – This file contains translations for all URLs.
3. `./ui.ts` – Here you define translations for all content used in reusable components and any content that is not part of individual pages.
4. `./utils.ts` – Contains all utility functions used for handling translations.

### Translations for global content and reusable components

To use a translation in a component – define the language:

```ts
const lang = Astro.currentLocale as Lang;
const t = useTranslations(lang);
```

Usage in HTML (.astro):

```html
<p>{t('nav.home')}</p> 
```

Use keys from the file: `./i18n/ui.ts`

### Translations for page content

In `src/pages/[...lang]`, use files like `[aboutUs].astro`.  
You can also nest them for deeper URLs:  
`src/pages/[...lang]/[deep]/[deeper]/[nested].astro`

#### Translating URLs:

```ts
export function getStaticPaths() {
	const params = getAllTranslatedPaths('aboutUs') 
  	return params;
}
```

In this function, use keys from `./i18n/routes.ts`.  
It can be a `string` or a `string[]` for nested pages.  
For nested pages, use the following in `getStaticPaths()`:

```ts
const params = getAllTranslatedPaths(['deep','deeper', 'nested'])
```

#### Translating content:

Translations are stored in collections in the `src/content` folder.  
The collection structure must look like this:

```
├── content/
│   ├── aboutUs/
│   │   ├── en.md
│   │   ├── pl.md
│   │   ├── uk.md
```

And in `content.config.ts`, for example:

```ts
const aboutUs = defineCollection({	
	loader: glob({ base: './src/content/aboutUs', pattern: '**/*.{md,mdx}' }),	
	schema: () => z.object({
		title: z.string(),
        ...,
	}),
});
```

### Translating blog article content

#### Blog collection structure:

```
├── content/
│   ├── blog/
│   │   ├── redCats
│   │   │   ├── en.md
│   │   │   ├── pl.md
│   │   │   ├── uk.md
│   │   ├── redDogs
│   │   │   ├── en.md
│   │   │   ├── pl.md
│   │   │   ├── uk.md
```

In `content.config.ts`, for example:

```ts
const blog = defineCollection({	
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),	
	schema: ({ image }) => z.object({
		title: z.string(),
		...,
	}),
});
```

#### Translating URLs:

In the `pages` directory, use slugs, for example:  
`src/pages/[...lang]/[blog]/[slug].astro`

Define paths for all languages based on the collection:

```ts
export async function getStaticPaths() {	
	const posts = await getCollection('blog');	
	return posts.map((post: CollectionEntry<'blog'>) => {
		const postId = post.id.split('/')[0];  // post.id is e.g. redCat/en
		const lang = post.id.split('/')[1];	
		const { [postId]: translatedPostName, ...rest } = getTranslatedPath(lang, ['blog', postId])
		return {
			params:  { ...rest, slug: translatedPostName },
			props: post,
		};
	});
}
```

#### Rendering translated blog post content:

Thanks to passing the article content as `props` for each URL, it's easy to render:

```ts 
const post = Astro.props;
const { Content } = await render(post);

---
<BlogPost {...post.data}>
	<Content />
</BlogPost>
```

### Setting the default language prefix in the URL

If the default language is `en`, by default it does **not** appear in the URL:
```
(domain)/about-us/
(domain)/pl/o-nas
```

To change this behavior, set `prefixDefaultLocale` in both configuration files:
- `src/i18n/config.ts`
- `astro.config.mjs`

**IMPORTANT!!!**  
If `prefixDefaultLocale = true`, you must create the file `pages/index.astro` – although its content will never be rendered.  
However, when `prefixDefaultLocale = false`, it’s a good idea to delete this file so that the homepage is loaded from `pages/[...lang]/index.astro`.

### Displaying a list of articles in a single language ###

To extract a list of posts filtered by a specific language:

```ts
const lang = Astro.currentLocale as Lang;
const posts = getPostsInRequiredLanguage((await getCollection('blog')), lang).sort(
	(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);
```

Then, render the list using appropriate language-specific links:

```ts (.astro)
{
	posts.map((post) => (		
		<a href={getTranslatedUrl(lang, ['blog', post.id.split('/')[0]]) }>		
			<h4 class="title">{post.data.title}</h4>		
		</a>		
	))
}
```

## Deployment:

**IMPORTANT!!!**  
Remember to set the correct:
1. Domain in the **sitemap** path in the `public/robots.txt` file.
2. Information in **manifest**.
3. Information in pages: **privacy policy**, **terms of service**, **cookies** and **cookies popup**.