import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_pT8vod6SPuMDUj6AprUg0TPq3KAfICEEzDfWkD2UaZt3zafba4uyWLTK5IrrVsmz';

export function fetchBreeds() {
  const catBreeds = [];
  return axios({
    method: 'get',
    url: 'https://api.thecatapi.com/v1/breeds',
  }).then(response => {
    response.data.forEach(({ id, name }) => {
      catBreeds.push({
        id,
        name,
      });
    });
    return catBreeds;
  });
}

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
