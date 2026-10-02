import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { ScrambleText } from "./quartz/components"

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout({
    defaults: {
        beforeBody: [
            ScrambleText()
        ]
    }
})
