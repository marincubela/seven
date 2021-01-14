import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { EditPermanentReservationForm } from '../components/EditPermanentReservationForm';
import { Header } from '../components/Header';

export const EditPermanentReservation = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <EditPermanentReservationForm />
      </Box>
    </Fragment>
  );
});
