import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { FilePath, FullSlug } from "../util/path"

interface RelatedContentOptions {
  hideIfEmpty: boolean
  maxArticles: number
  title?: string
}

const defaultOptions: RelatedContentOptions = {
  hideIfEmpty: true,
  maxArticles: 5,
}

export default ((opts?: Partial<RelatedContentOptions>) => {
  const options: RelatedContentOptions = { ...defaultOptions, ...opts }

  const RelatedContent: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    // Don't show on index page
    if (fileData.slug === "index") {
      return null
    }
    
    // If no tags, don't show the component
    const currentTags = fileData.frontmatter?.tags || []
    if (currentTags.length === 0) {
      return null
    }
    
    // Get current slug to exclude current article from results
    const currentSlug = simplifySlug(fileData.slug!)
    
    // Find other articles with matching tags
    const relatedArticles = allFiles
      .filter((file) => {
        // Don't include the current article
        if (simplifySlug(file.slug!) === currentSlug) return false
        
        // Check if publish is true
        if (file.frontmatter?.publish !== true) return false
        
        // Check if has shared tags
        const fileTags = file.frontmatter?.tags || []
        return fileTags.some(tag => currentTags.includes(tag))
      })
      // Sort by number of matching tags (most matches first)
      .map(file => {
        const fileTags = file.frontmatter?.tags || []
        const matchingTagsCount = fileTags.filter(tag => currentTags.includes(tag)).length
        return { file, matchingTagsCount }
      })
      .sort((a, b) => b.matchingTagsCount - a.matchingTagsCount)
      .map(item => item.file)
      .slice(0, options.maxArticles)

    if (options.hideIfEmpty && relatedArticles.length === 0) {
      return null
    }

    // Use custom title or get from i18n
    const title = options.title ?? i18n(cfg.locale).components.relatedContent?.title ?? "Related Articles"
    const emptyMessage = i18n(cfg.locale).components.relatedContent?.noRelatedContent ?? "No related articles"

    return (
      <div class={classNames(displayClass, "related-content")}>
        <h2>{title}</h2>
        <ul>
          {relatedArticles.length > 0 ? (
            relatedArticles.map((f) => (
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

  RelatedContent.css = `
  .related-content {
    margin: 2rem 0;
  }
  
  .related-content h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .related-content ul {
    list-style: disc;
    padding-left: 1.2rem;
  }
  
  .related-content ul li {
    margin: 0.5rem 0;
    padding-left: 0.5rem;
  }

  .related-content a.internal {
    font-weight: 500;
    text-decoration: none;
    color: var(--secondary);
    transition: color 0.2s ease;
  }
  
  .related-content a.internal:hover {
    color: var(--tertiary);
    text-decoration: underline;
  }
  `

  return RelatedContent
}) satisfies QuartzComponentConstructor 