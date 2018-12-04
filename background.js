// needed as content_scripts don't have access to chrome.tabs api
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.name === 'new-tab') {
    chrome.tabs.create(msg.payload);
  }

  if (msg.name === 'open-file') {
    let query = { limit: 1, orderBy: ['-startTime'] }
    chrome.downloads.search(query, function (results) {
      if (results.length) {
        chrome.permissions.contains(
        {
          permissions: ['downloads.open'],
          origins: ['https://getnative.me/']
        }, 
        function (granted) {
          // The callback argument will be true if the user granted the permissions.
          if (granted) {
            let query = { limit: 1, orderBy: ['-startTime'] }
            chrome.downloads.search(query, function (results) {
              if (results.length) {
                chrome.tabs.create({ url: 'view-source:file://' + results[0].filename }, () => {})
              }
            })
          } else {
              console.log('=/')
            }
          }
        );
      }
    })
  }
});
