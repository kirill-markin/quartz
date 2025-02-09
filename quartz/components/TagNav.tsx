import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"

const TagNav: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  return (
    <div class={`tag-nav ${displayClass ?? ""}`}>
      <a href="/tags" class="internal">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tag-icon"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
        <span class="tag-text">{i18n(cfg.locale).pages.tagContent.tagIndex}</span>
      </a>
    </div>
  )
}

TagNav.css = `
.tag-nav {
  margin: 1rem 0;
}

.tag-nav a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  width: 100%;
  background-color: unset!important;
}

.tag-nav a:hover {
  background-color: var(--lightgray);
}

.tag-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.8;
}

@media (max-width: 600px) {
  .tag-nav {
    margin: 0.5rem 0;
  }
  
  .tag-nav .tag-text {
    display: none;
  }
  
  .tag-nav a {
    justify-content: center;
    padding: 0.5rem 0;
  }
}
`

export default (() => TagNav) satisfies QuartzComponentConstructor