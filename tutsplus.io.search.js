// if search result has only one result open it
if (window.location.href.search('searches') !== -1) {
    let results = document.querySelectorAll('.posts-list__row');

    if (results.length == 1) {
        window.location = results[0].querySelector('.posts-list__column a').getAttribute('href') + '?automatic';
    }
}
