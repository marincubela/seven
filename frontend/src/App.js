import React, { useEffect, useState } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
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
import { VehiclesL } from './routes/vehiclesList';
import { VehiclesA } from './routes/vehiclesAdd';
import { VehiclesUp } from './routes/vehicleUpdate';

import { StoreProvider } from './store/StoreProvider';
import { getOrInitializeStore } from './utils/store';

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
            <Route path="/vehicles/add">
              <VehiclesA />
            </Route>

            <Route path="/vehicles/update">
              <VehiclesUp />
            </Route>

            <Route path="/vehicles">
              <VehiclesL />
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
