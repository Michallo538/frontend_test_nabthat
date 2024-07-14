document.addEventListener('DOMContentLoaded', () => {
    // Definiowanie elementów z DOM
    const replaceButton = document.getElementById('replaceButton');
    const appendButton = document.getElementById('appendButton');
    const showButton = document.getElementById('showButton');
    const resetButton = document.getElementById('resetButton');
    const addNameButton = document.getElementById('addNameButton');
    const content = document.getElementById('content');
    const footerOptions = document.getElementById('footerOptions');
    const nameSpan = document.getElementById('name');

    // Inicjalizacja tablicy do przechowywania tekstów
    let texts = [];

    // Pobieranie początkowych treści z pliku 'data.json' i zapisywanie ich w localStorage
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            texts = data.contents;
            localStorage.setItem('texts', JSON.stringify(texts));
        })
        .catch(error => console.error('Error loading JSON:', error));

    // Nasłuchiwanie zdarzenia dla przycisku zamiany
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

    // Nasłuchiwanie zdarzenia dla przycisku dodawania
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

    // Nasłuchiwanie zdarzenia dla przycisku pokazania opcji stopki
    showButton.addEventListener('click', () => {
        footerOptions.style.display = footerOptions.style.display === 'grid' ? 'none' : 'grid';
    });

    // Nasłuchiwanie zdarzenia dla przycisku resetowania
    resetButton.addEventListener('click', () => {
        content.innerHTML = '';
        nameSpan.style.display = 'none';
        footerOptions.style.display = 'none';
    });

    // Funkcja sortująca treść
    function sortContent() {
        const paragraphs = Array.from(content.querySelectorAll('p'));
        paragraphs.sort((a, b) => a.textContent.localeCompare(b.textContent));
        content.innerHTML = '';
        paragraphs.forEach(p => content.appendChild(p));
    }

    // Nasłuchiwanie zdarzenia dla przycisku pokazania opcji stopki (poprawione)
    if (showButton && nameSpan) {
        showButton.addEventListener('click', () => {
            footerOptions.style.display = footerOptions.style.display === 'block';
        });
    }

    // Nasłuchiwanie zdarzenia dla przycisku pokazania imienia
    if (addNameButton && nameSpan) {
        addNameButton.addEventListener('click', () => {
            nameSpan.style.display = 'inline';
        });
    }

    // Dodatkowe nasłuchiwanie dla przycisku pokazania imienia (duplikat, można usunąć)
    addNameButton.addEventListener('click', () => {
        nameSpan.style.display = 'inline';
    });
});
