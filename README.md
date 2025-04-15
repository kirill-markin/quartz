# Kirill Markin's Digital Garden 🌱

> [!IMPORTANT]
> **Repository Sunset Notice**
> 
> This repository is no longer actively maintained. All new content and development has moved to the new repository:
> [https://github.com/kirill-markin/website-next-js](https://github.com/kirill-markin/website-next-js)
>
> Please update your bookmarks and visit the new repository for the latest updates.

This repository hosts my personal digital garden/blog available at [articles.kirill-markin.com](https://articles.kirill-markin.com). It's built using [Quartz](https://quartz.jzhao.xyz/), a powerful static site generator designed for publishing digital gardens and personal knowledge bases.

## About This Site

This is where I share my thoughts, insights, and discoveries about technology, development, and various other topics. The content is written in Obsidian-compatible markdown format, making it easy to maintain and interconnect ideas.

The site content comes from two sources:
- Direct markdown files in `content/` directory
- Selected public notes from my Obsidian vault (`_obsidian/public/`), linked through the `content/` directory

> Note: While the repository includes my full Obsidian vault as a submodule (`_obsidian/`), only content from its `public/` directory is published and accessible through this blog.

## Local Development

### Prerequisites
- Node.js 20 or higher
- npm 9.3.1 or higher
- Git

### Setup and Run

1. Clone the repository with submodules:
```bash
git clone https://github.com/kirill-markin/quartz.git
cd quartz
```

2. Update submodules (required after clone/pull):
```bash
git submodule update --init --recursive
```

3. Install dependencies:
```bash
npm ci
```

4. Start the development server:
```bash
npx quartz build --serve --port 8080
```

The site will be available at `http://localhost:8080`

### Building for Production

To build the site without starting a development server:
```bash
npx quartz build
```

## Content Structure

- All content is stored in the `content/` directory
- Each markdown file must include frontmatter with `publish: true` to be visible
- Example frontmatter:
  ```yaml
  ---
  title: "Page Title"
  date: 2024-02-08
  tags: [tag1, tag2]  # Used for navigation and Related Articles
  publish: true
  ---
  ```

## Features

- 🔍 Full-text search
- 📊 Interactive graph view
- 🔗 Wikilink support
- 📱 Mobile-friendly
- 🌙 Dark/Light mode
- 🧮 LaTeX support
- 📝 Table of contents generation
- 📚 Related Articles section
  - Shows up to 5 articles with matching tags
  - Sorted by relevance (number of matching tags)
  - Improves navigation and SEO
  - Automatically hidden if no matches found
- 📅 Latest Posts on Homepage
  - Shows 5 most recent published articles
  - Improves content discovery
  - SEO-optimized with proper heading structure
  - Automatically updates as new content is added

## Contributing

This is a personal blog, but if you notice any issues or have suggestions:
1. Create a feature branch from `v4`: `feat/*` or `fix/*`
2. Make your changes
3. Submit a pull request to the `v4` branch

## Deployment

The site automatically deploys to GitHub Pages when changes are merged into the `v4` branch. The deployment process includes:
- Recursive submodule updates
- Full git history fetch
- Clean dependency installation
- Build and publish to gh-pages

## Contact

If you'd like to discuss any of the content or have questions, you can reach me at:
- Website: [kirill-markin.com](https://kirill-markin.com)
- GitHub: [@kirill-markin](https://github.com/kirill-markin)

## License

Content is licensed under [MIT License](LICENSE) unless otherwise specified.
