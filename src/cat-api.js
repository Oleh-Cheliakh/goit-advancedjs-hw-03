import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_pT8vod6SPuMDUj6AprUg0TPq3KAfICEEzDfWkD2UaZt3zafba4uyWLTK5IrrVsmz';

export function fetchBreeds() {
  const catBreeds = [];
  return axios({
    method: 'get',
    url: 'https://api.thecatapi.com/v1/breeds',
  }).then(response => {
    response.data.forEach(cat => {
      catBreeds.push({
        id: cat.id,
        name: cat.name,
      });
    });
    return catBreeds;
  });
}
