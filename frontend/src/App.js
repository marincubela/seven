import React, { useEffect, useState } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import 'leaflet/dist/leaflet.css';

import customTheme from './styles/theme';
import { Home } from './routes/home';
import { Profile } from './routes/profile';
import { Registration } from './routes/registration';
import { RegistrationCompany } from './routes/registrationCompany';
import { RegistrationPerson } from './routes/registrationPerson';
import { Login } from './routes/login';
import { Error } from './routes/error';
import { get } from './utils/network';
import { StoreProvider } from './store/StoreProvider';
import { getOrInitializeStore } from './utils/store';
import { Parkings } from './routes/parkingsList';
import { ParkingAdd } from './routes/parkingsAdd';
import { ParkingEdit } from './routes/parkingsEdit';
import { ProfileEditPerson } from './routes/profileEditPerson';
import { ProfileEditCompany } from './routes/profileEditCompany';
import { AdminRouter } from './Admin';

const App = () => {
  const [store] = useState(() => getOrInitializeStore());
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    get('session')
      .then((res) => {
        store.setCurrentUser(res.data.user);
      })
      .catch(() => {})
      .finally(() => setFinished(true));
  }, []);

  if (!finished) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <ChakraProvider theme={extendTheme(customTheme)}>
        <Router>
          <Switch>
            <Route path="/parkings/add">
              <ParkingAdd />
            </Route>

            <Route path="/parkings/edit">
              <ParkingEdit />
            </Route>

            <Route path="/parkings">
              <Parkings />
            </Route>

            <Route path="/admin">
              <AdminRouter />
            </Route>

            <Route path="/registration/company">
              <RegistrationCompany />
            </Route>

            <Route path="/registration/person">
              <RegistrationPerson />
            </Route>

            <Route path="/registration">
              <Registration />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/profile/edit/company">
              <ProfileEditCompany />
            </Route>

            <Route path="/profile/edit/person">
              <ProfileEditPerson />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/">
              <Error />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </StoreProvider>
  );
};

export default observer(App);
