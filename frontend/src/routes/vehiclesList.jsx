import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Header } from '../components/Header';

import { VehiclesList } from '../components/VehiclesList';

export const VehiclesL = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="700px" paddingX="2">
        <VehiclesList />
      </Box>
    </Fragment>
  );
});
