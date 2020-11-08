import { DataStore } from '../store/DataStore';

export const getOrInitializeStore = () => {
  let store = window.store;

  if (!store) {
    store = new DataStore();
    window.store = store;
  }

  return store;
};
