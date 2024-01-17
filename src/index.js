import { fetchBreeds, fetchCatByBreed } from './cat-api';

const optionSelecter = document.querySelector('.breed-select');
const loaderElement = document.querySelector('.loader');

optionSelecter.classList.add('hidden');

function addOptions() {
  fetchBreeds().then(data => {
    const selectorMarkup = data
      .map(breed => `<option value=${breed.id}>${breed.name}</option>`)
      .join('');

    optionSelecter.insertAdjacentHTML('afterbegin', selectorMarkup);
    optionSelecter.classList.remove('hidden');
    loaderElement.classList.add('hidden');
  });
}

addOptions();

optionSelecter.addEventListener('change', event => {
  const catInfoElement = document.querySelector('.cat-info');
  catInfoElement.innerHTML = '';
  loaderElement.classList.remove('hidden');
  fetchCatByBreed(event.target.value).then(
    ({ image, description, name, temperament }) => {
      catInfoElement.insertAdjacentHTML(
        'afterbegin',
        `<img class="cat-info-image" src="${image}" alt="Cat of ${name} breed" width="300" height="300" />
      <div class="cat-info-text">
        <h1>${name}</h1>
        <p>${description}</p>
        <p><b>Temperament:</b> ${temperament}</p>
      </div>`
      );
      loaderElement.classList.add('hidden');
    }
  );
});
