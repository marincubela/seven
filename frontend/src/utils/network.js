const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://pi-parkiraj-me.herokuapp.com/' : 'http://localhost:3000/';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const baseFetch = (endpoint, fetchOptions) => {
  return fetch(`${BASE_URL}${endpoint}`, fetchOptions).then(async (res) => {
    if (res.status >= 400) {
      return Promise.reject(await res.json());
    }

    return Promise.resolve(await res.json());
  });
};

export const get = (endpoint, fetchOptions = {}) => {
  const reqOptions = Object.assign({}, fetchOptions, {
    method: 'GET',
    headers: Object.assign({}, defaultHeaders, fetchOptions.headers),
  });

  return baseFetch(endpoint, reqOptions);
};

export const post = (endpoint, body = {}, fetchOptions = {}) => {
  const reqOptions = Object.assign({}, fetchOptions, {
    method: 'POST',
    headers: Object.assign({}, defaultHeaders, fetchOptions.headers),
    body: JSON.stringify(body),
  });

  return baseFetch(endpoint, reqOptions);
};
