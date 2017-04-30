{
    "name": "Tuts+ Publishing",
    "version": "1.0.0",
    "manifest_version": 2,
    "description": "Make speedster",
    "background": {
        "scripts": ["background.js"]
    },
    "content_scripts": [{
        "matches": [
            "https://tutsplus.io/*",
            "https://*.tutsplus.com/*",
            "https://getnative.me/*"
        ],
        "css": [
            "styles.css"
        ],
        "js": [
            "helper.js",
            "tutsplus.io.js",
            "tutsplus.io.search.js",
            "tutsplus.io.edit.js",
            "tutsplus.io.translated.js",
            "tutsplus.com.js",
            "getnative.me.js",
            "google.spreadsheet.js",
            "attach-bar.js"
        ],
        "run_at": "document_end"
    }],
    "permissions": [
        "tabs",
        "contextMenus",
        "https://*/*"
    ]
}
