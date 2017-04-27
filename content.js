let openTutsIOPosts = function () {
    window.location = 'https://tutsplus.io/posts';
};

let openTutsIOProfiles = function () {
    window.location = 'https://tutsplus.io/profiles';
};

let openTranslationPage = function () {
    document.querySelector('a.translation-list__add-translation-button.btn').click();
};

// in the case translation is already published
let goBackTwoPages = function () {
    window.history.go(-2);
}

// opens original publication in a new tab so we can grab the new translation url
// but keeps focus on the current one
let goToOriginalPost = function () {
    // content_scripts don't have access to chrome.tabs, so we need to send a
    // message to a background script so it can open the tab for us
    chrome.runtime.sendMessage({
        url: document.querySelector('.post-form__url a').getAttribute('href'),
        active: false
    }, function () {});
};

// get tutsplus.COM tutorials' meta data for getnative and shows extra content
let getTranslationSize = function () {
    let billable = document.querySelector("meta[property='native:billable']").getAttribute('content');
    let contentLength = document.querySelector("meta[property='native:length']").getAttribute('content');
    let div = document.createElement('div');
    let body = document.getElementsByTagName('body');
    let extraWork = 0;
    let text = 'Billable? ' + billable + ' Length? ' + contentLength + ' Money? ';

    // is it a small publication?
    if (contentLength < 1300) {
        text += 9;
    }

    // is it a medium publication and how much extra work?
    if (contentLength >= 1300 && contentLength <= 2100) {
        extraWork = contentLength - 1300;
        text += 13 + ' Extra? ' + extraWork;
    }

    // is it a big publication and how much extra work?
    if (contentLength > 2100) {
        extraWork = contentLength - 2100;
        text += 18 + ' Extra? ' + extraWork;
    }

    // show tip on screen
    text = document.createTextNode(text);
    div.style.cssText = 'position:fixed;top:50%;left:50%;transform: translate(-50%, -50%);z-index:99999;font-weight:bold;background:red;color:black;display:inline-block;padding:5px;text-transform:capitalize';
    div.appendChild(text);
    body[0].appendChild(div);
}

// takes full post translation content from title field and extract its parts
// title, teaser and content, automatically addin title and teaser to their
// fields and creating a new field to copy the clean content so we can
// paste it inside the editor (since we cannot, as of now, add it as
// well, automatically)
let extractContent = function (event) {
    // prevent default pasting functionality
    event.preventDefault();

    // grabs content from clipboard
    let translation = event.clipboardData.getData('text/plain');

    let fragment = document.createRange().createContextualFragment(translation);
    let h1 = fragment.querySelector('h1');

    // edge case #1: there are publications without H1 tags
    let h1Text = h1 && h1.hasOwnProperty("innerText") ? h1.innerText : '';

    let figure = fragment.querySelector('.final-product.final-product--image');
    let firstParagraph = fragment.querySelectorAll('p')[0].innerText;

    // since we cannot add directly to the translation "editor" we need to create
    // a new textare so we can copy its content
    let textarea = document.createElement('textarea');
    let div = document.createElement('div');

    // edge case #2: there are publications with or without .post-body__content
    // due to content that came from legacy system and was not cleaned out
    if (fragment.querySelector('.post-body__content')) {
        fragment.querySelector('.post-body__content').removeChild(h1);
    } else {
        h1 && fragment.removeChild(h1);
    }

    // edge case #3: there are publications with or without figure.final-product
    // due to content that came from legacy system and was not cleaned out
    if (figure) {
        if (fragment.querySelector('.post-body__content')) {
            fragment.querySelector('.post-body__content').removeChild(figure);
        } else {
            fragment.removeChild(figure);
        }
    }

    // fill out title and teaser fields
    document.querySelector('.translated-post-form__title-field').value = h1Text;
    document.querySelector('.translated-post-form__teaser-field').value = firstParagraph;

    // if content came with extra div from legacy system extract from the right place
    if (fragment.querySelector('.post-body__content')) {
        textarea.value = fragment.querySelector('.post-body__content').innerHTML;
    } else {
        div.append(fragment);
        textarea.value = div.innerHTML;
    }

    // style new textarea to match the other so it doesn't brake the layout
    textarea.setAttribute('style', 'width: 100%');
    textarea.setAttribute('class', 'translated-post-form__teaser-field');
    document.querySelector('.translated-post-form__content').insertBefore(textarea, document.querySelector('.translated-post-form__content-editor'));
}

// create action menu items
let createButtonAndAttachMethod = function (btnText, btnFunction) {
    let button = document.createElement('button');

    button.innerText = btnText
    button.onclick = btnFunction;

    return button;
}

let buttons = document.createElement('div');

// position menu
buttons.setAttribute('style', 'position:fixed;top:0;right:0;z-index:99999;background-color:black;color:white;padding:5px;');

// add speed buttons
buttons.appendChild(createButtonAndAttachMethod('Size', getTranslationSize));
buttons.appendChild(createButtonAndAttachMethod('Profiles', openTutsIOProfiles));
buttons.appendChild(createButtonAndAttachMethod('Posts', openTutsIOPosts));
buttons.appendChild(createButtonAndAttachMethod('Back', goBackTwoPages));

// attach menu to page
document.querySelector('body').appendChild(buttons);

// if search result has only one result open it
if (window.location.href.search('searches') !== -1) {
    let results = document.querySelector('.posts-list__row');

    if ((new Array(results)).length == 1) {
        window.location = results.querySelector('.posts-list__column a').getAttribute('href') + '?automatic';
    }
}

// if on edit page, go directly to translate page
if (window.location.href.search('edit') !== -1) {
    if (window.location.href.search('automatic') !== -1) {
        goToOriginalPost();
        openTranslationPage();
    }
}

// if we're at the translation page, when pasting the translation content,
// automatically extract the content instead of having to press the
// button as opposed to the way it was before
if (window.location.href.search('translated_posts') !== -1) {
    document.querySelector('.translated-post-form__title-field').addEventListener('paste', extractContent);
}
