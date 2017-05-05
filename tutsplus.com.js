// Only do this if it's google spreadsheets
if (window.location.href.search('tutsplus.com\/tutorials\/') !== -1 ||
    window.location.href.search('tutsplus.com\/articles\/') !== -1) {
    let billable = document.querySelector("meta[property='native:billable']").getAttribute('content');
    let contentLength = document.querySelector("meta[property='native:length']").getAttribute('content');
    let div = document.createElement('div');
    let extraWork = 0;
    let text = '<p><strong>Billable?</strong> ' + billable;

    if (billable !== 'false') {
        text += ' <strong>Length?</strong> ' + contentLength + ' <strong>Money?</strong> ';
    }

    // is it a small publication?
    if (billable !== 'false' && contentLength < 1300) {
        text += 9;
        text += '</p>';
    }

    // is it a medium publication and how much extra work?
    if (billable !== 'false' && contentLength >= 1300 && contentLength <= 2100) {
        extraWork = contentLength - 1300;
        text += 13 + ' <strong>Extra?</strong> ' + extraWork;
        text += '</p>';
    }

    // is it a big publication and how much extra work?
    if (billable !== 'false' && contentLength > 2100) {
        extraWork = contentLength - 2100;
        text += 18 + ' <strong>Extra?</strong> ' + extraWork;
        text += '</p>';
    }

    // fill div
    div.innerHTML = text;

    // add button to add to native
    if (billable !== 'false') {
        div.querySelector('p').insertBefore(
            createButtonAndAttachMethod('Add to Native', function () {
                document.querySelector('.post-translate-button').click()
            }),
            div.querySelector('p').querySelector('strong')
        );
    }

    // add item to bar
    bar.appendChild(div);
}
