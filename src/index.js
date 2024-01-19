// Imported API fetch functions
import { fetchBreeds, fetchCatByBreed } from './api/cat-api';

// Pop up messages library
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Pick loader and selector elements
const optionSelecter = document.querySelector('.breed-select');
const loaderElement = document.querySelector('.loader');

// Initialize request to API in order to receive breeds names and generate options for selector
addOptions();

// Adds event listener to selector changes
optionSelecter.addEventListener('change', event => {
  handleBreedChange(event.target.value);
});

// Add options to selector after API sends breed names
function addOptions() {
  // Get breeds names and ids
  fetchBreeds()
    .then(data => {
      // Create markup for options
      const selectorMarkup = data
        .map(breed => `<option value=${breed.id}>${breed.name}</option>`)
        .join('');

      // Adds markup with options to selector
      optionSelecter.insertAdjacentHTML('beforeend', selectorMarkup);

      // Creates custom selector
      new SlimSelect({
        select: optionSelecter,
        settings: {
          placeholderText: 'Select breed',
        },
      });

      //Shows selector and hides loader
      optionSelecter.classList.remove('hidden');
      loaderElement.classList.add('hidden');
    })
    .catch(error => {
      // Shows error message in pop up
      iziToast.show({
        message: '❌ Oops! Something went wrong! Try reloading the page!',
        color: 'red',
        position: 'topCenter',
        transitionIn: 'fadeInDown',
      });

      //Hides loader after receiving an error
      loaderElement.classList.add('hidden');
    });
}

// Invokes after selector changes
function handleBreedChange(breedId) {
  //Pick container for cat info
  const catInfoElement = document.querySelector('.cat-info');

  //Clear container before request
  catInfoElement.innerHTML = '';

  //Shows loader once API request starts
  loaderElement.classList.remove('hidden');

  //Initiate request about breed info by given ID
  fetchCatByBreed(breedId)
    .then(({ image, description, name, temperament }) => {
      // Insert markup with cat's breed image and info into container
      catInfoElement.insertAdjacentHTML(
        'afterbegin',
        `<img class="cat-info-image" src="${image}" alt="Cat of ${name} breed" width="300" height="300" />
      <div class="cat-info-text">
        <h1>${name}</h1>
        <p>${description}</p>
        <p><b>Temperament:</b> ${temperament}</p>
      </div>`
      );
      // Hides loader after receiving an answer
      loaderElement.classList.add('hidden');
    })
    .catch(error => {
      // Shows error message in pop up window
      iziToast.show({
        message: '❌ Oops! Something went wrong! Try reloading the page!',
        color: 'red',
        position: 'topCenter',
        transitionIn: 'fadeInDown',
      });
      // Hides loader after receiving an error
      loaderElement.classList.add('hidden');
    });
}
