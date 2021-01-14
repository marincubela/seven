import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Header } from '../components/Header';

import { ParkingsList } from '../components/ParkingsList';

export const Parkings = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="auto" paddingX="2" paddingY="5">
        <ParkingsList />
      </Box>
    </Fragment>
  );
});
