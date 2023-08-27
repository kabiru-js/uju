const container = document.querySelector('.container');
const content = document.querySelector('.content');
const wordListSelect = document.querySelector('#wordList');
const wordCountSpan = document.querySelector('#wordCount');

function loadWordContent(word) {
  content.textContent = word;
}

wordListSelect.addEventListener('click', () => {
  fetch('./words-small.json')

    .then(response => response.json())
    .then(words => {
      wordListSelect.innerHTML = '';

      words.forEach((word, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = word;
        wordListSelect.appendChild(option);
      });

      wordCountSpan.textContent = words.length;

      loadWordContent(words[0]);
    })
    .catch(error => console.error('Error loading words:', error));
});

wordListSelect.addEventListener('change', event => {
  const selectedIndex = event.target.value;
  const selectedWord = wordListSelect.options[selectedIndex].textContent;
  loadWordContent(selectedWord);
});

container.addEventListener('wheel', (event) => {
  const deltaY = event.deltaY;
  const scrollSpeed = 20;

  content.scrollTop += deltaY > 0 ? scrollSpeed : -scrollSpeed;
  event.preventDefault();
});
