import React, { createContext, useContext } from 'react';

const StoreContext = createContext();

export const useStore = () => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error();
  }

  window.store = storeContext.store;

  return storeContext.store;
};

export const StoreProvider = ({ store, children }) => {
  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
};
