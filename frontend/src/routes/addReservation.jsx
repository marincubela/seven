import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { AddReservationForm } from '../components/AddReservationForm';
import { Header } from '../components/Header';

export const AddReservation = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <AddReservationForm />
      </Box>
    </Fragment>
  );
});
