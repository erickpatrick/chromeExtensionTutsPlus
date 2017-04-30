// URL for get request of search page from tutsplus.io
let createSearchUrl = function (term) {
    return 'https://tutsplus.io/posts/searches?utf8=%E2%9C%93&post_search%5Bname_query_filter%5D=' +
        encodeURI(term) + '&post_search%5Bstatus_filter%5D=&post_search%5Btopic_filter%5D=&commit=Filter';
}

// create action menu items
let createButtonAndAttachMethod = function (btnText, btnFunction) {
    let button = document.createElement('button');

    button.innerText = btnText
    button.onclick = btnFunction;
    button.setAttribute('class', 'chrExtButton');

    return button;
};

// some actions are not allowed on context_scripts of chrome extensions, thus
// we need to send messages to backgroun script so it can do the work
let sendMessageToBackground = function (msg) {
    chrome.runtime.sendMessage(msg, function () {});
}

// wrapper for opening a new tab around sendMessageToBackground
let openUrlInNewTab = function (url) {
    sendMessageToBackground({
        name: 'new-tab',
        payload: {
            url: url,
            active: false
        }
    })
}

// immutable Object the deals with Cookies
const Cookie = {
    set: function (name, value, exdays = 1) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    },

    get: function (name) {
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');

        name = name + "=";

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }

        return "";
    }
}

// initiate bar
let bar = document.createElement('div');
bar.setAttribute('class', 'chrExtBar');
