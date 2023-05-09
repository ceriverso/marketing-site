// custom typefaces
import * as React from "react"
import "@fontsource/montserrat/variable.css"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.less"
import "./src/highlighting-atom-one-dark.css"

// Highlighting for code blocks
// import "prismjs/themes/prism.css"

import { Script, ScriptStrategy } from "gatsby"

const ZD_KEY = "3271265c-16a8-4e0d-b1ab-72ed8fbe7e5a"

export const wrapPageElement = ({ element }) => {
    if (
        process.env.NODE_ENV === "development" ||
        (window?.innerWidth ?? 9999) < 768
    ) {
        return element
    } else {
        return (
            <>
                {element}
                <Script
                    id="ze-snippet"
                    key="gatsby-plugin-zendesk-chat"
                    strategy={"idle"}
                    async
                    defer
                    src={`https://static.zdassets.com/ekr/snippet.js?key=${ZD_KEY}`}
                />
                <Script
                    id="hs-script-loader"
                    async
                    defer
                    strategy={"idle"}
                    src="//js.hs-scripts.com/8635875.js"
                />
            </>
        )
    }
}

declare global {
    interface Window {
        isGTMLoaded: boolean
        dataLayer: any[]
    }
}