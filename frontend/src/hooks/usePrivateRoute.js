import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useStore } from '../store/StoreProvider';

export const usePrivateRoute = ({ redirectPath = '/', redirectIfFound = false, redirectOn }) => {
  const store = useStore();
  const history = useHistory();

  useEffect(() => {
    let redirect = redirectIfFound ? store.currentUser : !store.currentUser;

    if (redirectOn) {
      redirect = redirectOn(store.currentUser);
    }

    if (redirect) {
      history.replace(redirectPath);
    }
  }, []);

  return {
    currentUser: store.currentUser,
  };
};
