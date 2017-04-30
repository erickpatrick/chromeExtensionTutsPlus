if (window.location.href.search('tutsplus.io') !== -1) {
    let openTutsIOProfiles = function () {
        window.location = 'https://tutsplus.io/profiles';
    };

    bar.appendChild(createButtonAndAttachMethod('Profiles', openTutsIOProfiles));
}
