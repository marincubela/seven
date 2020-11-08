import { Box, Center, Text } from '@chakra-ui/core';
import { observer } from 'mobx-react';
import React from 'react';

import { Navigation } from '../components/Navigation';

export const Error = observer(() => {
  return (
    <Center w="100vw" h="100vh" bgColor="blue.100">
      <Box>
        <Text fontSize="lg">Parkiraj me | 404</Text>
        <Navigation />
      </Box>
    </Center>
  );
});
