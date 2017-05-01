// Only do this if it's google spreadsheets
if (window.location.href.search('tutsplus.com\/tutorials\/') !== -1) {
    let billable = document.querySelector("meta[property='native:billable']").getAttribute('content');
    let contentLength = document.querySelector("meta[property='native:length']").getAttribute('content');
    let div = document.createElement('div');
    let extraWork = 0;
    let text = '<p><strong>Billable?</strong> ' + billable + ' <strong>Length?</strong> ' + contentLength + ' <strong>Money?</strong> ';


    // is it a small publication?
    if (contentLength < 1300) {
        text += 9;
        text += '</p>';
    }

    // is it a medium publication and how much extra work?
    if (contentLength >= 1300 && contentLength <= 2100) {
        extraWork = contentLength - 1300;
        text += 13 + ' <strong>Extra?</strong> ' + extraWork;
        text += '</p>';
    }

    // is it a big publication and how much extra work?
    if (contentLength > 2100) {
        extraWork = contentLength - 2100;
        text += 18 + ' <strong>Extra?</strong> ' + extraWork;
        text += '</p>';
    }

    // show tip on screen
    div.innerHTML = text;

    // add item to bar
    bar.appendChild(div);
}
