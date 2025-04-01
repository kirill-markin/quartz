import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { SocialIcons } from "./SocialIcons"
import { JSX } from "preact"

interface SocialShareOptions {
  platforms: Array<"twitter" | "facebook" | "linkedin" | "reddit">
  fixedPosition: boolean
}

const defaultOptions: SocialShareOptions = {
  platforms: ["twitter", "facebook", "linkedin", "reddit"],
  fixedPosition: true,
}

type ShareURLs = {
  twitter: string
  facebook: string
  linkedin: string
  reddit: string
}

type PlatformInfo = {
  twitter: { name: string; icon: JSX.Element }
  facebook: { name: string; icon: JSX.Element }
  linkedin: { name: string; icon: JSX.Element }
  reddit: { name: string; icon: JSX.Element }
}

export default ((opts?: Partial<SocialShareOptions>) => {
  const options: SocialShareOptions = { ...defaultOptions, ...opts }

  const SocialShare: QuartzComponent = ({
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    // Skip on index page
    if (fileData.slug === "index") {
      return null
    }

    // Get page URL and title for sharing
    const pageTitle = fileData.frontmatter?.title || ""
    let siteURL = cfg.baseUrl ?? ""
    
    // Ensure the site URL starts with https:// protocol
    if (!siteURL.startsWith('http://') && !siteURL.startsWith('https://')) {
      siteURL = `https://${siteURL}`
    }
    
    const pageURL = `${siteURL}${siteURL.endsWith('/') ? '' : '/'}${fileData.slug}`
    
    // Social share URLs
    const shareURLs: ShareURLs = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageURL)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageURL)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageURL)}`,
      reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(pageURL)}&title=${encodeURIComponent(pageTitle)}`,
    }

    // Platform display names and icons
    const platformInfo: PlatformInfo = {
      twitter: { name: "Twitter", icon: SocialIcons.twitter },
      facebook: { name: "Facebook", icon: SocialIcons.facebook },
      linkedin: { name: "LinkedIn", icon: SocialIcons.linkedin },
      reddit: { name: "Reddit", icon: SocialIcons.reddit },
    }

    const containerClass = options.fixedPosition 
      ? `${displayClass} social-share fixed-social-share`
      : `${displayClass} social-share`

    return (
      <div class={containerClass}>
        <div class="share-buttons">
          {options.platforms.map(platform => {
            if (!shareURLs[platform]) return null
            return (
              <a
                href={shareURLs[platform]}
                class={`share-button ${platform}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Share on ${platformInfo[platform].name}`}
              >
                <span class="icon">{platformInfo[platform].icon}</span>
                <span class="platform-name">{platformInfo[platform].name}</span>
              </a>
            )
          })}
        </div>
      </div>
    )
  }

  SocialShare.css = `
    .social-share {
      margin: 2rem 0;
    }
    
    .fixed-social-share {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      right: 1rem;
      z-index: 100;
    }
    
    @media (max-width: 1200px) {
      .fixed-social-share {
        position: static;
        transform: none;
      }
    }
    
    .share-buttons {
      display: flex;
      flex-direction: ${options.fixedPosition ? 'column' : 'row'};
      gap: 0.8rem;
    }
    
    .share-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border-radius: 50%;
      text-decoration: none;
      transition: all 0.2s ease;
      width: ${options.fixedPosition ? '3rem' : '3rem'};
      height: ${options.fixedPosition ? '3rem' : '3rem'};
      overflow: visible;
    }
    
    .share-button svg {
      width: 100%;
      height: 100%;
    }
    
    .share-button:hover {
      transform: scale(1.1);
      filter: brightness(1.1);
    }
    
    .share-button .platform-name {
      display: none;
    }
    
    /* Platform-specific colors */
    .share-button.twitter svg {
      color: #000000;
    }
    
    .share-button.facebook svg {
      color: #1877f2;
    }
    
    .share-button.linkedin svg {
      color: #0077b5;
    }
    
    .share-button.reddit svg {
      color: #FF4500;
    }
  `

  return SocialShare
}) satisfies QuartzComponentConstructor 