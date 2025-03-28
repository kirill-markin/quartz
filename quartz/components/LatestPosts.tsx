import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface LatestPostsOptions {
  hideIfEmpty: boolean
  maxArticles: number
  title?: string
}

const defaultOptions: LatestPostsOptions = {
  hideIfEmpty: true,
  maxArticles: 5,
}

export default ((opts?: Partial<LatestPostsOptions>) => {
  const options: LatestPostsOptions = { ...defaultOptions, ...opts }

  const LatestPosts: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    // Only show on index page
    if (fileData.slug !== "index") {
      return null
    }
    
    // Find latest published articles by creation date
    const latestArticles = allFiles
      .filter((file) => {
        // Only include published articles
        return file.frontmatter?.publish === true
      })
      // Sort by date (newest first)
      .sort((a, b) => {
        const dateA = a.frontmatter?.date ? new Date(a.frontmatter.date as string) : new Date(0)
        const dateB = b.frontmatter?.date ? new Date(b.frontmatter.date as string) : new Date(0)
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, options.maxArticles)

    if (options.hideIfEmpty && latestArticles.length === 0) {
      return null
    }

    // Use custom title or get from i18n
    const title = options.title ?? i18n(cfg.locale).components.latestPosts?.title ?? "Latest Posts"
    const emptyMessage = i18n(cfg.locale).components.latestPosts?.noLatestPosts ?? "No published articles"

    return (
      <div class={classNames(displayClass, "latest-posts")}>
        <h2>{title}</h2>
        <ul>
          {latestArticles.length > 0 ? (
            latestArticles.map((f) => (
              <li>
                <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                  {f.frontmatter?.title}
                </a>
              </li>
            ))
          ) : (
            <li>{emptyMessage}</li>
          )}
        </ul>
      </div>
    )
  }

  LatestPosts.css = `
  .latest-posts {
    margin: 2rem 0;
  }
  
  .latest-posts h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .latest-posts ul {
    list-style: disc;
    padding-left: 1.2rem;
  }
  
  .latest-posts ul li {
    margin: 0.5rem 0;
    padding-left: 0.5rem;
  }

  .latest-posts a.internal {
    font-weight: 500;
    text-decoration: none;
    color: var(--secondary);
    transition: color 0.2s ease;
  }
  
  .latest-posts a.internal:hover {
    color: var(--tertiary);
    text-decoration: underline;
  }
  `

  return LatestPosts
}) satisfies QuartzComponentConstructor 