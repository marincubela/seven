import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { EditRepetitiveReservationForm } from '../components/EditRepetitiveReservationForm';
import { Header } from '../components/Header';

export const EditRepetitiveReservation = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <EditRepetitiveReservationForm />
      </Box>
    </Fragment>
  );
});
