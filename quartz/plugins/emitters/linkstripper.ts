import { QuartzEmitterPlugin } from "../types"
import { Root, Element } from "hast"
import { visit } from "unist-util-visit"
import { FilePath, FullSlug, simplifySlug, resolveRelative } from "../../util/path"

export const LinkStripper: QuartzEmitterPlugin = () => {
  return {
    name: "LinkStripper",
    async emit(_ctx, content, _resources): Promise<FilePath[]> {
      // 1. Create a Set of all valid targets (Slugs + Aliases)
      const allSlugs = new Set<string>()

      for (const [_, fileData] of content) {
        // Add the primary slug
        if (fileData.data.slug) {
          allSlugs.add(simplifySlug(fileData.data.slug))
        }

        // Add all aliases defined in frontmatter
        const aliases = fileData.data.frontmatter?.aliases ?? []
        for (const alias of aliases) {
          // Normalize alias to match how Quartz handles them in AliasRedirects
          allSlugs.add(simplifySlug(alias as FullSlug))
        }
      }

      for (const [tree, fileData] of content) {
        const currentSlug = fileData.data.slug!

        visit(tree as Root, "element", (node: Element, index, parent) => {
          if (node.tagName === "a" && node.properties?.href) {
            const href = node.properties.href.toString()

            // Skip external, anchors, and protocols
            if (/^(https?:\/\/|mailto:|tel:|#)/.test(href)) return

            // 2. Resolve link and strip relative prefixes
            const [destPath] = href.split("#")
            const relativeResolved = resolveRelative(currentSlug, destPath as FullSlug)
            const absoluteDest = simplifySlug(
              relativeResolved.replace(/^(\.\.\/|\.\/)+/, "") as FullSlug,
            )

            // 3. Validation (checks both file slugs and aliases)
            const exists = allSlugs.has(absoluteDest) || absoluteDest === ""

            if (!exists) {
              // Log helpful info for debugging
              console.log(
                `[LinkStripper] Stripping: ${href} (Resolved to: ${absoluteDest}) in ${currentSlug}`,
              )

              if (parent && typeof index === "number") {
                parent.children.splice(index, 1, ...node.children)
              }
            }
          }
        })
      }
      return []
    },
  }
}
