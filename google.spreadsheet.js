if (window.location.href.search('tutsplus.io') !== -1) {
    let getBaseData = function (data) {
        data = data.split('\	');

        return {
            publication: {
                translator: data[1],
                language: data[3],
                title: data[4],
            },
            urls: [
                data[8],
                data[9]
            ]
        };
    }

    let openAllPages = function () {
        // get content from text field
        let spreasheetData = document.querySelector('.chrExtTranslationData').value;

        // get translation data
        let translationData = getBaseData(spreasheetData);

        // open native urls in background
        translationData.urls.map(function (url) {
            openUrlInNewTab(url);
        });

        // set cookie for 'add translation page'
        Cookie.set(
            'publication',
            encodeURIComponent(JSON.stringify(translationData.publication))
        );

        // navigate to search page using publication's title and let
        // tutsplus.io.js do its work
        window.location = createSearchUrl(translationData.publication.title);
    }

    // input field to paste full line of translation data
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'chrExtTranslationData chrExtInput');
    bar.appendChild(input);

    // button that will do the magic
    // we avoid calling when pasting to be sure nothing wrong was done
    bar.appendChild(createButtonAndAttachMethod('open', openAllPages));
}
