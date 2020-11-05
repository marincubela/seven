import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import customTheme from './styles/theme';
import { Home } from './routes/home';
import { Registration } from './routes/registration';
import { RegistrationFirm } from './routes/registrationFirm';
import { RegistrationPerson } from './routes/registrationPerson';
import { Login } from './routes/login';
import { Error } from './routes/error';

export function App() {
  return (
    <ChakraProvider theme={extendTheme(customTheme)}>
      <Router>
        <Switch>
          <Route path="/registration">
            <Registration />
          </Route>

          <Route path="/registrationFirm">
            <RegistrationFirm />
          </Route>

          <Route path="/registrationPerson">
            <RegistrationPerson />
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
  );
}
