// if on edit page, go directly to translate page
if (window.location.href.search('edit') !== -1) {
    let openTranslationPage = function () {
        document.querySelector('a.translation-list__add-translation-button.btn').click();
    };

    // opens original publication in a new tab so we can grab the new translation url
    // but keeps focus on the current one
    let goToOriginalPost = function () {
        // content_scripts don't have access to chrome.tabs, so we need to send a
        // message to a background script so it can open the tab for us
        openUrlInNewTab(document.querySelector('.post-form__url a').getAttribute('href'));
    };

    if (window.location.href.search('automatic') !== -1) {
        goToOriginalPost();
        openTranslationPage();
    }

    bar.appendChild(createButtonAndAttachMethod('Translate', openTranslationPage));
    bar.appendChild(createButtonAndAttachMethod('Original', goToOriginalPost));
}
