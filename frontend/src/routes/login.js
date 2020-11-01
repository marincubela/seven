import { Box, Center, Text } from '@chakra-ui/core';
import React from 'react';

import { Navigation } from '../components/Navigation';

export function Login() {
  return (
    <Center w="100vw" h="100vh" bgColor="blue.100">
      <Box>
        <Text fontSize="lg">Parkiraj me | Prijava</Text>
        <Navigation />
      </Box>
    </Center>
  );
}
