// if on edit page, go directly to translate page
if (window.location.href.search('edit') !== -1) {
    // opens original publication in a new tab so we can grab the new translation url
    // but keeps focus on the current one
    let goToOriginalTutsPlusComPost = function () {
        // content_scripts don't have access to chrome.tabs, so we need to send a
        // message to a background script so it can open the tab for us
        openUrlInNewTab(document.querySelector('.post-form__url a').innerText);
    };

    // if post has translation returns it, otherwise, null
    let getTranslation = function () {
        let publication = JSON.parse(Cookie.get('publication') || JSON.stringify({}));
        let translationList = document.querySelectorAll('.translation-list__language-name');
        let translation = null;

        // has translation?
        [].filter.call(translationList, function (item) {
            if (item.innerText == publication.language) {
                translation = item;
            }
        });

        return translation;
    }

    // opens original post on tutsplus.com then if post has translation for this 
    // language open it otherwise  open add translation page
    let openTranslationPage = function () {
        let postTranslation = getTranslation();

        goToOriginalTutsPlusComPost();

        // exists or new?
        if (postTranslation) {
            postTranslation.parentElement.click();
        } else {
            document.querySelector('a.translation-list__add-translation-button.btn').click();
        }
    };

    // automatically opens translation page
    if (window.location.href.search('automatic') !== -1) {
        openTranslationPage();
    }

    // add buttons to the bar
    bar.appendChild(createButtonAndAttachMethod('Translate', openTranslationPage));
    bar.appendChild(createButtonAndAttachMethod('Original', goToOriginalTutsPlusComPost));
}
