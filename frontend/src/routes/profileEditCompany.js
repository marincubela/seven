import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { ProfileEditCompanyPage } from '../components/ProfileEditCompanyPage';
import { Header } from '../components/Header';

export const ProfileEditCompany = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <ProfileEditCompanyPage />
      </Box>
    </Fragment>
  );
});
