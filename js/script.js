document.addEventListener('DOMContentLoaded', () => {
    const replaceButton = document.getElementById('replaceButton');
    const appendButton = document.getElementById('appendButton');
    const showButton = document.getElementById('showButton');
    const resetButton = document.getElementById('resetButton');
    const addNameButton = document.getElementById('addNameButton');
    const content = document.getElementById('content');
    const footerOptions = document.getElementById('footerOptions');
    const nameSpan = document.getElementById('name');

    let texts = [];

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            texts = data.contents;
            localStorage.setItem('texts', JSON.stringify(texts));
        })
        .catch(error => console.error('Error loading JSON:', error));

    replaceButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="option"]:checked').value;
        let selectedText;

        if (selectedOption === '1') {
            selectedText = texts[0];
        } else if (selectedOption === '2') {
            selectedText = texts[1];
        } else {
            selectedText = texts[Math.floor(Math.random() * (texts.length - 2)) + 2];
        }

        content.innerHTML = `<p>${selectedText}</p>`;
    });

    appendButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="option"]:checked').value;
        let selectedText;

        if (selectedOption === '1') {
            selectedText = texts[0];
        } else if (selectedOption === '2') {
            selectedText = texts[1];
        } else {
            selectedText = texts[Math.floor(Math.random() * (texts.length - 2)) + 2];
        }

        if (!content.innerHTML.includes(selectedText)) {
            const paragraph = document.createElement('p');
            paragraph.textContent = selectedText;
            content.appendChild(paragraph);
        } else {
            alert('Treść już istnieje!');
        }

        sortContent();
    });

    showButton.addEventListener('click', () => {
        footerOptions.style.display = footerOptions.style.display === 'grid' ? 'none' : 'grid';
    });

    resetButton.addEventListener('click', () => {
        content.innerHTML = '';
        nameSpan.style.display = 'none';
        footerOptions.style.display = 'none';

    });


    function sortContent() {
        const paragraphs = Array.from(content.querySelectorAll('p'));
        paragraphs.sort((a, b) => a.textContent.localeCompare(b.textContent));
        content.innerHTML = '';
        paragraphs.forEach(p => content.appendChild(p));
    }



    if (showButton && nameSpan) {
        showButton.addEventListener('click', () => {
            footerOptions.style.display = footerOptions.style.display === 'block'
        });

    }

    if (addNameButton && nameSpan) {
        addNameButton.addEventListener('click', () => {
            nameSpan.style.display = 'inline';
        });
    }
    addNameButton.addEventListener('click', () => {
        nameSpan.style.display = 'inline';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const showButton = document.getElementById('showButton');
    const footerOptions = document.getElementById('footerOptions');
    const addNameButton = document.getElementById('addNameButton');
    const nameSpan = document.getElementById('name');

    const replaceButton = document.getElementById('replaceButton');
    const appendButton = document.getElementById('appendButton');
    const contentDiv = document.getElementById('content');

    const newContentInput = document.getElementById('newContent');
    const addContentButton = document.getElementById('addContentButton');
    const editContentButton = document.getElementById('editContentButton');
    const deleteContentButton = document.getElementById('deleteContentButton');
    const contentSelect = document.getElementById('contentSelect');

    // Load contents from localStorage or fetch from JSON
    let contents = JSON.parse(localStorage.getItem('contents')) || [];

    if (contents.length === 0) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                contents = data.contents;
                localStorage.setItem('contents', JSON.stringify(contents));
                populateContentSelect();
            })
            .catch(error => console.error('Error loading JSON:', error));
    } else {
        populateContentSelect();
    }

    function populateContentSelect() {
        contentSelect.innerHTML = '';
        contents.forEach((content, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = content;
            contentSelect.appendChild(option);
        });
    }

    if (showButton && footerOptions) {
        showButton.addEventListener('click', () => {
            footerOptions.style.display = footerOptions.style.display === 'block' ? 'none' : 'block';
        });
    }

    if (addNameButton && nameSpan) {
        addNameButton.addEventListener('click', () => {
            nameSpan.style.display = 'inline';
        });
    }

    replaceButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="option"]:checked').value;
        let selectedText;

        if (selectedOption === '1') {
            selectedText = contents[0];
        } else if (selectedOption === '2') {
            selectedText = contents[1];
        } else {
            selectedText = contents[Math.floor(Math.random() * contents.length)];
        }

        contentDiv.innerHTML = `<p>${selectedText}</p>`;
    });

    appendButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="option"]:checked').value;
        let selectedText;

        if (selectedOption === '1') {
            selectedText = contents[0];
        } else if (selectedOption === '2') {
            selectedText = contents[1];
        } else {
            selectedText = contents[Math.floor(Math.random() * contents.length)];
        }

        if (!contentDiv.innerHTML.includes(selectedText)) {
            const paragraph = document.createElement('p');
            paragraph.textContent = selectedText;
            contentDiv.appendChild(paragraph);
        } else {
            alert('Treść już istnieje!');
        }

        sortContent();
    });

    addContentButton.addEventListener('click', () => {
        const newContent = newContentInput.value.trim();
        if (newContent) {
            contents.push(newContent);
            localStorage.setItem('contents', JSON.stringify(contents));
            newContentInput.value = '';
            populateContentSelect();
        }
    });

    editContentButton.addEventListener('click', () => {
        const selectedIndex = contentSelect.value;
        const newContent = newContentInput.value.trim();
        if (selectedIndex && newContent) {
            contents[selectedIndex] = newContent;
            localStorage.setItem('contents', JSON.stringify(contents));
            newContentInput.value = '';
            populateContentSelect();
        }
    });

    deleteContentButton.addEventListener('click', () => {
        const selectedIndex = contentSelect.value;
        if (selectedIndex) {
            contents.splice(selectedIndex, 1);
            localStorage.setItem('contents', JSON.stringify(contents));
            populateContentSelect();
        }
    });

    function sortContent() {
        const paragraphs = Array.from(contentDiv.querySelectorAll('p'));
        paragraphs.sort((a, b) => a.textContent.localeCompare(b.textContent));
        contentDiv.innerHTML = '';
        paragraphs.forEach(p => contentDiv.appendChild(p));
    }
});