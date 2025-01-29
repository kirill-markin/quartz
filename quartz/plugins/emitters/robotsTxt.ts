import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs/promises"
import { FilePath } from "../../util/path"

export const RobotsTxt: QuartzEmitterPlugin = () => {
  return {
    name: "RobotsTxt",
    getQuartzComponents() {
      return []
    },
    async emit({ argv, cfg }): Promise<FilePath[]> {
      const baseUrl = cfg.configuration.baseUrl ? `https://${cfg.configuration.baseUrl}` : ""
      const robotsTxtContent: string = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`

      const outputPath = path.join(argv.output, "robots.txt")
      await fs.writeFile(outputPath, robotsTxtContent, "utf-8")
      return [outputPath as FilePath]
    },
  }
} 
