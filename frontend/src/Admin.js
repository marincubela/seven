import { Link, HStack } from '@chakra-ui/core';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Route, Switch, useRouteMatch, Link as ReactLink } from 'react-router-dom';

export const AdminRouter = observer(() => {
  const { path, url } = useRouteMatch();

  return (
    <Fragment>
      <HStack spacing={4}>
        <Link as={ReactLink} to={`${url}`}>
          Home
        </Link>
        <Link as={ReactLink} to={`${url}/users`}>
          Users
        </Link>
        <Link as={ReactLink} to={`${url}/parkings`}>
          Parkings
        </Link>
      </HStack>

      <hr />

      <Switch>
        <Route path={`${path}/`} exact>
          Admin panel
        </Route>
        <Route path={`${path}/users`}>Users | Admin panel</Route>
        <Route path={`${path}/parkings`}>Parkings | Admin panel</Route>
      </Switch>
    </Fragment>
  );
});
