import { QuartzEmitterPlugin } from "../../types"
import path from "path"
import fs from "fs/promises"
import { FilePath } from "../../../util/path"

export const SunsetPage: QuartzEmitterPlugin = () => {
  return {
    name: "SunsetPage",
    getQuartzComponents() {
      return []
    },
    async emit({ argv, cfg }): Promise<FilePath[]> {
      const outputDir = argv.output
      const pageName = "index.html"
      const outputPath = path.join(outputDir, pageName)
      
      // Create paths for essential pages
      const indexPath = path.join(outputDir, "index.html")
      const notFoundPath = path.join(outputDir, "404.html")
      
      // Create a simple sunset page
      const sunsetContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>This site has been sunset</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 650px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
    h1 {
      margin-top: 2rem;
    }
    p {
      margin-bottom: 1.5rem;
    }
    a {
      color: #284b63;
      text-decoration: none;
      font-weight: 600;
    }
    a:hover {
      text-decoration: underline;
    }
    .redirect-box {
      margin: 2rem 0;
      padding: 1.5rem;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      background-color: #f8f8f8;
    }
  </style>
</head>
<body>
  <h1>This site has been sunset</h1>
  <p>
    The content that was previously hosted at this domain is no longer available.
  </p>
  
  <div class="redirect-box">
    <p>
      <strong>All content has been moved to:</strong>
    </p>
    <p>
      <a href="https://kirill-markin.com/" rel="canonical">https://kirill-markin.com/</a>
    </p>
    <p>
      Please update your bookmarks and links.
    </p>
  </div>
  
  <p>
    You will be automatically redirected to the new website in a few seconds.
  </p>
  
  <p>
    <small>HTTP 410 Gone</small>
  </p>

  <script>
    // Redirect to the new website after 5 seconds
    setTimeout(function() {
      window.location.href = 'https://kirill-markin.com/';
    }, 5000);
  </script>
</body>
</html>`

      // Create a .htaccess file to return 410 Gone status for all requests
      // This works on Apache servers
      const htaccessPath = path.join(outputDir, ".htaccess")
      const htaccessContent = `# Return 410 Gone for all requests
RewriteEngine On
RewriteCond %{REQUEST_URI} !=/index.html
RewriteRule .* - [G,L]

# Set HTTP response status code to 410 Gone
ErrorDocument 410 /index.html`

      // Create a _headers file for Netlify (if used)
      const headersPath = path.join(outputDir, "_headers") 
      const headersContent = `/*
  X-Robots-Tag: noindex, nofollow
  Cache-Control: max-age=3600
`

      // Create a vercel.json file (if using Vercel)
      const vercelPath = path.join(outputDir, "vercel.json")
      const vercelContent = `{
  "routes": [
    {
      "src": "/(.*)",
      "status": 410,
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow"
        }
      ]
    }
  ]
}`

      // Create a netlify.toml file (if using Netlify)
      const netlifyPath = path.join(outputDir, "netlify.toml")
      const netlifyContent = `[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 410
  force = true`

      // Create a canonical-url.html file for Google and other search engines
      const canonicalPath = path.join(outputDir, "canonical-url.html")
      const canonicalContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <link rel="canonical" href="https://kirill-markin.com/">
  <title>Redirecting to https://kirill-markin.com/</title>
  <meta http-equiv="refresh" content="0;url=https://kirill-markin.com/">
</head>
<body>
  <p>Redirecting to <a href="https://kirill-markin.com/">https://kirill-markin.com/</a></p>
</body>
</html>`

      // Create a simple sitemap.xml with proper redirect info
      const sitemapPath = path.join(outputDir, "sitemap.xml")
      const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${cfg.configuration.baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>never</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`

      // Write all files
      await fs.writeFile(indexPath, sunsetContent, "utf-8")
      await fs.writeFile(notFoundPath, sunsetContent, "utf-8")
      await fs.writeFile(htaccessPath, htaccessContent, "utf-8")
      await fs.writeFile(headersPath, headersContent, "utf-8")
      await fs.writeFile(vercelPath, vercelContent, "utf-8")
      await fs.writeFile(netlifyPath, netlifyContent, "utf-8")
      await fs.writeFile(canonicalPath, canonicalContent, "utf-8")
      await fs.writeFile(sitemapPath, sitemapContent, "utf-8")

      return [
        indexPath as FilePath,
        notFoundPath as FilePath,
        htaccessPath as FilePath,
        headersPath as FilePath,
        vercelPath as FilePath,
        netlifyPath as FilePath,
        canonicalPath as FilePath,
        sitemapPath as FilePath,
      ]
    },
  }
} 