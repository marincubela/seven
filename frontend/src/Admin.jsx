import { Divider } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { AdminContainer } from './components/admin/Container';
import { AdminNavigation } from './components/admin/Navigation';
import { Users } from './components/admin/Users';
import { useStore } from './store/StoreProvider';

export const AdminRouter = observer(() => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const store = useStore();

  if (!store.currentUser?.admin) {
    history.push('/');

    return null;
  }

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
