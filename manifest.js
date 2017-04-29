{
    "name": "Tuts+ Publishing",
    "version": "0.7",
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
        "js": ["content.js"],
        "run_at": "document_end"
    }],
    "permissions": [
        "tabs",
        "contextMenus",
        "https://*/*"
    ]
}
