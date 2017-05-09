if (window.location.href.search('tutsplus.io') !== -1 && window.location.href.search('courses') === -1) {
    let openTutsIOProfiles = function () {
        openUrlInNewTab('https://tutsplus.io/profiles');
    };

    bar.appendChild(createButtonAndAttachMethod('Profiles', openTutsIOProfiles));
}
