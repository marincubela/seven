import { Box } from '@chakra-ui/core';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { LoginForm } from '../components/LoginForm';
import { Header } from '../components/Header';

export const Login = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <LoginForm />
      </Box>
    </Fragment>
  );
});
