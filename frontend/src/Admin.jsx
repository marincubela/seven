import { Divider } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { AdminContainer } from './components/admin/Container';
import { AdminNavigation } from './components/admin/Navigation';
import { Users } from './components/admin/Users';
import { usePrivateRoute } from './hooks/usePrivateRoute';

export const AdminRouter = observer(() => {
  const { path } = useRouteMatch();

  const { currentUser } = usePrivateRoute({ redirectOn: (user) => !user?.admin });

  if (!currentUser?.admin) {
    return null;
  }

  return (
    <Fragment>
      <AdminNavigation />

      <Divider />

      <AdminContainer>
        <Switch>
          <Route path={`${path}/users`}>
            <Users />
          </Route>

          <Route path={`${path}/`}>
            <Redirect to={`${path}/users`} />
          </Route>
        </Switch>
      </AdminContainer>
    </Fragment>
  );
});
