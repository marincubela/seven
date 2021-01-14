import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { AddOnetimeReservationForm } from '../components/AddOnetimeReservationForm';
import { Header } from '../components/Header';

export const AddOnetimeReservation = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <AddOnetimeReservationForm />
      </Box>
    </Fragment>
  );
});
