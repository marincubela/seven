import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/core';
import { Route, Router, Switch } from 'react-router-dom';

import customTheme from './styles/theme';
import { Home } from './routes/home';

export function App() {
  return (
    <ChakraProvider theme={extendTheme(customTheme)}>
      <Router>
        <Switch>
          <Route path="/registration">
            <Home />
          </Route>

          <Route path="/login">
            <Home />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
