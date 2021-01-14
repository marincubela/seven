import { DataStore } from '../store/DataStore';

const __STORE__ = 'store';

export const getOrInitializeStore = () => {
  // This will be true if the page constructor is called on the client
  if (!window[__STORE__]) {
    window[__STORE__] = new DataStore();
  }

  return window[__STORE__];
};
