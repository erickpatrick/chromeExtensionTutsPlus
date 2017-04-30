// needed as content_scripts don't have access to chrome.tabs api
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.name == 'new-tab') {
        chrome.tabs.create(msg.payload);
    }
});
