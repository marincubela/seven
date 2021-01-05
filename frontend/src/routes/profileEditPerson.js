import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { ProfileEditPersonPage } from '../components/ProfileEditPersonPage';
import { Header } from '../components/Header';

export const ProfileEditPerson = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <ProfileEditPersonPage />
      </Box>
    </Fragment>
  );
});
