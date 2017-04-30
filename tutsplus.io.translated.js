// if we're at the translation page, when pasting the translation content,
// automatically extract the content instead of having to press the
// button as opposed to the way it was before
if (window.location.href.search('translated_posts') !== -1) {
    let publication = Cookie.get('publication') && JSON.parse(Cookie.get('publication'));

    let language = document.querySelector('.translated-post-form__language-code-field');
    let translator = document.querySelector('.translated-post-form__language-code-field');

    let selectOption = function (languageName) {
        let optionIndex;

        [].filter.call(language.options, function (item) {
            if (item.innerText == languageName) {
                item.setAttribute('selected', 'selected');
            }
        });
    };

    // since we cannot access any JavaScript from the tab/page, we can only
    // work with the DOM as it was a simple DOM without any custom JS
    // added to it. Thus, we can only display some 
    let showTranslator = function (translatorName) {
        let input = document.createElement('input');
        let label = document.createElement('label');

        input.value = translatorName;
        input.setAttribute('class', 'chrExtInput');
        input.setAttribute('id', 'chrExtInput');

        label.setAttribute('for', 'chrExtInput');
        label.setAttribute('class', 'chrExtLabel');
        label.innerText = 'Translator';

        bar.appendChild(label);
        bar.appendChild(input);
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
        let h1Text = h1 ? h1.innerText : '';

        let figure = fragment.querySelector('.final-product');
        let firstParagraph = fragment.querySelectorAll('p')[0].innerText;

        // since we cannot add directly to the translation "editor" we need to create
        // a new textare so we can copy its content
        let textarea = document.createElement('textarea');
        let div = document.createElement('div');


        // the JS editor
        let editor = document.querySelector('.ace_text-input');

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

        // focus automatically into the editor
        editor.focus();
        // automatically select editor's content
        editor.select();
    }

    if (publication) {
        Cookie.set('publication', '');
        selectOption(publication.language);
        showTranslator(publication.translator);
    }

    document.querySelector('.translated-post-form__title-field').addEventListener('paste', extractContent);
}