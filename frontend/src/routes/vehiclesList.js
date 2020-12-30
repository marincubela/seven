import { Box } from '@chakra-ui/core';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Header } from '../components/Header';

import { VehiclesList } from '../components/VehiclesList';

export const Vehicles = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <VehiclesList />
      </Box>
    </Fragment>
  );
});
