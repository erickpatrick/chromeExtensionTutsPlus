if (window.location.href.search('tutsplus.io\/courses') !== -1) {
    let getCourseCleanData = function () {
        let title = document.querySelector('.course-form__title');

        // grab base data and replace all occurences of '=>' (that comes from 
        // PHP, I guess) by a ':'
        let data = JSON.parse(document.querySelector('.debug_dump').innerText.replace(/=>/gi, ':'));

        // filters data so we have only titles and URLs
        let chapters = data.chapters.map(function (chapter) {
            let lessons = chapter.lessons.map(function (lesson) {
                let originalLessonData = lesson.assets.filter(function (asset) {
                    return asset.type == 'OriginalFile';
                });

                return {
                    name: lesson.title,
                    url: originalLessonData[0].url
                };
            });

            return {
                name: chapter.title,
                lessons: lessons
            };
        });

        let course = {
            name: title.innerText,
            chapters: chapters
        }

        // create textarea so we can copy new json data
        let textarea = document.createElement('textarea');
        textarea.setAttribute('class', 'course-form__extra-information-body-field');
        textarea.innerHTML = JSON.stringify(course);

        // insert into the document above course title
        document.querySelector('.course-form__details').insertBefore(textarea, title);
    };

    // insert button that calls the action
    bar.appendChild(createButtonAndAttachMethod('Course', getCourseCleanData));
}
