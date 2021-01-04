import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Header } from '../components/Header';

import { VehiclesAdd } from '../components/VehiclesAdd';

export const VehiclesA = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <VehiclesAdd />
      </Box>
    </Fragment>
  );
});
