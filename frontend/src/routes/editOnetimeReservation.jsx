import { Box } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { EditOnetimeReservationForm } from '../components/EditOnetimeReservationForm';
import { Header } from '../components/Header';

export const EditOnetimeReservation = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <EditOnetimeReservationForm />
      </Box>
    </Fragment>
  );
});
