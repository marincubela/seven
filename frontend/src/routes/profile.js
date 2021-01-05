import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { ProfilePage } from '../components/ProfilePage';
import { Header } from '../components/Header';

export const Profile = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <ProfilePage />
      </Box>
    </Fragment>
  );
});
