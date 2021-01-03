import React, { useEffect, useState } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import 'leaflet/dist/leaflet';

import customTheme from './styles/theme';
import { Home } from './routes/home';
import { Registration } from './routes/registration';
import { RegistrationCompany } from './routes/registrationCompany';
import { RegistrationPerson } from './routes/registrationPerson';
import { Login } from './routes/login';
import { Error } from './routes/error';
import { get } from './utils/network';
// import { useStore } from './store/StoreProvider';
import { VehiclesList } from './components/VehiclesList';
import { Vehicles } from './routes/vehiclesAdd';

import { StoreProvider } from './store/StoreProvider';
import { getOrInitializeStore } from './utils/store';

const App = () => {
  const [store] = useState(() => getOrInitializeStore());

  useEffect(() => {
    get('session')
      .then((res) => {
        store.setCurrentUser(res.data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <StoreProvider store={store}>
      <ChakraProvider theme={extendTheme(customTheme)}>
        <Router>
          <Switch>
            <Route path="/vehicles/add">
              <Vehicles />
            </Route>

            <Route path="/vehicles">
              <VehiclesList />
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
