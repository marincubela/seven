import React, { createContext, useContext } from 'react';

const StoreContext = createContext({
  store: undefined,
});

export const useStore = () => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error();
  }

  return storeContext.store;
};

export const StoreProvider = ({ store, children }) => {
  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
};
