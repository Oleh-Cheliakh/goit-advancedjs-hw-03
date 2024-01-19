import axios from 'axios';

// API personal key
axios.defaults.headers.common['x-api-key'] =
  'live_pT8vod6SPuMDUj6AprUg0TPq3KAfICEEzDfWkD2UaZt3zafba4uyWLTK5IrrVsmz';

// API request for all breeds names and ids
export function fetchBreeds() {
  // Create empty array in order to collect API answer
  const catBreeds = [];

  // Initialize API get request to Cat API
  return axios({
    method: 'get',
    url: 'https://api.thecatapi.com/v1/breeds',
  }).then(({ data }) => {
    // Saves names and ids of breed to array
    data.forEach(({ id, name }) => {
      catBreeds.push({
        id,
        name,
      });
    });
    // Return array with names and ids of breeds
    return catBreeds;
  });
}

// API request in order to get breed image and info by breed id
export function fetchCatByBreed(breedId) {
  return axios({
    method: 'get',
    url: 'https://api.thecatapi.com/v1/images/search',
    params: {
      breed_ids: breedId,
    },
  }).then(({ data }) => {
    return {
      image: data[0].url,
      description: data[0].breeds[0].description,
      name: data[0].breeds[0].name,
      temperament: data[0].breeds[0].temperament,
    };
  });
}
