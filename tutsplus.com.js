// Only do this if it's google spreadsheets
if (window.location.href.search('tutsplus.com') !== -1) {
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

    bar.appendChild(createButtonAndAttachMethod('Size', getTranslationSize));
}
