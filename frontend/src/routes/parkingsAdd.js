import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Header } from '../components/Header';

import { ParkingsAdd } from '../components/ParkingsAdd';

export const Parking = observer(() => {
  return (
    <Fragment>
      <Header />

      <Box as="main" marginX="auto" maxWidth="500px" paddingX="2">
        <ParkingsAdd />
      </Box>
    </Fragment>
  );
});
