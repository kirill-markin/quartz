import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Kirill's notes (Moved to kirill-markin.com)",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: {
      provider: "google",
      tagId: "G-K7E02MSKP0",
    },
    locale: "en-US",
    baseUrl: "articles.kirill-markin.com",
    ignorePatterns: [
      ".git",
      ".github",
      ".obsidian",
      "_obsidian",
      "node_modules",
    ],
    defaultDateType: "modified",
    generateSocialImages: false,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
    ],
    filters: [],
    emitters: [
      Plugin.ComponentResources(),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.CNAME(), // Needed for github pages
      Plugin.RobotsTxt(),
      Plugin.SunsetPage(),
    ],
  },
}

export default config
