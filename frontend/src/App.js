import React, { useEffect } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import customTheme from './styles/theme';
import { Home } from './routes/home';
import { Registration } from './routes/registration';
import { RegistrationCompany } from './routes/registrationCompany';
import { RegistrationPerson } from './routes/registrationPerson';
import { Login } from './routes/login';
import { Error } from './routes/error';
import { get } from './utils/network';
import { useStore } from './store/StoreProvider';
import { AdminRouter } from './Admin';

const App = () => {
  const store = useStore();

  useEffect(() => {
    get('session')
      .then((res) => {
        store.setCurrentUser(res.data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <ChakraProvider theme={extendTheme(customTheme)}>
      <Router>
        <Switch>
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
};

export default observer(App);
