import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { AddRepetitiveReservationForm } from '../components/AddRepetitiveReservationForm';
import { Header } from '../components/Header';

export const AddRepetitiveReservation = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <AddRepetitiveReservationForm />
      </Box>
    </Fragment>
  );
});
