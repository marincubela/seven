import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import customTheme from './styles/theme';
import { Home } from './routes/home';
import { Registration } from './routes/registration';
import { RegistrationCompany } from './routes/registrationCompany';
import { RegistrationPerson } from './routes/registrationPerson';
import { Login } from './routes/login';
import { Error } from './routes/error';
import { DataStore } from './store/DataStore';
import { StoreProvider } from './store/StoreProvider';

function App() {
  let dataStore = window.store;

  if (!dataStore) {
    dataStore = new DataStore();
    window.store = dataStore;
  }

  return (
    <ChakraProvider theme={extendTheme(customTheme)}>
      <StoreProvider store={{ store: dataStore }}>
        <Router>
          <Switch>
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
      </StoreProvider>
    </ChakraProvider>
  );
}

export default App;
