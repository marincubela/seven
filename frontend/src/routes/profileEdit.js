import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { ProfileEditPage } from '../components/ProfileEditPage';
import { Header } from '../components/Header';

export const ProfileEdit = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <ProfileEditPage />
      </Box>
    </Fragment>
  );
});
