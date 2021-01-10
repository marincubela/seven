import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { ReservationListPage } from '../components/ReservationListPage';
import { Header } from '../components/Header';

export const ReservationList = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <ReservationListPage />
      </Box>
    </Fragment>
  );
});
