import { Box, Center, Text } from '@chakra-ui/core';
import React from 'react';

import { Navigation } from '../components/Navigation';

export function Registration() {
  return (
    <Center w="100vw" h="100vh" bgColor="blue.100">
      <Box>
        <Text fontSize="lg">Parkiraj me | Registracija</Text>
        <Navigation />
      </Box>
    </Center>
  );
}
