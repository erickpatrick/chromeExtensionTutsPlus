{
    "name": "Publication speedester",
    "version": "0.2",
    "manifest_version": 2,
    "description": "Fastest publisher alive",
    "background": {
        "scripts": ["background.js"]
    },
    "content_scripts": [{
        "matches": ["https://tutsplus.io/*"],
        "js": ["content.js"],
        "run_at": "document_end"
    }],
    "permissions": [
        "tabs",
        "contextMenus",
        "https://*/*"
    ]
}
