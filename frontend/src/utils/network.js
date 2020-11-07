const BASE_URL = 'https://pi-parkiraj-me.herokuapp.com/';

const defaultHeaders = {};

export const baseFetch = (endpoint, fetchOptions) => {
  return fetch(`${BASE_URL}${endpoint}`, fetchOptions).then((res) => {
    if (res.status >= 400) {
      return Promise.reject(res.json());
    }

    return Promise.resolve(res.json());
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
