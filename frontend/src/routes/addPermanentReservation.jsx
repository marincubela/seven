import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { AddPermanentReservationForm } from '../components/AddPermanentReservationForm';
import { Header } from '../components/Header';

export const AddPermanentReservation = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <AddPermanentReservationForm />
      </Box>
    </Fragment>
  );
});
