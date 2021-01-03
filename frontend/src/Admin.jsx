import { Divider } from '@chakra-ui/core';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { AdminContainer } from './components/admin/Container';
import { AdminNavigation } from './components/admin/Navigation';
import { Users } from './components/admin/Users';

export const AdminRouter = observer(() => {
  const { path } = useRouteMatch();

  return (
    <Fragment>
      <AdminNavigation />

      <Divider />

      <AdminContainer>
        <Switch>
          <Route path={`${path}/`} exact>
            Admin panel
          </Route>

          <Route path={`${path}/users`}>
            <Users />
          </Route>

          <Route path={`${path}/parkings`}>Parkings | Admin panel</Route>
        </Switch>
      </AdminContainer>
    </Fragment>
  );
});
