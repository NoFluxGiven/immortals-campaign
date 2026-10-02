// quartz/components/ScrambleText.tsx

import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import scrambleScript from "./scripts/scramble.inline"

export default (() => {
  const Component: QuartzComponent = ({ children, displayClass }: QuartzComponentProps) => {
    return (
      <span className={`scramble-text ${displayClass ?? ""}`}>
        {children}
      </span>
    )
  }

  Component.afterDOMLoaded = scrambleScript
  return Component
}) satisfies QuartzComponentConstructor
